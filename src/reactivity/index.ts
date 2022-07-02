/*
 * @LastEditTime: 2022-07-03 04:11:30
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

const posttag = (): void => {
  document.body.style.backgroundColor = "red";
};

posttag();

const promsise = new Promise(() => {});

function makeWeakCached(f) {
  const cache = new Map();
  return (key) => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    // @ts-node
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(() => {
  return { a: 1 };
});

log(getImageCached as any);
