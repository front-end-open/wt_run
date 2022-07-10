/*
 * @LastEditTime: 2022-07-10 23:09:41
 * @Description:
 * @Date: 2022-07-07 23:23:50
 * @Author: wangshan
 * @LastEditors: wangshan
 */

declare type effecFn = () => number | string | void;

declare type ConstV = string;

// 接口，混合类型定义： 函数，基本类型

// 混合类型，提供函数接口，使其可以像访问对象一样操作函数
declare interface EffectFn<T> {
  (fn?: () => number | string | void): number | string | void;
  deps?: (number | string | Set<T>)[];
  options?: { schduler?: (fn: effecFn) => void };
}
