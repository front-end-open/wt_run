/*
 * @LastEditTime: 2022-07-10 22:26:59
 * @Description:
 * @Date: 2022-07-02 20:17:15
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import moment from 'moment';
import { ComputedRef, ReactiveEffect, Ref } from 'vue';

export function sum(a: number, b: number): number {
  return a + b;
}

export function log(
  msg: string | number | ComputedRef | Ref,
  o?: ReactiveEffect
): void {
  console.log(msg, o);
  const title: HTMLElement = document.createElement('h1');
  title.innerHTML = moment().format('YYYY-MM-DD');
  document.body.appendChild(title);
}
