/*
 * @LastEditTime: 2022-07-09 03:33:25
 * @Description: 调度执行
 * @Date: 2022-07-09 02:21:12
 * @Author: wangshan
 * @LastEditors: wangshan
 */

import { effectV2, obj } from '@/utils/common';

/**
 * 响应式系统特性之一: 可调度行
 * 副作用函数调用执行时，存在决定副作用函数调度执行次数，时机，方式的可能方法.[本地响应式系统的触发动作就是trigger]
 */

//实现: 为副作用函数传入调度选项调度器 schduler
effectV2(
  () => {
    //   console.clear();
    console.log(obj.foo);
  },
  {
    // 开启调度器
    schduler(fn: effecFn) {
      setTimeout(fn, 100);
    },
  }
);

(obj.foo as number)++;

console.log('结束了');
