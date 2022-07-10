/*
 * @LastEditTime: 2022-07-10 23:47:44
 * @Description: 计算属性api类型
 * @Date: 2022-07-10 22:28:59
 * @Author: wangshan
 * @LastEditors: wangshan
 */
export interface ComputedS {
  (getter: effecFn): void;
}
