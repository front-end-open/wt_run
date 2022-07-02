/*
 * @LastEditTime: 2022-07-02 20:41:10
 * @Description: production
 * @Date: 2022-07-02 20:14:29
 * @Author: wangshan
 * @LastEditors: wangshan
 */

const { merge } = require("webpack-merge");
const common = require("./webpack.base");

module.exports = merge(common, {
  mode: "production",
});
