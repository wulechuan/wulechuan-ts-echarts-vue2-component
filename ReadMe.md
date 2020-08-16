# 吴乐川的针对 Vuejs 2.x 框架并支持 TypeScript 语法的 ECharts 组件

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/dist/css/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


## Multilingual Editions of this Article

- [English version of this ReadMe](./documents/ReadMe.en-US.md)




## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/echarts-vue2-component](https://www.npmjs.com/package/@wulechuan/echarts-vue2-component)

</dd>
<dt>作者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>





## 简介

本工具系本人受到他人早先撰写的已有项目《[vue-echarts](https://github.com/ecomfe/vue-echarts/)》启发而自做的。vue-echarts 并不支持 TypeScript 语法。而本人所写的该工具则增补了这项功能。


## 用法

### 针对 TypeScript 编程环境的用法

见下例。

另见本代码库自带的可运转的示例项目《[demos/demo-of-typescript](./demos/demo-of-typescript/)》。

```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></vue-echarts>
</template>
```

> 注意！本组件有意不携带**任何** CSS 代码。甚至不携带 CSS 类名（className）。而众所周知，eCharts 组件要求其容器有明确的宽、高配置。因此，不要忘记借助 CSS 来定义本组件的宽、高。且一般的，我们会借助 CSS 类名来实现该目的，一如本例。

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
        background-color: white;
    }
</style>
```

> 注意！采用本 Vuejs 组件之 TypeScript 版本时，`import` 语句的 `from` 指向 npm 包名 `@wulechuan/echarts-vue2-component`，即指向 npm 包的 `main` 文件。实际上，指向的是 `./source/index.vue`。

```ts
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component'

/**
 * 本组件自 v0.3.0-beta7 始，故意不再包含 echarts。
 * 故使用本组件须另行引入 echarts 本身，并交由本组件的“echartsCreator”接口项，以代入本组件。
 */

// 另，为节省引入的代码量，推荐下方的写法（共两行）：
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


### 针对 JavaScript (ECMAScript) 编程环境的用法

见下例。

另见本代码库自带的可运转的示例项目《[demos/demo-of-javascript](./demos/demo-of-javascript/)》。

```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></vue-echarts>
</template>
```

> 注意！ **本组件有意不携带任何 CSS 代码**。甚至不携带 CSS 类名（className）。而众所周知，eCharts 组件要求其容器有明确的宽、高配置。因此，不要忘记借助 CSS 来定义本组件的宽、高。且一般的，我们会借助 CSS 类名来实现该目的，一如本例。


```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
        background-color: white;
    }
</style>
```

> 注意！采用本 Vuejs 组件之 JavaScript 版本时，`import` 语句的 `from` 指向 `./@wulechuan/echarts-vue2-component/dist/index.vue`。

```js
import Vue from 'vue'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component/dist/index.vue'

/**
 * 本组件自 v0.3.0-beta7 始，故意不再包含 echarts。
 * 故使用本组件须另行引入 echarts 本身，并交由本组件的“echartsCreator”接口项，以代入本组件。
 */

// 另，为节省引入的代码量，推荐下方的写法（共两行）：
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


## 应用编程接口（API）

### 完整应用示例，以便速查

```html
<template>
    <vue-echarts
        class="my-echarts"
        :echarts-creatror="echarts官方曝露的工厂函数"
        :should-manually-refresh-echarts="false"
        :should-not-watch-echarts-options-deeply="false"
        :should-not-auto-resize-echarts="false"
        :echarts-theme="你的eCharts主题名称或主题配置对象"
        :echarts-initialization-options="null"
        :echarts-options="你的eCharts配置项"
        :echarts-grouping-name="该eCharts实例参与图表成组时的【组名称】"
        :echarts-resizing-debouncing-interval="200"
    >
    </vue-echarts>
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




### 输入项（即 Vuejs 组件的 Props）

#### Prop `echartsCreator`

```ts
echartsCreator: Function;
```

葫芦串（所谓 kebab）记法：`echarts-creator`。

本组件自 v0.3.0-beta7 始，**故意不再包含 `echarts`**。故使用本组件须另行引入 `echarts` 本身，并交由本组件的“echartsCreator”接口项，以代入本组件。
**该项为必须项，故无默认值为。**


#### Prop `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean;
```

葫芦串（所谓 kebab）记法：`should-manually-refresh-echarts`。

默认值为 `undefined`，于是默认功效等同于取 `false`。

若取 `true`，则即使该 Vuejs 2.x 组件之输入之 `echartsOptions` 有所变化，组件内部的 eCharts 实例亦不会重绘，而是等待组件外部代码“人为”调用本组件实例的 `refreshECharts` 方法。



#### Prop `shouldNotWatchEchartsOptionsDeeply`

```ts
shouldNotWatchEchartsOptionsDeeply?: boolean;
```

葫芦串（所谓 kebab）记法：`should-not-watch-echarts-options-deeply`。

默认值为 `undefined`，于是默认功效等同于取 `false`。



#### Prop `shouldNotAutoResizeEcharts`

```ts
shouldNotAutoResizeEcharts?: boolean;
```

葫芦串（所谓 kebab）记法：`should-not-auto-resize-echarts`。

默认值为 `undefined`，于是默认功效等同于取 `false`。

当 eCharts 之容器 DOM 的尺寸变化时，如果允许（默认即允许）eCharts 自动重绘，使得 eCharts 的画面总是自动充满其容器，既不被裁剪，也不留有多余的空白。允许自动重绘与否，取决于该 Prop 参数（指 `shouldNotAutoResizeEchart` ），其取`falsy` 值，则代表允许 eCharts 在容器尺寸变更时自动重绘；反之。




#### Prop `echartsInitializationOptions`

```ts
echartsInitializationOptions?: EchartsInitializationOptions;
```

葫芦串（所谓 kebab）记法：`echarts-initialization-options`。

默认值为 `undefined`。

参阅 《[eCharts 文档的相关部分](https://www.echartsjs.com/zh/api.html#echarts.init)》。




#### Prop `echartsOptions`

```ts
echartsOptions?: EChartOption;
```

葫芦串（所谓 kebab）记法：`echarts-options`。

默认值为 `undefined`。

参阅 《[eCharts 文档的相关部分](https://www.echartsjs.com/zh/option.html)》。




#### Prop `echartsGroupingName`

```ts
echartsGroupingName?: string;
```

葫芦串（所谓 kebab）记法：`echarts-grouping-name`。

默认值为 `undefined`。

参阅《[eCharts 文档的相关部分](https://www.echartsjs.com/zh/api.html#echartsInstance.group)》。




#### Prop `echartsResizingDebouncingInterval`

```ts
echartsResizingDebouncingInterval?: number;
```

葫芦串（所谓 kebab）记法：`echarts-resizing-debouncing-interval`。

单位为毫秒。不允许小于 `10`。默认值为 `200`。

当 eCharts 在其容器横纵尺寸变化时，可能自动重绘。重绘与否取决于名为 `shouldNotAutoResizeEchart` 的 Prop 参数（见上文）。

如果用户正在交互式的动态改变 eCharts 容器的尺寸，那么毫无疑问，eCharts 须在交互过程中反复重绘多次，以使得 eCharts 是在视觉上尺寸总是瞬时跟随容器变化。然而，反复重绘 eCharts 的代价可能很大，于是本组件借助 `lodash.debounce` 来“减缓” eCharts 重绘的步调。该参数（指`echartsResizingDebouncingInterval`）即是 `debounce` 触发重绘动作之时间间隔，单位是毫秒。



#### Prop `echartsTheme`

```ts
echartsTheme?: EChartsTheme;
```

葫芦串（所谓 kebab）记法：`echarts-theme`。

默认值为 `undefined`。

eCharts 的主题名称字符串，或完整的 eCharts 主题定义对象。

参阅 eCharts 文档的相关部分：

- [预先设计好一个主题对象，并向 eCharts 注册该主题对象之名称](https://www.echartsjs.com/zh/api.html#echarts.registerTheme)。
- [官方主题构建工具](https://echarts.baidu.com/theme-builder/)。




### 数据属性（即 Vuejs 组件实例的 `data`）

#### data: `name`

```ts
public readonly name: string = 'wlc-echarts-vue-two-component';
```

本组件之名称。该值视为只读属性，取值为 `'wlc-echarts-vue-two-component'`。




#### data: `chart`

```ts
public chart: ECharts | null = null;
```

eChart 实例对象，或 `null` 值。





### data: `echartsGraphic`

echarts 构造函数上携带的静态对象 `graphic`。

参阅《[eCharts 文档的相关部分](https://www.echartsjs.com/zh/api.html#echarts.graphic)》。

与之相关的源代码片段如下：

```ts
import echarts from 'echarts'

// ......
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

    public echartsGraphic = echarts.graphic

    // ......
}
```


### 取值器（getters），即计算属性（`computed`）

与取值器相关的源代码片段如下：

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



### 本组件公开的方法函数


#### 方法函数 `refreshECharts`

```ts
refreshECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void;
```

强制 eCharts 实例重绘一次。





#### 方法函数 `updateECharts` （已弃用）

> 该方法函数为 `refreshECharts` 之别名，并已弃用。请改用 `refreshECharts`。

```ts
updateECharts(shouldNotMerge?: boolean, lazyUpdate?: boolean): void;
```

强制 eCharts 实例重绘一次。






### 存在于本组件但不建议调用的方法函数

以下方法函数本质上仍然是“公开”的。但它们均在本组件中被其余代码按需调用，**组件之用户一般无需亲自调用它们**。为区别，以下方法函数之名称均冠以“美元符号”，即“`$`”。



#### 方法函数 `$startListeningToAllEChartsEvents`

```ts
$startListeningToAllEChartsEvents(): void
```




#### 方法函数 `$stopListeningToAllEChartsEvents`

```ts
$stopListeningToAllEChartsEvents(): void
```




#### 方法函数 `$updateResizingDebouncingInterval`

```ts
$updateResizingDebouncingInterval(newInterval?: number): void
```





#### 方法函数 `$enableAutoResizing`

> 注意： v0.1.0 版中层将其命名为未冠以美元符号的 `enableAutoResizing`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
$enableAutoResizing(): void
```





#### 方法函数 `$disableAutoResizing`

> 注意： v0.1.0 版中层将其命名为未冠以美元符号的 `disableAutoResizing`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
$disableAutoResizing(): void
```





#### 方法函数 `$resize`

```ts
$resize(): void
```






#### 方法函数 `$createEchartInstance`

```ts
$createEchartInstance(): void
```





#### 方法函数 `$dispose`

> 注意： v0.1.0 版中层将其命名为未冠以美元符号的 `dispose`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
$dispose(): void
```





#### 方法函数 `$recreateEChart`

```ts
$recreateEChart(): void
```





### 从 eChart 实例对象上映射至本组件实例的同名方法函数

仿照《[vue-echarts](https://github.com/ecomfe/vue-echarts/)》之做法，本组件亦将 eChart 实例对象上的诸多方法映射为本 Vuejs 组件上的同名方法。但我猜测我鲜有机会调用这些方法。

每一段映射代码均非常简短，有兴趣不妨查阅源代码。

已映射的同名方法函数如下：

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

## 未来计划

暂无。


---

## 许可证类型

WTFPL

> 注意：
>
> 我未研究过许可证的约束。因此姑且声明为 WTFPL 类型。但实际上该许可证类型可能与我采用的开源模块有冲突。



