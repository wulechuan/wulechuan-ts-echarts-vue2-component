import Vue, { CreateElement } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import debounce from 'lodash.debounce'

import {
    addListener    as startListeningToElementResizingEvent,
    removeListener as  stopListeningToElementResizingEvent,
} from 'resize-detector'

import echarts, {
    ECharts,
    EChartOption,
    EChartsResizeOption,
    EChartsConvertFinder,
    EChartsLoadingOption,
    TypedArray,

    // Augmentations by this package.
    EchartsInitializationOptions,
    EChartsTheme,
} from 'echarts'





import {
    SupportedZrenderEventTypes,
    SupportedEchartsInstanceEventTypes,
} from './types'





const SUPPORTED_ZRENDER_EVENT_TYPES: SupportedZrenderEventTypes = [
    'click',
    'mousedown',
    'mouseup',
    'mousewheel',
    'dblclick',
    'contextmenu',
]

const SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES: SupportedEchartsInstanceEventTypes = [
    'legendselectchanged',
    'legendselected',
    'legendunselected',
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
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'axisareaselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
    'brush',
    'brushselected',
    'rendered',
    'finished',
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mousemove',
    'mousedown',
    'mouseup',
    'globalout',
    'contextmenu',
]





@Component({})
export default class WlcEchartsVueTwoComponent extends Vue {
    readonly name = 'wlc-echarts-vue-two-component'

    render(createElement: CreateElement) {
        return createElement('div')
    }





    @Prop() shouldManuallyRefreshEcharts?: boolean;
    @Prop() shouldNotWatchEchartsOptionsDeeply?: boolean;
    @Prop() shouldNotAutoResizeEcharts?: boolean;

    @Prop() echartsTheme?: EChartsTheme;
    @Prop() echartsInitializationOptions?: EchartsInitializationOptions;
    @Prop() echartsOptions?: EChartOption;
    @Prop() echartsGroupingName?: string;
    @Prop() echartsResizingDebouncingInterval?: number;





    chart: ECharts | null = null;

    echartsGraphic = echarts.graphic;

    get resizingDebouncingInterval(): number {
        const { echartsResizingDebouncingInterval } = this

        if (echartsResizingDebouncingInterval === undefined) {
            return 200
        }

        if (echartsResizingDebouncingInterval > 10) {
            return echartsResizingDebouncingInterval
        }

        return 200
    }

    $rootElementResizeEventHandler = debounce(
        this.$resize.bind(this),
        this.resizingDebouncingInterval,
        { leading: true }
    )

    $toUnwatchEChartsOptions: Function | null = null;





    @Watch('shouldManuallyRefreshEcharts', {})
    onManuallyUpdatingMarkChanged(newMark: boolean, oldMark: boolean): void {
        this.stopWatchingIncomingEChartsOptions()
        this.startWatchingIncomingEChartsOptions()
        this.updateECharts() // Always take this opportunity to update echarts once.
    }

    @Watch('shouldNotWatchEchartsOptionsDeeply', {})
    onEChartsOptionsWatchingDepthMarkChanged(newMark: boolean, oldMark: boolean): void {
        this.stopWatchingIncomingEChartsOptions()
        this.startWatchingIncomingEChartsOptions()
        this.updateECharts() // Always take this opportunity to update echarts once.
    }

    startWatchingIncomingEChartsOptions(): void {
        const { chart } = this
        if (chart && !this.$toUnwatchEChartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEChartsOptions = this.$watch('echartsOptions', (newOptions, oldOptions) => {
                this.updateECharts(newOptions !== oldOptions)
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply })
        }
    }

    stopWatchingIncomingEChartsOptions(): void {
        const { $toUnwatchEChartsOptions } = this
        if ($toUnwatchEChartsOptions) {
            $toUnwatchEChartsOptions()
            this.$toUnwatchEChartsOptions = null
        }
    }

    @Watch('shouldNotAutoResizeEcharts', {})
    onEChartsAutoReszingMarkChanged(newMark: boolean, oldMark: boolean): void {
        if (newMark) {
            this.disableAutoResizing()
        } else {
            this.enableAutoResizing()
        }
    }

    @Watch('echartsTheme', {})
    onEChartsThemeChanged(newTheme: EChartsTheme, oldTheme: EChartsTheme): void {
        this.recreateEChart()
    }

    @Watch('echartsGroupingName', {})
    onEChartsGroupingNameChanged(newGroupingName: string, oldGroupingName: string): void {
        const { chart } = this
        if (chart) { chart.group = newGroupingName }
    }





    get echartWidth(): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getWidth()
    }

    get echartHeight(): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getHeight()
    }

    get echartIsDisposed(): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.isDisposed()
    }

    get echartComputedOptions(): null | echarts.EChartOption<EChartOption.Series> {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }





    // --- echarts static methods: start ------------

    // connect(group: string | ECharts[]): void {
    //     echarts.connect(group)
    // }

    // disConnect(group: string): void {
    //     echarts.disConnect(group)
    // }

    // registerMap(
    //     mapName: string,
    //     geoJSON: object,
    //     specialAreas?: object
    // ): void {
    //     echarts.registerMap(mapName, geoJSON, specialAreas)
    // }

    // registerTheme(themeName: string, theme: object): void {
    //     echarts.registerTheme(name, theme)
    // }

    // getMap(mapName: string): MapObj {
    //     return echarts.getMap(mapName)
    // }

    // --- echarts static methods: end --------------





    // --- eCharts instance methods: start ----------

    dispatchAction(payload: object): void {
        const { chart } = this
        if (chart) { chart.dispatchAction(payload) }
    }

    resize(resizingOptions?: EChartsResizeOption): void {
        const { chart } = this
        if (chart) { chart.resize(resizingOptions) }
    }

    convertToPixel(finder: EChartsConvertFinder, value: string | any[]): string | any[] {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertToPixel(finder, value)
    }

    convertFromPixel(finder: EChartsConvertFinder, value: any[] | string) : any[] | string {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertFromPixel(finder, value)
    }

    containPixel(finder: EChartsConvertFinder, value: any[]): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.containPixel(finder, value)
    }

    showLoading(type?: string, options?: EChartsLoadingOption): void {
        const { chart } = this
        if (chart) { chart.showLoading(type, options) }
    }

    hideLoading(): void {
        const { chart } = this
        if (chart) { chart.hideLoading() }
    }

    getDataURL(options: {
        type?: string,
        pixelRatio?: number,
        backgroundColor?: string,
        excludeComponents?: string[]
    }): string {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getDataURL(options)
    }

    getConnectedDataURL(options: {
        type: string,
        pixelRatio: number,
        backgroundColor: string,
        excludeComponents?: string[]
    }): string {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getConnectedDataURL(options)
    }

    appendData(options: {
        seriesIndex?: string,
        data?: any[] | TypedArray,
    }): void {
        const { chart } = this
        if (chart) { chart.appendData(options) }
    }

    clear(): void {
        const { chart } = this
        if (chart) { chart.clear() }
    }

    // --- eCharts instance methods: end ------------





    startListeningToAllEChartsEvents(): void {
        const { chart } = this
        if (!chart) { return }

        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(eventType => {
            chart.on(eventType, (eventObject: object) => {
                this.$emit(eventType, eventObject)
            })
        })

        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            const zrenderInstance = chart.getZr()

            SUPPORTED_ZRENDER_EVENT_TYPES.forEach(eventType => {
                zrenderInstance.on(eventType, (eventOpject: object) => {
                    this.$emit(`zrender:${eventType}`, eventOpject)
                })
            })
        }
    }

    stopListeningToAllEChartsEvents(): void {
        const { chart } = this
        if (!chart) { return }

        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(eventType => {
            chart.off(eventType)
        })

        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            const zrenderInstance = chart.getZr()
            // https://ecomfe.github.io/zrender-doc/public/api.html#zrendereventfulonevent-handler-context
            // https://github.com/ecomfe/zrender/blob/master/src/mixin/Eventful.js#L75
            zrenderInstance.off()
        }
    }

    enableAutoResizing(): void {
        startListeningToElementResizingEvent(
            this.$el as HTMLDivElement | HTMLCanvasElement,
            this.$rootElementResizeEventHandler
        )
    }

    disableAutoResizing(): void {
        stopListeningToElementResizingEvent(
            this.$el as HTMLDivElement | HTMLCanvasElement,
            this.$rootElementResizeEventHandler
        )
    }

    $resize(): void {
        const { chart } = this
        if (chart) { chart.resize() }
    }

    createEchartInstance(): void {
        if (this.chart) { return }

        const newChart = echarts.init(
            this.$el as HTMLDivElement | HTMLCanvasElement,
            this.echartsTheme,
            this.echartsInitializationOptions
        )

        this.chart = newChart

        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName
        }

        this.updateECharts(true)
        this.startListeningToAllEChartsEvents()

        if (!this.shouldNotAutoResizeEcharts) {
            this.enableAutoResizing()
        }
    }

    updateECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
        // To update echarts with current "echartsOptions" withing Vue component props.
        // If you set this component to update manually, you invoke this method yourself.
        const { chart, echartsOptions } = this
        if (chart && echartsOptions) {
            chart.setOption(echartsOptions, shouldNotMerge, lazyUpdate)
        }
    }

    dispose(): void {
        const { chart } = this
        if (chart) {
            this.disableAutoResizing()
            // this.stopListeningToAllEChartsEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose()
            this.chart = null
        }
    }

    recreateEChart(): void {
        this.dispose()
        this.createEchartInstance()
    }





    // --- Vue component life cycle hooks -----------

    mounted(): void {
        this.createEchartInstance()
        this.startWatchingIncomingEChartsOptions()
    }

    activated(): void {
        // I think we should take this opportunity to auto-resize the echart once.
        if (true || !this.shouldNotAutoResizeEcharts) {
            this.$resize()
        }
    }

    beforeDestroy(): void {
        // this.stopWatchingIncomingEChartsOptions() // I think Vue will do this itself automatically.
        this.dispose()
    }
}
