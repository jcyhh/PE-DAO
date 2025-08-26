<template>
    <img src="@/assets/imgs/1.png" class="bg1 anitr animate__animated animate__zoomIn">
    <div class="top flex jb ac">
        <div class="topLeft">
            <div class="linearTxt size48 bold">{{ $t('加入') }} {{ appName }}</div>
            <div class="size28 bold mt20">{{ $t('让我们共同创造Web3的未来') }}</div>
            <div class="size20 desc mt30">{{ $t('分权治理社区共建利益共享') }}</div>
        </div>
        <div class="pic4">
            <img src="@/assets/imgs/4.png" class="pic4">
            <img src="@/assets/imgs/5.png" class="pic5 anibr animate__animated animate__zoomIn delay1">
            <img src="@/assets/imgs/6.png" class="pic6 anibr animate__animated animate__zoomIn delay2">
        </div>
    </div>

    <div class="pl30 pr30">

        <Node></Node>

    </div>

    <div class="gap80"></div>
</template>

<script setup lang="ts">
import { appName } from '@/config';
import Node from './components/Node.vue'
</script>

<style lang="scss" scoped>
.bg1 {
    width: 750px;
    height: 750px;
    position: absolute;
    top: 0;
    left: 0;
}

.top {
    width: 100%;
    height: 457px;
    position: relative;
    z-index: 1;
    padding: 0 30px;

    .topLeft {
        width: 340px;
    }

    .desc {
        color: #B3B9C1;
    }

    .pic4 {
        width: 238px;
        height: 238px;
        position: relative;
        z-index: 2;
    }
    .pic5{
        width: 244px;
        height: 244px;
        position: absolute;
        right: 19px;
        bottom: 6px;
        z-index: 1;
    }

    .pic6 {
        width: 270px;
        height: 270px;
        position: absolute;
        right: 20px;
        bottom: 7px;
    }
}
</style>