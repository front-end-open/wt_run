/*
 * @LastEditTime: 2022-07-14 00:57:21
 * @Description:
 * @Date: 2022-07-07 23:23:50
 * @Author: wangshan
 * @LastEditors: wangshan
 */

declare type effecFn = () => number | string | void;

declare type ConstV = string;

declare type console = Console;

// 接口，混合类型定义： 函数，基本类型

// 混合类型，提供函数接口，使其可以像访问对象一样操作函数
declare interface EffectFn<T> {
  (fn?: () => number | string | void): number | string | void;
  deps?: (number | string | Set<T>)[];
  options?: { schduler?: (fn: effecFn) => void };
}

// 可描述联合类型[收闸类型]
interface Foo {
  type: 'foo';
}

interface Bar {
  type: 'bar';
}
type All = Foo | Bar;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      val.type;
      break;
    case 'bar':
      // val 在这里是 Bar
      val.type;
      break;
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val;
      return exhaustiveCheck;
      break;
  }
}
