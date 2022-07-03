/*
 * @LastEditTime: 2022-07-04 01:26:47
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
    optimization: {
      // 代码分离, 可快可共享chunk,抽离到单独的chunk
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        // 重复打包问题
        cacheGroups: {
          vendors: {
            // node_modules里的代码
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            // name: 'vendors', 一定不要定义固定的name
            priority: 10, // 优先级
            enforce: true,
          },
        },
      },
    },
  })
);
