<template>
    <CusTab :list="list" @change="$event=>current=$event"></CusTab>
    <div class="pl30 pr30">

        <div class="node">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img src="@/assets/imgs/8.png" class="img44 mr20" :class="'icon anibc'">
                    <div class="size24 bold">{{ '身份-宝剑' }}</div>
                </div>
                <div>
                    <div class="size24 opc6 mb20">进度 50%</div>
                    <CusProgress :width="50"></CusProgress>
                </div>
            </div>
            <div class="size40 bold mt40">500.00</div>
            <div class="size20 blue mt4">售卖价格(USDT)</div>
            <div class="flex jb ac mt50">
                <div class="size24">等级权益</div>
                <div class="flex ac">
                    <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                    <div class="size24 bold">1星</div>
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">空投代币比例</div>
                <div class="size26">40%</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放周期</div>
                <div class="size26">8个月</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放方式</div>
                <div class="size26">10%/10%/5%/5%...</div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue';

const current = ref(0)

const list = computed(()=>([
    {name:'当前身份'},
    {name:'已使用'}
]))
</script>

<style lang="scss" scoped>

</style>