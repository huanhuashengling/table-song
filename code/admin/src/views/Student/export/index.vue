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
  <template v-if="showGrade" v-for="gradeItem in this.gradeData.data">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportGrade(gradeItem)">{{ gradeItem._id }}({{ gradeItem.total }})</el-button>
  </template>
  <template v-if="showClass" v-for="classItem in this.classData.data">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportClass(classItem)">{{ classItem._id }}({{ classItem.total }})</el-button>
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
                classData: {},
                gradeData: {},
                showAll: false,
                showGrade: false,
                showClass: false,
                showOtherOp: false,
                exportField: 1,
                exportRange: 2,
                rules: {},
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
            this.aggregateClassNum();
            this.aggregateGrade();
        },

        methods: {
            vuePrint() {

            },
            renderOneStudentCard() {

            },
            async aggregateClassNum() {
                this.classData = await this.$store.dispatch('aggregate', {schoolCode: this.schoolCode, field: "classNum"});
                // console.log(this.classData.data);
            },
            async aggregateGrade() {
                this.gradeData = await this.$store.dispatch('aggregate', {schoolCode: this.schoolCode, field: "grade"});
                // console.log(this.gradeData.data);
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
                    case "householdPlaceCode":
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
                    case "grade":
                        switch(value) {
                            case "小学2014级": return "小学六年级";
                            case "小学2015级": return "小学五年级";
                            case "小学2016级": return "小学四年级";
                            case "小学2017级": return "小学三年级";
                            case "小学2018级": return "小学二年级";
                            case "小学2019级": return "小学一年级";
                            default: return value;
                        }
                        break;
                    case "classNum":
                        switch(value.substr(0, 7)) {
                            case "小学2014级": return "六年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            case "小学2015级": return "五年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            case "小学2016级": return "四年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            case "小学2017级": return "三年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            case "小学2018级": return "二年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            case "小学2019级": return "一年" + this.changeNumToBig(value.substr(7, 1)) + value.substr(8, 1);
                            default:
                                return value;
                                break;
                        }
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
            codeFmt(codeStr) {
                var returnStr = "";
                var codeArr = codeStr;
                if ("string" == typeof(codeStr)) {
                    codeArr = codeStr.split(",");
                }
                if (codeArr[0]) {
                    if ("湖南省" == CodeToText[codeArr[0]]) {
                        if(codeArr[1]) {
                            if(codeArr[2]) {
                                returnStr = CodeToText[codeArr[1]]+","+CodeToText[codeArr[2]];
                            } else {
                                returnStr = CodeToText[codeArr[1]]+",-";
                            }
                        } else {
                            returnStr = "长沙市,芙蓉区";
                        }
                    } else {
                        if(codeArr[1]) {
                            returnStr = "外省," + CodeToText[codeArr[0]];
                        } else {
                            returnStr = "外省,湖北省";
                        }
                    }
                } else {
                    returnStr = "长沙市,芙蓉区";
                }
                
                // for (let index = 0; index < codeArr.length; index++) {
                //     var tStr = CodeToText[codeArr[index]];
                //     returnStr += ("全部" == tStr)?"":tStr;
                // }
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
                this.conditions = {schoolCode: this.schoolCode, isPre: "02"};
                this.pagesize = 1200;
                this.filename = this.userName + "全校花名册";
                this.exportExcel();
            },
            exportGrade(gradeItem) {
                let name = this.exportStudentListFields[this.exportField].name;

                this.keyword = "";
                this.fields = this.exportStudentListFields[this.exportField].fields;
                this.conditions = {schoolCode: this.schoolCode, grade: gradeItem._id, isPre: "02"};
                this.pagesize = 220;
                this.filename = this.userName + gradeItem._id + name;
                this.exportExcel();
            },
            exportClass(classItem) {
                let name = this.exportStudentListFields[this.exportField].name;
                this.keyword = "";
                this.pagesize = 60;
                this.fields = this.exportStudentListFields[this.exportField].fields;
                this.conditions = {schoolCode: this.schoolCode, classNum: classItem._id, isPre: "02"};
                this.filename = this.userName + classItem._id + name;
                this.exportExcel();
            },
            async exportExcel () {
                await this.getStudentList();
                var data = new Array();
                var num = 1;
                for (let index in this.studentList) {
                    // console.log(this.studentList[index]["studentName"]);
                    // if("431322201002250289" == this.studentList[index]["studentID"]) {
                        data.push(this.fmtOneStudent(this.studentList[index], num));
                        num++;
                    // }
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
            changeNumToBig(value){
                switch(value) {
                    case "1": return "一";
                    case "2": return "二";
                    case "3": return "三";
                    case "4": return "四";
                    case "5": return "五";
                    case "6": return "六";
                    default: return value;
                }
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
                'userName',
                'schoolName',
                'schoolCode',
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
