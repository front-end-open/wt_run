/*
 * @LastEditTime: 2022-07-10 23:49:39
 * @Description:
 * @Date: 2022-07-10 22:28:50
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { ComputedS } from './computed';
import { effectV2 } from '@/utils/common';

export const ccomputed: ComputedS = (getter: effecFn) => {
  // getter看做是外部传入的真是effect
  const effecFn = effectV2(getter, {
    lazy: true,
  });

  const obj = {
    get value() {
      return effecFn();
    },
  };

  return obj;
};
