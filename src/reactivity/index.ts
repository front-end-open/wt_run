/*
 * @LastEditTime: 2022-07-03 02:50:49
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

log(a + b);
