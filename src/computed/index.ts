/*
 * @LastEditTime: 2022-07-10 02:40:14
 * @Description: computed and lazy
 * @Date: 2022-07-10 00:45:14
 * @Author: wangshan
 * @LastEditors: wangshan
 */

// 为副作用调度函数effectV2传递可选参数lazy，标志副作用函数调度可以按需调度
import { log } from '@/common/util';
import { effectV2, obj } from '@/utils/common';

effectV2(() => {
  console.log('非lazy，立即调度', obj.text);
});

const effect = effectV2(
  () => {
    console.log('lazy调度');

    return (obj.st as number) + (obj.st as number);
  },
  {
    lazy: true,
  }
);

log(effect() as number);
