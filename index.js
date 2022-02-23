const express = require('express')
const getMock = require('./routes/getMock')
const bodyParser = require("express");
require('./redefine')
const cors = require("cors");
const app = express()

require('dotenv').config({ path: `prod.env` })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
}))

app.use('/api/', getMock)

app.use('/static/', express.static('images'));


app.listen(process.env.PORT || 5000, () =>
  console.log(`Servers has been started on ${process.env.SERVER_PORT || 5000} port`)
)