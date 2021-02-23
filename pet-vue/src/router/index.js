import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Layout from 'layout'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const routes = [{
        path: '/login',
        component: () => import('views/login'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/customManage',
        children: [{
            path: 'customManage',
            name: '会员管理',
            component: () => import('@/views/customManage'),
            meta: {
                title: '会员管理',
                icon: 'icon-huiyuanguanli'
            }
        }]
    },
    // 商品管理
    {
        path: '/goodsManage',
        component: Layout,
        name: '商品管理',
        redirect: '/goodsManage/index',
        meta: {
            title: '商品管理',
            icon: 'icon-shangpinguanli'
        },
        children: [{
            path: '/goodsManage/index',
            name: '商品出入库',
            component: () => import('@/views/goodsManage/goods'),
            meta: {
                title: '商品出入库',
                icon: "icon-icon_function_ruku"
            }
        }, {
            path: '/goodsManage/add',
            name: 'goodsAdd',
            hidden: true,
            component: () => import('@/views/goodsManage/goods/add'),
            meta: {
                title: '商品添加',
                icon: "icon-icon_function_ruku"
            }
        }, {
            path: '/goodsManage/edit',
            name: 'goodsEdit',
            hidden: true,
            component: () => import('@/views/goodsManage/goods/edit'),
            meta: {
                title: '商品编辑',
                icon: "icon-icon_function_ruku"
            }
        }, {
            path: '/goodsManage/category',
            name: '商品分类',
            component: () => import('@/views/goodsManage/category'),
            meta: {
                title: '商品分类',
                icon: "icon-01_shangpinfenlei"
            }
        }, {
            path: '/goodsManage/categoryItem',
            name: '二级商品分类',
            component: () => import('@/views/goodsManage/categoryItem'),
            meta: {
                title: '二级商品分类',
                icon: "icon-01_shangpinfenlei"
            }
        }]
    },
    // 预约管理
    {
        path: '/appointment',
        component: Layout,
        name: '服务预约管理',
        redirect: '/appointment/index',
        meta: {
            title: '服务预约管理',
            icon: 'icon-yuyueguanli'
        },
        children: [{
            path: '/appointment/index',
            name: '预约管理',
            component: () => import('@/views/appointment'),
            meta: {
                title: '预约管理',
                icon: "icon-ico_yuyueguanli_jiedaiyuyue"
            }
        }, {
            path: '/appointment/category',
            name: '服务种类管理',
            component: () => import('@/views/appointment/server'),
            meta: {
                title: '服务种类管理',
                icon: "icon-leibieguanli_icox"
            }
        }, {
            path: '/appointment/petVariety',
            name: '',
            component: () => import('@/views/appointment/petVariety'),
            meta: {
                title: '宠物类别管理',
                icon: "icon-leibieguanli_icox"
            }
        }]
    },
    // 订单模块
    {
        path: '/order',
        component: Layout,
        name: '商品订单管理',
        redirect: '/order/index',
        meta: {
            title: '商品订单管理',
            icon: 'icon-dingdanguanli'
        },
        children: [{
            path: '/order/index',
            name: '商品订单',
            component: () => import('@/views/orderManage/goodOrder'),
            meta: {
                title: '商品订单',
                icon: "icon-dingdanguanli"
            }
        }, {
            path: '/order/category',
            name: '预约订单',
            component: () => import('@/views/orderManage/appointOrder'),
            meta: {
                title: '预约订单',
                icon: "icon-yuyueguanli"
            }
        }]
    },
    // 售后模块
    {
        path: '/aftersales',
        component: Layout,
        name: '售后管理',
        redirect: '/aftersales/index',
        meta: {
            title: '售后管理',
            icon: 'icon-shouhouguanli'
        },
        children: [{
            path: '/aftersales/index',
            name: '商品售后管理',
            component: () => import('views/afterSales/goodSales'),
            meta: {
                title: '商品售后',
                icon: "icon-shouhouguanli"
            }
        }, {
            path: '/aftersales/category',
            name: '预约售后管理',
            component: () => import('views/afterSales/appointSales'),
            meta: {
                title: '服务售后',
                icon: "icon-shouhouguanli"
            }
        }]
    },
    // 用户反馈管理
    {
        path: '/feedback',
        component: Layout,
        name: "用户反馈管理",
        redirect: '/feedback/index',
        meta: {
            title: '用户反馈管理',
            icon: "icon-tubiaolunkuo-"
        },
        children: [{
            path: '/feedback/index',
            name: '商品反馈',
            component: () => import('@/views/feedback/goods'),
            meta: {
                title: '商品反馈',
                icon: "icon-tubiaolunkuo-"
            }
        }, {
            path: '/feedback/category',
            name: '预约反馈',
            component: () => import('@/views/feedback/appoint'),
            meta: {
                title: '预约反馈',
                icon: "icon-tubiaolunkuo-"
            }
        }]
    },
    // 店铺模块
    {
        path: '/shop',
        component: Layout,
        hidden: true,
        name: "店铺管理",
        redirect: '/shop/index',
        meta: {
            title: '用户反馈管理',
            icon: "icon-tubiaolunkuo-"
        },
        children: [{
            path: 'index',
            meta: {
                title: '店铺管理',
                icon: "icon-tubiaolunkuo-"
            },
            component: () => import('views/shop/index'),
        }, {
            path: 'add',
            meta: {
                title: '新增店铺',
                icon: "icon-tubiaolunkuo-"
            },
            component: () => import('views/shop/addShop'),
        }]
    },
    // 404报错模块
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    // 用户报表模块
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');
    if (token) {
        const id = store.getters.id
        if (!id) {
            store.dispatch('user/getUserInfo').then(() => {
                return next()
            })
        } else {
            return next()
        }
        // next()
    } else {
        if (to.path != '/login') {
            return next('/login')
        } else {
            return next()
        }
    }
})

export default router