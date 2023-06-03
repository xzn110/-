<template>
  <div class="bg">
    <el-card class="box-card">
      <el-form :model="form" :rules="rules" :inline="true" ref="form">
        <h3 class="login_title">系统登录</h3>
        <el-form-item prop="username" label="账号">
          <el-input
            v-model="form.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import Mock from "mockjs"; //引入mockjs
import Cookie from "js-cookie"; //引入Cookie
import { getMenu } from "../api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        //校验规则
        username: [{ required: true, message: "请输入账号" }],
        password: [{ required: true, message: "请输入密码" }],
      },
    };
  },
  methods: {
    //点击登录
    submit() {
      //validate是element里的form表单的方法,对表单进行校验,全部通过才返回true
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({ data }) => {
            console.log(data); //该接口通过分析form里填入的数据来决定返回的是admin还是xiaoxiao的数据
            if (data.code === 20000) {
              //说明请求成功
              Cookie.set("token", data.data.token); //给cookie封装一个标识,该标识代表登录用户信息的标识
              console.log(data.data.userInfo);
              Cookie.set("userInfo", JSON.stringify(data.data.userInfo)); //用户名字的标识
              this.$store.commit("setMenu", data.data.menu); //获取菜单数据
              this.$store.commit("addMenu", this.$router);
              this.$router.push("/home");
              // $message为element内置的Alert 警告
              this.$message({
                message: data.data.message,
                type: "success",
              });
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.bg{
  position: relative;
  height: 100vh;
  width: 100vw;
  background-image: url(../assets/images/bg.jpg);
}
.box-card {
  width: 350px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  text-align: center;
  .el-form {
    h3 {
      margin-bottom: 20px;
    }
    .el-button {
      margin-top: 10px;
    }
  }
}
</style>