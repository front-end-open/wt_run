/*
 * @LastEditTime: 2022-07-14 00:28:23
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
  //   debugger;
  if (typeof value !== 'object' || value === null || seen.has(value)) return;

  // 将数据添加到seen中，代表已经读取过，避免循环引起死循环
  seen.add(value);
  // 暂时不考虑数组等其他结构
  // 假设value就是一个对象，使用for...in遍历对象读取每一个值，     并递归调用traverse进行处理
  for (const k in value) {
    // type cur = keyof typeof value[k];
    traverse(value[k] as typeof obj, seen);
  }

  return value;
}
// 扩展watch
// 接收getter
export function watchV2(
  source: typeof obj,
  cb: (o: number | string | void, n: number | string | void) => void
): void {
  //   type obj = typeof obj;
  //   type key = obj['foo'];
  // 定义getter

  let getter: effecFn | unknown;

  // 如果source是function, 说明传递的getter，把source赋值给getter
  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source);
    //  traverse(source);
  }

  // 声明新旧值
  let oldVal: number | string | void, newVal: number | string | void;
  // 使用effectV2注册副作用函数时,开启lazy选项，并把返回值储存到effectFn中就可以后续手动调用
  const effectFn = effectV2(
    () => {
      //   source.foo; // 硬编码操作
      // 分支类型保护
      if (typeof getter !== 'function') {
        return getter;
      } else {
        return getter();
      }
    },
    {
      lazy: true,
      schduler() {
        // 在schduler中从新执行副作用函数，获取新值
        newVal = effectFn();
        // 传递新旧值出去
        cb(newVal, oldVal);
        // 更新旧值，否则会导致下一次错误的旧值
        oldVal = newVal;
      },
    }
  );

  // 手动调用副作用函数，拿到的值就是旧值
  oldVal = effectFn();
}
