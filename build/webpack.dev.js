/*
 * @LastEditTime: 2022-07-03 07:42:33
 * @Description: development
 * @Date: 2022-07-02 20:15:00
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.base');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin({
  disable: false, // 禁用构建效率分析
});

module.exports = smp.wrap(
  merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: '../dist',
      hot: true,
    },
  })
);
