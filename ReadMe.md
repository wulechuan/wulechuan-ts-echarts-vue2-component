# 吴乐川的适配 Vuejs 2 的 eCharts “包裹”部件

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">



## Multilingual Editions of this Article

- [English edition of this ReadMe](./文档集/说明书/ReadMe.en-US.md)




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

### 功用

本工具系一个 Vuejs 2.x 之部件。本部件产生的网页片断中“包裹”着 eCharts 功能。本工具可助程序员在遵循 Vuejs 框架的网页编程环境中较简便可靠地采用 eCharts 图表。

> 本工具理论上也适用于 Vuejs 3.x ，但未验证。

亮点功能

1.  默认令 eCharts 图表占据之区域即时响应图表排版容器尺寸之变动，以期总是恰好填满排版容器。
2.  同时支持 TypeScript 和 JavaScript 语言。
3.  较为完善的【事件】（Events）集。

### 由来

本工具系本人受到他人早先撰写的已有项目《[vue-echarts](https://www.npmjs.com/package/vue-echarts)》启发而自做的。

当时的（旧） vue-echarts 并不支持 TypeScript 语法。而本人所写的该工具则增补了这一特性。如今，晚近版本的 vue-echarts 也对 TypeScript 提供了不错的支持。

-----


## 源代码仓库

| <span style="display:inline-block;width:180px;">提供仓库服务之组织</span> | <span style="display:inline-block;width:150px;">仓库组织之国别</span> | 仓库地址 |
| ------------- | :----------: | ------- |
| 码云           | 中华人民共和国 | [https://gitee.com/nanchang-wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://gitee.com/nanchang-wulechuan/wulechuan-typescript-echarts-vue2-component.git) |
| 阿里云之代码仓库 | 中华人民共和国 | [https://code.aliyun.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://code.aliyun.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git) |
| GitHub         | 美           | [https://github.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://github.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git) |


-----

## 重要版本

-   2022 年 4 月 29 日， `v1.0.0` 版。完善对 echarts 版本 5 的支持。虽主体代码（部件之类（class）定义）并未汉化，但“周边”各类型（type）之定义已悉数汉化。


-----

## 用法

### 模板与样式的示范

#### 模板

```html
<template>
    <WlcEcharts
        class="my-echarts"
        :echarts-creator="echartsCreator"
        :echarts-options="echartsOptions"
    ></WlcEcharts>
</template>
```


#### 样式

```css
<style>
    .my-echarts {
        width:  790px;
        height: 515px;
        background-color: white;
    }
</style>
```

#### 注意事项

> 本部件有意**不携带任何 CSS 代码**。甚至不携带任何【**样式类名**】（外国话所谓“ CSS Class Name”）。故本部件构造的根【文档对象】（Object Model）是**不具备明确宽高尺寸的。**
>
> 而众所周知，eCharts 部件要求其容器有明确的宽、高配置。**因此，不要忘记借助样式来定义本部件根【文档对象】的宽、高。**
>
> 另，一般的，我们会借助【**样式类名**】来实现该目的，一如本例。参阅上文的 `<style>` 代码。


### 脚本语言的示范

本节分之主体分两小节：《[采用 TypeScript 语言编程的示范](#%E9%87%87%E7%94%A8%20TypeScript%20%E8%AF%AD%E8%A8%80%E7%BC%96%E7%A8%8B%E7%9A%84%E7%A4%BA%E8%8C%83)》和《[采用 JavaScript 语言编程的示范](#%E9%87%87%E7%94%A8%20JavaScript%20%E8%AF%AD%E8%A8%80%E7%BC%96%E7%A8%8B%E7%9A%84%E7%A4%BA%E8%8C%83)》。在这两小节之前，还有《[无关乎编程语言的公共注意事项](#无关乎编程语言的公共注意事项)》一节。

#### 无关乎编程语言的公共注意事项

> ##### 须另行引入 echarts 本身
>
> 本部件自 `v0.3.0-beta7` 始，**故意不再包含 echarts**。故使用本部件须另行引入 echarts 本身，并将 echarts 的**工厂函数**经由本部件的 “`echartsCreator`” 接口项，以代入本部件。

> ##### 通用的优化做法
>
> 在你的应用代码中**一股脑引入整个 echarts**（如下例）虽然简便易行，但会造成最终打包的应用较大。
>
> ```js
> import * as echarts from 'echarts'
> ```
>
> -----
>
> 如果在你的应用中已知仅需采用 echarts 之少许功能，不须囊括完整的 echarts ，那么，为节省你的应用引入的代码量，从而减小最终打包的应用之字节数，应借鉴下方写法之思路：
>
> ```js
> // 注意下方的导入源包含 “ /core ” 字样。
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
>     LineChart, // 此乃按需索取之项。
>     GridComponent, // 此乃必须项。切勿省略。
>     EchartsRenderer, // 此乃必须项。切勿省略。
> ])
> ```
>
> 参阅：官方文档《[在打包环境中使用 ECharts](https://echarts.apache.org/zh/tutorial.html#在打包环境中使用%20ECharts)》的《**按需引入 ECharts 图表和部件**》一节。


#### 采用 TypeScript 语言编程的示范

见下例。



```ts
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import WlcEcharts from '@wulechuan/echarts-vue2-component'

import * as echarts from 'echarts' // 为简便，故意未采用优化方案。

@Component({
    components: {
        WlcEcharts,
    },
})
export default class WlcEcharts部件应用示范 extends Vue {
    echartsCreator = echarts
    echartsOptions = {
        xAxis: {
            type: 'category',
            data: [ '一', '二', '三', '四', '五', '六', '日' ],
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


> ##### 注意 1
>
> 采用本 Vuejs 部件之 TypeScript 语言写就之版本时，应用代码中的 `import` 语句的 `from` 指向 npm 包名\
> `@wulechuan/echarts-vue2-component`，即指向 npm 包的 `main` 文件。实际上，指向的是\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/typescript/index.vue` 这一文件。


> ##### 完整示范
>
> 见本项目自带的可运转的示范项目《[./文档集/示范应用集/示范应用-1/采用-typescript-与-stylus-编写/](./文档集/示范应用集/示范应用-1/采用-typescript-与-stylus-编写/)》。


### 采用 JavaScript 语言编程的示范

见下例。



```js
import WlcEcharts from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'

import * as echarts from 'echarts' // 为简便，故意未采用优化方案。

export default {
    name: 'WlcEcharts部件应用示范',
    components: {
        WlcEcharts,
    },
    data: function () {
        return {
            echartsCreator: echarts,
            echartsOptions: {
                xAxis: {
                    type: 'category',
                    data: [ '一', '二', '三', '四', '五', '六', '日' ],
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



> ##### 注意 2
>
> 采用本 Vuejs 部件之 JavaScript 语言写就之版本时，应用代码中的 `import` 语句的 `from` 须明确指向\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue` 这一文件。


> ##### 完整示范
>
> 见本项目自带的可运转的示范项目《[./文档集/示范应用集/示范应用-1/采用-javascript-与-sass-编写/](./文档集/示范应用集/示范应用-1/采用-javascript-与-sass-编写/)》。

-----


## 应用编程接口（API）

### 完整应用示例，以便速查

```html
<template>
    <WlcEcharts
        class="my-echarts"
        :echarts-creatror="echarts官方代码曝露的工厂函数"
        :should-transfer-echarts4-events="false"
        :should-manually-refresh-echarts="false"
        :should-not-watch-echarts-options-deeply="false"
        :should-not-auto-resize-echarts="false"
        :echarts-theme="你的eCharts主题名称或主题配置对象"
        :echarts-initialization-options="null"
        :echarts-options="你的eCharts配置项"
        :echarts-grouping-name="该eCharts实例参与图表成组时的【组名称】"
        :echarts-resizing-debouncing-interval="200"
        @echart-instance-created="handleEchartInstanceCreation"
        @echart-instance-disposed="handleEchartInstanceDisposion"
        @resized="handleEchartInstanceResizing"
    >
    </WlcEcharts>
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




### 输入项（即 Vuejs 部件的 Props）

#### 输入项 `echartsCreator`

```ts
echartsCreator: Function;
```

葫芦串（所谓 kebab）记法：`echarts-creator`。

本部件自 `v0.3.0-beta7` 始，**故意不再包含 echarts**。故使用本部件须另行引入 echarts 本身，并将 echarts 的**工厂函数**经由本部件的 “`echartsCreator`” 接口项，以代入本部件。**该项为必须项，故无默认值为。**


#### 输入项 `shouldTransferEcharts4Events`

```ts
shouldTransferEcharts4Events?: boolean;
```

葫芦串（所谓 kebab）记法：`should-transfer-echarts4-events`。

默认值为 `undefined`，于是默认功效等同于取 `false`。

本部件在每次构建内嵌之 echarts 实例对象伊始，都会成批接管该 echarts 实例对象的各种事件，并以同名的 Vue 部件事件对外开放。不妨暂称这种做法为“事件传递”或“事件穿透”。

然而，自本部件之 `v1.0.0` 版本始，默认仅传递 echarts 5 推荐采用的各种 echarts 实例事件（不妨称“新种类的事件”），并不传递 echarts 4 特有的、且被废弃的事件（不妨称“旧总类事件”）。若该值取 `true`，则本部件不但会传递 echart 实例对象的新种类的事件，同时也会传递其旧种类的事件。


#### 输入项 `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean;
```

葫芦串（所谓 kebab）记法：`should-manually-refresh-echarts`。

默认值为 `undefined`，于是默认功效等同于取 `false`。

若取 `true`，则即使该 Vuejs 2.x 部件之输入之 `echartsOptions` 有所变化，部件内部的 eCharts 实例亦不会重绘，而是等待部件外部代码“人为”调用本部件实例的 `refreshECharts` 方法。



#### 输入项 `shouldNotWatchEchartsOptionsDeeply`

```ts
shouldNotWatchEchartsOptionsDeeply?: boolean;
```

葫芦串（所谓 kebab）记法：`should-not-watch-echarts-options-deeply`。

默认值为 `undefined`，于是默认功效等同于取 `false`。



#### 输入项 `shouldNotAutoResizeEcharts`

```ts
shouldNotAutoResizeEcharts?: boolean;
```

葫芦串（所谓 kebab）记法：`should-not-auto-resize-echarts`。

默认值为 `undefined`，于是默认功效等同于取 `false`。

当 eCharts 之容器 DOM 的尺寸变化时，如果允许（默认即允许）eCharts 自动重绘，则会使 eCharts 的画面总是自动充满 echarts 的外层容器，既不被裁剪，也不留有多余的空白。而允许自动重绘与否，则取决于该输入项（即指 `shouldNotAutoResizeEchart` ），其取`falsy` 值，则代表允许 eCharts 在容器尺寸变更时自动重绘；反之。




#### 输入项 `echartsInitializationOptions`

```ts
echartsInitializationOptions?: EchartsInitializationOptions;
```

葫芦串（所谓 kebab）记法：`echarts-initialization-options`。

默认值为 `undefined`。

参阅 《[eCharts 文档的相关部分](https://echarts.apache.org/zh/api.html#echarts.init)》。




#### 输入项 `echartsOptions`

```ts
echartsOptions?: EChartOption;
```

葫芦串（所谓 kebab）记法：`echarts-options`。

默认值为 `undefined`。

参阅 《[eCharts 文档的相关部分](https://echarts.apache.org/zh/option.html)》。




#### 输入项 `echartsGroupingName`

```ts
echartsGroupingName?: string;
```

葫芦串（所谓 kebab）记法：`echarts-grouping-name`。

默认值为 `undefined`。

参阅《[eCharts 文档的相关部分](https://echarts.apache.org/zh/api.html#echartsInstance.group)》。




#### 输入项 `echartsResizingDebouncingInterval`

```ts
echartsResizingDebouncingInterval?: number;
```

葫芦串（所谓 kebab）记法：`echarts-resizing-debouncing-interval`。

当 eCharts 之外层容器之尺寸变化时，echarts 可能自动重绘。重绘与否取决于名为 `shouldNotAutoResizeEchart` 的
输入项（见上文）。如果用户正在交互式的动态改变 eCharts 容器之尺寸，那么毫无疑问，eCharts
须在交互过程中反复重绘多次，以使得 eCharts 是在视觉上尺寸总是瞬时跟随容器变化。然而，反复重绘
eCharts 的代价可能很大，于是本部件借助 `lodash.debounce` 来“减缓” eCharts 重绘之步调。该参数（指
`echartsResizingDebouncingInterval`）即是 `debounce` 触发重绘动作之时间间隔，单位是毫秒。取值不允许小于
`10`。默认值为 `200`。



#### 输入项 `echartsTheme`

```ts
echartsTheme?: EChartsTheme;
```

葫芦串（所谓 kebab）记法：`echarts-theme`。

默认值为 `undefined`。

或为 eCharts 的主题名称字符串；或为完整的 eCharts 主题定义对象。

参阅 eCharts 文档的相关部分：

- [预先设计好一个主题对象，并向 eCharts 注册该主题对象之名称](https://echarts.apache.org/zh/api.html#echarts.registerTheme)。
- [官方主题构建工具](https://echarts.baidu.com/theme-builder/)。




### 主动数据（即 Vuejs 部件实例的 `data`）

#### 主动数据: `name`

```ts
public readonly name: string = 'wlc-echarts-vue-two-component';
```

为本部件之名称。该值视为只读属性，取值为 `'wlc-echarts-vue-two-component'`。




#### 主动数据: `chart`

```ts
public chart: ECharts | null = null
```

或为本部件业已构建、正在使用的 eCharts 实例对象；或为 `null` 值。



#### 主动数据: `namesOfAllHandledEchartsEvents`

```ts
public namesOfAllHandledEchartsEvents: 范_Echarts实例_可穿透本部件之事件之名称列表 = []
```

该值受输入项 `shouldTransferEcharts4Events` 左右。若 `shouldTransferEcharts4Events` 等效为真（`true`），则该值为所有 Echarts 4 和 Echarts 5 之实例对象之事件名称之**并集**；否则，该值为 Echarts 5 之实例对象之事件名称之列表，本质上为一个字符串列表，但须注意其类型不是 `string[]`， 而是 `范_Echarts实例_可穿透本部件之事件之名称列表`。







### 衍生数据（即 Vuejs 所谓计算属性 `computed`）

本 Vue 部件的衍生数据均采用【取值器】（getters）之写法，

与衍生数据相关的源代码片段如下：

```ts
export default class WlcEchartsVueTwoComponent extends Vue {
    // ......

    public get echartWidth (): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getWidth()
    }

    public get echartHeight (): number {
        const { chart } = this
        if (!chart) { return NaN }
        return chart.getHeight ()
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



### 本部件公开的方法函数

本 Vue 部件成其为 Vue 部件，即使得采用本部件之程序很少有必要调用本部件之方法。换言之，下列方法函数虽是公开的，诸君日常却不太可能用到。


#### 方法函数 `refreshECharts`

强制 eCharts 实例重绘一次。

```ts
public refreshECharts (shouldNotMerge?: boolean, shouldMakeUpdateLaze?: boolean): void;
```






#### ~~方法函数 `updateECharts`~~ （已弃用）

强制 eCharts 实例重绘一次。

> 该方法函数为 `refreshECharts` 之别名，并已弃用。请改用新名称 `refreshECharts`。

```ts
// 已弃用。
public updateECharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```







### 存在于本部件但不建议调用的方法函数

以下方法函数本质上仍然是“公开”的。但它们均在本部件中被其余代码按需调用，**部件之用户一般无需亲自调用它们**。为区别，以下方法函数之名称均冠以“美元符号”，即“`$`”。



#### 方法函数 `$rehandleAllEchartsEvents`

```ts
private $rehandleAllEchartsEvents (): void
```

每当主动数据 `namesOfAllHandledEchartsEvents` 之值变动后，该方法函数会自动运行。



#### 方法函数 `$startListeningToAllEChartsEvents`

```ts
private $startListeningToAllEChartsEvents (): void
```




#### 方法函数 `$stopListeningToAllEChartsEvents`

```ts
private $stopListeningToAllEChartsEvents (
    oldListOfNamesOfHandledEvents: 范_Echarts实例_可穿透本部件之事件之名称列表
): void
```




#### 方法函数 `$updateResizingDebouncingInterval`

```ts
private $updateResizingDebouncingInterval (newInterval?: number): void
```





#### 方法函数 `$enableAutoResizing`

> 注意： v0.1.0 版中层将其命名为未冠以美元符号的 `enableAutoResizing`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
private $enableAutoResizing (): void
```





#### 方法函数 `$disableAutoResizing`

> 注意： v0.1.0 版中曾将其命名为未冠以美元符号的 `disableAutoResizing`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
private $disableAutoResizing (): void
```





#### 方法函数 `$resize`

```ts
private $resize (): void
```






#### 方法函数 `$createEchartInstance`

```ts
private $createEchartInstance (): void
```





#### 方法函数 `$disposeEchartInstance`

```ts
private $disposeEchartInstance (): void
```




#### 方法函数 `$recreateEChartInstance`

```ts
private $recreateEChartInstance (): void
```



#### ~~方法函数 `$dispose`~~ （已弃用）

```ts
// 已弃用。
private $dispose (): void
```

> 该方法函数为 `$disposeEchartInstance` 之别名，并已弃用。请改用新名称 `$disposeEchartInstance`。
> 另，本部件之 v0.1.0 版中曾将其命名为未冠以美元符号的 `dispose`。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称（指 `dispose`）已经不可使用。






#### ~~方法函数 `$recreateEChart`~~ （已弃用）

```ts
// 已弃用。
private $recreateEChart (): void
```

> 该方法函数为 `$recreateEChartInstance` 之别名，并已弃用。请改用新名称 `$recreateEChartInstance`。




### 从 eChart 实例对象上映射至本部件实例的同名方法函数

仿照《[vue-echarts](https://github.com/ecomfe/vue-echarts/)》之做法，本部件亦将 eChart 实例对象上的诸多方法映射为本 Vuejs 部件上的同名方法。**但我猜测我们鲜有机会调用这些方法。换言之，它们形同摆设。**

每一段映射代码均非常简短，有兴趣不妨查阅源代码。

已映射的同名方法函数如下：

```ts
function dispatchAction (payload: object): void
```

```ts
function resize (
    resizingOptions?: EChartsResizeOption
): void
```

```ts
function convertToPixel (
    finder: EChartsConvertFinder,
    value: string | any[]
): string | any[]
```

```ts
function convertFromPixel (
    finder: EChartsConvertFinder,
    value: any[] | string
) : any[] | string
```

```ts
function containPixel (
    finder: EChartsConvertFinder,
    value: any[]
): boolean
```

```ts
function showLoading (
    type?: string,
    options?: EChartsLoadingOption
): void
```

```ts
function hideLoading (): void
```

```ts
function getDataURL (options: {
    type?: string,
    pixelRatio?: number,
    backgroundColor?: string,
    excludeComponents?: string[]
}): string
```

```ts
function getConnectedDataURL (options: {
    type: string,
    pixelRatio: number,
    backgroundColor: string,
    excludeComponents?: string[]
}): string
```

```ts
function appendData (options: {
    seriesIndex?: string,
    data?: any[] | TypedArray,
}): void
```

```ts
function clear (): void
```




### 事件

#### 本 Vue 部件所谓“原发”的 Vue 事件

##### `resized`

处理函数入口参数：无。

顾名思义。



##### `echart-instance-created`

处理函数入口参数：eCharts 实例对象。

每当创建好一个 eCharts 实例对象后，本部件对外界发起一次该事件。

> 注意：如果某些因素的变动引发本部件销毁旧有 eCharts 实例对象并重新构建一个 eCharts 实例对象，该事件会再次发起。



##### `echart-instance-disposed`

处理函数入口参数：无。

每当销毁一个 eCharts 实例对象后，本部件对外界发起一次该事件。


#### 从 eCharts 实例传递的事件

从略。



-----

## 未来计划

暂无。


-----

## 许可证类型

WTFPL

> ### 注意：
>
> 我未研究过许可证的约束。因此姑且声明为 WTFPL 类型。但实际上该许可证类型可能与我采用的开源模块有冲突。



