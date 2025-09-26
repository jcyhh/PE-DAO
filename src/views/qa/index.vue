<template>
    <van-pull-refresh class="fullPage" v-bind="props">
        <van-list class="fullPage" v-bind="listProps">
            <div class="pl30 pr30 pt40">
                <div class="bold size32 font2 mb40">
                    <ShinyText text="Q&A"></ShinyText>
                </div>
                <QA ref="qa" class="mb30" v-for="(item,index) in list" :key="index" :data="item" @open="onQaOpen"></QA>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import QA from './components/QA.vue'
import { ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import ShinyText from '@/components/VueBits/ShinyText.vue'

const qa = ref()
const onQaOpen = (index:any)=>{
    qa.value.forEach((item:any)=>item.close(index))
}

const { list, props:listProps, loadList } = useLoadList('/api/help_center', 'help_center')
const { props } = usePullRefresh(loadList)
loadList()
</script>

<style lang="scss" scoped>

</style>