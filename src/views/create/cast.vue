<template>
    <div class="sponsor" @click="showRule = false">
        <CusNav title="铸币">
            <img src="@/assets/imgs/rule.png" class="img26 mr10">
            <div class="main size24" @click.stop="showRule = true">{{ $t('规则') }}</div>
        </CusNav>

        <div class="rule size20 lh40 animate__animated animate__zoomIn anitr ani3" v-if="showRule">
            {{ $t('铸币规则') }} :<br>
            {{ $t('铸造周期') }}<br>
            {{ $t('每份铸币权仅生效1次，有效期至') }} :<br>
            [2025/12/31 23:59 UTC]<br>
            {{ $t('数量计算公式') }}<br>
            {{ $t('[您的铸造量] = [基础额度] × [权重系数]') }}<br>
            ▸ {{ $t('基础额度 = 当前释放池总量 / 有效铸币权总数') }}<br>
            ▸ {{ $t('系数范围 = 0.8~1.5（基于获得权益时的质押时长）') }}<br>
            {{ $t('成本说明') }}<br>
            {{ $t('需支付网络Gas费 ≈ 1.2~ 3.5（实时估算）') }}
        </div>

        <div class="gap40"></div>
        
        <div class="pl30 pr30">
            <div class="mainCard">
                <div class="size24 grey">{{ $t('可用铸币权') }}</div>
                <div class="mainCard mt24 flex jb ac">
                    <div class="flex ac">
                        <img src="@/assets/pe.png" class="img46 mr12">
                        <div class="size28">{{ tokenName }}</div>
                    </div>
                    <div class="size28" v-init="info?.user_coinage_limit"></div>
                </div>
                <div class="size24 grey mb30 mt30">{{ $t('铸币数量') }}</div>
                <div class="mainCard mt24 flex ac">
                    <div class="flex ac">
                        <img src="@/assets/pe.png" class="img46 mr12">
                        <div class="size28">{{ tokenName }}</div>
                    </div>
                    <input type="number" v-model="inputAmount" :placeholder="$t('请输入铸币数量')" class="size28 flex1 tr">
                    <div class="line ml16 mr16 flex0"></div>
                    <div class="bold size24 font2" @click="inputAll">
                        <ShinyText text="全部"></ShinyText>
                    </div>
                </div>
                <div class="size24 mt30 main">{{ $t('实时铸币价格') }} : <span v-init="token_price"></span> USD</div>
                <div class="size24 gray mt40">{{ $t('赞助价值') }}</div>
                <div class="mainCard mt24 flex jb ac">
                    <div class="flex ac">
                        <img src="@/assets/usd.png" class="img46 mr12">
                        <div class="size28">USD</div>
                    </div>
                    <div class="size28" v-init="total"></div>
                </div>
                <div class="size24 gray mt40">{{ $t('支付数量') }}</div>
                <div class="mainCard mt24 flex jb ac">
                    <div class="flex ac">
                        <img src="@/assets/usdt.png" class="img46 mr12">
                        <div class="size28">USDT</div>
                    </div>
                    <div class="size28" v-init="usdt"></div>
                </div>
                <div class="size24 mt30">{{ $t('支付数量=铸币数量x铸币价格 x80%') }}</div>

                <div class="mainBtn mt60" v-scale v-delay="{fun:submit}">{{ $t('开始铸币') }}</div>
                <div class="flex jc mt40">
                    <div class="flex ac main size24" @click="routerPush('/create/castLog')">
                        <div class="mr8">{{ $t('铸币记录') }}</div>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="gap30"></div>
            </div>
        </div>
        
    </div>

</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref, watch } from 'vue';
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { routerPush } from '@/router';
import { apiGet, apiPost } from '@/utils/request';
import { computedMul, isToday } from '@/utils';
import { tokenName } from '@/config';
import { message } from '@/utils/message';
import { useEthers } from '@/dapp';
import { useDappStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useBizV2 } from '@/dapp/contract/bizV2/useBizV2';
import { useErc20 } from '@/dapp/contract/erc20/useErc20';
import { t } from '@/locale';

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const { getSign, checkGas } = useEthers()

const { writeMint, init:initBizV2 } = useBizV2()

const { approve:approveUsdt, init:initUsdt } = useErc20(import.meta.env.VITE_BIZ_V2)

watch(address, val => {
    if(val){
        initBizV2(),
        initUsdt()
    }
}, {immediate:true})

const showRule = ref(false)

const inputAmount = ref()

const info = ref()
const nowIsToday = ref(false)
const loadData = () => {
    apiGet('/api/coinage').then((res:any)=>{
        info.value = res
        nowIsToday.value = isToday(res.coinage_at)
    })
}
loadData()

const token_price = ref()
apiGet('/api/token_price').then((res:any)=>token_price.value=res.token_price)

const inputAll = () => inputAmount.value = info.value?.user_coinage_limit || 0

const total = computed(()=>{
    if(token_price.value && inputAmount.value)return computedMul(token_price.value, inputAmount.value)
    else return 0
})

const usdt = computed(()=>computedMul(total.value, 0.8))

const submit = async () => {
    if(!inputAmount.value)return message(t('请输入铸币数量'))

    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    await approveUsdt(inputAmount.value); // 授权U

    const signInfo = await getSign('Coinage')

    apiPost('/api/coinage',{
        amount: inputAmount.value,
        ...signInfo
    }).then(async (res:any) => {
        const { id, usdt_amount, pe_amount, lp_to, expired_at, sign } = res
        await writeMint(id, usdt_amount, pe_amount, lp_to, expired_at, sign)
        inputAmount.value = ''
        loadData()
    })
}
</script>

<style lang="scss" scoped>
.sponsor{
    width: 100vw;
    min-height: 100vh;
}
.rule {
    width: 690px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid #FFFFFF80;
    background: linear-gradient(rgba(52, 14, 70, 0.9), rgba(9, 8, 20, 0.9));
    position: fixed;
    top: 100px;
    left: 30px;
    z-index: 20;
}
.head{
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
}
.item{
    width: 200px;
    height: 90px;
    border-radius: 20px;
    border: 1px solid #FFFFFF29;
    background-color: #1C1C22;
}
.itemAct{
    border: 1px solid transparent;
    position: relative;
    &::before{
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: linear-gradient(to right, #7CCBFF, #C348FF);
        border-radius: 20px;
    }
}
.line{
    width: 1px;
    height: 40px;
    background-color: #FFFFFF29;
}
</style>