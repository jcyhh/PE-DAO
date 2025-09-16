<template>
    <div @click="menuSwitch">
        <img src="@/assets/layout/close.png" class="img52 animate__animated animate__rotateIn ani3" v-if="show">
        <img src="@/assets/layout/menu.png" class="img52" v-else>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" position="left" overlay-class="cusMask" teleport="#app">
        <div class="popBox">
            <div class="pop">
                <div class="size26 bold">{{ $t('我的地址') }}</div>
                <div class="flex jb ac mt24">
                    <div class="font1 linearTxt size32 bold" v-init:address="address"></div>
                    <img src="@/assets/layout/copy.png" class="img48" v-copy="address">
                </div>
                <div class="opc6 size24 mt12">{{ userInfo?.created_at }}</div>
                <!-- <div class="flex jb ac mt50">
                    <div class="size24">{{ $t('账户等级') }}</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/9.png" class="img48 aniRotate mr8" v-for="(item,index) in 5" :key="index">
                        <div class="size24">1星</div>
                    </div>
                </div> -->
                <div class="box flex jb ac">
                    <div class="size24">{{ $t('推荐码') }}</div>
                    <div class="flex ac size24" v-if="userInfo?.referral_code" v-copy="userInfo?.referral_code">
                        <div class="opc6 mr10">{{ userInfo?.referral_code }}</div>
                        <img src="@/assets/imgs/copy.png" class="img32">
                    </div>
                    <div class="flex ac size24" v-else @click="jump('/home/index')">
                        <div class="opc6 mr10">{{ $t('解锁推荐特权') }}</div>
                        <van-icon name="arrow" />
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
import { t } from '@/locale';
import { routerReplace } from '@/router';
import { useDappStore } from '@/store';
import { apiGet } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';

const emits = defineEmits(['change'])

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const show = ref(false)

// 用户信息
const userInfo = ref()

const menuSwitch = () => {
    if(show.value){
        show.value = false
    }else{
        show.value = true
        apiGet('/api/users/my').then(res => userInfo.value = res)
    }
}

const menus = computed(()=>([
    {name:t('首页'), path:'/home/index'},
    {name:t('邀请码'), path:'/invite/index'},
    {name:t('团队'), path:'/team/index'},
    {name:t('收益'), path:'/income/index'},
    {name:t('我的身份'), path:'/vip/index'},
    {name:t('常见问题'), path:'/qa/index'},
    // {name:'PE Forge', path:''},
]))

const jump = (path:string) => {
    if(path){
        routerReplace(path)
        show.value = false
    }else{
        location.href = 'https://secret.privateprotocol.org'
    }
    
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
        .box{
            height: 85px;
            border: 1px solid #C4C4C433;
            background-color: #3030304D;
            padding: 0 30px;
            border-radius: 20px;
            margin-top: 40px;
        }
    }
}
</style>