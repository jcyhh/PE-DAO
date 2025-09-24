<template>
    <div class="pl30 pr30">
        <div class="item mb40" v-for="(item,index) in 3" :key="index">
            <div class="gap30"></div>
            <img src="@/assets/usdt.png" class="nftImg">
            <div class="box">
                <div class="flex jb ac">
                    <div class="pl170 size28 bold">名称</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/rule.png" class="img26 mr10">
                        <div class="main size24">规则</div>
                    </div>
                </div>
                <div class="flex jb ae mt64">
                    <div>
                        <div class="size40 bold">500</div>
                        <div class="blue size20 mt4">售卖价格(USDT)</div>
                    </div>
                    <div class="btn">立即购买</div>
                </div>
                <div class="flex jb ac mt50">
                    <div class="size24">{{ $t('等级权益') }}</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                        <div class="size24 bold">1星</div>
                    </div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('空投代币比例') }}</div>
                    <div class="size26">40%</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('释放周期') }}</div>
                    <div class="size26">100{{ $t('天') }}</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('释放方式') }}</div>
                    <div class="size26">40%</div>
                </div>
            </div>
        </div>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop" @click="showRule=false">
            <div class="flex jb ac">
                <div class="bold size32 font2">
                    <ShinyText text="成为名称"></ShinyText>
                </div>
                <van-icon name="cross" :size="25" color="#999999" @click="show=false" />
            </div>
            <div class="content mt60">
                <div class="size20 bold">
                    <span class="size40 mr10">500</span>
                    <span>USDT</span>
                </div>
                <div class="size20 blue mt20">支付金额(USDT)</div>
                <div class="flex jb size24 mt60">
                    <div class="opc6">空投代币比例</div>
                    <div>40%</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">释放周期</div>
                    <div>8个月</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">释放方式</div>
                    <div>10%</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">等级权益</div>
                    <div>1星</div>
                </div>
                <div class="inp mt40 flex">
                    <input type="text" placeholder="请输入邀请码" class="size28 flex1">
                </div>
                <div class="mt24 flex">
                    <div class="flex ac" @click.stop="showRule=true">
                        <img src="@/assets/imgs/rule.png" class="img26 mr10">
                        <div class="size20 main">如何获得邀请码?</div>
                    </div>
                </div>
                <div class="rule size20 lh40 animate__animated animate__zoomIn anitl ani3" v-if="showRule">
                    1.购买NFT成为组织者或者捐赠成为共识者。<br>
                    2.若已身处DAO中，您也可在治理通过后为好友生成专属推荐码。
                </div>
                <div class="size20 yellow lh48 mt30">{{ $t('提示...') }}</div>
            </div>
            
            <div class="mainBtn mt40">确认</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const show = ref(false)
const showRule = ref(false)
</script>

<style lang="scss" scoped>
.item{
    position: relative;
    .nftImg{
        width: 140px;
        height: 140px;
        position: absolute;
        top: 0;
        left: 30px;
        z-index: 1;
    }
    .box{
        background: linear-gradient(#31303A4D, #100E1D4D);
        border-radius: 20px;
        padding: 30px;
    }
}
.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border-radius: 20px;
    background: linear-gradient(rgba(28, 31, 29, 0.5), rgba(8, 9, 8, 0.5));
    border: 1px solid #FFFFFF80;
    position: relative;
    .inp{
        background-color: #3030304D;
        border: 1px solid #C4C4C433;
        height: 84px;
        border-radius: 20px;
        padding: 0 30px;
    }
    .rule {
        width: 530px;
        padding: 20px;
        border-radius: 20px;
        border: 1px solid #FFFFFF80;
        background: linear-gradient(rgba(52, 14, 70, 0.9), rgba(9, 8, 20, 0.9));
        position: fixed;
        top: 690px;
        left: 30px;
        z-index: 10;
    }
    .content{
        max-height: 60vh;
        overflow-y: scroll;
    }
}
</style>