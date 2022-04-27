<template>
    <div class="页 示范页1">
        <h2>下方图表之源代码中的脚本块采用 JavaScript 书写。</h2>
        <p>并且仅加载了 echarts/lib/echarts 和 echarts/lib/chart/line。</p>
        <div class="echarts-container">
            <vue-echarts
                class="my-echarts"
                :echarts-creator="echartsCreator"
                :echarts-options="echartsOptions"
            ></vue-echarts>
        </div>
    </div>
</template>

<script>
import EChartsVue2Component from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'

import echartsOptions from '../../数据/echarts-配置项集--折线图'

import * as echarts from 'echarts'
import 'echarts/lib/chart/line'

export default {
    name: 'Page示范页1',
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
            echartsCreator: echarts,
            echartsOptions,
        }
    },
}
</script>

<style lang="scss">
.示范页1 {
    width:  100%;
    height: 100%;
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        margin: 1rem;
        text-align: center;
    }

    .echarts-container {
        flex: 1 1;
        width:  90%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .my-echarts {
        width:  100%;
        height: 100%;
        max-width:  790px;
        max-height: 515px;
        margin: auto;
        background-color: white;
    }
}
</style>
