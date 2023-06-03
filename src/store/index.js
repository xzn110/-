import Vue from "vue";// 1.引入Vue
import Vuex from 'vuex'// 2.引入vuex
import tab from './tab'// 3.引入tab仓库

Vue.use(Vuex)// 4.将vuex全局注入

//5. new一个Store实例并暴露,Store实例里面存放着仓库tab  6.main.js要将Store实例引入并挂载到Vue实例上
export default new Vuex.Store({
    modules:{
        tab
    }
})