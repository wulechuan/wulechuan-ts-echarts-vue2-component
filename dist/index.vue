<script source-language-was="ts">
import { __decorate } from 'tslib'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import debounce from 'lodash.debounce'
import { addListener as startListeningToElementResizingEvent, removeListener as stopListeningToElementResizingEvent } from 'resize-detector'
const ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL = 200
const SUPPORTED_ZRENDER_EVENT_TYPES = [
    'click',
    'mousedown',
    'mouseup',
    'mousewheel',
    'dblclick',
    'contextmenu',
]
const SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES = [
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
let WlcEchartsVueTwoComponent = class WlcEchartsVueTwoComponent extends Vue {
    constructor() {
        super(...arguments)
        this.name = 'wlc-echarts-vue-two-component'
        this.chart = null
        this.echartsCreatorToUse = null
        this.$oldResizingDebouncingInterval = NaN
        this.$rootElementResizeEventHandler = null
        this.$toUnwatchEChartsOptions = null
    }
    render(createElement) {
        return createElement('div')
    }
    $onResizingDebouncingIntervalChanged(newInterval, oldInterval) {
        this.$updateResizingDebouncingInterval(newInterval)
    }
    $onManuallyRefreshingMarkChanged(newMark, oldMark) {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }
    $onEChartsOptionsWatchingDepthMarkChanged(newMark, oldMark) {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }
    $onEChartsAutoReszingMarkChanged(newMark, oldMark) {
        if (newMark) {
            this.$disableAutoResizing()
        }
        else {
            this.$enableAutoResizing()
        }
    }
    $onEChartsThemeChanged(newTheme, oldTheme) {
        this.$recreateEChartInstance()
    }
    onEChartsGroupingNameChanged(newGroupingName, oldGroupingName) {
        const { chart } = this
        if (chart) {
            chart.group = newGroupingName
        }
    }
    get echartWidth() {
        const { chart } = this
        if (!chart) {
            return NaN
        }
        return chart.getWidth()
    }
    get echartHeight() {
        const { chart } = this
        if (!chart) {
            return NaN
        }
        return chart.getHeight()
    }
    get echartIsDisposed() {
        const { chart } = this
        if (!chart) {
            return false
        }
        return chart.isDisposed()
    }
    get echartComputedOptions() {
        const { chart } = this
        if (!chart) {
            return null
        }
        return chart.getOption()
    }
    updateECharts(shouldNotMerge, lazyUpdate) {
        console.warn('The "updateECharts" method is a deprecated alias of "refreshECharts". So use "refreshECharts" instead.')
        this.refreshECharts(shouldNotMerge, lazyUpdate)
    }
    refreshECharts(shouldNotMerge, lazyUpdate) {
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
    dispatchAction(payload) {
        const { chart } = this
        if (chart) {
            chart.dispatchAction(payload)
        }
    }
    resize(resizingOptions) {
        const { chart } = this
        if (chart) {
            chart.resize(resizingOptions)
        }
    }
    convertToPixel(finder, value) {
        const { chart } = this
        if (!chart) {
            return []
        }
        return chart.convertToPixel(finder, value)
    }
    convertFromPixel(finder, value) {
        const { chart } = this
        if (!chart) {
            return []
        }
        return chart.convertFromPixel(finder, value)
    }
    containPixel(finder, value) {
        const { chart } = this
        if (!chart) {
            return false
        }
        return chart.containPixel(finder, value)
    }
    showLoading(type, options) {
        const { chart } = this
        if (chart) {
            chart.showLoading(type, options)
        }
    }
    hideLoading() {
        const { chart } = this
        if (chart) {
            chart.hideLoading()
        }
    }
    getDataURL(options) {
        const { chart } = this
        if (!chart) {
            return ''
        }
        return chart.getDataURL(options)
    }
    getConnectedDataURL(options) {
        const { chart } = this
        if (!chart) {
            return ''
        }
        return chart.getConnectedDataURL(options)
    }
    appendData(options) {
        const { chart } = this
        if (chart) {
            chart.appendData(options)
        }
    }
    clear() {
        const { chart } = this
        if (chart) {
            chart.clear()
        }
    }
    // --- eCharts instance methods: end ------------
    $decideEchartsCreatorToUse() {
        const providedEchartsCreator = this.echartsCreator
        let echartsCreatorToUse
        if (providedEchartsCreator) {
            echartsCreatorToUse = providedEchartsCreator
        }
        else {
            throw new ReferenceError('[wlc-echarts-vue-two-component]:' +
                '\n\tNo echart creator was provided.' +
                '\n\tFrom v0.3.0 on, you MUST provide an echart creator ' +
                'to this vue component, via its "prop" named "echarts-creator".')
        }
        this.echartsCreatorToUse = echartsCreatorToUse
    }
    $startWatchingIncomingEChartsOptions() {
        const { chart } = this
        if (chart && !this.$toUnwatchEChartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEChartsOptions = this.$watch('echartsOptions', (newOptions, oldOptions) => {
                this.refreshECharts(newOptions !== oldOptions)
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply })
        }
    }
    $stopWatchingIncomingEChartsOptions() {
        const { $toUnwatchEChartsOptions } = this
        if ($toUnwatchEChartsOptions) {
            $toUnwatchEChartsOptions()
            this.$toUnwatchEChartsOptions = null
        }
    }
    $startListeningToAllEChartsEvents() {
        const { chart } = this
        if (!chart) {
            return
        }
        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(eventType => {
            chart.on(eventType, (eventObject) => {
                this.$emit(eventType, eventObject)
            })
        })
        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            const zrenderInstance = chart.getZr()
            SUPPORTED_ZRENDER_EVENT_TYPES.forEach(eventType => {
                zrenderInstance.on(eventType, (eventOpject) => {
                    this.$emit(`zrender:${eventType}`, eventOpject)
                })
            })
        }
    }
    $stopListeningToAllEChartsEvents() {
        const { chart } = this
        if (!chart) {
            return
        }
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
    $updateResizingDebouncingInterval(newInterval, eChartInstanceIsJustBuilt) {
        let decidedInterval = ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL
        if (newInterval && newInterval >= 10) {
            decidedInterval = +newInterval // In case the newInterval is a string, like '120'.
        }
        if (decidedInterval === this.$oldResizingDebouncingInterval && !eChartInstanceIsJustBuilt) {
            return
        }
        this.$disableAutoResizing()
        this.$rootElementResizeEventHandler = null
        if (!this.shouldNotAutoResizeEcharts) {
            const newHandler = debounce(this.$resize.bind(this), decidedInterval, { leading: true })
            if (typeof newHandler == 'function') {
                this.$rootElementResizeEventHandler = newHandler
                this.$enableAutoResizing()
                this.$oldResizingDebouncingInterval = decidedInterval
            }
        }
    }
    $enableAutoResizing() {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            startListeningToElementResizingEvent(el, handler)
        }
    }
    $disableAutoResizing() {
        const el = this.$el
        const handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            stopListeningToElementResizingEvent(el, handler)
        }
    }
    $resize() {
        const { chart } = this
        if (chart) {
            chart.resize()
        }
    }
    $createEchartInstance() {
        if (this.chart) {
            return
        }
        const { echartsCreatorToUse } = this
        const newChart = echartsCreatorToUse.init(this.$el, this.echartsTheme, this.echartsInitializationOptions)
        this.chart = newChart
        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName
        }
        this.refreshECharts(true)
        this.$startListeningToAllEChartsEvents()
        this.$updateResizingDebouncingInterval(this.echartsResizingDebouncingInterval, true)
    }
    $disposeEchartInstance() {
        const { chart } = this
        if (chart) {
            this.$disableAutoResizing()
            // this.$stopListeningToAllEChartsEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose()
            this.chart = null
        }
    }
    $recreateEChartInstance() {
        this.$disposeEchartInstance()
        this.$createEchartInstance()
    }
    $dispose() {
        this.$disposeEchartInstance()
    }
    $recreateEChart() {
        this.$recreateEChartInstance()
    }
    // --- Vue component life cycle hooks -----------
    created() {
        this.$decideEchartsCreatorToUse()
    }
    mounted() {
        this.$createEchartInstance()
        this.$startWatchingIncomingEChartsOptions()
    }
    activated() {
        // I think we should take this opportunity to auto-resize the echart once.
        this.$resize()
        // if (!this.shouldNotAutoResizeEcharts) {
        //     this.$resize()
        // }
    }
    beforeDestroy() {
        // this.$stopWatchingIncomingEChartsOptions() // I think Vue will do this itself automatically.
        this.$disposeEchartInstance()
    }
}
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsCreator', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'shouldManuallyRefreshEcharts', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'shouldNotWatchEchartsOptionsDeeply', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'shouldNotAutoResizeEcharts', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsTheme', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsInitializationOptions', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsOptions', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsGroupingName', void 0)
__decorate([
    Prop(),
], WlcEchartsVueTwoComponent.prototype, 'echartsResizingDebouncingInterval', void 0)
__decorate([
    Watch('echartsResizingDebouncingInterval', {}),
], WlcEchartsVueTwoComponent.prototype, '$onResizingDebouncingIntervalChanged', null)
__decorate([
    Watch('shouldManuallyRefreshEcharts', {}),
], WlcEchartsVueTwoComponent.prototype, '$onManuallyRefreshingMarkChanged', null)
__decorate([
    Watch('shouldNotWatchEchartsOptionsDeeply', {}),
], WlcEchartsVueTwoComponent.prototype, '$onEChartsOptionsWatchingDepthMarkChanged', null)
__decorate([
    Watch('shouldNotAutoResizeEcharts', {}),
], WlcEchartsVueTwoComponent.prototype, '$onEChartsAutoReszingMarkChanged', null)
__decorate([
    Watch('echartsTheme', {}),
], WlcEchartsVueTwoComponent.prototype, '$onEChartsThemeChanged', null)
__decorate([
    Watch('echartsGroupingName', {}),
], WlcEchartsVueTwoComponent.prototype, 'onEChartsGroupingNameChanged', null)
WlcEchartsVueTwoComponent = __decorate([
    Component({}),
], WlcEchartsVueTwoComponent)
export default WlcEchartsVueTwoComponent
//# sourceMappingURL=module.js.map
</script>
