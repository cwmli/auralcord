const path = require('path')

module.exports = {
  entry: path.join(__dirname, './client/src/index.js'),
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['env', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader/locals'
      },
      {
        test: /\.(svg|png)$/,
        loader: 'file-loader?emitFile=false'
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?emitFile=false'
      }
    ]
  }
}
