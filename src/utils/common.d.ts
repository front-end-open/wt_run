/*
 * @LastEditTime: 2022-07-12 23:21:58
 * @Description:
 * @Date: 2022-07-09 02:39:03
 * @Author: wangshan
 * @LastEditors: wangshan
 */
export type effecFn = () => number | string | void | boolean;

export type Options = {
  schduler?: EffectFn<effecFn>;
  lazy?: boolean;
};
