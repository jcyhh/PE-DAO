import BigNumber from "bignumber.js";

export const startPath: string = '/' // 钱包登录页面路由

export const homePath: string = '/home' // 登录成功后跳转的首页路由

export const approveAmount: string = '115792089237316195423570985008687907853269984665640564039457584007913129639935' // 授权额度

export const numRule: number = 1e18 // 普通数字转大数字规则

export const minGas: number = 0.0004 // 最低eth余额

export const gasMul: number = 1.5 // Gas费倍率

// 签名前缀
export type SignMessage = 
| 'Login' 
| 'Transfer' 
| 'Withdraw' 
| 'Order' 
| 'Node' 
| 'Pledge' 
| 'Claim' 
| 'Saving' 
| 'TokenOrder' 
| 'Upgrade'
| 'SponsorOrder' // 赞助
| 'Coinage' // 铸币

// BSC主网信息
export const bscMainnet = {
    chainId: '0x38', // 56
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com']
}

// 测试网络信息
export const testNet = {
    chainId: '0x539', // 1337
    chainName: 'Local Test Chain',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    },
    rpcUrls: ['http://192.168.31.238:7545'],
    blockExplorerUrls: []
}

// 估算Gas
export const getGasLimit = (estimatedGas:any) => new BigNumber(estimatedGas.toString()).times(gasMul).toFixed(0)

// 大数字转小数字
export const bigToSmall = (bigNum:number|string):number => bigNum ? new BigNumber(bigNum).div(numRule).dp(4).toNumber() : 0

// 小数字转大数字
export const smallToBig = (smallNum:number|string):string => smallNum ? new BigNumber(smallNum).times(numRule).toFixed(0) : '0'

// 大数字之间比较大小
export const compareBigNumber = (a:BigNumber, b:BigNumber):number|null => a&&b ? a.comparedTo(b) : -1