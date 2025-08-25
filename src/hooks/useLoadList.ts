import type { Api } from "@/config/http";
import { t } from "@/locale";
import { apiGet } from "@/utils/request";
import { nextTick, ref, computed, type ComputedRef, type Ref } from "vue";

export function useLoadList(api:Api, listName:string = 'list', params:Ref | ComputedRef, size:number = 10){
    const pageNo = ref(1)
    const pageSize = ref(size)
    const list = ref<any[]>()
    const listData = ref()
    const loading = ref(false)
    const finished = ref(false)

    const loadList = async (isFirst:boolean=false) => {
        await nextTick();
        if(isFirst){
            finished.value = false
            pageNo.value = 1
            list.value = []
        }
        listData.value = true
        let obj = {
            page_no: pageNo.value,
            page_size: pageSize.value
        }
        if(params)obj = { ...obj, ...params.value }
        apiGet(api, obj).then(async (res:any)=>{
            listData.value = res
            const data = listName ? res[listName] : res
            loading.value = false
            finished.value = data.length < pageSize.value
            await nextTick()
        })
    }

    const loadMore = () => {
        if(finished.value)return
        pageNo.value += 1
        loadList()
    }

    const props = computed(() => ({
        'loading-text': t('加载中...'),
        'finished-text': t('没有更多了'),
        'immediate-check': false,
        finished: finished.value,
        loading: loading.value,
        'onUpdate:loading': (value:boolean) => { loading.value = value },
        onLoad: loadMore
    }))

    return {
        list,
        listData,
        props,
        loading,
        finished,
        loadList,
        loadMore
    }
}