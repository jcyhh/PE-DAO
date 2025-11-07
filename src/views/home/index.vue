<template>
    <img src="@/assets/imgs/1.png" class="bg1 rel2 anicr animate__animated animate__zoomIn">
    <div class="top flex jb ac">
        <div class="topLeft">
            <div class="linearTxt size48 bold">{{ $t('加入') }} {{ appName }}</div>
            <div class="size28 bold mt20">{{ $t('让我们共同创造Web3的未来') }}</div>
            <div class="size20 desc mt30">{{ $t('分权治理社区共建利益共享') }}</div>
        </div>
        <div class="pic4">
            <img src="@/assets/imgs/4.png" class="pic4">
            <img src="@/assets/imgs/5.png" class="pic5 anibr animate__animated animate__zoomIn delay1">
            <img src="@/assets/imgs/6.png" class="pic6 anibr animate__animated animate__zoomIn delay2">
        </div>
    </div>

    <div class="pl30 pr30 rel3">

        <div class="notice flex ac size26" @click="routerPush('/notices')">
            <img src="@/assets/imgs/8.png" class="img36 mr20">
            <van-swipe class="noticeSwipe" :autoplay="3000" :loop="true" :show-indicators="false" :vertical="true">
                <van-swipe-item v-for="(item,index) in notices" :key="index">
                    <div class="noticeSwipe line1" @click="routerPush(`/notices/${item.id}`)">{{ item.title }}</div>
                </van-swipe-item>
            </van-swipe>
            <van-icon name="arrow" color="#999999" />
        </div>

        <div class="bold size32 font2 mt80">
            <ShinyText :text="$t('DAO资产总览')"></ShinyText>
        </div>
    </div>

    <div class="flex jb mt40 pl30 pr30 animate__animated animate__fadeInUp">
        <div class="assetCard flex col jc ac">
            <img src="@/assets/usdt.png" class="img48">
            <div class="grey size24 mt24 tc">{{ $t('全网USDT总赞助') }}</div>
            <div class="size36 bold mt32">
                <span v-if="usdt[0]!='0'">{{ usdt[0] }}</span>
                <span v-else>0</span>
            </div>
            <div class="size24 main mt10">{{ usdt[1] }}</div>
        </div>
        <div class="assetCard flex col jc ac">
            <img src="@/assets/pe.png" class="img48 rel3">
            <div class="grey size24 mt24 tc">{{ $t('全网PE总赞助') }}</div>
            <div class="size36 bold mt32">
                <span v-if="token[0]!='0'">{{ token[0] }}</span>
                <span v-else>0</span>
            </div>
            <div class="size24 main mt10">{{ token[1] }}</div>
        </div>
    </div>

    <div class="pl30 pr30 mt80">
        <div class="bold size32 font2">
            <ShinyText :text="$t('赞助池')"></ShinyText>
        </div>

        <div class="card mt40">
            <div class="flex jc">
                <img src="@/assets/imgs/11.png" class="pic11 roleAni">
            </div>
            <div class="flex">
                <div class="box flex1 mr30">
                    <img src="@/assets/usdt.png" class="img40">
                    <div class="size28 bold mt20 mb10">
                        <span v-init="sponsor?.residue_usdt_reward_point"></span>
                        <span class="size22 ml10">USD</span>
                    </div>
                    <div class="grey size20">{{ $t('全网USDT池奖励点') }}</div>
                </div>
                <div class="box flex1">
                    <img src="@/assets/pe.png" class="img40">
                    <div class="size28 bold mt20 mb10">
                        <span v-init="sponsor?.residue_pe_reward_point"></span>
                        <span class="size22 ml10">USD</span>
                    </div>
                    <div class="grey size20">{{ $t('全网PE池奖励点') }}</div>
                </div>
            </div>
            <div class="flex jb size20 mt32">
                <div class="green">USDT {{ $t('赞助') }}{{ progress_usdt }}%</div>
                <div class="main">{{ tokenName }} {{ $t('赞助') }}{{ progress_token }}%</div>
            </div>
            <div class="line mt20"></div>
            <div class="progress flex jb ac mt30 size18">
                <div class="rel pl30">{{ progress_usdt }}%</div>
                <div class="rel pr30">{{ progress_token }}%</div>
                <div class="leftLine" :style="{width:`${progress_usdt}%`}"></div>
                <div class="rightLine" :style="{width:`${progress_token}%`}"></div>
            </div>
            <div class="flex jb size24 mt60">
                <div class="leftBtn" @click="routerPush('/home/sponsor')">USDT {{ $t('赞助') }}</div>
                <div class="rightBtn" @click="routerPush('/home/sponsor', {type:'token'})">{{ tokenName }} {{ $t('赞助') }}</div>
            </div>
            <div class="bold size32 font2 mt80">
                <ShinyText :text="$t('我的赞助')"></ShinyText>
            </div>
            <div class="box mt40 flex jb ac" @click="routerPush('/home/sponsorLog')">
                <div class="size24 grey">{{ $t('我的总赞助价值') }}</div>
                <div class="size26 bold flex ac flex0 ml30">
                    <div class="nobr">
                        <span v-init="sponsor?.user_count_sponsor"></span>
                        USD
                    </div>
                    <div class="main ml8">
                        <van-icon name="arrow" />
                    </div>
                </div>
            </div>
            <div class="box mt20" @click="routerPush('/home/award')">
                <div class="flex jb ac">
                    <div class="size24 grey">{{ $t('我的USDT池剩余奖励点') }}</div>
                    <div class="size26 bold flex ac flex0 ml30">
                        <div class="nobr">
                            <span v-init="sponsor?.user_residue_usdt_reward_point"></span>
                            USD
                        </div>
                        <div class="main ml8">
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
                <div class="tr main size20 mt18">{{ $t('昨日USDT池收益率') }} +{{ sponsor?.yesterday_usdt_yield_rate }}%</div>
            </div>
            <div class="box mt20" @click="routerPush('/home/award',{cur:1})">
                <div class="flex jb ac">
                    <div class="size24 grey">{{ $t('我的PE池剩余奖励点') }}</div>
                    <div class="size26 bold flex ac flex0 ml30">
                        <div class="nobr">
                            <span v-init="sponsor?.user_residue_pe_reward_point"></span>
                            USD
                        </div> 
                        <div class="main ml8">
                            <van-icon name="arrow" />
                        </div>
                    </div>
                </div>
                <div class="tr main size20 mt18">{{ $t('昨日PE池收益率') }} +{{ sponsor?.yesterday_pe_yield_rate }}%</div>
            </div>
        </div>
        
    </div>

    <div class="gap60"></div>


    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="bold size32 font2">
                    <ShinyText :text="$t('最新公告')"></ShinyText>
                </div>
                <div class="grey" @click="show=false">
                    <van-icon name="cross" :size="25" />
                </div>
            </div>
            <div class="scroll mt40 mb48">
                <div class="size36 bold lh60">{{ notice?.title }}</div>
                <div class="size24 mt30" v-html="notice?.content"></div>
            </div>
            <div class="mainBtn" @click="read">{{ $t('知道了') }}</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { appName, tokenName } from '@/config';
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { computed, ref, watchEffect } from 'vue';
import { routerPush } from '@/router';
import { apiGet } from '@/utils/request';
import { computedAdd, computedDiv, computedSub, initNumber } from '@/utils';

/**
 * 赞助
 */
const sponsor = ref()
const balance_usdt = ref('0')
const balance_token = ref('0')
apiGet('/api/sponsor').then((res:any)=>{
    sponsor.value = res
    balance_usdt.value = res.usdt_sponsor_amount
    balance_token.value = res.pe_sponsor_amount
})

const usdt = computed(()=>{
    if(balance_usdt.value){
        const arr = balance_usdt.value.split('.')
        let one = initNumber((Number(arr[0]))).split('.')[0]
        return [one, `.${arr[1]}`]
    }else return [0, '.000000']
})
const token = computed(()=>{
    if(balance_token.value){
        const arr = balance_token.value.split('.')
        let one = initNumber((Number(arr[0]))).split('.')[0]
        return [one, `.${arr[1]}`]
    }else return [0, '.000000']
})


const progress_usdt = ref(0)
const progress_token = ref(0)
watchEffect(()=>{
    const usdt_sponsor_amount = sponsor.value?.residue_usdt_reward_point
    const pe_sponsor_amount = sponsor.value?.residue_pe_reward_point
    if(usdt_sponsor_amount && pe_sponsor_amount){
        const total = computedAdd(usdt_sponsor_amount, pe_sponsor_amount)
        if(total==0){
            progress_usdt.value = 0
            progress_token.value = 0
        }else{
            if(usdt_sponsor_amount==0){
                progress_usdt.value = 0
                progress_token.value = 100
            }else if(pe_sponsor_amount==0){
                progress_usdt.value = 100
                progress_token.value = 0
            }else{
                progress_usdt.value = Number((computedDiv(usdt_sponsor_amount, total) * 100).toFixed(2))
                progress_token.value = computedSub(100, progress_usdt.value)
            }
        }
    }
})

/**
 * 公告
 */
const notices = ref()
apiGet('/api/notices',{
    page_no:1,
    page_size:5
}).then((res:any)=>notices.value=res.notices)

/**
 * 弹窗公告
 */
const show = ref(false)
const notice = ref()
apiGet('/api/notices/pop').then((res:any)=>{
    if(res.is_show){
        notice.value = res.notice
        show.value = true
    }
})
const read = () => apiGet(`/api/notices/${notice.value?.id}/read`).then(()=>show.value=false)
</script>

<style lang="scss" scoped>
.bg1 {
    width: 750px;
    height: 750px;
    position: absolute;
    top: 398px;
    right: 0;
}

.top {
    width: 100%;
    height: 457px;
    position: relative;
    z-index: 1;
    padding: 0 30px;

    .topLeft {
        width: 340px;
    }

    .desc {
        color: #B3B9C1;
    }

    .pic4 {
        width: 238px;
        height: 238px;
        position: relative;
        z-index: 2;
    }
    .pic5{
        width: 244px;
        height: 244px;
        position: absolute;
        right: 19px;
        bottom: 6px;
        z-index: 1;
    }

    .pic6 {
        width: 270px;
        height: 270px;
        position: absolute;
        right: 20px;
        bottom: 7px;
    }
}
.notice{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    height: 84px;
    border-radius: 42px;
    padding: 0 20px;
    position: relative;
    .noticeSwipe{
        width: 552px;
        height: 64px;
        line-height: 64px;
    }
}
.assetCard{
    width: 330px;
    height: 300px;
    background-image: url("@/assets/imgs/10.png");
    background-size: 100% 100%;
}
.card{
    padding: 44px 30px 60px 30px;
    border-radius: 20px;
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    .pic11{
        width: 450px;
        height: 308px;
    }
    .box{
        background-color: #3030304D;
        border: 1px solid #FFFFFF29;
        padding: 30px 20px;
        border-radius: 20px;
    }
    .ballLeft{
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: $green;
    }
    .ballRight{
        width: 6px;
        height: 6px;
        border-radius: 3px;
        background-color: $main-color;
    }
    .line{
        width: 100%;
        height: 6px;
        background-image: url("@/assets/imgs/3.png");
        background-size: 100% 100%;
    }
    .leftBtn{
        width: 300px;
        height: 64px;
        border-radius: 32px;
        border: 2px solid $green;
        color: $green;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rightBtn{
        width: 300px;
        height: 64px;
        border-radius: 32px;
        border: 2px solid $main-color;
        color: $main-color;
        display: flex;
        justify-content: center;
        align-items: center;
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
.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .scroll{
        width: 100%;
        height: 630px;
        overflow-y: scroll;
    }
}
</style>