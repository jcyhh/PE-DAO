<template>
    <CusNav title="邀请码"></CusNav>

    <div class="head">
        <CusTab :list="tabs" @change="tabsClick"></CusTab>
    </div>

    <div class="gap160"></div>

    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">
                <div class="card mb30" v-for="(item,index) in list" :key="index">
                    <div class="size26 bold mb24">{{ $t('邀请码') }}</div>
                    <div class="flex jb ac">
                        <div class="linearNum size32 bold font1">{{ item.referral_code }}</div>
                        <img src="@/assets/layout/copy.png" class="img48" v-copy="item.referral_code">
                    </div>
                    <div class="flex jb ac mt60" v-if="item.referral_user_address">
                        <div class="size24 opc6">{{ $t('地址') }}</div>
                        <div class="flex ac" v-copy="item.referral_user_address">
                            <div class="size26" v-init:address="item.referral_user_address"></div>
                            <img src="@/assets/imgs/copy.png" class="img24 ml10">
                        </div>
                    </div>
                    <div class="flex jb ac mt28">
                        <div class="size24 opc6">{{ $t('状态') }}</div>
                        <div class="size26">{{ tabs[current].name }}</div>
                    </div>
                    <div class="flex jb ac mt28" v-if="current==1">
                        <div class="size24 opc6">{{ $t('使用时间') }}</div>
                        <div class="size26" v-init:time="item.updated_at"></div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </div>
        </van-list>
    </van-pull-refresh>

    
    <div class="gap160"></div>
    <div class="tips" v-if="!canInvite">
        <div class="size26 tc">{{ $t('你当前不能生成邀请码,请前往解锁推荐特权!') }}</div>
        <div class="flex jc mt40">
            <div class="botbtn" @click="routerReplace('/cure/index')">{{ $t('前往解锁') }}</div>
        </div>
    </div>

    <div class="btn" v-if="canInvite" v-scale v-delay="{fun:submit}">{{ $t('生成邀请码') }}</div>
    <div class="disbtn" v-else>{{ $t('生成邀请码') }}</div>
</template>

<script setup lang="ts">
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { apiGet, apiPost } from '@/utils/request';
import { routerReplace } from '@/router';
import { t } from '@/locale';
import CusNav from '@/components/CusNav/index.vue'

const current = ref(0)

const tabs = computed(()=>([
    {name:t('未使用'), value:1},
    {name:t('已使用'), value:2}
]))
const tabsClick = async (index:number) => {
    if(current.value==index)return
    current.value = index
    loadList()
}

const canInvite = ref(true)
apiGet('/api/referral_code/is_referral').then((res:any)=>canInvite.value = res.is_referral==1)

/** 列表 */
const params = computed(()=>({
    status: tabs.value[current.value].value
}))
const { list, props:listProps, loadList } = useLoadList('/api/referral_code','referral_code', params)
const { props } = usePullRefresh(loadList)
loadList()

/** 邀请码 */
const submit = () => apiPost('/api/referral_code').then(()=>loadList())
</script>

<style lang="scss" scoped>
.head{
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
}
.list{
    min-height: calc(100vh - 420px);
}
.card{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    border-radius: 20px;
    padding: 40px 30px;
}
.btn{
    @include linear;
    width: 690px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    color: #1B1B1E;
    font-size: 26px;
    font-weight: bold;
    border-radius: 36px;
    position: fixed;
    bottom: 60px;
    left: 30px;
    z-index: 10;
}
.disbtn{
    width: 690px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    background-color: #17171D;
    color: #575761;
    font-size: 26px;
    font-weight: bold;
    border-radius: 36px;
    position: fixed;
    bottom: 60px;
    left: 30px;
    z-index: 10;
}
.tips{
    width: 100vw;
    position: fixed;
    bottom: 200px;
    left: 0;
    z-index: 10;
    .botbtn{
        @include linear;
        height: 60px;
        padding: 0 30px;
        border-radius: 30px;
        line-height: 60px;
        color: #1B1B1E;
        font-size: 26px;
        font-weight: bold;
    }
}
</style>