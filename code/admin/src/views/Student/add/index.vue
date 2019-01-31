<template>
<article>
    <el-row>
        <el-col :span="8">
            <h2>学校名称：长沙市芙蓉区燕山小学</h2>
        </el-col>
        <el-col :span="8">
            <h2>学校标识码：2143019582</h2>
        </el-col>
        <el-col :span="8">
            <h2>信息保密协议</h2>
        </el-col>
    </el-row>
    <div class="box">
        学生个人基础信息<hr><br />
        <el-form :model="info" :rules="rules" ref="form" label-width="110px" class="form">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="学生姓名" prop="studentName">
                        <el-input type="text" v-model="info.studentName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="性别" prop="sexType">
                        <el-select v-model="info.sexType" clearable placeholder="请选择性别" class="block">
                            <el-option v-for="item in sexTypes" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="民族" prop="ethnic">
                        <el-select v-model="info.ethnic" clearable placeholder="请选择性别" class="block">
                            <el-option v-for="item in ethnics" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="联系电话" prop="contactPhoneNumber">
                        <el-input type="text" v-model="info.contactPhoneNumber"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="出生地" prop="brithPlaceCode">
                        <el-cascader
                        size="medium"
                        :options="birthPlaceOptions"
                        v-model="info.brithPlaceCode"
                        @change="handleBirthPlaceChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="籍贯" prop="grandPlaceCode">
                        <el-cascader
                        size="large"
                        :options="grandPlaceOptions"
                        v-model="info.grandPlaceCode"
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
                    <el-form-item label="身份证件类型" prop="type">
                        <el-select v-model="info.IDType" clearable placeholder="请选择身份证件类型" class="block">
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
                        size="large"
                        :options="householdPlaceOptions"
                        v-model="info.householdPlaceCode"
                        @change="handleHouseholdPlaceChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="街道/社区/乡镇" prop="usedStudentName">
                        <el-input type="text" v-model="info.usedStudentName"></el-input>
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
                <el-col :span="4">
                    <el-form-item label="是否独生子女" prop="isOneChild" class="left-item">
                        <el-select v-model="info.isOneChild" clearable placeholder="请选择" class="block">
                            <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="是否双女户" prop="hasDoubleGirls" class="left-item">
                        <el-select v-model="info.hasDoubleGirls" clearable placeholder="请选择" class="block">
                            <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否留守儿童" prop="leftChildrenType" class="left-item">
                        <el-select v-model="info.leftChildrenType" clearable placeholder="请选择" class="block">
                            <el-option v-for="item in leftChildrenTypes" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
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
                <el-col :span="4">
                    <el-form-item label="上下学距离" prop="distance">
                        <el-input type="text" v-model="info.distance" placeholder="公里"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item label="乘坐校车" prop="schoolbus" class="left-item">
                        <el-select v-model="info.schoolbus" clearable placeholder="请选择" class="block">
                            <el-option v-for="item in switchStates" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
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
                <el-col :span="6">
                    <el-form-item label="户口所在地" prop="householdPlaceCode1">
                        <el-cascader
                        size="large"
                        :options="householdPlaceOptions"
                        v-model="info.householdPlaceCode1"
                        @change="handleHouseholdPlaceChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
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
                <el-col :span="18">
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
                <el-col :span="6">
                    <el-form-item label="户口所在地" prop="householdPlaceCode2">
                        <el-cascader
                        size="large"
                        :options="householdPlaceOptions"
                        v-model="info.householdPlaceCode2"
                        @change="handleHouseholdPlaceChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
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
                <el-col :span="18">
                    <el-form-item label="现住址" prop="address2">
                        <el-input type="text" v-model="info.address2" placeholder="可与学生一致，要到门牌号"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <p v-if="errors.length">
                <b>请先修改以下内容:</b>
                <ul>
                <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <el-form-item>
                <el-button type="primary" @click="saveForm('form')" :loading="loading">保存内容</el-button>
                <el-button type="primary" @click="submitForm('form')" :loading="loading">确认提交</el-button>
            </el-form-item>

        </el-form>
    </div>
</article>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Markdown from 'components/Markdown'
    import { checkIdNum } from 'src/utils/rules'
    import { regionData } from 'element-china-area-data'
    import { provinceAndCityData } from 'element-china-area-data'
    export default {
        // components: { Markdown },
        data() {
            return {
                errors: [],
                info: {
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
                    type: '01',                     //8  身份证件类型     默认居民身份证
                    studentID: '',                  //9  身份证号
                    politicalStatus: '01',          //11  政治面貌    不显示  默认少先队员
                    healthStatus: '01',             //12  健康状况    不显示  默认健康或良好
                    //------学生个人辅助信息
                    householdPlaceCode: [],         //17  户口所在地
                    householdType: '',              //18  户口性质
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
                    hasDoubleGirls: '',             //    是否双女户
                    //------学生上下学交通方式
                    distance: '',                   //46  上下学距离
                    vehicle: '',                    //47  交通方式
                    schoolbus: '02',                //48  是否需要校车
                    //-------学生家庭成员或监护人信息一
                    keeper1Name: '',                //49  监护人1姓名
                    relation1: '01',                //50  监护人1关系
                    relation1desc: '',              //51  监护人1关系说明
                    keeper1ethnic: '',              //52  监护人1民族
                    keeper1workplace: '',           //53  监护人1工作单位
                    address1: '',                   //54  监护人1现住址
                    householdPlaceCode1: [],        //55  监护人1户口所在地
                    contact1PhoneNumber: '',        //56  监护人1联系电话
                    keeper1: '02',                  //57  是否是监护人
                    keeper1IDtype: '',              //58  监护人1身份证类型
                    keeper1ID: '',                  //59  监护人1身份证号码
                    keeper1position: '',            //60  监护人1职务
                    //-------学生家庭成员或监护人信息二
                    keeper2Name: '',                //61  监护人2姓名
                    relation2: '01',                //62  监护人2关系
                    relation2desc: '',              //63  监护人2关系说明
                    keeper2ethnic: '',              //64  监护人2民族
                    keeper2workplace: '',           //65  监护人2工作单位
                    address2: '',                   //66  监护人2现住址
                    householdPlaceCode2: [],        //67  监护人2户口所在地
                    contact2PhoneNumber: '',        //68  监护人2联系电话
                    keeper2: '02',                  //69  是否是监护人
                    keeper2IDtype: '',              //70  监护人2身份证类型
                    keeper2ID: '',                  //71  监护人2身份证号码
                    keeper2position: '',            //72  监护人2职务
                },
                birthPlaceOptions: regionData,
                householdPlaceOptions: regionData,
                grandPlaceOptions: provinceAndCityData,
                loading: false,
                rules: {
                    //------学生个人基本信息
                    studentName: [
                        { required: true, message: '请填写学生姓名', trigger: 'blur', type: 'string' }
                    ],
                    sexType: [
                        { required: true, message: '请选择性别', trigger: 'change', type: 'string' }
                    ],
                    brithPlaceCode: [
                        { required: true, message: '请选择出生地', trigger: 'change', type: 'array' }
                    ],
                    grandPlaceCode: [
                        { required: true, message: '请选择籍贯', trigger: 'change', type: 'array' }
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
                    type: [
                        { required: true, message: '请选择身份证件类型', trigger: 'change', type: 'string' }
                    ],
                    studentID: [
                        { required: true, message: '请填写身份证件号码', trigger: 'blur', type: 'string' },
                        { message: '请填写正确身份证件号码', validator: checkIdNum, trigger: 'blur', type: 'string' },
                    ],
                    //------学生个人辅助信息
                    householdPlaceCode: [
                        { required: true, message: '请选择户口所在地', trigger: 'change', type: 'array' }
                    ],
                    householdType: [
                        { required: true, message: '请选择户口性质', trigger: 'blur' }
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
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    relation1: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    keeper1: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    householdPlaceCode1: [
                        { required: true, message: '请选择户口所在地', trigger: 'blur', type: 'array' }
                    ],
                    contact1PhoneNumber: [
                        { required: true, message: '请填联系电话', trigger: 'blur' }
                    ],
                    address1: [
                        { required: true, message: '请填写现住址', trigger: 'blur' }
                    ],
                    //-------学生家庭成员或监护人信息二
                    keeper2Name: [
                        { required: true, message: '请填写', trigger: 'blur' }
                    ],
                    relation2: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    keeper2: [
                        { required: true, message: '请选择', trigger: 'blur' }
                    ],
                    householdPlaceCode2: [
                        { required: true, message: '请选择户口所在地', trigger: 'blur', type: 'array'  }
                    ],
                    contact2PhoneNumber: [
                        { required: true, message: '请填联系电话', trigger: 'blur' }
                    ],
                    address2: [
                        { required: true, message: '请填写现住址', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        try{
                            // this.info.html = this.info.markdown
                            await this.$store.dispatch('addStudent', this.info);
                            this.loading = false
                            this.$router.push('/student/list')
                        }catch(e) {
                            this.loading = false
                        }
                    } else {
                        console.log('error submit!!');
                        this.loading = false;
                        return false;
                    }
                });
            },
            handleBirthPlaceChange (value) {
                console.log(value[2])
            },
            handleGrandPlaceChange (value) {
                console.log(value[1])
            },
            handleHouseholdPlaceChange (value) {
                console.log(value[1])
            }
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
            ])
        }
    }
</script>


<style lang="less" scoped>
    article {
        text-align: center;
        padding: 0 100px;
        h2 {
            text-align: center;
            line-height: 80px;
            color: #666;
        }
        .block {
            width: 100%;
            display: block;
        }
        .left-item {
            text-align: left;
        }
        .form {
        }
        .submit {
            width: 100px;
        }
    }
</style>