/*
 * @LastEditTime: 2022-07-07 23:10:14
 * @Description:
 * @Date: 2022-07-02 20:14:23
 * @Author: wangshan
 * @LastEditors: wangshan
 */
const path = require('path');
const WebpackBar = require('webpackbar'); // 编译进度条
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin'); // 编译时类型检查[单独进程]
const ESLintPlugin = require('eslint-webpack-plugin'); // lint code

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src') + '/index.ts',
  },
  output: {
    filename: 'static/js/[name].[contenthash].bundle.js', // 添加contenthash，只在内容变更时，更新hash. 利用浏览器缓存
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // 配置ts文件检测
        exclude: /node_modules/, // 排查指定模块[node_modules]下的模块解析
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            // options: {
            //   transpileOnly: true, // 关闭编译时，类型检查. 提高编译效率, < 9.3.0 需要添加此options
            // },
          },
        ],
      },
    ],
  },

  resolve: {
    modules: [path.resolve(__dirname, '../src'), 'node_modules'], // 设置模块搜索目录范围，优化编译效率. 测试发现编译效率没有明显提升
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.js', '.ts', 'tsx', '...'], // 模块解析规则, ... 用于访问webpack配置默认的解析规则. 扩展解析顺序从前往后; 配置此规则，在代码内导入模块时，可以待后缀
  },
  // 开启缓存，提升构建效率
  cache: {
    type: 'filesystem', // 使用文件缓存
  },

  optimization: {
    moduleIds: 'deterministic', // 设置模块标识符,  避免不必要的bundle的hash变化
    runtimeChunk: true, // 最小化entry-chunk,减少chunk体积，提高性能
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
          // name: 'vendors', 一定不要定义固定的name, 切记不要为 cacheGroups 定义固定的 name，因为 cacheGroups.name 指定字符串或始终返回相同字符串的函数时，会将所有常见模块和 vendor 合并为一个 chunk。这会导致更大的初始下载量并减慢页面加载速度。
          priority: 10, // 优先级
          enforce: true,
        },
      },
    },
  },

  // 资源(asset)和入口起点超过指定文件限制
  performance: {
    hints: 'error',
    maxAssetSize: 5000000, // 设置出口bundle输出体积限制
    maxEntrypointSize: 5000000, // 设置入口chunk体积限制
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '/public/index.html',
    }),
    new WebpackBar({
      // 构建进度条
      color: '#85d', // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),

    new ForkTsCheckerWebpackPlugin({
      async: false, // 设置false, webpack构建进程等待fork-ts-webpack-plugin完成类型检查, 在做ts--> js的编译处理
    }),

    new ESLintPlugin({
      // 启用ts-codelint
      extensions: ['ts'],
    }),
  ],
};
