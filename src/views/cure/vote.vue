<template>
    <CusNav title="投票列表"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="bold size32 font2">
            <ShinyText text="正在投票中..."></ShinyText>
        </div>

        <div class="card mt40">
            <div class="size32 bold lh60">提案 #TGP-2024-015-优化Gas费用的资金分配方案 </div>
            <div class="flex mt24">
                <div class="flex ac size24 blue" @click="routerPush(`/cure/vote/id`)">
                    <div class="mr5">投票详情</div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="size26 lh52 mt40">
                本提案建议将本季度国库中预留的「Gas费补贴」预算(共计50,000 USDC)的
                <span class="green">20%</span>
                (即 10,000 USDC)用于
                <span class="main">回购并销毁社区治理代币</span>
                ，其余80%继续用于补贴用户链上交互成本。
            </div>
            <div class="flex jb ae size28 bold">
                <div class="agree">赞成</div>
                <img src="@/assets/imgs/14.png" class="pic14">
                <div class="reject">反对</div>
            </div>
        </div>

        <div class="bold size32 font2 mt80 mb40">
            <ShinyText text="投票已完成"></ShinyText>
        </div>

        <div class="item mb40" v-for="(item,index) in 3" :key="index">
            <div class="flex ac">
                <img src="@/assets/imgs/17.png" class="img52 mr10">
                <div class="size26 bold red">未通过</div>
            </div>
            <div class="size32 bold lh60 mt20">提案 #TGP-2024-015-优化Gas费用的资金分配方案 </div>
            <div class="size26 lh52 mt24">
                本提案建议将本季度国库中预留的「Gas费补贴」预算(共计50,000 USDC)的
                <span class="green">20%</span>
                (即 10,000 USDC)用于
                <span class="main">回购并销毁社区治理代币</span>
                ，其余80%继续用于补贴用户链上交互成本。 
            </div>
            <div class="flex jb size24 mt40">
                <div class="green">赞成</div>
                <div class="main">反对</div>
            </div>
            <div class="rate flex jb size18 bold mt24">
                <div class="rateAgree flex1">30%</div>
                <div class="rateReject flex1">70%</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import CusNav from '@/components/CusNav/index.vue'
import { routerPush } from '@/router'
</script>

<style lang="scss" scoped>
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
    .pic14{
        width: 70px;
        height: 110px;
    }
    .agree{
        width: 280px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/15.png");
        background-size: 100% 100%;
        color: #000000;
    }
    .reject{
        width: 280px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/16.png");
        background-size: 100% 100%;
        color: #000000;
    }
}
.item{
    position: relative;
    padding: 30px 30px 40px 30px;
    background: #3030304D;
    border-radius: 20px;

    &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 20px;
        background: linear-gradient(#FFFFFF, #FFFFFF00);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        padding: 1px;
    }

    .rate{
        height: 38px;
        border-radius: 19px;
        overflow: hidden;
        .rateAgree{
            background-color: $green;
            height: 38px;
            line-height: 38px;
            padding-left: 30px;
        }
        .rateReject{
            background-color: $main-color;
            height: 38px;
            line-height: 38px;
            padding-right: 30px;
            text-align: right;
        }
    }
}
</style>