const { Schema, model } = require("mongoose");

const userModel = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userModel.set("timestamps", true);
module.exports = { userModel: model("user", userModel) };
