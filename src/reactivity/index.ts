/*
 * @LastEditTime: 2022-07-04 23:20:10
 * @Description:
 * @Date: 2022-07-03 05:46:29
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { effect, obj } from '@/utils/common';

effect(() => {
  console.log('更新');
  document.body.innerHTML = obj.hash ? obj.text : 'not';
});
obj.text = 'hello'; // 当obj.hash非假值，调用副作用更新视图[不合理]
