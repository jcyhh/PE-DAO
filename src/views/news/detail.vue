<template>
    <CusNav title="新闻详情"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="size36 bold lh60">宣布与0cean Protocol达成战略合作宣布与0cean Protocol达成战略合作</div>

        <div class="size26 mt24">发布者: DAO治理委员会</div>
        <div class="size24 opc6 mt20">2025-01-18</div>

        <div class="flex ac mt30 size24 main">
            <img src="@/assets/pe.png" class="img30 mr10">
            <div>官方公告</div>
            <div class="line"></div>
            <div>治理动态</div>
        </div>

        <div class="rich mt60" v-html="'123'"></div>

    </div>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
</script>

<style lang="scss" scoped>
.line{
    width: 1px;
    height: 20px;
    background-color: #999999;
    margin: 0 30px;
}
</style>