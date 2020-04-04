<template>
    <div class="page-with-an-echart">
        <h2>下方图表之源代码中引入的是 index.vue，其中的脚本块采用 JavaScript 书写。</h2>
        <p>{{ message }}</p>
        <div class="echarts-container">
            <vue-echarts
                class="my-echarts"
                :echarts-options="echartsOptions"
                :echarts-resizing-debouncing-interval="resizingInterval"
            ></vue-echarts>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component/javascript/index.vue'

import echartsOptions from '../data/echarts-options--line'

export default {
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
            message: '目前，eCharts 的尺寸变更的刷新频度为默认值（0.2 秒每次）。稍后将故意改变该值。',
            resizingInterval: NaN,
            echartsOptions,
        }
    },
    mounted: function () {
        setTimeout(() => {
            this.message = '已经故意将 eCharts 的尺寸变更的刷新频度调整为 2 秒每次。'
            this.resizingInterval = 2000
        }, 5000)
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
