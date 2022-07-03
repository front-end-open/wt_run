/*
 * @LastEditTime: 2022-07-04 00:41:24
 * @Description:
 * @Date: 2022-07-02 20:17:15
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import moment from 'moment';

export function sum(a: number, b: number): number {
  return a + b;
}

export function log(msg: string | number): void {
  console.log(msg);
  const title: HTMLElement = document.createElement('h1');
  title.innerHTML = moment().format('YYYY-MM-DD');
  document.body.appendChild(title);
}
