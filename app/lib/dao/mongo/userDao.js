'use strict';

const User = require('../../models/userModel');
const BaseDao = require('./baseDao');

class UserDao extends BaseDao {
  constructor() {
    super();
  }

  signup(params) {
    return User.create(params);
  }

  getUser(params) {
    const query = params;
    const projection = { name: 1, email: 1, mobileNo: 1, password: 1 };
    return User.findOne(query, projection).lean();
  }

  getUsers() {
    return User.find({});
  }
}

module.exports = UserDao;
