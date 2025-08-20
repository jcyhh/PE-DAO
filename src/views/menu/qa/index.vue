<template>
    <div class="pl30 pr30 pt40">
        <div class="linearTxt size32 bold font2 mb40">Q&A</div>

        <QA ref="qa" class="mb30" v-for="(item,index) in 3" :key="index" :index="index" @open="onQaOpen"></QA>
    </div>
    
</template>

<script setup lang="ts">
import QA from '@/views/menu/home/components/QA.vue'
import { ref } from 'vue';

const qa = ref()
const onQaOpen = (index:any)=>{
    qa.value.forEach((item:any)=>item.close(index))
}
</script>

<style lang="scss" scoped>

</style>