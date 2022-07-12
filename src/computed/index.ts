/*
 * @LastEditTime: 2022-07-12 20:47:14
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

// effectV2(() => {
//   console.log('非lazy，立即调度', obj.text);
// });

// // const a = ref(1);

// const effect = effectV2(
//   () => {
//     console.log('lazy调度');

//     return (obj.st as number) + (obj.st as number);
//   },
//   {
//     lazy: true,
//   }
// );

// log(effect() as number);

// 使用vue官方的计算属性API，
// 读取计算属性的值
// const computedA = computed(() => a);
// log(computedA.value, computedA.effect);

// 计算属性使用
// log('计算属性使用----------');
// const res = ccomputed(() => {
//   return (obj.st as number) + (obj.step as number);
// });
// (obj.st as number)++; // 第一次触发修改 3
// log((res as { value: string | number }).value); // 获取计算属性值 3
// (obj.st as number)++; // 第二次触发修改, res.value没有更新 3, 预期应该是 4
// log((res as { value: string | number }).value); // 再次访问 value, 没有更新 3, 预期应该是4

/**
 *  更新obj.st 后再次访问计算属性没有更新，原因在于第一次访问计算属性value后，dirty的状态已经被重置为false，由于计算属性返回引用导致上下文环境一致没有被销毁,表示不需要更新。
 *
 *  解决: 为副作用设置调度器，每次更新后，重置dirty状态.
 */

// 副作用嵌套，外层副作用函数不调度.
// 此时计算属性已更新

const res = ccomputed(() => {
  return (obj.st as number) + (obj.step as number);
});

effectV2(() => {
  log('外层副作用调度');
  log(
    (
      res as {
        value: string | number;
      }
    ).value
  );
});

(obj.st as number)++;
log(
  (
    res as {
      value: number;
    }
  ).value
);

/**
 * Vue的template最终被编译成渲染函数，以供在运行时调用, 做真实dom绘制和渲染。渲染函数内部的虚拟dom，涉及数据绑定，属于带有副作用的更新。此时如果带有计算属性绑定的vnode在，当计算属性更新时，将会导致页面更新.
 *  上述是建立在正常情况来说的，在目前自发简历的响应式系统来看，如果存在副作用嵌套【组件的嵌套就属于副作用嵌套的体现】。如果此时虚拟dom更新，会存在外层副作用附件不更新的情况. 只会触发内层计算属性内部副作用函数的更新.
 */
