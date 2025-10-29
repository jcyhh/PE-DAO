<template>
    <div class="sponsor" @click="showRule = false">
        <CusNav :title="$t('赞助')">
            <img src="@/assets/imgs/rule.png" class="img26 mr10">
            <div class="main size24" @click.stop="showRule = true">{{ $t('规则') }}</div>
        </CusNav>

        <div class="rule size20 lh40 animate__animated animate__zoomIn anitr ani3" v-if="showRule">
            {{ $t('赞助PE-DAO，即刻获得赞助价值200%的奖励点，以及分享共识者资格。') }}
        </div>
        
        <div class="head">
            <CusTab :defaultCur="defaultCur" :list="tabs" @change="$event => current = $event"></CusTab>
        </div>

        <div class="gap160"></div>
        
        <div class="pl30 pr30">
            <div class="mainCard">
                <div class="size24 grey mb30">{{ $t('赞助数量') }}</div>
                <div class="flex wrap jb size26">
                    <div class="item flex jc ac mb20" :class="inputAmount==item?'itemAct':''" v-for="(item,index) in list" :key="index" @click="inputAmount=item">{{ item }} USD</div>
                </div>
                <div class="gap10"></div>
                <div class="flex jb ac size24 grey mb30">
                    <div>{{ $t('赞助价值') }}</div>
                    <div>
                        <span>{{ $t('余额') }} : </span>
                        <span v-init="balanceUsdt" v-if="current==0"></span>
                        <span v-init="balanceToken" v-else></span>
                        <span class="ml10">{{ current==0 ? 'USDT' : tokenName }}</span>
                    </div>
                </div>
                <div class="mainCard mt24 flex ac">
                    <div class="flex ac">
                        <img src="@/assets/usd.png" class="img46 mr12">
                        <div class="size28">USD</div>
                    </div>
                    <input type="number" v-model="inputAmount" :placeholder="$t('请输入赞助价值')" class="size28 flex1 tr">
                    <div class="line ml16 mr16 flex0"></div>
                    <div class="bold size24 font2" @click="inputAll">
                        <ShinyText :text="$t('全部')"></ShinyText>
                    </div>
                </div>
                <div class="flex jb size24 grey mt30">
                    <div>{{ $t('实际支付') }}</div>
                    <div v-if="current==1" @click="loadPrice(true)">
                        <span>{{ $t('赞助价格') }} : </span>
                        <span>{{ Number(coinage_token_price) }}</span>
                        <span class="main ml10 animate__animated animate__rotateIn">
                            <van-icon name="replay" />
                        </span>
                    </div>
                </div>
                <div class="mainCard mt24 flex jb ac">
                    <div class="flex ac" v-if="current==0">
                        <img src="@/assets/usdt.png" class="img46 mr12">
                        <div class="size28">USDT</div>
                    </div>
                    <div class="flex ac" v-else>
                        <img src="@/assets/pe.png" class="img46 mr12">
                        <div class="size28">{{ tokenName }}</div>
                    </div>
                    <div class="size28" v-init="usdt"></div>
                </div>
                <div class="mainBtn mt60" v-scale v-delay="{fun:submit}">{{ $t('立即赞助') }}</div>
                <div class="flex jc mt40">
                    <div class="flex ac main size24" @click="routerPush('/home/sponsorLog')">
                        <div class="mr8">{{ $t('赞助记录') }}</div>
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
import CusTab from '@/components/CusTab/index.vue'
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { routerPush } from '@/router';
import { useRoute } from 'vue-router';
import { apiGet, apiPost } from '@/utils/request';
import { computedDiv } from '@/utils';
import { message } from '@/utils/message';
import { useEthers } from '@/dapp';
import { useBizV2 } from '@/dapp/contract/bizV2/useBizV2';
import { useDappStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useErc20 } from '@/dapp/contract/erc20/useErc20';
import { tokenName } from '@/config';
import { t } from '@/locale';

const { query } = useRoute()

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const { getSign, checkGas } = useEthers()

const { writeDonate, init:initBizV2 } = useBizV2()

const { balance:balanceUsdt, readBalance:readBalanceUsdt, approve:approveUsdt, init:initUsdt } = useErc20(import.meta.env.VITE_BIZ_V2)

const { balance:balanceToken, readBalance:readBalanceToken, approve:approvePe, init:initPe } = useErc20(import.meta.env.VITE_BIZ_V2, import.meta.env.VITE_PE)

watch(address, val => {
    if(val){
        initPe(),
        initUsdt(),
        initBizV2()
    }
}, {immediate:true})

const showRule = ref(false)

const defaultCur = query.type ? 1 : 0

const current = ref(defaultCur)

const tabs = computed(()=>([
    {name:'USDT ' + t('赞助'), value:1},
    {name:'PE ' + t('赞助'), value:2}
]))

const inputAmount = ref(500)
const list = [500, 1000, 2000, 3000, 5000, 100000]
const inputAll = () => {
    if(current.value == 0){
        const balance = balanceUsdt.value.toFixed(0)
        inputAmount.value = Number(balance)
    }else{
        const balance = balanceToken.value
        inputAmount.value = Number(balance)
    }
}

const token_price = ref()
const coinage_token_price = ref()
const loadPrice = (flag:boolean=false) => {
    apiGet('/api/token_price').then((res:any)=>{
        token_price.value = res.token_price
        coinage_token_price.value = res.coinage_token_price
        if(flag)message(t('刷新成功'), 'success')
    })
}
loadPrice()

const usdt = computed(()=>{
    if(inputAmount.value){
        if(current.value==0)return inputAmount.value
        else return computedDiv(inputAmount.value, token_price.value)
    }else return 0
})

const submit = async () => {
    if(!inputAmount.value)return message(t('请输入赞助价值'))

    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    if(current.value==0)await approveUsdt(inputAmount.value); // 授权U
    else await approvePe(usdt.value); // 授权PE

    const signInfo = await getSign('SponsorOrder')

    apiPost('/api/sponsor',{
        u_amount:inputAmount.value,
        type: tabs.value[current.value].value,
        ...signInfo
    }).then(async (res:any)=>{
        const { id, pay_type, amount, to, expired_at, sign } = res
        await writeDonate(id, pay_type, amount, to, expired_at, sign)
        inputAmount.value = list[0]
        readBalanceUsdt()
        readBalanceToken()
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