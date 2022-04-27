/** @typedef {import('vue-router')} 范_Vue路由器实例 */

/** @typedef {import('vue-router').Route} 范_Vue路由之记录 */

/** @typedef {import('vue-router').NavigationGuard} NavigationGuard */





/**
 * @typedef {NavigationGuard} 范_Vue路由钩子处理程序_BeforeEach
 */

/**
 * @typedef {(至: 范_Vue路由之记录, 由: 范_Vue路由之记录) => any} 范_Vue路由钩子处理程序_AfterEach
 */

/**
 * @typedef {(vue路由器实例: 范_Vue路由器实例) => 范_Vue路由钩子处理程序_BeforeEach} 范_Vue路由钩子处理程序之构造器_BeforeEach
 */

/**
 * @typedef {(vue路由器实例: 范_Vue路由器实例) => 范_Vue路由钩子处理程序_AfterEach} 范_Vue路由钩子处理程序之构造器_AfterEach
 */





// import { 路由定义总表 } from '../路由定义表'





/**
 * @type {范_Vue路由钩子处理程序之构造器_BeforeEach[]}
 */
const 所有用于_BeforeEach_之钩子的处理程序之构造器 = [
    vue路由器实例 => {
        return (至, 由, 通告本处理程序已结束一事) => {
            // console.debug('目的地路由条目', 至.path, 至)
            通告本处理程序已结束一事()
        }
    },
]





/**
 * @type {范_Vue路由钩子处理程序之构造器_AfterEach[]}
 */
const 所有用于_AfterEach_之钩子的处理程序之构造器 = [
    vue路由器实例 => {
        return (至, 由) => {
            // console.debug('路由已结束。停留在', 至.path)
        }
    },
]





/**
 * @param {范_Vue路由器实例} vue路由器实例
 */
function 为Vue路由器实例成批挂接所有构造处理程序_BeforeEach (vue路由器实例) {
    所有用于_BeforeEach_之钩子的处理程序之构造器.forEach(构造某个处理程序 => {
        vue路由器实例.beforeEach(构造某个处理程序(vue路由器实例))
    })
}

/**
 * @param {范_Vue路由器实例} vue路由器实例
 */
function 为Vue路由器实例成批挂接所有构造处理程序_AfterEach (vue路由器实例) {
    所有用于_AfterEach_之钩子的处理程序之构造器.forEach(构造某个处理程序 => {
        vue路由器实例.afterEach(构造某个处理程序(vue路由器实例))
    })
}





/**
 * @param {范_Vue路由器实例} vue路由器实例
 */
export function 为路由器实例对象构建一系列钩子处理函数 (vue路由器实例) {
    为Vue路由器实例成批挂接所有构造处理程序_BeforeEach(vue路由器实例)
    为Vue路由器实例成批挂接所有构造处理程序_AfterEach(vue路由器实例)
}
