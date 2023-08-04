const path = require('path');

module.exports = {
  entry: {main: './src/index.js'},
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, 'build'),
    compress: true
  }
}