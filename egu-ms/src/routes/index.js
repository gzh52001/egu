
import {
    Home,
    Member,
    Goods,
    Cart,
    Notfound,
    Login
} from '../pages'

// 以数组的形式管理路由数据，配置路由的时候就可以遍历这个数组
// 一级路由
export const mainRoute = [
    {
        pathname:'/login',
        component: Login
    },
    {
        pathname: '/404', 
        component: Notfound
    }
]

// 二级路由
export const adminRoute = [
    {
        pathname: '/admin/home',
        component: Home,
        title:"首页",
        isNav:true
    },
    {
        pathname: '/admin/member',
        component: Member,
        title:"会员管理",
        isNav:true
    },
    {
        pathname: '/admin/goods',
        component: Goods,
        title:"商品管理",
        isNav:true
    },
    {
        pathname: '/admin/cart',
        component: Cart,
        title:"购物车管理",
        isNav:true
    },
   
   
   
]


