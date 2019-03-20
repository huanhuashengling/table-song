<template>
<article>
    <!-- <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getTeacherList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getTeacherList">搜索</el-button>
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
</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { sexTypes, ethnics, teacherNameDescDatas} from 'store/modules/classify'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        data() {
            return {
                loading: false,
                fields: {},
                //------教师个人基本信息
                info: {
                    teacherName: '',                //1  姓名
                    sexType: '',                    //2  性别
                    birthDate: '',                  //3  出生日期  
                    ethnic: '01',                   //4  民族  
                    contactPhoneNumber: '',         //5  联系电话
                    IDType: '01',                   //6  身份证件类型
                    teacherID: '',                  //7  身份证号
                    startWorkDate: '',              //8  参加工作时间
                    thisWorkplaceYears: '',         //9  在本单位工作年限 
                    startTeachDate: '',             //10  从教时间
                    highestEducation: '',           //11  最高学历
                    personalIdentity: '',           //12  个人身份
                    politicalStatus: '01',          //13  政治面貌
                    degree: '',                     //14  学位
                    jobRank: '',                    //15  岗位等级
                    reviewPassDate: '',             //16  评审通过时间
                    jobTitle: '',                   //17  职称
                    jobPosition: '',                //18  职务
                    teachingCourse: '',             //19  任教课程
                    graduatedSchool: '',            //20  毕业院校
                    major: '',                      //21  专业
                    certificateCode: '',            //22  教师资格证编号
                    certificateSubject: '',         //23  教师资格证学科
                    mandarinLevel: '',              //24  普通话等级
                    classTeacher: '',               //25  哪个班的班主任
                    subjectLeader: '',              //26  哪个学科组长
                    gradeLeader: '',                //27  哪个年级组长
                    isFormal: '',                   //28  是否正式老师
                    isOnPosition: '',               //29  是否在岗
                },
            }
        },
        mounted () {
            // this.getTeacherList()
        },

        methods: {
            readExcel(file) {
                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    // try {
                        const data = ev.target.result;
                        const workbook = XLSX.read(data, {
                        type: 'binary'
                        });
                        // for (let sheet in workbook.Sheets) {
                            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"]);
                            // console.log(sheet);
                            // console.log(sheetArray);
                            for (let index in sheetArray) {
                                this.createTeacherInfo(sheetArray[index]);
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
            createTeacherInfo (data) {
                // console.log(this.teacherNameDescDatas);
                let tInfo = JSON.parse(JSON.stringify(this.info));

                for (let index in data) {
                    var result = this.teacherNameDescDatas.filter(obj => {
                        return obj.desc === index
                    })
                    if (result[0]) {
                        // console.log(result[0].name);
                        // console.log(index);
                        // console.log(data[index]);
                        tInfo[result[0].name] = this.anyFmt(result[0].name, data[index], result[0].data);
                        // if ("leftChildrenType" == result[0].name)
                        // {
                        //     break;
                        // }
                    }
                    
                }
                console.log(tInfo);
                try{
                    this.$store.dispatch('addTeacher', tInfo);
                    this.loading = false
                    this.$router.push('/teacher/list')
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
                    case "birthDate"://430181198410263456
                        var idStr = value;
                        return idStr.substring(6, 10)+"-"+idStr.substring(10, 12)+"-"+idStr.substring(12, 14);
                    break;
                    case "ethnic":
                        return ("汉族" == value || "汉" == value)?'01':this.basicFmt(this[data], value);
                    break;
                    case "IDType":
                    case "politicalStatus":
                        return this.basicFmt(this[data], value);
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
            basicFmt(classDatas, value) {
                // console.log(classDatas);
                // console.log(value);
                var result = classDatas.filter(obj => {
                        return obj.name === value
                    })
                if (result[0]) {
                    return result[0].id;
                } else {
                    return value;
                }
            },
            increment (index) {
                return index+1+((this.pageindex-1)*this.pagesize)
            },
            close () {
                this.editShow = false;
                this.getTeacherList()
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getTeacherList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getTeacherList()
            },
            async getTeacherList () {
                this.loading = true;
                try {
                    await this.$store.dispatch('getTeacherList', {
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
                'healthStatuses',
                'ethnics',
                'politicalStatuses',
                'switchStates',
                'teacherNameDescDatas',
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
