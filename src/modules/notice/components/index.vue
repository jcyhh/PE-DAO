<template>
    <div class="flex jb ac noticeBox">
        <img src="@/assets/home/0.png" class="img36">
        <van-swipe class="notice" :show-indicators="false" :vertical="true" :autoplay="autoplay">
            <van-swipe-item v-for="(item,index) in list" :key="index">
                <div class="notice line1" @click.stop="routerPush(`/notice/${item.id}`)">{{ item.title }}</div>
            </van-swipe-item>
        </van-swipe>
        <div class="btn flex jc ac size24" @click="routerPush('/notice')">{{ $t('查看') }}</div>
    </div>
    
</template>

<script setup lang="ts">
import { routerPush } from '@/router';
import { autoplay, getNotice } from '..';
import { ref } from 'vue';

const list = ref()
getNotice({
    page_no: 1,
    page_size: 10
}).then((res:any)=>list.value = res.notices)
</script>

<style lang="scss" scoped>
.noticeBox{
    height: 102px;
    border-bottom: 1px solid #2B2B2B;
    padding: 0 30px;
}
.notice{
    width: 506px;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
}
.btn{
    min-width: 108px;
    @include linearBorder(48, #121212, 4);
}
</style>