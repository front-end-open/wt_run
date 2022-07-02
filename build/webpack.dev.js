/*
 * @LastEditTime: 2022-07-02 21:15:28
 * @Description: development
 * @Date: 2022-07-02 20:15:00
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const { merge } = require("webpack-merge");
const common = require("./webpack.base");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "../dist",
  },
});
