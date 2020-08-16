# Wulechuan's ECharts component of Vuejs 2.x plus TypeScript

<link rel="stylesheet" href="../node_modules/@wulechuan/css-stylus-markdown-themes/dist/css/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- 《[本文之简体中文版](../ReadMe.md)》




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

This component is heavly inspired by the long existing component written by someone else, named "[vue-echarts](https://github.com/ecomfe/vue-echarts/)". While that `vue-echarts` does not support TypeScript. Thus this component is made.


## Usage

### For TypeScript Developers

See the example below.

See [demos/demo-of-typescript](./demos/demo-of-typescript/) also.

```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></vue-echarts>
</template>
```

> Note that **this component carries no CSS**, nor any CSS class names. While an eCharts instance requires its container DOM to have specific width and height. So you need to setup the size of the container, aka the root element of this component, yourself. As shown the example here, I setup the width and height with the help of the CSS class name "my-echarts".

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
    }
</style>
```


> Note that when working with TypeScript, for the `import` statement of this package, the `from` part points to the npm package name of its, aka the `main` file metioned in the `package.json`. To be specific, the main file is in fact `./index.ts`.

```ts
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component'

/**
 * As of v0.3.0-beta7, this component no longer includes the echarts itself.
 * So, any program that utilizes this component, must not only import this component,
 * but also import the echarts. And the echarts default export,
 * which is the factory function of eCharts instances,
 * must set to the `echartsCreator` prop of this component of mine.
 */

// By the way, to minimize the codes get imported,
// I suggest one to import echarts code as shown by the 2 lines below.
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

@Component({
    components: {
        'vue-echarts': EChartsVue2Component,
    },
})
export default class PageWithAnEchart extends Vue {
    echartsCreator = echarts
    echartsOptions = {
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

See [demos/demo-of-javascript](./demos/demo-of-javascript/) also.


```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></vue-echarts>
</template>
```

> Note that this component carries **no** CSS, nor any CSS class names. While an eCharts instance requires its container DOM to have specific width and height. So you need to setup the size of the container, aka the root element of this component, yourself. As shown the example here, I setup the width and height with the help of the CSS class name "my-echarts".

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
    }
</style>
```

> Note that when working with JavaScript(ECMAScript), for the `import` statement, the `from` part points to `./dist`, which is in fact `./dist/index.js`.

```js
import Vue from 'vue'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component/dist/index.vue'

/**
 * As of v0.3.0-beta7, this component no longer includes the echarts itself.
 * So, any program that utilizes this component, must not only import this component,
 * but also import the echarts. And the echarts default export,
 * which is the factory function of eCharts instances,
 * must set to the `echartsCreator` prop of this component of mine.
 */

// By the way, to minimize the codes get imported,
// I suggest one to import echarts code as shown by the 2 lines below.
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

export default {
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
            echartsCreator: echarts,
            echartsOptions: {
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

### A Full Example as a Quick Reference

```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creator="TheOfficialFactoryFunctionOfEcharts"
        :echarts-options="YourEchartsOptionsHere"
        :should-manually-refresh-echarts="false"
        :should-not-watch-echarts-options-deeply="false"
        :should-not-auto-resize-echarts="false"
        :echarts-theme="YourEchartsThemeNameStringOrThemeDefinitionObject"
        :echarts-initialization-options="null"
        :echarts-grouping-name="theGroupingNameOfThisInstanceOfEcharts"
        :echarts-resizing-debouncing-interval="200"
    ></vue-echarts>
</template>
```

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
    }
</style>
```


### Vuejs Component `Props`

#### Prop `echartsCreator`

```ts
echartsCreator: Function;
```

The kebab format is `echarts-creator`.

As of v0.3.0-beta7, this component no longer includes the `echarts` itself.
So, any program that utilizes this component, must not only import this component,
but also import the `echarts`. And the `echarts` default export,
which is the factory function of echarts instances,
must set to the `echartsCreator` prop of this component of mine.

This prop is a required one. Thus has no default value.



#### Prop `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean;
```

The kebab format is `should-manually-refresh-echarts`.

The default value is `undefined`, which means `false`.



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




#### Prop `echartsTheme`

```ts
echartsTheme?: EChartsTheme;
```

The kebab format is `echarts-theme`.

The default value is `undefined`。

the name string of a registered eCharts theme, or an object that represents an eCharts theme definition.

References:

- [To design a theme in an object, and then register the theme object with a name, to eCharts.](https://echarts.apache.org/en/api.html#echarts.registerThemee)。
- [The Official Theme Builder App](https://echarts.baidu.com/theme-builder/)。




### The `data`

#### data: `name`

```ts
public readonly name: string = 'wlc-echarts-vue-two-component';
```

The name of this Vuejs component class.




#### data: `chart`

```ts
public chart: ECharts | null = null;
```

The eChart instance object, or `null`.





### data: `echartsGraphic`

The static property, named `graphic`, of the echarts constructor.

See [the related part in the official documentations](https://www.echartsjs.com/en/api.html#echarts.graphic).

The related snippet in the source code:

```ts
import echarts from 'echarts'

// ......
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

    public echartsGraphic = echarts.graphic

    // ......
}
```


### Getters (aka `computed` properties)

The related snippet in the source code:


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

#### Method: `refreshECharts`

```ts
refreshECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void;
```

Force the eCharts instance to re-draw its content once.



#### Method: `updateECharts` (DEPRECATED)

> This is an alias of the `refreshECharts` method. And it's deprecated. So please turn to use `refreshECharts` instead.

```ts
updateECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void;
```

Force the eCharts instance to re-draw its content once.







### Methods Treated as Private Onces

These methods below do exist, but are **not** recommended to invoke.

#### Method: `$startListeningToAllEChartsEvents`

```ts
$startListeningToAllEChartsEvents(): void
```




#### Method: `$stopListeningToAllEChartsEvents`

```ts
$stopListeningToAllEChartsEvents(): void
```




#### Method: `$updateResizingDebouncingInterval`

```ts
$updateResizingDebouncingInterval(newInterval?: number): void
```




#### Method: `$enableAutoResizing`

> Note that in v0.1.0, this method was named `enableAutoResizing`. As of v0.2.0, this method has renamed to `$enableAutoResizing`, and the old name is no longer available.

```ts
$enableAutoResizing(): void
```



#### Method: `disableAutoResizing`

> Note that in v0.1.0, this method was named `disableAutoResizing`. As of v0.2.0, this method has renamed to `$disableAutoResizing`, and the old name is no longer available.


```ts
$disableAutoResizing(): void
```




#### Method: `$resize`

```ts
$resize(): void
```




#### Method: `$createEchartInstance`

```ts
$createEchartInstance(): void
```




#### Method: `$dispose`

> Note that in v0.1.0, this method was named `dispose`. As of v0.2.0, this method has renamed to `$dispose`, and the old name is no longer available.

```ts
$dispose(): void
```




#### Method: `$recreateEChart`

```ts
$recreateEChart(): void
```





### Mapped Methods from eChart Instance

Each method below, of a given instance of this Vuejs component, is mapped from a method of the eChart instance the Vuejs component holds. Mapped method names are identical to their source methods'.

```ts
function dispatchAction(payload: object): void
```

```ts
function resize(
    resizingOptions?: EChartsResizeOption
): void
```

```ts
function convertToPixel(
    finder: EChartsConvertFinder,
    value: string | any[]
): string | any[]
```

```ts
function convertFromPixel(
    finder: EChartsConvertFinder,
    value: any[] | string
) : any[] | string
```

```ts
function containPixel(
    finder: EChartsConvertFinder,
    value: any[]
): boolean
```

```ts
function showLoading(
    type?: string,
    options?: EChartsLoadingOption
): void
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

