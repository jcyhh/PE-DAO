import { initNumber, initAddress, initPhone, initTime, initDate, initNum } from '@/utils'

enum FilterType {
    Address = 'address',
    Phone = 'phone',
    Number = 'number',
    Num = 'num',
    Time = 'time',
    Date = 'date'
}

function format(type: FilterType, data: any) {
    if (type == FilterType.Number) return initNumber(data)
    else if (type == FilterType.Num) return initNum(data)
    else if (type == FilterType.Address) return initAddress(data)
    else if (type == FilterType.Phone) return initPhone(data)
    else if (type == FilterType.Time) return initTime(data)
    else if (type == FilterType.Date) return initDate(data)
}

export default {
    mounted(el: HTMLElement, binding: any) {
        const arg = binding.arg || FilterType.Number
        el.textContent = `${format(arg, binding.value)}`
    },
    updated(el: HTMLElement, binding: any) {
        const arg = binding.arg || FilterType.Number
        el.textContent = `${format(arg, binding.value)}`
    }
};