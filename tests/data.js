const faker = require('faker');

exports.USER_SIGNUP_DATA = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    countryCode: '+91',
    mobileNo: Math.floor(Math.random() * 10000000000)
};

exports.USER_SIGNIN_DATA = {
    email: faker.internet.email(),
    password: faker.internet.password()
};
