/*
 * @LastEditTime: 2022-07-07 20:16:18
 * @Description:
 * @Date: 2022-07-03 05:46:29
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { effect, obj } from '@/utils/common';
const a: number = 'a';
effect(() => {
  console.log('更新');
  document.body.innerHTML = obj.hash ? obj.text : 1 - a;
});
obj.text = 'hello'; // 当obj.hash非假值，调用副作用更新视图[不合理]
