require("dotenv/config");

module.exports = {
  name: process.env.APPLICATION_NAME,
  url: process.env.APPLICATION_URL,
  port: process.env.PORT,
  secret_key: process.env.JWT_SECRET,
};
