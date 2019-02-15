import axios from 'src/utils/fetch'
import { IDTypes, sexTypes, ethnics, nations, healthStatuses, householdTypes, politicalStatuses, switchStates} from './classify'
import { studentSources, notMainlands, admissionModes, bloodTypes, residentTypes, leftChildrenTypes, vehicles} from './classify'
import { relations, disabilities, mainstreams, nameDescDatas } from './classify'

const music = {
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
		list: [],
		total: 0
	},
	mutations: {
		STUDENTLIST (state, data) {
			state.list = data.data.list;
			state.total = data.data.total;
		}
	},
	actions: {
		addStudent ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('student/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},

		getStudentList ({commit}, params) {
			return new Promise( (resolve, reject) => {
				axios.get('student/list', params)
					.then( res => {
						commit('STUDENTLIST', res)
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		delStudent ({commit}, id) {
			return new Promise( (resolve, reject) => {
				axios.get('student/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateStudent ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('student/update', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		}
	}
}
export default music