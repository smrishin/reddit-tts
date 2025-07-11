if (process.env.NODE_ENV === "localhost") {
  module.exports = require("./winston").logger;
} else {
  module.exports = require("./custom");
}
