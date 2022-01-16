const mongoose = require("mongoose");

const { databaseURI } = require("../configs/mongo.config");

const connect = async () => {
  const options = {
    useNewUrlParser: true,
  };

  await mongoose.connect(databaseURI, options);
};

module.exports = { connect };
