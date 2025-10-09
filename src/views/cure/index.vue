<template>
    <div class="pl30 pr30 pt40">

        <div class="flex jb ac">
            <div class="bold size32 font2">
                <ShinyText :text="$t('投票')"></ShinyText>
            </div>
            <div class="flex ac size24 main" @click="routerPush('/cure/vote')">
                <div class="mr5">{{ $t('查看全部') }}</div>
                <van-icon name="arrow" />
            </div>
        </div>

        <div class="card mt40" v-if="voteInfo">
            <div class="size32 bold lh60">{{ voteInfo?.title }}</div>
            <div class="flex mt24">
                <div class="flex ac size24 blue" @click="routerPush(`/cure/vote/${voteInfo?.id}`)">
                    <div class="mr5">{{ $t('投票详情') }}</div>
                    <van-icon name="arrow" />
                </div>
            </div>
            <div class="size26 lh52 mt40 rich" v-html="voteInfo?.content"></div>
            <div class="flex jb ae size28 bold" @click="routerPush(`/cure/vote/${voteInfo?.id}`)">
                <div class="agree">{{ $t('赞成') }}</div>
                <img src="@/assets/imgs/14.png" class="pic14">
                <div class="reject">{{ $t('反对') }}</div>
            </div>
        </div>

    </div>

    <!-- <div class="head">
        <CusTab :list="tabs" @change="$event => current = $event"></CusTab>
    </div>

    <Nft v-if="current==0"></Nft>
    <MyNft v-else></MyNft> -->
    <MyNft></MyNft>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
// import CusTab from '@/components/CusTab/index.vue'
// import { computed, ref } from 'vue'
import { ref } from 'vue'
import { routerPush } from '@/router'
// import Nft from './components/Nft.vue'
import MyNft from './components/MyNft.vue'
import { apiGet } from '@/utils/request'
// import { t } from '@/locale'

// const current = ref(0)
// const tabs = computed(()=>([
//     {name:t('治理NFT'), value:0},
//     {name:t('我的NFT'), value:0}
// ]))

const voteInfo = ref()
apiGet('/api/votes',{
    page_no:1,
    page_size:1,
    status:1
}).then((res:any)=>{
    if(res.votes.length>0)voteInfo.value=res.votes[0]
    else voteInfo.value = null
})
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