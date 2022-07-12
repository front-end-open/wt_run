/*
 * @LastEditTime: 2022-07-13 00:25:18
 * @Description: watch监听
 * @Date: 2022-07-12 23:14:58
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { effectV2, obj } from '@/utils/common';

export function watch(source: typeof obj, cb: effecFn): void {
  //   type obj = typeof obj;
  //   type key = obj['foo'];
  effectV2(
    () => {
      //   source.foo; // 硬编码操作
      return traverse(source);
    },
    {
      schduler() {
        cb();
      },
    }
  );
}

// 递归读取响应式数据对象数据

function traverse(value: typeof obj, seen: Set<typeof obj> = new Set()) {
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  // 将数据添加到seen中，代表已经读取过，避免循环引起死循环
  seen.add(value);
  // 暂时不考虑数组等其他结构
  // 假设value就是一个对象，使用for...in遍历对象读取每一个值，并递归调用traverse进行处理
  for (const k in value) {
    // type cur = keyof typeof value[k];
    traverse(value[k] as typeof obj, seen);
  }

  return value;
}
