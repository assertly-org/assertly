const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/client.js',
  devtool: 'source-map',
  output: {
    filename: 'assertly.js',
    path: path.resolve('./public/client/lib/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-transform-regenerator',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      }
    ]
  }
};
