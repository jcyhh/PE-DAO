<template>
    <CusNav :title="$t('奖励点')"></CusNav>
    
    <div class="head">
        <CusTab :list="tabs" @change="tabsClick"></CusTab>
    </div>

    <div class="gap160"></div>
    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">
                <div class="node mb30" v-for="(item,index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="size24">{{ $t('数量') }}</div>
                        <div class="size28 bold" v-init="item.reward_point"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('币种') }}</div>
                        <div class="size28 flex ac" v-if="item.type==1">
                            <div>USDT</div>
                            <img src="@/assets/usdt.png" class="img26 ml5">
                        </div>
                        <div class="size28 flex ac" v-else>
                            <div>{{ tokenName }}</div>
                            <img src="@/assets/pe.png" class="img26 ml5">
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('时间') }}</div>
                        <div class="size28" v-init:time="item.created_at"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('交易哈希') }}</div>
                        <div class="size28 tr br hash lh40">{{ item.deal_id || '--' }}</div>
                    </div>
                </div>
            </div>
        </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue';
import CusTab from '@/components/CusTab/index.vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import { tokenName } from '@/config';
import { t } from '@/locale';

const current = ref(0)
const tabs = computed(()=>([
    {name:`USDT ${t('池奖励点')}`, value:1},
    {name:`${tokenName} ${t('池奖励点')}`, value:2}
]))

const params = computed(()=>({type: tabs.value[current.value].value}))

const { list, props: listProps, loadList } = useLoadList('/api/sponsor/list', 'sponsor_order', params)
const { props } = usePullRefresh(loadList)
loadList()

const tabsClick = (index:number) => {
    current.value = index
    loadList()
}
</script>

<style lang="scss" scoped>
.head{
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
}
.list{
    min-height: calc(100vh - 260px);
}
.hash{
    width: 400px;
}
</style>