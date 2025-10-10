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
        path:'/cure',
        component: Layout,
        redirect: '/cure/index',
        meta:{
            title:'共治'
        }, 
        children:[{
            path:'index',
            component: () => import('@/views/cure/index.vue')
        }]
    },
    {
        path:'/share',
        component: Layout,
        redirect: '/share/index',
        meta:{
            title:'共享'
        },
        children:[{
            path:'index',
            component: () => import('@/views/share/index.vue')
        }]
    },
    {
        path:'/news',
        component: Layout,
        redirect: '/news/index',
        meta:{
            title:'公告'
        },
        children:[{
            path:'index',
            component: () => import('@/views/news/index.vue')
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