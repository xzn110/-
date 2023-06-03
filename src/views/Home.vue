<template>
  <el-row>
    <el-col :span="8" style="padding-right: 20px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/ct.jpg" alt="" />
          <div class="userInfo">
            <p class="name">{{ userInfo.name }}</p>
            <p class="access">{{ userInfo.access }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>1970-1-1</span></p>
          <p>上次登录地点: <span>长沙</span></p>
        </div>
      </el-card>
      <el-card class="table">
        <el-table :data="tableData" style="width: 100%">
          <!-- 遍历的是对象,则第一个参数为属性值,第二个参数为属性名 -->
          <el-table-column
            :prop="key"
            :label="val"
            v-for="(val, key) in tableLabel"
            :key="key"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <el-card style="height: 260px">
          <!-- 柱状图 -->
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px">
          <!-- 饼状图 -->
          <div ref="echarts3" style="height: 220px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../api";
import * as echarts from "echarts";
import Cookie from "js-cookie";
export default {
  data() {
    return {
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      tableData: [],
    };
  },
  computed: {
    userInfo() {
      return JSON.parse(Cookie.get("userInfo"));
    },
  },
  mounted() {
    getData().then((val) => {
      console.log(val);
      this.tableData = val.data.data.tableData;

      //折线图
      // 1.基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 2.指定图表的配置项和数据
      const orderData = val.data.data.orderData.data;
      console.log(orderData);
      let echarts1Option = {};
      // 配置x轴数据

      const xAxis = Object.keys(orderData[0]);
      console.log(xAxis);

      //将计算好的结果赋值给指定图表的配置项echarts1Option
      echarts1Option.xAxis = {
        data: xAxis,
      };
      echarts1Option.yAxis = {}; //y轴数据
      echarts1Option.legend = {
        data: xAxis,
      };
      echarts1Option.series = [];
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          type: "line", //line为折线图
          data: orderData.map((item) => item[key]), //map方法返回的是含有该属性名的属性值组成的新数组
        });
      });
      console.log(echarts1Option);
      // 3.使用刚指定的配置项和数据显示图表。
      echarts1.setOption(echarts1Option);

      //柱状图
      //  1.基于准备好的dom，初始化echarts实例
      const echarts2 = echarts.init(this.$refs.echarts2);
      // 2.指定图表的配置项和数据
      const userData = val.data.data.userData;
      console.log(userData);
      const echarts2Option = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: userData.map((item) => item.date),
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [
          {
            name: "新增用户",
            data: userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: userData.map((item) => item.active),
            type: "bar",
          },
        ],
      };
      // 3.使用刚指定的配置项和数据显示图表。
      echarts2.setOption(echarts2Option);

      //饼状图
      //  1.基于准备好的dom，初始化echarts实例
      const echarts3 = echarts.init(this.$refs.echarts3);
      // 2.指定图表的配置项和数据
      const videoData = val.data.data.videoData;
      console.log(videoData);
      const echarts3Option = {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [
          {
            type: "pie",
            data: videoData,
          },
        ],
      };
      // 3.使用刚指定的配置项和数据显示图表。
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 13px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userInfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: grey;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}
.table {
  margin-top: 20px;
  .el-table {
    /deep/ .el-table__cell {
      padding: 4px 0;
    }
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>