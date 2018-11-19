const ReactLoadableWebpack = require('react-loadable/webpack');
const path = require('path')

module.exports = {
  entry: path.join(__dirname, './client/src/index.js'),
  resolve: {
    modules: [
      path.resolve( "./client" ),
      "node_modules",
    ],
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, './client/public')
  },
  devServer: {
    contentBase: path.join(__dirname, './client/public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }  
    ],
  },
  plugins: [
    new ReactLoadableWebpack.ReactLoadablePlugin({
      filename: './client/public/loadable-bundleinfo.json',
    })
  ]
}
