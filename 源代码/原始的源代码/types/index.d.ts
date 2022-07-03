export type * from './echarts5-类型定义增补集.js'

import type {
    范_Echarts_事件之名称_Echarts_5_之实例,
    范_Echarts_事件之名称_Echarts_4_之实例,
    范_Echarts_事件之名称_Echarts_任何版本之实例,
    范_Zrender_事件之名称,
    范_Zrender_事件穿透本部件后之名称,
} from './echarts5-类型定义增补集'





export type 范_本部件之原发事件之名称 = (
    | 'echart-instance-created'
    | 'echart-instance-disposed'
    | 'resized'
)





export type 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例 = Array<范_Echarts_事件之名称_Echarts_任何版本之实例>;
export type 范_可穿透本部件之事件名称之列表_Zrender = Array<范_Zrender_事件之名称>;
export type 范_事件穿透本部件后之名称之列表_Zrender = Array<范_Zrender_事件穿透本部件后之名称>;





import _唯一的Vue部件类 from '../源代码/发布的源代码/typescript/vue-部件.vue'
export default _唯一的Vue部件类

/**
 * 下面这条语句无法将非 default 之条目输出。
 */
// export * from '../源代码/发布的源代码/typescript/vue-部件.vue'

/**
 * 上面的语句无效。故下方的 6 条语句不可省略。
 */
export declare const SELF_ORIGINED_EVENT_NAMES                         : 范_本部件之原发事件之名称[]

export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL       : 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例
export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5 : 范_Echarts_事件之名称_Echarts_5_之实例[]
export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4 : 范_Echarts_事件之名称_Echarts_4_之实例[]

export declare const SUPPORTED_ZRENDER_EVENT_NAMES__RAW                : 范_可穿透本部件之事件名称之列表_Zrender
export declare const SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT : 范_事件穿透本部件后之名称之列表_Zrender
