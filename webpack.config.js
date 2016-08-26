'use strict';

const ProvidePlugin = require('webpack').ProvidePlugin;
const path = require('path')
const output = {
  path: path.resolve(__dirname, 'build'),
  // publicPath: 'http://www.example.com/build/',
  filename: 'bundle.js'
}

module.exports = {
  entry: [
    "./js/board.js",
    "./js/tictactoe.ai.js",
    "./js/tictactoe.draw.js",
    "./js/tictactoe.js",
  ],
  output: output,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          plugins: [
            "babel-plugin-transform-flow-strip-types",
            "babel-plugin-transform-class-properties"
          ]
        }
      },
      // { test: /\.css$/, loader: "style!css" }
    ]
  },
  plugins: [
    // new ProvidePlugin({
    //   AlphaBetaAI: 'AlphaBetaAI'
    // })
  ],
}
