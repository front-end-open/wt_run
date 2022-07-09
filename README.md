## TS-VueDeep

> ts 开发环境

## Feature

- [x] 单元测试
- [x] ts 集成环境
- [x] webpack 构建优化

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

## tsconfigs 配置说明

```ts
{
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "include": ["./test.ts"],
   // 指定需要编译文件 否则默认当前目录下除了exclude之外的所有.ts, .d.ts,.tsx 文件
   "files": ["./src/**/*"],
   // 不编译某些文件
   "exclude": ["test.ts"],
   "compilerOptions": {
       // 只编译修改过的文件,这个时候会生成tsconfig.tsbuildinfo,下次编译的时候会进行对比只编译修改过的文件
       "incremental": true,
       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
       "target": "es5",
       // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
       "module": "commonjs",
       /* 注意：如果未指定--lib，则会注入默认的librares列表。注入的默认库为：
       对于 --target ES5: DOM,ES5,ScriptHost
       对于 --target ES6: DOM,ES6,DOM.Iterable,ScriptHost
       TS 绝不会在您的代码中注入polyfill,所以需要你自己制定编译lib */
       "lib": ["es5", "dom", "ScriptHost", "es2015.promise"],
       // 允许编译JS
       "allowJs": true,
       /* 是否检测JS的语法,例如下面的语法编辑器会报错
       let name = 'paul';
       console.log(name.a.b) */
       "checkJs": true,
       // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
       "jsx": preserve,
       /* 如果设为true，编译每个ts文件之后会生成一个js文件和一个声明文件,
       declaration和allowJs不能同时设为true */
       "declaration": true
       // 值为true或false，指定是否为声明文件.d.ts生成map文件
       "declarationMap": true
       // 用来指定编译时是否生成.map文件
       "sourceMap": true,
       // 当module设置为 'amd' and 'system'的时候可以使用此命令,这样可以将ts文件打包到一个目录下
       "outFile":"./",
       //  outDir 编译后的文件存到到哪个目录下,默认是每一个ts文件的当前目录,,下面的配置就是把ts编译到build目录下
       "outDir": './build',
       // 下面单独介绍
       "rootDir": "./src",
       // 是否编译构建引用项目,很复杂后面介绍
       "composite": true,
       // 指定文件用来存储增量编译信息,默认是tsconfig.tsbuildinfo
       "tsBuildInfoFile": "./",
       // 编译的时候删除注释
       "removeComments": true,
       // 不生成编译文件，这个一般比较少用,这个build目录下将没有任何文件,但是会进行编译,有错误会抛出
       "noEmit": true,
       // 是否引入npm包tslib中的辅助函数,__extends等
       "importHelpers": true,
       // 当target为'ES5' or 'ES3'时，为'for-of', spread, and destructuring'中的迭代器提供完全支持
       "downlevelIteration": true,
       // isolatedModules的值为true或false，指定是否将每个文件作为单独的模块，默认为true，它不可以和declaration同时设定
       // 不是很理解,将每一个文件作为单独模块
       "isolatedModules": true,
       /* Strict Type-Checking Options */
       // 严格模式将会打开下面的几个选项
       "strict": false,
       /* 不允许变量或函数参数具有隐式any类型,例如
       function(name) {
           return name;
       } */
       "noImplicitAny": true,
       // null类型检测,const teacher: string = null;会报错
       "strictNullChecks": true,
       // 对函数参数进行严格逆变比较
       "strictFunctionTypes": true,
       // 严格检查bind call apply
       "strictBindCallApply": true,
       // 此规则将验证构造函数内部初始化前后已定义的属性。
       "strictPropertyInitialization": true,
       // 检测this是否隐式指定
       "noImplicitThis": true,
       // 使用js的严格模式,在每一个文件上部声明 use strict
       "alwaysStrict": true,
       /* Additional Checks */
       // 默认false,是否检测定义了但是没使用的变量
       "noUnusedLocals": true,
       // 用于检查是否有在函数体中没有使用的参数
       "noUnusedParameters": true,
       // 用于检查函数是否有返回值，设为true后，如果函数没有返回值则会提示
       "noImplicitReturns": true,
       // 用于检查switch中是否有case没有使用break跳出switch
       "noFallthroughCasesInSwitch": true,
       /* Module Resolution Options */
       // 用于选择模块解析策略，有'node'和'classic'两种类型
       "moduleResolution": "node",
       // 复杂的很 下面单独介绍这三个模块
       "baseUrl": './'
       "paths": {},
       "rootDirs": [],
       /* typeRoots用来指定声明文件或文件夹的路径列表，如果指定了此项，则只有在这里列出的声明文件才会被加载 */
       typeRoots: [],
       // types用来指定需要包含的模块，只有在这里列出的模块的声明文件才会被加载进来
       types:[],
       // 用来指定允许从没有默认导出的模块中默认导入
       "allowSyntheticDefaultImports": true,
       // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
       "esModuleInterop": true ,
       // 不把符号链接解析为真实路径，具体可以了解下webpack和node.js的symlink相关知识
       "preserveSymlinks": true,
       "allowUmdGlobalAccess": true,

       // sourceRoot用于指定调试器应该找到TypeScript文件而不是源文件的位置，这个值会被写进.map文件里
       "sourceRoot": '',
       // mapRoot用于指定调试器找到映射文件而非生成文件的位置，指定map文件的根路径，该选项会影响.map文件中的sources属性
       "mapRoot",
       // inlineSourceMap指定是否将map文件内容和js文件编译在一个同一个js文件中，如果设为true,则map的内容会以//#soureMappingURL=开头，然后接base64字符串的形式插入在js文件底部
       "inlineSourceMap": true,
       // inlineSources用于指定是否进一步将ts文件的内容也包含到输出文件中
       "inlineSources": true,

       // experimentalDecorators用于指定是否启用实验性的装饰器特性
       "experimentalDecorators": true,

       // emitDecoratorMetadata用于指定是否为装上去提供元数据支持，关于元数据，也是ES6的新标准，可以通过Reflect提供的静态方法获取元数据，如果需要使用Reflect的一些方法，需要引用ES2015.Reflect这个库
       "emitDecoratorMetadata": true,
       // compileOnSave的值是true或false，如果设为true，在我们编辑了项目中的文件保存的时候，编辑器会根据tsconfig.json中的配置重新生成文件，不过这个要编辑器支持
       "compileOnSave": true,
       // 很复杂 下面介绍
       "references":[]",
   }
}

```

## 测试

#### 测试模式

> 测试专注两种模式

1. 集成测试

> 这些测试侧重于我们的应用程序组件如何相互交互以实现预期结果，即我们测试服务、路由和数据访问层（DAL）的结果

2. 单元测试

> 这些测试专注于特定组件的操作，而不关注它引用的其他组件，即模拟外部组件，以便我们可以单独测试组件
