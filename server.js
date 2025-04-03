const http = require("http");
const app = require("./app");

const port = 3000;

const server = http.createServer(app);

server.on("error", () => {
  console.log("Error");
  process.exit(1);
});

server.on("listening", () => {
  console.log("Serveur en écoute sur le port " + port);
});

server.listen(port);
