<template>
    <el-row>
        <el-col :span="16" :offset="4">
            
            <el-row style="padding-top:20px" :gutter="20">
                <el-col :span="4">
                    <el-input placeholder="请输入新生姓名" :clearable="true" v-model="searchInfo.studentName"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入新生身份证号" :clearable="true" v-model="searchInfo.studentID"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" :loading="loading" @click="searchStudent">检索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" :loading="loading" @click="clearForm">清空所有数据</el-button>
                </el-col>
            </el-row>
            <el-row style="padding-top:20px" :gutter="10">
                <el-col :span="6">
                    <h2>学校名称：芙蓉区燕山小学</h2>
                </el-col>
                <el-col :span="6">
                    <h2>学校标识码：2143019582</h2>
                </el-col>
                <el-col :span="12">
                    <h2>承诺：本网页搜集的信息只保存在校内，只做学籍注册用途</h2>
                </el-col>
            </el-row>
            <el-row style="padding-top:20px">
                
                <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
                    报名信息<hr><br />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="现场报名编号" prop="liveApplyNum">
                                <el-input type="text" v-model="info.liveApplyNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="报名类型" prop="applyType">
                                <el-select v-model="info.applyType" clearable placeholder="请选择报名类型" class="block">
                                    <el-option v-for="item in applyTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item label="报名电话" prop="applyPhoneNumber">
                                <el-input type="text" v-model="info.applyPhoneNumber"></el-input>
                            </el-form-item>
                        </el-col> -->
                    </el-row>
                    学生个人基础信息<hr><br />
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="学生姓名" prop="studentName">
                                <el-input type="text" v-model="info.studentName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别" prop="sexType">
                                <el-select v-model="info.sexType" clearable placeholder="请选择性别" class="block">
                                    <el-option v-for="item in sexTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="民族" prop="ethnic">
                                <el-select v-model="info.ethnic" clearable placeholder="请选择民族" class="block">
                                    <el-option v-for="item in ethnics" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系电话" prop="contactPhoneNumber">
                                <el-input type="text" v-model="info.contactPhoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="出生地" prop="brithPlaceCode">
                                <el-cascader
                                style="width: 260px"
                                :options="birthPlaceOptions"
                                v-model="birthPlaceCodeToArray"
                                @change="handleBirthPlaceChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="籍贯" prop="grandPlaceCode">
                                <el-cascader
                                style="width: 260px"
                                :options="grandPlaceOptions"
                                v-model="grandPlaceCodeToArray"
                                @change="handleGrandPlaceChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="国籍/地区" prop="nation">
                                <el-select v-model="info.nation" clearable placeholder="请选择国籍/地区" class="block">
                                    <el-option v-for="item in nations" :key="item.code" :label="item.en + ' ' + item.cn" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="港澳台侨外" prop="notMainland">
                                <el-select v-model="info.notMainland" clearable placeholder="港澳台侨外" class="block">
                                    <el-option v-for="item in notMainlands" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证类型" prop="IDType">
                                <el-select v-model="info.IDType" clearable placeholder="请选择身份证类型" class="block">
                                    <el-option v-for="item in IDTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="studentID">
                                <el-input type="text" v-model="info.studentID"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    学生个人辅助信息<hr><br />
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="户口所在地" prop="householdPlaceCode">
                                <el-cascader
                                style="width: 260px"
                                :options="householdPlaceOptions"
                                v-model="householdPlaceCodeToArray"
                                @change="handleHouseholdPlaceChange">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="社区" prop="community">
                                <el-input type="text" v-model="info.community" placeholder="{街道/社区}{乡镇/村}"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="户口性质" prop="householdType">
                                <el-select v-model="info.householdType" clearable placeholder="请选择户口性质" class="block">
                                    <el-option v-for="item in householdTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                    <el-col :span="12">
                            <el-form-item label="特长" prop="strongPoint">
                                <el-input type="text" v-model="info.strongPoint"></el-input>
                            </el-form-item>
                        </el-col>
                        </el-row>
                    学生学籍基本信息<hr><br />
                    学生个人联系信息<hr><br />
                    <el-row>
                        <el-col :span="19">
                            <el-form-item label="现住址" prop="address">
                                <el-input type="text" v-model="info.address" placeholder="省市(区/县)(街道社区镇村)到门牌号，同时默认为通讯地址和家庭地址"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="邮政编码" prop="postalCode">
                                <el-input type="text" v-model="info.postalCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    学生个人扩展信息<hr><br />
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="独生子女" prop="isOneChild" class="left-item">
                                <el-select v-model="info.isOneChild" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否双女户" prop="hasDoubleGirls" class="left-item">
                                <el-select v-model="info.hasDoubleGirls" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="留守儿童" prop="leftChildrenType" class="left-item">
                                <el-select v-model="info.leftChildrenType" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in leftChildrenTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="进城务工随迁子女" prop="withEnterCities" class="left-item">
                                <el-select v-model="info.withEnterCities" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    学生上下学交通方式<hr><br />
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="上下学距离(公里)" prop="distance">
                                <el-input type="text" v-model="info.distance" placeholder="公里"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="乘坐校车" prop="schoolbus" class="left-item">
                                <el-select v-model="info.schoolbus" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="交通方式" prop="vehicle">
                                <el-select v-model="info.vehicle" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in vehicles" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
        学生家庭成员或监护人信息一<hr><br />
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名" prop="keeper1Name">
                                <el-input type="text" v-model="info.keeper1Name" placeholder="监护人1姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="关系" prop="relation1">
                                <el-select v-model="info.relation1" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in relations" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="户口所在地" prop="householdPlaceCode1">
                                <el-cascader
                                style="width: 260px"
                                :options="householdPlaceOptions"
                                v-model="householdPlaceCode1ToArray"
                                @change="handleHouseholdPlace1Change">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="是否监护人" prop="keeper1" class="left-item">
                                <el-select v-model="info.keeper1" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="联系电话" prop="contact1PhoneNumber">
                                <el-input type="text" v-model="info.contact1PhoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证类型" prop="keeper1IDType">
                                <el-select v-model="info.keeper1IDType" clearable placeholder="请选择身份证类型" class="block">
                                    <el-option v-for="item in IDTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="keeper1ID">
                                <el-input type="text" v-model="info.keeper1ID"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="工作单位" prop="keeper1Workplace">
                                <el-input type="text" v-model="info.keeper1Workplace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="现住址" prop="address1">
                                <el-input type="text" v-model="info.address1" placeholder="可与学生一致，要到门牌号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
        学生家庭成员或监护人信息二<hr><br />
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名" prop="keeper2Name">
                                <el-input type="text" v-model="info.keeper2Name" placeholder="监护人2姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="关系" prop="relation2">
                                <el-select v-model="info.relation2" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in relations" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="户口所在地" prop="householdPlaceCode2">
                                <el-cascader
                                style="width: 260px"
                                :options="householdPlaceOptions"
                                v-model="householdPlaceCode2ToArray"
                                @change="handleHouseholdPlace2Change">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="是否监护人" prop="keeper2" class="left-item">
                                <el-select v-model="info.keeper2" clearable placeholder="请选择" class="block">
                                    <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="联系电话" prop="contact2PhoneNumber">
                                <el-input type="text" v-model="info.contact2PhoneNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="身份证类型" prop="keeper2IDType">
                                <el-select v-model="info.keeper2IDType" clearable placeholder="请选择身份证类型" class="block">
                                    <el-option v-for="item in IDTypes" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="keeper2ID">
                                <el-input type="text" v-model="info.keeper2ID"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="工作单位" prop="keeper2Workplace">
                                <el-input type="text" v-model="info.keeper2Workplace"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="现住址" prop="address2">
                                <el-input type="text" v-model="info.address2" placeholder="可与学生一致，要到门牌号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button v-if="isUpdate" type="primary" @click="submitUpdateForm('form')" :loading="loading">更新</el-button>
                        <el-button v-if="isAdd" type="primary" @click="submitAddForm('form')" :loading="loading">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { checkID } from 'src/utils/rules'
    import { regionData } from 'element-china-area-data'
    export default {
        name: 'student',
        // props: ['info'],
        data () {
            return {
                birthPlaceOptions: regionData,
                householdPlaceOptions: regionData,
                grandPlaceOptions: regionData,
                dialogTableVisible: true,
                loading: false,
                errors: [],
                isAdd: false,
                isUpdate: false,
                searchInfo: {
                        // studentName: "",毛雅钧 4301022007280045
                        studentName: "邓楠馨",
                        // studentID: "",430104201201140096
                        studentID: "430102201207280046",
                    },
                rules: {
                    //------报名信息
                    liveApplyNum: [
                        { required: true, message: '请填写报名编号', trigger: 'change', type: 'string' }
                    ],
                    applyType: [
                        { required: true, message: '请选择报名类型', trigger: 'change', type: 'string' }
                    ],
                    // applyPhoneNumber: [
                    //     { required: true, message: '请输入报名电话', trigger: 'change', }
                    // ],
                    //------学生个人基本信息
                    studentName: [
                        { required: true, message: '请填写学生姓名', trigger: 'change', type: 'string' }
                    ],
                    sexType: [
                        { required: true, message: '请选择性别', trigger: 'change', type: 'string' }
                    ],
                    brithPlaceCode: [
                        { required: true, message: '请选择出生地', trigger: 'change', }
                    ],
                    grandPlaceCode: [
                        { required: true, message: '请选择籍贯', trigger: 'change', }
                    ],
                    ethnic: [
                        { required: true, message: '请选择民族', trigger: 'change', type: 'string' }
                    ],
                    nation: [
                        { required: true, message: '请选择国籍/地区', trigger: 'change', type: 'string' }
                    ],
                    contactPhoneNumber: [
                        { required: true, message: '请填写联系电话', trigger: 'change', type: 'string' }
                    ],
                    notMainland: [
                        { required: true, message: '请选择', trigger: 'change', type: 'string' }
                    ],
                    IDType: [
                        { required: true, message: '请选择身份证类型', trigger: 'change', type: 'string' }
                    ],
                    studentID: [
                        { required: true, message: '请填写身份证件号码', trigger: 'change', type: 'string' },
                        { message: '请填写正确身份证件号码', validator: checkID, trigger: 'change', type: 'string' },
                    ],
                    //------学生个人辅助信息
                    householdPlaceCode: [
                        { required: true, message: '请选择户口所在地', trigger: 'change', }
                    ],
                    householdType: [
                        { required: true, message: '请选择户口性质', trigger: 'change' }
                    ],
                    community: [
                        { required: true, message: '请填写社区信息', trigger: 'change' }
                    ],
                    //------学生个人联系方式
                    address: [
                        { required: true, message: '请填现住址', trigger: 'change', type: 'string' }
                    ],
                    postalCode: [
                        { required: true, message: '请填邮政编码', trigger: 'change', type: 'string' }
                    ],
                    //------学生个人扩展信息
                    isOneChild: [
                        { required: true, message: '请选择', trigger: 'change', type: 'string' }
                    ],
                    leftChildrenType: [
                        { required: true, message: '请选择', trigger: 'change', type: 'string' }
                    ],
                    withEnterCities: [
                        { required: true, message: '请选择', trigger: 'change', type: 'string' }
                    ],
                    hasDoubleGirls: [
                        { required: true, message: '请选择', trigger: 'change', type: 'string' }
                    ],
                    //-------学生家庭成员或监护人信息一
                    keeper1Name: [
                        { required: true, message: '请填写', trigger: 'change', }
                    ],
                    relation1: [
                        { required: true, message: '请选择', trigger: 'change', }
                    ],
                    keeper1: [
                        { required: true, message: '请选择', trigger: 'change', }
                    ],
                    keeper1IDType: [
                        { required: true, message: '请选择', trigger: 'change', }
                    ],
                    keeper1ID: [
                        { required: true, message: '请填写身份证件号码', trigger: 'change', },
                        { message: '请填写正确身份证件号码', validator: checkID, trigger: 'change', type: 'string' },
                    ],
                    householdPlaceCode1: [
                        { required: true, message: '请选择户口所在地', trigger: 'change', }
                    ],
                    contact1PhoneNumber: [
                        { required: true, message: '请填联系电话', trigger: 'change', }
                    ],
                    address1: [
                        { required: true, message: '请填写现住址', trigger: 'change', }
                    ],
                    //-------学生家庭成员或监护人信息二
                    keeper2Name: [
                        { required: true, message: '请填写', trigger: 'change', }
                    ],
                    relation2: [
                        { required: true, message: '请选择', trigger: 'change', }
                    ],
                    keeper2: [
                        { required: true, message: '请选择', trigger: 'change', }
                    ],
                    keeper2IDType: [
                        { required: true, message: '请选择', trigger: 'change', },
                    ],
                    keeper2ID: [
                        { required: true, message: '请填写身份证件号码', trigger: 'change', },
                        { message: '请填写正确身份证件号码', validator: checkID, trigger: 'change', type: 'string' },
                    ],
                    householdPlaceCode2: [
                        { required: true, message: '请选择户口所在地', trigger:'change', }
                    ],
                    contact2PhoneNumber: [
                        { required: true, message: '请填联系电话', trigger: 'change', }
                    ],
                    address2: [
                        { required: true, message: '请填写现住址', trigger: 'change', }
                    ],
                }
            }
        },
        created () {
            // this.getBlogData()
        },
        mounted () {
            // window.addEventListener('scroll', () => {
            //     let distance = document.documentElement.scrollTop || document.body.scrollTop,
            //         winH = document.documentElement.clientHeight || document.body.clientHeight,
            //         scrollH = document.documentElement.scrollHeight || document.body.scrollHeight;
                
            //     if (distance+winH >= scrollH) {
            //         if (this.blogLoadingBol) {
            //             this.pageindex ++;
            //             this.$store.dispatch('getBlogList', {
            //                 type: this.$route.params.classify,
            //                 pageindex: this.pageindex
            //             })
            //         }
            //     }
            // })
        },
        methods: {
            async clearForm() {
                this.searchInfo.studentName = "";
                this.searchInfo.studentID = "";
                this.isAdd = false;
                this.isUpdate = false;
                await this.$store.dispatch('searchStudent', this.searchInfo);
            },
            async searchStudent() {
                await this.$store.dispatch('searchStudent', this.searchInfo);
                // console.log(this.info.studentName);
                if (this.info.studentName) {
                    this.isUpdate = true;
                    this.isAdd = false;
                    this.open("成功找到记录，请继续完善"+this.info.studentName+"的学籍信息！");
                } else {
                    this.isAdd = true;
                    this.isUpdate = false;
                    this.open("没有找到相关记录，请重新录入新生学籍信息！");
                }
            },
            submitAddForm(formName) {
                this.$refs[formName].validate( async (valid) => {
                    // console.log(this.info)
                    if (valid) {
                        this.loading = true;
                        try {
                            await this.$store.dispatch('addStudent', this.info);
                            this.loading = false;
                            this.open(this.info.studentName + "学籍信息录入成功！");
                            this.close()
                        }catch (e) {
                            this.loading = false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitUpdateForm(formName) {
                this.$refs[formName].validate( async (valid) => {
                    // console.log(this.info)
                    if (valid) {
                        this.loading = true;
                        try {
                            await this.$store.dispatch('updateStudent', this.info);
                            this.loading = false;
                            this.open("学籍信息更新成功！");
                            this.close();
                        }catch (e) {
                            this.loading = false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleBirthPlaceChange (value) {
                this.birthPlaceCodeToArray = value;
                console.log(value[2])
            },
            handleGrandPlaceChange (value) {
                this.grandPlaceCodeToArray = value;
                console.log(value[1])
            },
            handleHouseholdPlaceChange (value) {
                this.householdPlaceCodeToArray = value;
                console.log(value[1])
            },
            handleHouseholdPlace1Change (value) {
                this.householdPlaceCode1ToArray = value;
                console.log(value[1])
            },
            handleHouseholdPlace2Change (value) {
                this.householdPlaceCode2ToArray = value;
                console.log(value[1])
            },
            arrayConfirm (value) {
                if ("" != value) {
                    // console.log(value);
                    if ("string" == typeof(value)) {
                        return value.split(",");
                    } else {
                        return value;
                    }
                } else {
                    return [];
                }
            },
            open(msg) {
                this.$message(msg);
            },
        },
        computed: {
            birthPlaceCodeToArray: {
                get(){
                    return this.arrayConfirm(this.info.brithPlaceCode);
                },
                set(value){
                    this.info.brithPlaceCode = value;
                }
            },
            grandPlaceCodeToArray: {
                get(){
                    return this.arrayConfirm(this.info.grandPlaceCode);
                },
                set(value){
                    this.info.grandPlaceCode = value;
                }
            },
            householdPlaceCodeToArray: {
                get(){
                    return this.arrayConfirm(this.info.householdPlaceCode);
                },
                set(value){
                    this.info.householdPlaceCode = value;
                }
            },
            householdPlaceCode1ToArray: {
                get(){
                    return this.arrayConfirm(this.info.householdPlaceCode1);
                },
                set(value){
                    this.info.householdPlaceCode1 = value;
                }
            },
            householdPlaceCode2ToArray: {
                get(){
                    return this.arrayConfirm(this.info.householdPlaceCode2);
                },
                set(value){
                    this.info.householdPlaceCode2 = value;
                }
            },
            ...mapGetters([
                'info',
                // 'blogLoadingMore',
                // 'blogLoadingBol',
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
                'applyTypes',
            ])
        },
        watch: {
            $route (to, from) {
                // this.getBlogData()
            }
        }
    }
</script>
<style lang="less" scoped>
    .bg-image-cover(@bgCover) {
        background: @vice-color;
        background-image: url(@bgCover);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }
    .blog-wrapper {
        @keyframes change {
            100% {opacity: 1;}
        }
        .article {
            width: 7rem;
            max-width: 500px;
            padding-bottom: 70px;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
            margin: 30px auto;
            transition: box-shadow .4s;
            position: relative;
            opacity: 0.1;
            animation: change 1s;
            animation-fill-mode: forwards;
            color: #42484b;
            background-image: url('../../images/note-bg.jpg');
            
        
            &:hover {
                box-shadow: 5px 15px 30px 5px rgba(0, 0, 0, 0.15);
            }

            .github {
                position: absolute;
                right:0;top:0;
            }
            time {
                position: absolute;
                bottom: 35px;left:0;
                width: 150px;
                height: 34px;
                text-align: center;
                line-height: 34px;
                font-size: 14px;
                .bg-image-cover('../../images/date-bg.svg');
                &:before {
                    content: url('../../images/date-edge.svg');
                    position: absolute;
                    top:0px;right:calc(100% - 2px);
                    width: 11px;
                    height: 100%;
                }
                &:after {
                    content: url('../../images/date-tag.svg');
                    position: absolute;
                    top:0;left:calc(100% - 1px);
                    width: 13px;
                    height: 100%;
                }
                @media screen and (max-width: @pc-width){
                    &:before {
                        right:e("calc(100% - 0.07rem)");
                        top: -0.02rem;
                    }
                    &:after {
                        left: e("calc(100% - 0.02rem)");
                    }
                }
            }
            .name {
                text-align: center;
                color: @theme-red-color;
                line-height: 30px;
                padding-top: 10px;
            }
            .tags {
                display: block;
                text-align: center;
                font-size: 12px;
                line-height: 20px;
                padding-bottom: 5px;
                text-align: center;
            }
            .desc {
                width: 70%;
                min-height:90px;
                margin: 0 auto;
                font-size: 14px;
                text-align: left;
                line-height: 30px;
                text-align:justify;
                span {
                    color: #b2b2ae;
                    font-size: 12px;

                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            .source {
                width: 70%;
                margin: 0 auto;
                text-align: right;
                img {
                    width: 30px;
                }
            
            }
            .btns {
                position: absolute;
                bottom:0;
                left:0;
                width: 100%;
                padding: 10px 0;
                text-align: right;
            }
        }
    }

</style>