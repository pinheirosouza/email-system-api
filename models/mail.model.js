const { Schema, model } = require("mongoose");

const mailModel = new Schema({
  subject: { type: String, required: true },
  message: { type: String, required: true },
  receivedBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
  sentBy: { type: Schema.Types.ObjectId, ref: "user", required: true },
  deleted: { type: Boolean, required: true, default: false },
  read: { type: Boolean, required: true, default: false },
});

mailModel.set("timestamps", true);
module.exports = { mailModel: model("mail", mailModel) };
