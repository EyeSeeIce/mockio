const express = require("express");
const router = express.Router();
const client = require("../db");
const bcrypt = require("bcrypt");
const validatePassword = require("../utils/validatePassword");
const tokenService = require("../utils/tokenService");
const jwt = require("jsonwebtoken");

const getNicknameFromEmail = (email) => {
  const index = email.indexOf('@')
  if (index != -1){
    return email.slice(0, index)
  }else {
    return email
  }

}

router.post("/auth/", async (req, res) => {
  try {
    const { user_login, user_password } = req.body;
    const candidate = await client.q(`select * from mock_user where user_login='${user_login}'`);
    if (!candidate) {
      throw new Error("User not found");
    }

    const password = candidate[0].user_password;
    const passwordIsEqual = await validatePassword(user_password, password);

    if (!passwordIsEqual) {
      throw new Error("Auth error");
    }

    const api_key_rows = await client.q(`select api_key from mock_api_keys where user_id='${candidate[0].id}'`)
    const api_key = api_key_rows.length > 0 ? api_key_rows[0].api_key : false
    const access_token = tokenService.generateAccessToken({...candidate[0], api_key});

    res.send({ user_login, user_nickname: candidate[0].user_nickname, api_key ,access_token});

  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

router.get("/check/", async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("User not authorisation");
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodeToken) {
      const api_key_row = await client.q(`select api_key from mock_api_keys where user_id='${decodeToken.id}'`)

      const key = api_key_row.length > 0 ? api_key_row[0].api_key : false

      res.send({ user_login: decodeToken.user_login, user_nickname: decodeToken.user_nickname, api_key: key});
    } else {
      throw new Error("User not authorisation");
    }

  } catch (e) {
    console.log(e.message);
    res.status(401).send({ message: "User not authorisation" });
  }
});

router.post("/create/", async (req, res) => {
  try {
    const { user_login, user_password } = req.body;
    const candidate = await client.q(`select * from mock_user where user_login='${user_login}'`);
    if (candidate) {
      throw new Error("Email already exist");
    }


    const passwordHash = await bcrypt.hash(user_password, 7);
    const user = await client.q(`insert into mock_user (user_login, user_password, user_nickname) values ('${user_login}', '${passwordHash}', '${getNicknameFromEmail(user_login)}') returning user_login, user_nickname`);
    const {user_nickname} = user[0]
    res.send({user_login, user_nickname})
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: e.message });
  }
});

router.get("/logout/", async (req, res) => {
  res.cookie("token", null);
  res.send("logout");
});


module.exports = router;