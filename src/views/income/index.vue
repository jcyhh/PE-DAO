<template>
    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="gap90"></div>
        <div class="tc">
            <div class="linearNum size60 bold font1" v-init="stats?.count_income"></div>
            <div class="size24 gray mt10">{{ $t('总收益') }}(USDT)</div>
        </div>

        <div class="pl30 pr30 mt60">
            <div class="top flex ac tc">
                <div class="flex1">
                    <div class="size36 bold font1" v-init="stats?.zt_income"></div>
                    <div class="size24 gray mt16">{{ $t('直推收益') }}(USDT)</div>
                </div>
                <div class="line"></div>
                <div class="flex1">
                    <div class="size36 bold font1" v-init="stats?.jt_income"></div>
                    <div class="size24 gray mt16">{{ $t('间推收益') }}(USDT)</div>
                </div>
            </div>
            <div class="mt40 card">
                <div class="flex jb ac">
                    <div class="size24 opc6">{{ $t('待领取收益') }}</div>
                    <div class="size26" v-init="stats?.balance_usdt"></div>
                </div>
                <div class="flex jb ac mt28">
                    <div class="size24 opc6">{{ $t('已领取收益') }}</div>
                    <div class="size26" v-init="stats?.withdraw_amount"></div>
                </div>
            </div>
            <div class="mainBtn mt40" @click="show=true">{{ $t('领取收益') }}</div>
        </div>

        <div class="title">
            <div class="gap50"></div>
            <div class="flex jb ac">
                <div class="flex ac">
                    <div class="line mr10"></div>
                    <div class="size28 bold">{{ $t('收益明细') }}</div>
                </div>
                <div class="flex">
                    <div class="filter flex ac size24 gray" @click="picker.open(current)">
                        <div class="mr10" v-if="pickerList.length>0">{{ pickerList[current].name }}</div>
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
                        <div class="size28">{{ item.content }}</div>
                        <div class="size28 bold" :class="item.is_inc?'':'red'">
                            {{ item.is_inc?'+':'-' }}
                            <span v-init="item.amount"></span>
                        </div>
                    </div>
                    <div class="flex jb size24 opc4 mt10">
                        <div v-init:time="item.created_at"></div>
                        <div>BNB</div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </van-list>
        </div>
    </van-pull-refresh>


    <CusPicker ref="picker" :list="pickerList" @change="onPickerChange"></CusPicker>

    <div class="black">
        <van-calendar v-model:show="showDate" :min-date="new Date(2010, 0, 1)" :max-date="new Date()" type="range"
            :show-confirm="false" @confirm="onDateChange" />
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" :close-on-click-overlay="false" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="size32 bold">{{ $t('提示') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show=false" />
            </div>
            <div class="mt60 size24">{{ $t('确定领取收益吗？') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:withdrawSubmit}">{{ $t('确认') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import CusPicker from '@/components/CusPicker/index.vue';
import { apiGet, apiPost } from '@/utils/request';
import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { useEthers } from '@/dapp'
import { useBiz } from '@/dapp/contract/biz/useBiz'
import { message } from '@/utils/message';
import { t } from '@/locale';

const show = ref(false)

const stats = ref()
const loadInfo = () => apiGet('/api/users/my/income').then(res => stats.value = res)

const picker = ref()
const current = ref(0)
const pickerList = ref<any[]>([])
apiGet('/api/users/my/balance_type').then((res: any) => {
    let arr = [{
        name:t('全部'),
        value: ''
    }]
    for (let key in res.type) {
        arr.push({
            name: res.type[key],
            value: key
        })
    }
    pickerList.value = arr
    loadData()
})
const onPickerChange = (index: number) => {
    if (current.value == index) return
    current.value = index
    loadList()
}

// 日期
const showDate = ref(false)
const start_at = ref()
const end_at = ref()
const onDateChange = (vals: any) => {
    start_at.value = `${vals[0].getFullYear()}-${vals[0].getMonth() + 1}-${vals[0].getDate()}`
    end_at.value = `${vals[1].getFullYear()}-${vals[1].getMonth() + 1}-${vals[1].getDate()}`
    showDate.value = false
    loadList()
}

// 列表接口参数
const params = computed(() => ({
    type: pickerList.value.length> 0 ? pickerList.value[current.value].value : '',
    start_at: start_at.value,
    end_at: end_at.value
}))

// 初始加载数据
const loadData = () => {
    loadInfo()
    loadList()
}

const { props } = usePullRefresh(loadData)

const { list, props: listProps, loadList } = useLoadList('/api/users/my/balance_logs', 'balance_logs', params)

const { getSign, checkGas, connectWallet } = useEthers()
connectWallet()

const { writeClaim } = useBiz()

const withdrawSubmit = async () => {
    if(stats.value?.balance_usdt <=0)return message(t('可领取收益不足'))

    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    const signInfo:any = await getSign('Claim') // 签名

    apiPost('/api/withdraw',signInfo).then(async (res:any)=>{
        const { id, token, sign_amount, expired_at, sign } = res.info
        await writeClaim(id, token, sign_amount, expired_at, sign)
        show.value = false
    })
}
</script>

<style lang="scss" scoped>
.top {
    height: 174px;
    background-image: url("@/assets/imgs/12.png");
    background-size: 100% 100%;

    .line {
        width: 1px;
        height: 80px;
        background-color: #D9D9D933;
    }
}

.card {
    border: 1px solid #FFFFFF;
    border-radius: 20px;
    padding: 40px 30px;
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
.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
}
</style>