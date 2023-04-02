const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/web-shopping.js",
  devtool: "source-map",
  devServer: {
    static: path.join(__dirname, "public"),
    compress: true,
    port: 5000
  },
  output: {
    filename: "web-shopping.js",
    path: path.resolve(__dirname, "public")
  },
  module: {
    rules: [
    { test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] },
        }
      }
    ],
  },
};
