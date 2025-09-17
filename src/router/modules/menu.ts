import Layout from '@/layout/index.vue'

export default [
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        meta:{
            title:'共建'
        },
        children:[{
            path:'index',
            component: () => import('@/views/home/index.vue')
        }]
    },
    {
        path:'/create',
        component: Layout,
        redirect: '/create/index',
        meta:{
            title:'共创'
        },
        children:[{
            path:'index',
            component: () => import('@/views/create/index.vue')
        }]
    },
    {
        path:'/team',
        component: Layout,
        redirect: '/team/index',
        meta:{
            title:'团队'
        }, 
        children:[{
            path:'index',
            component: () => import('@/views/team/index.vue')
        }]
    },
    {
        path:'/income',
        component: Layout,
        redirect: '/income/index',
        meta:{
            title:'收益'
        },
        children:[{
            path:'index',
            component: () => import('@/views/income/index.vue')
        }]
    },
    {
        path:'/vip',
        component: Layout,
        redirect: '/vip/index',
        meta:{
            title:'我的身份'
        },
        children:[{
            path:'index',
            component: () => import('@/views/vip/index.vue')
        }]
    },
    {
        path:'/qa',
        component: Layout,
        redirect: '/qa/index',
        meta:{
            title:'常见问题'
        },
        children:[{
            path:'index',
            component: () => import('@/views/qa/index.vue')
        }]
    }
]