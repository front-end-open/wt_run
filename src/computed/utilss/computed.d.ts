/*
 * @LastEditTime: 2022-07-10 23:52:11
 * @Description: 计算属性api类型
 * @Date: 2022-07-10 22:28:59
 * @Author: wangshan
 * @LastEditors: wangshan
 */

// 本地模型文件
// 模块类型文件
// 全局声明文件，不能使用export, import 关键字。否则会被作为模块处理
export interface ComputedS {
  (getter: effecFn): void;
}
