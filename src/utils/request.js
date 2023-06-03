import axios from "axios";//1.引入axios



//2.创建axios实例并存放于http中,后续对他进行一系列配置
const http =  axios.create({
    baseURL:'/api',//基地址
    timeout:10000,//请求超时时间
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default http//3.暴露http  4.api是一个专门存放接口的文件,他要将http引入并调用接口来获取数据