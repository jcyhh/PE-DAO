import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getGasLimit } from '@/config/dapp'
import { showLoading } from '@/utils'
import { closeToast } from 'vant'
import { message } from '@/utils/message'
import { t } from '@/locale'

export function useNft (contractAddress: string = import.meta.env.VITE_NFT) {
    let contract:any = null // 合约

    const { address, connectWallet } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    const onContractFail = (error:any) => {
        console.log(error);
        closeToast()
        message(t('操作失败'), 'fail')
    }

    // [写]是否授权
    const readIsApprovedForAll = async (operator:any = import.meta.env.VITE_BIZ) => {
        console.log(operator);
        return await contract.isApprovedForAll(address.value, operator);
    }

    // [写]授权
    const writeSetApprovalForAll = async (operator:any = import.meta.env.VITE_BIZ, approved:boolean = true) => {
        console.log(operator, approved);
        try {
            showLoading()
            const estimatedGas = await contract.setApprovalForAll.estimateGas(operator, approved);
            const result = await contract.setApprovalForAll(operator, approved, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            closeToast()
            message(t('授权成功'),'success')
        } catch (error) {
            onContractFail(error)
            throw new Error('授权失败')
        }
    }

    init() // 调用化

    return {
        readIsApprovedForAll,
        writeSetApprovalForAll
    }
}