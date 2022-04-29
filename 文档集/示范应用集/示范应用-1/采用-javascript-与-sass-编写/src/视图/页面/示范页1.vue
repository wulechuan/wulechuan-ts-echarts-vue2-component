<template>
    <div class="页面 页面--示范页1-折线图">
        <div class="内容块--WlcEcharts-事件记录列表">
            <h3>{{ WlcEcharts事件记录区标题之措辞 }}</h3>
            <div class="WlcEcharts-事件记录列表皿">
                <ol class="WlcEcharts-事件记录列表" v-if="最末的若干条事件记载之列表.length > 0">
                    <li
                        v-for="某事件记录 in 最末的若干条事件记载之列表"
                        :key="某事件记录.唯一标识"
                    ><em>&lt;WlcEcharts /&gt; 部件</em>于<time>{{ 某事件记录.时间戳 }}</time>发布了名为<strong>{{ 某事件记录.事件名称 }}</strong>的事件</li>
                </ol>
            </div>
            <footer v-if="最末的若干条事件记载之列表.length > 0"><p>浏览器控制台（console）中也留有所有事件之记录。</p></footer>
        </div>

        <div class="echarts-皿">
            <WlcEcharts
                class="echarts-根--某折线图"
                :echarts-creator="echarts之工厂函数"
                :echarts-options="echarts之配置项集"
                :should-transfer-echarts4-events="应故意启用Echarts4的事件"
                v-on="wlcEcharts可成批绑定之事件处理程序集"
            ></WlcEcharts>
        </div>
    </div>
</template>

<script>
import WlcEcharts, {
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL,
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5,
} from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'





import * as echarts from 'echarts/core'

import {
    CanvasRenderer as EchartsRenderer,
} from 'echarts/renderers'

import {
    LineChart,
} from 'echarts/charts'

import {
    GridComponent,
} from 'echarts/components'

echarts.use([
    LineChart,
    GridComponent,
    EchartsRenderer,
])





import { echarts之配置项集 } from '../../数据/echarts-配置项集--折线图'





/**
 * 若写作
 *
 * ```jsdocs
 * import('@wulechuan/echarts-vue2-component').范_XXXXX
 * ```
 *
 * 则 VSCode 会报错，但实际上代码运行如期。
 * 为迁就 VSCode 而改为
 *
 * ```jsdocs
 * import('../../../../../../../').范_XXXXX
 * ```
 *
 * 注意！如果该示范项目移出 '@wulechuan/echarts-vue2-component' 的项目文件夹单独存放，
 * 则应当改为 import('@wulechuan/echarts-vue2-component').范_XXXXX 。
 *
 * @typedef {import('../../../../../../../').范_Echarts实例_可穿透本部件之事件之名称} 范_Echarts实例_可穿透本部件之事件之名称
 * @typedef {import('../../../../../../../').范_Echarts_5_事件之名称_Echarts实例} 范_Echarts_5_事件之名称_Echarts实例
 */

/**
 * @typedef {object} 范_Echarts5_Echarts实例事件之记载
 * @property {Event} event
 * @property {范_Echarts_5_事件之名称_Echarts实例} type
 */

/**
 * @typedef {{ [事件名称: string]: (事件记载: 范_Echarts5_Echarts实例事件之记载) => any; }} 范_wlcEcharts可成批绑定之事件处理程序集
 */

/**
 * @typedef {object} 范_Echarts部件之事件记录
 * @property {string} 唯一标识
 * @property {string} 事件名称
 * @property {string} 时间戳
 * @property {?(范_Echarts5_Echarts实例事件之记载 | any)} 事件记载
 */





export default {
    name: 'Page示范页1_Echarts折线图',

    components: {
        WlcEcharts,
    },

    data: function () {
        const 应故意启用Echarts4的事件 = false

        return {
            echarts之工厂函数: echarts,
            echarts之配置项集,

            /** @type {boolean} */
            应故意启用Echarts4的事件,

            /** @type {范_wlcEcharts可成批绑定之事件处理程序集} */
            wlcEcharts可成批绑定之事件处理程序集: this.构建可成批对接的Echarts实例之事件之处理程序之配置项集(),

            /** @type {范_Echarts部件之事件记录[]} */
            最末的若干条事件记载之列表: [],
        }
    },

    computed: {
        /**
         * @returns {string}
         */
        WlcEcharts事件记录区标题之措辞 () {
            const 应呈现的记录之数目 = this.最末的若干条事件记载之列表.length

            if (应呈现的记录之数目 > 0) {
                return `以下是 <WlcEcharts /> 部件最末发布的 ${应呈现的记录之数目} 个“穿透”事件（最晚发布的排最顶端）：`
            } else {
                return '<WlcEcharts /> 部件尚未发布任何“穿透”事件。'
            }
        },
    },

    methods: {
        /**
         * @returns {null | 范_wlcEcharts可成批绑定之事件处理程序集}
         */
        构建可成批对接的Echarts实例之事件之处理程序之配置项集 () {
            /** @type {范_Echarts实例_可穿透本部件之事件之名称[]} */
            let 应采纳的事件名称列表

            if (this.应故意启用Echarts4的事件 || true) { // eslint-disable-line no-constant-condition
                应采纳的事件名称列表 = SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL
            } else {
                应采纳的事件名称列表 = SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5
            }

            if (Array.isArray(应采纳的事件名称列表)) {
                /** @type {范_wlcEcharts可成批绑定之事件处理程序集} */
                const wlcEcharts可成批绑定之事件处理程序集 = 应采纳的事件名称列表.reduce((
                    /** @type {范_wlcEcharts可成批绑定之事件处理程序集} */
                    事件处理程序集,

                    /** @type {范_Echarts实例_可穿透本部件之事件之名称} */
                    事件名称
                ) => {
                    事件处理程序集[事件名称] = (
                        /** @type {范_Echarts5_Echarts实例事件之记载} */
                        事件记载
                    ) => {
                        /** @type {范_Echarts部件之事件记录} */
                        const 事件记录 = {
                            唯一标识: `${Math.random().toFixed(16)}`,
                            事件名称,
                            时间戳: new Date().toLocaleString(),
                            事件记载,
                        }

                        this.追加事件记录(事件记录)
                    }

                    return 事件处理程序集
                }, {})

                return wlcEcharts可成批绑定之事件处理程序集
            } else {
                console.error('应采纳的事件名称列表 不是列表（Array）。', 应采纳的事件名称列表)
                return null
            }
        },

        /**
         * @param {范_Echarts部件之事件记录} 欲追加之事件记录
         */
        追加事件记录 (欲追加之事件记录) {
            const {
                事件名称,
                事件记载,
            } = 欲追加之事件记录

            console.log(`<WlcEcharts> 发布了 “ ${事件名称} ” 事件。`, '事件之记载如下：', 事件记载)

            /** @type {范_Echarts部件之事件记录[]} */
            const 最末的若干条事件记载之列表 = [
                欲追加之事件记录,
                ...this.最末的若干条事件记载之列表,
            ].slice(0, 8)

            this.最末的若干条事件记载之列表 = 最末的若干条事件记载之列表
        },
    },

    // mounted () {
    //     setTimeout(() => {
    //         this.应故意启用Echarts4的事件 = true
    //     }, 4000)

    //     setTimeout(() => {
    //         this.应故意启用Echarts4的事件 = false
    //     }, 12000)
    // },
}
</script>

<style lang="scss">
.页面--示范页1-折线图 {
    width:  100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        margin: 1rem;
        text-align: center;
    }

    .内容块--WlcEcharts-事件记录列表 {
        flex: 0 0 27em;
        width: 95%;
        max-width: 790px;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: stretch;

        background-color: rgba(black, 0.15);

        h2, h3, h4 {
            flex: 0 0 auto;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: block;
            box-sizing: border-box;
            width: 100%;
            margin: 0;
            padding: 0.75em 1em;
            font-size: 1.2em;
            font-weight: normal;
            color: white;
            background-color: #111;
        }

        footer {
            flex: 0 0 auto;

            color: white;
            background-color: #555;

            p {
                margin: 0;
                padding: 0.5em 1em;
            }
        }
    }

    .WlcEcharts-事件记录列表皿 {
        margin: 0;
        padding: 0;
        overflow: auto;
        flex: 1 1 100%;
    }

    .WlcEcharts-事件记录列表 {
        display: inline-block;
        padding: 1em 2em;
        margin: 0;

        li {
            list-style: none;
            white-space: nowrap;
        }

        em,
        time,
        strong {
            font-family: monospace;
            font-style: normal;
            font-weight: normal;

            display: inline-block;
            text-align: center;
            margin: 0.1em 0.5em;
            padding: 0.25em 0.75em;
            border-radius: 0.25em;
            border: 1px solid;
        }

        em {
            color: #faa;
            border-color: #222;
            background-color: rgba(black, 0.515);
        }

        time {
            color: #9f9;
            border-color: #444;
            background-color: rgba(black, 0.219);
        }

        strong {
            min-width: 9em;
            border-color: #333;
            color: white;
            background-color: rgba(black, 0.319);
        }
    }

    .echarts-皿 {
        flex: 1 1 auto;
        width:  95%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .echarts-根--某折线图 {
        width:  100%;
        height: 100%;
        max-width:  790px;
        max-height: 515px;
        margin: auto;
        background-color: white;
    }
}
</style>
