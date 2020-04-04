import { EChartOption } from 'echarts'

export default {
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
} as EChartOption
