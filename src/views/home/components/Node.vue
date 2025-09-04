<template>
    <div class="card pt30 pb30">
        <div class="pl30 pr30 flex jb ac">
            <div>
                <div class="size32 bold font2">HI! {{ $t('共识者') }}</div>
                <div class="size20 grey mt8">{{ $t('欢迎加入PE成为共识者') }}</div>
            </div>
            <div class="invite" v-scale v-delay="{fun:submit1}">{{ $t('立即赞助') }}</div>
        </div>
        <div class="line"></div>
        <div class="flex ast pl30 pr30">
            <img src="@/assets/imgs/7.png" class="pic7 flex0 mr30">
            <div class="flex1 flex col jb">
                <div>
                    <div class="size20 blue">{{ $t('赞助金额') }}(USDT)</div>
                    <div class="size44 bold mt8" v-init="gsz_price"></div>
                </div>
                <div class="size20 grey mt10">{{ $t('赞助...') }}</div>
            </div>
        </div>
    </div>
    <div class="rel pt80">
        <img src="@/assets/imgs/2.png" class="bg2 anicl" v-on-show="'animate__zoomIn'">

        <!-- <div class="linearTxt size32 bold font2">{{ $t('我的组织身份') }}</div>

        <div class="node mt40 mb80">
            <div class="flex jb ac">
                <div class="flex ac">
                    <img :src="nodeIcon1" class="img44 mr20" :class="'icon anibc'">
                    <div class="size24 bold">{{ $t('身份') }}-{{ '宝剑' }}</div>
                </div>
                <div>
                    <div class="size24 opc6 mb20">{{ $t('进度') }} 50%</div>
                    <CusProgress :width="50"></CusProgress>
                </div>
            </div>
            <div class="size40 bold mt40">500.00</div>
            <div class="size20 blue mt4">{{ $t('售卖价格') }}(USDT)</div>
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
                <div class="size26">8个月</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">{{ $t('释放方式') }}</div>
                <div class="size26">10%/10%/5%/5%...</div>
            </div>
        </div> -->

        <div class="linearTxt size32 bold font2">{{ $t('成为组织成员') }}</div>
        <div class="gap10"></div>

        <div class="node mt70" v-for="(item, index) in list" :key="index">
            <img :src="item.img_url" class="nftimg mr20">
            <div class="flex jb ac">
                <div class="pl170 size24 bold">{{ $t('身份') }}-{{ item.name }}</div>
                <div class="btn" @click="open(item)">{{ $t('立即购买') }}</div>
            </div>
            <div class="size40 bold mt40" v-init="item.price"></div>
            <div class="size20 blue mt4">{{ $t('售卖价格') }}(USDT)</div>
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

    <van-popup v-model:show="show" style="background-color: transparent !important;" overlay-class="cusMask">
        <div class="pop">
            <div class="flex jb ac">
                <div class="linearTxt size32 bold">{{ $t('成为') }}-{{ info?.name }}</div>
                <van-icon name="cross" color="#999999" :size="25" @click="show=false" />
            </div>
            <div class="size40 bold mt60" v-init="info?.price"></div>
            <div class="size20 blue mt4">{{ $t('售卖价格') }}(USDT)</div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">{{ $t('等级权益') }}</div>
                <div class="flex ac">
                    <img src="@/assets/imgs/9.png" class="img40 mr10 aniRotate">
                    <div class="size26 bold">{{ info?.level_equity }}</div>
                </div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">{{ $t('空投代币比例') }}</div>
                <div class="size26">{{ Number(info.token_rate) }}%</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">{{ $t('释放周期') }}</div>
                <div class="size26">{{ info.release_days }}{{ $t('天') }}</div>
            </div>
            <div class="flex jb ac mt30">
                <div class="size24 opc6">{{ $t('释放方式') }}</div>
                <div class="size26">{{ Number(info.release_rate) }}%</div>
            </div>
            <div class="box mt60 flex">
                <input type="text" v-model="inviteCode" :placeholder="$t('请输入邀请码')" class="size24  flex1">
            </div>
            <div class="tips size20 mt60 lh48">{{ $t('提示...') }}</div>
            <div class="mainBtn mt40" v-scale v-delay="{fun:submit}">{{ $t('确认') }}</div>
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

const { getSign, checkGas, connectWallet } = useEthers()
connectWallet()

const { writeMint, writeDonate } = useBiz()

const { approve } = useErc20()

const show = ref(false) // 弹窗

const list = ref<any[]>([]) // nft列表
const info = ref() // 当前要铸造的nft信息
const gsz_price = ref(0) // “共识者”nft的价格
const inviteCode = ref() // 邀请码

apiGet('/api/nft').then((res:any)=>list.value=res.nft)
apiGet('/api/config/config').then((res:any)=>gsz_price.value=res.gsz_price)

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

// 铸造“共识者”nft
const submit1 = async () => {
    const gasEnough = await checkGas(); // 检测ETH
    if(!gasEnough)return;

    await approve(gsz_price.value); // 授权U
    
    const signInfo:any = await getSign('Order') // 签名

    apiPost('/api/order/gsz', signInfo).then(async (res:any)=>{
        const { id, price, to, expired_at, sign } = res
        await writeDonate(id, price, to, expired_at, sign) // 铸造
    })
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
    .box{
        padding: 30px 24px;
        border-radius: 20px;
        border: 1px solid #999999;
    }
}
.card{
    border: 1px solid #FFFFFF29;
    background-color: #3030304D;
    border-radius: 20px;
    .invite{
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
    .line{
        width: 100%;
        height: 2px;
        background-color: #090814;
        margin: 30px 0;
    }
    .pic7{
        width: 240px;
        height: 180px;
    }
}
</style>