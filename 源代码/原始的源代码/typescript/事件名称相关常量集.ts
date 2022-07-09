import type {
    范_Echarts_事件之名称_Echarts_5_之实例,
    范_Echarts_事件之名称_Echarts_4_之实例,
    范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例,
    范_可穿透本部件之事件名称之列表_Zrender,
    范_事件穿透本部件后之名称之列表_Zrender,
    范_Zrender_事件穿透本部件后之名称,

    范_本部件之原发事件之名称,
} from '../types'





export const SELF_ORIGINED_EVENT_NAMES: 范_本部件之原发事件之名称[] = [
    'echart-instance-created',
    'echart-instance-disposed',
    'resized',
]





export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5: 范_Echarts_事件之名称_Echarts_5_之实例[] = [

    /** 参阅《 https://echarts.apache.org/zh/api.html#events 》。 */

    'click',
    'dblclick',
    'mousewheel',
    'mouseover',
    'mouseout',
    'mouseup',
    'mousedown',
    'mousemove',
    'globalout',

    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'drop',

    'contextmenu',

    'highlight',
    'downplay',
    'selectchanged',
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'legendselectall',
    'legendinverseselect',
    'legendscroll',
    'datazoom',
    'datarangeselected',
    'timelinechanged',
    'timelineplaychanged',
    'restore',
    'dataviewchanged',
    'magictypechanged',
    'geoselectchanged',
    'geoselected',
    'geounselected',
    'axisareaselected',
    'brush',
    'brushEnd',
    'brushselected',
    'globalcursortaken',
    'rendered',
    'finished',
]



export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4: 范_Echarts_事件之名称_Echarts_4_之实例[] = [

    /** 参阅《 https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide/#%E4%B8%8D%E5%86%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E7%9A%84-api 》。 */

    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',



    /** 以下事件名与 Echarts5 支持的事件名重复了。 */

    // 'click',
    // 'dblclick',
    // 'mouseover',
    // 'mouseout',
    // 'mouseup',
    // 'mousedown',
    // 'mousemove',
    // 'globalout',
    // 'contextmenu',
    // 'legendselectchanged',
    // 'legendselected',
    // 'legendunselected',
    // 'legendscroll',
    // 'datazoom',
    // 'datarangeselected',
    // 'timelinechanged',
    // 'timelineplaychanged',
    // 'restore',
    // 'dataviewchanged',
    // 'magictypechanged',
    // 'geoselectchanged',
    // 'geoselected',
    // 'geounselected',
    // 'axisareaselected',
    // 'brush',
    // 'brushselected',
    // 'rendered',
    // 'finished',
]





export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例 = [
    ...SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5,
    ...SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4,
]





export const SUPPORTED_ZRENDER_EVENT_NAMES__RAW: 范_可穿透本部件之事件名称之列表_Zrender = [
    'click',
    'dblclick',
    'mousewheel',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousedown',
    'mousemove',
    'contextmenu',

    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'drop',
    'globalout',
]

export const SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT: 范_事件穿透本部件后之名称之列表_Zrender = SUPPORTED_ZRENDER_EVENT_NAMES__RAW.map(
    事件原始名称 => `zrender:${事件原始名称}` as 范_Zrender_事件穿透本部件后之名称
)
