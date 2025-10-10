<template>
    <CusNav :title="$t('奖励点')"></CusNav>
    
    <div class="head">
        <CusTab :defaultCur="defaultCur" :list="tabs" @change="tabsClick"></CusTab>
    </div>

    <div class="gap160"></div>
    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">
                <div class="node mb30" v-for="(item,index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="size24">名称</div>
                        <div class="size24">{{ item.content }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('数量') }}</div>
                        <div class="size28 bold green" v-if="item.is_inc">
                            + <span v-init="item.amount"></span> USD
                        </div>
                        <div class="size28 bold red" v-else>
                            - <span v-init="item.amount"></span> USD
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('价格') }}</div>
                        <div class="size28">{{ Number(item?.extra?.token_price) }} USD</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('时间') }}</div>
                        <div class="size28" v-init:time="item.created_at"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">ID</div>
                        <div class="size28 tr br hash lh40">{{ item.id || '--' }}</div>
                    </div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
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
import { apiGet } from '@/utils/request';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { useRoute } from 'vue-router';

const { query } = useRoute()

const defaultCur = query.cur ? 1 : 0

const current = ref(defaultCur)
const tabs = computed(()=>([
    {name:`USDT ${t('池奖励点')}`, value:'usdt_reward_point_balance'},
    {name:`${tokenName} ${t('池奖励点')}`, value:'pe_reward_point_balance'}
]))

const params = computed(()=>({ccy: tabs.value[current.value].value}))

const { list, props: listProps, loadList } = useLoadList('/api/users/my/balance_logs', 'balance_logs', params)
const { props } = usePullRefresh(loadList)
loadList()

const tabsClick = (index:number) => {
    current.value = index
    loadList()
}

const token_price = ref()
apiGet('/api/token_price').then((res:any)=>token_price.value = res.token_price)
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