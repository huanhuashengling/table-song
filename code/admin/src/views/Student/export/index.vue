<template>
<article>
    <ul>
  <template v-for="gradeNum in gradeArr">
    <template v-for="classNum in classArr">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel2(gradeNum, classNum)">导出{{ gradeNum }}级{{ classNum }}班</el-button>
    </template>
  </template>
</ul>
    <div class="export">
        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel">导出</el-button>
    </div>

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import EditComponent from '../edit/index'
    import { sexTypes, ethnics, nations, relations } from 'store/modules/classify'
    import { CodeToText, TextToCode } from 'element-china-area-data'
    import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
    export default {
        components: {
            EditComponent
        },
        data() {
            return {
                gradeArr: ['2018', '2017', '2016', '2015', '2014', '2013'],
                classArr: ['1', '2', '3', '4'],
                keyword: '',
                editShow: false,
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
            codeFmt(codeStr) {
                var returnStr = "";
                var codeArr = codeStr;
                if ("string" == typeof(codeStr)) {
                    codeArr = codeStr.split(",");
                }
                
                for (let index = 0; index < codeArr.length; index++) {
                    returnStr += CodeToText[codeArr[index]];
                }
                return returnStr;
            },
            anyFmt(row, column) {
                switch (column.label) {
                    case "性别":
                        return ("01" == row.sexType)?'男':'女';
                    break;
                    case "出生日期"://430181198410263456
                        var idStr = row.studentID;
                        return idStr.substring(6, 10)+"-"+idStr.substring(10, 12)+"-"+idStr.substring(12, 14);
                    break;
                    case "出生地":
                        return this.codeFmt(row.brithPlaceCode);
                    break;
                    case "籍贯":
                        return this.codeFmt(row.grandPlaceCode);
                    break;
                    case "民族":
                        return ("01" == row.ethnic)?'汉族':this.basicFmt(ethnics, row.ethnic);
                    break;
                    case "国家地区":
                        return ("CN" == row.nation)?'中国':this.nationFmt(nations, row.nation);
                    break;
                    case "成员1关系":
                        return this.basicFmt(relations, row.relation1);
                    break;
                    case "成员1户口所在地":
                        return this.codeFmt(row.householdPlaceCode1);
                    break;
                    case "成员2关系":
                        return this.basicFmt(relations, row.relation2);
                    break;
                    case "成员2户口所在地":
                        return this.codeFmt(row.householdPlaceCode2);
                    break;
                    case "是否监护人1":
                        return ("01" == row.keeper1)?'是':'否';
                    break;
                    case "是否监护人2":
                        return ("01" == row.keeper2)?'是':'否';
                    break;
                }
            },
            basicFmt(classDatas, key) {
                for (let index = 0; index < classDatas.length; index++) {
                    const element = classDatas[index];
                    if (element.id == key) {
                        return element.name;
                    }
                }
            },
            nationFmt(classDatas, key) {
                for (let index = 0; index < classDatas.length; index++) {
                    const element = classDatas[index];
                    if (element.code == key) {
                        return element.cn;
                    }
                }
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
            exportExcel1 () {
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
            exportExcel () {
                let gradeArr = ['2018', '2017', '2016', '2015', '2014', '2013'];
                let classArr = ['1', '2', '3', '4'];
                //keyword: '小学2017级4班',
                console.log("bs");
                for (let gradeNum in gradeArr) {
                    for (let classNum in classArr) {
                        this.keyword = "小学" + gradeArr[gradeNum] + "级" + classArr[classNum] + "班";
                        console.log(this.keyword);

                        this.getStudentList();
                        console.log(this.studentList);
                    }
                }
                
                // var data = this.studentList;
                // // /* 需要导出的JSON数据 */
                // // var data = [
                // //     {"name":"John", "city": "Seattle"},
                // //     {"name":"Mike", "city": "Los Angeles"},
                // //     {"name":"Zach", "city": "New York"}
                // // ];

                // /* 创建worksheet */
                // var ws = XLSX.utils.json_to_sheet(data);

                // /* 新建空workbook，然后加入worksheet */
                // var wb = XLSX.utils.book_new();
                // XLSX.utils.book_append_sheet(wb, ws, "People");

                // /* 生成xlsx文件 */
                // XLSX.writeFile(wb, "sheetjs.xlsx");
            },
            exportExcel2 (gradeNum, classNum) {
                //keyword: '小学2017级4班',
                this.keyword = "小学" + gradeNum + "级" + classNum + "班";
                console.log(this.keyword);

                this.getStudentList();
                console.log(this.studentList);
                
                var data = this.studentList;
                // /* 需要导出的JSON数据 */
                // var data = [
                //     {"name":"John", "city": "Seattle"},
                //     {"name":"Mike", "city": "Los Angeles"},
                //     {"name":"Zach", "city": "New York"}
                // ];

                /* 创建worksheet */
                var ws = XLSX.utils.json_to_sheet(data);

                /* 新建空workbook，然后加入worksheet */
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "People");

                /* 生成xlsx文件 */
                XLSX.writeFile(wb, "sheetjs.xlsx");
            },
        },
        computed: {
            ...mapGetters([
                'studentList',
                'studentTotal',
                'sexTypes',
                'ethnics',
                'nations',
                'relations',
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
