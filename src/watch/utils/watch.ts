/*
 * @LastEditTime: 2022-07-18 00:43:25
 * @Description: watch监听
 * @Date: 2022-07-12 23:14:58
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { effectV2, obj } from '../../utils/common';

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

// 类型别名指定option参数
type options = {
  immidiate?: boolean; // 是否立即调度watch
  flush?: string; // cb 调度时机
};

export function watchV2(
  source: typeof obj | effecFn,
  cb: (o: number | string | void, n: number | string | void) => void,
  options: options = {}
): void {
  //   debugger;
  //   type obj = typeof obj;
  //   type key = obj['foo'];
  // 定义getter

  let getter: effecFn | unknown;

  // 如果source是function, 说明传递的getter，把source赋值给getter
  if (typeof source === 'function') {
    getter = source;
  } else {
    getter = () => traverse(source); // unknow 属于任何类型的子类型
    //  traverse(source);
  }

  // 提取调度器执行时间 schduler;
  const job = () => {
    newVal = effectFn();
    // 传递新旧值出去
    cb(oldVal, newVal);
    // 更新旧值，否则会导致下一次错误的旧值
    oldVal = newVal;
  };

  // 声明新旧值
  let oldVal: number | string | void, newVal: number | string | void;
  // 使用effectV2注册副作用函数时,开启lazy选项，并把返回值储存到effectFn中就可以后续手动调用
  const effectFn = effectV2(() => (getter as effecFn)(), {
    lazy: true,
    schduler: () => {
      if (options.flush == 'post') {
        const p = Promise.resolve();
        p.then(job);
      } else {
        job();
      }
    },
  });

  // 当immdiate传入时，立即触发调度副作用
  if (options.immidiate) {
    job();
  } else {
    // 手动调用副作用函数，拿到的值就是旧值
    oldVal = effectFn();
  }
}
