const express = require("express");
const router = express.Router();
const mock_io = require("../utils/mock.io");
const mock_io_map = require('../utils/maps')
const fs = require("fs");




const uncoverConditions = (newData) => {
  const data = JSON.parse(JSON.stringify(newData));

  createData(data);

  function createData(data) {

    for (let i in data) {

      if (typeof data[i] === "object") {
        createData(data[i]);
      } else {
        switch (data[i].replace(/\#.*$/, '')) {
          case "age":
            data[i] = mock_io.age();
            break;
          case "phone":
            data[i] = mock_io.phone();
            break;
          case "number":
            data[i] = mock_io.number(data[i]);
            break;
          case "title":
            data[i] = mock_io.title(data[i]);
            break;
          case "description":
            data[i] = mock_io.description(data[i]);
            break;
          case "time":
            data[i] = mock_io.time(data[i]);
            break
          case "img":
            data[i] = mock_io.image()
            break
          case "zip":
            data[i] = mock_io.zip()
            break
          case "bool":
            data[i] = mock_io.bool()
            break
          case "gender":
            data[i] = mock_io.gender()
            break
          default:
            data[i] = mock_io.getRandomValues(data[i]);
            break;
        }
      }
    }
    return data;
  }

  return data;
};

function changeData(data) {
  for (let i in data) {
    if (typeof data[i] === "object") {
      changeData(data[i]);
      if (Array.isArray(data[i])) {
        if (typeof data[i].at(-1) === "number") {
          const condition = data[i][0];
          const newArray = [];
          const length = data[i].at(-1);
          for (let j = 0; j < length; j++) {
            newArray.push(condition);
          }
          data[i] = newArray;
        }
      }
    }
  }

  return data;
}

router.post("/mock/", (req, res) => {
  const { count } = req.query;

  const dataArray = new Array(+count).fill(0);

  const newData = changeData(req.body);

  const d = dataArray.map(i => uncoverConditions(newData));

  res.send(d);
});

router.get('/product/', (req, res) => {
  const { count } = req.query;

  const dataArray = new Array(+count).fill(0);


  const newData = changeData(mock_io_map.product);

  const d = dataArray.map(i => uncoverConditions(newData));

  res.send(d)
})

router.get('/user/', (req, res) => {
  const { count } = req.query;

  const dataArray = new Array(+count).fill(0);


  const newData = changeData(mock_io_map.user);

  const d = dataArray.map(i => uncoverConditions(newData));

  res.send(d)
})


router.get("/test/", async (req, res) => {
  const getRandomInt = (min = 0, max) => {
    min = Math.floor(min)
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const data = fs.readdirSync('./images/')
  data.forEach((i, index) => {
    const ext_index = i.indexOf('.')
    const ext = i.slice(ext_index, i.length)

    fs.rename(`./images/${i}`, `./images/mock.io-${index}${ext}`, (err,data) => {})
  })
});


module.exports = router;










