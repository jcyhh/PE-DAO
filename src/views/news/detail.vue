<template>
    <CusNav title="新闻详情"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="size36 bold lh60">{{ info?.title }}</div>

        <div class="size26 mt24">发布者: DAO治理委员会</div>
        <div class="size24 opc6 mt20" v-init:time="info?.updated_at"></div>

        <div class="flex ac mt30 size24 main">
            <img src="@/assets/pe.png" class="img30 mr10">
            <div>官方公告</div>
            <div class="line"></div>
            <div>治理动态</div>
        </div>

        <img :src="info?.cover_img" class="cover">

        <div class="rich mt60" v-html="info?.content"></div>

    </div>
</template>

<script setup lang="ts">
import { apiGet } from '@/utils/request';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import CusNav from '@/components/CusNav/index.vue'

const { params } = useRoute()

const info = ref()

if(params?.id)apiGet(`/api/journalism_notices/${params?.id}`).then(res=>info.value=res)
</script>

<style lang="scss" scoped>
.line{
    width: 1px;
    height: 20px;
    background-color: #999999;
    margin: 0 30px;
}
.cover{
    margin: 60px 0;
    width: 100%;
    height: auto;
}
</style>