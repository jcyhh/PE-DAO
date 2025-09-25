export default [
    {
        path:'/home/sponsor',
        component: () => import('@/views/home/sponsor.vue')
    },
    {
        path:'/home/sponsorLog',
        component: () => import('@/views/home/log.vue')
    },
    {
        path:'/home/award',
        component: () => import('@/views/home/award.vue')
    },
    {
        path:'/create/cast',
        component: () => import('@/views/create/cast.vue')
    },
    {
        path:'/create/castLog',
        component: () => import('@/views/create/log.vue')
    },
    {
        path:'/cure/vote',
        component: () => import('@/views/cure/vote.vue')
    },
    {
        path:'/cure/vote/:id',
        component: () => import('@/views/cure/detail.vue')
    },
    {
        path:'/share/result',
        component: () => import('@/views/share/result.vue')
    },
    {
        path:'/share/record',
        component: () => import('@/views/share/record.vue')
    },
    {
        path:'/share/log',
        component: () => import('@/views/share/log.vue')
    },
    {
        path:'/news/:id',
        component: () => import('@/views/news/detail.vue')
    },
    {
        path:'/notices',
        component: () => import('@/views/notice/index.vue')
    },
    {
        path:'/notices/:id',
        component: () => import('@/views/notice/detail.vue')
    }
]