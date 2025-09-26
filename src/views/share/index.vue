<template>
    <img src="@/assets/imgs/19.png" class="bg">
    <div class="pl30 pr30 pt40 rel">

        <div class="bold size32 font2">
            <ShinyText text="账户信息"></ShinyText>
        </div>

        <div class="size26 bold mt44">钱包地址</div>

        <div class="flex jb ac mt20">
            <div class="bold size32 font1">
                <ShinyText :text="info?.nickname"></ShinyText>
            </div>
            <img src="@/assets/imgs/20.png" class="img48" v-copy="address">
        </div>
        <div class="flex mt20">
            <div class="flex ac" v-copy="info?.id">
                <div class="size24 opc6">DAO-ID: {{ info?.id }}</div>
                <img src="@/assets/imgs/copy.png" class="img24 ml10">
            </div>
        </div>
        <div class="flex jb ac mt40">
            <div class="size24">赞助价值</div>
            <div class="size26 bold"><span v-init="info?.sponsor_kpi"></span> USD</div>
        </div>
        <div class="flex jb ac mt30">
            <div class="size24">推荐码</div>
            <div class="size26 flex ac" v-copy="info?.referral_code">
                <div class="opc6">{{ info?.referral_code }}</div>
                <img src="@/assets/imgs/copy.png" class="img24 ml10">
            </div>
        </div>
        <div class="cell mt48 flex jb ac size24" @click="routerPush('/share/code')">
            <div>邀请码</div>
            <van-icon name="arrow" />
        </div>
        <div class="flex jb ac mt80">
            <div class="bold size32 font2">
                <ShinyText text="布道成果"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/result')">
                <div class="mr5">查看详情</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="card mt40">
            <div class="tc size26">总业绩(USD)</div>
            <div class="tc size48 bold mt12">
                <ShinyText :text="initNumber(info?.sponsor_team_kpi)"></ShinyText>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold" v-init="info?.referral_kpi"></div>
                <div class="size20 mt10 gray">直推业绩(USD)</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold" v-init="info?.jt_kpi"></div>
                <div class="size20 mt10 gray">间推业绩(USD)</div>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold">{{ info?.team_count }}</div>
                <div class="size20 mt10 gray">团队人数</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold">{{ info?.referral_count }}</div>
                <div class="size20 mt10 gray">直推人数</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold">{{ info?.jt_count }}</div>
                <div class="size20 mt10 gray">间推人数</div>
            </div>
        </div>
        <div class="flex jb ac mt80 mb40">
            <div class="bold size32 font2">
                <ShinyText text="领取奖励"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/record')">
                <div class="mr5">查看详情</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item mb30">
            <div class="flex jb ac">
                <div class="size24 opc6">总赞助奖励</div>
                <div class="size26"><span v-init="stats?.jt_income"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">待领取赞助奖励</div>
                <div class="size26"><span v-init="stats?.jt_balance_token"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">已领取赞助奖励</div>
                <div class="size26"><span v-init="stats?.jt_withdraw_amount"></span> {{ tokenName }}</div>
            </div>
            <div class="mainBtn mt48">领取赞助奖励</div>
        </div>
        <div class="item mb30">
            <div class="flex jb ac">
                <div class="size24 opc6">总布道奖励</div>
                <div class="size26"><span v-init="stats?.dt_income"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">待领取布道奖励</div>
                <div class="size26"><span v-init="stats?.dt_balance_token"></span> {{ tokenName }}</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">已领取布道奖励</div>
                <div class="size26"><span v-init="stats?.dt_withdraw_amount"></span> {{ tokenName }}</div>
            </div>
            <div class="mainBtn mt48">领取布道奖励</div>
        </div>
        <div class="flex jb ac mt80 mb40">
            <div class="bold size32 font2">
                <ShinyText text="赞助奖励"></ShinyText>
            </div>
            <div class="flex ac main size20" @click="routerPush('/share/log')">
                <div class="mr5">查看详情</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item flex ast mt40" style="background: #FFFFFF0F;">
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.day_jt_income_u"></div>
                <div class="size20 gray mt10">今日赞助奖励(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.month_jt_income_u"></div>
                <div class="size20 gray mt10">本月赞助奖励(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.count_jt_income_u"></div>
                <div class="size20 gray mt10">全部赞助奖励(USD)</div>
            </div>
        </div>
        <div class="flex jb ac mt60 mb40">
            <div class="bold size32 font2">
                <ShinyText text="布道奖励"></ShinyText>
            </div>
            <div class="flex ac main size20">
                <div class="mr5">查看详情</div>
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="item flex ast mt40" style="background: #FFFFFF0F;">
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.day_dt_income_u"></div>
                <div class="size20 gray mt10">今日布道奖励(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.month_dt_income_u"></div>
                <div class="size20 gray mt10">本月布道奖励(USD)</div>
            </div>
            <div class="line"></div>
            <div class="flex1 tc">
                <div class="size28 bold" v-init="stats?.count_dt_income_u"></div>
                <div class="size20 gray mt10">全部布道奖励(USD)</div>
            </div>
        </div>
    </div>

    <div class="gap60"></div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { tokenName } from '@/config';
import { routerPush } from '@/router';
import { useDappStore } from '@/store';
import { initNumber } from '@/utils';
import { apiGet } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const useStore = useDappStore()
const { address } = storeToRefs(useStore)

const info = ref()
apiGet('/api/users/my').then(res=>info.value=res)

const stats = ref()
apiGet('/api/users/my/income').then(res=>stats.value=res)
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
</style>