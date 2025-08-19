import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDappStore = defineStore('dapp', () => {
    const address = ref('') // 钱包地址

    const updateAddress = (addr:string) => address.value = addr

    return {
        updateAddress,
        address
    }
})