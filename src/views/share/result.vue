<template>
    <CusNav :title="$t('布道成果')"></CusNav>

    <div class="pl30 pr30 pt40">

        <div class="card">
            <div class="tc size26">{{ $t('总业绩') }}(USD)</div>
            <div class="tc size48 bold mt12">
                <ShinyText :text="initNumber(info?.sponsor_team_kpi)"></ShinyText>
            </div>
        </div>
        <div class="flex mt30">
            <div class="flex1 cell">
                <div class="size28 bold" v-init="info?.referral_kpi"></div>
                <div class="size20 mt10 gray">{{ $t('直推业绩') }}(USD)</div>
            </div>
            <div class="flex1 cell ml20">
                <div class="size28 bold" v-init="info?.jt_kpi"></div>
                <div class="size20 mt10 gray">{{ $t('间推业绩') }}(USD)</div>
            </div>
        </div>
    </div>
    
    <div class="head">
        <CusTab :list="tabs" @change="tabClick"></CusTab>
    </div>

    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">
                <div class="node mb30" v-for="(item,index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="size24 gray">{{ $t('用户地址') }}</div>
                        <div class="size28">{{ item.nickname }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('邀请类型') }}</div>
                        <div class="size28 main">{{ item.type == 1 ? t('直推') : t('间推') }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('个人赞助') }}</div>
                        <div class="size28" v-init="item.sponsor_kpi"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('社区赞助') }}</div>
                        <div class="size28" v-init="item.sponsor_team_kpi"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('账户级别') }}</div>
                        <div class="flex ac">
                            <img src="@/assets/imgs/9.png" class="img48 mr10 aniRotate">
                            <div class="size28">{{ item.level?.name }}</div>
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('注册时间') }}</div>
                        <div class="size28" v-init:time="item.created_at"></div>
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
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { apiGet } from '@/utils/request';
import { initNumber } from '@/utils';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { t } from '@/locale';

const current = ref(0)
const tabs = computed(()=>([
    {name:`${t('直推用户')} (${info.value?.referral_count})`, value:1},
    {name:`${t('间推用户')} (${info.value?.jt_count})`, value:2}
]))
const tabClick = (index:number) => {
    current.value = index
    loadList()
}

const info = ref()
apiGet('/api/users/my').then(res=>info.value=res)

const params = computed(()=>({type:tabs.value[current.value].value}))

const { list, props: listProps, loadList } = useLoadList('/api/users/my/referrals', 'referrals', params)
const { props } = usePullRefresh(loadList)
loadList()
</script>

<style lang="scss" scoped>
.head{
    position: sticky;
    top: 100px;
    left: 0;
    z-index: 10;
    background-color: #090814;
}
.card {
    border: 1px solid transparent;
    position: relative;
    padding: 30px 30px 40px 30px;
    background: linear-gradient(#1B0E2B, #0A0915);
    border-radius: 20px;

    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: linear-gradient(#C348FF, #C348FF00);
        border-radius: 0 40px 40px 0;
        border-radius: 20px;
    }
}
.cell{
    background-color: #3030304D;
    border: 1px solid #C4C4C433;
    border-radius: 20px;
    padding: 30px;
}
.list{
    min-height: calc(100vh - 260px);
}
</style>