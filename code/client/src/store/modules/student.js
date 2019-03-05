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
        // 获取博客列表
        async getBlogList ({commit, state}, params) {
            
            params.pagesize = params.pagesize || state.pagesize 
            params.type = params.type === 'all' ? null:params.type 
            state.loadingMore = true
            state.loadingBol = false
            return new Promise( (resolve, reject) => {
                axios.get('blog/list', params).
                    then( res => {
                        state.loadingMore = false;
                        resolve(res)
                        if (res.data.length <= 0 && params.pageindex > 1) return
                        if (params.pageindex > 1) {
                            commit('BLOGLIST', state.list.concat(res.data))
                        }else {
                            commit('BLOGLIST', res.data)
                        }
                        if (res.data.length >= state.pagesize) {
                            state.loadingBol = true;
                        }
                    }).catch( err => {
                        // console.log(err)
                        reject(err)
                    })
            })
        },
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
                        commit('STUDENTINFO', res)
                        console.log(res);
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