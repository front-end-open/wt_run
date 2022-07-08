/*
 * @LastEditTime: 2022-07-09 02:30:13
 * @Description: 调度执行
 * @Date: 2022-07-09 02:21:12
 * @Author: wangshan
 * @LastEditors: wangshan
 */

/**
 * 响应式系统特性之一: 可调度行
 * 副作用函数调用执行时，存在决定副作用函数调度执行次数，时机，方式的可能方法.[本地响应式系统的触发动作就是trigger]
 */

//实现: 为副作用函数传入调度选项调度器 schduler
