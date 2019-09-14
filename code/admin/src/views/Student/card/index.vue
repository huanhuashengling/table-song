<template>
<article>
    <el-form :model="info" :rules="rules" ref="form" label-width="110px" class="form">
        <el-row>
            <el-col :span="5">
                <el-form-item label="年级" prop="grade">
                    <el-select v-model="info.grade" clearable placeholder="请选择年级" class="block">
                        <el-option v-for="item in gradeDescs" :key="item.id" :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="班级" prop="classNum">
                    <el-select v-model="info.classNum" clearable placeholder="请选择班级" class="block">
                        <el-option v-for="item in classDescs" :key="item.id" :label="item.label" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="学生姓名" prop="studentName">
                    <el-input type="text" v-model="info.studentName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" icon="el-icon-document" :loading="loading" @click="renderOneStudentCard">生成学籍卡片</el-button>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" icon="el-icon-printer" :loading="loading" @click="vuePrint">打印</el-button>
            </el-col>
        </el-row>
    </el-form>
    <div id="card-form">
        <!-- <el-dialog v-if="cardShow" title="学籍卡片" :visible.sync="dialogTableVisible" class="edit-wrapper" @close="close" width="80%"> -->

            <table class="out-table">

                <tr><td colspan="8" class="head">学籍基本信息</td></tr>
                <tr><td colspan="6">
                    <table class="inner-table" width="660px">
                        <tr><td width="12%">姓名</td><td width="30%">{{studentName}}</td><td width="10%">性别</td><td width="10%">{{sexType}}</td><td width="10%">民族</td><td width="10%">{{ethnic}}</td></tr>
                        <tr><td>学籍号</td><td>{{nationalStudentNumber}}</td><td>曾用名</td><td>{{usedName}}</td><td>出生日<br />期</td><td>{{birthDate}}</td></tr>
                        <tr><td>身份证<br />件类型</td><td>{{IDType}}</td><td>身份证<br />号</td><td colspan="3">{{studentID}}</td></tr>
                    </table>       
                </td><td colspan="2" width="60px">图片<br />暂无</td></tr>
                <tr><td width="12%">所在学<br />校</td><td colspan="6">{{schoolName}}</td></tr>
                <tr><td>学校标<br />识码</td><td colspan="2">{{schoolCode}}</td><td>所在年<br />级</td><td>{{grade}}</td><td>所在班<br />级</td><td>{{classNum}}</td></tr>
                <tr><td>户籍地</td><td colspan="6">{{householdPlaceCode}}</td></tr>

                <tr><td>国籍</td><td colspan="2">{{nation}}</td><td>港澳台<br />侨外</td><td>{{notMainland}}</td><td>就读方<br />式</td><td>{{residentType}}</td></tr>
                <tr><td>家庭地<br />址</td><td colspan="6">{{address}}</td></tr>
                <tr><td>监护人</td>
                <td colspan="7">
                    <table class="inner-table">
                    <tr><td>关系</td><td>姓名</td><td>联系电话</td></tr>
                    <tr><td>{{relation1}}</td><td>{{keeper1Name}}</td><td>{{contact1PhoneNumber}}</td></tr>
                    <tr><td>{{relation2}}</td><td>{{keeper2Name}}</td><td>{{contact2PhoneNumber}}</td></tr>
                    </table>
                </td></tr>
                <tr><td colspan="8" class="head">学籍变动情况</td></tr>
                <tr><td colspan="2">学籍变动时间</td><td colspan="6">学籍变动情况</td></tr>

            </table>
        <!-- </el-dialog> -->
</div>
</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import Print from 'print-js'
    import { CodeToText, TextToCode } from 'element-china-area-data'
    // import { sexTypes, ethnics, nations, relations } from 'store/modules/classify'
    export default {
        data() {
            return {
                dialogTableVisible: true,
                cardShow: false,

                loading: false,
                studentName: '丁皓轩',                //1  姓名
                sexType: '',                    //2  性别
                birthDate: '',                  //3  出生日期    不显示  从身份证获取
                brithPlaceCode: [],             //4  出生地
                ethnic: '01',                   //6  民族           默认汉族
                nation: 'CN',                   //7  国家地区        默认中国
                notMainland: '01',              //10 港澳台侨外       默认否
                IDType: '01',                     //8  身份证件类型     默认居民身份证
                studentID: '',                  //9  身份证号
                householdPlaceCode: [],         //17  户口所在地
                usedName: '',                   //15  曾用名
                nationalStudentNumber: '',      //20  全国学籍号
                grade: '',             //22  年级        默认
                classNum: '',                   //23  班级        默认空
                residentType: '01',             //26  就读方式    默认
                address: '',                    //28  现住址
                keeper1Name: '',                //49  监护人1姓名
                relation1: '01',                //50  监护人1关系
                contact1PhoneNumber: '',        //56  监护人1联系电话
                keeper2Name: '',                //61  监护人2姓名
                relation2: '02',                //62  监护人2关系
                contact2PhoneNumber: '',        //68  监护人2联系电话
                schoolName: '长沙市芙蓉区东晖小学',
                schoolCode: '2143017771',
                info: {
                    studentName: '丁皓轩',                //1  姓名
                    grade: '',             //22  年级        默认
                    classNum: '',                   //23  班级        默认空
                },
                rules: {},
            }
        },
        mounted () {
            // this.getStudentList()
        },

        methods: {
            vuePrint() {
                Print({
                    printable: 'card-form',
                    type: 'html',
                    // 继承原来的所有样式
                    targetStyles: ['*']
                })
            },
            close() {
                // this.$emit('close')
                this.cardShow = false;
                this.dialogTableVisible = false;

            },
            async renderOneStudentCard() {
                console.log("asasasas");
                this.loading = true;
                // try{
                    // this.info.html = this.info.markdown
                    await this.$store.dispatch('findOneStudent', {
                        studentName: this.info.studentName,
                    });
                    this.loading = false
                    // console.log("line 145  ");
                    console.log(this.oneStudent);
                    this.buildCardData(this.oneStudent);

                    // this.$router.push('/student/list')
                // }catch(e) {
                //     this.loading = false
                // }
            },
            buildCardData(studentInfo) {
                this.studentName = studentInfo["studentName"];
                this.sexType = ("01" == studentInfo["sexType"])?'男':'女';
                this.birthDate = studentInfo["studentID"].substring(6, 10)+""+studentInfo["studentID"].substring(10, 12)+""+studentInfo["studentID"].substring(12, 14);
                this.brithPlaceCode = studentInfo["brithPlaceCode"];
                this.ethnic = this.basicFmt(this.ethnics, studentInfo["ethnic"]);
                this.nation = this.nationFmt(this.nations, studentInfo["nation"]);
                this.notMainland = this.basicFmt(this.notMainlands, studentInfo["notMainland"]);
                this.IDType = this.basicFmt(this.IDTypes, studentInfo["IDType"]);
                this.studentID = studentInfo["studentID"];
                this.householdPlaceCode = this.codeFmt(studentInfo["householdPlaceCode"]);
                this.usedName = studentInfo["usedName"];
                this.nationalStudentNumber = studentInfo["nationalStudentNumber"];
                this.grade = studentInfo["grade"];
                this.classNum = studentInfo["classNum"];
                this.residentType = this.basicFmt(this.residentTypes, studentInfo["residentType"]);
                this.address = studentInfo["familyAddress"];
                this.keeper1Name = studentInfo["keeper1Name"];
                this.relation1 = this.basicFmt(this.relations, studentInfo["relation1"]);
                this.contact1PhoneNumber = studentInfo["contact1PhoneNumber"];
                this.keeper2Name = studentInfo["keeper2Name"];
                this.relation2 = this.basicFmt(this.relations, studentInfo["relation2"]);
                this.contact2PhoneNumber = studentInfo["contact2PhoneNumber"];

                this.cardShow = true;
            },
            anyFmt(label, value, data) {
                // console.log(label+"    "+value+"    "+data);
                switch (label) {
                    case "sexType":
                        return ("01" == value)?'男':'女';
                    break;
                    case "birthDate"://430181198410263456
                        var idStr = value;
                        return idStr.substring(6, 10)+"-"+idStr.substring(10, 12)+"-"+idStr.substring(12, 14);
                    break;
                    // case "brithPlaceCode":
                    //     return this.codeFmt(value);
                    // break;
                    // case "grandPlaceCode":
                    //     return this.codeFmt(value);
                    // break;
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
                    // case "householdPlaceCode1":
                    //     return this.codeFmt(value);
                    // break;
                    // case "householdPlaceCode2":
                    //     return this.codeFmt(value);
                    // break;
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
            codeFmt(codeStr) {
                var returnStr = "";
                var codeArr = codeStr;
                if ("string" == typeof(codeStr)) {
                    codeArr = codeStr.split(",");
                }
                
                for (let index = 0; index < codeArr.length; index++) {
                    var tStr = CodeToText[codeArr[index]];
                    returnStr += ("全部" == tStr)?"":tStr;
                }
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
                console.log(key);
                var result = classDatas.filter(obj => {
                        return obj.code === key
                    })
                return result[0].cn;
            },
            async getStudentList () {
                this.loading = true;
                try {
                    await this.$store.dispatch('getStudentList', {
                        keyword: this.keyword,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.loading = false;
                }catch(e) {
                    this.loading = false;
                }
            },
            filterTag(value, row) {
                return row.type.some( v => v === value)
            },
        },
        computed: {
            ...mapGetters([
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
                'gradeDescs',
                'classDescs',
                'oneStudent',
                'cardColumn',
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
        .out-table, .out-table tr th, .out-table tr td { border:1px solid #000000;}
        .inner-table { border:1px solid #000000;}
        td {height: 55px;}
        .head {font-size: 24px; height: 65px;}
        table { width: 100%; min-height: 25px; line-height: 25px; text-align: center; border-collapse: collapse;} 
        .out-table {width: 700px; margin-left: 50px; margin-top: 100px;}
    }
</style>
