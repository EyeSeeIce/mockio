const express = require('express')
const getMock = require('./routes/getMock')
const bodyParser = require("express");
require('./redefine')
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/', getMock)

app.use('/static/', express.static('images'));


app.listen(process.env.SERVER_PORT || 5000, () =>
  console.log(`Servers has been started on ${process.env.SERVER_PORT || 5000} port`)
)