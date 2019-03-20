import fs from 'fs'
import path from 'path'
import koaRouter from 'koa-router'
const router = koaRouter()

export default app => {

/*----------------------admin-------------------------------*/
    // 用户请求
    router.post('/admin_demo_api/user/login', app.admin.user.login)
    router.get('/admin_demo_api/user/info', app.admin.user.info)
    router.get('/admin_demo_api/user/list', app.admin.user.list)
    router.post('/admin_demo_api/user/add', app.admin.user.add)
    router.post('/admin_demo_api/user/update', app.admin.user.update)
    router.get('/admin_demo_api/user/del', app.admin.user.del)


    // 学生信息请求
    router.get('/admin_demo_api/student/list', app.admin.student.list)
    router.get('/admin_demo_api/student/findOne', app.admin.student.findOne)
    router.post('/admin_demo_api/student/add', app.admin.student.add)
    router.post('/admin_demo_api/student/update', app.admin.student.update)
    router.get('/admin_demo_api/student/del', app.admin.student.del)


    // 教师信息请求
    router.get('/admin_demo_api/teacher/list', app.admin.teacher.list)
    router.get('/admin_demo_api/teacher/findOne', app.admin.teacher.findOne)
    router.post('/admin_demo_api/teacher/add', app.admin.teacher.add)
    router.post('/admin_demo_api/teacher/update', app.admin.teacher.update)
    router.get('/admin_demo_api/teacher/del', app.admin.teacher.del)

    // 其他请求
    router.post('/admin_demo_api/markdown_upload_img', app.admin.other.markdown_upload_img)


/*----------------------client-------------------------------*/
    // client 新生学籍请求
    router.get('/client_demo_api/student/list', app.client.student.list)
    router.get('/client_demo_api/student/info', app.client.student.info)
    router.post('/client_demo_api/student/update', app.client.student.update)
    router.post('/client_demo_api/student/add', app.client.student.add)


    app.use(router.routes()).use(router.allowedMethods());
}