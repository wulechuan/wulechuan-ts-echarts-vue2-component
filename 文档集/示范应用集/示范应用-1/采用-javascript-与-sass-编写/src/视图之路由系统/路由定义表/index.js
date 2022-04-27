/**
 * @typedef {import('vue-router').RouteConfig } RouteConfig
 */

import 示范页1 from '@/视图/页面/示范页1.vue'

/** @type {Array<RouteConfig>} */
export const 路由定义总表 = [
    {
        path: '/',
        name: '首页',
        redirect: '/examples/1',
    },

    {
        path: '/examples/1',
        name: '示范页1-常见的双列互通之形式',
        component: 示范页1,
    },
]
