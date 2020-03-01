# Wulechuan's ECharts component of Vuejs 2.x plus TypeScript

<link rel="stylesheet" href="./documents/styles/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- 《[本文之简体中文版](./ReadMe.md)》




## NPM Page

<dl>
<dt>NPM Package Name</dt>
<dd>

[@wulechuan/echarts-vue2-component](https://www.npmjs.com/package/@wulechuan/echarts-vue2-component)

</dd>
<dt>Author</dt>
<dd><p>wulechuan (南昌吴乐川)</p></dd>
</dl>





## Introduction

This package is heavly inspired by the long existing one, named "[vue-echarts](https://github.com/ecomfe/vue-echarts/)". While vue-echarts does not support TypeScript. Thus this package is made.


## Usage

### For TypeScript Developers

See the example below.

Also see [demos/demo-of-typescript](./demos/demo-of-typescript).

```html
<template>
    <vue-echarts :echarts-options="myEchartsOptions"></vue-echarts>
</template>
```

> Note that when working with TypeScript, for the `import` statement of this package, the `from` part points to the npm package name of its, aka the `main` file metioned in the `package.json`. To be specific, the main file is in fact `./index.ts`.

```ts
import Vue from 'vue'
import VueEcharts from '@wulechuan/echarts-vue2-component'

export default class MyComponent extends Vue {
    components = {
        'vue-echarts': VueEcharts
    }

    myEchartsOptions = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
        }],
    }
}
```


### For JavaScript (ECMAScript) Developers

See the example below.

Also see [demos/demo-of-javascript](./demos/demo-of-javascript).


```html
<template>
    <vue-echarts :echarts-options="myEchartsOptions"></vue-echarts>
</template>
```

> Note that when working with JavaScript(ECMAScript), for the `import` statement, the `from` part points to `.../dist`, which is in fact `.../dist/index.js`.

```js
import Vue from 'vue'
import EChartsVue2Component from '@wulechuan/echarts-vue2-component/dist'
export default {
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
            myEchartsOptions: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                }],
            },
        }
    },
}
```


---


## API

### Vuejs Component Props

#### Prop `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean;
```

The kebab format is `should-manually-refresh-echarts`.

The default value is `undefined`, which means `false`.

若取 `true`，则即使该 Vuejs 2.x 组件之输入之 `echartsOptions` 有所变化，组件内部的 eCharts 实例亦不会重绘，而是等待组件外部代码“人为”调用本组件实例的 `updateECharts` 方法。



#### Prop `shouldNotWatchEchartsOptionsDeeply`

```ts
shouldNotWatchEchartsOptionsDeeply?: boolean;
```

The kebab format is `should-not-watch-echarts-options-deeply`.

The default value is `undefined`, which means `false`.



#### Prop `shouldNotAutoResizeEcharts`

```ts
shouldNotAutoResizeEcharts?: boolean;
```

The kebab format is `should-not-auto-resize-echarts`.

The default value is `undefined`, which means `false`.

当 eCharts 之容器 DOM 的尺寸变化时，如果允许（默认即允许）eCharts 自动重绘，使得 eCharts 的画面总是自动充满其容器，既不被裁剪，也不留有多余的空白。允许自动重绘与否，取决于该 Prop 参数（指 `shouldNotAutoResizeEchart` ），其取`falsy` 值，则代表允许 eCharts 在容器尺寸变更时自动重绘；反之。



#### Prop `echartsInitializationOptions`

```ts
echartsInitializationOptions?: EchartsInitializationOptions;
```

The kebab format is `echarts-initialization-options`.

The default value is `undefined`.

See [the related part in the official documentations](https://www.echartsjs.com/en/api.html#echarts.init).




#### Prop `echartsOptions`

```ts
echartsOptions?: EChartOption;
```

The kebab format is `echarts-options`.

The default value is `undefined`.

See [the related part in the official documentations](https://www.echartsjs.com/en/option.html).




#### Prop `echartsGroupingName`

```ts
echartsGroupingName?: string;
```

The kebab format is `echarts-grouping-name`.

The default value is `undefined`.

See [the related part in the official documentations](https://www.echartsjs.com/en/api.html#echartsInstance.group).



#### Prop `echartsResizingDebouncingInterval`

```ts
echartsResizingDebouncingInterval?: number;
```

The kebab format is `echarts-resizing-debouncing-interval`.

Unit in milliseconds, not allow to be lower than `10`. The default value is `200`.

当 eCharts 在其容器横纵尺寸变化时，可能自动重绘。重绘与否取决于名为 `shouldNotAutoResizeEchart` 的 Prop 参数（见上文）。

如果用户正在交互式的动态改变 eCharts 容器的尺寸，那么毫无疑问，eCharts 须在交互过程中反复重绘多次，以使得 eCharts 是在视觉上尺寸总是瞬时跟随容器变化。然而，反复重绘 eCharts 的代价可能很大，于是本组件借助 `lodash.debounce` 来“减缓” eCharts 重绘的步调。该参数（指`echartsResizingDebouncingInterval`）即是 `debounce` 触发重绘动作之时间间隔，单位是毫秒。



#### Prop `echartsTheme`

```ts
echartsTheme?: EChartsTheme;
```

The kebab format is `echarts-theme`.

The default value is `undefined`。

the name string of a registered eCharts theme, or an object that represents an eCharts theme definition.

References:

- [预先设计好一个主题对象，并向 eCharts 注册该主题对象之名称](https://echarts.apache.org/en/api.html#echarts.registerThemee)。
- [The Official Theme Builder App](https://echarts.baidu.com/theme-builder/)。




### 数据属性（即 Vuejs 组件实例的 `data`）

#### data: `name`

```ts
readonly name: string = 'wlc-echarts-vue-two-component';
```

The name of this Vuejs component class.




#### data: `chart`

```ts
chart: ECharts | null = null;
```

The eChart instance object, or `null`.





### data: `echartsGraphic`

The static property, named `graphic`, of the echarts constructor.

See [the related part in the official documentations](https://www.echartsjs.com/en/api.html#echarts.graphic).

```ts
import echarts from 'echarts'

// ......
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

    echartsGraphic = echarts.graphic

    // ......
}
```


### Getters

```ts
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

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

    // ......
}
```



### Methods

#### Method: `updateECharts`

```ts
updateECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void;
```

强制 eCharts 实例重绘一次。

#### Method: `enableAutoResizing`

```ts
enableAutoResizing(): void
```

#### Method: `disableAutoResizing`

```ts
disableAutoResizing(): void
```

#### Method: `dispose`

```ts
dispose(): void
```



### Mapped Methods from eChart Instance

Each method below, of a given instance of this Vuejs component, is mapped from a method of the eChart instance the Vuejs component holds. Mapped method names are identical to their source methods'.

```ts
function dispatchAction(payload: object): void
```

```ts
function resize(resizingOptions?: EChartsResizeOption): void
```

```ts
function convertToPixel(finder: EChartsConvertFinder, value: string | any[]): string | any[]
```

```ts
function convertFromPixel(finder: EChartsConvertFinder, value: any[] | string) : any[] | string
```

```ts
function containPixel(finder: EChartsConvertFinder, value: any[]): boolean
```

```ts
function showLoading(type?: string, options?: EChartsLoadingOption): void
```

```ts
function hideLoading(): void
```

```ts
function getDataURL(options: {
    type?: string,
    pixelRatio?: number,
    backgroundColor?: string,
    excludeComponents?: string[]
}): string
```

```ts
function getConnectedDataURL(options: {
    type: string,
    pixelRatio: number,
    backgroundColor: string,
    excludeComponents?: string[]
}): string
```

```ts
function appendData(options: {
    seriesIndex?: string,
    data?: any[] | TypedArray,
}): void
```

```ts
clear(): void
```





---

## TODOs

Nothing at present.



---

## License

WTFPL

> NOTE:
>
> I'm not an expert about license types. So I temporarily use WTFPL. But I guess this type of license might conflict with the ones used by those npm packages I'm utilizing.

