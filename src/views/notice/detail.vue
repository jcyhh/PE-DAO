<template>
    <cusNav title="公告详情"></cusNav>
    <div class="pl30 pr30 pt30">

        <div class="size30 bold">{{ info?.title }}</div>
        <div class="size24 gray mt20">{{ info?.updated_at }}</div>
        <div class="mt40 rich" v-html="info?.content"></div>
    </div>
</template>

<script setup lang="ts">
import { apiGet } from '@/utils/request';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CusNav from '@/components/CusNav/index.vue'

const { params } = useRoute()

const info = ref()

if(params?.id)apiGet(`/api/notices/${params?.id as any}`).then(res=>info.value=res)
</script>

<style lang="scss" scoped>

</style>