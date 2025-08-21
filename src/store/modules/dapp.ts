import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDappStore = defineStore('dapp', () => {

    const hasMetaMask = ref(0) // 0异步等待钱包对象注入中 1有MetaMask环境 2无MetaMask环境

    const address = ref('') // 钱包地址

    const updateAddress = (addr:string) => address.value = addr

    const updateHasMetaMask = (value:number) => hasMetaMask.value = value

    return {
        address,
        hasMetaMask,
        updateAddress,
        updateHasMetaMask
    }
})