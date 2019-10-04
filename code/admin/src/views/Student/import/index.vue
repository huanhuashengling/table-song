<template>
<article>
    <!-- <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getStudentList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getStudentList">搜索</el-button>
    </div>
    <div class="export">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel">导出</el-button>
    </div> -->
    <el-upload
        ref="upload"
        action="/wm/upload/"
        :show-file-list="false"
        :on-change="readExcel"
        :auto-upload="false">
        <el-button
            slot="trigger"
            icon="el-icon-upload"
            size="small"
            type="primary">
            上传文件
        </el-button>
    </el-upload>
    <p>1. 导出全国学籍名单</p>
    <p>2. 核对名单，弄清楚人数</p>
    <p>3. 直接将导出的原生字段信息导入到系统</p>
    <p>4. 导出家庭成员信息，和之前的连接上，这一点还没有做，但前几步基本可以获得所有的信息了</p>

    <p></p>
</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { CodeToText, TextToCode } from 'element-china-area-data'
    import { sexTypes, ethnics, nations, relations } from 'store/modules/classify'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                loading: false,
                fields: {},
                conditions: {},
                //------学生个人基本信息
                info: {
                    schoolName: '',                //学校名称
                    schoolCode: '',                //学校标识码
                    //------学生个人基本信息
                    studentName: '',                //1  姓名
                    sexType: '',                    //2  性别
                    birthDate: '',                  //3  出生日期    不显示  从身份证获取
                    brithPlaceCode: [],             //4  出生地
                    grandPlaceCode:[],              //5  籍贯
                    ethnic: '01',                   //6  民族           默认汉族
                    nation: 'CN',                   //7  国家地区        默认中国
                    contactPhoneNumber: '',         //31 联系电话
                    notMainland: '01',              //10 港澳台侨外       默认否
                    IDType: '01',                     //8  身份证件类型     默认居民身份证
                    studentID: '',                  //9  身份证号
                    politicalStatus: '01',          //11  政治面貌    不显示  默认少先队员
                    healthStatus: '01',             //12  健康状况    不显示  默认健康或良好
                    //------学生个人辅助信息
                    householdPlaceCode: [],         //17  户口所在地
                    householdType: '',              //18  户口性质
                    community: '',                  //    社区街道
                    strongPoint: '',                //19  特长
                    IDValidityPeriod: '',           //16  身份证有效期
                    usedName: '',                   //15  曾用名
                    //------学生学籍辅助信息
                    nationalStudentNumber: '',      //20  全国学籍号
                    inClassNum: '',                 //21  班内学号     默认空
                    grade: '小学2019级',             //22  年级        默认
                    classNum: '',                   //23  班级        默认空
                    enterSchoolYearMonth: '201909', //24  入学年月     默认
                    admissionMode: '01',            //25  入学方式    默认
                    residentType: '01',             //26  就读方式    默认
                    studentSource: '01',            //27  学生来源    默认
                    //------学生个人联系方式
                    address: '',                    //28  现住址
                    contactAddress: '',             //29  现住址
                    familyAddress: '',              //30  现住址    
                    postalCode: '',                 //32  邮政编码
                    //------学生个人扩展信息
                    isOneChild: '',                 //35  是否独生子女
                    hasPreschoolEducation: '',      //36  是否受过学前教育
                    leftChildrenType: '01',         //37  是否留守儿童
                    withEnterCities: '',            //38  是否进城务工随迁子女
                    orphan: '02',                   //39  是否孤儿
                    martyr: '02',                   //40  是否烈士或优抚子女
                    mainstream: '01',               //41  随班就读
                    disability: '01',               //42  残疾类型
                    govBuySeat: '02',               //43  是否政府购买学位
                    needHelp: '02',                 //44  是否需要申请资助
                    enjoyHelp: '02',                //45  是否享受一补
                    //------学生上下学交通方式
                    distance: '',                   //46  上下学距离
                    vehicle: '',                    //47  交通方式
                    schoolbus: '02',                //48  是否需要校车
                    //-------学生家庭成员或监护人信息一
                    keeper1Name: '',                //49  监护人1姓名
                    relation1: '01',                //50  监护人1关系
                    relation1Desc: '',              //51  监护人1关系说明
                    keeper1Ethnic: '',              //52  监护人1民族
                    keeper1Workplace: '',           //53  监护人1工作单位
                    address1: '',                   //54  监护人1现住址
                    householdPlaceCode1: [],        //55  监护人1户口所在地
                    contact1PhoneNumber: '',        //56  监护人1联系电话
                    keeper1: '01',                  //57  是否是监护人
                    keeper1IDType: '',              //58  监护人1身份证类型
                    keeper1ID: '',                  //59  监护人1身份证号码
                    keeper1Position: '',            //60  监护人1职务
                    //-------学生家庭成员或监护人信息二
                    keeper2Name: '',                //61  监护人2姓名
                    relation2: '02',                //62  监护人2关系
                    relation2Desc: '',              //63  监护人2关系说明
                    keeper2Ethnic: '',              //64  监护人2民族
                    keeper2Workplace: '',           //65  监护人2工作单位
                    address2: '',                   //66  监护人2现住址
                    householdPlaceCode2: [],        //67  监护人2户口所在地
                    contact2PhoneNumber: '',        //68  监护人2联系电话
                    keeper2: '01',                  //69  是否是监护人
                    keeper2IDType: '',              //70  监护人2身份证类型
                    keeper2ID: '',                  //71  监护人2身份证号码
                    keeper2Position: '',            //72  监护人2职务

                    //市学籍信息
                    hasDoubleGirls: '02',            //    是否双女户
                    cityStudentNumber: '',           //    市学籍

                    isPre: '02',                     //    区分在校学生和未注册学籍的学生
                },
            }
        },
        mounted () {
            this.getStudentList()
        },

        methods: {
            readExcel(file) {
                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    // alert("asasasas");
                    // try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                        type: 'binary'
                        });
                        // for (let sheet in workbook.Sheets) {
                            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets["在校生信息"]);
                            // console.log(sheet);
                            // console.log(sheetArray);
                            for (let index in sheetArray) {
                                this.createStudentInfo(sheetArray[index]);
                                // break;
                            }
                        // }
                    // } catch (e) {
                    //     this.$message.warning('文件类型不正确！');
                    //     return false;
                    // }
                };
                fileReader.readAsBinaryString(file.raw);
            },
            createStudentInfo (data) {
                // console.log(data);
                let tInfo = JSON.parse(JSON.stringify(this.info));

                for (let index in data) {
                    var result = this.nameDescDatas.filter(obj => {
                        return obj.desc === index
                    })
                    if (result[0]) {
                        // console.log(result);
                        
                        switch (result[0].name) {
                            case "familyNames":
                                tInfo["keeper1Name"] = this.anyFmt("keeper1Name", data[index].split(",")[0], "");
                                tInfo["keeper2Name"] = this.anyFmt("keeper2Name", data[index].split(",")[1], "");
                                break;
                            case "familyRelations":
                                tInfo["relation1"] = this.anyFmt("relation1", data[index].split(",")[0], "relations");
                                tInfo["relation2"] = this.anyFmt("relation2", data[index].split(",")[1], "relations");
                                break;
                            case "familyWorkPlaces":
                                tInfo["keeper1Workplace"] = this.anyFmt("keeper1Workplace", data[index].split(",")[0], "");
                                tInfo["keeper2Workplace"] = this.anyFmt("keeper2Workplace", data[index].split(",")[1], "");
                                break;
                            case "familyAddreses":
                                tInfo["address1"] = this.anyFmt("address1", data[index].split(",")[0], "");
                                tInfo["address2"] = this.anyFmt("address2", data[index].split(",")[1], "");
                                break;
                            case "familyHouseholdPlaces":
                                tInfo["householdPlaceCode1"] = this.anyFmt("householdPlaceCode1", data[index].split(",")[0], "");
                                tInfo["householdPlaceCode2"] = this.anyFmt("householdPlaceCode2", data[index].split(",")[1], "");
                                break;
                            case "familyPhones":
                                tInfo["contact1PhoneNumber"] = this.anyFmt("contact1PhoneNumber", data[index].split(",")[0], "");
                                tInfo["contact2PhoneNumber"] = this.anyFmt("contact2PhoneNumber", data[index].split(",")[1], "");
                                break;
                            case "householdPlaceCode":
                                var tStudentID = "";
                                if (data["身份证件号"]) {
                                    tStudentID = data["身份证件号"].trim();
                                }
                                if (tStudentID.length < 18) {
                                    tInfo["householdPlaceCode"] = "430000,430100,430102";
                                } else {
                                    var pCode = tStudentID.substr(0, 2) + "0000";
                                    var cCode = tStudentID.substr(0, 4) + "00";
                                    var aCode = tStudentID.substr(0, 6);

                                    tInfo["householdPlaceCode"] = pCode + "," + cCode + "," + aCode;
                                }
                                
                                break;
                            default:
                                tInfo[result[0].name] = this.anyFmt(result[0].name, data[index], result[0].data);
                            break;
                        }
                        // if ("leftChildrenType" == result[0].name)
                        // {
                        //     break;
                        // }
                    }
                    
                }
                // console.log(tInfo);
                try{
                    this.$store.dispatch('addStudent', tInfo);
                    this.loading = false
                    this.$router.push('/student/list')
                }catch(e) {
                    this.loading = false
                }
            },
            anyFmt(label, value, data) {
                // console.log(label+"    "+value+"    "+data);
                switch (label) {
                    case "sexType":
                        return ("女" == value)?'02':'01';
                    break;
                    case "brithPlaceCode":
                    case "grandPlaceCode":
                    case "householdPlaceCode":
                    case "householdPlaceCode1":
                    case "householdPlaceCode2":
                        return this.codeFmt(value);
                    break;
                    case "ethnic":
                        return ("汉族" == value)?'01':this.basicFmt(this[data], value);
                    break;
                    case "nation":
                        return ("中国" == value)?'CN':this.nationFmt(nations, value);
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
                        return ("是" == value)?'01':'02';
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
            codeFmt(str) {
                var returnStr = "";
                if (typeof str == "undefined" || str == null || str == "") {
                    return returnStr;
                }

                let splitOnce = str.split("省");
                if (TextToCode[splitOnce[0]+"省"]) {
                    returnStr += TextToCode[splitOnce[0]+"省"].code + ",";
                    
                    if (typeof splitOnce[1] == "undefined" || splitOnce[1] == null || splitOnce[1] == "") {
                        return returnStr;
                    }

                    let splitTwice = splitOnce[1].split("市");
                    if (TextToCode[splitOnce[0]+"省"][splitTwice[0]+"市"]) {
                        returnStr += TextToCode[splitOnce[0]+"省"][splitTwice[0]+"市"].code + ",";
                        
                        if (typeof splitTwice[1] == "undefined" || splitTwice[1] == null || splitTwice[1] == "") {
                            return returnStr;
                        }

                        let splitThird = splitTwice[1].split("区");
                        if (TextToCode[splitOnce[0]+"省"][splitTwice[0]+"市"][splitThird[0]+"区"]) {
                            returnStr += TextToCode[splitOnce[0]+"省"][splitTwice[0]+"市"][splitThird[0]+"区"].code;
                        }
                    }
                }
                return returnStr;
            },
            basicFmt(classDatas, value) {
                // console.log(classDatas);
                // console.log(value);
                var result = classDatas.filter(obj => {
                        return obj.name === value
                    })
                    // console.log(result[0]);
                if (result[0]) {
                    return result[0].id;
                } else {
                    return value;
                }
            },
            nationFmt(classDatas, key) {
                var result = classDatas.filter(obj => {
                        return obj.cn === key
                    })
                return result[0].code;
            },
            increment (index) {
                return index+1+((this.pageindex-1)*this.pagesize)
            },
            close () {
                this.editShow = false;
                this.getStudentList()
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getStudentList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getStudentList()
            },
            async getStudentList () {
                this.loading = true;
                try {
                    await this.$store.dispatch('getStudentList', {
                        keyword: this.keyword,
                        conditions: this.conditions,
                        fields: this.fields,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.loading = false;
                }catch(e) {
                    this.loading = false;
                }
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
            edit (scope) {
                console.log(scope.row)
                this.editShow = true;
                this.studentInfo = scope.row;
                // scope.row.releaseTime = new Date(scope.row.releaseTime)
            },
            filterTag(value, row) {
                return row.type.some( v => v === value)
            },
            exportExcel () {
                /* generate workbook object from table */
                var wb = XLSX.utils.table_to_book(document.querySelector('#student-list'));
                var ws = wb.Sheets.Sheet1;
                var cell = ws[XLSX.utils.encode_cell({r:1,c:9})];
                if(cell && cell.t == 'n') {
                    cell.t = "s";
                }
                
                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx')
                } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout
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
    }
</style>
