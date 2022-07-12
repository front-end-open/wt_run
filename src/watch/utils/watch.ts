/*
 * @LastEditTime: 2022-07-12 23:28:55
 * @Description: watch监听
 * @Date: 2022-07-12 23:14:58
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { effectV2, obj } from '@/utils/common';

export function watch(source: typeof obj, cb: effecFn): void {
  type obj = typeof obj;
  type key = obj['foo'];
  effectV2(
    () => {
      source.foo as key;
    },
    {
      schduler() {
        cb();
      },
    }
  );
}
