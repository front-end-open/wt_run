/*
 * @LastEditTime: 2022-07-09 01:32:09
 * @Description:
 * @Date: 2022-07-04 23:15:37
 * @Author: wangshan
 * @LastEditors: wangshan
 */

/*
分支切换：即是在算法表达对数据对象键的读取，触发不必要副作用函数的添加，遗留副作用函数导致不必要的更新
*/
// data类型处理
interface Da {
  [k: string | number | symbol]: string | number | boolean;
}

let activeEffect: () => void;
const bucket = new WeakMap();
const data: Da = {
  text: 'Reactive-version-all',
  hash: 'hashMap',
  isUpdate: false,
};

// 清除副作用
function cleanup(effectFn: EffectFn<effecFn>) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    (deps as Set<effecFn>).delete(effectFn);
  }

  effectFn.deps.length = 0;
}

// 副作用函数第一版
export const effect = (fn: () => void) => {
  const effectFn: EffectFn<effecFn> = () => {
    // eslint-disable-next-line no-use-before-define
    cleanup(effectFn);

    activeEffect = effectFn;

    fn();
  };

  effectFn.deps = []; // 依赖合集,存储与副作用关联的依赖

  effectFn(); // 执行副作用函数
};

// 副作用收集函数第二版
const effectStack: effecFn[] = []; // 改变激活副作用函数调用栈
export function effectV2(fn: () => unknown) {
  const effectFn: EffectFn<effecFn> = () => {
    console.log(effectStack);

    cleanup(effectFn);

    activeEffect = effectFn;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    effectStack.push(effectFn);

    fn();

    effectStack.pop();
    console.log('22', effectStack, effectStack[effectStack.length - 1]);

    activeEffect = effectStack[effectStack.length - 1];
    console.log(activeEffect);
  };

  effectFn.deps = []; // 依赖合集,存储与副作用关联的依赖

  effectFn();
}

// 索引属性访问
type Data = typeof data;
type Indexed = keyof Data;
// eslint-disable-next-line @typescript-eslint/no-unused-vars

type IndexT = Data[Indexed];

export const obj = new Proxy(data, {
  get(target: typeof data, key: Indexed) {
    // debugger;
    if (!activeEffect) return target[key as keyof typeof target];
    // console.log("读取");

    // eslint-disable-next-line no-use-before-define
    track(target, key as string); // 追踪key

    return target[key as keyof typeof target];
  },
  set(target: typeof data, key: Indexed, newVal: number | string) {
    // console.log("更新");
    (target[key] as IndexT) = newVal;

    // eslint-disable-next-line no-use-before-define
    trigger(target, key);
    /* eslint consistent-return: "off" */
    return true;
  },
});

// 抽离get内部副作用绑定逻辑
function track(target: typeof data, key: Indexed) {
  //   debugger;
  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);

  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  // 当前激活的辅作用函数添加到依赖合集
  deps.add(activeEffect);

  console.log(bucket);

  // 添加与激活副作用关联的依赖合集
  (activeEffect as EffectFn<effecFn>).deps.push(deps);
}

// 抽离触发副作用函数
function trigger(target: typeof data, key: Indexed) {
  console.log(bucket);
  const depsMap = bucket.get(target);
  if (!depsMap) return;
  const effets = depsMap.get(key);

  //   if (!effets) return;

  const effectsToRun = new Set(effets); // 从新设置set集合，避免在遍历set集合时，如果存在对Set的循环操作，并且循环内部有对集合的同一值，进行删除和添加操作。此时集合将进入死循环
  effectsToRun.forEach((effectFn: () => void) => effectFn());
  /* eslint no-unused-expressions: "off" */
  //   effets && effets.forEach((fn) => fn());
}
