<template>
<article>
    <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getStudentList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getStudentList">搜索</el-button>

        <el-button type="primary" icon="el-icon-download" :loading="loading" @click="exportExcel">导出在校数据</el-button>
        <el-button type="primary" icon="el-icon-delete" :loading="loading" @click="clearStudentData">清空在校数据</el-button>
    </div>
    <div class="export">
        
    </div>
    <el-table ref="multipleTable" id="student-list" :data="studentList" tooltip-effect="dark" @sort-change="changeSort" :default-sort="{prop: 'studentName', order: 'ascending'}" stripe border>
        <el-table-column show-overflow-tooltip type="index" width="55" align="center" header-align="center" :index="increment"></el-table-column>
        <el-table-column show-overflow-tooltip  v-if="!item.hidden && !item.filters && !item.format" v-for="(item, index) in headerOptions" :key="index" :label="item.label" :prop="item.prop" sortable :sort-orders="['ascending', 'descending']" :header-align="item.headerAlign || 'center'" :align="item.align || 'center'" :sortable="item.sort || false"  :min-width="item.minWidth || 150">
            <template slot-scope="scope">
                <div>{{scope.row[scope.column.property] || '无'}}</div>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip v-else-if="!item.hidden && !item.filters && item.format" :key="index" :label="item.label" :formatter="anyFmt" :prop="item.prop" :header-align="item.headerAlign || 'center'" :align="item.align || 'center'" :sortable="item.sort || false"  :min-width="item.minWidth || 150">
        </el-table-column>
        <el-table-column show-overflow-tooltip v-else-if="!item.hidden && item.filters" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign || 'center'" :align="item.align || 'center'" :sortable="item.sort" :filters="item.filters" :filter-method="filterTag"  :min-width="item.minWidth || 200">
            <template slot-scope="scope">
                <el-tag
                    class="tag"
                    type="primary"
                    close-transition 
                    v-for="(tag, index) in scope.row.type" :key="index">{{tag}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="250">
            <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="size_scoped"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="studentTotal">
    </el-pagination>
    <EditComponent v-if="editShow" :info="studentInfo" :data=12 @close="close"></EditComponent>

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
                keyword: '',
                editShow: false,
                studentInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 10,
                conditions: {},
                fields: {},
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
            this.getStudentList()
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
                    var tStr = CodeToText[codeArr[index]];
                    returnStr += ("全部" == tStr)?"":tStr;
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
                let conditions = this.exportStudentListFields[4].conditions;
                conditions.schoolCode = this.schoolCode;
                try {
                    await this.$store.dispatch('getStudentList', {
                        keyword: this.keyword,
                        conditions: conditions,
                        fields: this.exportStudentListFields[4].fields,
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
            clearStudentData() {
                this.$confirm('将清空所有在校生的信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try {
                        await this.$store.dispatch('delAllStudents', this.schoolCode)
                        // this.studentList = [];
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
            changeSort (val) {
                console.log(val);
            }
        },
        computed: {
            ...mapGetters([
                'studentList',
                'studentTotal',
                'sexTypes',
                'ethnics',
                'nations',
                'relations',
                'exportStudentListFields',
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
    }
</style>
