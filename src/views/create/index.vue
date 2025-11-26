<template>
    <img src="@/assets/imgs/13.png" class="bg">
    <div class="pl30 pr30 rel">
        <div class="gap80"></div>
        <div class="flex jc">
            <img src="@/assets/usdt.png" class="img48">
        </div>
        <div class="bold tc size48 mt28">
            <div class="linearTxt" v-init="total"></div>
        </div>
        <div class="tc size24 mt20">{{ $t('总市值') }}(USD)</div>
        <div class="mainCard mt50 flex jb ac">
            <div class="size24 opc6">{{ $t('累计发放共创激励价值') }}</div>
            <div class="size28 bold"><span v-init="info?.count_income"></span> USD</div>
        </div>
        <div class="flex jb ac mt40 size24">
            <div class="flex ac">
                <img src="@/assets/imgs/clock.png" class="img30 mr12">
                <div>{{ $t('下次铸币时间') }}</div>
            </div>
            <div class="main">
                <span v-init:date="info?.coinage_at"></span>
                <span> 00:00</span>
            </div>
        </div>
        <div class="card mt80">
            <div class="bold size32">
                <ShinyText :text="$t('铸币')"></ShinyText>
            </div>
            <div class="flex jb ac mt40">
                <div @click="showRule1 = true">
                    <div class="linearNum bold">
                        <span class="size40" v-init="info?.dq_count_coinage_limit"></span>
                        <span class="size24 ml10">{{ tokenName }}</span>
                    </div>
                    <div class="flex ac mt20 size24">
                        <div>{{ $t('铸币池总铸币权') }}</div>
                        <img src="@/assets/imgs/rule.png" class="img26 ml10">
                    </div>
                </div>
                <div @click="showRule2 = true">
                    <div class="linearNum bold">
                        <span class="size40" v-init="info?.user_coinage_limit"></span>
                        <span class="size24 ml10">{{ tokenName }}</span>
                    </div>
                    <div class="flex ac mt20 size24">
                        <div>{{ $t('我的铸币权') }}</div>
                        <img src="@/assets/imgs/rule.png" class="img26 ml10">
                    </div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex ac" @click="showRule3 = true">
                    <div class="size24 opc6">{{ $t('我铸造的币') }}</div>
                    <img src="@/assets/imgs/rule.png" class="img26 ml10"></img>
                </div>
            </div>
            <div class="flex jb ac mt20">
                <div class="size26 bold">
                    <span v-init="info?.user_coinage_amount"></span>
                    <span class="ml10">{{ tokenName }}</span>
                </div>
                <div class="flex ac size24 main" @click="routerPush('/create/castLog')">
                    <div>{{ $t('点击查看') }}</div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="mainBtn mt60" @click="routerPush('/create/cast')" v-if="nowIsToday">{{ $t('去铸币') }}</div>
            <div class="disableBtn mt60" v-else>{{ $t('去铸币') }}</div>
            <div class="transferBtn mt30 size28 flex jc ac" @click="openTransfer">{{ $t('转账铸币权') }}</div>
        </div>

        <div class="mainCard mt30 flex jb ac">
            <div class="size24 opc6">{{ $t('待领取铸币') }}</div>
            <div class="flex ac">
                <div class="size28 bold"><span v-init="coinage_balance_token"></span> {{ tokenName }}</div>
                <div class="btn ml30" @click="show = true" v-if="coinage_balance_token > 0">{{ $t('领取') }}</div>
                <div class="btn ml30" style="background: #FFFFFF33;color: #999999;" v-else>{{ $t('领取') }}</div>
            </div>
        </div>

        <div class="mainCard mt30" style="padding-left: 0;padding-right: 0;">
            <div class="bold size32 pl30">
                <ShinyText :text="`${tokenName} ${$t('激励代币总览')}`"></ShinyText>
            </div>
            <div class="pl30 pr30">
                <div class="flex ac">
                    <div ref="chartRef" class="chartBox"></div>
                    <div class="flex1">
                        <div class="flex ac jb">
                            <div class="flex ac">
                                <div class="ball mr12 flex0"></div>
                                <div class="size24 opc6">{{ $t('流通总量') }}</div>
                            </div>
                            <div class="tr size24"><span v-init="info?.lt_count"></span> {{ tokenName }}</div>
                        </div>
                        <div class="flex ac jb mt40 mb40">
                            <div class="flex ac">
                                <div class="ball ball1 mr12 flex0"></div>
                                <div class="size24 opc6">{{ $t('销毁总量') }}</div>
                            </div>
                            <div class="tr size24"><span v-init="info?.xh_count"></span> {{ tokenName }}</div>
                        </div>
                        <div class="flex ac jb">
                            <div class="flex ac">
                                <div class="ball ball2 mr12 flex0"></div>
                                <div class="size24 opc6">{{ $t('待铸造') }}</div>
                            </div>
                            <div class="tr size24"><span v-init="info?.dq_count_not_coinage"></span> {{ tokenName }}</div>
                        </div>
                    </div>
                </div>
                <div class="mainCard mt60 flex ac">
                    <img src="@/assets/pe.png" class="img72 mr30">
                    <div>
                        <div class="size28 bold">{{ tokenName }} Coin</div>
                        <div class="size24 opc6 mt10">{{ $t('币种名称') }}</div>
                    </div>
                </div>
                <div class="flex mt60">
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28">2.1</span>
                            <span class="size20 ml10">{{ $t('亿') }}</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('发行总量') }}</div>
                    </div>
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28">8400</span>
                            <span class="size20 ml10">{{ $t('万') }}</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('初始发行') }}</div>
                    </div>
                </div>
                <div class="flex mt60">
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28" v-init="info?.lt_count"></span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('流通总量') }}</div>
                    </div>
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28" v-init="info?.dq_count_not_coinage"></span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('待铸造') }}</div>
                    </div>
                </div>
                <div class="flex mt60">
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28" v-init="info?.xh_count"></span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('销毁总量') }}</div>
                    </div>
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28">60</span>
                            <span class="size20 ml10">{{ $t('个月') }}</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('铸币周期') }}</div>
                    </div>
                </div>
                <div class="flex mt60">
                    <div class="flex1">
                        <div class="bold size28 main" v-init:address="tokenAddress"></div>
                        <div class="size24 opc6 mt16">{{ $t('合约地址') }}</div>
                    </div>
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28">{{ Number(info?.token_price) }}</span>
                            <span class="size20 ml10">USD</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('实时价格') }}</div>
                    </div>
                </div>
                <div class="flex mt60">
                    <div class="flex1">
                        <div class="bold">
                            <span class="size28">2,100,000</span>
                            <span class="size20 ml10">{{ $t('枚/月') }}</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('铸币速度') }}</div>
                    </div>
                    <div class="flex1">
                        <div class="bold">
                            <span class="size20">{{ $t('第') }}</span>
                            <span class="size28 ml10">{{ info?.cycle }}</span>
                            <span class="size20 ml10">{{ $t('个月') }}</span>
                        </div>
                        <div class="size24 opc6 mt16">{{ $t('铸币周期') }}</div>
                    </div>
                </div>
                <div class="bold size32 mt60">
                    <ShinyText :text="`${$t('PE价格趋势')}`"></ShinyText>
                </div>
            </div>
            
            <Chart></Chart>
        </div>
    </div>
    <div class="gap60"></div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" :close-on-click-overlay="false"
        overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show = false" />
            </div>
            <div class="mt60 size24">{{ $t('确认现在领取吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{ fun: submit }">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showRule1" style="background-color: transparent !important;"
        :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('规则') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showRule1 = false" />
            </div>
            <div class="mt60 size24 lh40">{{ $t('规则1') }}</div>
            <div class="mainBtn mt60" @click="showRule1 = false">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showRule2" style="background-color: transparent !important;"
        :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('规则') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showRule2 = false" />
            </div>
            <div class="mt60 size24 lh40">{{ $t('规则2') }}</div>
            <div class="mainBtn mt60" @click="showRule2 = false">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showRule3" style="background-color: transparent !important;"
        :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('规则') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showRule3 = false" />
            </div>
            <div class="mt60 size24 lh40">{{ $t('规则3') }}</div>
            <div class="mainBtn mt60" @click="showRule3 = false">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="transferShow" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="bold size32 font2">
                    <ShinyText :text="`${$t('转账铸币权')}`"></ShinyText>
                </div>
                <van-icon name="cross" :size="25" color="#999999" @click="transferShow=false" />
            </div>
            <div class="content mt60">
                <div class="size24">{{ $t('接收地址') }}</div>
                <div class="inp mt20 flex">
                    <input type="text" v-model="inputTransferAddress" :placeholder="$t('请输入接收地址')" class="size28 flex1">
                </div>
                <div class="size24 mt30">{{ $t('转账金额') }}</div>
                <div class="inp mt20 flex">
                    <input type="number" v-model="inputTransferAmount" :placeholder="$t('请输入转账金额')" class="size28 flex1">
                </div>
            </div>
            
            <div class="mainBtn mt40" v-scale v-delay="{fun:transferSubmit}">{{ $t('确认') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { tokenName } from '@/config';
import { t } from '@/locale';
import { routerPush } from '@/router';
import { computedMul, isToday } from '@/utils';
import { apiGet, apiPost } from '@/utils/request';
import * as echarts from 'echarts';
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDappStore } from '@/store';
import { useEthers } from '@/dapp';
import { useBizV2 } from '@/dapp/contract/bizV2/useBizV2';
import Chart from './Chart.vue';
import { message } from '@/utils/message';

const token_price = ref()

const tokenAddress = import.meta.env.VITE_PE

const total = computed(() => {
    if (token_price.value) return computedMul(token_price.value, 2100000000)
    else return 0
})

const showRule1 = ref(false)
const showRule2 = ref(false)
const showRule3 = ref(false)
const transferShow = ref(false)
const inputTransferAmount = ref()
const inputTransferAddress = ref()

const openTransfer = () => {
    inputTransferAddress.value = ''
    inputTransferAmount.value = ''
    transferShow.value = true
}

const coinage_balance_token = ref()

const chartRef = ref()
const info = ref()
const nowIsToday = ref(false)
let myChart: any = null

// 初始化 echarts 实例
const initChart = () => {
    if (chartRef.value && !myChart) {
        myChart = echarts.init(chartRef.value)
    }
}

// 更新 echarts 数据
const updateChartData = (data: any) => {
    if (!myChart) return
    
    const option = {
        tooltip: {
            trigger: 'item',
            position: (point: any) => [point[0] + 20, point[1] - 20]
        },
        legend: {
            show: false
        },
        series: [
            {
                type: 'pie',
                radius: '80%',
                minAngle: 10, // 设置最小扇区角度，确保小数据也能显示
                data: [
                    {
                        value: Number(data.lt_count),
                        name: t('流通总量'),
                        itemStyle: {
                            color: '#0059FF'
                        }
                    },
                    {
                        value: Number(data.xh_count),
                        name: t('销毁总量'),
                        itemStyle: {
                            color: '#C348FF'
                        }
                    },
                    {
                        value: Number(data.dq_count_not_coinage),
                        name: t('铸币池待铸'),
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
    }
    myChart.setOption(option)
}

// 加载铸币数据
const loadCoinageData = () => {
    apiGet('/api/coinage').then((res: any) => {
        info.value = res
        nowIsToday.value = isToday(res.coinage_at)
        updateChartData(res)
    })
}

const loadData = () => {
    apiGet('/api/users/my').then((res: any) => {
        coinage_balance_token.value = res.coinage_balance_token
    })
    apiGet('/api/token_price').then((res: any) => token_price.value = res.token_price)
    loadCoinageData()
}



const useStore = useDappStore()
const { address } = storeToRefs(useStore)

const { getSign, checkGas } = useEthers()

const { writeClaim, init } = useBizV2()

const show = ref(false)

watch(address, val => {
    if (val) {
        init()
    }
}, { immediate: true })

const submit = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if (!gasEnough) return;

    const signInfo: any = await getSign('Claim') // 签名

    apiPost('/api/withdraw', {
        ccy: 'coinage_balance_token',
        ...signInfo
    }).then(async (res: any) => {
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaim(id, token, sign_amount, expired_at, sign)
        show.value = false
        setTimeout(() => {
            loadData()
        }, 3000);
    })
}

const transferSubmit = async () => {
    if(!inputTransferAddress.value)return message(t('请输入接收地址'))
    if(!inputTransferAmount.value)return message(t('请输入转账金额'))
    console.log('1111');
    
    const signInfo = await getSign('Transfer')
    apiPost('/api/transfer', {
        to: inputTransferAddress.value,
        ccy: 'coinage_limit',
        amount: inputTransferAmount.value,
        ...signInfo
    }).then(()=>{
        message(t('操作成功'), 'success')
        loadData()
        transferShow.value = false
    })
}

onMounted(async ()=>{
    await nextTick()
    initChart()
    loadData()
})

onUnmounted(() => {
    if (myChart) {
        myChart.dispose()
        myChart = null
    }
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

.transferBtn{
    border: 1px solid rgba($color: #FFFFFF, $alpha: 0.5);
    height: 80px;
    border-radius: 40px;
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

.chartBox {
    width: 250px;
    height: 250px;
}

.ball {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #0059FF;
}

.ball1 {
    background-color: #C348FF;
}

.ball2 {
    background-color: #03EEA9;
}

.pop {
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .inp{
        background-color: #3030304D;
        border: 1px solid #C4C4C433;
        height: 84px;
        border-radius: 20px;
        padding: 0 30px;
    }
}
</style>