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
]