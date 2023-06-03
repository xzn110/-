<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.name"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :key="item.label"
      :index="item.label"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie"; //页面刷新会清除vuex的数据,cookie的数据缓存可解决该问题

export default {
  data() {
    return {
      
    };
  },
  methods: {
    
    //点击菜单
    clickMenu(item) {
      console.log(item);
      //当当前页面的路由与跳转的路由不一致时才跳转,this.$route.path是要跳转到的路由
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/") //解决首页原地跳转问题
      ) {
        this.$router.push(item.path);
      }

      //改变面包屑
      this.$store.commit('selectMenu',item)//在仓库里面寻找并调用指定方法
    },
  },
  computed: {
    //没有子菜单
    noChildren() {
      return this.menuData.filter((item) => {
        return !item.children;
      });
    },
    //有子菜单
    hasChildren() {
      return this.menuData.filter((item) => {
        return item.children;
      });
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    //菜单数据
    menuData(){
      return JSON.parse(Cookie.get('menu'))//JSON.parse用于将json对象转换为js对象
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: 0;
  h3 {
    color: white;
    text-align: center;
    line-height: 48px;
  }
}
</style>