<template>
    <CusTab :list="list" @change="$event=>current=$event"></CusTab>

    <div class="pl30 pr30">

        <div class="card mb30" v-for="(item,index) in 6" :key="index">
            <div class="size26 bold mb24">邀请码</div>
            <div class="flex jb ac">
                <div class="linearNum size32 bold font1">0YUIHK098</div>
                <img src="@/assets/layout/copy.png" class="img48">
            </div>
            <div class="flex jb ac mt60">
                <div class="size24 opc6">地址</div>
                <div class="flex ac">
                    <div class="size26">0xd205e6...b268B</div>
                    <img src="@/assets/imgs/copy.png" class="img24 ml10">
                </div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">状态</div>
                <div class="size26">已使用</div>
            </div>
            <div class="flex jb ac mt28">
                <div class="size24 opc6">使用时间</div>
                <div class="size26">2025.08.01 17:50</div>
            </div>
        </div>

    </div>

    <div class="gap160"></div>
    <div class="btn">生成邀请码</div>
</template>

<script setup lang="ts">
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue';

const current = ref(0)

const list = computed(()=>([
    {name:'未使用'},
    {name:'已使用'}
]))
</script>

<style lang="scss" scoped>
.card{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    border-radius: 20px;
    padding: 40px 30px;
}
.btn{
    @include linear;
    width: 690px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    color: #1B1B1E;
    font-size: 26px;
    font-weight: bold;
    border-radius: 36px;
    position: fixed;
    bottom: 60px;
    left: 30px;
    z-index: 10;
}
</style>