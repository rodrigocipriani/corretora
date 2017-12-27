var webpack = require('webpack');

var config = {
  context: __dirname + '/src', // `__dirname` is root of project and `src` is source
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/build', // `dist` is the destination
    publicPath: "/assets/",
    filename: 'bundle.js',
  },
  target: 'node',
  resolve: {
    modules: [__dirname, 'node_modules'],
    extensions: ['*','.js','.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        //exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;