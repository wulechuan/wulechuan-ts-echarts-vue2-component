<template>
    <div class="page-with-an-echart">
        <vue-echarts class="my-echarts" :echarts-options="echartsOptions"></vue-echarts>
    </div>
</template>

<script>
import Vue from 'vue'
import EChartsVue2Component from '@wulechuan/echarts-vue2-component/dist'
export default {
    components: {
        'vue-echarts': EChartsVue2Component,
    },
    data: function () {
        return {
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
</script>

<style lang="stylus">
.page-with-an-echart {

    .my-echarts {
        width 600px
        height 400px
        background-color white
    }
}
</style>
