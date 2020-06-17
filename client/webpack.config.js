const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/client.ts",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  output: {
    filename: "assertly.js",
    path: path.resolve("./public/client/lib/"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      }
    ],
  }
};
