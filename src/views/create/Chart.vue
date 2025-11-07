<template>
    <div class="chart" ref="chartRef">

    </div>
</template>

<script setup lang="ts">
import { apiGet } from '@/utils/request';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chartRef = ref()

const loadData = () => apiGet('/api/token_price_line').then((res:any)=>{
    const myChart = echarts.init(chartRef.value);
    // 格式化日期：将 "2025-11-01" 转换为 "01/11"
    const formattedDates = res.dates.map((date: string) => {
        const parts = date.split('-');
        return `${parts[2]}/${parts[1]}`;
    });
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            },
            formatter: (params: any) => {
                const param = params[0];
                const index = param.dataIndex;
                const date = formattedDates[index];
                const value = param.value;
                return `${date}<br/>PE: ${value}`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#FFFFFF1A',
            borderWidth: 1,
            textStyle: {
                color: '#FFFFFF'
            }
        },
        grid: {
            top: 40,
            bottom: 0,
            left: 30,
            right: 20
        },
        xAxis: {
            type: 'category',
            data: formattedDates
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    color: '#FFFFFF1A'
                }
            }
        },
        series: [
            {
                data: res.prices,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [
                            {
                                offset: 0,
                                color: '#7CCBFF' // 起始颜色
                            },
                            {
                                offset: 1,
                                color: '#C348FF' // 结束颜色（可以设置透明度）
                            }
                        ]
                    }
                }
            }
        ]
    }
    option && myChart.setOption(option);
})

onMounted(()=>{
    loadData()
})
</script>

<style lang="scss" scoped>
.chart{
    width: 100%;
    height: 450px;
}
</style>