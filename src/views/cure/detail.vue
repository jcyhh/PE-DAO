<template>
    <CusNav title="投票详情"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="flex jb ac size32 font2">
            <ShinyText text="正在投票中..."></ShinyText>
            <!-- <div class="green">已赞成</div> -->
            <!-- <div class="main">已反对</div> -->
            <div class="flex ac">
                <img src="@/assets/imgs/17.png" class="img52 mr10">
                <div class="red">未通过</div>
            </div>
        </div>

        <div class="flex jb ac mt44">
            <div class="size24">投票结果</div>
            <div class="size26 main">赞成 68.2%-反对 29.5%</div>
        </div>
        <div class="flex jb ac mt32">
            <div class="size24 opc6">投票开始时间</div>
            <div class="size26">2025-11-10 00:00 UTC</div>
        </div>
        <div class="flex jb ac mt32">
            <div class="size24 opc6">投票截止时间</div>
            <div class="size26">2025-11-10 00:00 UTC</div>
        </div>
        <div class="flex jb mt32">
            <div class="size24 opc6">提案地址</div>
            <div class="size26 tr br address">0x8a407a5d104f2b8c1a3b6d5f2c8c9a1b3d5f208</div>
        </div>

        <div class="card mt45">
            <div class="size32 bold lh60">提案 #TGP-2024-015-优化Gas费用的资金分配方案</div>
        </div>
    </div>

    <div class="gap180"></div>
    <div class="bot flex jb ae size28 bold">
        <div class="agree">赞成</div>
        <img src="@/assets/imgs/14.png" class="pic14">
        <div class="reject">反对</div>
    </div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import CusNav from '@/components/CusNav/index.vue'
</script>

<style lang="scss" scoped>
.address{
    width: 440px;
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
.bot{
    height: 180px;
    width: 100vw;
    background-color: #090814;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px 40px 30px;
    .pic14{
        width: 70px;
        height: 110px;
    }
    .agree{
        width: 310px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/15.png");
        background-size: 100% 100%;
        color: #000000;
    }
    .reject{
        width: 310px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/16.png");
        background-size: 100% 100%;
        color: #000000;
    }
}
</style>