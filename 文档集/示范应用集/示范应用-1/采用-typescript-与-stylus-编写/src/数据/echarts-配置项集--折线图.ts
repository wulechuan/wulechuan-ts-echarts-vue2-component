import { EChartsOption } from 'echarts'

export const echarts之配置项集: EChartsOption = {
    xAxis: {
        type: 'category',
        data: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ],
    },
    yAxis: {
        type: 'value',
    },
    series: [{
        data: [ 820, 932, 901, 934, 1290, 1330, 1320 ],
        type: 'line',
    }],
}
