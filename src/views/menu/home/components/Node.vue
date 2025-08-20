<template>
    <div class="rel pt80">
        <img src="@/assets/imgs/2.png" class="bg2 anicl" v-on-show="'animate__zoomIn'">

        <div class="linearTxt size32 bold font2">我的组织身份</div>

        <div class="node mt40 mb80">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img :src="nodeIcon1" class="img44 mr20" :class="'icon anibc'">
                    <div class="size24 bold">{{ '身份-宝剑' }}</div>
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
                    <div class="size24 bold">{{ item.name }}</div>
                </div>
                <div class="btn" @click="submit">立即购买</div>
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

</template>

<script setup lang="ts">
import nodeIcon1 from '@/assets/imgs/8.png'
import nodeIcon2 from '@/assets/imgs/10.png'
import nodeIcon3 from '@/assets/imgs/11.png'
import CusProgress from '@/components/CusProgress/index.vue'

const list = [
    { name: '身份-宝剑', icon: nodeIcon1 , className:'icon anibc' },
    { name: '身份-权杖', icon: nodeIcon2, className:'icon anibr' },
    { name: '身份-皇冠', icon: nodeIcon3, className:'crow' }
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
</style>