<template>
    <div class="cusProgress">
        <div class="progress" :style="{width: `${width}%`}"></div>
    </div>
</template>

<script setup lang="ts">
defineProps(['width'])
</script>

<style lang="scss" scoped>
.cusProgress{
    width: 200px;
    height: 18px;
    border-radius: 9px;
    background-color: #FFFFFF29;
    .progress{
        height: 18px;
        border-radius: 9px;
        transition: all 0.3s;
        @include linear(1);
    }
}
</style>