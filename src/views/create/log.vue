<template>
    <CusNav title="铸币记录"></CusNav>
    <div class="head">
        <div class="filter flex jb ac" @click="showDate=true">
            <img src="@/assets/imgs/clock.png" class="img36">
            <div class="size28 opc6" v-if="start_at&&end_at"><span v-init:date="start_at"></span> ~ <span v-init:date="end_at"></span></div>
            <div class="size28 opc6" v-else>选择时间</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
    </div>

    <div class="gap160"></div>

    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">
                <div class="node mb30" v-for="(item,index) in list" :key="index">
                    <div class="size40 bold" v-init="item.u_amount"></div>
                    <div class="blue size24 mt4">铸币价值(USD)</div>
                    <div class="flex jb ac mt50">
                        <div class="size24">铸造数量</div>
                        <div class="size28 bold"><span v-init="item.amount"></span> {{ tokenName }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">消耗铸币权</div>
                        <div class="size28"><span v-init="item.amount"></span> {{ tokenName }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">实际支付</div>
                        <div class="size28"><span v-init="item.pay_u_amount"></span> USDT</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">铸造时间</div>
                        <div class="size28" v-init="item.created_at"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">交易哈希</div>
                        <div class="size28 tr br hash">{{ item.deal_id || '--' }}</div>
                    </div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>
    </van-pull-refresh>
    

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range" :show-confirm="false" @confirm="onDateChange" />
    </div>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { tokenName } from '@/config';

const params = computed(()=>({
    start_at: start_at.value,
    end_at: end_at.value
}))

const { list, props: listProps, loadList } = useLoadList('/api/coinage/list', 'coinage_order', params)
const { props } = usePullRefresh(loadList)
loadList()


const showDate = ref(false)
const start_at = ref()
const end_at = ref()
const onDateChange = (vals:any) => {
    start_at.value = `${vals[0].getFullYear()}-${(vals[0].getMonth() + 1).toString().padStart(2, '0')}-${(vals[0].getDate()).toString().padStart(2, '0')}`
    end_at.value = `${vals[1].getFullYear()}-${(vals[1].getMonth() + 1).toString().padStart(2, '0')}-${(vals[1].getDate()).toString().padStart(2, '0')}`
    showDate.value = false
    loadList()
}
</script>

<style lang="scss" scoped>
.head{
    width: 100vw;
    height: 160px;
    background-color: #090814;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
    padding: 40px 30px 0 30px;
    .filter{
        height: 80px;
        border: 1px solid #333333;
        border-radius: 40px;
        padding: 0 20px;
    }
}
.card{
    background: linear-gradient(#31303A, #100E1D); 
}
.hash{
    width: 400px;
}
.list{
    min-height: calc(100vh - 260px);
}
</style>