/*
 * @LastEditTime: 2022-07-12 01:05:08
 * @Description:
 * @Date: 2022-07-10 22:28:50
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { ComputedS } from './computed';
import { effectV2, trigger } from '../../utils/common';

export const ccomputed: ComputedS = (getter: effecFn) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any; // 缓存每次计算结果
  let dirty = true; // 标志量，决定每次是否需要从新计算. 需要代表`脏`需要计算，否则不需要.
  // eslint-disable-next-line no-var
  var obj = {
    get value() {
      if (dirty) {
        value = effecFn(); // 缓存结果

        // 重置标志量
        dirty = false;
      }

      return value;
    },
  };
  // getter看做是外部传入的真是effect
  const effecFn = effectV2(getter, {
    lazy: true,
    schduler() {
      dirty = true; // 每次调用完，重置dirty状态。避免后续更新。dirty一直为false。

      // 当计算属性所依赖的数据更新时，调用trigger手动更新value
      trigger(obj, 'value');
    },
  });

  return obj;
};
