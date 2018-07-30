const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
  DIST: path.resolve(__dirname, "build/public"),
  PUBLIC: path.resolve(__dirname, "src/public")
};
// Webpack configuration
module.exports = {
  devtool: 'source-map',
  entry: path.join(paths.PUBLIC, "index.js"),
  mode: "production",
  output: {
    path: paths.DIST,
    filename: "app.bundle.js"
  },
  devServer: {
    port: 4000,
    open: false,
    proxy: {
      "/graphql": "http://localhost:8080"
    },
    contentBase: paths.PUBLIC
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.PUBLIC, "index.html")
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(s*)css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
