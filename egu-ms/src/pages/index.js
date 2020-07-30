
import Loadable from 'react-loadable' // 路由懒加载
import Loading from '../components/loading'

const Home = Loadable({ 
    loader: () => import('./Home'),
    loading: Loading
})
const Member = Loadable({
    loader: () => import('./Member'),
    loading: Loading
})
const Goods = Loadable({
    loader: () => import('./Goods'),
    loading: Loading
})
const Order = Loadable({
    loader: () => import('./Order'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const Notfound = Loadable({
    loader: () => import('./Notfound'),
    loading: Loading
})



export {
    Home,
    Member,
    Goods,
    Order,
    Login,
    Notfound
}
