<template>
    <div class="pl30 pr30">
        <div class="item mb40" v-for="(item,index) in 3" :key="index">
            <div class="gap30"></div>
            <img src="@/assets/usdt.png" class="nftImg">
            <div class="box">
                <div class="flex jb">
                    <div class="pl170 size28 bold">名称</div>
                    <div class="pt10">
                        <div class="progress">
                            <div class="progressBox" :style="{width:`${50}%`}"></div>
                        </div>
                        <div class="tr size24 opc6 mt24">进度 56.86%</div>
                    </div>
                </div>
                <div class="size40 bold mt20">500</div>
                <div class="blue size20 mt4">售卖价格(USDT)</div>
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
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('释放方式') }}</div>
                    <div class="size26">40%</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">交易哈希</div>
                    <div class="size26 br tr hash">0x456789iuhiu78yu89uihj89</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">购买时间</div>
                    <div class="size26">08-01 17:50:00</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

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
    .progress{
        width: 200px;
        height: 18px;
        border-radius: 9px;
        background-color: #FFFFFF29;
        .progressBox{
            height: 18px;
            border-radius: 9px;
            background: linear-gradient(to right, #7CCBFF, #C348FF);
        }
    }
    .hash{
        width: 400px;
    }
}
</style>