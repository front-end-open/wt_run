/*
 * @LastEditTime: 2022-07-03 07:37:38
 * @Description: production
 * @Date: 2022-07-02 20:14:29
 * @Author: wangshan
 * @LastEditors: wangshan
 */

const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin({
  disable: false, // 禁用构建效率分析
});
module.exports = smp.wrap(
  merge(common, {
    mode: 'production',
    plugins: [
      new BundleAnalyzerPlugin({
        generateStatsFile: true,
      }),
    ],
  })
);
