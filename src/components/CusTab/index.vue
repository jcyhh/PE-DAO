<template>
    <div class="cusTab">
        <div class="gap40"></div>
        <div class="cusTabBox size28 flex ac">
            <div class="cusTabLine ani" :class="current?'cur1':'cur0'"></div>
            <div class="flex1 cusTabItem ani" :class="current==index?'black':''" v-for="(item,index) in list" :key="index" @click="tabClick(index)">{{ item.name }}</div>
        </div>
        <div class="gap40"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['list', 'defaultCur'])

const emits = defineEmits(['change'])

const current = ref(props.defaultCur ? props.defaultCur : 0)

const tabClick = (index:number) => {
    if(current.value==index)return
    current.value = index
    emits('change', current.value)
}
</script>

<style lang="scss" scoped>
.cusTab{
    width: 100vw;
    padding: 0 30px;
    background-color: #090814;
    .cusTabBox{
        height: 80px;
        border: 1px solid #333333;
        background: linear-gradient(to right, #FFFFFF00, #C4C4C40D);
        border-radius: 40px;
        position: relative;
        padding: 10px;
        .cusTabItem{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            z-index: 1;
        }
    }
    .cusTabLine{
        @include linear(1);
        height: 58px;
        width: 335px;
        border-radius: 29px;
        position: absolute;
    }
    .cur0{
        left: 10px;
    }
    .cur1{
        left: 345px;
    }
}
</style>