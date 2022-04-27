<template>
    <div class="页面 页面--示范页1-折线图">
        <!-- <p>仅加载了 echarts/lib/echarts 和 echarts/lib/chart/line。</p> -->
        <div class="echarts-皿">
            <WlcEcharts
                class="echarts-根--某折线图"
                :echarts-creator="echarts之工厂函数"
                :echarts-options="echarts之配置项集"
            ></WlcEcharts>
        </div>
    </div>
</template>

<script>
import WlcEcharts from '@wulechuan/echarts-vue2-component/源代码/发布的源代码/javascript/index.vue'

import { echarts之配置项集 } from '../../数据/echarts-配置项集--折线图'

import * as echarts from 'echarts'
import 'echarts/lib/chart/line'

export default {
    name: 'Page示范页1_Echarts折线图',
    components: {
        WlcEcharts,
    },
    data: function () {
        return {
            echarts之工厂函数: echarts,
            echarts之配置项集,
        }
    },
}
</script>

<style lang="scss">
.页面--示范页1-折线图 {
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

    .echarts-皿 {
        flex: 1 1;
        width:  90%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .echarts-根--某折线图 {
        width:  100%;
        height: 100%;
        max-width:  790px;
        max-height: 515px;
        margin: auto;
        background-color: white;
    }
}
</style>
