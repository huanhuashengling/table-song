import studentModel from '../../models/student'
import path from 'path'

module.exports = {
    async list(ctx, next) {
        console.log('----------------获新生列表 client_demo_api/student/list-----------------------');
        let { type = null, pageindex = 1, pagesize = 5} = ctx.request.query;
        console.log('type:'+type+','+'pageindex:'+pageindex +','+ 'pagesize:'+pagesize)
        try {
            
            let data = await ctx.find(studentModel, {type, isVisible: true, source: 1}, null, {limit: pagesize*1, skip: (pageindex-1)*pagesize, sort: {level: -1, createTime: -1}});
            return ctx.send(data)
        }catch (e){
            console.log(e)
            return ctx.sendError(e)
        }

    },
    async info(ctx, next) {
        console.log('----------------获取新生信息 client_demo_api/student/info-----------------------');
        let {studentName, studentID} = ctx.request.query;
        try {
            let data = await ctx.findOne(studentModel, { studentName: studentName, studentID: studentID, isPre: "01"});
            return ctx.send(data);
        } catch (e) {
            return ctx.sendError(e)
        }
    },
    async update (ctx, next) {
        console.log('----------------更新学生学籍 student/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            // paramsData.html = marked(paramsData.html);
            let data = await ctx.update(studentModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },
    async add (ctx, next) {
        console.log('----------------添加学生学籍 student/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(studentModel, {studentID: paramsData.studentID})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!')
            }else{
                
                
                // paramsData.html = marked(paramsData.html);
                let data = await ctx.add(studentModel, paramsData);
                ctx.send(paramsData)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },
}