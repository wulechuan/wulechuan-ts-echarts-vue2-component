import * as tslib_1 from "tslib";
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import debounce from 'lodash.debounce';
import { addListener as startListeningToElementResizingEvent, removeListener as stopListeningToElementResizingEvent, } from 'resize-detector';
import echarts from 'echarts';
var SUPPORTED_ZRENDER_EVENT_TYPES = [
    'click',
    'mousedown',
    'mouseup',
    'mousewheel',
    'dblclick',
    'contextmenu',
];
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
];
var WlcEchartsVueTwoComponent = /** @class */ (function (_super) {
    tslib_1.__extends(WlcEchartsVueTwoComponent, _super);
    function WlcEchartsVueTwoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'wlc-echarts-vue-two-component';
        _this.chart = null;
        _this.echartsGraphic = echarts.graphic;
        _this.$rootElementResizeEventHandler = debounce(_this.$resize.bind(_this), _this.resizingDebouncingInterval, { leading: true });
        _this.$toUnwatchEChartsOptions = null;
        return _this;
    }
    WlcEchartsVueTwoComponent.prototype.render = function (createElement) {
        return createElement('div');
    };
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, "resizingDebouncingInterval", {
        get: function () {
            var echartsResizingDebouncingInterval = this.echartsResizingDebouncingInterval;
            if (echartsResizingDebouncingInterval === undefined) {
                return 200;
            }
            if (echartsResizingDebouncingInterval > 10) {
                return echartsResizingDebouncingInterval;
            }
            return 200;
        },
        enumerable: true,
        configurable: true
    });
    WlcEchartsVueTwoComponent.prototype.onManuallyUpdatingMarkChanged = function (newMark, oldMark) {
        this.stopWatchingIncomingEChartsOptions();
        this.startWatchingIncomingEChartsOptions();
        this.updateECharts(); // Always take this opportunity to update echarts once.
    };
    WlcEchartsVueTwoComponent.prototype.onEChartsOptionsWatchingDepthMarkChanged = function (newMark, oldMark) {
        this.stopWatchingIncomingEChartsOptions();
        this.startWatchingIncomingEChartsOptions();
        this.updateECharts(); // Always take this opportunity to update echarts once.
    };
    WlcEchartsVueTwoComponent.prototype.startWatchingIncomingEChartsOptions = function () {
        var _this = this;
        var chart = this.chart;
        if (chart && !this.$toUnwatchEChartsOptions && !this.shouldManuallyRefreshEcharts) {
            this.$toUnwatchEChartsOptions = this.$watch('echartsOptions', function (newOptions, oldOptions) {
                _this.updateECharts(newOptions !== oldOptions);
            }, { deep: !this.shouldNotWatchEchartsOptionsDeeply });
        }
    };
    WlcEchartsVueTwoComponent.prototype.stopWatchingIncomingEChartsOptions = function () {
        var $toUnwatchEChartsOptions = this.$toUnwatchEChartsOptions;
        if ($toUnwatchEChartsOptions) {
            $toUnwatchEChartsOptions();
            this.$toUnwatchEChartsOptions = null;
        }
    };
    WlcEchartsVueTwoComponent.prototype.onEChartsAutoReszingMarkChanged = function (newMark, oldMark) {
        if (newMark) {
            this.disableAutoResizing();
        }
        else {
            this.enableAutoResizing();
        }
    };
    WlcEchartsVueTwoComponent.prototype.onEChartsThemeChanged = function (newTheme, oldTheme) {
        this.recreateEChart();
    };
    WlcEchartsVueTwoComponent.prototype.onEChartsGroupingNameChanged = function (newGroupingName, oldGroupingName) {
        var chart = this.chart;
        if (chart) {
            chart.group = newGroupingName;
        }
    };
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, "echartWidth", {
        get: function () {
            var chart = this.chart;
            if (!chart) {
                return NaN;
            }
            return chart.getWidth();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, "echartHeight", {
        get: function () {
            var chart = this.chart;
            if (!chart) {
                return NaN;
            }
            return chart.getHeight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, "echartIsDisposed", {
        get: function () {
            var chart = this.chart;
            if (!chart) {
                return false;
            }
            return chart.isDisposed();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WlcEchartsVueTwoComponent.prototype, "echartComputedOptions", {
        get: function () {
            var chart = this.chart;
            if (!chart) {
                return null;
            }
            return chart.getOption();
        },
        enumerable: true,
        configurable: true
    });
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
        var chart = this.chart;
        if (chart) {
            chart.dispatchAction(payload);
        }
    };
    WlcEchartsVueTwoComponent.prototype.resize = function (resizingOptions) {
        var chart = this.chart;
        if (chart) {
            chart.resize(resizingOptions);
        }
    };
    WlcEchartsVueTwoComponent.prototype.convertToPixel = function (finder, value) {
        var chart = this.chart;
        if (!chart) {
            return [];
        }
        return chart.convertToPixel(finder, value);
    };
    WlcEchartsVueTwoComponent.prototype.convertFromPixel = function (finder, value) {
        var chart = this.chart;
        if (!chart) {
            return [];
        }
        return chart.convertFromPixel(finder, value);
    };
    WlcEchartsVueTwoComponent.prototype.containPixel = function (finder, value) {
        var chart = this.chart;
        if (!chart) {
            return false;
        }
        return chart.containPixel(finder, value);
    };
    WlcEchartsVueTwoComponent.prototype.showLoading = function (type, options) {
        var chart = this.chart;
        if (chart) {
            chart.showLoading(type, options);
        }
    };
    WlcEchartsVueTwoComponent.prototype.hideLoading = function () {
        var chart = this.chart;
        if (chart) {
            chart.hideLoading();
        }
    };
    WlcEchartsVueTwoComponent.prototype.getDataURL = function (options) {
        var chart = this.chart;
        if (!chart) {
            return '';
        }
        return chart.getDataURL(options);
    };
    WlcEchartsVueTwoComponent.prototype.getConnectedDataURL = function (options) {
        var chart = this.chart;
        if (!chart) {
            return '';
        }
        return chart.getConnectedDataURL(options);
    };
    WlcEchartsVueTwoComponent.prototype.appendData = function (options) {
        var chart = this.chart;
        if (chart) {
            chart.appendData(options);
        }
    };
    WlcEchartsVueTwoComponent.prototype.clear = function () {
        var chart = this.chart;
        if (chart) {
            chart.clear();
        }
    };
    // --- eCharts instance methods: end ------------
    WlcEchartsVueTwoComponent.prototype.startListeningToAllEChartsEvents = function () {
        var _this = this;
        var chart = this.chart;
        if (!chart) {
            return;
        }
        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(function (eventType) {
            chart.on(eventType, function (eventObject) {
                _this.$emit(eventType, eventObject);
            });
        });
        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            var zrenderInstance_1 = chart.getZr();
            SUPPORTED_ZRENDER_EVENT_TYPES.forEach(function (eventType) {
                zrenderInstance_1.on(eventType, function (eventOpject) {
                    _this.$emit("zrender:" + eventType, eventOpject);
                });
            });
        }
    };
    WlcEchartsVueTwoComponent.prototype.stopListeningToAllEChartsEvents = function () {
        var chart = this.chart;
        if (!chart) {
            return;
        }
        SUPPORTED_ECHARTS_INSTANCE_EVENT_TYPES.forEach(function (eventType) {
            chart.off(eventType);
        });
        if (SUPPORTED_ZRENDER_EVENT_TYPES.length > 0) {
            var zrenderInstance = chart.getZr();
            // https://ecomfe.github.io/zrender-doc/public/api.html#zrendereventfulonevent-handler-context
            // https://github.com/ecomfe/zrender/blob/master/src/mixin/Eventful.js#L75
            zrenderInstance.off();
        }
    };
    WlcEchartsVueTwoComponent.prototype.enableAutoResizing = function () {
        startListeningToElementResizingEvent(this.$el, this.$rootElementResizeEventHandler);
    };
    WlcEchartsVueTwoComponent.prototype.disableAutoResizing = function () {
        stopListeningToElementResizingEvent(this.$el, this.$rootElementResizeEventHandler);
    };
    WlcEchartsVueTwoComponent.prototype.$resize = function () {
        var chart = this.chart;
        if (chart) {
            chart.resize();
        }
    };
    WlcEchartsVueTwoComponent.prototype.createEchartInstance = function () {
        if (this.chart) {
            return;
        }
        var newChart = echarts.init(this.$el, this.echartsTheme, this.echartsInitializationOptions);
        this.chart = newChart;
        if (this.echartsGroupingName) {
            newChart.group = this.echartsGroupingName;
        }
        this.updateECharts(true);
        this.startListeningToAllEChartsEvents();
        if (!this.shouldNotAutoResizeEcharts) {
            this.enableAutoResizing();
        }
    };
    WlcEchartsVueTwoComponent.prototype.updateECharts = function (shouldNotMerge, lazyUpdate) {
        // To update echarts with current "echartsOptions" withing Vue component props.
        // If you set this component to update manually, you invoke this method yourself.
        var _a = this, chart = _a.chart, echartsOptions = _a.echartsOptions;
        if (chart && echartsOptions) {
            chart.setOption(echartsOptions, shouldNotMerge, lazyUpdate);
        }
    };
    WlcEchartsVueTwoComponent.prototype.dispose = function () {
        var chart = this.chart;
        if (chart) {
            this.disableAutoResizing();
            // this.stopListeningToAllEChartsEvents() // I think the echartsInstance.dispose() will do the job automatically.
            chart.dispose();
            this.chart = null;
        }
    };
    WlcEchartsVueTwoComponent.prototype.recreateEChart = function () {
        this.dispose();
        this.createEchartInstance();
    };
    // --- Vue component life cycle hooks -----------
    WlcEchartsVueTwoComponent.prototype.mounted = function () {
        this.createEchartInstance();
        this.startWatchingIncomingEChartsOptions();
    };
    WlcEchartsVueTwoComponent.prototype.activated = function () {
        // I think we should take this opportunity to auto-resize the echart once.
        if (true || !this.shouldNotAutoResizeEcharts) {
            this.$resize();
        }
    };
    WlcEchartsVueTwoComponent.prototype.beforeDestroy = function () {
        // this.stopWatchingIncomingEChartsOptions() // I think Vue will do this itself automatically.
        this.dispose();
    };
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "shouldManuallyRefreshEcharts", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "shouldNotWatchEchartsOptionsDeeply", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "shouldNotAutoResizeEcharts", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "echartsTheme", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "echartsInitializationOptions", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "echartsOptions", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "echartsGroupingName", void 0);
    tslib_1.__decorate([
        Prop()
    ], WlcEchartsVueTwoComponent.prototype, "echartsResizingDebouncingInterval", void 0);
    tslib_1.__decorate([
        Watch('shouldManuallyRefreshEcharts', {})
    ], WlcEchartsVueTwoComponent.prototype, "onManuallyUpdatingMarkChanged", null);
    tslib_1.__decorate([
        Watch('shouldNotWatchEchartsOptionsDeeply', {})
    ], WlcEchartsVueTwoComponent.prototype, "onEChartsOptionsWatchingDepthMarkChanged", null);
    tslib_1.__decorate([
        Watch('shouldNotAutoResizeEcharts', {})
    ], WlcEchartsVueTwoComponent.prototype, "onEChartsAutoReszingMarkChanged", null);
    tslib_1.__decorate([
        Watch('echartsTheme', {})
    ], WlcEchartsVueTwoComponent.prototype, "onEChartsThemeChanged", null);
    tslib_1.__decorate([
        Watch('echartsGroupingName', {})
    ], WlcEchartsVueTwoComponent.prototype, "onEChartsGroupingNameChanged", null);
    WlcEchartsVueTwoComponent = tslib_1.__decorate([
        Component({})
    ], WlcEchartsVueTwoComponent);
    return WlcEchartsVueTwoComponent;
}(Vue));
export default WlcEchartsVueTwoComponent;
//# sourceMappingURL=index.js.map