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

const corsOpts = {
  origin: ['https://mock-dev.ru/', 'http://localhost:3000/', 'http://mockio.ru', 'https://mockio.ru','http://localhost:5000/', '*'],

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],
  allowedHeaders: '*'
};
app.use(cors(corsOpts))

require('dotenv').config({ path: `prod.env` })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.use('/api/', getMock)
app.use('/api/', auth)
app.use('/api/', apiKey)

app.use('/static/', express.static('/opt/mock.io/images'));


app.listen(process.env.PORT || 5000, () =>
  console.log(`Servers has been started on ${process.env.SERVER_PORT || 5000} port`)
)