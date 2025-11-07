<template>
    <cusNav :title="$t('分享')"></cusNav>
    <div class="pl30 pr30 pt80">

        <div class="flex ac">
            <img src="@/assets/pe.png" class="img100 mr24">
            <div>
                <div class="bold size32 font1">
                    <ShinyText :text="info?.m_address"></ShinyText>
                </div>
                <div class="size24 gray mt12">{{ time1 }}</div>
            </div>
        </div>

        <div class="mt100 size24">PE-DAO {{ $t('当天收益') }}</div>
        <div class="main size24 mt20">{{ time2 }}</div>

        <div class="mt20">
            <span class="font1 bold size60" style="color: #08FE6B;" v-init="info?.day_count_income_u"></span>
            <span class="ml10 size30">USDT</span>
        </div>

        <div class="flex mt40">
            <div class="flex1">
                <div class="size24 gray">{{ $t('七日收益率') }}</div>
                <div class="size26 mt20">{{ info?.day7_yield_rate }}%</div>
            </div>
            <div class="flex1">
                <div class="size24 gray">PE {{ $t('涨跌幅') }}</div>
                <div class="size26 mt20">{{ info?.token_price_increase_percentage }}%</div>
            </div>
        </div>

        <div class="flex mt40">
            <div class="flex1">
                <div class="size24 gray">PE {{ $t('池收益') }}</div>
                <div class="size26 mt20" v-init="info?.sponsor_pe_jt_income"></div>
            </div>
            <div class="flex1">
                <div class="size24 gray">USDT {{ $t('池收益') }}</div>
                <div class="size26 mt20" v-init="info?.sponsor_usdt_jt_income"></div>
            </div>
        </div>

        <div class="mt80 main bold">{{ $t('加入') }} PE-DAO</div>
        <div class="size28 gray mt20 lh48">
            {{ $t('让我们共同创造Web3的未来') }}<br>
            {{ $t('去中心化治理 社区共建利益共享') }}
        </div>

    </div>

    <div class="bot mt80">
        <div class="flex jb ac">
            <div>
                <div class="bold size32 font1">
                    <ShinyText text="PE-DAO"></ShinyText>
                </div>
                <div class="bold size40 font1 mt16">
                    <ShinyText :text="`${$t('邀请码')} ${info?.referral_code}`"></ShinyText>
                </div>
                <div class="flex mt18">
                    <div class="flex ac" v-copy="info?.referral_code">
                        <img src="@/assets/imgs/22.png" class="img30 mr10">
                        <div class="gray size24">{{ $t('复制') }}</div> 
                    </div>
                </div>
            </div>
            <div class="qrcodeBox flex jc ac">
                <QRCode :size="80" :value="inviteUrl" :bordered="false" />
            </div>
        </div>
        <div class="flex jb ac mt60">
            <div class="inp line1 size24 flex ac">{{ inviteUrl }}</div>
            <img src="@/assets/imgs/23.png" class="img80" v-copy="inviteUrl">
        </div>
    </div>
</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { publicPath } from '@/config'
import { apiGet } from '@/utils/request'
import { computed, ref } from 'vue'

const today = new Date()
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
const time1 = `${month}/${day} ${hours}:${minutes}`
const time2 = `${month}/${day}`

const info = ref()
const inviteUrl = computed(()=>`${window.origin}${publicPath}${info.value?.referral_code}`)
apiGet('/api/users/my/share_info').then((res)=>info.value = res)
</script>

<style lang="scss" scoped>
.bot{
    background: linear-gradient(rgba(72, 72, 87, 0.1), rgba(9, 8, 20, 0.1));
    width: 100vw;
    height: 452px;
    padding: 60px 30px 70px 30px;
    .qrcodeBox{
        width: 100PX;
        height: 100PX;
        border: 1px solid #3A3942;
        border-radius: 10PX;
    }
    .inp{
        width: 583px;
        height: 80px;
        line-height: 80px;
        border-radius: 20px;
        border: 1px solid #4D4D55;
        padding: 0 20px;
    }
}
.m-qrcode{
    padding: 5px;
    border-radius: 0;
}
</style>