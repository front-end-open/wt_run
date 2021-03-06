/*
 * @Author: wangshan
 * @Date: 2021-07-07 23:07:17
 * @LastEditors: wangshan
 * @LastEditTime: 2021-07-09 10:58:37
 * @Description: 分布式排序-计数排序
 * @go: 主要用来排序整数序列
 */
/*
 排序原理：
 创建临时数据，根据数组最大值。
 数组索引顺序排列，经过计数后的数组，已经就排好序了。然后循环递减拿出每个索引的值，放回原数组即可。
*/
import { findMaxValue } from "../utils/index";

function countingSort(array: number[]) {
  if (array.length < 2) {
    return array;
  }
  const maxValue = findMaxValue(array);

  const counts = new Array((maxValue as number) + 1);
  array.forEach((element: number) => {
    if (!counts[element]) {
      counts[element] = 0;
    }
    counts[element]++;
  });

  let sortedIndex = 0;
  counts.forEach((count: number, i: number) => {
    while (count > 0) {
      array[sortedIndex++] = i;
      count--;
    }
  });
  return array;
}

let array = [3, 5, 6, 2, 12, 45];

countingSort(array); // [2, 3, 5, 6, 12, 45]

// 作为模块声明，解决重复块作用域声明错误, ts.2541
export {};
