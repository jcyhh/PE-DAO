import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import { getGasLimit } from '@/config/dapp'
import { showLoading } from '@/utils'
import { closeToast } from 'vant'
import { message } from '@/utils/message'
import { t } from '@/locale'

export function useBiz (contractAddress: string = import.meta.env.VITE_BIZ) {
    let contract:any = null // 合约

    const { connectWallet } = useEthers()

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

    // [写]提取
    const writeClaim = async (id:any, token:any, amount:any, expiredTime:any, signature:any) => {
        console.log(id, token, amount, expiredTime, signature);
        try {
            showLoading()
            const estimatedGas = await contract.claim.estimateGas(id, token, amount, expiredTime, signature);
            const result = await contract.claim(id, token, amount, expiredTime, signature, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            closeToast()
            message(t('提取成功'),'success')
        } catch (error) {
            onContractFail(error)
            throw new Error('操作失败')
        }
    }

    // [写]铸造“共识者”nft
    const writeDonate = async (id:any, price:any, to:any, expiredTime:any, signature:any) => {
        console.log(id, price, to, expiredTime, signature);
        try {
            showLoading()
            const estimatedGas = await contract.donate.estimateGas(id, price, to, expiredTime, signature);
            const result = await contract.donate(id, price, to, expiredTime, signature, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            closeToast()
            message(t('恭喜，赞助成功，您已成为PE-DAO共识者！'),'success')
        } catch (error) {
            onContractFail(error)
            throw new Error('操作失败')
        }
    }

    // [写]铸造nft
    const writeMint = async (id:any, price:any, deadline:any, signature:any) => {
        console.log(id, price, deadline, signature);
        try {
            showLoading()
            const estimatedGas = await contract.mint.estimateGas(id, price, deadline, signature);
            const result = await contract.mint(id, price, deadline, signature, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            closeToast()
            message(t('恭喜，购买成功，您已成为PE-DAO组织成员！'),'success')
        } catch (error) {
            onContractFail(error)
            throw new Error('操作失败')
        }
    }

    // [写]升级
    const writeUpgrade = async (id:any, price:any, oldTokenId:any, deadline:any, signature:any) => {
        console.log(id, price, oldTokenId, deadline, signature);
        try {
            showLoading()
            const estimatedGas = await contract.upgrade.estimateGas(id, price, oldTokenId, deadline, signature);
            const result = await contract.upgrade(id, price, oldTokenId, deadline, signature, { gasLimit: getGasLimit(estimatedGas)})
            await result.wait();
            closeToast()
            message(t('操作成功'),'success')
        } catch (error) {
            onContractFail(error)
            throw new Error('升级失败')
        }
    }

    init() // 调用化

    return {
        writeClaim,
        writeDonate,
        writeMint,
        writeUpgrade
    }
}