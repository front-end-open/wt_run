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

## 集成方案 FAQ

1. 关于 ts 编译期的类型检查方案[开发和构建均会做类型检查，错误会导致构建包失败]
   > tsc 本身就有类型检查，而 babel 没有类型检查

- 使用 babel, @babel/preset-typescript. 配合 tsc 做类型检查
- 使用 ts-loader, fork-ts-webpack-plugin，单独进程做编译期的类型检查. 这里也是利用 tsc 的类型检查
  > note ts-loader 的编译时类型检查配置 loader 的选项 transpileOnly： true 开启检查 false 关闭检查[这会缩短编译时间, 但是没有编译时类型检查]
