<template>
    <!-- <CusTab :list="tabs" @change="$event => current = $event"></CusTab> -->
    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="gap30"></div>
        <div class="pl30 pr30">
            <van-list v-bind="listProps">
                <div class="node mb30" v-for="(item,index) in list" :key="index">
                    <div class="flex jb ac">
                        <div class="flex ac">
                            <img src="@/assets/imgs/7.png" class="img44 mr20 avatar" v-if="item.type==1">
                            <img :src="item.nft.img_url" class="img44 mr20" v-else>
                            <div class="size24 bold">{{ $t('身份') }}-{{ item.type==1? $t('共识者') : item.nft.name }}</div>
                        </div>
                        <div>
                            <div class="size24 opc6 mb20 tr">{{ $t('进度') }} 0%</div>
                            <CusProgress :width="0"></CusProgress>
                        </div>
                    </div>
                    <div class="size40 bold mt40" v-init="item.type==1?gsz_price:item.nft.price"></div>
                    <div class="size20 blue mt4">{{ item.type==1 ? $t('赞助金额') : $t('购买价格') }} (USDT)</div>
                    <div v-if="item.type==2">
                        <div class="flex jb ac mt50">
                            <div class="size24">{{ $t('等级权益') }}</div>
                            <div class="flex ac">
                                <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                                <div class="size24 bold">{{ item.nft.level_equity }}</div>
                            </div>
                        </div>
                        <div class="flex jb ac mt30">
                            <div class="size24 opc6">{{ $t('空投代币比例') }}</div>
                            <div class="size26">{{ Number(item.nft.token_rate) }}%</div>
                        </div>
                        <div class="flex jb ac mt30">
                            <div class="size24 opc6">{{ $t('释放周期') }}</div>
                            <div class="size26">{{ item.nft.release_days }}{{ $t('天') }}</div>
                        </div>
                        <div class="flex jb ac mt30">
                            <div class="size24 opc6">{{ $t('释放方式') }}</div>
                            <div class="size26">{{ Number(item.nft.release_rate) }}%</div>
                        </div>
                    </div>
                </div>
                <CusEmpty v-if="list?.length==0"></CusEmpty>
            </van-list>
        </div>
    </van-pull-refresh>

</template>

<script setup lang="ts">
// import CusTab from '@/components/CusTab/index.vue'
// import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import { apiGet } from '@/utils/request';
import { ref } from 'vue';

// const current = ref(0)

// const tabs = computed(() => ([
//     { name: '当前身份' },
//     { name: '已使用' }
// ]))

const { list, props: listProps, loadList } = useLoadList('/api/order', 'orders')
const { props } = usePullRefresh(loadList)
loadList()

const gsz_price = ref(0) // “共识者”nft的价格
apiGet('/api/config/config').then((res:any)=>gsz_price.value=res.gsz_price)
</script>

<style lang="scss" scoped></style>