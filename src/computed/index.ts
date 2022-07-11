/*
 * @LastEditTime: 2022-07-11 00:49:35
 * @Description: computed and lazy
 * @Date: 2022-07-10 00:45:14
 * @Author: wangshan
 * @LastEditors: wangshan
 */

// 为副作用调度函数effectV2传递可选参数lazy，标志副作用函数调度可以按需调度
// import { computed, ref } from 'vue';

import { log } from '@/common/util';
import { effectV2, obj } from '@/utils/common';
import { ccomputed } from './utilss/computedD';

effectV2(() => {
  console.log('非lazy，立即调度', obj.text);
});

// const a = ref(1);

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

// 使用vue官方的计算属性API，
// 读取计算属性的值
// const computedA = computed(() => a);
// log(computedA.value, computedA.effect);

// 计算属性使用
log('计算属性使用----------');
const res = ccomputed(() => {
  return (obj.st as number) + (obj.step as number);
});
(obj.st as number)++; // 第一次触发修改 3
log((res as { value: string | number }).value); // 获取计算属性值 3
(obj.st as number)++; // 第二次触发修改, res.value没有更新 3, 预期应该是 4
log((res as { value: string | number }).value); // 再次访问 value, 没有更新 3, 预期应该是4

/**
 *  更新obj.st 后再次访问计算属性没有更新，原因在于第一次访问计算属性value后，dirty的状态已经被重置为false，表示不需要更新。
 *
 *  解决: 为副作用设置调度器，每次更新后，重置dirty状态.
 */
