const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/entry.jsx',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 9000,
    https: true,
    inline: false,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'TestSys',
      inject: 'body',
      template: path.join(__dirname, 'src/html/base.ejs'),
      appMountId: 'app-main'
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { // stylesheet
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { // sass
        test: /\.scss$/,
        loader: 'file?name=[name].css!sass?outputStyle=compressed'
      },
      { // less
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      { // image
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: ['file-loader']
      }
    ]
  }
};
