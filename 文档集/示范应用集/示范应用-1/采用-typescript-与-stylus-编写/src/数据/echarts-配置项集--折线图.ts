import { EChartsOption } from 'echarts'

export const echarts之配置项集: EChartsOption = {
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
