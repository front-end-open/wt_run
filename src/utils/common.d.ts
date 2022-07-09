/*
 * @LastEditTime: 2022-07-10 01:07:57
 * @Description:
 * @Date: 2022-07-09 02:39:03
 * @Author: wangshan
 * @LastEditors: wangshan
 */
type effecFn = () => void;

export type Options = {
  schduler: EffectFn<effecFn>;
  lazy: boolean;
};
