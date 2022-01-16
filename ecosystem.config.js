module.exports = {
  apps: [
    {
      name: "web",
      script: "./server.js",
      max_memory_restart: "800M",
      instances: "1",
      exec_mode: "cluster",
      watch_delay: 1000,
      watch: ["source"],
      ignore_watch: ["node_modules"],
    },
  ],
};
