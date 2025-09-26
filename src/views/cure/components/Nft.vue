<template>
    <div class="pl30 pr30">
        <div class="item mb40" v-for="(item,index) in list" :key="index">
            <div class="gap30"></div>
            <img :src="item.img_url" class="nftImg">
            <div class="box">
                <div class="pl170 size28 bold">{{ $t('身份') }}-{{ item.name }}</div>
                <div class="flex jb ae mt64">
                    <div>
                        <div class="size40 bold" v-init="item.price"></div>
                        <div class="blue size20 mt4">{{ $t('售卖价格') }}(USDT)</div>
                    </div>
                    <div class="btn" @click="open(item)">{{ $t('立即购买') }}</div>
                </div>
                <div class="flex jb ac mt50">
                    <div class="size24">{{ $t('等级权益') }}</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                        <div class="size24 bold">{{ item.level_equity }}</div>
                    </div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('空投代币比例') }}</div>
                    <div class="size26">{{ Number(item.token_rate) }}%</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('释放周期') }}</div>
                    <div class="size26">{{ item.release_days }}{{ $t('天') }}</div>
                </div>
                <div class="flex jb ac mt30">
                    <div class="size24 opc6">{{ $t('释放方式') }}</div>
                    <div class="size26">{{ Number(item.release_rate) }}%</div>
                </div>
            </div>
        </div>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop" @click="showRule=false">
            <div class="flex jb ac">
                <div class="bold size32 font2">
                    <ShinyText :text="`${$t('成功')}-${info?.name}`"></ShinyText>
                </div>
                <van-icon name="cross" :size="25" color="#999999" @click="show=false" />
            </div>
            <div class="content mt60">
                <div class="size20 bold">
                    <span class="size40 mr10" v-init="info?.price"></span>
                    <span>USDT</span>
                </div>
                <div class="size20 blue mt20">{{ $t('售卖价格') }}(USDT)</div>
                <div class="flex jb size24 mt60">
                    <div class="opc6">{{ $t('空投代币比例') }}</div>
                    <div>{{ Number(info.token_rate) }}%</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">{{ $t('释放周期') }}</div>
                    <div>{{ info.release_days }}{{ $t('天') }}</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">{{ $t('释放方式') }}</div>
                    <div>{{ Number(info.release_rate) }}%</div>
                </div>
                <div class="flex jb size24 mt30">
                    <div class="opc6">{{ $t('等级权益') }}</div>
                    <div class="flex ac">
                        <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                        <div class="size26 bold">{{ info?.level_equity }}</div>
                    </div>
                </div>
                <div class="inp mt40 flex">
                    <input type="text" v-model="inviteCode" :placeholder="$t('请输入邀请码')" class="size28 flex1">
                </div>
                <div class="mt24 flex">
                    <div class="flex ac" @click.stop="showRule=true">
                        <img src="@/assets/imgs/rule.png" class="img26 mr10">
                        <div class="size20 main">如何获得邀请码?</div>
                    </div>
                </div>
                <div class="rule size20 lh40 animate__animated animate__zoomIn anitl ani3" v-if="showRule">
                    1.购买NFT成为组织者。<br>
                    2.若已身处DAO中，您也可在治理通过后为好友生成专属推荐码。
                </div>
                <div class="size20 yellow lh48 mt30">{{ $t('提示...') }}</div>
            </div>
            
            <div class="mainBtn mt40" v-scale v-delay="{fun:submit}">确认</div>
        </div>
    </van-popup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { apiGet, apiPost } from '@/utils/request'
import { useEthers } from '@/dapp'
import { useBiz } from '@/dapp/contract/biz/useBiz'
import { useErc20 } from '@/dapp/contract/erc20/useErc20'
import { message } from '@/utils/message'
import { t } from '@/locale'

const show = ref(false)
const showRule = ref(false)

const { getSign, checkGas, connectWallet } = useEthers()
connectWallet()

const { writeMint, writeDonate } = useBiz()

const { approve } = useErc20()

const list = ref<any[]>([]) // nft列表
const info = ref() // 当前要铸造的nft信息
const inviteCode = ref() // 邀请码

apiGet('/api/nft').then((res:any)=>list.value=res.nft)

const open = (data:any) => {
    inviteCode.value = ''
    info.value = data
    show.value = true
}

// 铸造nft
const submit = async () => {
    if(!inviteCode.value)return message(t('请输入邀请码'))

    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    await approve(info.value.price); // 授权U
    
    const signInfo:any = await getSign('Order') // 签名

    apiPost('/api/order/nft',{
        nft_id: info.value.id,
        ref: inviteCode.value,
        ...signInfo
    }).then(async (res:any)=>{
        const { id, price, expired_at, sign } = res
        await writeMint(id, price, expired_at, sign) // 铸造
        show.value = false
    })
}
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