const types = require('./dataTypes')

class MockIoMaps {

  product = {
    product_name: types.title+'#1',
    short_description: types.description+'#3',
    long_description: types.description+'#10',
    cost: types.number+'#500',
    product_image: types.img
  }

  user = {
    first_name: types.first_name,
    last_name: types.last_name,
    age: types.age,
    phone: types.phone,
    country: types.country,
    gender: types.gender,
    city: types.city,
    zip: types.zip,
    photo: types.img,
    email: types.email,
    work: {
      company_name: types.company,
      start_work: types.time,
      salary: types.number+'#3000'
    }
  }

  todo = {
    complete: types.bool,
    title: types.title+'#2',
    created: types.time+'#YYYY-MM-DD hh:mm'
  }






}



module.exports = new MockIoMaps()