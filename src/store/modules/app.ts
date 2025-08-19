import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLang, setLang } from '@/config/storage'
import { i18n } from '@/locale'

export const useAppStore = defineStore('app', () => {

    const hasMetaMask = ref(0) // 0异步等待钱包对象注入中 1有MetaMask环境 2无MetaMask环境

    const lang = ref(getLang()) // 当前多语言

    // 修改多语言
    const setLocale = (locale:any, reload:boolean = true) =>{
        if(locale == lang.value)return
        lang.value = locale
        setLang(locale)
        i18n.global.locale = locale
        if(reload)location.reload()
    }

    const updateHasMetaMask = (value:number) => hasMetaMask.value = value

    return {
        lang,
        setLocale,
        updateHasMetaMask
    }
})