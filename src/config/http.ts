export const langKey: string = 'Lang' // 请求头多语言的key, 配置为空代表不传

export const addressKey: string = 'Address' // 请求头钱包地址的key, 配置为空代表不传

export const uploadApi: string = '/api/uploads' // 上传接口

export const uploadFileName: string = 'upload' // 上传接口文件参数名

export const uploadTimeOut: number = 60000 // 上传请求超时时间，毫秒

export const timeOut: number = 10000 // 请求超时时间，毫秒

export type Api =
| '/api/auth/is_reg'                    // 用户是否已注册
| '/api/users/my'                       // 用户信息
| '/api/users/my/referrals'             // 下级列表
| '/api/auth/login'                     // 登录
| '/api/config/config'                  // 配置
| '/api/withdraw'                       // 提取
| '/api/withdraw/fee'                   // 提取手续费
| '/api/token_price'                    // 币价
| '/api/notices'                        // 公告列表
| `/api/notices/${string}`              // 公告详情
| '/api/notices/pop'                    // 弹窗公告
| `/api/notices/${string}/read`         // 弹窗公告已读
| '/api/banners'                        // 轮播图
| '/api/help_center'                    // 问答列表
| `/api/help_center/${string}`          // 问答详情
| '/api/referral_code'                  // 邀请码列表，生成邀请码
| '/api/nft'                            // NFT列表
| '/api/order'                          // NFT订单
| '/api/order/nft'                      // 下单nft
| '/api/order/gsz'                      // 下单共识者
| '/api/users/my/income'                // 收益统计
| '/api/users/my/balance_type'          // 余额明细类型
| '/api/users/my/balance_logs'          // 余额明细
| '/api/referral_code/is_referral'      // 是否有生成邀请码权限
| '/api/order/upgrade_nft'              // 升级nft
| '/api/sponsor'                        // 赞助信息
| '/api/sponsor/list'                   // 赞助列表
| '/api/coinage'                        // 铸币信息
| '/api/coinage/list'                   // 铸币列表
| '/api/votes'                          // 投票列表
| `/api/votes/${string}`                // 投票详情
| '/api/votes/vote'                     // 投票
| '/api/journalism_notices'             // 新闻公告
| `/api/journalism_notices/${string}`   // 新闻详情