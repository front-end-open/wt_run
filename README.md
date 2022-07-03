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
- Eslint 的 ts 类型检查

## 集成方案 FAQ

1. 关于 ts 编译期的类型检查方案[开发和构建均会做类型检查，错误会导致构建包失败]
   > tsc 本身就有类型检查，而 babel 没有类型检查

- 使用 babel, @babel/preset-typescript. 配合 tsc 做类型检查
- 使用 ts-loader, fork-ts-webpack-plugin，单独进程做编译期的类型检查. 这里也是利用 tsc 的类型检查 [提示不够友好]
  > note ts-loader 的编译时类型检查配置 loader 的选项 transpileOnly： true 开启检查 false 关闭检查[这会缩短编译时间, 但是没有编译时类型检查]
- 模块解析问题
- 使用 fork-ts-webbpack-plugin 作为类型检查方案
  > 相比 ts-loader 类型检查，此插件的类型错误提示更加友好。[推荐]

关于 ts-loader 和 babel-loader 编译 ts 文件类型编译原理解释

> 环境说明，如果是浏览器环境，需要配合两种工具任选其一对 ts 做翻译. 如果是 node 环境完全可以去除 webpack 的打包，完全使用 ts 工具内置的编译器，tsc 来编译 ts 文件。

> ts-loader 编译 ts 项目的原理是，使用了 typesciprt 的内置编译器 tsc，因此编译规则约束，还必须结合 tsconfig.json。但是目前 tsc 编译器对于草案阶段提案支持不是很好

ts-loader 编译 ts 的特性

- typescript 默认支持很多 es 的特性，但是不支持还在草案阶段的特性
- 构建速度慢
- 完整的编译期的类型检查
- 构建目标 bundle 比较杂乱不规整

> babel-loader 目前可以对 ts 文件类型做编译处理，但是编译方式大大却别与 tsc 的编译。babel 编译没有类型检查，完全就是将源代码移除。完全的类型检查还需要用 tsc 的类型检查。但 babel 对目标浏览器的 polyfill 比较好，支持最新的标准提案，对于不支持的特性配置 broserslistrc 做指定目标的 polyfill 即可.

babel-loader 处理 ts 两大优点

- 能够做更精准的按需编译和 polyfill，产物体积更小
- 能够通过插件来把 polyfill 变成模块化的引入，不污染全局环境

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

## ts 项目的编译器选择
