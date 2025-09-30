// import { t } from '@/locale'
import { showLoadingToast } from 'vant';

export function showLoading() {
    showLoadingToast({
        overlay: true, // 遮罩
        forbidClick: true, // 禁止点击
        duration: 0, // 无限时长
        zIndex: 10000000000 // 层级
    });
}

/**
 * 普通数字乘法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a * b
 */
export function computedMul(a:number|string, b:number|string) {
    var c = 0,
        d = Number(a).toString(),
        e = Number(b).toString();
    try {
        c += d.split(".")[1].length
    } catch (f) { }
    try {
        c += e.split(".")[1].length
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
}

/**
 * 普通数字除法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a / b 保留两位小数
 */
export function computedDiv(a:number|string, b:number|string) {
    var c, d, e = 0,
        f = 0;
    try {
        e = Number(a).toString().split(".")[1].length
    } catch (g) { }
    try {
        f = Number(b).toString().split(".")[1].length
    } catch (g) { }
    return c = Number(Number(a).toString().replace(".", "")), d = Number(Number(b).toString().replace(".", "")), computedMul(c /
        d, Math.pow(10, f - e))
}


/**
 * 普通数字加法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a + b
 */
export function computedAdd(a:number|string, b:number|string) {
    var c, d, e;
    try {
        c = Number(a).toString().split(".")[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = Number(a).toString().split(".")[1].length
    } catch (f) {
        d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (computedMul(a, e) + computedMul(b, e)) / e
}

/**
 * 普通数字减法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a - b
 */
export function computedSub(a:number|string, b:number|string) {
    var c, d, e;
    try {
        c = Number(a).toString().split(".")[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = Number(a).toString().split(".")[1].length
    } catch (f) {
        d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (computedMul(a, e) - computedMul(b, e)) / e
}

export function isIOS() {
    const ua = navigator.userAgent;
    const isIPhone = /iPhone/i.test(ua);
    const isIPad = /iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    return isIPhone || isIPad || /iPod/i.test(ua);
}

// 格式化数字
export function initNumber(value:number | bigint){
    let text:string = ''
    if(value){
        const num = Number(value)
        // 使用 Intl.NumberFormat 格式化数字，包含千分位分隔符和两位小数
        // 先使用 toFixed(2) 进行裁剪，然后格式化
        const roundedNum = Math.floor(num * 100) / 100; // 裁剪到两位小数
        text = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(roundedNum)
    }else{
        text = '0.00'
    }
    return text
}

// 隐藏手机号中间信息
export function initPhone(value:string){
    if(!value)return '--'
    return value.slice(0, 3) + "****" + value.slice(value.length - 4)
}

// 隐藏钱包地址中间信息
export function initAddress(value:string){
    if(!value)return '--'
    return value.slice(0, 5) + '****' + value.slice(value.length - 4)
}

export function initTime(timestamp:string){
    if(!timestamp)return '--'
    const date = new Date(timestamp); // 将时间戳转换为 Date 对象

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day} ${hours}:${minutes}`
}

export function initDate(timestamp:string){
    if(!timestamp)return '--'
    const date = new Date(timestamp); // 将时间戳转换为 Date 对象

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始
    const day = date.getDate().toString().padStart(2, '0');

    return `${month}/${day}`
}

/**
 * 判断传入的日期是否是当天
 * @param {string} dateString - 日期字符串，格式如 '2025-10-01'
 * @returns {boolean} 是否是当天
 */
export function isToday(dateString: string): boolean {
    if (!dateString) return false;
    
    const inputDate = new Date(dateString);
    const today = new Date();
    
    // 比较年、月、日
    return inputDate.getFullYear() === today.getFullYear() &&
           inputDate.getMonth() === today.getMonth() &&
           inputDate.getDate() === today.getDate();
}