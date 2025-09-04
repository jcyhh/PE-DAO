<template>
    <!-- <CusTab :list="tabs" @change="$event => current = $event"></CusTab> -->
    <van-pull-refresh class="fullPage" v-bind="props">
        <div class="gap60"></div>
        <div class="pl30 pr30">
            <van-list v-bind="listProps">
                <div class="node mb70" v-for="(item,index) in list" :key="index">
                    <img src="@/assets/imgs/7.png" class="nftimg mr20" v-if="item.type==1">
                    <img :src="item.img_url" class="nftimg mr20" v-else>
                    <div class="flex jb ac">
                        <div class="size24 bold pl170">{{ $t('身份') }}-{{ item.type==1? $t('共识者') : item.nft.name }}</div>
                        <div>
                            <div class="size24 opc6 mb20 tr">{{ $t('进度') }} 0%</div>
                            <CusProgress :width="0"></CusProgress>
                        </div>
                    </div>
                    <div class="flex jb ae mt40">
                        <div>
                            <div class="size40 bold" v-init="item.type==1?gsz_price:item.nft.price"></div>
                            <div class="size20 blue mt4">{{ item.type==1 ? $t('赞助金额') : $t('购买价格') }} (USDT)</div>
                        </div>
                        <div class="disableBtn pl30 pr30" v-if="item.nft.id==maxId">{{ $t('已满级') }}</div>
                        <div class="update pl30 pr30" @click="openpop(item)" v-else>{{ $t('升级') }}</div>
                    </div>
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

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="linearTxt size32 bold">{{ $t('升级身份') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show=false" />
            </div>
            <div class="flex mt50">
                <div class="flex1 mr10">
                    <div class="opc5 size24 mb20">{{ $t('身份名称') }}</div>
                    <div class="box flex jb ac size28" @click="picker.open(current)">
                        <div>{{ updateInfo[current]?.name }}</div>
                        <van-icon name="arrow" color="#FFFFFF80" />
                    </div>
                </div>
                <div class="flex1">
                    <div class="opc5 size24 mb20">{{ $t('当前等级') }}</div>
                    <div class="box flex ac size28">
                        <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                        <div class="size24 bold">{{ updateInfo[current]?.level_equity }}</div>
                    </div>
                </div>
            </div>
            <div class="size24 mt30">{{ $t('升级价格') }}</div>
            <div class="box flex jb ac mt20">
                <div class="size32 bold" v-init="total"></div>
                <div class="flex ac">
                    <div class="line"></div>
                    <div class="sizez24">USDT</div>
                </div>
            </div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submit}">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <CusPicker ref="picker" :list="updateInfo" @change="$event=>current=$event"></CusPicker>
</template>

<script setup lang="ts">
// import CusTab from '@/components/CusTab/index.vue'
// import { computed, ref } from 'vue';
import { useLoadList } from '@/hooks/useLoadList';
import { usePullRefresh } from '@/hooks/usePullRefresh';
import { apiGet, apiPost } from '@/utils/request';
import { computed, ref } from 'vue';
import CusPicker from '@/components/CusPicker/index.vue';
import { computedSub } from '@/utils';
import { useEthers } from '@/dapp';
import { useNft } from '@/dapp/contract/nft/useNft';
import { useBiz } from '@/dapp/contract/biz/useBiz';


const nfts = ref<any[]>([])
const maxId = ref()
apiGet('/api/nft').then((res:any)=>{
    nfts.value=res.nft
    maxId.value = Math.max(...res.nft.map((item:any) => item.id))
})

const { list, props: listProps, loadList } = useLoadList('/api/order', 'orders')
const { props } = usePullRefresh(loadList)
loadList()

const gsz_price = ref(0) // “共识者”nft的价格
apiGet('/api/config/config').then((res:any)=>gsz_price.value=res.gsz_price)

const nowNft = ref()
const updateInfo = ref<any[]>([])
const picker = ref()
const current = ref(0)
const show = ref(false)
const total = computed(()=>{
    if(updateInfo.value.length>0){
        return computedSub(updateInfo.value[current.value].price, nowNft.value.nft.price)
    }else return 0
})
const openpop = (data:any) => {
    nowNft.value = data
    const nftid = data.nft.id
    updateInfo.value = nfts.value.filter(item=>item.id > nftid)
    show.value = true
}

const { getSign, checkGas, connectWallet } = useEthers()
connectWallet()

const { writeUpgrade } = useBiz()

const { readIsApprovedForAll, writeSetApprovalForAll } = useNft()

const submit = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    const isApprove = await readIsApprovedForAll()
    if(isApprove){
        update()
    }else{
        await writeSetApprovalForAll()
        update()
    }
}

const update = async () => {
    const signInfo:any = await getSign('Upgrade') // 签名

    apiPost('/api/order/upgrade_nft',{
        upgrade_nft_id: updateInfo.value[current.value].id,
        order_id: nowNft.value.id,
        ...signInfo
    }).then(async (res:any) => {
        const { id, price, old_token_id, expired_at, sign } = res
        await writeUpgrade(id, price, old_token_id, expired_at, sign)
        show.value = false
        setTimeout(() => {
            loadList()
        }, 3000);
    })
}
</script>

<style lang="scss" scoped>
.update{
    @include linear;
    height: 54px;
    border-radius: 27px;
    line-height: 54px;
    font-size: 24px;
    color: #000000;
    padding: 0 20px;
    position: relative;
    z-index: 5;
}
.disableBtn{
    height: 54px;
    border-radius: 27px;
    line-height: 54px;
    font-size: 24px;
    background-color: #FFFFFF1A;
    color: #FFFFFF80;
    position: relative;
    z-index: 5;
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
    .box{
        height: 85px;
        padding: 0 24px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
    .line{
        width: 1px;
        height: 40px;
        background-color: #C4C4C433;
        margin-right: 20px;
    }
}
</style>