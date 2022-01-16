require("dotenv/config");

const { app } = require("./app");
const { name, url, port } = require("./configs/application.config");
const socketIO = require("socket.io");

global.connectedUsers = {};

const server = app.listen(port, () => {
  console.log(`${name} running successfully at ${url}:${port}`);
});

global.io = socketIO(server, {
  pingInterval: 15000,
  pingTimeout: 30000,
  cors: {
    transports: ["websocket"],
  },
});

global.io.on("connection", (client) => {
  client.on("join", (user) => {
    // console.log(`${client.id}: Page ${page} -> Joined`);
    global.connectedUsers[client.id] = user;
    console.log(connectedUsers);
  });

  client.on("disconnect", () => {
    // console.log(
    //   `${client.id}: Page ${connectedUsers[client.id]} -> Disconnected`
    // );
    delete global.connectedUsers[client.id];
    console.log(connectedUsers);
  });
});
