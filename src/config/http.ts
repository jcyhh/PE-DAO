export const langKey: string = 'Lang' // 请求头多语言的key, 配置为空代表不传

export const addressKey: string = 'Address' // 请求头钱包地址的key, 配置为空代表不传

export const uploadApi: string = '/api/uploads' // 上传接口

export const uploadFileName: string = 'upload' // 上传接口文件参数名

export const uploadTimeOut: number = 60000 // 上传请求超时时间，毫秒

export const timeOut: number = 10000 // 请求超时时间，毫秒

export type Api =
| '/api/auth/is_reg'            // 用户是否已注册
| '/api/users/my'               // 用户信息
| '/api/users/my/referrals'     // 下级列表
| '/api/auth/login'             // 登录
| '/api/config/config'          // 配置
| '/api/withdraw'              // 提取
| '/api/notices'                // 公告列表
| `/api/notices/${number}`      // 公告详情
| '/api/banners'                // 轮播图
| '/api/help_center'            // 问答列表
| `/api/help_center/${number}`  // 问答详情
| '/api/referral_code'          // 邀请码列表，生成邀请码
| '/api/nft'                    // NFT列表
| '/api/order'                  // 下单
| '/api/users/my/income'        // 收益统计
| '/api/users/my/balance_type'  // 余额明细类型
| '/api/users/my/balance_logs'  // 余额明细