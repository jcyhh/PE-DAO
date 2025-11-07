<template>
    <CusNav :title="$t('奖励明细')"></CusNav>

    <div class="head flex">
        <div class="filter flex1 flex jb ac" @click="picker.open(current)">
            <img src="@/assets/imgs/21.png" class="img36">
            <div class="size28 opc6">{{ pickerList[current].name }}</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
        <div class="filter flex1 ml20 flex jb ac" @click="showDate = true">
            <img src="@/assets/imgs/clock.png" class="img36">
            <div class="size28 opc6" v-if="start_at && end_at"><span v-init:date="start_at"></span> ~ <span v-init:date="end_at"></span></div>
            <div class="size28 opc6" v-else>{{ $t('选择时间') }}</div>
            <van-icon name="arrow" color="#C348FF" :size="15" />
        </div>
    </div>

    <div class="gap160"></div>

    <van-pull-refresh class="list" v-bind="props">
        <van-list class="list" v-bind="listProps">
            <div class="pl30 pr30">

                <div class="node mb30" v-for="(item, index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="size24">{{ $t('数量') }}</div>
                        <div class="size28 bold" v-init="item.amount"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('名称') }}</div>
                        <div class="size28">{{ item.content }}</div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('币种') }}</div>
                        <div class="size28 flex ac">
                            <div>{{ tokenName }}</div>
                            <img src="@/assets/pe.png" class="img26 ml10">
                        </div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('领取时间') }}</div>
                        <div class="size28" v-init:time="item.created_at"></div>
                    </div>
                    <div class="flex jb ac mt30" v-if="item.status==2">
                        <div class="size24 opc6">{{ $t('到账时间') }}</div>
                        <div class="size28" v-init:time="item.updated_at"></div>
                    </div>
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('交易哈希') }}</div>
                        <div class="size28 tr">{{ item.deal_id || '--' }}</div>
                    </div>
                    <div class="flex jb ac mt30" v-if="item.type==33 && item.residue_reward_point > 0">
                        <div class="size24 opc6">USDT {{ $t('池奖励点') }}</div>
                        <div class="size28 tr" v-init="item.residue_reward_point"></div>
                    </div>
                    <div class="flex jb ac mt30" v-if="item.type==33 && item.yield_rate > 0">
                        <div class="size24 opc6">USDT {{ $t('池收益率') }}</div>
                        <div class="size28 tr bold green">{{ item.yield_rate }}%</div>
                    </div>
                    <div class="flex jb ac mt30" v-if="item.type==34 && item.residue_reward_point > 0">
                        <div class="size24 opc6">{{ tokenName }} {{ $t('池奖励点') }}</div>
                        <div class="size28 tr" v-init="item.residue_reward_point"></div>
                    </div>
                    <div class="flex jb ac mt30" v-if="item.type==34 && item.yield_rate > 0">
                        <div class="size24 opc6">{{ tokenName }} {{ $t('池收益率') }}</div>
                        <div class="size28 tr bold green">{{ item.yield_rate }}%</div>
                    </div>
                    
                </div>

            </div>
            <CusEmpty v-if="list?.length == 0"></CusEmpty>
        </van-list>
    </van-pull-refresh>

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range"
            :show-confirm="false" @confirm="onDateChange" />
    </div>

    <CusPicker ref="picker" :list="pickerList" @change="pickerChange"></CusPicker>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue'
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import { tokenName } from '@/config';
import CusEmpty from '@/components/CusEmpty/index.vue'
import CusPicker from '@/components/CusPicker/index.vue';
import { useRoute } from 'vue-router';
import { t } from '@/locale';

const { query } = useRoute()

const params = computed(() => ({
    start_at: start_at.value,
    end_at: end_at.value,
    ccy: pickerList.value[current.value].value
}))

const { list, props: listProps, loadList } = useLoadList('/api/users/my/balance_logs', 'balance_logs', params)
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

const picker = ref()
const current = ref(query.cur ? Number(query.cur) : 0)
const pickerList = computed(() => ([
    { name: t('赞助奖励'), value: 'jt_balance_token' },
    { name: t('布道奖励'), value: 'dt_balance_token' },
    { name: t('贡献奖励'), value: 'gx_balance_token' }
]))
const pickerChange = (index:number) => {
    current.value = index
    loadList()
}
</script>

<style lang="scss" scoped>
.head {
    width: 100vw;
    height: 160px;
    background-color: #090814;
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
    padding: 40px 30px 0 30px;

    .filter {
        height: 80px;
        border: 1px solid #333333;
        border-radius: 40px;
        padding: 0 20px;
    }
}

.card {
    background: linear-gradient(#31303A, #100E1D);
}

.hash {
    width: 400px;
}
</style>