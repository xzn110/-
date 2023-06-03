//该文件用于模拟后端对Ajax进行的处理
//该文件用于模拟后端对Ajax进行的处理
//该文件用于模拟后端对Ajax进行的处理
//该文件用于模拟后端对Ajax进行的处理
//该文件用于模拟后端对Ajax进行的处理
//该文件用于模拟后端对Ajax进行的处理

import Mock from "mockjs";//1.引入mockjs
import homeApi from './mockServeData/home'//获取用来存放主页数据的模拟接口
import userApi from './mockServeData/user'//获取用来存放用户列表数据的模拟接口
import permissionApi from './mockServeData/permission'//获取对登录用户判断的模拟接口

//2.定义mock请求拦截
// Mock.mock('/api/home/getData','get',function(){
//     //拦截到请求后的处理逻辑
//     console.log('拦截到了')
//     return [1,2,3] //return的内容可以模拟接口返回的内容,在没有接口的情况下可以测试Ajax请求
// })
//从模拟接口中获取折线图等数据
Mock.mock('/api/home/getData','get',homeApi.getStatisticalData) 

//获取操作用户列表数据的模拟接口
Mock.mock('/api/user/add','post',userApi.createUser)
Mock.mock('/api/user/edit','post',userApi.updateUser)
Mock.mock('/api/user/del','post',userApi.deleteUser)
Mock.mock(/api\/user\/getUser/,'get',userApi.getUserList)

//获取对登录用户判断的模拟接口
Mock.mock(/api\/permission\/getMenu/,'post',permissionApi.getMenu)

//3.main.js要引入Mock

