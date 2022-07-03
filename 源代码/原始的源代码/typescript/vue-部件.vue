<script lang="ts">
import { CreateElement } from 'vue'
import type { VNode } from 'vue'

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import debounce from 'lodash.debounce'

import {
    ResizeCallback,
    addListener    as startListeningToElementResizingEvent,
    removeListener as  stopListeningToElementResizingEvent,
} from 'resize-detector'

import {
    文本列表查重,
} from './辅助工具集.js'

import type {
    ECharts,
    EChartsType,
    EChartsOption,
    EChartsCoreOption,
} from 'echarts'

import type {
    范_本部件之原发事件之名称,

    范_Echarts模块导出之根,
    范_Echarts配色方案之配置,
    范_Echarts工厂函数之配置项集,
    范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例,
    // 范_可穿透本部件之事件名称之列表_Zrender,
    // 范_事件穿透本部件后之名称之列表_Zrender,
} from '../types/index.js'

import {
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL,
    SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5,
    // SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4,
    SUPPORTED_ZRENDER_EVENT_NAMES__RAW,
    // SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT,
} from './事件名称相关常量集'





const 部件名称 = 'wlc-echarts-vue-two-component'
const _ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL = 200





const echarts实例事件名称查重统计结果 = 文本列表查重(SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL)
if (echarts实例事件名称查重统计结果) {
    throw new Error(`${部件名称}：发现重复的事件名称。其中：\n\t${echarts实例事件名称查重统计结果.错误消息文本片断集.join('\n\t')}\n`)
}





@Component({})
export default class WlcEchartsVueTwoComponent extends Vue {
    render (createElement: CreateElement): VNode {
        return createElement('div')
    }





    @Prop() public readonly echartsModuleExportsRoot?:             范_Echarts模块导出之根
    @Prop() public readonly echartsCreator?:                       范_Echarts模块导出之根 // 已作废。请改用 echartsModuleExportsRoot 。
    @Prop() public readonly echartsInitializationOptions?:         范_Echarts工厂函数之配置项集
    @Prop() public readonly echartsGroupingName?:                  string
    @Prop() public readonly echartsTheme?:                         范_Echarts配色方案之配置

    @Prop() public readonly echartsOptions?:                       EChartsOption

    @Prop() public readonly shouldManuallyRefreshEcharts?:         boolean
    @Prop() public readonly shouldNotWatchEchartsOptionsDeeply?:   boolean
    @Prop() public readonly shouldNotAutoResizeEcharts?:           boolean
    @Prop() public readonly echartsResizingDebouncingInterval?:    number

    @Prop() public readonly shouldTransferEcharts4Events?:         boolean
    @Prop() public readonly shouldTransferEventOfEchartsRendered?: boolean
    @Prop() public readonly shouldTransferEventsOfZrender?:        boolean





    public chart:                          EChartsType          | null            = null
    public echartsModuleToUse:             范_Echarts模块导出之根 | null            = null
    public namesOfAllHandledEchartsEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例 = []





    private $oldResizingDebouncingInterval: number                = NaN
    private $rootElementResizeEventHandler: ResizeCallback | null = null
    private $toUnwatchEchartsOptions:       Function       | null = null





    public get echartWidth (): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getWidth()
    }

    public get echartHeight (): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getHeight()
    }

    public get echartIsDisposed (): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.isDisposed()
    }

    public get echartComputedOptions (): null | EChartsCoreOption {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }





    @Watch('shouldTransferEcharts4Events', { immediate: true })
    private $onMarkOfTransferingEcharts4EventsChanged (newMark: boolean, oldMark: boolean): void {
        this.$decideNamesOfAllHandledEchartsEvents()
    }

    @Watch('shouldTransferEventOfEchartsRendered', { immediate: true })
    private $onMarkOfTransferingEventOfEchartsRenderedChanged (newMark: boolean, oldMark: boolean): void {
        this.$decideNamesOfAllHandledEchartsEvents()
    }

    @Watch('shouldTransferEventsOfZrender', { immediate: true })
    private $onMarkOfTransferingEventsOfZrenderChanged (newMark: boolean, oldMark: boolean): void {
        this.$rehandleAllZrenderEvents()
    }

    @Watch('namesOfAllHandledEchartsEvents', { immediate: false })
    private $onNamesOfAllHandledEchartsEventsChanged (newListOfEventNames: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例, oldListOfEventNames: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例): void {
        this.$rehandleAllEchartsEvents(oldListOfEventNames)
    }

    @Watch('echartsResizingDebouncingInterval', {})
    private $onResizingDebouncingIntervalChanged (newInterval: number, oldInterval: number): void {
        this.$updateResizingDebouncingInterval(newInterval)
    }

    @Watch('shouldManuallyRefreshEcharts', {})
    private $onMarkOfManuallyRefreshingEchartsChanged (newMark: boolean, oldMark: boolean): void {
        this.$stopWatchingIncomingEchartsOptions()
        this.$startWatchingIncomingEchartsOptions()
        this.refreshEcharts() // Always take this opportunity to refresh echarts once.
    }

    @Watch('shouldNotWatchEchartsOptionsDeeply', {})
    private $onEchartsOptionsWatchingDepthMarkChanged (newMark: boolean, oldMark: boolean): void {
        this.$stopWatchingIncomingEchartsOptions()
        this.$startWatchingIncomingEchartsOptions()
        this.refreshEcharts() // Always take this opportunity to refresh echarts once.
    }

    @Watch('shouldNotAutoResizeEcharts', {})
    private $onEchartsAutoReszingMarkChanged (newMark: boolean, oldMark: boolean): void {
        if (newMark) {
            this.$disableAutoResizing()
        } else {
            this.$enableAutoResizing()
        }
    }

    @Watch('echartsTheme', {})
    private $onEchartsThemeChanged (newTheme: 范_Echarts配色方案之配置, oldTheme: 范_Echarts配色方案之配置): void {
        this.$recreateEchartInstance()
    }

    @Watch('echartsGroupingName', {})
    private $onEchartsGroupingNameChanged (newGroupingName: string, oldGroupingName: string): void {
        const { chart } = this
        if (chart) { chart.group = newGroupingName }
    }





    public updateECharts (shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
        console.warn('The "updateECharts" method is a deprecated alias of "refreshEcharts". So use "refreshEcharts" instead.')
        this.refreshEcharts(shouldNotMerge, lazyUpdate)
    }

    public refreshECharts (shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
        console.warn('The "refreshECharts" method (with a capital C) is a deprecated alias of "refreshEcharts" (with a lowercase c). So use "refreshEcharts" instead.')
        this.refreshEcharts()
    }

    public refreshEcharts (shouldNotMerge?: boolean, lazyUpdate?: boolean): void {
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

    // static connect (group: string | ECharts[]): void {
    //     echarts.connect(group)
    // }

    // static disConnect (group: string): void {
    //     echarts.disConnect(group)
    // }

    // static registerMap (
    //     mapName: string,
    //     geoJSON: object,
    //     specialAreas?: object
    // ): void {
    //     echarts.registerMap(mapName, geoJSON, specialAreas)
    // }

    // static registerTheme (themeName: string, theme: object): void {
    //     echarts.registerTheme(themeName, theme)
    // }

    // static getMap (mapName: string): MapObj {
    //     return echarts.getMap(mapName)
    // }

    // --- echarts static methods: end --------------





    // --- eCharts instance methods: start ----------

    public dispatchAction (
        ...options: Parameters<ECharts['dispatchAction']>
    ): void {
        const { chart } = this
        if (chart) { chart.dispatchAction(...options) }
    }

    public resize (
        ...options: Parameters<ECharts['resize']>
    ): void {
        const { chart } = this
        if (chart) { chart.resize(...options) }
    }

    public convertToPixel (
        ...options: Parameters<ECharts['convertToPixel']>
    ): ReturnType<ECharts['convertToPixel']> {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertToPixel(...options)
    }

    public convertFromPixel (
        ...options: Parameters<ECharts['convertFromPixel']>
    ): ReturnType<ECharts['convertFromPixel']> {
        const { chart } = this
        if (!chart) { return [] }
        return chart.convertFromPixel(...options)
    }

    public containPixel (
        ...options: Parameters<ECharts['containPixel']>
    ): boolean {
        const { chart } = this
        if (!chart) { return false }
        return chart.containPixel(...options)
    }

    public showLoading (
        ...options: Parameters<ECharts['showLoading']>
    ): void {
        const { chart } = this
        if (chart) { chart.showLoading(...options) }
    }

    public hideLoading (): void {
        const { chart } = this
        if (chart) { chart.hideLoading() }
    }

    public getDataURL (
        ...options: Parameters<ECharts['getDataURL']>
    ): ReturnType<ECharts['getDataURL']> {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getDataURL(...options)
    }

    public getConnectedDataURL (
        ...options: Parameters<ECharts['getConnectedDataURL']>
    ): ReturnType<ECharts['getConnectedDataURL']> {
        const { chart } = this
        if (!chart) { return '' }
        return chart.getConnectedDataURL(...options)
    }

    public appendData (
        ...options: Parameters<ECharts['appendData']>
    ): void {
        const { chart } = this
        if (chart) { chart.appendData(...options) }
    }

    public clear (): void {
        const { chart } = this
        if (chart) { chart.clear() }
    }

    // --- eCharts instance methods: end ------------





    private $decideEchartsCreatorToUse (): void {
        const providedEchartsModule = this.echartsModuleExportsRoot || this.echartsCreator

        let echartsModuleToUse
        if (providedEchartsModule) {
            echartsModuleToUse = providedEchartsModule
        } else {
            throw new ReferenceError(
                `[${部件名称}]:` +
                '\n\tNo echart creator was provided.'+
                '\n\tFrom v0.3.0 on, you MUST provide an echart creator '+
                'to this vue component, via its "prop" named "echarts-module-exports-root".'
            )
        }
        this.echartsModuleToUse = echartsModuleToUse
    }

    private $startWatchingIncomingEchartsOptions (): void {
        const { chart } = this
        if (chart && !this.$toUnwatchEchartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEchartsOptions = this.$watch('echartsOptions', (newOptions, oldOptions) => {
                this.refreshEcharts(newOptions !== oldOptions)
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply })
        }
    }

    private $stopWatchingIncomingEchartsOptions (): void {
        const { $toUnwatchEchartsOptions } = this
        if ($toUnwatchEchartsOptions) {
            $toUnwatchEchartsOptions()
            this.$toUnwatchEchartsOptions = null
        }
    }

    private $decideNamesOfAllHandledEchartsEvents (): void {
        let namesOfAllHandledEchartsEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例

        if (this.shouldTransferEcharts4Events) {
            namesOfAllHandledEchartsEvents = SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ALL
        } else {
            namesOfAllHandledEchartsEvents = SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5
        }

        if (!this.shouldTransferEventOfEchartsRendered) {
            namesOfAllHandledEchartsEvents = namesOfAllHandledEchartsEvents.filter(eCharts事件名称 => eCharts事件名称 !== 'rendered')
        }

        this.namesOfAllHandledEchartsEvents = namesOfAllHandledEchartsEvents
    }

    private $rehandleAllEchartsEvents (oldListOfNamesOfHandledEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例): void {
        this.$stopListeningToAllEchartsEvents(oldListOfNamesOfHandledEvents)
        this.$startListeningToAllEchartsEvents()
    }

    private $startListeningToAllEchartsEvents (): void {
        const { chart } = this
        if (!chart) { return }

        this.namesOfAllHandledEchartsEvents.forEach(eventName => {
            chart.on(eventName, (...eChartsEventArguments) => {
                this.$emit(eventName, ...eChartsEventArguments)
            })
        })
    }

    private $stopListeningToAllEchartsEvents (namesOfEventsToStopListeningTo: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例): void {
        const { chart } = this
        if (!chart) { return }

        namesOfEventsToStopListeningTo.forEach(eventName => {
            chart.off(eventName)
        })
    }

    private $rehandleAllZrenderEvents () {
        this.$stopListeningToAllZrenderEvents()
        this.$startListeningToAllZrenderEvents()
    }

    private $startListeningToAllZrenderEvents (): void {
        const { chart } = this
        if (!chart) { return }

        if (this.shouldTransferEventsOfZrender && SUPPORTED_ZRENDER_EVENT_NAMES__RAW.length > 0) {
            const zrenderInstance = chart.getZr()

            if (zrenderInstance) {
                SUPPORTED_ZRENDER_EVENT_NAMES__RAW.forEach(zrenderEventRawName => {
                    zrenderInstance.on(zrenderEventRawName, (...zrenderEventArguments) => {
                        this.$emit(`zrender:${zrenderEventRawName}`, ...zrenderEventArguments)
                    })
                })
            }
        }
    }

    private $stopListeningToAllZrenderEvents (): void {
        const { chart } = this
        if (!chart) { return }

        if (SUPPORTED_ZRENDER_EVENT_NAMES__RAW.length > 0) {
            const zrenderInstance = chart.getZr()

            if (zrenderInstance) {
                /**
                 * 见 zrender 官方文档：
                 *     https://ecomfe.github.io/zrender-doc/public/api.html#zrendereventfuloffevent-handler
                 *
                 * 只是该文档并不详尽。
                 *
                 * -----------------------------------------
                 *
                 * 另见源码：
                 *     https://gitee.com/mirrors_ecomfe/zrender/blob/master/src/core/Eventful.ts#L164
                 * 或
                 *     https://github.com/ecomfe/zrender/blob/master/src/core/Eventful.ts#L164
                 */


                /**
                 * zrender 的源码中的注释这样写道：
                 *
                 * Unbind a event.
                 *
                 * @param eventType The event name.
                 *        If no `event` input, "off" all listeners.
                 * @param handler The event handler.
                 *        If no `handler` input, "off" all listeners of the `event`.
                 */
                zrenderInstance.off()
            }
        }
    }

    private $updateResizingDebouncingInterval (newInterval?: number, eChartInstanceIsJustBuilt?: boolean): void {
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

    private $enableAutoResizing (): void {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            startListeningToElementResizingEvent(el, handler)
        }
    }

    private $disableAutoResizing (): void {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            stopListeningToElementResizingEvent(el, handler)
        }
    }

    private $resize (): void {
        const { chart } = this
        if (chart) {
            chart.resize()
            this.$emitEvent('resized')
        }
    }

    private $createEchartInstance (): void {
        if (this.chart) { return }

        const { echartsModuleToUse } = this

        const newChart = echartsModuleToUse!.init(
            this.$el as HTMLDivElement | HTMLCanvasElement,
            this.echartsTheme,
            this.echartsInitializationOptions
        )

        this.chart = newChart

        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName
        }

        this.refreshEcharts(true)
        this.$startListeningToAllEchartsEvents()
        this.$startListeningToAllZrenderEvents()
        this.$updateResizingDebouncingInterval(this.echartsResizingDebouncingInterval, true)
        this.$emitEvent('echart-instance-created', this.chart)
    }

    private $disposeEchartInstance (): void {
        const { chart } = this
        if (chart) {
            this.$disableAutoResizing()
            // this.$stopListeningToAllEchartsEvents(this.namesOfAllHandledEchartsEvents) // I think the echartsInstance.dispose() will do the job automatically.
            // this.$stopListeningToAllZrenderEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose()
            this.chart = null
            this.$emitEvent('echart-instance-disposed')
        }
    }

    private $recreateEchartInstance (): void {
        this.$disposeEchartInstance()
        this.$createEchartInstance()
    }

    private $dispose (): void { // Deprecated! Use "$disposeEchartInstance" instead.
        this.$disposeEchartInstance()
    }

    private $recreateEChart (): void { // Deprecated! Use "$recreateEchartInstance" instead.
        this.$recreateEchartInstance()
    }

    private $emitEvent (eventName: 范_本部件之原发事件之名称, payload?: any): void {
        if (payload === undefined || payload === null) {
            this.$emit(eventName)
            return
        }

        this.$emit(eventName, payload)
    }





    // --- Vue component life cycle hooks -----------

    private created (): void {
        this.$decideEchartsCreatorToUse()
    }

    private mounted (): void {
        this.$createEchartInstance()
        this.$startWatchingIncomingEchartsOptions()
    }

    private activated (): void {
        // I think we should take this opportunity to auto-resize the echart once.
        this.$resize()

        // if (!this.shouldNotAutoResizeEpcharts) {
        //     this.$resize()
        // }
    }

    private beforeDestroy (): void {
        // this.$stopWatchingIncomingEchartsOptions() // I think Vue will do this itself automatically.
        this.$disposeEchartInstance()
    }
}
</script>
