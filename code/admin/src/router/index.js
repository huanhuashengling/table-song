import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import_ = file => () => import('views/' + file + '.vue')

export const constantRouterMap = [
    { path: '/login', name: '登录', component: _import_('Login/index'), hidden: true },
    { 
        path: '/', 
        name: '首页', 
        component: _import_('Layout/index'),
        redirect: '/home',
        icon: 'homel',
        children: [
            { path: 'home', component: _import_('Home/index'), name: '首页' }
        ]
    }
]
export const asyncRouterMap = [
    {
        path: '/permission',
        name: '权限管理',
        meta: { role: ['admin'] },
        component: _import_('Layout/index'),
        redirect: '/permission/list',
        requireAuth: true, // 是否需要登录
        dropdown: true,
        icon: 'authority',
        children: [
            { path: 'list', component: _import_('Permission/list/index'), name: '管理员列表' },
            { path: 'add', component: _import_('Permission/add/index'), name: '添加管理员' }
        ]
    },
    {
        path: '/student',
        name: '新生学籍注册',
        component: _import_('Layout/index'),
        redirect: '/student/list',
        dropdown: true,
        icon: 'zuowen',
        children: [
            { path: 'list', component: _import_('Student/list/index'), name: '新生学籍列表' },
            { path: 'add', component: _import_('Student/add/index'), name: '添加学生学籍' }
        ]
    },
    {
        path: '/student',
        name: '在校学籍管理',
        component: _import_('Layout/index'),
        redirect: '/student/list',
        dropdown: true,
        icon: 'zuowen',
        children: [
            { path: 'list', component: _import_('Student/list/index'), name: '在校学籍列表' },
            { path: 'add', component: _import_('Student/add/index'), name: '在校学籍导入' },
            { path: 'add', component: _import_('Student/add/index'), name: '在校学籍导出' },
        ]
    }
]

export const router = new Router({
    // mode: 'history',
    routes: constantRouterMap
})

