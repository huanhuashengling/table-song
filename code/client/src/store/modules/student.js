import axios from '../../utils/fetch'
import { IDTypes, sexTypes, ethnics, nations, healthStatuses, householdTypes, politicalStatuses, switchStates} from './classify'
import { studentSources, notMainlands, admissionModes, bloodTypes, residentTypes, leftChildrenTypes, vehicles} from './classify'
import { relations, disabilities, mainstreams, nameDescDatas, gradeDescs, classDescs, exportStudentListFields, applyTypes } from './classify'

const student = {
    state: {
        IDTypes,
		sexTypes,
		nations,
		healthStatuses,
		ethnics,
		studentSources,
		householdTypes,
		politicalStatuses,
		leftChildrenTypes,
		notMainlands, 
		admissionModes, 
		vehicles, 
		switchStates,
		residentTypes,
		relations,
		disabilities, 
		mainstreams,
		bloodTypes,
		nameDescDatas,
		gradeDescs,
		classDescs,
		applyTypes,
		exportStudentListFields,
        list: [],
        homeList: [],
        info: {},
        currType: '',
        pagesize: 5,
        loadingMore: false,
        loadingBol: true
    },
    mutations: {
        SEARCHSTUDENT (state, res) {
            state.student = res;
        },
        STUDENTINFO (state, res) {
            state.info = res.data;
        }
    },
    actions: {
        //更新一个学生信息
        addStudent ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.post('student/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
        //更新一个学生信息
        updateStudent ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.post('student/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
        // 搜索学生
        searchStudent ({commit}, params) {
            return new Promise( (resolve, reject) => {
                axios.get('student/info', params).
                    then( res => {
                        if(!res.data.studentName) {
                            res.data = {
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
            
                                isPre: '01',                     //    区分在校学生和未注册学籍的学生
                            }
                        }
                        commit('STUDENTINFO', res)
                        // console.log(res);
                        resolve(res)
                    }).catch( err => {
                        // console.log(err)
                        reject(err)
                    })
            })
        }
    }
}
export default student