export const langKey: string = 'Lang' // 请求头多语言的key, 配置为空代表不传

export const addressKey: string = 'Address' // 请求头钱包地址的key, 配置为空代表不传

export const uploadApi: string = '/api/uploads' // 上传接口

export const uploadFileName: string = 'upload' // 上传接口文件参数名

export const uploadTimeOut: number = 60000 // 上传请求超时时间，毫秒

export const timeOut: number = 10000 // 请求超时时间，毫秒

export type Api =
|'/api/auth/login'       // 登录
|'/api/config/config'   // 配置
|'/api/notices'         // 公告列表
|`/api/notices/${number}`        // 公告详情
|'/api/banners'         // 轮播图