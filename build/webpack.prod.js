/*
 * @LastEditTime: 2022-07-04 02:04:05
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
      runtimeChunk: true, // 最小化entry-chunk,减少chunk体积，提高性能
      // 代码分离, 可快可共享chunk,抽离到单独的chunk
      splitChunks: {
        // include all types of chunks
        chunks: 'all',
        moduleIds: 'deterministic', // 避免不必要的bundle的hash变化
        // 重复打包问题
        cacheGroups: {
          vendors: {
            // node_modules里的代码
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            // name: 'vendors', 一定不要定义固定的name, 切记不要为 cacheGroups 定义固定的 name，因为 cacheGroups.name 指定字符串或始终返回相同字符串的函数时，会将所有常见模块和 vendor 合并为一个 chunk。这会导致更大的初始下载量并减慢页面加载速度。
            priority: 10, // 优先级
            enforce: true,
          },
        },
      },
    },
  })
);
