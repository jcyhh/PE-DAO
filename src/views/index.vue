<template>
    <div class="start flex jc ac">
        <img src="@/assets/common/start.png" class="startImg animate__animated animate__bounceInRight" />
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp" v-if="hasMetaMask==2">请安装 MateMask !</div>
</template>

<script setup lang="ts">
import { homePath } from '@/config/dapp';
import { getAddress, getRef, getToken, setToken } from '@/config/storage';
import { useEthers } from '@/dapp';
import { routerReplace } from '@/router';
import { useDappStore } from '@/store';
import { apiPost } from '@/utils/request';
import { watch } from 'vue';

const { hasMetaMask, connectWallet, getSign } = useEthers()

const useStore = useDappStore()

// 当钱包对象异步注入到浏览器后
watch(hasMetaMask, async (val)=>{
    const token = getToken()
    if(val==1){
        // 有钱包环境，钱包登录 或者 去首页
        await connectWallet()
        token ? setTimeout(() => routerReplace(homePath), 1500) : loginIn();
    }
})

// 钱包登录
const loginIn = async () => {
    const signInfo = await getSign('Login')
    setToken('token')
    routerReplace(homePath)
    return
    const address = getAddress()
    apiPost('/api/auth/login',{
        ref: getRef(),
        address,
        ...signInfo
    }).then((res:any)=>{
        setToken(res.token)
        useStore.updateAddress(address)
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
</style>