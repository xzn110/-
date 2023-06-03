<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- 3.使用非路由组件 -->
        <CommonAside></CommonAside>
      </el-aside>
      <el-container>
        <el-header>
          <CommonHeader></CommonHeader>
        </el-header>
        <CommonTag></CommonTag>
        <el-main>
          <!-- 子路由匹配到的组件将渲染到这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import CommonAside from '../components/CommonAside.vue'//1.引入非路由组件
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
    components:{CommonAside,CommonHeader,CommonTag}//2.注册非路由组件
};
</script>

<style lang="less" scoped>
.el-header{
  padding: 0;
}
</style>