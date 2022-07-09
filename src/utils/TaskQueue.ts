/*
 * @LastEditTime: 2022-07-10 00:25:29
 * @Description: 微任务队列管理
 * @Date: 2022-07-10 00:00:21
 * @Author: wangshan
 * @LastEditors: wangshan
 */
// 任务队列
export const JobQueue: Set<EffectFn<effecFn>> = new Set();

// 微任务实例
export const p = Promise.resolve();

let isFlushing = false;

export function flusJob(): void {
  //   debugger;
  if (isFlushing) return; // 任务存在退出
  // 刷新任务
  isFlushing = true;

  // 执行任务队列任务
  p.then(() => {
    JobQueue.forEach((job) => job());
  }).finally(() => {
    isFlushing = false;
    console.log('重置');
  }); // 任务执行结束，重置刷新状态
}
