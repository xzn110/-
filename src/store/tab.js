import Cookie from "js-cookie"; //页面刷新会清除vuex的数据,cookie的数据缓存可解决该问题

export default {
    state: {//存放简单数据
        isCollapse: false, //控制菜单的展开或收起
        tabsList: [//存放面包屑相关数据
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home",
            }
        ],
    },
    mutations: {//存放方法,并且只有mutations能修改state里面的数据
        CollapseMenu(state) {//state参数表示当前对象,是固定必须要写的
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {//改变面包屑数据
            console.log(val)
            if (val !== 'home') {//当不是首页时
                const index = state.tabsList.findIndex(item => item.name === val.name)//findIndex方法用于寻找数据,若存在返回该数据的索引,否则返回-1
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        //删除指定的tag
        closeTag(state, item) {
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)//splice方法用于删除数组元素,index表示删除位置,1表示删除个数
        },
        //设置menu菜单的数据,用于每次登录进首页时渲染页面
        setMenu(state, val) {
            //在仓库里的方法用cookie都需要JSON.stringify来将js对象转换为json对象
            Cookie.set('menu', JSON.stringify(val))
        },
        //退出时删除面包屑
        closeAllTag(state) {
            const num = state.tabsList.length - 1
            state.tabsList.splice(1, num)
        },
        //动态注册路由,用户登录后根据不同类型用户的菜单数据来提供对应路由,防止xiaoxiao登录进来之后通过改变路径来访问权限之外的菜单
        addMenu(state, router) {
            const menu = JSON.parse(Cookie.get('menu'))
            //组装动态路由的数据,格式与之前定义的静态路由一致
            const menuArr = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        //import导入文件
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArr.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArr.push(item)
                }
            })
            console.log(menuArr, 'menuArr')
            //动态添加路由
            menuArr.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}