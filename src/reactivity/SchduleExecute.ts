/*
 * @LastEditTime: 2022-07-10 00:35:11
 * @Description: 调度执行
 * @Date: 2022-07-09 02:21:12
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { effectV2, obj } from '@/utils/common';
import { JobQueue, flusJob } from '@/utils/TaskQueue';

/**
 * 响应式系统特性之一: 可调度行
 * 副作用函数调用执行时，存在决定副作用函数调度执行次数，时机，方式的可能方法.[本地响应式系统的触发动作就是trigger]
 */

//实现: 为副作用函数传入调度选项调度器 schduler; 控制调度器调用顺序
// effectV2(
//   () => {
//     //   console.clear();
//     console.log(obj.foo);
//   },
//   {
//     // 开启调度器
//     schduler(fn: effecFn) {
//       setTimeout(fn, 100);
//     },
//   }
// );

// (obj.foo as number)++;

// console.log('结束了');

// 控制副作用调用次数
// effectV2(() => {
//   //   console.clear();
//   console.log(obj.st);
// });

// (obj.st as number)++;
// (obj.st as number)++;

// 打印结果 1, 2, 3

// 忽略中间过渡状态2

effectV2(
  () => {
    console.log(obj.st);
  },
  {
    schduler(fn: effecFn) {
      console.log('执行调度器');

      JobQueue.add(fn); // 加入副作用到微任务队列
      // 刷新任务
      flusJob();
    },
  }
);
// 更新
console.log('更新1');
(obj.st as number)++;
console.log('更新2');
(obj.st as number)++;

/**
 * 实现调取器调用次数的原理，采用js-Event-loop执行机制，在单次事件循环tick内，宏任务优先与微任务执行，当所有同步任务执行完毕之后，在执行微任务。
 * 本次控制微任务队列执行顺序，还通过标志量isFlushing来对后续的微任务执行终止
 *
 */
