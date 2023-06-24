const path = require("path");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "kc2.js",
  },
  resolve: {
    extensions: [".js"],
    modules: [
      "node_modules", // The default
      "src",
    ],
  },
};

module.exports = config;
