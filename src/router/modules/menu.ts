import Layout from '@/layout/index.vue'

export default [
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        meta:{
            title:'PE-DAO'
        },
        children:[{
            path:'index',
            component: () => import('@/views/menu/home/index.vue')
        }]
    },
    {
        path:'/invite',
        component: Layout,
        redirect: '/invite/index',
        meta:{
            title:'邀请码'
        },
        children:[{
            path:'index',
            component: () => import('@/views/menu/invite/index.vue')
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
            component: () => import('@/views/menu/team/index.vue')
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
            component: () => import('@/views/menu/income/index.vue')
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
            component: () => import('@/views/menu/vip/index.vue')
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
            component: () => import('@/views/menu/qa/index.vue')
        }]
    }
]