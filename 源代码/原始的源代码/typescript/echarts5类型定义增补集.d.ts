export type 范_Echarts一切导出之根 = typeof echarts;
export type 范_Echarts工厂函数 = typeof echarts.init;





/**
 * `范_Echarts工厂函数之配置项集` 官方原名为 `EChartsInitOpts` ，
 * 但官方代码并未将其【导出】（ export ）。
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
 */
export type 范_Echarts实例_渲染器类别名 = 'canvas' | 'svg';





/**
 * `范_Echarts配色方案之配置项集` 官方原名为 `ThemeOption` ，
 * 但官方代码并未将其【导出】（ export ）。
 * 官方的定义即为 `Dictionary<any>` 。
 * 但这会令下文拼合得到的 `范_Echarts配色方案之配置` 变成 `any` 。
 */
export type 范_Echarts配色方案之配置项集 = Dictionary<any>;
// export type 范_Echarts配色方案之配置项集 = {
//     color: Array<string>;
//     colorLayer: Array<Array<string>>;
// };

export type 范_Echarts配色方案之配置 = (
    | string
    | 范_Echarts配色方案之配置项集
);





/**
 * `范_Echarts自然语言本地化配置项集` 官方原名为 `LocaleOption` ，
 * 但官方代码并未将其【导出】（ export ）。
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





export type 范_Echarts_5_事件之名称_EchartsZRender = 范_Echarts_5_事件之名称_Echarts实例; // TODO 存疑。

/** Echarts4 的 ZRender 的所有事件名都与 Echarts5 的 ZRender 的重复了。 */
// export type 范_Echarts_4_事件之名称_EchartsZRender = (
//     | 'click'
//     | 'dblclick'
//     | 'mouseup'
//     | 'mousedown'
//     | 'mousewheel'
//     | 'contextmenu'
// );

export type 范_Echarts_5_事件之名称_Echarts实例 = (
    | 'click'
    | 'dblclick'
    | 'mousewheel'
    | 'mouseout'
    | 'mouseover'
    | 'mouseup'
    | 'mousedown'
    | 'mousemove'
    | 'contextmenu'
    | 'globalout'
    | 'drag'
    | 'dragstart'
    | 'dragend'
    | 'dragenter'
    | 'dragleave'
    | 'dragover'
    | 'drop'
);

export type 范_Echarts_4_事件之名称_Echarts实例 = (
    | 'legendselectchanged'
    | 'legendselected'
    | 'legendunselected'
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
    | 'pieselectchanged'
    | 'pieselected'
    | 'pieunselected'
    | 'mapselectchanged'
    | 'mapselected'
    | 'mapunselected'
    | 'axisareaselected'
    | 'focusnodeadjacency'
    | 'unfocusnodeadjacency'
    | 'brush'
    | 'brushselected'
    | 'rendered'
    | 'finished'

    /** 以下 Echarts4 实例的事件名与 Echarts5 实例的事件名重复了。 */
    // | 'click'
    // | 'dblclick'
    // | 'mouseout'
    // | 'mouseover'
    // | 'mouseup'
    // | 'mousedown'
    // | 'mousemove'
    // | 'contextmenu'
    // | 'globalout'
);
