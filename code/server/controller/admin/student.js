import studentModel from '../../models/student'
import path from 'path'
// import marked from 'marked'

// marked.setOptions({
//     renderer: new marked.Renderer(),
//     renderer: new marked.Renderer(),
//     gfm: true, //允许 Git Hub标准的markdown.
//     tables: true, //允许支持表格语法。该选项要求 gfm 为true。
//     breaks: true, //允许回车换行。该选项要求 gfm 为true。
//     pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
//     sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
//     smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
//     smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
//     highlight: function (code) {
//         return require('highlight.js').highlightAuto(code).value;
//     }
// })

module.exports = {
    async list (ctx, next) {
        console.log('----------------获取学生学籍列表 student/list-----------------------');
        let { keyword, pageindex = 1, pagesize = 10, conditions, fields} = ctx.request.query;
        // let { keyword, conditions = {"classNum": "小学2015级1班"}, pageindex = 1, pagesize = 10, fields = {"grade": "1", "classNum": "1", "studentName": "1", "sexType": "1"}} = ctx.request.query;
        console.log('pageindex:'+pageindex +','+ 'pagesize:'+pagesize)
        // console.log(JSON.parse(fields))
        console.log(JSON.parse(conditions))
        try {
            let data = await ctx.findPage(studentModel, 
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
        console.log('----------------获取单个学生信息 student/findOne-----------------------');
        let paramsData = ctx.request.query;
        // console.log(paramsData)
        try {
            let data = await ctx.findOne(studentModel, {studentName: paramsData.studentName})
            if (data) {
                ctx.send(data)
            }else{
                ctx.sendError('没有这个姓名的学生!')
            }
        }catch (e){
            console.log(e)
            ctx.sendError(e)
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

    async del (ctx, next) {
        console.log('----------------删除学生学籍 student/del-----------------------');
        let id = ctx.request.query.id
        try {
            ctx.remove(studentModel, {_id: id})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    },

    async delAll (ctx, next) {
        console.log('----------------删除学生学籍 student/delAll-----------------------');
        let schoolCode = ctx.request.query.schoolCode
        try {
            ctx.remove(studentModel, {schoolCode: schoolCode})
            ctx.send()
        }catch(e){
            ctx.sendError(e)
        }
    },

    async aggregate (ctx, next) {
        console.log('----------------筛选聚合数据 student/aggregate-----------------------');
        let schoolCode = ctx.request.query.schoolCode
        let field = ctx.request.query.field
        try {
            let data = await ctx.aggregate(studentModel, {schoolCode: schoolCode}, field )
            ctx.send(data)
        }catch(e){
            ctx.sendError(e)
        }
    }
}