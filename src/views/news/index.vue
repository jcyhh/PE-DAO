<template>
    <div class="pl30 pr30 pt40">

        <div class="bold size32 font2 mb40">
            <ShinyText text="新闻公告"></ShinyText>
        </div>

        <div class="card mb30" v-for="(item,index) in 3" :key="index" @click="routerPush(`/news/id`)">
            <div class="flex ast">
                <img src="@/assets/usdt.png" class="newsImg flex0">
                <div class="flex1 ml20">
                    <div class="line1 size28 bold">宣布与0cean Protocol达成战略合作</div>
                    <div class="line2 mt20 lh40 size24 opc6">社区已投票通过提案 #TGP-2024-015。自下季度起，20%的Gas补贴预算将用于回社区已投票通过提案社区已投票通过提案</div>
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="flex ac">
                    <img src="@/assets/pe.png" class="img30 mr10">
                    <div class="size24 main">官方公告</div>
                </div>
                <div class="size24 opc6">2025-01-18</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { routerPush } from '@/router';
</script>

<style lang="scss" scoped>
.card{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    padding: 30px;
    border-radius: 20px;
    .newsImg{
        width: 140px;
        height: 140px;
        border-radius: 20px;
    }
}
</style>