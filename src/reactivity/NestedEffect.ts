/*
 * @LastEditTime: 2022-07-09 01:54:04
 * @Description: 嵌套effect副作用
 * @Date: 2022-07-04 23:20:54
 * @Author: wangshan
 * @LastEditors: wangshan
 */
// 副作用函数嵌套源于组件类dom数一样，是可以嵌套调用的。但组件的嵌套使用时，就是在变相的嵌套调用渲染函数.
import { obj, effectV2 } from '@/utils/common';

let temp: unknown;
let temp1: unknown | ConstV;

effectV2(function effect1() {
  //   console.clear();

  console.log('effect1更新');
  effectV2(function effect2() {
    console.log('effect2更新');
    temp = obj.text;
  });
  temp1 = obj.hash;

  console.log(temp, temp1);
});
obj.hash = 'hello'; // 存在bug，text的收集了hash的副作用函数，当外层更新时.

/**
 * 输出结果：这里并不会对obj.hash的key做依赖收集. 原因在于所有副作用函数的应用，都只有一个全局变量保存，也就是说，同一时刻。全局副作用函数会保留最有一次依赖收集时，所代表的的副作用函数.
 *
 */
