<template>
    <div>
        <div class="cusNav flex jb ac">
            <div class="flex1" @click="back">
                <img src="./back.png" class="img52">
            </div>
            <div class="flex2 size32 tc">{{ title || '' }}</div>
            <div class="flex1 flex je ac">
                <slot></slot>
            </div>
        </div>
        <div class="gap100"></div>
    </div>
</template>

<script setup lang="ts">
import { routerGo } from '@/router'

defineProps(['title'])

// 返回按钮
const back = () => routerGo()
</script>

<style lang="scss" scoped>
.cusNav{
    width: 100vw;
    height: 100px;
    background-color: #090814;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;
}
</style>