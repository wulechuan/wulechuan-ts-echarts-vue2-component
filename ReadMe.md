# 吴乐川的适配 Vuejs 2 的 eCharts “包裹”部件

<link rel="stylesheet" href="./node_modules/@wulechuan/css-stylus-markdown-themes/源代码/发布的源代码/文章排版与配色方案集/层叠样式表/wulechuan-styles-for-html-via-markdown--vscode.default.min.css">


> 中国人——特别是汉族人，理应坚持广泛、规范地使用汉语。凡非必要之情形不说外国话、不用外国字。此乃天经地义！然则每当必要，亦不排斥采用外国之语言。不妨 **博世界之学问，养中国之精神** 。
>
> 本人亦支持少数民族坚持采用自己民族的传统语言。仍须强调，凡中国人，皆应会用汉语、积极使用汉语，此乃中华各民族之大一统之必由。





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




## 源代码仓库

| <span style="display:inline-block;width:180px;">提供仓库服务之组织</span> | <span style="display:inline-block;width:150px;">仓库组织之国别</span> | 仓库地址 |
| ------------- | :----------: | ------- |
| 码云           | 中华人民共和国 | [https://gitee.com/nanchang-wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://gitee.com/nanchang-wulechuan/wulechuan-typescript-echarts-vue2-component.git) |
| 阿里云之代码仓库 | 中华人民共和国 | [https://code.aliyun.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://code.aliyun.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git) |
| GitHub         | 美           | [https://github.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git](https://github.com/wulechuan/wulechuan-typescript-echarts-vue2-component.git) |





## 简介

### 功用

本工具系一个 Vuejs 2.x 之部件（外国话所谓 component）其中“包裹”着单个 [eCharts](https://echarts.apache.org/zh/index.html) 实例。本工具可助程序员在遵循 Vuejs 框架的编程环境中较简便可靠地采用 eCharts 图表。

> 本工具理论上也适用于 Vuejs 3.x ，但未验证。

亮点功能

1.  默认令 eCharts 图表占据之区域即时响应图表排版容器尺寸之变动，以期总是自动恰好填满排版容器。
2.  同时支持 TypeScript 和 JavaScript 语言。
3.  较为完善的【事件】（Events）集。

### 由来

本工具系本人受到他人早先撰写的已有项目《[vue-echarts](https://www.npmjs.com/package/vue-echarts)》启发而自做的。

当时的（旧） vue-echarts 并不支持 TypeScript 语法。而本人所写的该工具则增补了这一特性。如今，晚近版本的 vue-echarts 也对 TypeScript 提供了不错的支持。

-----


## 重要版本

-   2022 年 4 月 29 日， `v1.0.0` 版。

    1.  已完善对 echarts 版本 5 的支持。
    1.  虽主体代码——即本部件之类（class）之定义——并未汉化，但“周边”各类型（type）之定义已悉数汉化。暂不汉化其类（class），是为了姑且保证应用编程接口无重大变化。

        > 已有意图在下一版本（理应为 2.0.0 版）令接口彻底抛弃外国语。但无具体计划。

-   2022 年 5 月 4 日， `v1.2.0` 版。

    1.  将输入项 `echartsCreator` 更名为 `echartsModuleExportsRoot` 。旧名称仍然保留，以确保向下兼容性。

    1.  若干方法函数中的 `ECharts` 字样统一修改为 `Echarts` 字样，**其中的字母 c 已改为小写。** 其中，

        -   凡更名的**私有**方法函数**均激进的删除了旧名称的版本，仅保留新名称的版本。**
        -   而**公开**的方法函数（目前实际上仅有一个）则同时保留了新旧两种名称的版本，以确保向下兼容性。


    1.  找回了 `v1.0.x`、`v1.1.x` 中缺失的对 ZRender 事件的穿透功能。

    1.  增添了名为 `shouldTransferEventOfEchartsRendered` 的输入项。

    1.  增添了名为 `shouldTransferEventsOfZrender` 的输入项。


-----

## 用法

### 安装

须**同时**安装本部件和 eCharts 二者。如下：


```bash
npm  i  @wulechuan/echarts-vue2-component  echarts
```



### 在编程源代码中使用本工具

#### 模板和样式表配合使用的示范

##### 模板

```html
<template>
    <WlcEcharts
        class="my-echarts-001-in-vuejs"
        :echarts-module-exports-root="eCharts模块导出之根"
        :echarts-options="你构造的Echarts配置项集"
    ></WlcEcharts>
</template>
```


##### 样式表

```css
<style>
    .my-echarts-001-in-vuejs {
        width:  790px;
        height: 515px;
        background-color: white;
    }
</style>
```

##### 注意事项

> 本部件故意**未携带任何样式表（即外国话所谓 CSS）代码**。亦不携带任何【**样式类名**】（外国话所谓“ CSS Class Name”）。故本部件构造的根【文档对象】（Document Object）是**不具备明确宽高尺寸的。**
>
> 而众所周知，eCharts 部件要求其容器有明确的宽、高配置。因此，**不要忘记借助样式表代码来定义本部件根【文档对象】的宽、高。**
>
> 另，一般的，我们会借助【**样式类名**】来达到该目的，一如上例。参阅上例的 `<style>` 代码。


#### 脚本语言编程时采用本工具的示范

本节之主体分为两小节：《[采用 TypeScript 语言编程的示范](#%E9%87%87%E7%94%A8%20TypeScript%20%E8%AF%AD%E8%A8%80%E7%BC%96%E7%A8%8B%E7%9A%84%E7%A4%BA%E8%8C%83)》和《[采用 JavaScript 语言编程的示范](#%E9%87%87%E7%94%A8%20JavaScript%20%E8%AF%AD%E8%A8%80%E7%BC%96%E7%A8%8B%E7%9A%84%E7%A4%BA%E8%8C%83)》。而在这两小节之前，还有《[无关乎编程语言的公共注意事项](#无关乎编程语言的公共注意事项)》一节。

##### 无关乎编程语言的公共注意事项

###### 在你的 npm 项目中须另行引入 echarts 本身

本部件自 `v0.3.0-beta7` 版始，**故意不再包含 echarts**。故使用本部件须另行引入 echarts 本身，并将 echarts 的**模块导出之根**经由本部件的 “`echartsCreator`” 输入项代入本部件。

本部件自 `v1.2.0` 版始，输入项 `echartsCreator` 已更名为 `echartsModuleExportsRoot` 。故使用本部件须另行引入 echarts 本身，并将 echarts 的【**模块导出之根**】经由本部件的 “`echartsModuleExportsRoot`” 输入项代入本部件。

###### 导入 ECharts 时之通用优化做法

在你的应用代码中**一股脑引入整个 echarts**（如下例）虽然简便易行，但会造成最终打包的应用较大。

```js
import * as echarts from 'echarts'
```


如果在你的应用中已知仅需采用 echarts 之少许功能，不须囊括完整的 echarts ，那么，为节省你的应用引入的代码量，从而减小最终打包的应用之字节数，应借鉴下方写法之思路：

```js
// 注意下方的导入源包含 “ /core ” 字样。
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
    LineChart,       // 此乃按需索取之项。
    GridComponent,   // 此乃必须项。切勿省略。
    EchartsRenderer, // 此乃必须项。切勿省略。
])
```

参阅：官方文档《[在打包环境中使用 ECharts](https://echarts.apache.org/zh/tutorial.html#在打包环境中使用%20ECharts)》的《**按需引入 ECharts 图表和部件**》一节。


##### 采用 TypeScript 语言编程的示范



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
    echartsModuleExportsRoot = echarts
    echartsOptions = {
        xAxis: {
            type: 'category',
            data: [ '一', '二', '三', '四', '五', '六', '日' ],
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


> ###### 注意 1
>
> 采用本 Vuejs 部件之 TypeScript 语言写就之版本时，应用代码中的 `import` 语句的 `from` 不妨明确指向\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/typescript/index.ts` 这一文件。
>
> 其实指向 “ *npm 模块 id* ”（即 `@wulechuan/echarts-vue2-component`）也无妨。只是，如此一来，你的 TypeScript 程序利用的是本部件的 JavaScript 版本的代码与 types 类型声明之组合，而非利用原版的 TypeScript 代码。**殊途同归。**



> ###### 完整示范
>
> 见本项目自带的可运转的示范项目《[./文档集/示范应用集/示范应用-1/采用-typescript-与-stylus-编写/](./文档集/示范应用集/示范应用-1/采用-typescript-与-stylus-编写/)》。


##### 采用 JavaScript 语言编程的示范



```js
import WlcEcharts from '@wulechuan/echarts-vue2-component'

import * as echarts from 'echarts' // 为简便，故意未采用优化方案。

export default {
    name: 'WlcEcharts部件应用示范',
    components: {
        WlcEcharts,
    },
    data: function () {
        return {
            echartsModuleExportsRoot: echarts,
            echartsOptions: {
                xAxis: {
                    type: 'category',
                    data: [ '一', '二', '三', '四', '五', '六', '日' ],
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



> ###### 注意 2
>
> 采用本部件之 JavaScript 语言写就之版本时，在所谓“外部”的应用代码中，用以引入本部件之 `import` 语句的 `from` 应指向 “ *npm 模块 id* ”（即 `@wulechuan/echarts-vue2-component`）。其本质上是凭借本 npm 包的 `package.json` 中的 `main` 字段，找到\
> `@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.js` 这一文件。
>
> **但是，上述两种 `import` 之写法并非完全等价，而是有些许不同**。若采取引入 *npm 模块 id* 之写法，不光可以获得所谓“核心”的类（class）、常量等，还额外获得一个“隐式的” TypeScript 【名称空间】（namespace）。而引入纯 JavaScript 语言版本的 `index.js` 文件则不可能获得那样的【名称空间】。由此，倘若引入的是 `……/javascript/index.js` 文件，你的编程环境可能缺失部分类型定义，进而你的编程工具会缺少部分的【类型推断】和【代码提示】功能。
>
> 总之，**应当这样**：
>
> ```js
> import WlcEcharts from '@wulechuan/echarts-vue2-component'
> ```
>
> 而不应这样：
>
> ```js
> import WlcEcharts from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.js'
> ```

> ###### 完整示范
>
> 见本项目自带的可运转的示范项目《[./文档集/示范应用集/示范应用-1/采用-javascript-与-sass-编写/](./文档集/示范应用集/示范应用-1/采用-javascript-与-sass-编写/)》。

-----


### 应用编程接口（API）

#### 完整应用示例，以便速查

```html
<template>
    <WlcEcharts
        class="my-echarts-002-in-vuejs"

        :echarts-module-exports-root="eCharts模块导出之根"
        :echarts-initialization-options="采用官方_init_工厂函数构造eCharts实例时用的配置项集"
        :echarts-grouping-name="eCharts实例参与图表成组时的【组名称】"
        :echarts-theme="eCharts实例需采用的eCharts主题名称字符串或主题配置对象"
        :echarts-options="eCharts实例中一切图表的配置项"

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
    >
    </WlcEcharts>
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




#### 输入项（即 Vuejs 部件的 Props）



##### 输入项 `echartsModuleExportsRoot`

```ts
echartsModuleExportsRoot: typeof echarts
```

葫芦串（所谓 kebab）记法： `echarts-module-exports-root` 。

本部件自 `v0.3.0-beta7` 版始，**故意不再包含 echarts**。故使用本部件须另行引入 echarts 本身，并将 echarts 的【**模块导出之根**】经由本部件的 “`echartsCreator`” 输入项代入本部件。

又，本部件自 `v1.2.0` 版始，输入项 `echartsCreator` 已更名为 `echartsModuleExportsRoot` 。故请将 echarts 的【**模块导出之根**】经由本部件的 “`echartsModuleExportsRoot`” 输入项代入本部件。





##### ~~输入项 `echartsCreator`~~ （已弃用）

```ts
// 该项已弃用。
echartsCreator: typeof echarts
```

葫芦串（所谓 kebab）记法： `echarts-creator` 。


**该项因命名有误导性而弃用。请改用上文的 `echartsModuleExportsRoot` 。**





##### 输入项 `echartsInitializationOptions`

```ts
// echartsInitializationOptions?: Parameters<echarts.init>[2]
echartsInitializationOptions?: 范_Echarts工厂函数之配置项集
```

葫芦串（所谓 kebab）记法： `echarts-initialization-options` 。

默认值为 `undefined`。

> 于该项之 TypeScript 之类型定义，我并未采用 `Parameters<echarts.init>[2]` 的写法，而是采用了我手工复刻之得到的名为 `范_Echarts工厂函数之配置项集` 的类型。原因是官方的 `echarts.init` 之类型定义的第三位参数带有问号 `?`，故而这个参数的类型“参杂”了 `undefined` 。

参阅 《[eCharts 文档的相关部分](https://echarts.apache.org/zh/api.html#echarts.init)》。





##### 输入项 `echartsGroupingName`

```ts
echartsGroupingName?: string
```

葫芦串（所谓 kebab）记法： `echarts-grouping-name` 。

默认值为 `undefined`。

参阅《[eCharts 文档的相关部分](https://echarts.apache.org/zh/api.html#echartsInstance.group)》。





##### 输入项 `echartsTheme`

```ts
echartsTheme?: 范_Echarts配色方案之配置
```

葫芦串（所谓 kebab）记法： `echarts-theme` 。

默认值为 `undefined`。

或为 eCharts 的主题名称字符串；或为完整的 eCharts 主题定义对象。

> 目前，eCharts 官方代码中并没有完备的 eCharts 主题之类型定义（TypeScript type）。我手工仿制的类型定义（名为“`范_Echarts配色方案之配置`”）也是不完备的。

> 参阅 eCharts 文档的相关部分《[预先设计好一个主题对象，并向 eCharts 注册该主题对象之名称](https://echarts.apache.org/zh/api.html#echarts.registerTheme)》。

> 另，推荐各位试一试 eCharts 官方提供的 [《eCharts 主题构建工具》](https://echarts.baidu.com/theme-builder/)。





##### 输入项 `echartsOptions`

```ts
echartsOptions?: EChartsOption
```

葫芦串（所谓 kebab）记法： `echarts-options` 。

默认值为 `undefined`。

参阅 《[eCharts 文档的相关部分](https://echarts.apache.org/zh/option.html)》。





##### 输入项 `shouldManuallyRefreshEcharts`

```ts
shouldManuallyRefreshEcharts?: boolean
```

葫芦串（所谓 kebab）记法： `should-manually-refresh-echarts` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。

若取 `true`，那么即便本部件之输入项 `echartsOptions` 发生变化，本部件内部的 eCharts 实例亦不会重绘。除非所谓“外部”代码随后明确调用本部件的 `refreshECharts` 方法函数。





##### 输入项 `shouldNotWatchEchartsOptionsDeeply`

```ts
shouldNotWatchEchartsOptionsDeeply?: boolean
```

葫芦串（所谓 kebab）记法： `should-not-watch-echarts-options-deeply` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。





##### 输入项 `shouldNotAutoResizeEcharts`

```ts
shouldNotAutoResizeEcharts?: boolean
```

葫芦串（所谓 kebab）记法： `should-not-auto-resize-echarts` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。

每当 eCharts 之容器的尺寸变化时，如果允许 eCharts 自动重绘，则可令 eCharts 图表的幅面总是自动充满 echarts 的【根容器】，既不被裁剪，也不留有多余的空白。而允许自动重绘与否，则取决于该输入项（即指 `shouldNotAutoResizeEchart` ），其取`falsy` 值，则代表允许 eCharts 在容器尺寸变更时自动重绘；反之。**可见，本部件默认即是允许其内的 eCharts 之幅面自动跟随其容器变化的。**





##### 输入项 `echartsResizingDebouncingInterval`

```ts
echartsResizingDebouncingInterval?: number
```

葫芦串（所谓 kebab）记法： `echarts-resizing-debouncing-interval` 。

当 eCharts 之外层容器之尺寸变化时，echarts 可能自动重绘。重绘与否取决于名为 `shouldNotAutoResizeEchart` 的输入项（见上文）。如果用户交互式地动态改变 eCharts 容器之尺寸，那么 eCharts 无疑须在交互过程中反复重绘多次，以使得 eCharts 图表之尺寸总是瞬时跟随容器变化。

然而，重绘 eCharts 的代价可能很大。须反复重绘时，若重绘发生的频度过高，则浏览器可能不堪重负，用户在网页中会体验卡顿。于是本部件借助知名的 `lodash.debounce` 工具来“减缓” eCharts 重绘之步调。即由 `lodash.debounce` 来调用本部件内部的真实重绘动作函数。

当 `lodash.debounce` 工具反复调用本部件内部的真实重绘动作函数时，该参数（即指 `echartsResizingDebouncingInterval`）之值决定着 `lodash.debounce` 工具调用重绘函数之时间间隔。

该值之单位是**毫秒**。值不允许小于 `10`。默认值为 `200`。





##### 输入项 `shouldTransferEcharts4Events`

```ts
shouldTransferEcharts4Events?: boolean
```

葫芦串（所谓 kebab）记法： `should-transfer-echarts4-events` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。

ECharts 实例对象会像外界发布各种事件，不妨统称为“*eCharts 实例事件*”，或简称“*实例事件*”。

本部件在每次构建内嵌之 echarts 实例对象伊始，都会成批接管该 echarts 实例的*实例事件*，并以**同名**的 *Vue 部件事件* 传导式地对外发布这些*实例事件*。不妨暂称这种做法为“**事件传递**”或“**事件穿透**”。

本部件之早期版本（`v0.x.x`）虽然也能套用后来诞生的 eCharts 5，但其当时主要针对 eCharts 4 编写，故本部件之早期版本会传递 eCharts 4 实例的所有事件。

然而， eCharts 5 之实例事件与 eCharts 4 有差异也有“重叠”。相较 eCharts 4 而言，eCharts 5 新添了一些实例事件，亦弃用了一些实例事件。不妨暂且将 eCharts 5 实例采用的所有事件统称为所谓“*实例的新种类事件*”。而将 eCharts 4 **特有的**、或者说已被 eCharts 5 视为“应被废弃”的事件统称为“*实例的旧种类事件*”。

本部件自 `v1.0.0` 版本始，默认仅传递 eCharts 5 的*实例的新种类事件*，并不传递*实例的旧种类事件*。倘若该值取 `true`，则本部件不但会传递 echart 实例对象的*实例的新种类事件*，同时也会传递其*旧种类的事件*。

> 顺便指出， eCharts 5 之实例仍支持上文所谓*实例的旧种类事件*，但会在浏览器控制台给出警告。

本输入项（即指 `shouldTransferEcharts4Events`）为 `false` 时，则仅穿透上文所谓*实例的新种类事件*；为 `true` 时，则一并穿透新、旧两类事件。

另，本输入项之取值若动态变化，那么本部件所穿透的事件种数也会随之变化。换言之，**本部件向外穿透的事件之多寡，并非在本部件构建伊始确定好就一成不变了，而是可以跟随本输入项之值而变化。**





##### 输入项 `shouldTransferEventOfEchartsRendered`

```ts
shouldTransferEventOfEchartsRendered?: boolean
```

葫芦串（所谓 kebab）记法： `should-transfer-event-of-echarts-rendered` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。

ECharts 的诸种事件中，名为 `rendered` 的一类事件触发极为频繁。且多数情形并不实用。为节省开销，本部件允许外界决定是否接管此种事件。默认为**不接管**此种事件。




##### 输入项 `shouldTransferEventsOfZrender`

```ts
shouldTransferEventsOfZrender?: boolean
```

葫芦串（所谓 kebab）记法： `should-transfer-events-of-zrender` 。

默认值为 `undefined`，于是默认功效等同于取 `false`。

ECharts 的幕后渲染引擎系名为 *ZRender* 的独立工具。ZRender 亦会对外发布诸种事件，且发布之频度极高。又，平时多数情形这些事件并不实用。为节省开销，本部件允许外界决定是否接管 ZRender 的任何事件。默认为**不接管**任何 ZRender 之事件。





#### 主动数据（即 Vuejs 部件实例的 `data`）

##### ~~主动数据: `name`~~ （已废弃并从代码中删除）

```ts
// 该项已废弃并从代码中删除。
public readonly name: string = 'wlc-echarts-vue-two-component'
```

~~为本部件之名称。该值视为只读属性，取值为 `'wlc-echarts-vue-two-component'`。~~




##### 主动数据: `chart`

```ts
public chart: EChartsType | null = null
```

或为本部件业已构建、正在使用的 eCharts 实例对象；或为 `null` 值。



##### 主动数据: `namesOfAllHandledEchartsEvents`

```ts
public namesOfAllHandledEchartsEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例 = []
```

该值受到输入项 `shouldTransferEcharts4Events` 和输入项 `shouldTransferEventOfEchartsRendered` 的共同左右。

-   若 `shouldTransferEcharts4Events` 等效为真（`true`），则该值为所有 eCharts 4 和 Echarts 5 之实例对象之事件名称之**并集**；否则，该值为 eCharts 5 之实例对象之事件名称之列表。
-   若 `shouldTransferEventOfEchartsRendered` 等效为真（`true`），则穿透之事件列表中将包含 `'rendered'` 一项；反之。

> 须注意，尽管该值本质上为一个字符串列表，但其类型**不是 `string[]`**， 而是 `范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例`。







#### 衍生数据（即 Vuejs 所谓计算属性、`computed`）

本部件的衍生数据均采用【取值器】（外国话所谓 getters）之写法。与衍生数据相关的源代码片段如下：

```ts
export default class WlcEchartsVueTwoComponent extends Vue {
    // ……

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

    public get echartComputedOptions (): null | EChartsCoreOption {
        const { chart } = this
        if (!chart) { return null }
        return chart.getOption()
    }

    // ……
}
```



#### 本部件公开的方法函数

本 Vuejs 部件既然成其为 Vuejs 部件，意味着采用本部件之程序很少有必要调用本部件之方法。换言之，下列方法函数虽是公开的，诸君日常却不太可能用到。


##### 方法函数 `refreshEcharts`

强制 eCharts 实例重绘一次。

```ts
public refreshEcharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```



##### ~~方法函数 `refreshECharts`~~ （已弃用）

~~强制 eCharts 实例重绘一次。~~

> 该方法函数之名称中采用了大小的字母 “C”，已弃用。其可视作 `refreshEcharts` 方法函数之别名（其中的字母 “c” 为小写）。推荐改用 `refreshEcharts`。

```ts
// 该【别名】已弃用。
public refreshECharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```






##### ~~方法函数 `updateECharts`~~ （已弃用）

~~强制 eCharts 实例重绘一次。~~

> 该方法函数为 `refreshEcharts` 之别名，且已弃用。请改用新名称 `refreshEcharts`。

```ts
// 该【别名】已弃用。
public updateECharts (
    shouldNotMerge?: boolean,
    shouldMakeUpdateLaze?: boolean
): void;
```







#### 存在于本部件但不建议调用的方法函数

在 JavaScript 语言范畴中，以下方法函数本质上仍然是“公开”的，而在 TypeScript 语言范畴中，这些方法函数是私有的。不妨暂将它们统称为“*私有方法函数*”。

为区别于公开的方法函数，凡私有方法函数之名称均冠以“美元符号”，即“`$`”。

> 须知，虽然在 JavaScript 语言范畴中这些方法函数是可以调用到的，但并不推荐此种做法！





##### 方法函数 `$rehandleAllEchartsEvents`

```ts
private $rehandleAllEchartsEvents (): void
```

每当本部件之主动数据 `namesOfAllHandledEchartsEvents` 之值变动后，该方法函数会自动运行。



##### 方法函数 `$startListeningToAllEchartsEvents`

```ts
private $startListeningToAllEchartsEvents (): void
```

> 自 `v1.2.0` 版始，名称中的 `ECharts` 变更为 `Echarts`，**其中字母 c 已变为小写。**





##### 方法函数 `$stopListeningToAllEchartsEvents`

```ts
private $stopListeningToAllEchartsEvents (
    oldListOfNamesOfHandledEvents: 范_可穿透本部件之事件名称之列表_Echarts_任何版本之实例
): void
```

> 自 `v1.2.0` 版始，名称中的 `ECharts` 变更为 `Echarts`，**其中字母 c 已变为小写。**



##### 方法函数 `$rehandleAllZrenderEvents`

```ts
private $rehandleAllZrenderEvents (): void
```

每当本部件之输入项 `shouldTransferEventsOfZrender` 之值变动后，该方法函数会自动运行。



##### 方法函数 `$startListeningToAllZrenderEvents`

```ts
private $startListeningToAllZrenderEvents (): void
```




##### 方法函数 `$stopListeningToAllZrenderEvents`

```ts
private $stopListeningToAllZrenderEvents (): void
```




##### 方法函数 `$updateResizingDebouncingInterval`

```ts
private $updateResizingDebouncingInterval (
    newInterval?: number
): void
```





##### 方法函数 `$enableAutoResizing`

> 注意： v0.1.0 版中层将其命名为未冠以美元符号的 ~~`enableAutoResizing`~~。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
private $enableAutoResizing (): void
```





##### 方法函数 `$disableAutoResizing`

> 注意： v0.1.0 版中曾将其命名为未冠以美元符号的 ~~`disableAutoResizing`~~。自 v0.2.0 版始，该函数已更名。因此，未冠以美元符号的函数名称已经不可使用。

```ts
private $disableAutoResizing (): void
```





##### 方法函数 `$resize`

```ts
private $resize (): void
```






##### 方法函数 `$createEchartInstance`

```ts
private $createEchartInstance (): void
```





##### 方法函数 `$disposeEchartInstance`

```ts
private $disposeEchartInstance (): void
```

> 自 `v1.2.0` 版始，名称中的 `ECharts` 变更为 `Echarts`，**其中字母 c 已变为小写。**



##### 方法函数 `$recreateEchartInstance`

```ts
private $recreateEchartInstance (): void
```

> 自 `v1.2.0` 版始，名称中的 `ECharts` 变更为 `Echarts`，**其中字母 c 已变为小写。**




##### ~~方法函数 `$dispose`~~ （已弃用）

```ts
// 该方法函数已弃用。
private $dispose (): void
```

~~该方法函数为 `$disposeEchartInstance` 之别名，并已弃用。请改用新名称 `$disposeEchartInstance`。~~

> ~~另，本部件之 `v0.1.0` 版中曾将其命名为未冠以美元符号的 `dispose`。自 `v0.2.0` 版始，该函数已更名。因此，未冠以美元符号的函数名称（指 `dispose`）已经不可使用。~~






##### ~~方法函数 `$recreateEChart`~~ （已弃用）

```ts
// 该方法函数已弃用。
private $recreateEChart (): void
```

~~该方法函数为 `$recreateEchartInstance` 之别名，并已弃用。请改用新名称 `$recreateEchartInstance`。~~




#### 从 eChart 实例对象上映射至本部件实例的同名方法函数

仿照《[vue-echarts](https://github.com/ecomfe/vue-echarts/)》之做法，本部件亦将 eChart 实例对象上的诸多方法映射为本 Vuejs 部件上的同名方法。**但我猜测我们鲜有机会调用这些方法。换言之，私以为它们形同摆设。**

不难想象，每一段映射代码均非常简短。有兴趣不妨查阅源代码。

已映射的同名方法函数如下：

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




#### 事件

##### 本 Vue 部件所谓“原发”的 Vue 事件

###### `resized`

此种事件之处理程序之入口参数：无。

顾名思义。



###### `echart-instance-created`

此种事件之处理程序之入口参数：eCharts 实例对象。

每当创建好一个 eCharts 实例对象后，本部件对外界发布一次该事件。

> 注意：如果某些因素的变动引发本部件销毁旧有 eCharts 实例对象并重新构建一个 eCharts 实例对象，该事件会再次发布。





###### `echart-instance-disposed`

此种事件之处理程序之入口参数：无。

每当销毁一个 eCharts 实例对象后，本部件对外界发布一次该事件。





##### 从 eCharts 实例传递至外界的事件

Charts 实例对象会像外界发布各种事件，不妨统称为“*eCharts 实例事件*”，或简称“*实例事件*”。

本部件在每次构建内嵌之 echarts 实例对象伊始，都会成批接管该 echarts 实例的*实例事件*，并以**同名**的 *Vue 部件事件* 传导式地对外发布这些*实例事件*。不妨暂称这种做法为“**事件传递**”或“**事件穿透**”。

本部件之早期版本（`v0.x.x`）虽然也能套用后来诞生的 eCharts 5，但其当时主要针对 eCharts 4 编写，故本部件之早期版本会传递 eCharts 4 实例的所有事件。

然而， eCharts 5 之实例事件与 eCharts 4 有差异也有“重叠”。相较 eCharts 4 而言，eCharts 5 新添了一些实例事件，亦弃用了一些实例事件。不妨暂且将 eCharts 5 实例采用的所有事件统称为所谓“*实例的新种类事件*”。而将 eCharts 4 **特有的**、或者说已被 eCharts 5 视为“应被废弃”的事件统称为“*实例的旧种类事件*”。

本部件自 `v1.0.0` 版本始，默认仅传递 eCharts 5 的*实例的新种类事件*，并不传递*实例的旧种类事件*。倘若该值取 `true`，则本部件不但会传递 echart 实例对象的*实例的新种类事件*，同时也会传递其*旧种类的事件*。

> 顺便指出， eCharts 5 之实例仍支持上文所谓*实例的旧种类事件*，但会在浏览器控制台给出警告。

> 本人推荐诸位参考本部件文档中随附的示范性项目。本人故意采用两种不同的语言组合来编写改示范：《[采用 JavaScript 和 Sass 语言编写的版本](./%E6%96%87%E6%A1%A3%E9%9B%86/%E7%A4%BA%E8%8C%83%E5%BA%94%E7%94%A8%E9%9B%86/%E7%A4%BA%E8%8C%83%E5%BA%94%E7%94%A8-1/%E9%87%87%E7%94%A8-javascript-%E4%B8%8E-sass-%E7%BC%96%E5%86%99/)》和 《[采用 TypeScript 和 Stylus 语言编写的版本](./%E6%96%87%E6%A1%A3%E9%9B%86/%E7%A4%BA%E8%8C%83%E5%BA%94%E7%94%A8%E9%9B%86/%E7%A4%BA%E8%8C%83%E5%BA%94%E7%94%A8-1/%E9%87%87%E7%94%A8-typescript-%E4%B8%8E-stylus-%E7%BC%96%E5%86%99/)》。两者之样貌、功能完全相同。它们较好地展示了本 Vuejs 部件如何处理其内嵌 eCharts 实例的各种实例事件、乃至 eCharts 幕后的 ZRender 的所有事件。





###### 本部件对外“穿透”的 eCharts 5 实例事件

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

> 其中，于名为 `rendered` 之事件类别，本部件还提供了额外的单独开关项。见上文《[`shouldTransferEventOfEchartsRendered`](#输入项%20shouldTransferEventOfEchartsRendered)》。

> 参阅 eCharts 官方《配置项手册》中《[events](https://echarts.apache.org/zh/api.html#events)》一章。





###### 本部件对外“穿透”的 eCharts 4 特有的实例事件

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

> 参阅 eCharts 官方《使用手册》中《Apache ECharts 5 升级指南》一章中《[不再推荐使用的 API](https://echarts.apache.org/handbook/zh/basics/release-note/v5-upgrade-guide/#%E4%B8%8D%E5%86%8D%E6%8E%A8%E8%8D%90%E4%BD%BF%E7%94%A8%E7%9A%84-api)》一节。





###### 本部件对外“穿透”的 ZRender 特有的事件

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


> ZRender 之诸种事件大都发布极为频繁。又，平时多数情形这些事件并不实用。为节省开销，本部件允许外界决定是否接管 ZRender 的任何事件。见上文《[`shouldTransferEventsOfZrender`](#输入项%20shouldTransferEventsOfZrender)》。

> 参阅 eCharts 官方《使用手册》中《事件与行为》一章中《[监听“空白处”的事件](https://echarts.apache.org/handbook/zh/concepts/event/#%E7%9B%91%E5%90%AC%E2%80%9C%E7%A9%BA%E7%99%BD%E5%A4%84%E2%80%9D%E7%9A%84%E4%BA%8B%E4%BB%B6)》一节。






-----

## 已知问题集

-   2022 年 7 月 4 日。分支 `dev/v1`。

    此时，`v2.0.0` 刚刚在分支 `dev/v2` 发布。

    在构建并发布 `v2.0.0` 之前，原封未动的 `mater` 分支的代码已经变得无法运转了。具体表现为 `npm start` 报错：

    ```bash
    ... A dynamic import callback was not specified.
    ```

    解决此问题之办法：

    - PowerShell: 
        
        ```ps1
        $DISABLE_V8_COMPILE_CACHE=$true
        ```

    - 类 Bash: 
    
        ```bash
        DISABLE_V8_COMPILE_CACHE=true
        ```

    采取上述办法之后，`npm start` 开始报另一种错误，**故仍无法运行**。报错如下：

    ```bash
    TypeError: Invalid host defined options
    ```

    暂无找到解决办法。由于 `master` 分支的代码原封未动也会遭遇上述错误。故怀疑是计算机环境更新了 nodejs 或 npmjs 所致。


-----

## 未来计划

- 令接口汉化，弃用外国语。


-----

## 许可证类型

WTFPL

> ### 注意：
>
> 我未研究过许可证的约束。因此姑且声明为 WTFPL 类型。但实际上该许可证类型可能与我采用的开源模块有冲突。



