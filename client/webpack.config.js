const path = require('path')

module.exports = options => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      chunkFilename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'public')
    },
    devServer: {
      contentBase: path.join(__dirname, 'public')
    },
    module: {
      rules: [
        {
          test: /.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              },
            },
          ],
        }, {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
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
  }
}
