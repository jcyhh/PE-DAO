<template>
    <CusNav title="赞助记录"></CusNav>
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
                    <div class="blue size24 mt4">赞助价值(USD)</div>
                    <div class="flex jb ac mt50">
                        <div class="size24">赞助数量</div>
                        <div class="size28 bold" v-init="item.amount"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">赞助币种</div>
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
                        <div class="size24 opc6">赞助时间</div>
                        <div class="size28" v-init:time="item.created_at"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">交易哈希</div>
                        <div class="size28 tr br hash lh40">{{ item.deal_id || '--' }}</div>
                    </div>
                </div>
            </div>
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
import { tokenName } from '@/config';

const params = computed(()=>({
    start_at: start_at.value,
    end_at: end_at.value
}))

const { list, props: listProps, loadList } = useLoadList('/api/sponsor/list', 'sponsor_order', params)
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
.list{
    min-height: calc(100vh - 260px);
}
.hash{
    width: 400px;
}
</style>