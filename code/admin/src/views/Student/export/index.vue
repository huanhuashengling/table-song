<template>
<article>
    <el-form :model="info" :rules="rules" ref="form" label-width="110px" class="form">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="导出列集合" prop="exportField">
                    <el-radio-group v-model="exportField" @change="changeExportField">
                    <template v-for="item in exportStudentListFields">
                        <el-tooltip class="item" effect="dark" :content="buildTooltipContent(item.fields)" placement="bottom-start">
                            <el-radio-button :label="item.id">{{item.name}}</el-radio-button>
                        </el-tooltip>
                    </template>
                    </el-radio-group>

                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="导出范围" prop="exportRange">
                    <el-radio-group v-model="exportRange" @change="changeExportRange">
                        <el-radio-button label="school">全校</el-radio-button>
                        <el-radio-button label="grade">分年级</el-radio-button>
                        <el-radio-button label="class">分班</el-radio-button>
                    </el-radio-group>
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
  <template v-if="showAll">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportSchool()">全校花名册导出</el-button>
  </template>
  <template v-if="showGrade" v-for="gradeItem in gradeDescs">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportGrade(gradeItem)">{{ gradeItem.label }}年级花名册导出</el-button>
  </template>
  <template v-if="showClass" v-for="gradeItem in gradeDescs">
    <template v-for="classItem in classDescs">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportClass(gradeItem, classItem)">{{ gradeItem.label }}{{ classItem.bigLabel }}班花名册导出</el-button>
    </template>
  </template>
    <!-- <div class="export">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel">导出</el-button>
    </div> -->

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { sexTypes, ethnics, nations, relations, nameDescDatas } from 'store/modules/classify'
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
                showAll: false,
                showGrade: false,
                showClass: false,
                showOtherOp: false,
                exportField: 1,
                exportRange: 2,
                rules: {},
                gradeArr: ['2019', '2018', '2017', '2016', '2015', '2014'],
                classArr: ['1', '2', '3', '4'],
                keyword: '',
                conditions: {},
                filename: '',
                fields: {},
                studentInfo: {},
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
            // this.getStudentList()
        },

        methods: {
            vuePrint() {

            },
            renderOneStudentCard() {

            },
            changeExportField() {
                // console.log(this.exportField);
                this.showAll = false;
                this.showGrade = false;
                this.showClass = false;
                this.exportRange = '';
            },
            changeExportRange() {
                if ("school" == this.exportRange) {
                    this.showAll = true;
                    this.showGrade = false;
                    this.showClass = false;
                } else if ("grade" == this.exportRange) {
                    this.showAll = false;
                    this.showGrade = true;
                    this.showClass = false;
                } else if ("class" == this.exportRange) {
                    this.showAll = false;
                    this.showGrade = false;
                    this.showClass = true;
                }
            },
            buildTooltipContent(fields) {
                var tooltipStr = "";
                for (let index in fields) {
                    var result = this.nameDescDatas.filter(obj => {
                        return obj.name === index
                    })
                    if (result[0]) {
                        tooltipStr += result[0].desc + ", ";
                    }
                }
                return tooltipStr;
            },
            anyFmt(label, value, data) {
                // console.log(label+"    "+value+"    "+data);
                switch (label) {
                    case "sexType":
                        return ("01" == value)?'男':'女';
                    break;
                    case "brithPlaceCode":
                    case "grandPlaceCode":
                    case "householdPlaceCode1":
                    case "householdPlaceCode2":
                        return this.codeFmt(value);
                    break;
                    case "ethnic":
                        return ("01" == value)?'汉族':this.basicFmt(this[data], value);
                    break;
                    case "nation":
                        return ("CN" == value)?'中国':this.nationFmt(nations, value);
                    break;
                    case "IDType":
                    case "politicalStatus":
                    case "householdType":
                    case "healthStatus":
                    case "admissionMode":
                    case "residentType":
                    case "studentSource":
                    case "mainstream":
                    case "notMainland":
                    case "disability":
                    case "vehicle":
                    case "relation1":
                    case "keeper1Ethnic":
                    case "keeper1IDType":
                    case "relation2":
                    case "keeper2Ethnic":
                    case "keeper2IDType":
                        return this.basicFmt(this[data], value);
                    break;
                    case "keeper1":
                    case "keeper2":
                    case "withEnterCities":
                    case "isOneChild":
                    case "hasPreschoolEducation":
                    case "leftChildrenType":
                    case "orphan":
                    case "martyr":
                    case "needHelp":
                    case "enjoyHelp":
                        return ("01" == value)?'是':'否';
                    break;
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
            async getStudentList () {
                this.loading = true;
                // try {
                    var data = await this.$store.dispatch('getStudentList', {
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
                    this.studentList.splice(scope.$index, 1)
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
            exportSchool() {
                this.keyword = "";
                this.fields = this.exportStudentListFields[this.exportField].fields;
                this.conditions = this.exportStudentListFields[this.exportField].conditions;
                this.pagesize = 1200;
                this.filename = "燕山小学全校花名册";
                this.exportExcel();
            },
            exportGrade(gradeItem) {
                this.keyword = "";
                this.fields = this.exportStudentListFields[this.exportField].fields;
                this.conditions = this.exportStudentListFields[this.exportField].conditions;
                this.pagesize = 220;
                this.conditions["grade"] = "小学" + gradeItem.enterYear + "级";
                this.filename = "小学" + gradeItem.enterYear + "级花名册";
                this.exportExcel();
            },
            exportClass(gradeItem, classItem) {
                this.keyword = "";
                this.pagesize = 60;
                this.fields = this.exportStudentListFields[this.exportField].fields;
                this.conditions["classNum"] = "小学" + gradeItem.enterYear + "级" + classItem.label + "班";
                this.filename = "小学" + gradeItem.enterYear + "级" + classItem.label + "班班级花名册";
                this.exportExcel();
            },
            async exportExcel () {
                await this.getStudentList();
                var data = new Array();
                var num = 1;
                for (let index in this.studentList) {
                    // console.log(this.studentList[index]["studentName"]);
                    data.push(this.fmtOneStudent(this.studentList[index], num));
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
            fmtOneStudent (studentInfo, order) {
                //班级 姓名 家长姓名 联系方式  现住址
                let tInfo = new Array();
                for (let index in studentInfo) {
                    var result = this.nameDescDatas.filter(obj => {
                        return obj.name === index
                    })
                    tInfo["编号"] = order;
                    if (result[0]) {
                        tInfo[result[0].desc] = this.anyFmt(result[0].name, studentInfo[index], result[0].data);
                    }
                }
                return tInfo;
            },
        },
        computed: {
            ...mapGetters([
                'studentList',
                'studentTotal',
                'gradeDescs',
                'classDescs',
                'IDTypes',
                'sexTypes',
                'ethnics',
                'nations',
                'sources',
                'healthStatuses',
                'ethnics',
                'studentSources',
                'householdTypes',
                'politicalStatuses',
                'leftChildrenTypes',
                'notMainlands', 
                'admissionModes', 
                'switchStates',
                'bloodTypes',
                'residentTypes',
                'vehicles',
                'relations',
                'disabilities', 
                'mainstreams',
                'nameDescDatas',
                'exportStudentListFields',
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
