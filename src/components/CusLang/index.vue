<template>
    <div @click="open">
        <slot>
            <img src="./lang.png" class="img52">
        </slot>
    </div>

    <CusPicker ref="picker" :list="langs" :title="$t('切换语言')" @change="onChange"></CusPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CusPicker from '@/components/CusPicker/index.vue';
import { langs } from '@/locale'
import { useAppStore } from '@/store';
import { storeToRefs } from 'pinia';

const useStore = useAppStore()
const { lang } = storeToRefs(useStore)

const picker = ref()
const current = ref(0)

const open = () => {
    current.value = langs.findIndex(item => item.lang === lang.value)
    picker.value.open(current.value)
}

const onChange = (index: number) => {
    current.value = index
    useStore.setLocale(langs[index].lang)
}
</script>

<style lang="scss" scoped>

</style>