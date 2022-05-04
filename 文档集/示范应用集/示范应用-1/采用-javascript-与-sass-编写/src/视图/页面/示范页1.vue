<template>
    <div class="页面 页面--示范页1-折线图">
        <div class="内容块--WlcEcharts-事件记录列表">
            <header>
                <h3>{{ WlcEcharts事件记录区标题之措辞 }}</h3>
                <h4>{{ WlcEcharts事件记录区副标题之措辞 }}</h4>
            </header>

            <div class="WlcEcharts-事件记录列表皿">
                <ol class="WlcEcharts-事件记录列表" v-if="最末的若干条事件记载之列表.length > 0">
                    <li
                        v-for="某事件记录 in 最末的若干条事件记载之列表"
                        :key="某事件记录.唯一标识"
                        :class="{
                            '此种事件在-echarts-5-中已弃用': 某事件记录.此种Echarts事件在Echarts5中已弃用,
                            '此种事件为-zrender-事件': 某事件记录.此种事件为Zrender事件,
                        }"
                    ><em class="部件名称">&lt;WlcEcharts /&gt; 部件</em>于<time>{{
                        某事件记录.时间戳
                    }}</time>第<em class="事件之次数">{{
                        某事件记录.本事件为同种事件中的第几次
                    }}</em>次向外界传递了名为<strong>{{
                        某事件记录.事件名称
                    }}</strong>的 <span class="事件版本措辞">{{
                        某事件记录.此种事件为Zrender事件 ? 'ZRender' : 某事件记录.此种Echarts事件在Echarts5中已弃用 ? 'eCharts 4.x' : 'eCharts'
                    }} 事件。</span></li>
                </ol>
            </div>

            <footer>
                <p
                    v-if="应启用Echarts的rendered的事件"
                >迄今已发布 {{ eChartsRendered事件发生之总次数 }} 次 rendered 事件。</p>

                <p
                    v-if="应在浏览器控制打印除Rendered外之一切事件之记录"
                >浏览器控制台（console）中也留有所有事件之记录。</p>
            </footer>
        </div>

        <div class="echarts-皿">
            <WlcEcharts
                class="echarts-根--某折线图"
                :echarts-module-exports-root="eCharts模块导出之根"
                :echarts-options="echarts之配置项集"
                :should-transfer-echarts4-events="应故意启用Echarts4的事件"
                :should-transfer-event-of-echarts-rendered="应启用Echarts的rendered的事件"
                :should-transfer-events-of-zrender="应启用Zrender的事件"
                v-on="wlcEcharts可成批绑定之事件处理程序集"
            ></WlcEcharts>
        </div>
    </div>
</template>

<script>
import WlcEcharts, {
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL,
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5,
    SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT,
} from '@wulechuan/echarts-vue2-component'





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
 * @typedef {import('@wulechuan/echarts-vue2-component').范_Echarts_事件之名称_Echarts_任何版本之实例} 范_Echarts_事件之名称_Echarts_任何版本之实例
 * @typedef {import('@wulechuan/echarts-vue2-component').范_Echarts_事件之名称_Echarts_5_之实例} 范_Echarts_事件之名称_Echarts_5_之实例
 * @typedef {import('@wulechuan/echarts-vue2-component').范_Zrender_事件穿透本部件后之名称} 范_Zrender_事件穿透本部件后之名称
 */

/**
 * @typedef {object} 范_Echarts5_Echarts实例事件之记载
 * @property {Event} event
 * @property {范_Echarts_事件之名称_Echarts_5_之实例} type
 */

/**
 * @typedef {{ [事件名称: string]: (事件记载: 范_Echarts5_Echarts实例事件之记载) => any; }} 范_wlcEcharts可成批绑定之事件处理程序集
 */

/**
 * @typedef {object} 范_Echarts部件之事件记录
 * @property {string} 唯一标识
 * @property {string} 事件名称
 * @property {string} 时间戳
 *
 * @property {number} 本事件为同种事件中的第几次
 * @property {boolean} 此种Echarts事件在Echarts5中已弃用
 * @property {boolean} 此种事件为Zrender事件
 *
 * @property {?(范_Echarts5_Echarts实例事件之记载 | any)} 事件记载
 */

/**
 * @typedef {{ [事件名称: string]: number; }} 范_Echarts实例之事件计数对象
 */





export default {
    name: 'Page示范页1_Echarts折线图',

    components: {
        WlcEcharts,
    },





    data: function () {
        return {
            eCharts模块导出之根: echarts,

            echarts之配置项集,

            /** @type {number} */
            在界面列示的事件记录数目至多为: 16,

            /** @type {boolean} */
            应故意启用Echarts4的事件: false,

            /** @type {boolean} */
            应启用Echarts的rendered的事件: true,

            /** @type {boolean} */
            应启用Zrender的事件: true,

            /** @type {boolean} */
            应在浏览器控制打印除Rendered外之一切事件之记录: true,

            /** @type {范_Echarts实例之事件计数对象} */
            eCharts实例各种事件之计数: this.准备Echarts实例各种事件之计数(),

            /** @type {范_wlcEcharts可成批绑定之事件处理程序集} */
            wlcEcharts可成批绑定之事件处理程序集: null,

            /** @type {范_Echarts部件之事件记录[]} */
            最末的若干条事件记载之列表: [],
        }
    },





    computed: {
        /**
         * @returns {number}
         */
        eChartsRendered事件发生之总次数 () {
            return this.eCharts实例各种事件之计数['rendered']
        },

        /**
         * @returns {string}
         */
        WlcEcharts事件记录区标题之措辞 () {
            const 应呈现的记录之数目 = this.最末的若干条事件记载之列表.length

            if (应呈现的记录之数目 > 0) {
                return `以下是 <WlcEcharts /> 部件最末发布的 ${应呈现的记录之数目} 个“穿透”事件（最晚发布的排最顶端）`
            } else {
                return '<WlcEcharts /> 部件尚未发布任何“穿透”事件。'
            }
        },

        /**
         * @returns {string}
         */
        WlcEcharts事件记录区副标题之措辞 () {
            return this.eChartsRendered事件发生之总次数 <= 0 ? '--' : '因 ECharts 的 rendered 事件过多，故意略去，不作列示。'
        },
    },





    methods: {
        /**
         * @returns {范_Echarts实例之事件计数对象}
         */
        准备Echarts实例各种事件之计数 () {
            return [
                ...SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL,
                ...SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT,
            ].reduce(
                /**
                 * @param {范_Echarts实例之事件计数对象} 计数对象
                 * @param {范_Echarts_事件之名称_Echarts_任何版本之实例} 事件名称
                 */
                (计数对象, 事件名称) => {
                    计数对象[事件名称] = 0
                    return 计数对象
                },

                /** @type {范_Echarts实例之事件计数对象} */
                {}
            )
        },

        /**
         * @returns {null | 范_wlcEcharts可成批绑定之事件处理程序集}
         */
        构建可成批对接的Echarts实例之事件之处理程序之配置项集 () {
            if (!Array.isArray(SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL)) {
                console.error('SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL 不是列表（Array）。', SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL)
                return null
            }

            if (!Array.isArray(SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT)) {
                console.error('SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT 不是列表（Array）。', SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT)
                return null
            }

            /** @type {范_wlcEcharts可成批绑定之事件处理程序集} */
            const wlcEcharts可成批绑定之事件处理程序集 = {}

            SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL.forEach(
                /**
                 * @param {范_Echarts_事件之名称_Echarts_任何版本之实例} 事件名称
                 */
                (事件名称) => {
                    wlcEcharts可成批绑定之事件处理程序集[事件名称] = this.为某种Echarts实例事件或某种Zrender事件构造一个处理程序(事件名称)
                }
            )

            SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT.forEach(
                /**
                 * @param {范_Zrender_事件穿透本部件后之名称} 事件名称
                 */
                (事件名称) => {
                    wlcEcharts可成批绑定之事件处理程序集[事件名称] = this.为某种Echarts实例事件或某种Zrender事件构造一个处理程序(事件名称)
                }
            )

            return wlcEcharts可成批绑定之事件处理程序集
        },

        /**
         * @param {范_Echarts_事件之名称_Echarts_任何版本之实例 | 范_Zrender_事件穿透本部件后之名称} 事件名称
         */
        为某种Echarts实例事件或某种Zrender事件构造一个处理程序 (事件名称) {
            /**
             * @param {范_Echarts5_Echarts实例事件之记载} 事件记载
             */
            const 此种事件之处理程序 = (事件记载) => {
                /** @type {范_Echarts实例之事件计数对象} */
                const eCharts实例各种事件之计数 = this.eCharts实例各种事件之计数

                eCharts实例各种事件之计数[事件名称]++

                /** @type {boolean} */
                const 此种事件为Zrender事件 = SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT.includes(事件名称)

                /** @type {boolean} */
                const 此种Echarts事件在Echarts5中已弃用 = !此种事件为Zrender事件 && !SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5.includes(事件名称)

                /** @type {范_Echarts部件之事件记录} */
                const 事件记录 = {
                    唯一标识: `${Math.random().toFixed(16)}`,
                    事件名称,
                    时间戳: new Date().toLocaleTimeString(),

                    本事件为同种事件中的第几次: eCharts实例各种事件之计数[事件名称],
                    此种Echarts事件在Echarts5中已弃用,
                    此种事件为Zrender事件,

                    事件记载,
                }

                this.追加事件记录(事件记录)
            }

            return 此种事件之处理程序
        },

        /**
         * @param {范_Echarts部件之事件记录} 欲追加之事件记录
         */
        追加事件记录 (欲追加之事件记录) {
            const {
                事件名称,
                事件记载,
                本事件为同种事件中的第几次,
            } = 欲追加之事件记录

            if (事件名称 === 'rendered') {
                return
            }

            if (this.应在浏览器控制打印除Rendered外之一切事件之记录) {
                console.log(`<WlcEcharts> 第 ${本事件为同种事件中的第几次} 次向外传递了 eCharts 的 “ ${事件名称} ” 事件。`, '该事件之记载如下：', 事件记载)
            }

            /** @type {范_Echarts部件之事件记录[]} */
            const 最末的若干条事件记载之列表 = [
                欲追加之事件记录,
                ...this.最末的若干条事件记载之列表,
            ].slice(0, this.在界面列示的事件记录数目至多为)

            this.最末的若干条事件记载之列表 = 最末的若干条事件记载之列表
        },
    },





    mounted () {
        this.wlcEcharts可成批绑定之事件处理程序集 = this.构建可成批对接的Echarts实例之事件之处理程序之配置项集()

        // setTimeout(() => {
        //     this.应故意启用Echarts4的事件 = true
        // }, 4000)

        // setTimeout(() => {
        //     this.应故意启用Echarts4的事件 = false
        // }, 12000)
    },
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
    justify-content: flex-start;
    align-items: center;

    p {
        margin: 1rem;
        text-align: center;
    }

    .内容块--WlcEcharts-事件记录列表 {
        flex: 0 0 28em;
        width: 95%;
        max-width: 960px;
        overflow: hidden;
        margin-block-end: 0;
        box-sizing: border-box;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: stretch;

        background-color: rgba(black, 0.15);

        header {
            flex: 0 0 auto;
            color: white;
            background-color: #111;
        }

        h3, h4 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
            display: block;
            box-sizing: border-box;
            width: 100%;
            margin: 0;
            padding: 0.75em 1em;
            font-weight: normal;
            background-color: #111;
        }

        h3 {
            font-size: 1.2em;
            color: white;
        }

        h4 {
            font-size: 1em;
            color: #999;
            margin-top: -1em;
        }

        footer {
            flex: 0 0 auto;

            color: #ccc;
            background-color: #333;
            text-align: center;

            p {
                display: inline-block;
                margin: 0;
                padding: 0.5em;
            }

            p ~ p {
                margin-top: -0.5em;
            }
        }
    }

    .WlcEcharts-事件记录列表皿 {
        margin: 0;
        padding: 0;
        overflow: auto;
        flex: 1 1 100%;
        text-align: center;
    }

    .WlcEcharts-事件记录列表 {
        display: inline-block;
        padding: 1em;
        margin: 0;

        li {
            list-style: none;
            white-space: nowrap;
            margin-right: -1em;

            .事件版本措辞,
            em,
            time,
            strong {
                display: inline-block;
                padding-block: 0.25em;
                border-radius: 0.25em;
                border: 1px solid;
            }

            em,
            time,
            strong {
                font-family: monospace;
                font-style: normal;
                font-weight: normal;
                text-align: center;
                margin: 0.1em 0.5em;
                padding-inline: 0.75em;
            }

            .事件版本措辞 {
                text-align: left;
                width: 8em;
                border-color: transparent;
            }

            em {
                color: #e77;
                border-color: #222;
                background-color: rgba(black, 0.515);

                // &.部件名称 {
                //     margin-left: -0.25em;
                // }

                &.事件之次数 {
                    min-width: 3.5em;
                    color: #8bf;
                    background-color: rgba(black, 0.75);
                }
            }

            time {
                color: #9f9;
                border-color: #444;
                background-color: rgba(black, 0.319);
            }

            strong {
                min-width: 11em;
                border-color: #333;
                color: white;
                background-color: rgba(black, 0.75);
            }

            &.此种事件在-echarts-5-中已弃用 {

                strong {
                    color: #ed7;
                    background-color: rgba(black, 0.45);
                    text-decoration-line: underline;
                    text-decoration-style: wavy;
                    text-decoration-thickness: 1px;
                    text-decoration-color: #f88;
                    text-underline-offset: 3px;
                }
            }

            &.此种事件为-zrender-事件 {

                strong {
                    color: #321;
                    background-color: rgba(#975, 0.75);
                }
            }
        }
    }

    .echarts-皿 {
        flex: 1 1 auto;
        width:  95%;
        box-sizing: border-box;
        min-height: 545px;
        padding: 0;
        padding-block-end: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .echarts-根--某折线图 {
        width:  960px;
        height: 515px;
        margin: 0;
        background-color: white;
    }
}
</style>
