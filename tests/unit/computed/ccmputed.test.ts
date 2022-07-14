/*
 * @LastEditTime: 2022-07-15 00:57:15
 * @Description: 计算属性模块测试
 * @Date: 2022-07-10 23:54:28
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { obj } from '../../../src/utils/ComputedTool';
import { ccomputed } from '../../../src/computed/utilss/computedD';

let computedR: any;

beforeAll(() => {
  computedR = ccomputed(() => {
    return (obj.st as number)++;
  });
});

test('计算属性测试', () => {
  expect(2).not.toBe(computedR.value);
});
