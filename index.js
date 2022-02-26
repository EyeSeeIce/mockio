const express = require('express')
const getMock = require('./routes/getMock')
const auth = require('./routes/auth')
const apiKey = require('./routes/api_key')
const bodyParser = require("express");
require('./redefine')
const cors = require("cors");
const cookieParser = require("cookie-parser");
const auth_middleware = require('./middlewares/auth_middleware')
const app = express()

require('dotenv').config({ path: `prod.env` })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.use('/api/', getMock)
app.use('/api/', auth)
app.use('/api/',auth_middleware, apiKey)

app.use('/static/', express.static('images'));


app.listen(process.env.PORT || 5000, () =>
  console.log(`Servers has been started on ${process.env.SERVER_PORT || 5000} port`)
)