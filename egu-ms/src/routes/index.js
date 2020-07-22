
import {
    Home,
    Member,
    Goods,
    Cart,
    Notfound,
    Settings
} from '../page'

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
        pathname: '/admin/article',
        component: Article,
        exact:true,
        title:"文章列表",
        isNav:true
    },
    {
        pathname: '/admin/article/edit/:id',
        component: ArticleEdit,
    },
    {
        pathname: '/admin/dashboard',
        component: Dashboard,
        title:"控制面板",
        isNav:true
    },
    {
        pathname: '/admin/settings',
        component: Settings,
        title:"设置",
        isNav:true
    }
]


