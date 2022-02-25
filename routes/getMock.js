const express = require("express");
const router = express.Router();
const mock_io = require("../utils/mock.io");
const mock_io_map = require('../utils/maps')
const fs = require("fs");
const e = require("express");
const auth_middleware = require('../middlewares/auth_middleware')
const config = require('../utils/config.json')


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
          case "email":
            data[i] = mock_io.email()
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

function changeData(data, limit) {

  for (let i in data) {
    if (typeof data[i] === "object") {
      changeData(data[i], limit);
      if (Array.isArray(data[i])) {
        if (typeof data[i].at(-1) === "number") {
          const condition = data[i][0];
          const newArray = [];
          const length = data[i].at(-1) > limit ? limit : data[i].at(-1);

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

router.post("/mock/",(req, res) => {
  let { limit, sort, api_key } = req.query;
  let inObjectLimit

  if (!api_key){
    limit = limit > config.max_limit_no_key ? config.max_limit_no_key : limit
    inObjectLimit = config.max_limit_in_object_no_key
  }else {
    limit = limit > config.max_limit_key ? config.max_limit_key : limit
    inObjectLimit = config.max_limit_in_object_key
  }

  const dataArray = new Array(+limit).fill(0);

  const newData = changeData(req.body, inObjectLimit);

  const d = dataArray.map(i => uncoverConditions(newData));

  if (sort){

    d.sort((a, b) => {
      if (a[sort] < b[sort])
        return -1;
      if ( a[sort] > b[sort])
        return 1;
      return 0;
    })
  }

  res.send(d);
});

router.get('/product/', (req, res) => {
  let { limit, sort, api_key } = req.query;

  if (!limit){
    limit = 1
  }

  let inObjectLimit
  if (!api_key){
    limit = limit > config.max_limit_no_key ? config.max_limit_no_key : limit
    inObjectLimit = config.max_limit_in_object_no_key
  }else {
    limit = limit > config.max_limit_key ? config.max_limit_key : limit
    inObjectLimit = config.max_limit_in_object_key
  }

  const dataArray = new Array(+limit).fill(0);


  const newData = changeData(mock_io_map.product, inObjectLimit);

  const d = dataArray.map(i => uncoverConditions(newData));

  if (sort){

    d.sort((a, b) => {
      if (a[sort] < b[sort])
        return -1;
      if ( a[sort] > b[sort])
        return 1;
      return 0;
    })
  }

  res.send(d)
})

router.get('/user/',  (req, res) => {
  let { limit, sort, api_key } = req.query;
  if (!limit){
    limit = 1
  }

  let inObjectLimit
  if (!api_key){
    limit = limit > config.max_limit_no_key ? config.max_limit_no_key : limit
    inObjectLimit = config.max_limit_in_object_no_key
  }else {
    limit = limit > config.max_limit_key ? config.max_limit_key : limit
    inObjectLimit = config.max_limit_in_object_key
  }


  const dataArray = new Array(+limit).fill(0);


  const newData = changeData(mock_io_map.user, inObjectLimit);

  const d = dataArray.map(i => uncoverConditions(newData));
  if (sort){

    d.sort((a, b) => {
      if (a[sort] < b[sort])
        return -1;
      if ( a[sort] > b[sort])
        return 1;
      return 0;
    })
  }
  res.send(d)
})

router.get('/todo/', (req, res) => {
  let { limit, sort, api_key } = req.query;
  if (!limit){
    limit = 1
  }

  let inObjectLimit
  if (!api_key){
    limit = limit > config.max_limit_no_key ? config.max_limit_no_key : limit
    inObjectLimit = config.max_limit_in_object_no_key
  }else {
    limit = limit > config.max_limit_key ? config.max_limit_key : limit
    inObjectLimit = config.max_limit_in_object_key
  }
  const dataArray = new Array(+limit).fill(0);


  const newData = changeData(mock_io_map.todo, inObjectLimit);

  const d = dataArray.map(i => uncoverConditions(newData));
  if (sort){

    d.sort((a, b) => {
      if (a[sort] < b[sort])
        return -1;
      if ( a[sort] > b[sort])
        return 1;
      return 0;
    })
  }
  res.send(d)
})

router.get("/test/", async (req, res) => {
 res.send('test')
});


module.exports = router;










