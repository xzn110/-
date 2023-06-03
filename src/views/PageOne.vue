<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <img v-if="!avatar" src="../assets/images/ct.jpg" alt="" style="height: 300px" />
      <img v-else :src="avatar" alt="" style="height: 300px" />
      <div>
        <!-- type="file"为问价表单,accept限制文件类型,原生文件表单样式不统一所以隐藏,用element按钮来完成选择和上传 -->
        <input
          type="file"
          accept="image/*"
          style="display: none"
          ref="fileRef"
          @change="changeFile"
        />
        <el-button type="primary" icon="el-icon-plus" @click="chooseImg"
          >选择图片</el-button
        >
        <el-button type="danger" icon="el-icon-upload" @click="a"
          >确定上传</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      avatar: "", //链接地址
    };
  },
  methods: {
    chooseImg() {
      //相当于执行了文件表单的点击事件
      this.$refs.fileRef.click();
    },
    changeFile(e) {
      const files = e.target.files; //files属性代表选择的包含了所有的文件的数组
      if (files.length === 0) {
        //用户没选文件
        this.$message({
          message: "未选择文件",
          type: "warning",
        });
      } else {
        //默认只能选一个文件
        console.log(files[0]);
        this.avatar = URL.createObjectURL(files[0]); //URL.createObjectURL方法用于文件转链接地址
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-button {
  margin-top: 20px;
}
</style>