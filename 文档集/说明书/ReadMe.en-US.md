# Wulechuan's ECharts component of Vuejs 2.x plus TypeScript

<link rel="stylesheet" href="../..//node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">

<style>
h1 em,
h2 em,
h3 em,
h4 em,
h5 em,
h6 em {
    font-weight: inherit;
}
</style>


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


### Installation

You must install **BOTH** this package **and** the echarts pacakge. Like so:

```bash
npm  i  @wulechuan/echarts-vue2-component  echarts
```


### Working with This Component

#### Templating and Styling

##### Templating

```html
<template>
    <WlcEcharts
        class="my-echarts-001-in-vuejs"
        :echarts-module-exports-root="echartsModuleExportsRoot"
        :echarts-options="echartsOptions"
    ></WlcEcharts>
</template>
```

##### Styling

```css
<style>
    .my-echarts-001-in-vuejs {
        width:  790px;
        height: 515px;
    }
</style>
```

##### Notice

> Note that **this component delebrately carries no CSS, nor any CSS class names.**
>
> While an eCharts instance requires its container DOM to have specific width and height. **You need to setup the size of the container, aka the root element of this component, yourself.**
>
> As shown in the example above, I setup the width and height with the help of the **CSS class name** "`my-echarts-001-in-vuejs`".




#### Scripting



##### Common Points

###### DO Remember to Import Echarts

As of `v0.3.0-beta7`, this component no longer includes the echarts itself. So any program that utilizes this component, must not only import this component, but also import the echarts. And it must pass the echarts **module exports root** to the `echartsCreator` prop of this component of mine.

As of `v1.2.0`, the prop `echartsCreator` mentioned just above, has renamed into `echartsModuleExportsRoot`. So DO pass the echarts **module exports root** to the `echartsModuleExportsRoot` prop of this component of mine.


###### Package Size Reduction Oriented Optimization

If you import everything from echarts, like so:

```js
import * as echarts from 'echarts'
```

the package of your app could be way too large in bytes.

-----

If you are for sure that your app needs only small feature sets of echarts, you might import only those interesed parts of echarts, so as to minimize the finally packaged codes size, like so:

```js
// Notice the "/core" at the end.
import * as echarts from 'echarts/core'

import {
    CanvasRenderer as EchartsRenderer,
} from 'echarts/renderers'

import {
    LineChart,
} from 'echarts/charts'

import {
    GridComponent,
} from 'echarts/components'

echarts.use([
    LineChart,       // Import as needed.
    GridComponent,   // MUST import. This part is required.
    EchartsRenderer, // MUST import. This part is required.
])
```

See: Section "**Importing required charts and components to have minimal bundle**", Chapter [Use ECharts with bundler and NPM](https://echarts.apache.org/en/tutorial.html#Use%20ECharts%20with%20bundler%20and%20NPM), Echarts official documentation.


##### Working with TypeScript

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
    echartsModuleExportsRoot = echarts
    echartsOptions = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            data: [ 820, 932, 901, 934, 1290, 1330, 1320 ],
            type: 'line',
        }],
    }
}
```

> ###### Notice 1
>
> Note that when working with TypeScript, for the `import` statement in your app, the `from` part must points to this file\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/typescript/index.vue`.

> ###### A Fully Functional Demo
>
> See "[../示范应用集/示范应用-1/采用-typescript-与-stylus-编写/](../示范应用集/示范应用-1/采用-typescript-与-stylus-编写/)".





##### Working with JavaScript (ECMAScript)


```js
import WlcEcharts from '@wulechuan/echarts-vue2-component'

import * as echarts from 'echarts'

export default {
    name: 'demo-of-wlc-echarts-vue2-component',
    components: {
        WlcEcharts,
    },
    data: function () {
        return {
            echartsModuleExportsRoot: echarts,
            echartsOptions: {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [{
                    data: [ 820, 932, 901, 934, 1290, 1330, 1320 ],
                    type: 'line',
                }],
            },
        }
    },
}
```

> ###### Notice 2
>
> Note that when working with JavaScript, for the `import` statement in your app, the `from` part points to the *npm module id* `@wulechuan/echarts-vue2-component`. Internally with the help of the `main` property metioned in the `package.json` of its, that statement in fact points to this file:\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue`.
>
> But there're still some differences between the two. The *npm module id* exports not only the `class` and the constants, but also a implicit TypeScript namespace. While the `.../javascript/index.vue` exports **NO** namespaces. So if your don't import the *npm module id*, but import the javascript edition `index.vue` file instead, then your code editor might miss some Types defintions, therefore you are facing the lack of some Type inferences. Since most of us are happy to work with Types declarations alongside pure JavaScript codes, I suggest you always import the *npm module id*. That is, do this:
>
> ```js
> import WlcEcharts from '@wulechuan/echarts-vue2-component'
> ```
>
> Don't do this:
>
> ```js
> import WlcEcharts from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'
> ```


> ###### A Fully Functional Demo
>
> See "[../示范应用集/示范应用-1/采用-javascript-与-sass-编写/](../示范应用集/示范应用-1/采用-javascript-与-sass-编写/)".


---


### APIs





#### A Full Example as a Quick Reference

```html
<template>
    <WlcEcharts
        class="my-echarts-002-in-vuejs"

        :echarts-module-exports-root="eChartsModuleExportsRoot"
        :echarts-initialization-options="theOptionsUsedByTheEchartsFactory_whichIsNamed_init"
        :echarts-grouping-name="theGroupingNameOfThisInstanceOfEcharts"
        :echarts-theme="YourEchartsThemeNameStringOrThemeDefinitionObject"
        :echarts-options="YourEchartsOptionsHere"

        :should-manually-refresh-echarts="false"
        :should-not-watch-echarts-options-deeply="false"
        :should-not-auto-resize-echarts="false"
        :echarts-resizing-debouncing-interval="200"

        :should-transfer-echarts4-events="false"
        :should-transfer-event-of-echarts-rendered="false"
        :should-transfer-events-of-zrender="false"

        @echart-instance-created="handleEchartInstanceCreation"
        @echart-instance-disposed="handleEchartInstanceDisposion"
        @resized="handleEchartInstanceResizing"
    ></WlcEcharts>
</template>
```

```css
<style>
    .my-echarts-002-in-vuejs {
        width:  790px;
        height: 515px;
    }
</style>
```





-----





#### The `Props` of This Vuejs Component





##### Prop `echartsModuleExportsRoot`

```ts
echartsModuleExportsRoot: typeof echarts
```

The kebab format is `echarts-module-exports-root`.

As of `v0.3.0-beta7`, this component no longer includes the echarts itself. So any program that utilizes this component, must not only import this component, but also import the echarts. And it must pass the echarts **module exports root** to the `echartsCreator` prop of this component of mine.

As of `v1.2.0`, the prop `echartsCreator` mentioned just above, has renamed into `echartsModuleExportsRoot`. So DO pass the echarts **module exports root** to the `echartsModuleExportsRoot` prop of this component of mine.


This prop is a required one. Thus has no default value.





##### ~~Prop `echartsCreator`~~  (DEPRECATED)

```ts
// This prop has deprecated.
echartsCreator: typeof echarts
```

The kebab format is `echarts-creator`.

**This prop is deprecated, please turn to prop `echartsModuleExportsRoot`.**





##### Prop `echartsInitializationOptions`

```ts
// echartsInitializationOptions?: Parameters<echarts.init>[2]
echartsInitializationOptions?: 范_Echarts工厂函数之配置项集
```

The kebab format is `echarts-initialization-options`.

The default value is `undefined`.

See [the related part in the official documentations](https://echarts.apache.org/en/api.html#echarts.init).






##### Prop `echartsGroupingName`

```ts
echartsGroupingName?: string
```

The kebab format is `echarts-grouping-name`.

The default value is `undefined`.

See [the related part in the official documentations](https://echarts.apache.org/en/api.html#echartsInstance.group).





##### Prop `echartsTheme`

```ts
echartsTheme?: 范_Echarts配色方案之配置
```

The kebab format is `echarts-theme`.

The default value is `undefined`。

the name string of a registered eCharts theme, or an object that represents an eCharts theme definition.


> See [To design a theme in an object, and then register the theme object to eCharts with a theme name.](https://echarts.apache.org/en/api.html#echarts.registerThemee).

> There exists [an official theme building tool](https://echarts.baidu.com/theme-builder/). Check it out.





##### Prop `echartsOptions`

```ts
echartsOptions?: EChartsOption
```

The kebab format is `echarts-options`.

The default value is `undefined`.

See [the related part in the official documentations](https://echarts.apache.org/en/option.html).





##### Prop `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean
```

The kebab format is `should-manually-refresh-echarts`.

The default value is `undefined`, which means `false`.





##### Prop `shouldNotWatchEchartsOptionsDeeply`

```ts
shouldNotWatchEchartsOptionsDeeply?: boolean
```

The kebab format is `should-not-watch-echarts-options-deeply`.

The default value is `undefined`, which means `false`.





##### Prop `shouldNotAutoResizeEcharts`

```ts
shouldNotAutoResizeEcharts?: boolean
```

The kebab format is `should-not-auto-resize-echarts`.

The default value is `undefined`, which means `false`.





##### Prop `echartsResizingDebouncingInterval`

```ts
echartsResizingDebouncingInterval?: number
```

The kebab format is `echarts-resizing-debouncing-interval`.

Unit in milliseconds, not allow to be lower than `10`. The default value is `200`.





##### Prop `shouldTransferEcharts4Events`

```ts
shouldTransferEcharts4Events?: boolean
```

The kebab format is `should-transfer-echarts4-events`.

The default value is `undefined`, which means `false`.





##### Prop `shouldTransferEventOfEchartsRendered`

```ts
shouldTransferEventOfEchartsRendered?: boolean
```

The kebab format is `should-transfer-event-of-echarts-rendered`.

The default value is `undefined`, which means `false`.





##### Prop `shouldTransferEventsOfZrender`

```ts
shouldTransferEventsOfZrender?: boolean
```

The kebab format is `should-transfer-events-of-zrender`.

The default value is `undefined`, which means `false`.





-----





#### The `data` of This Vuejs Component





##### ~~datum: `name`~~ (REMOVED)

```ts
// This datum had removed.
// The latest codes do NOT contain this datum.
public readonly name: string = 'wlc-echarts-vue-two-component'
```

~~The name of this Vuejs component class.~~






##### datum: `chart`

```ts
public chart: ECharts | null = null
```

The eChart instance object, or `null`.





##### datum: `namesOfAllHandledEchartsEvents`

```ts
public namesOfAllHandledEchartsEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例 = []
```

This datum is always decided by both:
-   the value of *Prop* `shouldTransferEcharts4Events`
-   and the value of *Prop* `shouldTransferEventOfEchartsRendered`.

Logics:

-   If `shouldTransferEcharts4Events` is truthy, the <br> `namesOfAllHandledEchartsEvents` is a list combining both eCharts 4 instance event names and eCharts 5 ones; otherwise, `namesOfAllHandledEchartsEvents` is just a list of all eCharts 5 event names.
-   If `shouldTransferEventOfEchartsRendered` is truthy, the `'rendered'` will be included in `namesOfAllHandledEchartsEvents`; otherwise, the `'rendered'` will be removed from `namesOfAllHandledEchartsEvents`.





-----





#### The Computed Properties of This Vuejs Component

The snippet in the source code:


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

    public get echartComputedOptions (): null | EChartsCoreOption {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }

    // ......
}
```





-----





#### Public Methods of This Vuejs Component

##### Method: `refreshEcharts`

Force the eCharts instance to re-draw its content once.

```ts
public refreshEcharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```



##### ~~Method: `refreshECharts`~~ (DEPRECATED)

~~Force the eCharts instance to re-draw its content once.~~

> The name of this method has a capital "C". It is an alias of the `refreshEcharts` method (with a lowercase "c"). And this alias has deprecated. So please turn to use `refreshEcharts` instead.

```ts
// This alias has deprecated.
public refreshECharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```





##### ~~Method: `updateECharts`~~ (DEPRECATED)

~~Force the eCharts instance to re-draw its content once.~~

> This is an alias of the `refreshECharts` method. And this alias has deprecated. So please turn to use `refreshECharts` instead.

```ts
// This alias has deprecated.
public updateECharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```





-----






#### Methods Treated as Private Onces

These methods below do exist, but are **not** recommended to invoke.



##### Method: `$rehandleAllEchartsEvents`

```ts
private $rehandleAllEchartsEvents (): void
```

Whenever the value of `namesOfAllHandledEchartsEvents` changes, this method invokes once.



##### Method: `$startListeningToAllEchartsEvents`

```ts
private $startListeningToAllEchartsEvents (): void
```




##### Method: `$stopListeningToAllEchartsEvents`

```ts
private $stopListeningToAllEchartsEvents (
    oldListOfNamesOfHandledEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例
): void
```


##### Method `$rehandleAllZrenderEvents`

```ts
private $rehandleAllZrenderEvents (): void
```

Whenever the value of `shouldTransferEventsOfZrender` changes, this method invokes once.



##### Method `$startListeningToAllZrenderEvents`

```ts
private $startListeningToAllZrenderEvents (): void
```




##### 方法函数 `$stopListeningToAllZrenderEvents`

```ts
private $stopListeningToAllZrenderEvents (): void
```





##### Method: `$updateResizingDebouncingInterval`

```ts
private $updateResizingDebouncingInterval (
    newInterval?: number
): void
```




##### Method: `$enableAutoResizing`

> Note that in v0.1.0, this method was named `enableAutoResizing`. As of v0.2.0, this method has renamed to `$enableAutoResizing`, and the old name is no longer available.

```ts
private $enableAutoResizing (): void
```



##### Method: `disableAutoResizing`

> Note that in v0.1.0, this method was named `disableAutoResizing`. As of v0.2.0, this method has renamed to `$disableAutoResizing`, and the old name is no longer available.


```ts
private $disableAutoResizing (): void
```




##### Method: `$resize`

```ts
private $resize (): void
```




##### Method: `$createEchartInstance`

```ts
private $createEchartInstance (): void
```



##### Method: `$disposeEchartInstance`

```ts
private $disposeEchartInstance (): void
```




##### Method: `$recreateEchartInstance`

```ts
private $recreateEchartInstance (): void
```




##### ~~Method: `$dispose`~~ (DEPRECATED)

```ts
// This method has deprecated.
private $dispose (): void
```

~~This is an alias of the `$disposeEchartInstance` method. And this alias has deprecated. So please turn to use `disposeEchartInstance` instead.~~

> ~~Note that in `v0.1.0`, this method was named `dispose`. As of `v0.2.0`, this method has renamed into `$dispose`, and the old name is no longer available.~~





##### ~~Method: `$recreateEChart`~~ (DEPRECATED)


```ts
// This method has deprecated.
private $recreateEChart (): void
```

~~This is an alias of the `$recreateEchartInstance` method. And this alias has deprecated. So please turn to use `recreateEchartInstance` instead.~~





-----





#### Mapped Methods from eCharts Instance

Each method below, of a given instance of this Vuejs component, is mapped from a method of the eCharts instance the Vuejs component holds. Mapped method names are identical to their source methods'.

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





-----





#### Events

##### The "Original" *Vuejs Element Events* of this Vue Component

###### `resized`

Arguments of an event handler: none.





###### `echart-instance-created`

Arguments of an event handler: the eCharts instance object.

Whenever an eChart instance is created, an event of this type emits.

> Note that some factors might cause this vue component to first dispose the existing
> eCharts instance and immediately recreate a new one. In this case, the event emits again.



###### `echart-instance-disposed`

Arguments of an event handler: none.

Whenever an eChart instance is disposed, an event of this type emits.





##### ECharts Events Passed upwards by This Vuejs Component

###### ECharts 5 Events that gets Passed


```ts
export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_5: Array<范_Echarts_事件之名称_Echarts_5_之实例> = [

    'click',
    'dblclick',
    'mousewheel',
    'mouseover',
    'mouseout',
    'mouseup',
    'mousedown',
    'mousemove',
    'globalout',

    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'drop',

    'contextmenu',

    'highlight',
    'downplay',
    'selectchanged',
    'legendselectchanged',
    'legendselected',
    'legendunselected',
    'legendselectall',
    'legendinverseselect',
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
    'axisareaselected',
    'brush',
    'brushEnd',
    'brushselected',
    'globalcursortaken',
    'rendered',
    'finished',
]
```


> Among them, there is an event type named `rendered`. This Vuejs component provides a dedicated boolean option to control whether to handle the `rendered` type of events or not. See above: [`shouldTransferEventOfEchartsRendered`](#Prop%20shouldTransferEventOfEchartsRendered).

> See chapter [events](https://echarts.apache.org/en/api.html#events), eCharts official documentation.





###### Old Events (of ECharts 4) that gets Passed

```ts
export const SUPPORTED_ECHARTS_INSTANCE_EVENT_NAMES__ECHARTS_4: Array<范_Echarts_事件之名称_Echarts_4_之实例> = [
    'pieselectchanged',
    'pieselected',
    'pieunselected',
    'mapselectchanged',
    'mapselected',
    'mapunselected',
    'focusnodeadjacency',
    'unfocusnodeadjacency',
]
```

> See section [Deprecated APIs](https://echarts.apache.org/handbook/en/basics/release-note/v5-upgrade-guide/), chapter Apache ECharts 5 Upgrade Guide, eCharts official documentation.






###### ZRender Events that gets Passed

```ts
export const SUPPORTED_ZRENDER_EVENT_NAMES__RAW: Array<范_Zrender_事件之名称> = [
    'click',
    'dblclick',
    'mousewheel',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousedown',
    'mousemove',
    'contextmenu',

    'drag',
    'dragstart',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'drop',
    'globalout',
]

export const SUPPORTED_ZRENDER_EVENT_NAMES__FROM_VUE_COMPONENT: Array<范_Zrender_事件穿透本部件后之名称> = [
    'zrender:click',
    'zrender:dblclick',
    'zrender:mousewheel',
    'zrender:mouseout',
    'zrender:mouseover',
    'zrender:mouseup',
    'zrender:mousedown',
    'zrender:mousemove',
    'zrender:contextmenu',

    'zrender:drag',
    'zrender:dragstart',
    'zrender:dragend',
    'zrender:dragenter',
    'zrender:dragleave',
    'zrender:dragover',
    'zrender:drop',
    'zrender:globalout',
]
```

> See section [Listen to Events on the Blank Area](https://echarts.apache.org/handbook/en/concepts/event/#listen-to-events-on-the-blank-area), chapter Event and Action, eCharts official Handbook.










---

## License

WTFPL

> NOTE:
>
> I'm not an expert about license types. So I temporarily use WTFPL. But I guess this type of license might conflict with the ones used by those npm packages I'm utilizing.

