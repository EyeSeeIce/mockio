const express = require('express')
const { generateApiToken } = require("../utils/tokenService");
const client = require("../db");
const router = express.Router()
const uuid = require('uuid')

router.get('/key/', async (req, res) => {
  try{
    const {id} = req.user_data
    const key = await client.q(`select api_key from mock_api_keys where user_id='${id}'`)
    res.send(key)
  }catch (e){
    res.status(400).send({message: e.message})
  }
})

router.post('/key/', async (req, res) => {
  try {
    const key = uuid.v4()
    console.log(req.user_data);
    const {id} = req.user_data
    await client.q(`insert into mock_api_keys (user_id, api_key) values ('${id}', '${key}')`)
    res.send(key)
  }catch (e){
    res.status(400).send({message: e.message})
  }

})

router.delete('/key/', async (req, res) => {
  try {
    const {id} = req.user_data
    await client.q(`delete from mock_api_keys where user_id='${id}'`)
    res.send()
  }catch (e){
    res.status(400).send({message: e.message})
  }
})


module.exports = router