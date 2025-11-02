<template>
    <van-list class="list" v-bind="props">
        <div class="pl30 pr30">
            <div class="item mb40" v-for="(item, index) in list" :key="index">
                <div class="gap30"></div>
                <img :src="item.nft.img_url" class="nftImg">
                <div class="box">
                    <div class="pl170 size28 bold">{{ $t('身份') }}-{{ item.nft.name }}</div>
                    <div class="flex jb ae mt64">
                        <div>
                            <div class="size40 bold" v-init="item.nft.price"></div>
                            <div class="blue size20 mt4">{{ $t('购买价格') }}(USDT)</div>
                        </div>
                        <!-- <div class="disableBtn pl30 pr30" v-if="item.nft.id==maxId">{{ $t('已满级') }}</div>
                        <div class="btn" @click="openpop(item)" v-else>{{ $t('升级') }}</div> -->
                    </div>
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
                    <div class="flex jb ac mt30">
                        <div class="size24 opc6">{{ $t('权重') }}</div>
                        <div class="size26">{{ item.nft.govern_award_weight }}</div>
                    </div>
                </div>
            </div>
        </div>
        <CusEmpty v-if="list?.length == 0"></CusEmpty>
    </van-list>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="linearTxt size32 bold">{{ $t('升级身份') }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show = false" />
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
            <div class="mainBtn mt40" v-scale v-delay="{ fun: submit }">{{ $t('确认') }}</div>
        </div>
    </van-popup>

    <CusPicker ref="picker" :list="updateInfo" @change="$event => current = $event"></CusPicker>
</template>

<script setup lang="ts">
import { useLoadList } from '@/hooks/useLoadList';
import CusEmpty from '@/components/CusEmpty/index.vue'
import CusPicker from '@/components/CusPicker/index.vue';
import { computedSub } from '@/utils';
import { useEthers } from '@/dapp';
import { useNft } from '@/dapp/contract/nft/useNft';
import { useBiz } from '@/dapp/contract/biz/useBiz';
import { useErc20 } from '@/dapp/contract/erc20/useErc20';
import { apiGet, apiPost } from '@/utils/request';
import { computed, ref, watch } from 'vue';
import { useDappStore } from '@/store';
import { storeToRefs } from 'pinia';

const { list, props, loadList } = useLoadList('/api/order', 'orders')
loadList()

const dappStore = useDappStore()
const { address } = storeToRefs(dappStore)

const nfts = ref<any[]>([])
const maxId = ref()
apiGet('/api/nft').then((res: any) => {
    nfts.value = res.nft
    maxId.value = Math.max(...res.nft.map((item: any) => item.id))
})

const nowNft = ref()
const updateInfo = ref<any[]>([])
const picker = ref()
const current = ref(0)
const show = ref(false)
const total = computed(() => {
    if (updateInfo.value.length > 0) {
        return computedSub(updateInfo.value[current.value].price, nowNft.value.nft.price)
    } else return 0
})
// const openpop = (data: any) => {
//     nowNft.value = data
//     const nftid = data.nft.id
//     updateInfo.value = nfts.value.filter(item => item.id > nftid)
//     show.value = true
// }

const { getSign, checkGas } = useEthers()

const { writeUpgrade, init:initBiz } = useBiz()

const { readIsApprovedForAll, writeSetApprovalForAll, init:initNft } = useNft()

const { approve, init:initErc20 } = useErc20()

watch(address, val => {
    if(val){
        initBiz(),
        initNft(),
        initErc20()
    }
}, {immediate:true})

const submit = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if (!gasEnough) return;

    const isApprove = await readIsApprovedForAll()
    if (isApprove) {
        update()
    } else {
        await writeSetApprovalForAll()
        update()
    }
}

const update = async () => {
    await approve(total.value)

    const signInfo: any = await getSign('Upgrade') // 签名

    apiPost('/api/order/upgrade_nft', {
        upgrade_nft_id: updateInfo.value[current.value].id,
        order_id: nowNft.value.id,
        ...signInfo
    }).then(async (res: any) => {
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
.item {
    position: relative;

    .nftImg {
        width: 140px;
        height: 140px;
        position: absolute;
        top: 0;
        left: 30px;
        z-index: 1;
        border-radius: 10px;
    }

    .box {
        background: linear-gradient(#31303A4D, #100E1D4D);
        border-radius: 20px;
        padding: 30px;
    }

    .progress {
        width: 200px;
        height: 18px;
        border-radius: 9px;
        background-color: #FFFFFF29;

        .progressBox {
            height: 18px;
            border-radius: 9px;
            background: linear-gradient(to right, #7CCBFF, #C348FF);
        }
    }

    .hash {
        width: 400px;
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