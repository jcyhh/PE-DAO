import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getGasLimit } from '@/config/dapp'
import { message } from '@/utils/message'
import { t } from '@/locale'
import { getAddress } from '@/config/storage'

export function useNft (contractAddress: string = import.meta.env.VITE_NFT) {
    let contract:any = null // 合约

    const { connectWallet, showDappLoading, hideDappLoading } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    // [写]是否授权
    const readIsApprovedForAll = async (operator:any = import.meta.env.VITE_BIZ) => {
        console.log(operator);
        return await contract.isApprovedForAll(getAddress(), operator);
    }

    // [写]授权
    const writeSetApprovalForAll = async (operator:any = import.meta.env.VITE_BIZ, approved:boolean = true) => {
        console.log(operator, approved);
        try {
            showDappLoading()
            const estimatedGas = await contract.setApprovalForAll.estimateGas(operator, approved);
            const result = await contract.setApprovalForAll(operator, approved, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            hideDappLoading()
            message(t('授权成功'),'success')
        } catch (error) {
            console.log(error);
            hideDappLoading() // 关闭加载
            message(t('授权失败'), 'fail')
            throw new Error('授权失败')
        }
    }

    return {
        init,
        readIsApprovedForAll,
        writeSetApprovalForAll
    }
}