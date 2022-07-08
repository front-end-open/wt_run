/*
 * @LastEditTime: 2022-07-09 02:02:32
 * @Description: 递归更新-栈溢出
 * @Date: 2022-07-09 01:05:13
 * @Author: wangshan
 * @LastEditors: wangshan
 */
/**
 * 目前的响应式系统，对于依赖的更新是通过单一的赋值操作进行更新（不涉及自增或自减)。如果设计自增或自减就会出现，堆栈溢出.
 *
 * 原因在于自增的更新，会触发副作用执行，副作用执行之间又会触发依赖的更新，同一时间内，由于副作用的执行并没有得到释放，导致堆栈溢出.
 *
 */
import { obj, effectV2 } from '@/utils/common';

effectV2(() => {
  (obj.step as number)++; // Maxixum call statck
});
