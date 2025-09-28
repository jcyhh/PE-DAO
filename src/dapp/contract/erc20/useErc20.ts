import { computed, ref } from 'vue'
import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import BigNumber from "bignumber.js";
import { compareBigNumber, bigToSmall, smallToBig, approveAmount } from '@/config/dapp'
import { t } from '@/locale';
import { getAddress } from '@/config/storage';
import { message } from '@/utils/message';


export function useErc20(spender: string = import.meta.env.VITE_BIZ, contractAddress: string = import.meta.env.VITE_USDT) {
    let contract: any = null // 合约

    const bigBalance = ref() // 大数字余额
    const allowanceBalance = ref() // 授权余额

    const balance = computed(() => bigToSmall(bigBalance.value)) // 可用于展示的小数字余额

    const { connectWallet, showDappLoading, hideDappLoading } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
        readBalance()
    }

    // [读]余额
    const readBalance = async () => bigBalance.value = (await contract.balanceOf(getAddress())).toString()

    // [读]授权余额
    const readAllowanceBalance = async () => allowanceBalance.value = (await contract.allowance(getAddress(), spender)).toString()

    // [写]转账
    const writeTransfer = async (to: string, amount: string | number) => await contract.transfer(to, amount)

    // [写]授权
    const writeApprove = async (amount: string | number = approveAmount) => await contract.approve(spender, amount)

    // 转账
    const transfer = async (to: string, amount: string | number) => {
        // 判断余额
        await readBalance() // 刷新余额
        const compareResult = compareBigNumber(new BigNumber(smallToBig(amount)), new BigNumber(bigBalance.value))
        if (compareResult == 1) {
            message(t('余额不足'))
            throw new Error('余额不足')
        }
        try {
            showDappLoading()
            const result = await writeTransfer(to, amount)
            await result.wait()
            hideDappLoading() // 关闭加载
            message(t('转账成功'), 'success')
        } catch (error) {
            console.log(error);
            hideDappLoading() // 关闭加载
            message(t('转账失败'), 'fail')
            throw new Error('转账失败')
        }
    }

    // 授权
    const approve = async (smallAmount: string | number) => {
        try {
            // 判断余额
            await readBalance() // 刷新余额
            const bigAmount = smallToBig(smallAmount)
            const compareResult = compareBigNumber(new BigNumber(bigAmount), new BigNumber(bigBalance.value))
            if (compareResult == 1) {
                message(t('余额不足'))
                throw new Error('余额不足')
            }
            // 判断授权余额
            await readAllowanceBalance() // 刷新授权余额
            const compareAllowanceResult = compareBigNumber(new BigNumber(bigAmount), new BigNumber(allowanceBalance.value))
            if (compareAllowanceResult == 1) {
                // 授权余额不足，去授权
                try {
                    showDappLoading()
                    const result = await writeApprove()
                    await result.wait()
                    hideDappLoading() // 关闭加载
                    message(t('授权成功'), 'success')
                } catch (error) {
                    console.log(error);
                    hideDappLoading() // 关闭加载
                    message(t('授权失败'), 'fail')
                    throw new Error('授权失败')
                }
            }
        } catch (error) {
            console.log(error);
            hideDappLoading()
            throw new Error('授权失败')
        }
    }

    // 测试使用：将授权余额重置为0，方便测试重新授权
    const resetApprove = async () => writeApprove(0)

    return {
        balance, // 链上余额
        init,
        readBalance, // 刷新链上余额
        transfer, // 转账
        approve, // 授权
        resetApprove // 测试用重置授权金额
    }
}