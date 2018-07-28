const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, 'build/public'),
  PUBLIC: path.resolve(__dirname, 'src/public'),
};
// Webpack configuration
 module.exports = {
  entry: path.join(paths.PUBLIC, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: paths.PUBLIC,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, 'index.html'),
    }),
    new ExtractTextPlugin('style.bundle.css'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
