# Wulechuan's ECharts component of Vuejs 2.x plus TypeScript

<link rel="stylesheet" href="../..//node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- 《[本文之简体中文版](../../ReadMe.md)》




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

This is a Vuejs 2.x component, internally utilizing eCharts.

> It is supposed to support Vuejs 3 as well, but none tests have been run to support the conclusion.

This component is heavly inspired by the long existing component written by someone else, named "[vue-echarts](https://www.npmjs.com/package/vue-echarts)". While that `vue-echarts` does not support TypeScript at the time I began this project. Thus this component is made. While the latest version of vue-echarts DOES support TypeScript as well.


## Usage

### Templating and Styling

#### Templating

```html
<template>
    <WlcEcharts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></WlcEcharts>
</template>
```

#### Styling

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
    }
</style>
```

#### Notice

> Note that **this component delebrately carries no CSS, nor any CSS class names.**
>
> While an eCharts instance requires its container DOM to have specific width and height. **So you need to setup the size of the container, aka the root element of this component, yourself.**
>
> As shown in the example above, I setup the width and height with the help of the **CSS class name** "`my-echarts`".




### Scripting

#### Common Points

> ##### DO Remember to Import Echarts
>
> As of `v0.3.0-beta7`, this component no longer includes the echarts itself. So any program that utilizes this component, must not only import this component, but also import the echarts. And it must pass the echarts **Factory Function** to the `echartsCreator` prop of this component of mine.

> ##### Package Size Reduction Oriented Optimization
>
> If you import everything from echarts, like so:
>
> ```js
> import * as echarts from 'echarts'
> ```
>
> the package of your app could be way too large in bytes. 
>
> -----
>
> If you are for sure that your app needs only small feature sets of echarts, you might import only those interesed parts of echarts, so as to minimize the finally packaged codes size, like so:
>
> ```js
> // Notice the "/core" at the end.
> import * as echarts from 'echarts/core'
>
> import {
>     CanvasRenderer as EchartsRenderer,
> } from 'echarts/renderers'
>
> import {
>     LineChart,
> } from 'echarts/charts'
>
> import {
>     GridComponent,
> } from 'echarts/components'
>
> echarts.use([
>     LineChart,       // Import as needed.
>     GridComponent,   // MUST import. This part is required.
>     EchartsRenderer, // MUST import. This part is required.
> ])
> ```
>
> See: Section "**Importing required charts and components to have minimal bundle**", Chapter [Use ECharts with bundler and NPM](https://echarts.apache.org/en/tutorial.html#Use%20ECharts%20with%20bundler%20and%20NPM), Echarts official documentation.


#### Working with TypeScript

```ts
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import WlcEcharts from '@wulechuan/echarts-vue2-component'

import * as echarts from 'echarts'

@Component({
    components: {
        WlcEcharts,
    },
})
export default class MyEchartsDemo extends Vue {
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

> ##### Notice 1
>
> Note that when working with TypeScript, for the `import` statement in your app, the `from` part points to the npm package name of `@wulechuan/echarts-vue2-component`, aka the `main` file metioned in the `package.json` of its. To be specific, the main file is\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/typescript/index.vue`.

> ##### A Fully Functional Demo
>
> See "[../示范应用集/示范应用-1/采用-typescript-与-stylus-编写/](../示范应用集/示范应用-1/采用-typescript-与-stylus-编写/)".





### Working with JavaScript (ECMAScript)




```js
import WlcEcharts from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'

import * as echarts from 'echarts'

export default {
    name: 'my-echarts-demo',
    components: {
        WlcEcharts,
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

> ##### Notice 2
>
> Note that when working with JavaScript(ECMAScript), for the `import` statement in your app, the `from` part needs to point to\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue`.


> ##### A Fully Functional Demo
>
> See "[../示范应用集/示范应用-1/采用-javascript-与-sass-编写/](../示范应用集/示范应用-1/采用-javascript-与-sass-编写/)".


---


## API

### A Full Example as a Quick Reference

```html
<template>
    <WlcEcharts
        class="my-echarts"
        :echarts-creator="TheOfficialFactoryFunctionOfEcharts"
        :echarts-options="YourEchartsOptionsHere"
        :should-transfer-echarts4-events="false"
        :should-manually-refresh-echarts="false"
        :should-not-watch-echarts-options-deeply="false"
        :should-not-auto-resize-echarts="false"
        :echarts-theme="YourEchartsThemeNameStringOrThemeDefinitionObject"
        :echarts-initialization-options="null"
        :echarts-grouping-name="theGroupingNameOfThisInstanceOfEcharts"
        :echarts-resizing-debouncing-interval="200"
        @echart-instance-created="handleEchartInstanceCreation"
        @echart-instance-disposed="handleEchartInstanceDisposion"
        @resized="handleEchartInstanceResizing"
    ></WlcEcharts>
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

> As of `v0.3.0-beta7`, this component no longer includes the `echarts` itself. So, any program that utilizes this component, must not only import this component, but also import the `echarts`. And it must pass the echarts **Factory Function** to the `echartsCreator` prop of this component of mine.

This prop is a required one. Thus has no default value.



#### Prop `shouldTransferEcharts4Events`

```ts
shouldTransferEcharts4Events?: boolean;
```

The kebab format is `should-transfer-echarts4-events`.

The default value is `undefined`, which means `false`.



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

See [the related part in the official documentations](https://echarts.apache.org/en/api.html#echarts.init).




#### Prop `echartsOptions`

```ts
echartsOptions?: EChartOption;
```

The kebab format is `echarts-options`.

The default value is `undefined`.

See [the related part in the official documentations](https://echarts.apache.org/en/option.html).




#### Prop `echartsGroupingName`

```ts
echartsGroupingName?: string;
```

The kebab format is `echarts-grouping-name`.

The default value is `undefined`.

See [the related part in the official documentations](https://echarts.apache.org/en/api.html#echartsInstance.group).



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

#### datum: `name`

```ts
public readonly name: string = 'wlc-echarts-vue-two-component';
```

The name of this Vuejs component class.




#### datum: `chart`

```ts
public chart: ECharts | null = null;
```

The eChart instance object, or `null`.



#### datum: `namesOfAllHandledEchartsEvents`

```ts
public namesOfAllHandledEchartsEvents: 范_Echarts实例_可穿透本部件之事件之名称列表 = []
```

This datum is always decided by the value of prop `shouldTransferEcharts4Events`. If  `shouldTransferEcharts4Events` is truthy, then the `namesOfAllHandledEchartsEvents` is a list combining both eCharts 4 instance event names and eCharts 5 ones; otherwise, `namesOfAllHandledEchartsEvents` is just a list of all eCharts 5 event names.




### Getters (aka `computed` properties)

The related snippet in the source code:


```ts
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

    public get echartWidth (): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getWidth ()
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

    public get echartComputedOptions (): null | echarts.EChartOption<EChartOption.Series> {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }

    // ......
}
```



### Methods

#### Method: `refreshECharts`

Force the eCharts instance to re-draw its content once.

```ts
public refreshECharts (shouldNotMerge?: boolean, shouldMakeUpdateLaze?: boolean): void;
```




#### ~~Method: `updateECharts`~~ (DEPRECATED)

Force the eCharts instance to re-draw its content once.

> This is an alias of the `refreshECharts` method. And this alias has deprecated. So please turn to use `refreshECharts` instead.

```ts
public updateECharts (shouldNotMerge?: boolean, shouldMakeUpdateLaze?: boolean): void;
```






### Methods Treated as Private Onces

These methods below do exist, but are **not** recommended to invoke.



#### Method: `$rehandleAllEchartsEvents`

```ts
private $rehandleAllEchartsEvents (): void
```

Whenever the value of `namesOfAllHandledEchartsEvents` changes, this method invokes once.



#### Method: `$startListeningToAllEChartsEvents`

```ts
private $startListeningToAllEChartsEvents (): void
```




#### Method: `$stopListeningToAllEChartsEvents`

```ts
private $stopListeningToAllEChartsEvents (): void
```




#### Method: `$updateResizingDebouncingInterval`

```ts
private $updateResizingDebouncingInterval (newInterval?: number): void
```




#### Method: `$enableAutoResizing`

> Note that in v0.1.0, this method was named `enableAutoResizing`. As of v0.2.0, this method has renamed to `$enableAutoResizing`, and the old name is no longer available.

```ts
private $enableAutoResizing (): void
```



#### Method: `disableAutoResizing`

> Note that in v0.1.0, this method was named `disableAutoResizing`. As of v0.2.0, this method has renamed to `$disableAutoResizing`, and the old name is no longer available.


```ts
private $disableAutoResizing (): void
```




#### Method: `$resize`

```ts
private $resize (): void
```




#### Method: `$createEchartInstance`

```ts
private $createEchartInstance (): void
```



#### Method: `$disposeEchartInstance`

```ts
private $disposeEchartInstance (): void
```




#### Method: `$recreateEChartInstance`

```ts
private $recreateEChartInstance (): void
```




#### ~~Method: `$dispose`~~ (DEPRECATED)

> This is an alias of the `$disposeEchartInstance` method. And this alias has deprecated. So please turn to use `disposeEchartInstance` instead.
> Note that in v0.1.0, this method was named `dispose`. As of v0.2.0, this method has renamed to `$dispose`, and the old name is no longer available.

```ts
private $dispose (): void
```




#### ~~Method: `$recreateEChart`~~ (DEPRECATED)

> This is an alias of the `$recreateEChartInstance` method. And this alias has deprecated. So please turn to use `recreateEChartInstance` instead.

```ts
private $recreateEChart (): void
```





### Mapped Methods from eChart Instance

Each method below, of a given instance of this Vuejs component, is mapped from a method of the eChart instance the Vuejs component holds. Mapped method names are identical to their source methods'.

```ts
public dispatchAction (
    ...options: Parameters<ECharts['dispatchAction']>
): void
```

```ts
public resize (
    ...options: Parameters<ECharts['resize']>
): void
```

```ts
public convertToPixel (
    ...options: Parameters<ECharts['convertToPixel']>
): ReturnType<ECharts['convertToPixel']>
```

```ts
public convertFromPixel (
    ...options: Parameters<ECharts['convertFromPixel']>
): ReturnType<ECharts['convertFromPixel']>
```

```ts
public containPixel (
    ...options: Parameters<ECharts['containPixel']>
): boolean
```

```ts
public showLoading (
    ...options: Parameters<ECharts['showLoading']>
): void
```

```ts
public hideLoading (): void
```

```ts
public getDataURL (
    ...options: Parameters<ECharts['getDataURL']>
): ReturnType<ECharts['getDataURL']>
```

```ts
public getConnectedDataURL (
    ...options: Parameters<ECharts['getConnectedDataURL']>
): ReturnType<ECharts['getConnectedDataURL']>
```

```ts
public appendData (
    ...options: Parameters<ECharts['appendData']>
): void
```

```ts
public clear (): void
```


### Events

#### "Original" Vue Element Events of This Vue Component

##### `resized`

Arguments of an event handler: none.





##### `echart-instance-created`

Arguments of an event handler: the eChart instance object.

Whenever an eChart instance is created, an event of this type emits.

> Note that some factors might cause this vue component to first dispose the existing
> eChart instance and then recreate a new one. In this case, the event emits again.



##### `echart-instance-disposed`

Arguments of an event handler: none.

Whenever an eChart instance is disposed, an event of this type emits.


#### ECharts Events Passed upwards by This Vue Component

No details at present.




---

## TODOs

Nothing at present.



---

## License

WTFPL

> NOTE:
>
> I'm not an expert about license types. So I temporarily use WTFPL. But I guess this type of license might conflict with the ones used by those npm packages I'm utilizing.

