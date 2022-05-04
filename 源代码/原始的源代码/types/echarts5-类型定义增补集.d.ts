export type 范_Echarts模块导出之根 = typeof echarts;
export type 范_Echarts工厂函数 = typeof echarts.init;





/**
 * `范_Echarts工厂函数之配置项集` 官方原名为 `EChartsInitOpts` ，
 * 但官方代码并未将其【导出】（ export ）。
 * 故本人手工作此增补定义。
 */
// export type 范_Echarts工厂函数之配置项集 = Parameters<范_Echarts工厂函数>[2];
export type 范_Echarts工厂函数之配置项集 = {
    renderer?:         范_Echarts实例_渲染器类别名;
    devicePixelRatio?: number;
    useDirtyRect?:     boolean;
    ssr?:              boolean;
    width?:            number;
    height?:           number;
    locale?:           string | 范_Echarts自然语言本地化配置项集;
};





/**
 * `范_Echarts实例_渲染器类别名` 官方原名为 `RendererType` ，
 * 但官方代码并未将其【导出】（ export ）。
 * 故本人手工作此增补定义。
 */
export type 范_Echarts实例_渲染器类别名 = 'canvas' | 'svg';





/**
 * `范_Echarts配色方案之配置项集` 官方原名为 `ThemeOption` ，
 * 但官方代码并未将其【导出】（ export ）。
 * 故本人手工作此增补定义。
 */
export type 范_Echarts配色方案之配置项集 = {
    color?: Array<string>;
    colorLayer?: Array<Array<string>>;
    [key: string]: any;
};

export type 范_Echarts配色方案之配置 = (
    | string
    | 范_Echarts配色方案之配置项集
);





/**
 * `范_Echarts自然语言本地化配置项集` 官方原名为 `LocaleOption` ，
 * 但官方代码并未将其【导出】（ export ）。
 * 故本人手工作此增补定义。
 */
export type 范_Echarts自然语言本地化配置项集 = {
    time: {
        month: string[];
        monthAbbr: string[];
        dayOfWeek: string[];
        dayOfWeekAbbr: string[];
    };
    legend: {
        selector: {
            all: string;
            inverse: string;
        };
    };
    toolbox: {
        brush: {
            title: {
                rect: string;
                polygon: string;
                lineX: string;
                lineY: string;
                keep: string;
                clear: string;
            };
        };
        dataView: {
            title: string;
            lang: string[];
        };
        dataZoom: {
            title: {
                zoom: string;
                back: string;
            };
        };
        magicType: {
            title: {
                line: string;
                bar: string;
                stack: string;
                tiled: string;
            };
        };
        restore: {
            title: string;
        };
        saveAsImage: {
            title: string;
            lang: string[];
        };
    };
    series: {
        typeNames: {
            pie: string;
            bar: string;
            line: string;
            scatter: string;
            effectScatter: string;
            radar: string;
            tree: string;
            treemap: string;
            boxplot: string;
            candlestick: string;
            k: string;
            heatmap: string;
            map: string;
            parallel: string;
            lines: string;
            graph: string;
            sankey: string;
            funnel: string;
            gauge: string;
            pictorialBar: string;
            themeRiver: string;
            sunburst: string;
        };
    };
    aria: {
        general: {
            withTitle: string;
            withoutTitle: string;
        };
        series: {
            single: {
                prefix: string;
                withName: string;
                withoutName: string;
            };
            multiple: {
                prefix: string;
                withName: string;
                withoutName: string;
                separator: {
                    middle: string;
                    end: string;
                };
            };
        };
        data: {
            allData: string;
            partialData: string;
            withName: string;
            withoutName: string;
            separator: {
                middle: string;
                end: string;
            };
        };
    };
};





export type 范_Echarts_事件之名称_Echarts_5_之实例 = (

    /** 参阅《 https://echarts.apache.org/zh/api.html#events 》。 */

    | 'click'
    | 'dblclick'
    | 'mousewheel'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'mousedown'
    | 'mousemove'
    | 'globalout'

    | 'drag'
    | 'dragstart'
    | 'dragend'
    | 'dragenter'
    | 'dragleave'
    | 'dragover'
    | 'drop'

    | 'contextmenu'
    | 'highlight'
    | 'downplay'
    | 'selectchanged'
    | 'legendselectchanged'
    | 'legendselected'
    | 'legendunselected'
    | 'legendselectall'
    | 'legendinverseselect'
    | 'legendscroll'
    | 'datazoom'
    | 'datarangeselected'
    | 'timelinechanged'
    | 'timelineplaychanged'
    | 'restore'
    | 'dataviewchanged'
    | 'magictypechanged'
    | 'geoselectchanged'
    | 'geoselected'
    | 'geounselected'
    | 'axisareaselected'
    | 'brush'
    | 'brushEnd'
    | 'brushselected'
    | 'globalcursortaken'
    | 'rendered'
    | 'finished'
);



export type 范_Echarts_事件之名称_Echarts_4_之实例 = (

    /** 参阅《 https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide/#%E4%B8%8D%E5%86%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E7%9A%84-api 》。 */

    | 'pieselectchanged'
    | 'pieselected'
    | 'pieunselected'
    | 'mapselectchanged'
    | 'mapselected'
    | 'mapunselected'
    | 'focusnodeadjacency'
    | 'unfocusnodeadjacency'



    /** 以下 Echarts4 实例的事件名与 Echarts5 实例的事件名重复了。 */

    // | 'click'
    // | 'dblclick'
    // | 'mouseover'
    // | 'mouseout'
    // | 'mouseup'
    // | 'mousedown'
    // | 'mousemove'
    // | 'globalout'
    // | 'contextmenu'
    // | 'legendselectchanged'
    // | 'legendselected'
    // | 'legendunselected'
    // | 'legendscroll'
    // | 'datazoom'
    // | 'datarangeselected'
    // | 'timelinechanged'
    // | 'timelineplaychanged'
    // | 'restore'
    // | 'dataviewchanged'
    // | 'magictypechanged'
    // | 'geoselectchanged'
    // | 'geoselected'
    // | 'geounselected'
    // | 'axisareaselected'
    // | 'brush'
    // | 'brushselected'
    // | 'rendered'
    // | 'finished'
);





export type 范_Echarts_事件之名称_Echarts_任何版本之实例 = (
    | 范_Echarts_事件之名称_Echarts_5_之实例
    | 范_Echarts_事件之名称_Echarts_4_之实例
);





/**
 * https://echarts.apache.org/handbook/zh/concepts/event/#%E7%9B%91%E5%90%AC%E2%80%9C%E7%A9%BA%E7%99%BD%E5%A4%84%E2%80%9D%E7%9A%84%E4%BA%8B%E4%BB%B6
 */

import type {
    ElementEvent,
} from 'zrender'

export type 范_Zrender_事件之名称 = ElementEvent['type'];

// export type 范_Zrender_事件之名称 = (
//     | 'click'
//     | 'dblclick'
//     | 'mousewheel'
//     | 'mouseout'
//     | 'mouseover'
//     | 'mouseup'
//     | 'mousedown'
//     | 'mousemove'
//     | 'contextmenu'

//     | 'drag'
//     | 'dragstart'
//     | 'dragend'
//     | 'dragenter'
//     | 'dragleave'
//     | 'dragover'
//     | 'drop'
//     | 'globalout'
// )


export type 范_Zrender_事件穿透本部件后之名称 = `zrender:${范_Zrender_事件之名称}`

// export type 范_Zrender_事件穿透本部件后之名称 = (
//     | 'zrender:click'
//     | 'zrender:dblclick'
//     | 'zrender:mousewheel'
//     | 'zrender:mouseout'
//     | 'zrender:mouseover'
//     | 'zrender:mouseup'
//     | 'zrender:mousedown'
//     | 'zrender:mousemove'
//     | 'zrender:contextmenu'

//     | 'zrender:drag'
//     | 'zrender:dragstart'
//     | 'zrender:dragend'
//     | 'zrender:dragenter'
//     | 'zrender:dragleave'
//     | 'zrender:dragover'
//     | 'zrender:drop'
//     | 'zrender:globalout'
// )
