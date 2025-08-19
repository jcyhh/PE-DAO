<template>
    <img src="@/assets/imgs/1.png" class="bg1 anitr animate__animated animate__zoomIn">
    <div class="top flex jb ac">
        <div class="topLeft">
            <div class="linearTxt size48 bold">加入 {{ appName }}</div>
            <div class="size28 bold mt20">让我们共同创造Web3的未来</div>
            <div class="size20 desc mt30">分权治理社区共建利益共享</div>
        </div>
        <div class="pic4">
            <img src="@/assets/imgs/4.png" class="pic4">
            <img src="@/assets/imgs/5.png" class="pic5 anibr animate__animated animate__zoomIn delay1">
            <img src="@/assets/imgs/6.png" class="pic6 anibr animate__animated animate__zoomIn delay2">
        </div>
    </div>

    <div class="pl30 pr30">

        <div class="card pt30 pb30">
            <div class="pl30 pr30 flex jb ac">
                <div>
                    <div class="size32 bold font2">HI!共识者</div>
                    <div class="size20 grey mt8">恭喜加入PE项目共创</div>
                </div>
                <div class="invite" @click="message('暂未开放','info')">立即赞助</div>
            </div>
            <div class="line"></div>
            <div class="flex ast pl30 pr30">
                <img src="@/assets/imgs/7.png" class="pic7 flex0 mr30">
                <div class="flex1 flex col jb">
                    <div>
                        <div class="size20 blue">赞助金额(USDT)</div>
                        <div class="size44 bold mt8">100.00</div>
                    </div>
                    <div class="size20 grey mt10">赞助100U加入PE项目共创，获得价值100U初始流动性，权益及分享共识者资格</div>
                </div>
            </div>
        </div>

        <Node></Node>

        <div class="linearTxt size32 bold font2 mt80 mb40">Q&A</div>

        <QA ref="qa" class="mb30" v-for="(item,index) in 3" :key="index" :index="index" @open="onQaOpen"></QA>

    </div>

    <div class="gap80"></div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="bind">
            <div class="tc size32 bold">激活地址</div>
            <div class="mt60 size24">当前地址</div>
            <div class="box mt20 size20 gray">0xd205e66545DCf043cF30CCDB97508332BD7b</div>
            <div class="mt30 size24">邀请码</div>
            <div class="box mt20 flex">
                <input type="text" placeholder="请输入邀请码" class="size20 flex1">
            </div>
            <div class="mainBtn mt40" v-scale>确认</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { appName } from '@/config';
import Node from './components/Node.vue'
import QA from './components/QA.vue'
import { ref } from 'vue';
import { message } from '@/utils/message';

const show = ref(false)

const qa = ref()
const onQaOpen = (index:any)=>{
    qa.value.forEach((item:any)=>item.close(index))
}
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

.card{
    border: 1px solid #FFFFFF29;
    background-color: #3030304D;
    border-radius: 20px;
    .invite{
        @include linear;
        height: 54px;
        border-radius: 27px;
        line-height: 54px;
        font-size: 24px;
        color: #000000;
        padding: 0 20px;
        position: relative;
        z-index: 5;
    }
    .line{
        width: 100%;
        height: 2px;
        background-color: #090814;
        margin: 30px 0;
    }
    .pic7{
        width: 240px;
        height: 180px;
    }
}
.bind{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .box{
        padding: 30px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
}
</style>