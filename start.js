const app = require("./app");
const debug = require("debug")("express-example:server");
const http = require("http");

async function startServer({ port = process.env.PORT } = {}) {
  app.set("port", port);
  return new Promise((resolve) => {
    const server = http.createServer(app).listen(port);
    server.on("listening", () => {
      debug(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
}

module.exports = startServer;
