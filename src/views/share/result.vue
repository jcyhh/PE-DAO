<template>
    <CusNav title="布道成果"></CusNav>

    <div class="pl30 pr30 pt40">

        <div class="card">
            <div class="tc size26">总业绩(USD)</div>
            <div class="tc size48 bold mt12">
                <ShinyText text="8000"></ShinyText>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold">5000</div>
                <div class="size20 mt10 gray">直推业绩(USD)</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold">5000</div>
                <div class="size20 mt10 gray">间推业绩(USD)</div>
            </div>
        </div>
    </div>
    
    <div class="head">
        <CusTab :list="tabs" @change="$event => current = $event"></CusTab>
    </div>

    <div class="pl30 pr30">

        <div class="node mb30" v-for="(item,index) in 5" :key="index">
            <div class="flex jb ac">
                <div class="size24 gray">用户地址</div>
                <div class="size28">0xd205e6...b268B</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">邀请类型</div>
                <div class="size28 main">直推</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">个人赞助</div>
                <div class="size28">100</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">社区赞助</div>
                <div class="size28">100</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">账户级别</div>
                <div class="size28">1星</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">注册时间</div>
                <div class="size28">08-01 17:50:00</div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue';
import CusTab from '@/components/CusTab/index.vue'
import ShinyText from '@/components/VueBits/ShinyText.vue'

const current = ref(0)
const tabs = computed(()=>([
    {name:'直推用户(88)', value:0},
    {name:'间推用户(990)', value:0}
]))
</script>

<style lang="scss" scoped>
.head{
    position: sticky;
    top: 100px;
    left: 0;
    z-index: 10;
    background-color: #090814;
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
.cell{
    background-color: #3030304D;
    border: 1px solid #C4C4C433;
    border-radius: 20px;
    padding: 30px;
}
</style>