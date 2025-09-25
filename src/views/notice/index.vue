<template>
    <cusNav title="公告列表"></cusNav>
    <van-pull-refresh class="fullPage" v-bind="props">
        <van-list class="fullPage" v-bind="listProps">
            <div class="pl30 pr30 pt30">
                <div class="card mb20 flex jb ac" v-for="(item,index) in list" :key="index" @click="routerPush(`/notices/${item.id}`)">
                    <div class="leftNotice">
                        <div class="line1 size28">{{ item.title }}</div>
                        <div class="size24 gray mt10">{{ item.updated_at }}</div>
                    </div>
                    <van-icon name="arrow" :size="20" color="#999999" />
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { routerPush } from '@/router';

const { list, props: listProps, loadList } = useLoadList('/api/notices', 'notices')
const { props } = usePullRefresh(loadList)
loadList()
</script>

<style lang="scss" scoped>
.card{
    background: linear-gradient(135deg, rgba(49, 48, 58, 0.5), rgba(16, 14, 29, 0.5));
    border-radius: 20px;
    padding: 30px;
    .leftNotice{
        width: 500px;
    }
}
</style>