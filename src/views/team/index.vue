<template>
    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="gap90"></div>
        <div class="tc">
            <div class="linearNum size60 bold font1" v-init="userInfo?.team_kpi"></div>
            <div class="size24 gray mt10">{{ $t('总业绩') }}(USDT)</div>
            <div class="size40 bold font1 mt40" v-init="userInfo?.referral_kpi"></div>
            <div class="size24 gray mt10">{{ $t('直推业绩') }}(USDT)</div>
        </div>

        <div class="flex jb mt60 pl30 pr30 black">
            <div class="card card1">
                <div class="size26">{{ $t('团队有效人数') }}</div>
                <div class="size36 bold">{{ userInfo?.team_valid_count }}</div>
            </div>
            <div class="card card2">
                <div class="size26">{{ $t('直推人数') }}</div>
                <div class="size36 bold">{{ userInfo?.referral_count }}</div>
            </div>
        </div>

        <div class="title">
            <div class="gap50"></div>
            <div class="flex jb ac">
                <div class="flex ac">
                    <div class="line mr10"></div>
                    <div class="size28 bold">{{ $t('社区列表') }}</div>
                </div>
                <div class="flex">
                    <div class="filter flex ac size24 gray" @click="pickerRef.open(current)">
                        <div class="mr10">{{ pickerList[current].name }}</div>
                        <van-icon name="arrow-down" />
                    </div>
                    <div class="filter flex ac size24 gray ml20" @click="showDate=true">
                        <div v-if="start_at&&end_at">{{ start_at }}-{{ end_at }}</div>
                        <div class="mr10" v-else>{{ $t('选择日期') }}</div>
                        <van-icon name="arrow-down" />
                    </div>
                </div>
            </div>
            <div class="gap20"></div>
        </div>

        <div class="pl30 pr30">
            <van-list v-bind="listProps">
                <div class="pt30 pb30" v-for="(item, index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="flex ac">
                            <div class="size28 mr10">{{ item.nickname }}</div>
                            <div class="tag tag1">{{ item.type == 1 ? $t('直推') : $t('间推') }}</div>
                        </div>
                        <div class="size28 bold" v-init="item.kpi"></div>
                    </div>
                    <div class="flex jb size24 opc4 mt10">
                        <div v-init:time="item.created_at"></div>
                        <div>{{ $t('个人业绩') }}</div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </van-list>
            
        </div>
    </van-pull-refresh>


    <CusPicker ref="pickerRef" :list="pickerList" @change="onPickerChange"></CusPicker>

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range" :show-confirm="false" @confirm="onDateChange" />
    </div>
    
</template>

<script setup lang="ts">
import CusPicker from '@/components/CusPicker/index.vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import { apiGet } from '@/utils/request';
import { computed, ref } from 'vue';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { t } from '@/locale';

// 类型
const pickerRef = ref()
const current = ref(0)
const pickerList = computed(()=>([
    { name: t('全部'), value: '' },
    { name: t('直推'), value: 1 },
    { name: t('间推'), value: 2 }
]))
const onPickerChange = (index:number)=>{
    if(current.value==index)return
    current.value = index
    loadList()
}

// 日期
const showDate = ref(false)
const start_at = ref()
const end_at = ref()
const onDateChange = (vals:any) => {
    start_at.value = `${vals[0].getFullYear()}-${vals[0].getMonth() + 1}-${vals[0].getDate()}`
    end_at.value = `${vals[1].getFullYear()}-${vals[1].getMonth() + 1}-${vals[1].getDate()}`
    showDate.value = false
    loadList()
}

// 列表接口参数
const params = computed(()=>({
    type: pickerList.value[current.value].value,
    start_at: start_at.value,
    end_at: end_at.value
}))

// 用户信息
const userInfo = ref()
const loadInfo = () => apiGet('/api/users/my').then(res => userInfo.value = res)

// 初始加载数据
const loadData = () => {
    loadInfo()
    loadList()
}

const { props } = usePullRefresh(loadData)

const { list, props:listProps, loadList } = useLoadList('/api/users/my/referrals','referrals', params)

loadData()
</script>

<style lang="scss" scoped>
.card {
    width: 335px;
    height: 179px;
    border-radius: 20px;
    padding: 30px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card1 {
    background: linear-gradient(130deg, #4DB1F4, #9CC3DD);
}

.card2 {
    background: linear-gradient(130deg, #94C4E4, #BF4EFE);
}

.title {
    position: sticky;
    top: 100px;
    left: 0;
    z-index: 10;
    background-color: #090814;
    width: 100vw;
    padding: 0 30px;

    .line {
        width: 4px;
        height: 32px;
        background-color: $main-color;
    }

    .filter {
        height: 58px;
        border-radius: 29px;
        border: 1px solid #C4C4C433;
        background-color: #3030304D;
        padding: 0 20px;
    }
}

.tag {
    height: 32px;
    border-radius: 10px 10px 10px 0;
    padding: 0 20px;
    font-size: 18px;
    line-height: 32px;
}

.tag1 {
    @include linear(1);
    color: #000000;
}

.tag2 {
    background-color: #343641;
}
</style>