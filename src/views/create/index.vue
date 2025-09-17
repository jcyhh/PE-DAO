<template>
    <img src="@/assets/imgs/13.png" class="bg">
    <div class="pl30 pr30 rel">
        <div class="gap80"></div>
        <div class="flex jc">
            <img src="@/assets/usdt.png" class="img48">
        </div>
        <div class="bold tc size48 mt28">
            <div class="linearTxt">989098000</div>
        </div>
        <div class="tc size24 mt20">总市值(USDT)</div>
        <div class="mainCard mt50 flex jb ac">
            <div class="size24 opc6">累计发放共创激励价值</div>
            <div class="size28 bold">1000 USDT</div>
        </div>
        <div class="flex jb ac mt40 size24">
            <div class="flex ac">
                <img src="@/assets/imgs/clock.png" class="img30 mr12">
                <div>下次铸币时间</div>
            </div>
            <div class="main">08月01日 17:50:00</div>
        </div>
        <div class="card mt80">
            <div class="bold size32">
                <ShinyText text="铸币"></ShinyText>
            </div>
            <div class="flex jb ac mt40">
                <div>
                    <div class="linearNum size40 bold">1000</div>
                    <div class="size24 mt20">铸币池总额</div>
                </div>
                <div>
                    <div class="size24 opc6">我铸造的币</div>
                    <div class="size26 bold mt20">888 USDT</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
</script>

<style lang="scss" scoped>
.bg{
    width: 750px;
    height: 821px;
    position: absolute;
    top: 0;
    left: 0;
}
.card{
    border: 1px solid transparent;
    position: relative;
    padding: 30px 30px 60px 30px;
    background: linear-gradient(#1B0E2B, #0A0915);
    border-radius: 20px;
    &::before{
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
</style>