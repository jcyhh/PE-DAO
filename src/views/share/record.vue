<template>
    <CusNav title="领取记录"></CusNav>
    <div class="head flex">
        <div class="filter flex1 flex jb ac" @click="picker.open(current)">
            <img src="@/assets/imgs/21.png" class="img36">
            <div class="size28 opc6">{{ list[current].name }}</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
        <div class="filter flex1 ml20 flex jb ac" @click="showDate=true">
            <img src="@/assets/imgs/clock.png" class="img36">
            <div class="size28 opc6" v-if="start_at&&end_at">{{ start_at }}-{{ end_at }}</div>
            <div class="size28 opc6" v-else>选择时间</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
    </div>

    <div class="gap160"></div>

    <div class="pl30 pr30">

        <div class="node mb30" v-for="(item,index) in 10" :key="index">
            <div class="flex jb ac">
                <div class="size24">数量</div>
                <div class="size28 bold">100</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">类型</div>
                <div class="size28 main">直推</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">币种</div>
                <div class="size28 flex ac">
                    <div>PE</div>
                    <img src="@/assets/pe.png" class="img26 ml10">
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">时间</div>
                <div class="size28">08-01 17:50:00</div>
            </div>
        </div>

    </div>

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range" :show-confirm="false" @confirm="onDateChange" />
    </div>

    <CusPicker ref="picker" :list="list" @change="$event=>current=$event"></CusPicker>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { ref } from 'vue'
import CusPicker from '@/components/CusPicker/index.vue';

const showDate = ref(false)
const start_at = ref()
const end_at = ref()
const onDateChange = (vals:any) => {
    start_at.value = `${vals[0].getFullYear()}-${vals[0].getMonth() + 1}-${vals[0].getDate()}`
    end_at.value = `${vals[1].getFullYear()}-${vals[1].getMonth() + 1}-${vals[1].getDate()}`
    showDate.value = false
}

const picker = ref()
const current = ref(0)
const list = [
    {name:'收益类型', value: 0},
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
</style>