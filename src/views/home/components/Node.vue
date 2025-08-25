<template>
    <div class="rel pt80">
        <img src="@/assets/imgs/2.png" class="bg2 anicl" v-on-show="'animate__zoomIn'">

        <div class="linearTxt size32 bold font2">我的组织身份</div>

        <div class="node mt40 mb80">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img :src="nodeIcon1" class="img44 mr20" :class="'icon anibc'">
                    <div class="size24 bold">身份-{{ '宝剑' }}</div>
                </div>
                <div>
                    <div class="size24 opc6 mb20">进度 50%</div>
                    <CusProgress :width="50"></CusProgress>
                </div>
            </div>
            <div class="size40 bold mt40">500.00</div>
            <div class="size20 blue mt4">售卖价格(USDT)</div>
            <div class="flex jb ac mt50">
                <div class="size24">等级权益</div>
                <div class="flex ac">
                    <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                    <div class="size24 bold">1星</div>
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">空投代币比例</div>
                <div class="size26">40%</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放周期</div>
                <div class="size26">8个月</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放方式</div>
                <div class="size26">10%/10%/5%/5%...</div>
            </div>
        </div>

        <div class="linearTxt size32 bold font2">成为组织成员</div>

        <div class="node mt40" v-for="(item, index) in list" :key="index">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img :src="item.icon" class="img44 mr20" :class="item.className">
                    <div class="size24 bold">身份-{{ item.name }}</div>
                </div>
                <div class="btn" @click="show=true">立即购买</div>
            </div>
            <div class="size40 bold mt40">500.00</div>
            <div class="size20 blue mt4">售卖价格(USDT)</div>
            <div class="flex jb ac mt50">
                <div class="size24">等级权益</div>
                <div class="flex ac">
                    <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                    <div class="size24 bold">1星</div>
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">空投代币比例</div>
                <div class="size26">40%</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放周期</div>
                <div class="size26">8个月</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放方式</div>
                <div class="size26">10%/10%/5%/5%...</div>
            </div>
        </div>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="linearTxt size32 bold">成为宝剑</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show=false" />
            </div>
            <div class="size40 bold mt60">500.00</div>
            <div class="size20 blue mt4">售卖价格(USDT)</div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">空投代币比例</div>
                <div class="size26">40%</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放周期</div>
                <div class="size26">8个月</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">释放方式</div>
                <div class="size26">10%/10%/5%/5%...</div>
            </div>
            <div class="tips size20 mt60 lh48">提示:PE是由区块链爱好者为了维护所有数字资产持有者的链上财产主权而发起的DAO项目，与任何组织或个人无关。购买NFT将被视为认同PE理念而主动赞助项目发展的行为，不涉及任何投资;</div>
            <div class="mainBtn mt40">确认</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import nodeIcon1 from '@/assets/imgs/8.png'
import nodeIcon2 from '@/assets/imgs/10.png'
import nodeIcon3 from '@/assets/imgs/11.png'
import CusProgress from '@/components/CusProgress/index.vue'
import { ref } from 'vue'

const show = ref(false)

const list = [
    { name: '宝剑', icon: nodeIcon1 , className:'icon anibc' },
    { name: '权杖', icon: nodeIcon2, className:'icon anibr' },
    { name: '皇冠', icon: nodeIcon3, className:'crow' }
]

const submit = () => {
}
</script>

<style lang="scss" scoped>
.bg2{
    width: 750px;
    height: 900px;
    position: absolute;
    left: -30px;
    top: 343px;
    z-index: 1;
}
.pop{
    width: 590px;
    padding: 30px 30px 40px 30px;
    border: 1px solid #FFFFFF80;
    border-radius: 20px;
    background: linear-gradient(52deg, #1C1F1D, #080908);
    .tips{
        color: #EED05F;
    }
}
</style>