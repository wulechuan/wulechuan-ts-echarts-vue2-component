declare namespace echarts {
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

    type EChartsRootNamespaceType = typeof echarts

    export type EchartsCreator = {
        // [P in keyof typeof echarts]: typeof echarts[P];
        init:             EChartsRootNamespaceType['init'];
        graphic:          EChartsRootNamespaceType['graphic'];
        connect:          EChartsRootNamespaceType['connect'];
        disConnect:       EChartsRootNamespaceType['disConnect'];
        dispose:          EChartsRootNamespaceType['dispose'];
        getInstanceByDom: EChartsRootNamespaceType['getInstanceByDom'];
        registerMap:      EChartsRootNamespaceType['registerMap'];
        registerTheme:    EChartsRootNamespaceType['registerTheme'];
        getMap:           EChartsRootNamespaceType['getMap'];
        EChartOption:     echarts.EChartOption;
    }
}
