<template>
    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="pl30 pr30 pt40">
            <div class="linearTxt size32 bold font2 mb40">Q&A</div>
            <van-list v-bind="listProps">
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </van-list>
            
        </div>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';

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