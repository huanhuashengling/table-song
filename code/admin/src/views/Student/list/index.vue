<template>
<article>
    <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getStudentList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getStudentList">搜索</el-button>
    </div>
    <el-table ref="multipleTable" :data="studentList" tooltip-effect="dark" stripe border>
        <el-table-column show-overflow-tooltip type="index" width="55" align="center" header-align="center" :index="increment"></el-table-column>
        <el-table-column show-overflow-tooltip v-if="!item.hidden && !item.filters && !item.format" v-for="(item, index) in headerOptions" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"  :min-width="item.minWidth || 150">
            <template slot-scope="scope">
                <div>{{scope.row[scope.column.property] || '无'}}</div>
            </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip v-else-if="!item.hidden && !item.filters && item.format" :key="index" :label="item.label" :formatter="testFmt" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"  :min-width="item.minWidth || 150">
        </el-table-column>
        <el-table-column show-overflow-tooltip v-else-if="!item.hidden && item.filters" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort" :filters="item.filters" :filter-method="filterTag"  :min-width="item.minWidth || 200">
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
    <EditComponent v-if="editShow" :info="studentInfo" @close="close"></EditComponent>

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import EditComponent from '../edit/index'
    import { sexTypes, ethnics, nations } from 'store/modules/classify'
    import { CodeToText, TextToCode } from 'element-china-area-data'
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
                size_scoped: [10, 20, 30, 40],
                headerOptions: [
                    {
                        label: '_id',
                        prop: '_id',
                        hidden: true,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '身份证件号',
                        prop: 'studentID',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        // filters: studentFilters                   
                    },
                    {
                        label: '姓名',
                        prop: 'studentName',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '性别',
                        prop: 'sexType',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        format: true,
                        width: '',
                        sort: true,
                    },
                    {
                        label: '出生日期',
                        prop: 'birthDate',
                        hidden: false,
                        headerAlign: 'center',
                        format: true,
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '全国学籍号',
                        prop: 'nationalStudentNumber',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '年级',
                        prop: 'grade',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '班级',
                        prop: 'classNum',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '现住址',
                        prop: 'address',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '出生地',
                        prop: 'brithPlaceCode',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        format: true,
                        minWidth: '220'
                    },
                    {
                        label: '籍贯',
                        prop: 'grandPlaceCode',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        format: true,
                        minWidth: '150'
                    },
                    {
                        label: '国家地区',
                        prop: 'nation',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        format: true,
                        minWidth: '150'
                    },
                    {
                        label: '民族',
                        prop: 'ethnic',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        format: true,
                        minWidth: '150'
                    },
                    {
                        label: '联系电话',
                        prop: 'contactPhoneNumber',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    }
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
            codeFmt(codeArr) {
                var returnStr = "";
                for (let index = 0; index < codeArr.length; index++) {
                    returnStr += CodeToText[codeArr[index]];
                }
                return returnStr;
            },
            testFmt(row, column) {
                console.log(row);
                console.log(column.label);
                switch (column.label) {
                    case "性别":
                        return this.anyFmt(sexTypes, row.sexType);
                    break;
                    case "出生日期"://430181198410263456
                        var idStr = row.studentID;
                        return idStr.substring(6, 10)+"-"+idStr.substring(10, 12)+"-"+idStr.substring(12, 14);
                    break;
                    case "出生地":
                        var codeArr = row.brithPlaceCode.split(",");
                        return this.codeFmt(codeArr);
                    break;
                    case "籍贯":
                        var codeArr = row.grandPlaceCode.split(",");
                        return this.codeFmt(codeArr);
                    break;
                    case "民族":
                        return this.anyFmt(ethnics, row.ethnic);
                    break;
                    case "国家地区":
                        return this.nationFmt(nations, row.nation);
                    break;
                }
            },
            anyFmt(classDatas, key) {
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
                console.log(scope)
                this.editShow = true;
                scope.row.releaseTime = new Date(scope.row.releaseTime)
                this.blogInfo = scope.row
            },
            filterTag(value, row) {
                return row.type.some( v => v === value)
            }
        },
        computed: {
            ...mapGetters([
                'studentList',
                'studentTotal',
                'sexTypes',
                'ethnics',
                'nations'
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
