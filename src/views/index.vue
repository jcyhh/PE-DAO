<template>
    <div class="start flex jc ac">
        <img src="@/assets/common/start.png" class="startImg animate__animated animate__bounceInRight" />
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp" v-if="hasMetaMask==2">请安装 MateMask !</div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="bind">
            <div class="tc size32 bold">激活地址</div>
            <div class="mt60 size24">当前地址</div>
            <div class="box mt20 size20 gray br lh30">{{ address }}</div>
            <div class="mt30 size24">邀请码</div>
            <div class="box mt20 flex">
                <input type="text" v-model="inviteCode" placeholder="请输入邀请码" class="size20 flex1">
            </div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:loginIn}">确认</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { homePath } from '@/config/dapp';
import { getToken, setToken } from '@/config/storage';
import { useEthers } from '@/dapp';
import { routerReplace } from '@/router';
import { useDappStore } from '@/store';
import { apiPost } from '@/utils/request';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const { connectWallet, getSign } = useEthers()

const dappStore = useDappStore()
const { address, hasMetaMask } = storeToRefs(dappStore)

const show = ref(false)
const inviteCode = ref()

// 当钱包对象异步注入到浏览器后，钱包登录 或者 去首页
watch(hasMetaMask, async (val)=>{
    if(val!=1)return
    await connectWallet()
    setTimeout(() => getToken() ? routerReplace(homePath) : show.value=true, 1500);
},{immediate:true})

// 钱包登录
const loginIn = async () => {
    const signInfo = await getSign('Login')
    apiPost('/api/auth/login',{
        ref: inviteCode.value,
        address: address.value,
        ...signInfo
    }).then((res:any)=>{
        setToken(res.token)
        routerReplace(homePath)
    })
}
</script>

<style lang="scss" scoped>
.start {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-bottom: 200px;

    .startImg {
        width: 50vw;
        height: auto;
    }
}
.tips{
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
}
.bind{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .box{
        padding: 30px 24px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
}
</style>