<template>
<article>
    <el-form :model="info" :rules="rules" ref="form" label-width="110px" class="form">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="导出列集合" prop="exportField">
                    <template v-for="item in exportTeacherListFields">
                        <el-button :label="item.id" @click="exportTeachers(item)">{{item.name}}</el-button>
                    </template>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="操作" prop="exportRange">
                    <el-button type="primary" icon="el-icon-document" :loading="loading" @click="renderOneStudentCard">输出花名册</el-button>
                    <el-button type="primary" icon="el-icon-printer" :loading="loading" @click="vuePrint">打印</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <!-- <div class="export">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel">导出</el-button>
    </div> -->

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { sexTypes, ethnics, nations, relations, teacherNameDescDatas } from 'store/modules/classify'
    import { CodeToText, TextToCode } from 'element-china-area-data'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                info: {
                    studentName: '刘熙梓',                //1  姓名
                    grade: '',             //22  年级        默认
                    classNum: '',                   //23  班级        默认空
                },
                exportField: 0,
                exportRange: 2,
                rules: {},
                gradeArr: ['2018', '2017', '2016', '2015', '2014', '2013'],
                classArr: ['1', '2', '3', '4'],
                keyword: '',
                conditions: {},
                filename: '',
                fields: {},
                teacherInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 55,
                size_scoped: [10, 20, 30, 40],
                headerOptions: [
                //------学生个人基本信息
                { label: '_id',      prop: '_id',       hidden: true, },
                
                { label: '姓名',      prop: 'studentName', minWidth: '100' },
                { label: '性别',      prop: 'sexType', format: true, minWidth: '80' },
                { label: '出生日期',   prop: 'birthDate', format: true, minWidth: '110' },
                { label: '出生地',     prop: 'brithPlaceCode', format: true, minWidth: '200' },
                { label: '籍贯',      prop: 'grandPlaceCode', format: true, minWidth: '150' },
                { label: '民族',       prop: 'ethnic', format: true, minWidth: '80' },
                { label: '国家地区',   prop: 'nation', format: true, minWidth: '110' },
                { label: '联系电话',    prop: 'contactPhoneNumber',},
                { label: '身份证件号', prop: 'studentID', },
                //------学生个人辅助信息
                //------学生学籍辅助信息
                { label: '全国学籍号', prop: 'nationalStudentNumber', width: '' },
                { label: '年级',      prop: 'grade', minWidth: '120' },
                { label: '班级',      prop: 'classNum', },
                { label: '入学年月',      prop: 'enterSchoolYearMonth', },
                
                //------学生个人联系方式
                { label: '现住址',     prop: 'address', minWidth: '220' },
                
                //------学生个人扩展信息

                //------学生上下学交通方式

                //-------学生家庭成员或监护人信息一
                { label: '成员1姓名',     prop: 'keeper1Name', },
                { label: '成员1关系',     prop: 'relation1', format: true,},
                { label: '成员1户口所在地',     prop: 'brithPlaceCode1', format: true, minWidth: '220' },
                { label: '成员1联系电话',     prop: 'contact1PhoneNumber', },
                { label: '是否监护人1',     prop: 'keeper1', format: true, },

                //-------学生家庭成员或监护人信息二
                { label: '成员2姓名',     prop: 'keeper2Name', },
                { label: '成员2关系',     prop: 'relation2', format: true,},
                { label: '成员2户口所在地',     prop: 'brithPlaceCode2', format: true, minWidth: '220' },
                { label: '成员2联系电话',     prop: 'contact2PhoneNumber', },
                { label: '是否监护人2',     prop: 'keeper2', format: true, },
                ],
                multipleSelection: []
            }
        },
        mounted () {
            // this.getTeacherList()
        },

        methods: {
            vuePrint() {

            },
            renderOneStudentCard() {

            },
            changeExportField() {
                // console.log(this.exportField);
                this.exportRange = '';
            },
            buildTooltipContent(fields) {
                var tooltipStr = "";
                // for (let index in fields) {
                //     var result = this.teacherNameDescDatas.filter(obj => {
                //         return obj.name === index
                //     })
                //     if (result[0]) {
                //         tooltipStr += result[0].desc + ", ";
                //     }
                // }
                return tooltipStr;
            },
            anyFmt(label, value, data) {
                // console.log(label+"    "+value+"    "+data);
                switch (label) {
                    case "sexType":
                        return ("01" == value)?'男':'女';
                    break;
                    case "ethnic":
                        return ("01" == value)?'汉族':this.basicFmt(this[data], value);
                    break;
                    case "IDType":
                    case "politicalStatus":
                    default:
                    if(typeof value=="string"){
                        return value.replace(/\s+/g,"");
                    } else {
                        return value;
                    }
                    break;
                }
            },
            codeFmt(textStr) {
                return textStr;
                // console.log("reach this"+ textStr);
                var returnStr = "";
                // var codeArr = textStr;
                // if ("string" == typeof(codeStr)) {
                    // codeArr = codeStr.split(",");
                // }
                
                returnStr = TextToCode[textStr];
                console.log("reach this"+ returnStr);

                return returnStr;
            },
            basicFmt(classDatas, value) {
                // console.log(classDatas);
                // console.log(value);
                var result = classDatas.filter(obj => {
                        return obj.id === value
                    })
                    // console.log(result[0]);
                if (result[0]) {
                    return result[0].name;
                } else {
                    return "";
                }
            },
            nationFmt(classDatas, key) {
                var result = classDatas.filter(obj => {
                        return obj.code === key
                    })
                return result[0].cn;
            },
            async getTeacherList () {
                this.loading = true;
                // try {
                    var data = await this.$store.dispatch('getTeacherList', {
                        keyword: this.keyword,
                        conditions: this.conditions,
                        fields: this.fields,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.loading = false;
                // }catch(e) {
                //     this.loading = false;
                // }
            },
            del (scope) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true
                    }).then(async () => {
                        try {
                    await this.$store.dispatch('delStudent', scope.row._id)
                    this.teacherList.splice(scope.$index, 1)
                }catch(e) {

                }
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                    }).catch(() => {
                      this.$message({
                        type: 'info',
                        message: '已取消删除'
                      });
                    });
                
            },
            exportTeachers(item) {
                this.keyword = "";
                this.fields = item.fields;
                this.conditions = item.conditions;
                this.pagesize = 80;
                this.filename = "燕山小学全校教师花名册";
                this.exportExcel();
            },
            async exportExcel () {
                await this.getTeacherList();
                var data = new Array();
                var num = 1;
                for (let index in this.teacherList) {
                    // console.log(this.teacherList[index]["studentName"]);
                    data.push(this.fmtOneTeacher(this.teacherList[index], num));
                    num++;
                    // break;
                }
                // console.log(data);
                /* 创建worksheet */
                var ws = XLSX.utils.json_to_sheet(data);

                /* 新建空workbook，然后加入worksheet */
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, this.filename);

                /* 生成xlsx文件 */
                XLSX.writeFile(wb, this.filename+".xlsx");
            },
            fmtOneTeacher (teacherInfo, order) {
                //班级 姓名 家长姓名 联系方式  现住址
                let tInfo = new Array();
                for (let index in teacherInfo) {
                    var result = this.teacherNameDescDatas.filter(obj => {
                        return obj.name === index
                    })
                    tInfo["编号"] = order;
                    if (result[0]) {
                        tInfo[result[0].desc] = this.anyFmt(result[0].name, teacherInfo[index], result[0].data);
                    }
                }
                return tInfo;
            },
        },
        computed: {
            ...mapGetters([
                'teacherList',
                'teacherTotal',
                'IDTypes',
                'sexTypes',
                'ethnics',
                'politicalStatuses',
                'switchStates',
                'teacherNameDescDatas',
                'exportTeacherListFields',
            ])
        }
    }
</script>

<style lang="less" scoped>
    article {
        padding: 20px;
        .search {
            padding-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }
        .pagination {
            text-align: right;
            padding: 20px 0;
        }
        .tag {
            margin: 0 10px;
        }
        .el-row {
            margin-bottom: 20px;
            &:last-child {
            margin-bottom: 0;
            }
        }
        .el-col {
            border-radius: 4px;
        }
        .bg-purple-dark {
            background: #99a9bf;
        }
        .bg-purple {
            background: #d3dce6;
        }
        .bg-purple-light {
            background: #e5e9f2;
        }
        .grid-content {
            border-radius: 4px;
            min-height: 36px;
        }
        .row-bg {
            padding: 10px 0;
            background-color: #f9fafc;
        }
    }
</style>
