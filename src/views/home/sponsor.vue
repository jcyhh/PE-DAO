<template>
    <div class="sponsor" @click="showRule = false">
        <CusNav title="赞助">
            <img src="@/assets/imgs/rule.png" class="img26 mr10">
            <div class="main size24" @click.stop="showRule = true">规则</div>
        </CusNav>

        <div class="rule size20 lh40 animate__animated animate__zoomIn anitr ani3" v-if="showRule">
            赞助100U加入PE项目共创，获得价值100U初始流动性权益及分享共识者资格
        </div>
        
        <div class="head">
            <CusTab :defaultCur="defaultCur" :list="tabs" @change="$event => current = $event"></CusTab>
        </div>

        <div class="gap160"></div>
        
        <div class="pl30 pr30">
            <div class="mainCard">
                <div class="size24 grey mb30">赞助数量</div>
                <div class="flex wrap jb size26">
                    <div class="item flex jc ac mb20" :class="amount==item?'itemAct':''" v-for="(item,index) in list" :key="index" @click="amount=item">{{ item }} USD</div>
                </div>
                <div class="gap10"></div>
                <div class="size24 grey mb30">赞助价值</div>
                <div class="mainCard mt24 flex ac">
                    <div class="flex ac">
                        <img src="@/assets/usd.png" class="img46 mr12">
                        <div class="size28">USD</div>
                    </div>
                    <input type="number" v-model="amount" placeholder="请输入赞助价值" class="size28 flex1 tr">
                    <div class="line ml16 mr16 flex0"></div>
                    <div class="bold size24 font2">
                        <ShinyText text="全部"></ShinyText>
                    </div>
                </div>
                <div class="size24 grey mt30">实际支付</div>
                <div class="mainCard mt24 flex jb ac">
                    <div class="flex ac">
                        <img src="@/assets/usdt.png" class="img46 mr12">
                        <div class="size28">USDT</div>
                    </div>
                    <div class="size28" v-init="usdt"></div>
                </div>
                <div class="mainBtn mt60">立即赞助</div>
                <div class="flex jc mt40">
                    <div class="flex ac main size24" @click="routerPush('/home/sponsorLog')">
                        <div class="mr8">赞助记录</div>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="gap30"></div>
            </div>
        </div>
        
    </div>

</template>

<script setup lang="ts">
import CusNav from '@/components/CusNav/index.vue'
import { computed, ref } from 'vue';
import CusTab from '@/components/CusTab/index.vue'
import ShinyText from '@/components/VueBits/ShinyText.vue'
import { routerPush } from '@/router';
import { useRoute } from 'vue-router';
import { apiGet } from '@/utils/request';
import { computedMul } from '@/utils';

const { query } = useRoute()

const showRule = ref(false)

const defaultCur = query.type ? 1 : 0

const current = ref(defaultCur)

const tabs = computed(()=>([
    {name:'USDT 赞助', value:0},
    {name:'PE 赞助', value:0}
]))

const amount = ref(500)
const list = [500, 1000, 2000, 3000, 5000, 100000]

const token_price = ref()
apiGet('/api/token_price').then((res:any)=>token_price.value = res.token_price)

const usdt = computed(()=>{
    if(amount.value){
        if(current.value==0)return amount.value
        else return computedMul(amount.value, token_price.value)
    }else return 0
})
</script>

<style lang="scss" scoped>
.sponsor{
    width: 100vw;
    min-height: 100vh;
}
.rule {
    width: 690px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid #FFFFFF80;
    background: linear-gradient(rgba(52, 14, 70, 0.9), rgba(9, 8, 20, 0.9));
    position: fixed;
    top: 100px;
    left: 30px;
    z-index: 20;
}
.head{
    position: fixed;
    top: 100px;
    left: 0;
    z-index: 10;
}
.item{
    width: 200px;
    height: 90px;
    border-radius: 20px;
    border: 1px solid #FFFFFF29;
    background-color: #1C1C22;
}
.itemAct{
    border: 1px solid transparent;
    position: relative;
    &::before{
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        z-index: -1;
        background: linear-gradient(to right, #7CCBFF, #C348FF);
        border-radius: 20px;
    }
}
.line{
    width: 1px;
    height: 40px;
    background-color: #FFFFFF29;
}
</style>