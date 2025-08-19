import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import BigNumber from "bignumber.js";
import { ref } from "vue";
import { bscMainnet, testNet, type SignMessage, minGas, numRule } from '@/config/dapp';
import { showToast } from "vant";

export function useEthers() {
    const { ethereum } = window as any
    let provider: any = null; // 提供者
    let signer: any = null; // 签名器

    const address = ref(); // 钱包地址
    const hasMetaMask = ref(0) // 0异步等待钱包对象注入中 1有MetaMask环境 2无MetaMask环境

    // 是否有MetaMask环境
    const checkMetaMask = async () => {
        try {
            const metamask = await detectEthereumProvider();
            hasMetaMask.value = metamask ? (metamask === ethereum ? 1 : 2) : 2;
        } catch (error) {
            hasMetaMask.value = 2
        }
    }

    // 链接钱包
    const connectWallet = async () => {
        await detectEthereumProvider();
        provider = new ethers.BrowserProvider(ethereum);
        signer = await provider.getSigner();
        address.value = signer.address
        return { provider, signer }
    }

    // 检查网络
    const checkChain = async () => {
        const network = await provider.getNetwork();
        const chainId: string = network.chainId.toString(); // 当前网络
        // const chainInfo = import.meta.env.PROD ? bscMainnet : testNet; // 目标网络
        const chainInfo = bscMainnet; // 目标网络
        if(chainId != parseInt(chainInfo.chainId).toFixed())await switchChain(chainInfo) // 切换至目标网络
    }

    // 切换网络
    const switchChain = async (chainInfo:any) => {
        try {
            // 切换至目标网络
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: chainInfo.chainId }]
            })
        } catch (error:any) {
            if(error.code == 4902){
                // 目标网络未添加
                try {
                    // 添加目标网络
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [chainInfo]
                    })
                } catch (err) {}
            }
        }
    }

    // 获取签名
    const getSign = async (message: SignMessage) => {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = await signer.signMessage([message, timestamp].join('-'));
        return { signature, timestamp }
    }

    // 检查Gas是否足够
    const checkGas = async () => {
        const result = await ethereum.request({
            method: 'eth_getBalance',
            params: [address.value, "latest"]
        });
        let balanceInEth:any = parseInt(result, 16)
        balanceInEth = new BigNumber(balanceInEth)
        const min = new BigNumber(minGas).times(numRule)
        if(min.comparedTo(balanceInEth) == 1){
            showToast('Gas费不足')
            return false
        }
        return true;
    }

    // 立即执行的函数
    checkMetaMask()

    return {
        address, // 钱包地址
        hasMetaMask, // 是否有MetaMask环境
        connectWallet, // 链接钱包
        checkChain, // 检查网络
        checkGas, // 检查Gas是否足够
        getSign // 获取签名
    }
}