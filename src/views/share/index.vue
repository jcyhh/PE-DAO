<template>
    <img src="@/assets/imgs/19.png" class="bg">
    <div class="pl30 pr30 pt40 rel">

        <div class="bold size32 font2">
            <ShinyText :text="$t('账户信息')"></ShinyText>
        </div>

        <div class="size26 bold mt44">{{ $t('钱包地址') }}</div>

        <div class="flex jb ac mt20">
            <div class="bold size32 font1">
                <ShinyText :text="info?.nickname"></ShinyText>
            </div>
            <img src="@/assets/imgs/20.png" class="img48" v-copy="address">
        </div>
        <div class="flex mt20">
            <div class="flex ac" v-copy="info?.dao_id">
                <div class="size24 opc6">DAO-ID: {{ info?.dao_id }}</div>
                <img src="@/assets/imgs/copy.png" class="img24 ml10">
            </div>
        </div>
        <div class="flex jb ac mt40">
            <div class="size24">{{ $t('赞助价值') }}</div>
            <div class="size26 bold"><span v-init="info?.sponsor_kpi"></span> USD</div>
        </div>
        <div class="flex jb ac mt30">
            <div class="size24">{{ $t('推荐码') }}</div>
            <div class="size26 flex ac" v-copy="info?.referral_code" v-if="info?.referral_code">
                <div class="opc6">{{ info?.referral_code }}</div>
                <img src="@/assets/imgs/copy.png" class="img24 ml10">
            </div>
            <div class="flex ac main size26" @click="routerPush('/home/sponsor')" v-else>
                <div class="mr5">{{ $t('解锁推荐特权') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <!-- <div class="cell mt48 flex jb ac size24" @click="routerPush('/share/code')">
            <div>{{ $t('邀请码') }}</div>
            <van-icon name="arrow" />
        </div> -->
        <div class="flex jb ac mt40">
            <div class="bold size32 font2">
                <ShinyText :text="$t('布道成果')"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/result')">
                <div class="mr5">{{ $t('查看详情') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="card mt40">
            <div class="tc size26">{{ $t('总业绩') }}(USD)</div>
            <div class="tc size48 bold mt12">
                <ShinyText :text="initNumber(info?.sponsor_team_kpi)"></ShinyText>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold" v-init="info?.referral_kpi"></div>
                <div class="size20 mt10 gray">{{ $t('直推业绩') }}(USD)</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold" v-init="info?.jt_kpi"></div>
                <div class="size20 mt10 gray">{{ $t('间推业绩') }}(USD)</div>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold">{{ info?.team_sponsor_user_count }}</div>
                <div class="size20 mt10 gray">{{ $t('团队入金人数') }}</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold">{{ info?.referral_count }}</div>
                <div class="size20 mt10 gray">{{ $t('直推人数') }}</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold">{{ info?.jt_count }}</div>
                <div class="size20 mt10 gray">{{ $t('间推人数') }}</div>
            </div>
        </div>
        <div class="flex jb ac mt80 mb40">
            <div class="bold size32 font2">
                <ShinyText :text="$t('领取奖励')"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/record')">
                <div class="mr5">{{ $t('查看详情') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item mb30">
            <div class="flex jb ac">
                <div class="size24 opc6">{{ $t('总赞助奖励') }}</div>
                <div class="size26"><span v-init="stats?.jt_income"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('待领取赞助奖励') }}</div>
                <div class="size26"><span v-init="stats?.jt_balance_token"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('已领取赞助奖励') }}</div>
                <div class="size26"><span v-init="stats?.jt_withdraw_amount"></span> {{ tokenName }}</div>
            </div>
            <div class="mainBtn mt48" @click="showZanZu=true">{{ $t('领取赞助奖励') }}</div>
        </div>
        <div class="item mb30">
            <div class="flex jb ac">
                <div class="size24 opc6">{{ $t('总布道奖励') }}</div>
                <div class="size26"><span v-init="stats?.dt_income"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('待领取布道奖励') }}</div>
                <div class="size26"><span v-init="stats?.dt_balance_token"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('已领取布道奖励') }}</div>
                <div class="size26"><span v-init="stats?.dt_withdraw_amount"></span> {{ tokenName }}</div>
            </div>
            <div class="mainBtn mt48" @click="showBuDao=true">{{ $t('领取布道奖励') }}</div>
        </div>
        <div class="item mb30" v-if="info?.is_nft">
            <div class="flex jb ac">
                <div class="size24 opc6">{{ $t('总贡献奖励') }}</div>
                <div class="size26"><span v-init="stats?.gx_income"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('待领取贡献奖励') }}</div>
                <div class="size26"><span v-init="stats?.gx_balance_token"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">{{ $t('已领取贡献奖励') }}</div>
                <div class="size26"><span v-init="stats?.gx_withdraw_amount"></span> {{ tokenName }}</div>
            </div>
            <div class="mainBtn mt48" @click="showGongXian=true">{{ $t('领取贡献奖励') }}</div>
        </div>
        <div class="item mb30" v-if="stats?.balance_usdt && stats?.balance_usdt > 0">
            <div class="flex jb ac">
                <div class="size24 opc6">NFT {{ $t('收益') }}</div>
                <div class="size26"><span v-init="stats?.balance_usdt"></span> USDT</div>
            </div>
            <div class="mainBtn mt48" @click="showShouYi=true">{{ $t('领取NFT收益') }}</div>
        </div>
        <div class="flex jb ac mt80 mb40">
            <div class="bold size32 font2">
                <ShinyText :text="$t('赞助奖励')"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/log')">
                <div class="mr5">{{ $t('查看详情') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item flex ast mt40" style="background: #FFFFFF0F;">
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.day_jt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('今日赞助奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.month_jt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('本月赞助奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.count_jt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('全部赞助奖励') }}(USD)</div>
            </div>
        </div>
        <div class="flex jb ac mt60 mb40">
            <div class="bold size32 font2">
                <ShinyText :text="$t('布道奖励')"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/log', {cur:1})">
                <div class="mr5">{{ $t('查看详情') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item flex ast mt40" style="background: #FFFFFF0F;">
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.day_dt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('今日布道奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.month_dt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('本月布道奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.count_dt_income_u"></div>
                <div class="size20 gray mt10">{{ $t('全部布道奖励') }}(USD)</div>
            </div>
        </div>
        <div class="flex jb ac mt60 mb40" v-if="info?.is_nft">
            <div class="bold size32 font2">
                <ShinyText :text="$t('贡献奖励')"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/log', {cur:2})">
                <div class="mr5">{{ $t('查看详情') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item flex ast mt40" style="background: #FFFFFF0F;" v-if="info?.is_nft">
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.day_gx_income_u"></div>
                <div class="size20 gray mt10">{{ $t('今日贡献奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.month_gx_income_u"></div>
                <div class="size20 gray mt10">{{ $t('本月贡献奖励') }}(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.count_gx_income_u"></div>
                <div class="size20 gray mt10">{{ $t('全部贡献奖励') }}(USD)</div>
            </div>
        </div>
    </div>

    <div class="gap60"></div>

    <van-popup v-model:show="showZanZu" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取赞助奖励') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showZanZu=false" />
            </div>
            <div class="mt60 size24">{{ $t('领取收益手续费为') }} {{ jt_token_fee }}% {{ $t('，确认现在领取收益吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submitZanZu}">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showBuDao" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取布道奖励') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showBuDao=false" />
            </div>
            <div class="mt60 size24">{{ $t('领取收益手续费为') }} {{ dt_token_fee }}% {{ $t('，确认现在领取收益吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submitBuDao}">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showGongXian" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取贡献奖励') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showGongXian=false" />
            </div>
            <div class="mt60 size24">{{ $t('领取收益手续费为') }} {{ gx_token_fee }}% {{ $t('，确认现在领取收益吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submitGongXian}">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <van-popup v-model:show="showShouYi" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('领取NFT收益') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="showShouYi=false" />
            </div>
            <div class="mt60 size24">{{ $t('领取收益手续费为') }} {{ usdt_fee }}% {{ $t('，确认现在领取收益吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submitShouYi}">{{ $t('确认') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { tokenName } from '@/config';
import { useEthers } from '@/dapp';
import { useBiz } from '@/dapp/contract/biz/useBiz';
import { useBizV2 } from '@/dapp/contract/bizV2/useBizV2';
import { routerPush } from '@/router';
import { useDappStore } from '@/store';
import { initNumber } from '@/utils';
import { apiGet, apiPost } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const useStore = useDappStore()
const { address } = storeToRefs(useStore)

const { getSign, checkGas } = useEthers()

const { writeClaim:writeClaimV2, init:initBizV2 } = useBizV2()

const { writeClaim:writeClaim, init:initBiz } = useBiz()

watch(address, val => {
    if(val){
        initBizV2()
        initBiz()
    }
}, {immediate:true})

const showZanZu = ref(false)
const showBuDao = ref(false)
const showGongXian = ref(false)
const showShouYi = ref(false)

const dt_token_fee = ref(0)
const jt_token_fee = ref(0)
const gx_token_fee = ref(0)
const usdt_fee = ref(0)
apiGet('/api/withdraw/fee').then((res:any)=>{
    dt_token_fee.value = res.dt_token_fee
    jt_token_fee.value = res.jt_token_fee
    gx_token_fee.value = res.gx_token_fee
    usdt_fee.value = res.usdt_fee
})

const info = ref()
apiGet('/api/users/my').then(res=>info.value=res)

const stats = ref()
const loadIncome = () => apiGet('/api/users/my/income').then(res=>stats.value=res)
loadIncome()

const submitZanZu = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',{
        ccy:'jt_balance_token',
        ...signInfo
    }).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaimV2(id, token, sign_amount, expired_at, sign)
        showZanZu.value = false
        setTimeout(() => {
            loadIncome()
        }, 3000);
        
    })
}

const submitBuDao = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',{
        ccy:'dt_balance_token',
        ...signInfo
    }).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaimV2(id, token, sign_amount, expired_at, sign)
        showBuDao.value = false
        setTimeout(() => {
            loadIncome()
        }, 3000);
    })
}

// 提贡献
const submitGongXian = async () => {
    const gasEnough = await checkGas(); // 检测Gas
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',{
        ccy:'gx_balance_token',
        ...signInfo
    }).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaimV2(id, token, sign_amount, expired_at, sign)
        showGongXian.value = false
        setTimeout(() => {
            loadIncome()
        }, 3000);
    })
}
// 提U
const submitShouYi = async () => {
    const gasEnough = await checkGas(); // 检测Gas
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',{
        ccy:'balance_usdt',
        ...signInfo
    }).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaim(id, token, sign_amount, expired_at, sign)
        showShouYi.value = false
        setTimeout(() => {
            loadIncome()
        }, 3000);
    })
}
</script>

<style lang="scss" scoped>
.bg{
    width: 420px;
    height: 390px;
    position: absolute;
    top: 0;
    right: 0;
}
.cell{
    background-color: #3030304D;
    border: 1px solid #C4C4C433;
    border-radius: 20px;
    padding: 30px;
}
.card {
    border: 1px solid transparent;
    position: relative;
    padding: 30px 30px 40px 30px;
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
.item{
    background: linear-gradient(#31303A4D, #100E1D4D);
    border-radius: 20px;
    padding: 40px 30px;
    .line{
        width: 1px;
        background-color: #FFFFFF1A;
        margin: 0 25px;
        flex-shrink: 0;
    }
}
.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
}
</style>