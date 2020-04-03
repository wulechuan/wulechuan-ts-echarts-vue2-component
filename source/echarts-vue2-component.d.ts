/// <reference path="./echarts.d.ts" />

declare module '@wulechuan/echarts-vue2-component' {
    export type SupportedZRenderEventTypes = Array<SupportedZrenderEventType>;

    export type SupportedZrenderEventType = (
        'click' |
        'mousedown' |
        'mouseup' |
        'mousewheel' |
        'dblclick' |
        'contextmenu'
    );

    export type SupportedEChartsInstanceEventTypes = Array<SupportedEchartsInstanceEventType>;

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
