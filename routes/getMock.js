const express = require("express");
const router = express.Router();
const mock_io = require("../utils/mock.io");
const mock_io_map = require('../utils/maps')




const uncoverConditions = (newData) => {
  const data = JSON.parse(JSON.stringify(newData));

  createData(data);

  function createData(data) {

    for (let i in data) {

      if (typeof data[i] === "object") {
        const condition = JSON.parse(JSON.stringify(data[i]));
        createData(data[i]);
      } else {
        switch (data[i].replace(/\#.*$/, '')) {
          case "age":
            data[i] = mock_io.age();
            break;
          case "phone":
            data[i] = mock_io.phone();
            break;
          case "r_n":
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


router.get("/test/", (req, res) => {
  const str = 'прИВЕТт как дела?'
  res.send(str.toCapital())
});


module.exports = router;










