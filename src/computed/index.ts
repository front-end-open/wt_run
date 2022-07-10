/*
 * @LastEditTime: 2022-07-11 00:20:12
 * @Description: computed and lazy
 * @Date: 2022-07-10 00:45:14
 * @Author: wangshan
 * @LastEditors: wangshan
 */

// 为副作用调度函数effectV2传递可选参数lazy，标志副作用函数调度可以按需调度
import { computed, ref } from 'vue';

import { log } from '@/common/util';
import { effectV2, obj } from '@/utils/common';
import { ccomputed } from './utilss/computedD';

effectV2(() => {
  console.log('非lazy，立即调度', obj.text);
});

const a = ref(1);

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
const computedA = computed(() => a);
log(computedA.value, computedA.effect);

// 计算属性使用
log('计算属性使用----------');
const res = ccomputed(() => {
  return 2;
});

log((res as { value: string | number }).value); // 获取计算属性值 value
