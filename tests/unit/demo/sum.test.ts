/*
 * @LastEditTime: 2022-07-10 18:20:05
 * @Description: 求和测试
 * @Date: 2022-07-10 03:49:07
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { sum } from '../../../src/sum/sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
