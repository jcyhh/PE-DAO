<template>
    <CusTab :list="list" @change="$event=>current=$event"></CusTab>
</template>

<script setup lang="ts">
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue';

const current = ref(0)

const list = computed(()=>([
    {name:'未使用'},
    {name:'已使用'}
]))
</script>

<style lang="scss" scoped>

</style>