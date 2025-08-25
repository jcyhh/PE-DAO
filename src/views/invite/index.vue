<template>
    <CusTab :list="tabs" @change="tabsClick"></CusTab>

    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="pl30 pr30">
            <van-list v-bind="listProps">
                <div class="card mb30" v-for="(item,index) in list" :key="index">
                    <div class="size26 bold mb24">邀请码</div>
                    <div class="flex jb ac">
                        <div class="linearNum size32 bold font1">0YUIHK098</div>
                        <img src="@/assets/layout/copy.png" class="img48">
                    </div>
                    <div class="flex jb ac mt60">
                        <div class="size24 opc6">地址</div>
                        <div class="flex ac">
                            <div class="size26">0xd205e6...b268B</div>
                            <img src="@/assets/imgs/copy.png" class="img24 ml10">
                        </div>
                    </div>
                    <div class="flex jb ac mt28">
                        <div class="size24 opc6">状态</div>
                        <div class="size26">已使用</div>
                    </div>
                    <div class="flex jb ac mt28">
                        <div class="size24 opc6">使用时间</div>
                        <div class="size26">2025.08.01 17:50</div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </van-list>

        </div>

        <div class="gap160"></div>
    </van-pull-refresh>

    
    <div class="btn">生成邀请码</div>
</template>

<script setup lang="ts">
import CusTab from '@/components/CusTab/index.vue'
import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import CusEmpty from '@/components/CusEmpty/index.vue'

const current = ref(0)

const tabs = computed(()=>([
    {name:'未使用', value:1},
    {name:'已使用', value:2}
]))
const tabsClick = (index:number) => {
    if(current.value==index)return
    console.log('tabsClick 执行，index:', index)
    current.value = index
    loadList(true)
}

const params = computed(()=>({
    status: tabs.value[current.value].value
}))

const { list, props:listProps, loadList } = useLoadList('/api/referral_code','referral_code', params)

const { props } = usePullRefresh(loadList)

console.log('页面初始化，调用 loadList')
loadList(true)
</script>

<style lang="scss" scoped>
.card{
    background-color: #3030304D;
    border: 1px solid #FFFFFF29;
    border-radius: 20px;
    padding: 40px 30px;
}
.btn{
    @include linear;
    width: 690px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    color: #1B1B1E;
    font-size: 26px;
    font-weight: bold;
    border-radius: 36px;
    position: fixed;
    bottom: 60px;
    left: 30px;
    z-index: 10;
}
</style>