<template>
    <div class="head flex jb ac" :style="{ backgroundColor: `rgba(0, 0, 0, ${$route.path=='/home'?0.2:0.5})` }">
        <Menu></Menu>

        <div class="linearTxt font1 size40">{{ appName }}</div>

        <CusLang></CusLang>
    </div>

    <div class="gap100"></div>

    <RouterView></RouterView>
</template>

<script setup lang="ts">
import CusLang from '@/components/CusLang/index.vue';
import Menu from './Menu.vue';
import { appName } from '@/config';
</script>

<style lang="scss" scoped>
.head {
    width: 100vw;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3000;
    padding: 0 30px;

    .connect{
        height: 52px;
        border-radius: 26px;
        color: #000000;
        padding: 0 20px;
        line-height: 52px;
        @include linear;
    }
}

.pop {
    width: 520px;
    height: 100vh;
    padding-top: 100px;

    .menu {
        width: 520px;
        height: calc(100vh - 100px);
        padding: 40px 30px;
        background-color: #191B1A;
        position: relative;
        .item{
            height: 76px;
            border-radius: 38px;
            padding: 0 30px;
            margin-bottom: 25px;
        }
        .border{
            width: 460px;
            height: 76px;
            position: absolute;
        }
        .border-1{
            top: 40px;
        }
        .border-2{
            top: 141px;
        }
        .border-3{
            top: 242px;
        }
        .border-4{
            top: 343px;
        }
        .border-5{
            top: 444px;
        }
        .border-6{
            top: 545px;
        }
        .border-7{
            top: 646px;
        }
    }
}
</style>