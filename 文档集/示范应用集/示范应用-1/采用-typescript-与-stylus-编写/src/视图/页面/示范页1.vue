<template>
    <div class="页 示范页1">
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

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import EChartsVue2Component from '@wulechuan/echarts-vue2-component'

import echartsOptions from '../../数据/echarts-配置项集--折线图'

import * as echarts from 'echarts'

@Component({
    components: {
        'vue-echarts': EChartsVue2Component,
    },
})
export default class Page示范页1 extends Vue {
    echartsCreator = echarts
    echartsOptions = echartsOptions
}
</script>

<style lang="stylus">
.示范页1 {
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
