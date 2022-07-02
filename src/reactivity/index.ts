/*
 * @LastEditTime: 2022-07-03 03:07:47
 * @Description:
 * @Date: 2022-07-03 02:40:23
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { log } from "@/common/util";

interface Man<T> {
  a: T;
  b: T;
}

const _jieke: Man<number> = { a: 1, b: 2 };
const { a, b } = _jieke;
const arr: Array<number> = [1, 2, 3, 4, 5];

log(a + b);

const UL: HTMLUListElement = document.createElement("ul");

arr.forEach((v) => {
  const LI: HTMLLIElement = document.createElement("li");
  LI.innerHTML = v + "";
  UL.appendChild(LI);
  document.body.appendChild(UL);
});

log(arr.at(-1));
