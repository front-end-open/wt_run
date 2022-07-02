/*
 * @LastEditTime: 2022-07-02 20:40:00
 * @Description:
 * @Date: 2022-07-02 20:14:23
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: path.resolve(__dirname, "../src") + "/index.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  output: {
    filename: "[name].min.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "TypeScript",
    }),
  ],
};
