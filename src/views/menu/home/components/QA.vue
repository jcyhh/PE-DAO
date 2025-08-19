<template>
    <div class="qa-container">
        <div class="qaAct" :class="{ 'active': show }">
            <div class="qAct flex rel" @click="show=false">
                <div class="br flex1 mr60 size28 bold lh50">PE-DAO 平台是做什么的?</div>
                <van-icon class="mt5" name="arrow-up" color="#00000080" />
            </div>
            <div class="a" :class="{ 'show': show }">
                Private 是一个为个人数字资产提供跨链隐私化处理的系统 。它主要由两个部分构成:<br>
                <br>
                PE(Private Exchange)：这是您用来进行资产隐私化处理的平台。<br>
                <br>
                PL(Private Liquidity)：这是一个流动性平台，为整个系统的顺畅运行提供资金支持我们的目标是为全球的加密货币用户提供一个可靠的资产隐私安全护盾。
            </div>
        </div>
        <div class="qa" :class="{ 'hidden': show }">
            <div class="q flex rel" @click="open">
                <div class="br flex1 mr60 size28 bold lh50">PE-DAO 平台是做什么的?</div>
                <van-icon class="mt5" name="arrow-down" color="#FFFFFF80" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['index'])

const emits = defineEmits(['open'])

const show = ref(false)

const open = () => {
    show.value = true
    emits('open', props.index)
}

const close = (index:any) => {
    if(props.index != index)show.value = false
}

defineExpose({
    close
})
</script>

<style lang="scss" scoped>
.qa-container {
    position: relative;
}

.qa{
    border-radius: 20px;
    border: 1px solid #FFFFFF29;
    position: relative;
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    transform: translateY(0);
    
    &.hidden {
        display: none;
    }
    
    .q{
        width: 100%;
        background-color: #3030304D;
        padding: 30px;
    }
}

.qaAct{
    border-radius: 20px;
    border: 1px solid #54D7F7;
    background-color: #3030304D;
    overflow: hidden;
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    transform: translateY(10px);
    height: 0;
    
    &.active {
        opacity: 1;
        transform: translateY(0);
        height: auto;
    }
    
    .qAct{
        @include linear;
        width: 100%;
        border-bottom: 1px solid #54D7F7;
        padding: 30px;
        border-radius: 20px;
    }
    
    .a{
        padding: 30px;
        font-size: 26px;
        line-height: 48px;
        color: #999999;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        
        &.show {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
</style>