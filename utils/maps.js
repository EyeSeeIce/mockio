const types = require('./dataTypes')

class MockIoMaps {

  product = {
    product_name: types.title+'#1',
    short_description: types.description+'#3',
    long_description: types.description+'#10',
    cost: types.r_n+'#500',
    product_image: types.img
  }

  user = {
    first_name: types.first_name,
    last_name: types.last_name,
    age: types.age,
    phone: types.phone,
    country: types.country,
    city: types.city,
    zip: types.zip,
    photo: types.img,
    work: {
      company_name: types.company,
      start_work: types.time,
      salary: types.r_n+'#3000'
    }
  }




}



module.exports = new MockIoMaps()