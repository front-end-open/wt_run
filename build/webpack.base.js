/*
 * @LastEditTime: 2022-07-02 21:46:04
 * @Description:
 * @Date: 2022-07-02 20:14:23
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const path = require("path");
const WebpackBar = require("webpackbar");
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
      template: "/public/index.html",
    }),
    new WebpackBar({
      // 构建进度条
      color: "#85d", // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
  ],
};
