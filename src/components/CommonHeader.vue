<template>
  <div class="header-container">
    <div class="l-content">
      <el-button
        icon="el-icon-menu"
        size="mini"
        @click="handleMenu"
        style="margin-right: 20px"
      ></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.name"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" src="../assets/images/ct.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie"; //引入Cookie
export default {
  methods: {
    handleMenu() {
      this.$store.commit("CollapseMenu"); //提交一个方法给tab仓库里面的mutations去执行
    },
    //点击退出清除cookie中的token和menu和userInfo
    handleClick(command) {
      if (command === "cancel") {
        Cookie.remove("token"); //清除事先声明的标识
        this.$store.commit("closeAllTag"); //面包屑中首页永远第一,退出后删除出首页外所有面包屑
        Cookie.remove("menu"); //清除该登录用户的菜单数据
        Cookie.remove("userInfo");
        this.$router.push("/login");
        // $message为element内置的弹窗功能
        this.$message({
          message: "退出成功",
          type: "success",
        });
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.header-container {
  background-color: #333;
  height: 62px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .text {
    color: white;
    font-size: 14px;
    margin-left: 10px;
  }
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: white;
        }
      }
    }
  }
}
</style>