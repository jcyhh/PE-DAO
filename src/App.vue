<template>
    <RouterView v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </RouterView>
</template>

<script setup lang="ts">
import { startPath } from '@/config/dapp';
import { useEthers } from '@/dapp';
import { watch } from 'vue';
import { getToken, setAddress } from './config/storage';
import { routerPush } from './router';
import { logout } from './utils/request';
import { useAppStore } from './store';

const useStore = useAppStore()

const { ethereum } = window as any;

/**
 * 钱包处理
 */
const { hasMetaMask, connectWallet, checkChain, address } = useEthers()
const init = async () => {
    await connectWallet() // 连接钱包
    await checkChain() // 检查网络
    createListener() // 创建监听
}
// 本地存的地址跟当前链接保持同步
watch(address,(val)=>setAddress(val))
// 当钱包对象异步注入到浏览器后
watch(hasMetaMask, async (val)=>{
    useStore.updateHasMetaMask(val)
    if(val==1)await init()
    if(!getToken())routerPush(startPath)
})
// 创建监听
const createListener = () => {
    ethereum.on('accountsChanged', handlerChanged); // 账户切换或断开钱包链接
    ethereum.on('chainChanged',  handlerChanged); // 网络切换
}
// 移除监听
const removeListener = () => {
    ethereum.off('accountsChanged', handlerChanged);
    ethereum.off('chainChanged',  handlerChanged);
}
// 回调：账户切换、断开钱包链接、网络切换
const handlerChanged = async () => {
    removeListener();
    await init();
    logout()
}
</script>

<style scoped></style>
