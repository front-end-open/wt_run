/*
 * @LastEditTime: 2022-07-15 00:44:14
 * @Description: watch监听测试
 * @Date: 2022-07-14 23:55:35
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { obj } from '../../../src/utils/common';
import { watchV2 } from '../../../src/watch/utils/watch';

//分组测试watch，全量监听
describe('watch全量更新检测', () => {
  let printlog = false;

  beforeEach(() => {
    watchV2(obj, () => {
      // 更新日志
      printlog = true;
    });
    (obj.st as number)++;
  });

  afterEach(() => {
    printlog = false;
  });

  test('检测st是否更新-1', () => {
    expect(printlog).not.toBeFalsy();
  });

  test('检测st是否更新-2', () => {
    expect(printlog).toBeTruthy();
  });
});

// watch定向更新监听测试
describe('watch定向更新', () => {
  let isupdate = false;

  let old: number, newV: number;
  beforeAll(() => {
    let geter = () => {
      return obj.foo;
    };
    watchV2(geter as effecFn, (o, n) => {
      old = o as number;
      newV = n as number;
      isupdate = true;
    });
  });

  //   beforeEach(() => {
  //     (obj.foo as number)++;
  //   });

  afterEach(() => {
    isupdate = false;
  });
  // 第一组对 foo更新
  test('测试foo是否更新', () => {
    (obj.foo as number)++;
    expect(isupdate).toBeTruthy();
  });

  // 第二组更新值是否相等
  test('old equalTo newV', () => {
    expect(old).not.toBe(newV);
  });
  // 第三组测试未被监听的特性是否引起更新
  test('测试未被收集依赖是否更新', () => {
    (obj.step as number)++;
    expect(isupdate).not.toBeTruthy();
  });
});
