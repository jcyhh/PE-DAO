<template>
    <van-pull-refresh class="fullPage" v-bind="props">
        <van-list class="fullPage" v-bind="listProps">
            <div class="pl30 pr30 pt40">
                <div class="bold size32 font2 mb40">
                    <ShinyText text="新闻公告"></ShinyText>
                </div>
                <div class="card mb30" v-for="(item,index) in list" :key="index" @click="routerPush(`/news/${item.id}`)">
                    <div class="flex ast">
                        <img :src="item.cover_img" class="newsImg flex0">
                        <div class="flex1 ml20">
                            <div class="line1 size28 bold">{{ item.title }}</div>
                            <div class="line2 mt20 lh40 size24 opc6 rich" v-html="item.content"></div>
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="flex ac">
                            <img src="@/assets/pe.png" class="img30 mr10">
                            <div class="size24 main">官方公告</div>
                        </div>
                        <div class="size24 opc6" v-init:time="item.updated_at"></div>
                    </div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { routerPush } from '@/router';

const { list, props: listProps, loadList } = useLoadList('/api/journalism_notices', 'notices')
const { props } = usePullRefresh(loadList)
loadList()
</script>

<style lang="scss" scoped>
.card{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    padding: 30px;
    border-radius: 20px;
    .newsImg{
        width: 140px;
        height: 140px;
        border-radius: 20px;
    }
}
</style>