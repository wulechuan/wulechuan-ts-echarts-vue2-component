import { __decorate, __extends } from 'tslib'
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import debounce from 'lodash.debounce'
import { addListener as startListeningToElementResizingEvent, removeListener as stopListeningToElementResizingEvent } from 'resize-detector'
import echarts from 'echarts/lib/echarts'
var ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL = 200
var SUPPORTED_ZRENDER_EVENT_TYPES = [
    'click',
    'mousedown',
    'mouseup',
    'mousewheel',
    'dblclick',
    'contextmenu',
]
var SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES = [
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
var WlcEchartsVueTwoComponent = /** @class */ (function (_super) {
    __extends(WlcEchartsVueTwoComponent, _super)
    function WlcEchartsVueTwoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this
        _this.name = 'wlc-echarts-vue-two-component'
        _this.chart = null
        _this.echartsGraphic = echarts.graphic
        _this.$oldResizingDebouncingInterval = NaN
        _this.$rootElementResizeEventHandler = null
        _this.$toUnwatchEChartsOptions = null
        return _this
    }
    WlcEchartsVueTwoComponent.prototype.render = function (createElement) {
        return createElement('div')
    }
    WlcEchartsVueTwoComponent.prototype.$onResizingDebouncingIntervalChanged = function (newInterval, oldInterval) {
        this.$updateResizingDebouncingInterval(newInterval)
    }
    WlcEchartsVueTwoComponent.prototype.$onManuallyRefreshingMarkChanged = function (newMark, oldMark) {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }
    WlcEchartsVueTwoComponent.prototype.$onEChartsOptionsWatchingDepthMarkChanged = function (newMark, oldMark) {
        this.$stopWatchingIncomingEChartsOptions()
        this.$startWatchingIncomingEChartsOptions()
        this.refreshECharts() // Always take this opportunity to refresh echarts once.
    }
    WlcEchartsVueTwoComponent.prototype.$onEChartsAutoReszingMarkChanged = function (newMark, oldMark) {
        if (newMark) {
            this.$disableAutoResizing()
        }
        else {
            this.$enableAutoResizing()
        }
    }
    WlcEchartsVueTwoComponent.prototype.$onEChartsThemeChanged = function (newTheme, oldTheme) {
        this.$recreateEChart()
    }
    WlcEchartsVueTwoComponent.prototype.onEChartsGroupingNameChanged = function (newGroupingName, oldGroupingName) {
        var {chart} = this
        if (chart) {
            chart.group = newGroupingName
        }
    }
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, 'echartWidth', {
        get: function () {
            var {chart} = this
            if (!chart) {
                return NaN
            }
            return chart.getWidth()
        },
        enumerable: true,
        configurable: true,
    })
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, 'echartHeight', {
        get: function () {
            var {chart} = this
            if (!chart) {
                return NaN
            }
            return chart.getHeight()
        },
        enumerable: true,
        configurable: true,
    })
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, 'echartIsDisposed', {
        get: function () {
            var {chart} = this
            if (!chart) {
                return false
            }
            return chart.isDisposed()
        },
        enumerable: true,
        configurable: true,
    })
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, 'echartComputedOptions', {
        get: function () {
            var {chart} = this
            if (!chart) {
                return null
            }
            return chart.getOption()
        },
        enumerable: true,
        configurable: true,
    })
    WlcEchartsVueTwoComponent.prototype.updateECharts = function (shouldNotMerge, lazyUpdate) {
        console.warn('The "updateECharts" method is a deprecated alias of "refreshECharts". So use "refreshECharts" instead.')
        this.refreshECharts(shouldNotMerge, lazyUpdate)
    }
    WlcEchartsVueTwoComponent.prototype.refreshECharts = function (shouldNotMerge, lazyUpdate) {
        // To update echarts with current "echartsOptions" withing Vue component props.
        // If you set this component to update manually, you invoke this method yourself.
        var _a = this, {chart} = _a, {echartsOptions} = _a
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
    WlcEchartsVueTwoComponent.prototype.dispatchAction = function (payload) {
        var {chart} = this
        if (chart) {
            chart.dispatchAction(payload)
        }
    }
    WlcEchartsVueTwoComponent.prototype.resize = function (resizingOptions) {
        var {chart} = this
        if (chart) {
            chart.resize(resizingOptions)
        }
    }
    WlcEchartsVueTwoComponent.prototype.convertToPixel = function (finder, value) {
        var {chart} = this
        if (!chart) {
            return []
        }
        return chart.convertToPixel(finder, value)
    }
    WlcEchartsVueTwoComponent.prototype.convertFromPixel = function (finder, value) {
        var {chart} = this
        if (!chart) {
            return []
        }
        return chart.convertFromPixel(finder, value)
    }
    WlcEchartsVueTwoComponent.prototype.containPixel = function (finder, value) {
        var {chart} = this
        if (!chart) {
            return false
        }
        return chart.containPixel(finder, value)
    }
    WlcEchartsVueTwoComponent.prototype.showLoading = function (type, options) {
        var {chart} = this
        if (chart) {
            chart.showLoading(type, options)
        }
    }
    WlcEchartsVueTwoComponent.prototype.hideLoading = function () {
        var {chart} = this
        if (chart) {
            chart.hideLoading()
        }
    }
    WlcEchartsVueTwoComponent.prototype.getDataURL = function (options) {
        var {chart} = this
        if (!chart) {
            return ''
        }
        return chart.getDataURL(options)
    }
    WlcEchartsVueTwoComponent.prototype.getConnectedDataURL = function (options) {
        var {chart} = this
        if (!chart) {
            return ''
        }
        return chart.getConnectedDataURL(options)
    }
    WlcEchartsVueTwoComponent.prototype.appendData = function (options) {
        var {chart} = this
        if (chart) {
            chart.appendData(options)
        }
    }
    WlcEchartsVueTwoComponent.prototype.clear = function () {
        var {chart} = this
        if (chart) {
            chart.clear()
        }
    }
    // --- eCharts instance methods: end ------------
    WlcEchartsVueTwoComponent.prototype.$startWatchingIncomingEChartsOptions = function () {
        var _this = this
        var {chart} = this
        if (chart && !this.$toUnwatchEChartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEChartsOptions = this.$watch('echartsOptions', function (newOptions, oldOptions) {
                _this.refreshECharts(newOptions !== oldOptions)
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply })
        }
    }
    WlcEchartsVueTwoComponent.prototype.$stopWatchingIncomingEChartsOptions = function () {
        var {$toUnwatchEChartsOptions} = this
        if ($toUnwatchEChartsOptions) {
            $toUnwatchEChartsOptions()
            this.$toUnwatchEChartsOptions = null
        }
    }
    WlcEchartsVueTwoComponent.prototype.$startListeningToAllEChartsEvents = function () {
        var _this = this
        var {chart} = this
        if (!chart) {
            return
        }
        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(function (eventType) {
            chart.on(eventType, function (eventObject) {
                _this.$emit(eventType, eventObject)
            })
        })
        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            var zrenderInstance_1 = chart.getZr()
            SUPPORTED_ZRENDER_EVENT_TYPES.forEach(function (eventType) {
                zrenderInstance_1.on(eventType, function (eventOpject) {
                    _this.$emit('zrender:' + eventType, eventOpject)
                })
            })
        }
    }
    WlcEchartsVueTwoComponent.prototype.$stopListeningToAllEChartsEvents = function () {
        var {chart} = this
        if (!chart) {
            return
        }
        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(function (eventType) {
            chart.off(eventType)
        })
        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            var zrenderInstance = chart.getZr()
            // https://ecomfe.github.io/zrender-doc/public/api.html#zrendereventfulonevent-handler-context
            // https://github.com/ecomfe/zrender/blob/master/src/mixin/Eventful.js#L75
            zrenderInstance.off()
        }
    }
    WlcEchartsVueTwoComponent.prototype.$updateResizingDebouncingInterval = function (newInterval, eChartInstanceIsJustBuilt) {
        var decidedInterval = ECHARTS_RESIZING_DEBOUNCING_DEFAULT_INTERVAL
        if (newInterval && newInterval >= 10) {
            decidedInterval = +newInterval // In case the newInterval is a string, like '120'.
        }
        if (decidedInterval === this.$oldResizingDebouncingInterval && !eChartInstanceIsJustBuilt) {
            return
        }
        this.$disableAutoResizing()
        this.$rootElementResizeEventHandler = null
        if (!this.shouldNotAutoResizeEcharts) {
            var newHandler = debounce(this.$resize.bind(this), decidedInterval, { leading: true })
            if (typeof newHandler == 'function') {
                this.$rootElementResizeEventHandler = newHandler
                this.$enableAutoResizing()
                this.$oldResizingDebouncingInterval = decidedInterval
            }
        }
    }
    WlcEchartsVueTwoComponent.prototype.$enableAutoResizing = function () {
        var el = this.$el
        var handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            startListeningToElementResizingEvent(el, handler)
        }
    }
    WlcEchartsVueTwoComponent.prototype.$disableAutoResizing = function () {
        var el = this.$el
        var handler = this.$rootElementResizeEventHandler
        if (el instanceof HTMLElement && typeof handler === 'function') {
            stopListeningToElementResizingEvent(el, handler)
        }
    }
    WlcEchartsVueTwoComponent.prototype.$resize = function () {
        var {chart} = this
        if (chart) {
            chart.resize()
        }
    }
    WlcEchartsVueTwoComponent.prototype.$createEchartInstance = function () {
        if (this.chart) {
            return
        }
        var newChart = echarts.init(this.$el, this.echartsTheme, this.echartsInitializationOptions)
        this.chart = newChart
        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName
        }
        this.refreshECharts(true)
        this.$startListeningToAllEChartsEvents()
        this.$updateResizingDebouncingInterval(this.echartsResizingDebouncingInterval, true)
    }
    WlcEchartsVueTwoComponent.prototype.$dispose = function () {
        var {chart} = this
        if (chart) {
            this.$disableAutoResizing()
            // this.$stopListeningToAllEChartsEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose()
            this.chart = null
        }
    }
    WlcEchartsVueTwoComponent.prototype.$recreateEChart = function () {
        this.$dispose()
        this.$createEchartInstance()
    }
    // --- Vue component life cycle hooks -----------
    WlcEchartsVueTwoComponent.prototype.mounted = function () {
        this.$createEchartInstance()
        this.$startWatchingIncomingEChartsOptions()
    }
    WlcEchartsVueTwoComponent.prototype.activated = function () {
        // I think we should take this opportunity to auto-resize the echart once.
        this.$resize()
        // if (!this.shouldNotAutoResizeEcharts) {
        //     this.$resize()
        // }
    }
    WlcEchartsVueTwoComponent.prototype.beforeDestroy = function () {
        // this.$stopWatchingIncomingEChartsOptions() // I think Vue will do this itself automatically.
        this.$dispose()
    }
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
    return WlcEchartsVueTwoComponent
}(Vue))
export default WlcEchartsVueTwoComponent
//# sourceMappingURL=module.jsx.map