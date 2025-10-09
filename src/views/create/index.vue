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
        <div class="tc size24 mt20">{{ $t('总市值') }}(USDT)</div>
        <div class="mainCard mt50 flex jb ac">
            <div class="size24 opc6">{{ $t('累计发放共创激励价值') }}</div>
            <div class="size28 bold"><span v-init="info?.count_income"></span> USDT</div>
        </div>
        <div class="mainCard mt30 flex jb ac">
            <div class="size24 opc6">{{ $t('待领取铸币') }}</div>
            <div class="flex ac">
                <div class="size28 bold"><span v-init="info?.coinage_balance_token"></span> {{ tokenName }}</div>
                <div class="btn ml30" @click="show=true" v-if="info?.coinage_balance_token > 0">{{ $t('领取') }}</div>
                <div class="btn ml30" style="background: #FFFFFF33;color: #999999;" v-else>{{ $t('领取') }}</div>
            </div>
        </div>
        <div class="flex jb ac mt40 size24">
            <div class="flex ac">
                <img src="@/assets/imgs/clock.png" class="img30 mr12">
                <div>{{ $t('下次铸币时间') }}</div>
            </div>
            <div class="main" v-init:date="info?.coinage_at"></div>
        </div>
        <div class="card mt80">
            <div class="bold size32">
                <ShinyText :text="$t('铸币')"></ShinyText>
            </div>
            <div class="flex jb ac mt40">
                <div>
                    <div class="linearNum size40 bold" v-init="info?.count_coinage_amount"></div>
                    <div class="size24 mt20">{{ $t('铸币池总铸币权') }}</div>
                </div>
                <div>
                    <div class="size24 opc6">{{ $t('我铸造的币') }}</div>
                    <div class="size26 bold mt20"><span v-init="info?.user_coinage_amount"></span> USDT</div>
                </div>
            </div>
            <div class="flex ac mt60">
                <div class="size24 opc6">{{ $t('我的铸币权') }}</div>
                <img src="@/assets/imgs/rule.png" class="img26 ml10">
            </div>
            <div class="flex jb ac mt20">
                <div class="size26 bold" v-init="info?.user_coinage_limit"></div>
                <div class="flex ac size24 main" @click="routerPush('/create/castLog')">
                    <div>{{ $t('点击查看') }}</div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="mainBtn mt60" @click="routerPush('/create/cast')" v-if="nowIsToday">{{ $t('去铸币') }}</div>
            <div class="disableBtn mt60" v-else>{{ $t('去铸币') }}</div>
        </div>

        <div class="mainCard">
            <div class="bold size32">
                <ShinyText :text="`${tokenName} ${$t('激励代币总览')}`"></ShinyText>
            </div>
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
                            <div class="size24 opc6">{{ $t('铸币池待铸') }}</div>
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
                    <div class="size24 opc6 mt16">{{ $t('铸币池待铸') }}</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28" v-init="info?.xh_count"></span>
                        <span class="size20 ml10">{{ tokenName }}</span>
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
                    <div class="bold size28 main">0x5768****uyjh</div>
                    <div class="size24 opc6 mt16">{{ $t('代币合约地址') }}</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size28" v-init="info?.token_price"></span>
                        <span class="size20 ml10">USDT</span>
                    </div>
                    <div class="size24 opc6 mt16">{{ $t('实时价格') }}</div>
                </div>
            </div>
            <div class="flex mt60">
                <div class="flex1">
                    <div class="bold">
                        <span class="size28">3,150,000</span>
                        <span class="size20 ml10">{{ $t('枚/月') }}</span>
                    </div>
                    <div class="size24 opc6 mt16">{{ $t('实时铸币速度') }}</div>
                </div>
                <div class="flex1">
                    <div class="bold">
                        <span class="size20">{{ $t('第') }}</span>
                        <span class="size28 ml10">{{ info?.cycle }}</span>
                        <span class="size20 ml10">{{ $t('个月') }}</span>
                    </div>
                    <div class="size24 opc6 mt16">{{ $t('实时铸币周期') }}</div>
                </div>
            </div>
        </div>
    </div>
    <div class="gap60"></div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show=false" />
            </div>
            <div class="mt60 size24">{{ $t('确认现在领取吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submit}">{{ $t('确认') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { tokenName } from '@/config';
import { t } from '@/locale';
import { routerPush } from '@/router';
import { computedAdd, computedMul, isToday } from '@/utils';
import { apiGet, apiPost } from '@/utils/request';
import * as echarts from 'echarts';
import { computed, nextTick, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useDappStore } from '@/store';
import { useEthers } from '@/dapp';
import { useBiz } from '@/dapp/contract/biz/useBiz';

const token_price = ref()
apiGet('/api/token_price').then((res: any) => token_price.value = res.token_price)

const balance_token = ref()
apiGet('/api/users/my').then((res: any) => {
    balance_token.value = computedAdd(res.jt_balance_token, res.dt_balance_token)
})

const total = computed(() => {
    if (token_price.value && balance_token.value) return computedMul(token_price.value, balance_token.value)
    else return 0
})

const chartRef = ref()
const info = ref()
const nowIsToday = ref(false)
apiGet('/api/coinage').then(async (res: any) => {
    info.value = res
    nowIsToday.value = isToday(res.coinage_at)
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
                data: [
                    {
                        value: Number(res.lt_count),
                        name: t('流通总量'),
                        itemStyle: {
                            color: '#0059FF'
                        }
                    },
                    {
                        value: Number(res.xh_count),
                        name: t('销毁总量'),
                        itemStyle: {
                            color: '#C348FF'
                        }
                    },
                    {
                        value: Number(res.dq_count_not_coinage),
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
    };
    await nextTick()
    const myChart = echarts.init(chartRef.value);
    option && myChart.setOption(option);
})

const useStore = useDappStore()
const { address } = storeToRefs(useStore)

const { getSign, checkGas } = useEthers()

const { writeClaim, init } = useBiz()

const show = ref(false)

watch(address, val => {
    if(val){
        init()
    }
}, {immediate:true})

const submit = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',{
        ccy:'coinage_balance_token',
        ...signInfo
    }).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaim(id, token, sign_amount, expired_at, sign)
        show.value = false
    })
}
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

.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
}
</style>