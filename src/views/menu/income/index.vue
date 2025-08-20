<template>
    <div class="gap90"></div>
    <div class="tc">
        <div class="linearNum size60 bold font1">146904.16</div>
        <div class="size24 gray mt10">总收益(USDT)</div>
    </div>

    <div class="pl30 pr30 mt60">
        <div class="top flex ac tc">
            <div class="flex1">
                <div class="size36 bold font1">8,000.38</div>
                <div class="size24 gray mt16">直推收益(USDT)</div>
            </div>
            <div class="line"></div>
            <div class="flex1">
                <div class="size36 bold font1">2,000.38</div>
                <div class="size24 gray mt16">直推收益(USDT)</div>
            </div>
        </div>
        <div class="mt40 card">
            <div class="flex jb ac">
                <div class="size24 opc6">待领取收益</div>
                <div class="size26">16,568.68</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">已领取收益</div>
                <div class="size26">16,568.68</div>
            </div>
        </div>
        <div class="mainBtn mt40">领取收益</div>
    </div>

    <div class="title">
        <div class="gap50"></div>
        <div class="flex jb ac">
            <div class="flex ac">
                <div class="line mr10"></div>
                <div class="size28 bold">收益明细</div>
            </div>
            <div class="flex">
                <div class="filter flex ac size24 gray" @click="picker.open(current)">
                    <div class="mr10">{{ list[current].name }}</div>
                    <van-icon name="arrow-down" />
                </div>
                <div class="filter flex ac size24 gray ml20">
                    <div class="mr10">选择时间</div>
                    <van-icon name="arrow-down" />
                </div>
            </div>
        </div>
        <div class="gap20"></div>
    </div>

    <div class="pl30 pr30">
        <div class="pt30 pb30" v-for="(item,index) in 20" :key="index">
            <div class="flex jb ac">
                <div class="size28">备注</div>
                <div class="size28 bold">268</div>
            </div>
            <div class="flex jb size24 opc4 mt10">
                <div>2025-07-06 15:28:26</div>
                <div>BNB</div>
            </div>
        </div>
    </div>

    <CusPicker ref="picker" :list="list" @change="$event=>current=$event"></CusPicker>
</template>

<script setup lang="ts">
import CusPicker from '@/components/CusPicker/index.vue';
import { ref } from 'vue';

const picker = ref()
const current = ref(0)
const list = [
    {name:'选项1', value: 1},
    {name:'选项2', value: 2},
    {name:'选项3', value: 3},
    {name:'选项4', value: 4},
    {name:'选项5', value: 5},
    {name:'选项6', value: 6},
    {name:'选项7', value: 7},
    {name:'选项8', value: 8},
    {name:'选项9', value: 9},
    {name:'选项10', value: 10}
]
</script>

<style lang="scss" scoped>
.top{
    height: 174px;
    background-image: url("@/assets/imgs/12.png");
    background-size: 100% 100%;
    .line{
        width: 1px;
        height: 80px;
        background-color: #D9D9D933;
    }
}
.card{
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    padding: 40px 30px;
}
.title{
    position: sticky;
    top: 100px;
    left: 0;
    z-index: 10;
    background-color: #090814;
    width: 100vw;
    padding: 0 30px;
    .line{
        width: 4px;
        height: 32px;
        background-color: $main-color;
    }
    .filter{
        height: 58px;
        border-radius: 29px;
        border: 1px solid #C4C4C433;
        background-color: #3030304D;
        padding: 0 20px;
    }
}
.tag{
    height: 32px;
    border-radius: 10px 10px 10px 0;
    padding: 0 20px;
    font-size: 18px;
    line-height: 32px;
}
.tag1{
    @include linear(1);
    color: #000000;
}
.tag2{
    background-color: #343641;
}
</style>