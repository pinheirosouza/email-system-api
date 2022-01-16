const { userModel } = require("../models/user.model");

module.exports = userService = {
  create(user) {
    return userModel.create(user);
  },
  find(user) {
    return userModel.find(user);
  },
  findOne(user) {
    return userModel.findOne(user);
  },
  update(id, user) {
    return userModel.findByIdAndUpdate(id, user);
  },
};
