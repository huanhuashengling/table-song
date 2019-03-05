<template>
    <el-row>
        <el-col :span="16" :offset="4">
        <div class="search">
            <el-input placeholder="请输入新生姓名" v-model="info.studentName"></el-input>
            <el-input placeholder="请输入新生身份证号" v-model="info.studentID"></el-input>
            <el-button type="primary" icon="el-icon-search" :loading="loading" @click="searchStudent">检索</el-button>
        </div>
        </el-col>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        name: "search",
        data() {
            return {
                info: {
                        studentName: "邓楠馨",
                        studentID: "430102201207280046",
                    },
                loading: false,
            }
        },
        mounted () {

        },
        methods: {
            searchStudent() {
                let data = this.$store.dispatch('searchStudent', this.info);
                console.log(data);
            }
        },
        computed: {
            ...mapGetters([
            ])
        }
    }
</script>

<style lang="less" scoped>
    .search {
            padding-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }

</style>