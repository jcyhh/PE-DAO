<template>
    <img src="@/assets/imgs/13.png" class="bg">
    <div class="pl30 pr30 rel">
        <div class="gap80"></div>
        <div class="flex jc">
            <img src="@/assets/usdt.png" class="img48">
        </div>
        <div class="bold tc size48 mt28">
            <div class="linearTxt">989098000</div>
        </div>
        <div class="tc size24 mt20">总市值(USDT)</div>
        <div class="mainCard mt50 flex jb ac">
            <div class="size24 opc6">累计发放共创激励价值</div>
            <div class="size28 bold">1000 USDT</div>
        </div>
        <div class="flex jb ac mt40 size24">
            <div class="flex ac">
                <img src="@/assets/imgs/clock.png" class="img30 mr12">
                <div>下次铸币时间</div>
            </div>
            <div class="main">08月01日 17:50:00</div>
        </div>
        <div class="card mt80">
            <div class="bold size32">
                <ShinyText text="铸币"></ShinyText>
            </div>
            <div class="flex jb ac mt40">
                <div>
                    <div class="linearNum size40 bold">1000</div>
                    <div class="size24 mt20">铸币池总额</div>
                </div>
                <div>
                    <div class="size24 opc6">我铸造的币</div>
                    <div class="size26 bold mt20">888 USDT</div>
                </div>
            </div>
            <div class="flex ac mt60">
                <div class="size24 opc6">我的铸币权</div>
                <img src="@/assets/imgs/rule.png" class="img26 ml10">
            </div>
            <div class="flex jb ac mt20">
                <div>100</div>
                <div class="flex ac size24 main">
                    <div>点击查看</div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="mainBtn mt60">去铸币</div>
        </div>

        <div class="mainCard">
            <div class="bold size32">
                <ShinyText text="PE激励代币总览"></ShinyText>
            </div>
            <div class="flex ac">
                <div ref="chartRef" class="chartBox"></div>
                <div class="ml20">
                    <div class="flex ac">
                        <div class="ball mr12"></div>
                        <div class="mr20 size24 opc6">流通总量</div>
                        <div>100 PE</div>
                    </div>
                    <div class="flex ac mt40 mb40">
                        <div class="ball ball1 mr12"></div>
                        <div class="mr20 size24 opc6">流通总量</div>
                        <div>100 PE</div>
                    </div>
                    <div class="flex ac">
                        <div class="ball ball2 mr12"></div>
                        <div class="mr20 size24 opc6">流通总量</div>
                        <div>100 PE</div>
                    </div>
                </div>
            </div>
            <div class="mainCard mt60 flex ac">
                <img src="@/assets/pe.png" class="img72 mr30">
                <div>
                    <div class="size28 bold">PE Coin</div>
                    <div class="size24 opc6 mt10">币种名称</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">2.1</span>
                        <span class="size20 ml10">亿</span>
                    </div>
                    <div class="size24 opc6 mt16">发行总量</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">2100</span>
                        <span class="size20 ml10">万</span>
                    </div>
                    <div class="size24 opc6 mt16">初始发行</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">500</span>
                        <span class="size20 ml10">万</span>
                    </div>
                    <div class="size24 opc6 mt16">流通总量</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">1.89</span>
                        <span class="size20 ml10">亿</span>
                    </div>
                    <div class="size24 opc6 mt16">铸币池待铸</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">8000</span>
                        <span class="size20 ml10">PE</span>
                    </div>
                    <div class="size24 opc6 mt16">销毁总量</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">60</span>
                        <span class="size20 ml10">个月</span>
                    </div>
                    <div class="size24 opc6 mt16">铸币周期</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold size28 main">0x5768****uyjh</div>
                    <div class="size24 opc6 mt16">代币合约地址</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">0.1</span>
                        <span class="size20 ml10">USDT</span>
                    </div>
                    <div class="size24 opc6 mt16">实时价格</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">3000</span>
                        <span class="size20 ml10">枚/月</span>
                    </div>
                    <div class="size24 opc6 mt16">实时铸币速度</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size20">第</span>
                        <span class="size28 ml10">8</span>
                        <span class="size20 ml10">个月</span>
                    </div>
                    <div class="size24 opc6 mt16">实时铸币周期</div>
                </div>
            </div>
        </div>
    </div>
    <div class="gap60"></div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const chartRef = ref()

const option = {
    tooltip: {
        trigger: 'item',
        position: (point:any) => [point[0] + 20, point[1] - 20]
    },
    legend: {
        show:false
    },
    series: [
        {
            type: 'pie',
            radius: '80%',
            data: [
                { 
                    value: 1048, 
                    name: '流通总量',
                    itemStyle: {
                        color: '#0059FF'
                    }
                },
                { 
                    value: 735, 
                    name: '销毁总量',
                    itemStyle: {
                        color: '#C348FF'
                    }
                },
                { 
                    value: 580, 
                    name: '铸币池待铸',
                    itemStyle: {
                        color: '#03EEA9'
                    }
                }
            ],
            label: {
                show: false
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};


onMounted(()=>{
    const myChart = echarts.init(chartRef.value);
    option && myChart.setOption(option);
})
</script>

<style lang="scss" scoped>
.bg {
    width: 750px;
    height: 821px;
    position: absolute;
    top: 0;
    left: 0;
}

.card {
    border: 1px solid transparent;
    position: relative;
    padding: 30px 30px 60px 30px;
    background: linear-gradient(#1B0E2B, #0A0915);
    border-radius: 20px;

    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: linear-gradient(#C348FF, #C348FF00);
        border-radius: 0 40px 40px 0;
        border-radius: 20px;
    }
}

.chartBox{
    width: 300px;
    height: 300px;
}
.ball{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #0059FF;
}
.ball1{
    background-color: #C348FF;
}
.ball2{
    background-color: #03EEA9;
}
</style>