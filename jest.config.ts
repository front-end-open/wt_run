/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true, // 开启新的测试用例前，保留之前快照
  preset: 'ts-jest', // ts-jest预设对ts文件测试
  clearMocks: true, // 每次构建测试之前，清除mock调用，实例，上下文信息
  collectCoverage: true, // 依赖收集
  coverageDirectory: 'tests/coverage', // 测试报告生成目录
  collectCoverageFrom: ['<rootDir>/src/**/*.ts?'], // 测试报告收集范围
  coverageProvider: 'v8', // 测试报告需要的provider供应商: v8 | babel
  moduleFileExtensions: [
    // 模块解析文件类型
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  rootDir: '.', // 应用所在的根目录
  //   modulePaths: ['<rootDir>/src/'],
  moduleNameMapper: {
    // 模块别名匹配
    '/^@(.*)$': '<rootDir>/src/$1', // 类似 webpack.resolve.alias
  },
  modulePathIgnorePatterns: ['tests/coverage'], // 测试搜索范围排除目录
  testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testEnvironment: 'node', // 测试环境: jsdom 浏览器环境; node
  //   globals: {
  //     'ts-jest': {
  //       tsconfig: './tsconfig.json',
  //       isolatedModules: true,
  //     },
  //   },
};

export default config;

// export const config: Config.InitialOptions = {
//   // All imported modules in your tests should be mocked automatically
//   // automock: false,

//   // Stop running tests after `n` failures
//   // bail: 0,

//   // The directory where Jest should store its cached dependency information
//   // cacheDirectory: "/private/var/folders/dv/vxqcr3_95kl8fcfcfkz5l7sh0000gn/T/jest_dx",

//   // Automatically clear mock calls, instances, contexts and results before every test
//   clearMocks: true,

//   // Indicates whether the coverage information should be collected while executing the test
//   collectCoverage: true,

//   // An array of glob patterns indicating a set of files for which coverage information should be collected
//   collectCoverageFrom: ['**/src/*'],

//   // The directory where Jest should output its coverage files
//   coverageDirectory: 'coverage', // 测试报告生成目录

//   // An array of regexp pattern strings used to skip coverage collection
//   //   coveragePathIgnorePatterns: [
//   //     // 测试报告忽略搜集目录
//   //     '/node_modules/',
//   //     '/build/',
//   //     '/dist/',
//   //     '/public/',
//   //   ],

//   // Indicates which provider should be used to instrument code for coverage
//   coverageProvider: 'v8',

//   // A list of reporter names that Jest uses when writing coverage reports
//   coverageReporters: ['json', 'text', 'lcov', 'clover'],

//   // An object that configures minimum threshold enforcement for coverage results
//   // coverageThreshold: undefined,

//   // A path to a custom dependency extractor
//   // dependencyExtractor: undefined,

//   // Make calling deprecated APIs throw helpful error messages
//   // errorOnDeprecated: false,

//   // The default configuration for fake timers
//   // fakeTimers: {
//   //   "enableGlobally": false
//   // },

//   // Force coverage collection from ignored files using an array of glob patterns
//   // forceCoverageMatch: [],

//   // A path to a module which exports an async function that is triggered once before all test suites
//   // globalSetup: undefined,

//   // A path to a module which exports an async function that is triggered once after all test suites
//   // globalTeardown: undefined,

//   // A set of global variables that need to be available in all test environments
//   // globals: {},

//   // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
//   // maxWorkers: "50%",

//   // An array of directory names to be searched recursively up from the requiring module's location
//   //   moduleDirectories: ['node_modules', 'src', 'test'],

//   // An array of file extensions your modules use
//   moduleFileExtensions: [
//     'ts',
//     'mjs',
//     'cjs',
//     'jsx',
//     'js',
//     'tsx',
//     'json',
//     'node',
//   ],

//   // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
//   //   moduleNameMapper: {
//   //     '/^@(.*)$': '<rootDir>/src/$1', // 类似 webpack.resolve.alias
//   //   },

//   // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
//   // modulePathIgnorePatterns: [],

//   // Activates notifications for test results
//   // notify: false,

//   // An enum that specifies notification mode. Requires { notify: true }
//   // notifyMode: "failure-change",

//   // A preset that is used as a base for Jest's configuration
//   preset: 'ts-jest',

//   // Run tests from one or more projects
//   // projects: undefined,

//   // Use this configuration option to add custom reporters to Jest
//   // reporters: undefined,

//   // Automatically reset mock state before every test
//   // resetMocks: false,

//   // Reset the module registry before running each individual test
//   // resetModules: false,

//   // A path to a custom resolver
//   // resolver: undefined,

//   // Automatically restore mock state and implementation before every test
//   // restoreMocks: false,

//   // The root directory that Jest should scan for tests and modules within
//   //   rootDir: process.cwd(),

//   // A list of paths to directories that Jest should use to search for files in
//   //   roots: ['<rootDir>'],

//   // Allows you to use a custom runner instead of Jest's default test runner
//   // runner: "jest-runner",

//   // The paths to modules that run some code to configure or set up the testing environment before each test
//   // setupFiles: [],

//   // A list of paths to modules that run some code to configure or set up the testing framework before each test
//   // setupFilesAfterEnv: [],

//   // The number of seconds after which a test is considered as slow and reported as such in the results.
//   // slowTestThreshold: 5,

//   // A list of paths to snapshot serializer modules Jest should use for snapshot testing
//   // snapshotSerializers: [],

//   // The test environment that will be used for testing
//   // 设置测试环境
//   testEnvironment: 'node',

//   // Options that will be passed to the testEnvironment
//   // testEnvironmentOptions: {},

//   // Adds a location field to test results
//   // testLocationInResults: false,

//   // The glob patterns Jest uses to detect test files
//   testMatch: ['**/tests/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

//   // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
//   // testPathIgnorePatterns: [
//   //   "/node_modules/"
//   // ],

//   // The regexp pattern or array of patterns that Jest uses to detect test files
//   // testRegex: [],

//   // This option allows the use of a custom results processor
//   // testResultsProcessor: undefined,

//   // This option allows use of a custom test runner
//   // testRunner: "jest-circus/runner",

//   // A map from regular expressions to paths to transformers
//   transform: {
//     '^.+\\.tsx?$': 'ts-jest',
//   },

//   // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
//   // transformIgnorePatterns: [
//   //   "/node_modules/",
//   //   "\\.pnp\\.[^\\/]+$"
//   // ],

//   // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
//   // unmockedModulePathPatterns: undefined,

//   // Indicates whether each individual test should be reported during the run
//   verbose: true,

//   // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
//   // watchPathIgnorePatterns: [],

//   // Whether to use watchman for file crawling
//   // watchman: true,
// };
