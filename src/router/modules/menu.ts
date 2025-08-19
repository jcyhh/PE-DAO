import Layout from '@/layout/index.vue'

export default [
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/home/index.vue')
        }]
    },
    {
        path:'/invite',
        component: Layout,
        redirect: '/invite/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/invite/index.vue')
        }]
    },
    {
        path:'/team',
        component: Layout,
        redirect: '/team/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/team/index.vue')
        }]
    },
    {
        path:'/income',
        component: Layout,
        redirect: '/income/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/income/index.vue')
        }]
    },
    {
        path:'/vip',
        component: Layout,
        redirect: '/vip/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/vip/index.vue')
        }]
    },
    {
        path:'/qa',
        component: Layout,
        redirect: '/qa/index',
        children:[{
            path:'index',
            component: () => import('@/views/menu/qa/index.vue')
        }]
    }
]