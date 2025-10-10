<template>
    <CusNav :title="$t('投票列表')"></CusNav>
    <div class="pl30 pr30 pt40">

        <div class="bold size32 font2">
            <ShinyText :text="$t('正在投票中...')"></ShinyText>
        </div>

        <div class="card mt40" v-for="(item,index) in votes" :key="index" @click="routerPush(`/cure/vote/${item.id}`)">
            <div class="size32 bold lh60">{{ item.title }}</div>
            <div class="flex jb ac mt24">
                <div class="flex ac size24 blue">
                    <div class="mr5">{{ $t('投票详情') }}</div>
                    <van-icon name="arrow" />
                </div>
                <div class="size26 main" v-if="item?.has_voted">{{ $t('赞成') }} {{ item.agree_count}} - {{ $t('反对') }} {{ item.disagree_count }}</div>
            </div>
            <div class="size26 lh52 mt24 rich" v-html="item.content"></div>
            <div class="flex jb ae size28 bold">
                <div class="agree">{{ $t('赞成') }}</div>
                <img src="@/assets/imgs/14.png" class="pic14">
                <div class="reject">{{ $t('反对') }}</div>
            </div>
        </div>

        <div class="bold size32 font2 mt80 mb40">
            <ShinyText :text="$t('投票已完成')"></ShinyText>
        </div>

        <van-list class="list" v-bind="props">
            <div class="item mb40" v-for="(item,index) in list" :key="index" @click="routerPush(`/cure/vote/${item.id}`)">
                <div class="flex jb ac">
                    <div class="flex ac" v-if="item.result==0">
                        <img src="@/assets/imgs/17.png" class="img52 mr10">
                        <div class="size26 bold red">{{ $t('未通过') }}</div>
                    </div>
                    <div class="flex ac" v-else>
                        <img src="@/assets/imgs/18.png" class="img52 mr10">
                        <div class="size26 bold red">{{ $t('已通过') }}</div>
                    </div>
                    <div class="size26 main" v-if="item?.has_voted">{{ $t('赞成') }} {{ item.agree_count}} - {{ $t('反对') }} {{ item.disagree_count }}</div>
                </div>
                <div class="size32 bold lh60 mt20">{{ item.title }}</div>
                <div class="size26 lh52 mt24 rich" v-html="item.content"></div>
                <div class="flex jb size24 mt40">
                    <div class="green">{{ $t('赞成') }}</div>
                    <div class="main">{{ $t('反对') }}</div>
                </div>
                <div class="progress flex jb ac mt30 size18">
                    <div class="rel pl30">{{ getProgress(item.agree_count, item.total_count) }}%</div>
                    <div class="rel pr30">{{ getProgress(item.disagree_count, item.total_count) }}%</div>
                    <div class="leftLine" :style="{width:`${getProgress(item.agree_count, item.total_count)}%`}"></div>
                    <div class="rightLine" :style="{width:`${getProgress(item.disagree_count, item.total_count)}%`}"></div>
                </div>
            </div>
            <CusEmpty v-if="list?.length==0"></CusEmpty>
        </van-list>

    </div>
</template>

<script setup lang="ts">
import ShinyText from '@/components/VueBits/ShinyText.vue'
import CusNav from '@/components/CusNav/index.vue'
import { routerPush } from '@/router'
import { useLoadList } from '@/hooks/useLoadList';
import CusEmpty from '@/components/CusEmpty/index.vue'
import { computed, ref } from 'vue';
import { computedDiv } from '@/utils';
import { apiGet } from '@/utils/request';

const params = computed(()=>({status:2}))

const { list, props, loadList } = useLoadList('/api/votes', 'votes', params)
loadList()

const votes = ref<any>([])
apiGet('/api/votes',{
    page_no:1,
    page_size:50,
    status:1
}).then((res:any)=>votes.value=res.votes)

const getProgress = (a:any, b:any) => {
    if(a==0)return 0
    return Math.floor(computedDiv(a, b) * 10000) / 100
}
</script>

<style lang="scss" scoped>
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
    .pic14{
        width: 70px;
        height: 110px;
    }
    .agree{
        width: 280px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/15.png");
        background-size: 100% 100%;
        color: #000000;
    }
    .reject{
        width: 280px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-image: url("@/assets/imgs/16.png");
        background-size: 100% 100%;
        color: #000000;
    }
}
.item{
    position: relative;
    padding: 30px 30px 40px 30px;
    background: #3030304D;
    border-radius: 20px;

    &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: 20px;
        background: linear-gradient(#FFFFFF, #FFFFFF00);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        padding: 1px;
    }

    .rate{
        height: 38px;
        border-radius: 19px;
        overflow: hidden;
        .rateAgree{
            background-color: $green;
            height: 38px;
            line-height: 38px;
            padding-left: 30px;
        }
        .rateReject{
            background-color: $main-color;
            height: 38px;
            line-height: 38px;
            padding-right: 30px;
            text-align: right;
        }
    }

    .progress{
        height: 38px;
        border-radius: 19px;
        overflow: hidden;
        position: relative;
        background-color: #3030304D;
        .leftLine{
            height: 38px;
            background-color: $green;
            transition: all 2s;
            position: absolute;
            left: 0;
            top: 0;
        }
        .rightLine{
            height: 38px;
            background-color: $main-color;
            transition: all 2s;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
}
</style>