<template>
    <el-dialog title="学籍信息更新" :visible.sync="dialogTableVisible" class="edit-wrapper" @close="close" width="80%">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
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
                        <el-select v-model="info.ethnic" clearable placeholder="请选择民族" class="block">
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
                        v-model="birthPlaceCodeToArray"
                        @change="handleBirthPlaceChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="籍贯" prop="grandPlaceCode">
                        <el-cascader
                        size="large"
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
                    <el-form-item label="身份证件类型" prop="IDType">
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
                    <el-form-item label="上下学距离(公里)" prop="distance">
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
                        v-model="householdPlaceCode1ToArray"
                        @change="handleHouseholdPlace1Change">
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
                        v-model="householdPlaceCode2ToArray"
                        @change="handleHouseholdPlace2Change">
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
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :loading="loading">更新</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>


<script>
    import { mapGetters } from 'vuex'
    // import Markdown from 'components/Markdown'
    import { checkIdNum } from 'src/utils/rules'
    import { regionData } from 'element-china-area-data'
    export default {
        // components: { Markdown },
        props: ['info'],
        data() {
            // alert(console.log(info));
            return {
                
                birthPlaceOptions: regionData,
                householdPlaceOptions: regionData,
                grandPlaceOptions: regionData,
                dialogTableVisible: true,
                loading: false,
                rules: {
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
                    type: [
                        { required: true, message: '请选择身份证件类型', trigger: 'change', type: 'string' }
                    ],
                    studentID: [
                        { required: true, message: '请填写身份证件号码', trigger: 'change', type: 'string' },
                        { message: '请填写正确身份证件号码', validator: checkIdNum, trigger: 'change', type: 'string' },
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
        methods: {
            close() {
                this.$emit('close')
            },
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate( async (valid) => {
                    console.log(this.info)
                    if (valid) {
                        try {
                            await this.$store.dispatch('updateStudent', this.info);
                            this.loading = false;
                            // this.$router.push('/music/list');
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
                if ("string" == typeof(value)) {
                    return value.split(",");
                } else {
                    return value;
                }
            }
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
    .edit-wrapper {
        .block {
            width: 100%;
            display: block;
        }
        .form {
            // width: 400px;
        }
        .submit {
            width: 100px;
        }
    }
</style>