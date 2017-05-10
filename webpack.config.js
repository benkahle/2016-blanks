const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSassPlugin = new ExtractTextPlugin({
  filename: 'style.css', // Output css for production
  disable: process.env.NODE_ENV !== 'production'
})
const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    context: './public',
    from: '**/*'
  }
])

const filename = process.env.NODE_ENV === 'production' ? 'bundle.[hash].js' : 'bundle.js'
const chunkFilename = process.env.NODE_ENV === 'production' ? '[id].[hash].chunk.js' : '[id].chunk.js'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: filename,
    chunkFilename: chunkFilename,
    path: path.resolve(__dirname, './build')
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: {
          loader: 'file-loader?name=assets/[name].[hash].[ext]'
        }
      },
      {
        test: /.scss$/,
        loader: extractSassPlugin.extract({
          use: [{
            loader: 'css-loader' // Allow loading css via require
          }, {
            loader: 'sass-loader' // Compile scss -> css
          }],
          // use style-loader in development
          fallback: 'style-loader' // inline style for development
        })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      baseUrl: '/'
    }),
    copyWebpackPlugin,
    extractSassPlugin
  ],
  devServer: {
    historyApiFallback: true
  }
}
