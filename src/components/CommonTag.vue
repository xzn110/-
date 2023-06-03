<template>
  <div class="tabs">
    <el-tag
      disable-transitions="true"
      v-for="(item, index) in tags"
      :key="item.path"
      :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'"
      @click="changeMenu(item)"
      @close="handleClose(item, index)"
      size="mini"
    >
      <!-- 当该tag的name值为当前路由的路径名时,则该tag处于激活状态 -->
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    //点击tag跳转
    changeMenu(item) {
      console.log(item);
      //当当前页面的路由与跳转的路由不一致时才跳转,this.$route.path是要跳转到的路由
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/") //解决首页原地跳转问题
      ) {
        this.$router.push(item.path);
      }
    },
    //tag删除功能
    handleClose(item, index) {
      this.$store.commit("closeTag", item); //在仓库里面寻找并调用指定方法
      const length = this.tags.length; //获取删除之后的长度
      if (item.path !== this.$route.path) {
        //说明删除的这一项不是当前页面
        return;
      } else if (index === length) {
        //说明删除的是当前页面并且是最后一项
        this.$router.push(this.tags[index - 1].path);
      } else {
        //说明删除的是当前页面并且不是最后一项
        this.$router.push(this.tags[index].path);
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
.tabs {
  padding: 20px;
  padding-bottom: 0;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>