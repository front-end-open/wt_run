/*
 * @LastEditTime: 2022-07-10 23:31:33
 * @Description:
 * @Date: 2022-07-09 02:39:03
 * @Author: wangshan
 * @LastEditors: wangshan
 */
export type effecFn = () => number | string | void;

export type Options = {
  schduler?: EffectFn<effecFn>;
  lazy?: boolean;
};
