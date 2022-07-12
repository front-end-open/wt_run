/*
 * @LastEditTime: 2022-07-12 23:32:59
 * @Description: watch实现
 * @Date: 2022-07-12 22:46:42
 * @Author: wangshan
 * @LastEditors: wangshan
 */
import { log } from '@/common/util';
import { obj } from '@/utils/common';
import { watch } from './utils/watch';
watch(obj, () => {
  log('数据变化了');
});

log((obj.foo as number)++);
log((obj.foo as number)++);
