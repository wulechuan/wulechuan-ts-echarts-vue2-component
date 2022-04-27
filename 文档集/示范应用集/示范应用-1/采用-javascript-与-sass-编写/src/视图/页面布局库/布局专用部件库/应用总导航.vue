<template>
    <nav class="应用总导航">
        <ol>
            <li
                v-for="条目 in 导航条目之列表_完整版"
                :key="条目.唯一标识"
                class="应用总导航-条目"
            >
                <router-link :to="条目.路由之绝对路径">{{ 条目.在界面中的称谓 }}</router-link>
            </li>
        </ol>
    </nav>
</template>









<script>
/**
 * @typedef {object} 范_导航配置条目
 *
 * @property {string} 内部名称
 * @property {?string} 在界面中的称谓
 * @property {?string} 在网页标题中的称谓
 * @property {string} 路由之绝对路径
 */

/**
 * @typedef {object} 范_导航内部实用条目
 *
 * @property {string} 唯一标识
 * @property {string} 内部名称
 * @property {string} 在界面中的称谓
 * @property {string} 在网页标题中的称谓
 * @property {string} 路由之绝对路径
 */

export default {
    name: 'App总导航',

    data () {
        return {
            /** @type {Array<范_导航配置条目>} */
            导航条目之列表: [
                {
                    内部名称: '示范1：折线图',
                    路由之绝对路径: '/examples/1',
                },
            ],
        }
    },

    computed: {
        /**
         * @returns {Array<范_导航内部实用条目>}
         */
        导航条目之列表_完整版 () {
            /**
             * @type {{ [不带计数后缀的唯一标识: string]: number; }}
             */
            const 唯一标识防重复之辅助字典 = {}

            return this.导航条目之列表.map(配置条目 => {
                const {
                    内部名称,
                } = 配置条目

                let {
                    在界面中的称谓,
                    在网页标题中的称谓,
                } = 配置条目

                if (typeof 在界面中的称谓 !== 'string' || !在界面中的称谓.trim()) {
                    在界面中的称谓 = 内部名称
                } else {
                    在界面中的称谓 = 在界面中的称谓.trim()
                }

                if (typeof 在网页标题中的称谓 !== 'string' || !在网页标题中的称谓.trim()) {
                    在网页标题中的称谓 = 内部名称
                } else {
                    在网页标题中的称谓 = 在网页标题中的称谓.trim()
                }

                /** @type {string} */
                let 唯一标识 = 内部名称
                if (唯一标识 in 唯一标识防重复之辅助字典) {
                    唯一标识防重复之辅助字典[唯一标识]++
                    唯一标识 = `${唯一标识}-${唯一标识防重复之辅助字典[唯一标识]}`
                } else {
                    唯一标识防重复之辅助字典[唯一标识] = 0
                }

                return {
                    ...配置条目,
                    唯一标识,
                    在界面中的称谓,
                    在网页标题中的称谓,
                }
            })
        },
    },
}
</script>









<style lang="scss">
/* autoprefixer: off */

.应用总导航 {
    padding: 0.75em 2.5em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    color: white;
    background-color: #333;

    > ol {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        list-style: none;
    }
}





.应用总导航-条目 {
    display: block;
    margin: 0.25em;

    a {
        display: block;
        padding: 0.5em 1em;
        border-radius: 0.25em;
        background-color: rgba(white, 0.19);
        cursor: pointer;
        color: inherit;
        text-decoration: none;

        &:hover {
            background-color: rgba(white, 0.39);
        }

        &.router-link-exact-active {
            color: black;
            background-color: lightgreen;
        }
    }
}
</style>
