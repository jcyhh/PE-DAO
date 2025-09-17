<template>
    <CusNav title="奖励点"></CusNav>
    
    <div class="head">
        <CusTab :list="tabs" @change="$event => current = $event"></CusTab>
    </div>

    <div class="gap160"></div>

    <div class="pl30 pr30">

        <div class="node mb30" v-for="(item,index) in 2" :key="index">
            <div class="flex jb ac">
                <div class="size24">数量</div>
                <div class="size28 bold">100</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24">币种</div>
                <div class="size28 flex ac">
                    <div>USDT</div>
                    <img src="@/assets/usdt.png" class="img26 ml5">
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24">时间</div>
                <div class="size28">08-01 17:50:00</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24">交易哈希</div>
                <div class="size28">0x456789iuhiu78yu89uihj89</div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue';
import CusTab from '@/components/CusTab/index.vue'

const current = ref(0)
const tabs = computed(()=>([
    {name:'USDT 池奖励点', value:0},
    {name:'PE 池奖励点', value:0}
]))
</script>

<style lang="scss" scoped>
.head{
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
}
</style>