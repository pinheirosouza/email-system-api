const express = require("express");

const cors = require("cors");
const cookieParser = require("cookie-parser");

require("express-async-errors");

const { connect } = require("./databases/mongoose.database");

const { authRoutes } = require("./routes/auth.routes");
const { noAuthRoutes } = require("./routes/noauth.routes");
const authorizer = require("./routes/authorizers/authorizer");

class App {
  constructor() {
    this.server = express();
    this.start();
  }

  start() {
    this.middlewares();
    this.database();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(cookieParser());
  }

  database() {
    connect();
  }

  routes() {
    this.server.use("/auth", authorizer, authRoutes);
    this.server.use("/", noAuthRoutes);
  }
}

module.exports = { app: new App().server };
