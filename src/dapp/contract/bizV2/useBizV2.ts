import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getGasLimit } from '@/config/dapp'
import { message } from '@/utils/message'
import { t } from '@/locale'

export function useBizV2 (contractAddress: string = import.meta.env.VITE_BIZ_V2) {
    let contract:any = null // 合约

    const { connectWallet, showDappLoading, hideDappLoading } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    // [写]
    const writeDonate = async (...arg: any[]) => {
        console.log(arg);
        try {
            showDappLoading()
            const estimatedGas = await contract.donate.estimateGas(...arg);
            const result = await contract.donate(...arg, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            hideDappLoading()
            message(t('操作成功'),'success')
        } catch (error) {
            console.log(error);
            hideDappLoading()
            message(t('操作失败'), 'fail')
            throw new Error('操作失败')
        }
    }

    // [写]
    const writeMint = async (...arg: any[]) => {
        console.log(arg);
        try {
            showDappLoading()
            const estimatedGas = await contract.mint.estimateGas(...arg);
            const result = await contract.mint(...arg, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            hideDappLoading()
            message(t('操作成功'),'success')
        } catch (error) {
            console.log(error);
            hideDappLoading()
            message(t('操作失败'), 'fail')
            throw new Error('操作失败')
        }
    }

    // [写]
    // id   distributor amount  expiredTime signature
    const writeClaim = async (...arg: any[]) => {
        console.log(arg);
        try {
            showDappLoading()
            const estimatedGas = await contract.claim.estimateGas(...arg);
            const result = await contract.claim(...arg, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            hideDappLoading()
            message(t('操作成功'),'success')
        } catch (error) {
            console.log(error);
            hideDappLoading()
            message(t('操作失败'), 'fail')
            throw new Error('操作失败')
        }
    }

    return {
        init,
        writeMint,
        writeDonate,
        writeClaim
    }
}