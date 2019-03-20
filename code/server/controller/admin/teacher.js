import teacherModel from '../../models/teacher'
import path from 'path'

module.exports = {
    async list (ctx, next) {
        console.log('----------------获取教师学籍列表 teacher/list-----------------------');
        console.log(ctx.request.query);
        let { keyword, pageindex = 1, pagesize = 10, conditions = {}, fields = {}} = ctx.request.query;
        // let { keyword, conditions = {"classNum": "小学2015级1班"}, pageindex = 1, pagesize = 10, fields = {"grade": "1", "classNum": "1", "teacherName": "1", "sexType": "1"}} = ctx.request.query;
        console.log('pageindex:'+pageindex +','+ 'pagesize:'+pagesize)
        try {
            let data = await ctx.findPage(teacherModel, 
                JSON.parse(conditions), 
                JSON.parse(fields), 
                {limit: pagesize*1, skip: (pageindex-1)*pagesize});
            ctx.send(data)
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
    },
    async findOne (ctx, next) {
        console.log('----------------获取单个教师信息 teacher/findOne-----------------------');
        let paramsData = ctx.request.query;
        // console.log(paramsData)
        try {
            let data = await ctx.findOne(teacherModel, {teacherName: paramsData.teacherName})
            if (data) {
                ctx.send(data)
            }else{
                ctx.sendError('没有这个姓名的教师!')
            }
        }catch (e){
            console.log(e)
            ctx.sendError(e)
        }
    },

    async add (ctx, next) {
        console.log('----------------添加教师学籍 teacher/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(teacherModel, {teacherID: paramsData.teacherID})
            if (data) {
                ctx.sendError('数据已经存在, 请重新添加!' + paramsData.teacherID)
            }else{
                
                
                // paramsData.html = marked(paramsData.html);
                let data = await ctx.add(teacherModel, paramsData);
                ctx.send(paramsData)
            }
        }catch(e) {
            ctx.sendError(e)
        }
    },

    async update (ctx, next) {
        console.log('----------------更新教师学籍 teacher/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            // paramsData.html = marked(paramsData.html);
            let data = await ctx.update(teacherModel, {_id: paramsData._id}, paramsData)
            ctx.send()
        }catch(e) {
            if (e === '暂无数据') {
                ctx.sendError(e)
            }
        }
    },

    async del (ctx, next) {
        console.log('----------------删除教师学籍 teacher/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(teacherModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    }
}