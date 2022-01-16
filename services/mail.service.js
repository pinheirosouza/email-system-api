const { mailModel } = require("../models/mail.model");

module.exports = mailService = {
  create(mail) {
    return mailModel.create(mail);
  },
  find(mail) {
    return mailModel.find(mail).populate("sentBy").populate("receivedBy");
  },
  findOne(mail) {
    return mailModel.findOne(mail);
  },
  update(id, mail) {
    return mailModel.findByIdAndUpdate(id, mail);
  },
  delete(id) {
    return mailModel.findByIdAndRemove(id);
  },
};
