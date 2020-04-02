export declare namespace echarts {
    export interface ECharts {
        /**
         * getZr 暂未出现在官方的 @types 定义中。
         * 因此，须借助下方代码临时补充相关的类型定义。
         * 否则采用 TypeScript 之项目的构建脚本可能报错并失败。
         */
        getZr: () => {
            on:  Function;
            off: Function;
            [key: string]: any;
        };
    }

    export type EchartsInitializationOptions = {
        devicePixelRatio?: number;
        renderer?: 'canvas' | 'svg';
        width?:     number  | string;
        height?:    number  | string;
    };

    export type EChartsTheme = string | object;
}





declare module 'echarts-vue2-component' {
    export type SupportedZrenderEventTypes = Array<SupportedZrenderEventType>;

    export type SupportedZrenderEventType = (
        'click' |
        'mousedown' |
        'mouseup' |
        'mousewheel' |
        'dblclick' |
        'contextmenu'
    );

    export type SupportedEchartsInstanceEventTypes = Array<SupportedEchartsInstanceEventType>;

    export type SupportedEchartsInstanceEventType = (
        'legendselectchanged' |
        'legendselected' |
        'legendunselected' |
        'legendscroll' |
        'datazoom' |
        'datarangeselected' |
        'timelinechanged' |
        'timelineplaychanged' |
        'restore' |
        'dataviewchanged' |
        'magictypechanged' |
        'geoselectchanged' |
        'geoselected' |
        'geounselected' |
        'pieselectchanged' |
        'pieselected' |
        'pieunselected' |
        'mapselectchanged' |
        'mapselected' |
        'mapunselected' |
        'axisareaselected' |
        'focusnodeadjacency' |
        'unfocusnodeadjacency' |
        'brush' |
        'brushselected' |
        'rendered' |
        'finished' |
        'click' |
        'dblclick' |
        'mouseover' |
        'mouseout' |
        'mousemove' |
        'mousedown' |
        'mouseup' |
        'globalout' |
        'contextmenu'
    );
}
