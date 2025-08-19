import { computed, ref } from 'vue'
import abi from './abi.json'
import { useEthers } from '@/dapp'
import { ethers } from 'ethers'
import BigNumber from "bignumber.js";
import { compareBigNumber, bigToSmall, smallToBig } from '@/config/dapp'
import { closeToast, showFailToast, showSuccessToast, showToast } from 'vant'
import { showLoading } from '@/utils'


export function useErc20 (contractAddress: string = import.meta.env.VITE_USDT) {
    let contract:any = null // 合约
    const bigBalance = ref() // 大数字余额
    const allowanceBalance = ref() // 授权余额

    const balance = computed(()=>bigToSmall(bigBalance.value)) // 可用于展示的小数字余额

    const { address, connectWallet } = useEthers()

    // 初始化合约
    const init = async () => {
        const { provider, signer } = await connectWallet()
        contract = new ethers.Contract(contractAddress, abi, provider).connect(signer)
    }

    // [读]余额
    const readBalance = async () => bigBalance.value = (await contract.balanceOf(address.value)).toString()

    // [读]授权余额
    const readAllowanceBalance = async (spender: string) => allowanceBalance.value = (await contract.allowance(address.value, spender)).toString()

    // [写]转账
    const writeTransfer = async (to:string, amount:string|number) => await contract.transfer(to, amount)

    // [写]授权
    const writeApprove = async (spender:string, amount:string|number) => await contract.approve(spender, amount)

    // 转账
    const transfer = async (to:string, amount:string|number) => {
        // 判断余额
        await readBalance() // 刷新余额
        const compareResult = compareBigNumber(new BigNumber(smallToBig(amount)), new BigNumber(bigBalance.value))
        if(compareResult == 1)return showToast('余额不足')
        try {
            showLoading()
            const result = await writeTransfer(to, amount)
            await result.wait()
            closeToast() // 关闭加载
            showSuccessToast('转账成功')
        } catch (error) {
            closeToast() // 关闭加载
            showFailToast('转账失败')
        }
    }

    // 授权
    const approve = async (spender:string, amount:string|number) => {
        // 判断余额
        await readBalance() // 刷新余额
        const compareResult = compareBigNumber(new BigNumber(smallToBig(amount)), new BigNumber(bigBalance.value))
        if(compareResult == 1)return showToast('余额不足')
        // 判断授权余额
        await readAllowanceBalance(spender) // 刷新授权余额
        const compareAllowanceResult = compareBigNumber(new BigNumber(smallToBig(amount)), new BigNumber(allowanceBalance.value))
        if(compareAllowanceResult == 1){
            // 授权余额不足，去授权
            try {
                showLoading()
                const result = await writeApprove(spender, amount)
                await result.wait()
                closeToast() // 关闭加载
                showSuccessToast('授权成功')
            } catch (error) {
                closeToast() // 关闭加载
                showFailToast('授权失败')
                throw new Error()
            }
        }
    }

    // 测试使用：将授权余额重置为0，方便测试重新授权
    const resetApprove = async (spender:string) => writeApprove(spender, 0)

    init() // 调用初始化

    return {
        balance, // 链上余额
        readBalance, // 刷新链上余额
        transfer, // 转账
        approve, // 授权
        resetApprove // 测试用重置授权金额
    }
}