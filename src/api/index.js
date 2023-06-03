import http from '../utils/request' //1.引入http,他是一个axios实例

//2.声明并暴露getData供外界导入   3.外界只需导入并使用getData().then就能发起模拟Ajax请求
export const getData = () => {
    return http.get('/home/getData')
}

export const getUser = (params) => {
    return http.get('/user/getUser',params)
}
export const addUser = (data) => {
    return http.post('/user/add',data)
}
export const editUser = (data) => {
    return http.post('/user/edit',data)
}
export const delUser = (data) => {
    return http.post('/user/del',data)
}

export const getMenu = (data) => {
    return http.post('/permission/getMenu',data)
}
