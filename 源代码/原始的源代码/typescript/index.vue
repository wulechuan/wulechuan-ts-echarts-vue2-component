<script lang="ts">
import Vue, { CreateElement } from 'vue'
import type { VNode } from 'vue'

import { Component, Prop, Watch } from 'vue-property-decorator'

import debounce from 'lodash.debounce'

import {
    ResizeCallback,
    addListener    as startListeningToElementResizingEvent,
    removeListener as  stopListeningToElementResizingEvent,
} from 'resize-detector'

import {
    文本列表查重,
} from './辅助工具集'

import type {
    ECharts,
    EChartsOption,
    EChartsCoreOption,
} from 'echarts'

import {
    范_Echarts_5_事件之名称_Echarts实例,
    范_Echarts_4_事件之名称_Echarts实例,
    // 范_Echarts_5_事件之名称_EchartsZRender,
    // 范_Echarts_4_事件之名称_EchartsZRender,

    范_Vue部件之专属事件之名称,

    范_Echarts一切导出之根,
    范_Echarts配色方案之配置,
    范_Echarts工厂函数之配置项集,
    范_Echarts实例_可穿透本部件之事件之名称列表,
    // 范_EchartsZRender_可穿透本部件之事件之名称列表,
} from './echarts-vue2-部件'





const _ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL = 200





const _SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4: 范_Echarts_4_事件之名称_Echarts实例[] = [
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
]



const _SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5: 范_Echarts_5_事件之名称_Echarts实例[] = [
    'click',
    'dblclick',
    'mouseover',
    'mouseout',
    'mouseup',
    'mousedown',
    'globalout',
    'contextmenu',

    'mousewheel',
    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'drop',
]



// const _SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_4: 范_Echarts_4_事件之名称_EchartsZRender[] = [
// ]



// const _SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_5: 范_Echarts_5_事件之名称_EchartsZRender[] = [
//     'click',
//     'dblclick',
//     'mousewheel',
//     'mouseout',
//     'mouseover',
//     'mouseup',
//     'mousedown',
//     'mousemove',
//     'contextmenu',
//     'drag',
//     'dragstart',
//     'dragend',
//     'dragenter',
//     'dragleave',
//     'dragover',
//     'drop',
//     'globalout',
// ]





export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL: 范_Echarts实例_可穿透本部件之事件之名称列表 = [
    ..._SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5,
    ..._SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4,
]



// export const SUPPORTED_ZRENDER_EVENT_NAMES__ALL: 范_EchartsZRender_可穿透本部件之事件之名称列表 = [
//     ..._SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_5,

//     /** Echarts4 的 ZRender 的所有事件名都与 Echarts5 的 ZRender 的重复了。 */
//     // ..._SUPPORTED_ZRENDER_EVENT_NAMES__ECHARTS_4,
// ]



const 部件名称 = 'wlc-echarts-vue-two-component'
const echarts实例事件名称查重统计结果 = 文本列表查重(SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL)
if (echarts实例事件名称查重统计结果) {
    throw new Error(`${部件名称}：发现重复的事件名称。其中：\n\t${echarts实例事件名称查重统计结果.错误消息文本片断集.join('\n\t')}\n`)
}





@Component({})
export default class WlcEchartsVueTwoComponent extends Vue {
    render (createElement: CreateElement): VNode {
        return createElement('div')
    }





    @Prop() public readonly echartsCreator?:                     范_Echarts一切导出之根
    @Prop() public readonly echartsTheme?:                       范_Echarts配色方案之配置
    @Prop() public readonly echartsInitializationOptions?:       范_Echarts工厂函数之配置项集

    @Prop() public readonly echartsOptions?:                     EChartsOption
    @Prop() public readonly echartsGroupingName?:                string
    @Prop() public readonly echartsResizingDebouncingInterval?:  number

    @Prop() public readonly shouldTransferEcharts4Events?:       boolean
    @Prop() public readonly shouldManuallyRefreshEcharts?:       boolean
    @Prop() public readonly shouldNotWatchEchartsOptionsDeeply?: boolean
    @Prop() public readonly shouldNotAutoResizeEcharts?:         boolean





    public readonly name:                string                      = 部件名称
    public          chart:               ECharts              | null = null
    public          echartsCreatorToUse: 范_Echarts一切导出之根 | null = null





    private $oldResizingDebouncingInterval: number                = NaN
    private $rootElementResizeEventHandler: ResizeCallback | null = null
    private $toUnwatchEChartsOptions:       Function       | null = null





    public get echartWidth(): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getWidth()
    }

    public get echartHeight(): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getHeight()
    }

    public get echartIsDisposed(): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.isDisposed()
    }

    public get echartComputedOptions(): null | EChartsCoreOption {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }





    @Watch('echartsResizingDebouncingInterval', {})
    private $onResizingDebouncingIntervalChanged(newInterval: number, oldInterval: number): void {
        this.$updateResizingDebouncingInterval(newInterval)
    }

    @Watch('shouldManuallyRefreshEcharts', {})
    private $onManuallyRefreshingMarkChanged(newMark: boolean, oldMark: boolean): void {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }

    @Watch('shouldNotWatchEchartsOptionsDeeply', {})
    private $onEChartsOptionsWatchingDepthMarkChanged(newMark: boolean, oldMark: boolean): void {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }

    @Watch('shouldNotAutoResizeEcharts', {})
    private $onEChartsAutoReszingMarkChanged(newMark: boolean, oldMark: boolean): void {
        if (newMark) {
            this.$disableAutoResizing()
        } else {
            this.$enableAutoResizing()
        }
    }

    @Watch('echartsTheme', {})
    private $onEChartsThemeChanged(newTheme: 范_Echarts配色方案之配置, oldTheme: 范_Echarts配色方案之配置): void {
        this.$recreateEChartInstance()
    }

    @Watch('echartsGroupingName', {})
    private onEChartsGroupingNameChanged(newGroupingName: string, oldGroupingName: string): void {
        const { chart } = this
        if (chart) { chart.group = newGroupingName }
    }





    public updateECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
        console.warn('The "updateECharts" method is a deprecated alias of "refreshECharts". So use "refreshECharts" instead.')
        this.refreshECharts(shouldNotMerge, lazyUpdate)
    }

    public refreshECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
        /**
         * This method is to update echarts according to current "echartsOptions" within
         * the props of this Vue component.
         * By default, this Vue component updates echarts automatically whenever the
         * "echartsOptions" changes. Thus you don't need to invoke this method at all.
         * But if you set this component to update manually, you invoke this method yourself.
         */
        const { chart, echartsOptions } = this
        if (chart && echartsOptions) {
            chart.setOption(echartsOptions, shouldNotMerge, lazyUpdate)
        }
    }





    // --- echarts static methods: start ------------

    // static connect(group: string | ECharts[]): void {
    //     echarts.connect(group)
    // }

    // static disConnect(group: string): void {
    //     echarts.disConnect(group)
    // }

    // static registerMap(
    //     mapName: string,
    //     geoJSON: object,
    //     specialAreas?: object
    // ): void {
    //     echarts.registerMap(mapName, geoJSON, specialAreas)
    // }

    // static registerTheme(themeName: string, theme: object): void {
    //     echarts.registerTheme(themeName, theme)
    // }

    // static getMap(mapName: string): MapObj {
    //     return echarts.getMap(mapName)
    // }

    // --- echarts static methods: end --------------





    // --- eCharts instance methods: start ----------

    public dispatchAction(
        ...options: Parameters<ECharts['dispatchAction']>
    ): void {
        const { chart } = this
        if (chart) { chart.dispatchAction(...options) }
    }

    public resize(
        ...options: Parameters<ECharts['resize']>
    ): void {
        const { chart } = this
        if (chart) { chart.resize(...options) }
    }

    public convertToPixel(
        ...options: Parameters<ECharts['convertToPixel']>
    ): ReturnType<ECharts['convertToPixel']> {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertToPixel(...options)
    }

    public convertFromPixel(
        ...options: Parameters<ECharts['convertFromPixel']>
    ): ReturnType<ECharts['convertFromPixel']> {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertFromPixel(...options)
    }

    public containPixel(
        ...options: Parameters<ECharts['containPixel']>
    ): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.containPixel(...options)
    }

    public showLoading(
        ...options: Parameters<ECharts['showLoading']>
    ): void {
        const { chart } = this
        if (chart) { chart.showLoading(...options) }
    }

    public hideLoading(): void {
        const { chart } = this
        if (chart) { chart.hideLoading() }
    }

    public getDataURL(
        ...options: Parameters<ECharts['getDataURL']>
    ): ReturnType<ECharts['getDataURL']> {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getDataURL(...options)
    }

    public getConnectedDataURL(
        ...options: Parameters<ECharts['getConnectedDataURL']>
    ): ReturnType<ECharts['getConnectedDataURL']> {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getConnectedDataURL(...options)
    }

    public appendData(
        ...options: Parameters<ECharts['appendData']>
    ): void {
        const { chart } = this
        if (chart) { chart.appendData(...options) }
    }

    public clear(): void {
        const { chart } = this
        if (chart) { chart.clear() }
    }

    // --- eCharts instance methods: end ------------





    private $decideEchartsCreatorToUse(): void {
        const providedEchartsCreator = this.echartsCreator

        let echartsCreatorToUse
        if (providedEchartsCreator) {
            echartsCreatorToUse = providedEchartsCreator
        } else {
            throw new ReferenceError(
                '[wlc-echarts-vue-two-component]:' +
                '\n\tNo echart creator was provided.'+
                '\n\tFrom v0.3.0 on, you MUST provide an echart creator '+
                'to this vue component, via its "prop" named "echarts-creator".'
            )
        }
        this.echartsCreatorToUse = echartsCreatorToUse
    }

    private $startWatchingIncomingEChartsOptions(): void {
        const { chart } = this
        if (chart && !this.$toUnwatchEChartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEChartsOptions = this.$watch('echartsOptions', (newOptions, oldOptions) => {
                this.refreshECharts(newOptions !== oldOptions)
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply })
        }
    }

    private $stopWatchingIncomingEChartsOptions(): void {
        const { $toUnwatchEChartsOptions } = this
        if ($toUnwatchEChartsOptions) {
            $toUnwatchEChartsOptions()
            this.$toUnwatchEChartsOptions = null
        }
    }

    private $startListeningToAllEChartsEvents(): void {
        const { chart } = this
        if (!chart) { return }

        let namesOfEchartsInstanceEventsToTransfer: string[]
        if (this.shouldTransferEcharts4Events) {
            namesOfEchartsInstanceEventsToTransfer = SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL
        } else {
            namesOfEchartsInstanceEventsToTransfer = _SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5
        }

        namesOfEchartsInstanceEventsToTransfer.forEach(eventType => {
            chart.on(eventType, (...event) => {
                this.$emit(eventType, ...event)
            })
        })

        // if (SUPPORTED_ZRENDER_EVENT_NAMES__ALL.length > 0) {
        //     const zrenderInstance = chart.getZr()

        //     SUPPORTED_ZRENDER_EVENT_NAMES__ALL.forEach(eventType => {
        //         zrenderInstance.on(eventType, (eventOpject: object) => {
        //             this.$emit(`zrender:${eventType}`, eventOpject)
        //         })
        //     })
        // }
    }

    private $stopListeningToAllEChartsEvents(): void {
        const { chart } = this
        if (!chart) { return }

        SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL.forEach(eventType => {
            chart.off(eventType)
        })

        // if (SUPPORTED_ZRENDER_EVENT_NAMES__ALL.length > 0) {
        //     const zrenderInstance = chart.getZr()
        //     // https://ecomfe.github.io/zrender-doc/public/api.html#zrendereventfulonevent-handler-context
        //     // https://github.com/ecomfe/zrender/blob/master/src/mixin/Eventful.js#L75
        //     zrenderInstance.off()
        // }
    }

    private $updateResizingDebouncingInterval(newInterval?: number, eChartInstanceIsJustBuilt?: boolean): void {
        let decidedInterval: number = _ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL

        if (newInterval && newInterval >= 10) {
            decidedInterval = + newInterval // In case the newInterval is a string, like '120'.
        }

        if (decidedInterval === this.$oldResizingDebouncingInterval && !eChartInstanceIsJustBuilt) {
            return
        }

        this.$disableAutoResizing()
        this.$rootElementResizeEventHandler = null

        if (!this.shouldNotAutoResizeEcharts) {
            const newHandler = debounce(
                this.$resize.bind(this),
                decidedInterval,
                { leading: true }
            )

            if (typeof newHandler == 'function') {
                this.$rootElementResizeEventHandler = newHandler
                this.$enableAutoResizing()
                this.$oldResizingDebouncingInterval = decidedInterval
            }
        }
    }

    private $enableAutoResizing(): void {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            startListeningToElementResizingEvent(el, handler)
        }
    }

    private $disableAutoResizing(): void {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            stopListeningToElementResizingEvent(el, handler)
        }
    }

    private $resize(): void {
        const { chart } = this
        if (chart) {
            chart.resize()
            this.$emitEvent('resized')
        }
    }

    private $createEchartInstance(): void {
        if (this.chart) { return }

        const { echartsCreatorToUse } = this

        const newChart = echartsCreatorToUse!.init(
            this.$el as HTMLDivElement | HTMLCanvasElement,
            this.echartsTheme,
            this.echartsInitializationOptions
        )

        this.chart = newChart

        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName
        }

        this.refreshECharts(true)
        this.$startListeningToAllEChartsEvents()
        this.$updateResizingDebouncingInterval(this.echartsResizingDebouncingInterval, true)
        this.$emitEvent('echart-instance-created', this.chart)
    }

    private $disposeEchartInstance(): void {
        const { chart } = this
        if (chart) {
            this.$disableAutoResizing()
            // this.$stopListeningToAllEChartsEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose()
            this.chart = null
            this.$emitEvent('echart-instance-disposed')
        }
    }

    private $recreateEChartInstance(): void {
        this.$disposeEchartInstance()
        this.$createEchartInstance()
    }

    private $dispose(): void { // Deprecated! Use "$disposeEchartInstance" instead.
        this.$disposeEchartInstance()
    }

    private $recreateEChart(): void { // Deprecated! Use "$recreateEChartInstance" instead.
        this.$recreateEChartInstance()
    }

    private $emitEvent(eventName: 范_Vue部件之专属事件之名称, payload?: any): void {
        if (payload === undefined || payload === null) {
            this.$emit(eventName)
            return
        }

        this.$emit(eventName, payload)
    }





    // --- Vue component life cycle hooks -----------

    private created(): void {
        this.$decideEchartsCreatorToUse()
    }

    private mounted(): void {
        this.$createEchartInstance()
        this.$startWatchingIncomingEChartsOptions()
    }

    private activated(): void {
        // I think we should take this opportunity to auto-resize the echart once.
        this.$resize()

        // if (!this.shouldNotAutoResizeEpcharts) {
        //     this.$resize()
        // }
    }

    private beforeDestroy(): void {
        // this.$stopWatchingIncomingEChartsOptions() // I think Vue will do this itself automatically.
        this.$disposeEchartInstance()
    }
}
</script>
