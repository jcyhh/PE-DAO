<template>
    <div class="pl30 pr30 pt40">

        <div class="flex jb ac">
            <div class="bold size32 font2">
                <ShinyText text="投票"></ShinyText>
            </div>
            <div class="flex ac size24 main" @click="routerPush('/cure/vote')">
                <div class="mr5">查看全部</div>
                <van-icon name="arrow" />
            </div>
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

    </div>

    <div class="head">
        <CusTab :list="tabs" @change="$event => current = $event"></CusTab>
    </div>

    <Nft v-if="current==0"></Nft>
    <MyNft v-else></MyNft>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue'
import { routerPush } from '@/router'
import Nft from './components/Nft.vue'
import MyNft from './components/MyNft.vue'

const current = ref(0)
const tabs = computed(()=>([
    {name:'治理NFT', value:0},
    {name:'我的NFT', value:0}
]))

const show = ref(false)
const showRule = ref(false)
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

.head{
    position: sticky;
    top: 100px;
    left: 0;
    z-index: 10;
}
</style>