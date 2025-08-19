<template>
    <div @click="show=!show">
        <img src="@/assets/layout/close.png" class="img52 animate__animated animate__rotateIn ani3" v-if="show">
        <img src="@/assets/layout/menu.png" class="img52" v-else>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" position="left" overlay-class="cusMask" teleport="#app">
        <div class="popBox">
            <div class="pop">
                <div class="size26 bold">我的地址</div>
                <div class="flex jb ac mt24">
                    <div class="font1 linearTxt size32 bold">0xd205e6...7b268B</div>
                    <img src="@/assets/layout/copy.png" class="img48">
                </div>
                <div class="opc6 size24 mt12">2025.08.01 17:50</div>
                <div class="flex jb ac mt50">
                    <div class="size24">账户登记</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/9.png" class="img48 aniRotate">
                        <div class="size24 ml8">1星</div>
                    </div>
                </div>
                <div class="line mt60 mb30"></div>
                <div class="pt30 pb30 flex jb ac" v-for="(item,index) in menus" :key="index" @click="jump(item.path)">
                    <div class="size28" :class="$route.path==item.path?'main':''">{{ item.name }}</div>
                    <img src="@/assets/layout/arrowAct.png" class="img40" v-if="$route.path==item.path">
                    <img src="@/assets/layout/arrow.png" class="img40" v-else>
                </div>
            </div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { routerReplace } from '@/router';
import { computed, ref, watch } from 'vue';

const emits = defineEmits(['change'])

const show = ref(false)

const menus = computed(()=>([
    {name:'首页', path:'/home/index'},
    {name:'邀请码', path:'/invite/index'},
    {name:'团队', path:'/team/index'},
    {name:'收益', path:'/income/index'},
    {name:'我的身份', path:'/vip/index'},
    {name:'常见问题', path:'/qa/index'}
]))

const jump = (path:string) => {
    routerReplace(path)
    show.value = false
}

watch(show, val => {
    if(val)emits('change', val)
    else setTimeout(() => emits('change', val), 300);
})
</script>

<style lang="scss" scoped>
.popBox{
    width: 594px;
    height: 100vh;
    padding-top: 102px;
    .pop{
        width: 590px;
        height: calc(100vh - 104px);
        background: linear-gradient(to right, #080908, #201822);
        border-radius: 0 40px 40px 0;
        border: 1px solid transparent;
        position: relative;
        padding: 40px 30px;
        &::before{
            content: "";
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            z-index: -1;
            background: linear-gradient(to right, #00000000, #C348FF);
            border-radius: 0 40px 40px 0;
        }
        .line{
            height: 1px;
            background-color: #FFFFFF33;
        }
    }
}
</style>