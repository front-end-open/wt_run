## TS-VueDeep

> ts 开发环境

## Feature

#### 构建相关

> 采用 webpack 作为资源构建

- 构建配置分离
- webpackBar【构建进度插件，替换 webpack-cli 内置的 process 进度工具】
- webpack-merge 【配置复用，配置合并】

#### 开发相关

- TypeScript 支持
- TypeScript-lint

## 集成方案 FAQ

1. 关于 ts 编译期的类型检查方案[开发和构建均会做类型检查，错误会导致构建包失败]
   > tsc 本身就有类型检查，而 babel 没有类型检查

- 使用 babel, @babel/preset-typescript. 配合 tsc 做类型检查
- 使用 ts-loader, fork-ts-webpack-plugin，单独进程做编译期的类型检查. 这里也是利用 tsc 的类型检查 [提示不够友好]
  > note ts-loader 的编译时类型检查配置 loader 的选项 transpileOnly： true 开启检查 false 关闭检查[这会缩短编译时间, 但是没有编译时类型检查]
- 模块解析问题
- 使用 fork-ts-webbpack-plugin 作为类型检查方案
  > 相比 ts-loader 类型检查，此插件的类型错误提示更加友好。[推荐]

1. ts 的模块解析

   > tsc 的模块解析是基于编译器的静态路径解析

2. webpack 模块解析
   > webpack 的模块解析是在构建为了构建依赖图，需要明确指定的一个路径别名。区别 ts 的检查机制

## 构建优化

1. code-split

- 多入口起点，重复依赖抽离
- 入口依赖，放置重复。配置 runtimeChunk: 'single', dependOn
- 动态导入

2. 构建速度分析
- 

3. 构建资源分析

- webpack-bundle-analyzer
- https://webpack.jakoblind.no/optimize/#
