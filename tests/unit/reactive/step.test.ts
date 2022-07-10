/*
 * @LastEditTime: 2022-07-10 21:43:18
 * @Description:
 * @Date: 2022-07-10 20:51:21
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { effecFn } from '../../../src/utils/common.d';
import { obj, effectV2 } from '../../../src/utils/common';
let effect: EffectFn<effecFn>;
beforeAll(() => {
  effect = effectV2(
    () => {
      return (obj.st as number) + (obj.st as number);
    },
    {
      lazy: true,
    }
  );
});

test('测试副作用返回值', () => {
  expect(2).toBe(effect());
});
