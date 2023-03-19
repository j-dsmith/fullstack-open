const server = require("./bin/server.js");
const config = require("./utils/config");
const app = require("./app");

server.listen(config.PORT, () => {
  console.log(`Server listening on PORT: ${config.PORT}`);
});
