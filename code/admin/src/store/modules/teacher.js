import axios from 'src/utils/fetch'
import { IDTypes, sexTypes, ethnics, politicalStatuses, switchStates, teacherNameDescDatas, exportTeacherListFields} from './classify'

const teacher = {
	state: {
		IDTypes,
		sexTypes,
		ethnics,
		politicalStatuses,
		switchStates,
		teacherNameDescDatas,
		exportTeacherListFields,
		teacherList: [],
		oneTeacher: {},
		teacherTotal: 0
	},
	mutations: {
		TEACHERLIST (state, data) {
			state.teacherList = data.data.list;
			state.teacherTotal = data.data.total;
		},
		ONETEACHER (state, data) {
			console.log(data.data)
			state.oneTeacher = data.data;
		}
	},
	actions: {
		addTeacher ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('teacher/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},

		findOneTeacher ({commit}, params) {
			return new Promise( (resolve, reject) => {
				axios.get('teacher/findOne', params)
					.then( res => {
						commit('ONETEACHER', res)
						// console.log(res.data)
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},

		getTeacherList ({commit}, params) {
			// console.log(params);
			return new Promise( (resolve, reject) => {
				axios.get('teacher/list', params)
					.then( res => {
						commit('TEACHERLIST', res)
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		delTeacher ({commit}, id) {
			return new Promise( (resolve, reject) => {
				axios.get('teacher/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateTeacher ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('teacher/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		}
	}
}
export default teacher