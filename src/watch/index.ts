/*
 * @LastEditTime: 2022-07-18 00:53:50
 * @Description: watch实现
 * @Date: 2022-07-12 22:46:42
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { log } from '../common/util';
import { obj } from '../utils/common';
import { watchV2 } from './utils/watch';
// watch(obj, () => {
//   log('数据变化了');
// });

// log((obj.foo as number)++);
// log((obj.foo as number)++);
// watchV2(obj, () => {
//   log('数据变化了');
// });

// // 监听所有数据源
// log((obj.foo as number)++);
// log((obj.st as number)++);
// log((obj.st as number)++);

// never类型推断
// const b: string;

// if (typeof b === 'string') {
//   log(b);
// } else {
//   log(b);
// }

//
// watch数据监听
const geter = () => {
  return obj.foo;
};
watchV2(
  geter as effecFn,
  (o, newV) => {
    log('旧值:' + o);
    log('新值:' + newV);
  },
  {
    immidiate: true,
    flush: 'post', // 有限watch执行
  }
);
(obj.foo as number)++;
(obj.foo as number)++;

log(1111); // 优先与watch回调执行
