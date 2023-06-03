import Vue from 'vue'
import App from './App.vue'
import router from './router'//引入router实例
import store from './store';//引入store实例
import './api/mock' //引入Mock
import Element from 'element-ui';//1.引入element框架
import 'element-ui/lib/theme-chalk/index.css';//2.引入element样式

Vue.use(Element);//3.使用element,以后全局都能直接用element


import Cookie from "js-cookie";//引入Cookie
//添加全局前置路由守卫,通过检查路径跳转时是否携带正确的token来判断用户是否通过点击登录按钮实现的路径跳转而不是直接改网页路径
router.beforeEach((to,from,next)=>{
    const token =  Cookie.get('token')//获取事先声明的标识
    if(!token && to.name !== 'login'){//当token不存在说明用户直接改网页,并且要去往的页面不是login页时,此时应该跳回到login页
      next({name:'login'})
    }else if(token && to.name === 'login'){ //token存在并且用户要去往登录页
      next({name:'home'})
    }else{
      next()//其他情况也要写,否则路由将不执行
    }
})

new Vue({
  router,//挂载router实例,以后使用this时可以用$router和$route里面的方法,例如$router.push来改变地址
  store,//挂载store实例,以后使用this时可以用$store里面的方法,例如$store.commit来提交要执行的方法
  render: h => h(App),
  created(){
    store.commit('addMenu',router)//之前添加动态路由由点击登录按钮完成,页面刷新后router下的动态路由将清除,在生命周期挂载添加动态路由的事件可解决
  }
}).$mount('#app')
