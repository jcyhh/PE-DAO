<template>
    <div class="lang">
        <CusLang></CusLang>
    </div>
    <div class="start flex jc ac">
        <img src="@/assets/common/start.png" class="startImg animate__animated animate__bounceInRight" />
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp">{{ $t('系统更新中...') }}</div>
</template>

<script setup lang="ts">
import CusLang from '@/components/CusLang/index.vue';

</script>

<style lang="scss" scoped>
.lang{
    position: fixed;
    top: 30px;
    right: 30px;
    z-index: 1000000;
}
.start {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-bottom: 200px;

    .startImg {
        width: 50vw;
        height: auto;
    }
}
.tips{
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
}
.bind{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .box{
        padding: 30px 24px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
}
</style>