const path = require("path");

module.exports = {
  mode: "production",
  entry: "./client.js",
  devtool: "source-map",
  output: {
    filename: "assertly.js",
    path: path.resolve("./public/client/lib/")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
