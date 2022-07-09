/*
 * @LastEditTime: 2022-07-10 02:34:03
 * @Description:
 * @Date: 2022-07-09 02:39:03
 * @Author: wangshan
 * @LastEditors: wangshan
 */
type effecFn = () => number | string | void;

export type Options = {
  schduler?: EffectFn<effecFn>;
  lazy?: boolean;
};
