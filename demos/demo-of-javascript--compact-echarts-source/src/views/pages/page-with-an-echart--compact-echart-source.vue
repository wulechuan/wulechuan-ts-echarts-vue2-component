<template>
    <div class="page-with-an-echart">
        <h2>下方图表之源代码中引入的是 the-wrapper-only.vue，其中的脚本块采用 JavaScript 书写。</h2>
        <p>{{ message }}</p>
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
import Vue from 'vue'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component/dist/javascript/the-wrapper-only.vue'

import echartsOptions from '../data/echarts-options--line'

import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'

export default {
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
            message: '并且仅加载了 echarts/lib/echarts 和 echarts/lib/chart/line。',
            echartsCreator: echarts,
            echartsOptions,
        }
    },
}
</script>

<style lang="stylus">
.page-with-an-echart {
    width  100%
    height 100%
    box-sizing border-box
    padding 30px
    display flex
    flex-direction column
    justify-content center
    align-items center

    p {
        margin 1rem
        text-align center
    }

    .echarts-container {
        flex 1 1
        width  90%
        height 100%
        display flex
        justify-content center
        align-items center
        overflow hidden
    }

    .my-echarts {
        width  100%
        height 100%
        max-width  790px
        max-height 515px
        margin auto
        background-color white
    }
}
</style>
