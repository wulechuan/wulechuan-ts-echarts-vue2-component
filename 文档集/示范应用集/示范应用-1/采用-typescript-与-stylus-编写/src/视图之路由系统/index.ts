import Vue from 'vue'

import type 范_Vue路由器实例 from 'vue-router'
import Vue路由器之构造函数 from 'vue-router'

import { 路由定义总表 } from './路由定义表'
import { 为路由器实例对象构建一系列钩子处理函数 } from './路由钩子函数构造程序'

Vue.use(Vue路由器之构造函数)

const vue路由器实例: 范_Vue路由器实例 = new Vue路由器之构造函数({
    routes: 路由定义总表,
})

为路由器实例对象构建一系列钩子处理函数(vue路由器实例)

export default vue路由器实例
