/**
 * 实验证明，下方导入地址
 *   - 不允许追加 “.ts” ，
 *   - “.d” 则可有可无。
 * 有些奇怪。
 */
export type * from './echarts5类型定义增补集'

import type {
    范_Echarts_5_事件之名称_Echarts实例,
    范_Echarts_4_事件之名称_Echarts实例,

    // 范_Echarts_5_事件之名称_EchartsZRender,
    // 范_Echarts_4_事件之名称_EchartsZRender,
} from './echarts5类型定义增补集'





export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL       : 范_Echarts实例_可穿透本部件之事件之名称列表
export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4 : 范_Echarts_4_事件之名称_Echarts实例[]
export declare const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5 : 范_Echarts_5_事件之名称_Echarts实例[]
// export declare const SUPPORTED_ZRENDER_EVENT_NAMES__ALL                : 范_EchartsZRender_可穿透本部件之事件之名称列表
// export declare const SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_4          : 范_Echarts_4_事件之名称_EchartsZRender[]
// export declare const SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_5          : 范_Echarts_5_事件之名称_EchartsZRender[]





export type 范_Vue部件之专属事件之名称 = (
    | 'resized'
    | 'echart-instance-created'
    | 'echart-instance-disposed'
)





export type 范_Echarts实例_可穿透本部件之事件之名称列表 = Array<范_Echarts实例_可穿透本部件之事件之名称>;

export type 范_Echarts实例_可穿透本部件之事件之名称 = (
    | 范_Echarts_5_事件之名称_Echarts实例
    | 范_Echarts_4_事件之名称_Echarts实例
);





// export type 范_EchartsZRender_可穿透本部件之事件之名称列表 = Array<范_EchartsZRender_可穿透本部件之事件之名称>;

// export type 范_EchartsZRender_可穿透本部件之事件之名称 = (
//     | 范_Echarts_5_事件之名称_EchartsZRender

//     /** Echarts4 的 ZRender 的所有事件名都与 Echarts5 的 ZRender 的重复了。 */
//     // | 范_Echarts_4_事件之名称_EchartsZRender
// );
