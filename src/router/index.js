import Vue from "vue";// 1.引入Vue实例
import VueRouter from "vue-router";//  2.引入VueRouter
import Home from '../views/Home'//  一.引入所有路由组件
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'
Vue.use(VueRouter)//  3.将VueRouter全局注入

//  4.将组件和路由进行映射并存放于routes中    <=== 二.
const routes = [
    {//主路由
        path: '/',
        name:'Main',
        component: Main,
        redirect: '/home',//当路径为/时重定向到/home
        children: [//子路由
            // { path: 'home', name: 'home', component: Home },//当访问地址为home时,渲染Home这个组件
            // { path: 'user', name: 'user', component: User },//路径变化只改变子路由渲染,而主路由作为公共部分不动
            // { path: 'mall', name: 'mall', component: Mall },
            // { path: 'page1', name: 'page1', component: PageOne },
            // { path: 'page2', name: 'page2', component: PageTwo },
        ]
    },
    {
        path: '/login',
        name:'login',
        component: Login,

    }

]

const router = new VueRouter({//  5.new一个VueRouter对象并存放于router实例中,VueRouter中包含了组件和路由的映射关系routes
    routes
})

export default router//  6.暴露router实例   7.main.js要将router实例引入并挂载到Vue实例上
