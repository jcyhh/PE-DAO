<template>
    <CusNav :title="$t('投票详情')"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="flex jb ac size32 font2 mb44" v-if="info?.status==1">
            <ShinyText :text="$t('正在投票中...')"></ShinyText>
            <div v-if="info?.user_vote">
                <div class="green" v-if="info?.user_vote?.option==1">{{ $t('赞成') }}</div>
                <div class="red" v-else>{{ $t('反对') }}</div>
            </div>
            <div v-else>{{ $t('未投票') }}</div>
        </div>
        <div class="flex jb ac size32 font2 mb44" v-else>
            <ShinyText :text="$t('投票已完成')"></ShinyText>
            <div class="flex ac" v-if="info?.result==0">
                <img src="@/assets/imgs/17.png" class="img52 mr10">
                <div class="red">{{ $t('未通过') }}</div>
            </div>
            <div class="flex ac" v-else>
                <img src="@/assets/imgs/18.png" class="img52 mr10">
                <div class="green">{{ $t('已通过') }}</div>
            </div>
        </div>

        <div class="flex jb ac mb32" v-if="info?.user_vote">
            <div class="size24">{{ $t('投票结果') }}</div>
            <!-- <div class="size26 main">{{ $t('赞成') }} {{ progressAgree }}%-{{ $t('反对') }} {{ progressReject }}%</div> -->
            <div class="size26 main" v-if="info?.has_voted">{{ $t('赞成') }} {{ info.agree_count}} - {{ $t('反对') }} {{ info.disagree_count }}</div>
        </div>
        <div class="flex jb ac">
            <div class="size24 opc6">{{ $t('投票开始时间') }}</div>
            <div class="size26" v-init:time="info?.start_time"></div>
        </div>
        <div class="flex jb ac mt32">
            <div class="size24 opc6">{{ $t('投票截止时间') }}</div>
            <div class="size26" v-init:time="info?.end_time"></div>
        </div>
        <div class="flex jb mt32">
            <div class="size24 opc6">{{ $t('提案地址') }}</div>
            <div class="size26 tr br address">{{ info?.proposal_address || '--' }}</div>
        </div>

        <div class="card mt45">
            <div class="size32 bold lh60">{{ info?.title }}</div>
            <div class="size26 lh52 mt24 rich" v-html="info?.content"></div>
        </div>
    </div>

    <div v-if="info?.status==1 && info?.is_active && !info?.has_voted">
        <div class="gap180"></div>
        <div class="bot flex jb ae size28 bold">
            <div class="agree" @click="submit(1)">{{ $t('赞成') }}</div>
            <img src="@/assets/imgs/14.png" class="pic14">
            <div class="reject" @click="submit(0)">{{ $t('反对') }}</div>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import CusNav from '@/components/CusNav/index.vue'
import { useRoute } from 'vue-router';
import { apiGet, apiPost } from '@/utils/request';
import { ref } from 'vue';
// import { computedDiv, computedSub } from '@/utils';
import { message } from '@/utils/message';
import { t } from '@/locale';

const { params } = useRoute()

const info = ref()
const loadData = () => apiGet(`/api/votes/${params?.id}`).then(res=>info.value=res)
loadData()

const isCanVote = ref(false)
apiGet('/api/users/my').then((res:any)=>isCanVote.value=res.is_nft)

// const progressAgree = computed(()=>{
//     if(info.value?.agree_count)return Math.floor(computedDiv(info.value?.agree_count, info.value?.total_count) * 10000) / 100
//     else return 0
// })

// const progressReject = computed(()=>{
//     if(info.value?.disagree_count)return computedSub(100, progressAgree.value)
//     else return 0
// })

const submit = (option:number) => {
    if(!isCanVote.value)return message(t('投票失败，您的地址无治理权'))
    apiPost('/api/votes/vote',{
        vote_id: params?.id,
        option
    }).then(()=>{
        message(t('提交成功'), 'success')
        loadData()
    })
}
</script>

<style lang="scss" scoped>
.address{
    width: 440px;
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
.bot{
    height: 180px;
    width: 100vw;
    background-color: #090814;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px 40px 30px;
    .pic14{
        width: 70px;
        height: 110px;
    }
    .agree{
        width: 310px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/15.png");
        background-size: 100% 100%;
        color: #000000;
    }
    .reject{
        width: 310px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/16.png");
        background-size: 100% 100%;
        color: #000000;
    }
}
</style>