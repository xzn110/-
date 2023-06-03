<template>
  <div class="manage">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 右上角关闭按钮将触发:before-close -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
        :rules="rules"
      >
        <!-- rules 属性传入约定的验证规则, Form-Item 的 prop 属性设置为需校验的字段名 -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="birth" label="出生日期">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <!-- 新增区域 -->
      <el-button type="primary" @click="handleAdd">+ 新增</el-button>
      <!-- 搜索区域 -->
      <el-form :model="userForm" :inline="true">
        <el-form-item>
          <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="common-table">
      <el-table :data="tableData" style="width: 100%" height="90%" stripe>
        <!-- label表示一列中最上面的标题,prop表示一列中的每一项数据 -->
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <!-- 自定义插槽可让父组件获得子组件的数据并修改 -->
            <span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column
          prop="birth"
          label="出生日期"
          value-format="yyyy-MM-DD"
        ></el-table-column>
        <!-- value-format="yyyy-MM-DD"为固定写法,用于改变默认的时间格式 -->
        <el-table-column prop="addr" label="地址"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <!-- 自定义插槽可让父组件获得子组件的数据并修改 -->
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        //required是否必填,message为提示信息
        name: [{ required: true, message: "请输入姓名" }],
        age: [{ required: true, message: "请输入年龄" }],
        sex: [{ required: true, message: "请选择性别" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        addr: [{ required: true, message: "请输入地址" }],
      },
      tableData: [],
      modalType: 0, //0表示新增弹窗,1表示编辑弹窗
      total: 0, //数据总数
      pageData: {
        page: 1,
        limit: 6,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    //提交按钮被点击
    submit() {
      //validate是element里的form表单的方法,对表单进行校验,全部通过才返回true
      this.$refs.form.validate((valid) => {
        if (valid) {
          //判断该按钮将触发哪个弹窗
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              this.getList(); //重新渲染列表
            });
          } else {
            editUser(this.form).then(() => {
              this.getList(); //重新渲染列表
            });
          }

          this.handleClose();
        }
      });
    },
    //右上角关闭按钮或取消按钮被点击
    handleClose() {
      this.$refs.form.resetFields(); //resetFields是element里的form表单的方法,用于清空表单数据,防止残留
      this.dialogVisible = false; //关闭表单
    },

    //点击编辑
    handleEdit(row) {
      this.dialogVisible = true; //一旦为true那么将触发一个弹窗
      this.modalType = 1;
      //对这一整行数据进行深拷贝,让行数据显示到编辑弹窗中
      this.form = JSON.parse(JSON.stringify(row));
    },
    //点击删除
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList(); //重新渲染列表
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //
    getList() {
      //获取用户列表
      getUser({ params: { ...this.userForm, ...this.pageData } }).then(
        ({ data }) => {
          console.log(data);
          this.tableData = data.list;
          this.total = data.count || 0;
        }
      );
    },

    //点击+新增按钮
    handleAdd() {
      this.dialogVisible = true; //一旦为true那么将触发一个弹窗
      this.modalType = 0;
    },
    //选择页码时
    handlePage(val) {
      console.log(val, "val");
      this.pageData.page = val;
      this.getList();
    },
    //点击查询
    onSearch() {
      this.getList();
    },
  },

  //页面一加载就把页面渲染上去
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    height: 100%;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>