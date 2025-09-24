<template>
    <CusNav title="铸币记录"></CusNav>
    <div class="head">
        <div class="filter flex jb ac" @click="showDate=true">
            <img src="@/assets/imgs/clock.png" class="img36">
            <div class="size28" v-if="start_at&&end_at">{{ start_at }}-{{ end_at }}</div>
            <div class="size28 opc6" v-else>选择时间</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
    </div>

    <div class="gap160"></div>

    <div class="pl30 pr30">

        <div class="node mb30" v-for="(item,index) in 2" :key="index">
            <div class="size40 bold">500</div>
            <div class="blue size24 mt4">铸币价值(USD)</div>
            <div class="flex jb ac mt50">
                <div class="size24">铸造数量</div>
                <div class="size28 bold">100 PE</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">消耗铸币权</div>
                <div class="size28">100 PE</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">实际支付</div>
                <div class="size28">100 USDT</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">铸造时间</div>
                <div class="size28">08-01 17:50:00</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">交易哈希</div>
                <div class="size28 tr br hash">0x456789iuhiu78yu89uihj89</div>
            </div>
        </div>

    </div>

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range" :show-confirm="false" @confirm="onDateChange" />
    </div>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { ref } from 'vue'

const showDate = ref(false)
const start_at = ref()
const end_at = ref()
const onDateChange = (vals:any) => {
    start_at.value = `${vals[0].getFullYear()}-${vals[0].getMonth() + 1}-${vals[0].getDate()}`
    end_at.value = `${vals[1].getFullYear()}-${vals[1].getMonth() + 1}-${vals[1].getDate()}`
    showDate.value = false
}
</script>

<style lang="scss" scoped>
.head{
    width: 100vw;
    height: 160px;
    background-color: #090814;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
    padding: 40px 30px 0 30px;
    .filter{
        height: 80px;
        border: 1px solid #333333;
        border-radius: 40px;
        padding: 0 20px;
    }
}
.card{
    background: linear-gradient(#31303A, #100E1D); 
}
.hash{
    width: 400px;
}
</style>