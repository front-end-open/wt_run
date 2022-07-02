/*
 * @LastEditTime: 2022-07-02 20:43:07
 * @Description: development
 * @Date: 2022-07-02 20:15:00
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const { merge } = require("webpack-merge");
const common = require("./webpack.base");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    hot: true,
    open: true,
  },
});
