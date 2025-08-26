<template>
    <VanPopup v-model:show="show" style="background: transparent;" :destroy-on-close="true" position="bottom" overlay-class="cusMask" teleport="#app">
        <div class="pt2 pr2 pb2 pl2">
            <div class="picker">
                <div class="flex jb ac mb30">
                    <div class="size32 bold">{{ title }}</div>
                    <van-icon size="25" name="cross" color="#999999" @click="close" />
                </div>
                <div class="pickerLine mb30"></div>
                
                <div class="flex ac">
                    <div class="date">
                        <span class="gray">{{ $t('开始时间') }}</span>
                    </div>
                    <div class="dateLine"></div>
                    <div class="date">
                        <span class="gray">{{ $t('结束时间') }}</span>
                    </div>
                </div>

                <div class="mt60">
                    <div class="mainBtn size30" v-scale v-delay="{fun:submit}">{{ submitTxt }}</div>
                </div>
                <div class="safeBottom"></div>
            </div>
        </div>
    </VanPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { t } from '@/locale';
import { format } from 'date-fns'

const emit = defineEmits(['change'])
defineProps({
    title: { // 标题
        type: String,
        default: t('选择日期')
    },
    submitTxt: { // 确认按钮文字
        type: String,
        default: t('确定')
    }
})

const show = ref(false)
const rangeValue = ref<string[]>([format(new Date(), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')])
const open = async () => show.value = true
const close = () => show.value = false

const submit = ()=> {
    close()
    emit('change', rangeValue.value)
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.picker{
    border-radius: 40px 40px 0 0;
    padding: 40px;
    background-color: #14141C;
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
        background: linear-gradient(#C348FF, #00000000);
        border-radius: 40px 40px 0 0;
    }
    .pickerLine{
        width: 100%;
        height: 1px;
        background-color: #FFFFFF1A;
    }
    .date{
        background-color: #3030304D;
        height: 88px;
        border: 1px solid #FFFFFF1A;
        border-radius: 20px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        flex: 1;
        font-size: 24px;
    }
    .dateLine{
        width: 40px;
        height: 2px;
        background-color: #FFFFFF1A;
        flex-shrink: 0;
        margin: 0 30px;
    }
}
</style>