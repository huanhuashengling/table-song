import axios from 'src/utils/fetch'
import { blogTypes, sexTypes, ethnics, nations, healthStatuses, householdTypes, politicalStatuses, switchStates} from './classify'
import { studentSources, notMainlands, admissionModes, bloodTypes, residentTypes, leftChildrenTypes, vehicles} from './classify'
import { relations } from './classify'

const music = {
	state: {
		blogTypes,
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
		bloodTypes,
		list: [],
		total: 0
	},
	mutations: {
		BLOGLIST (state, data) {
			state.list = data.data.list;
			state.total = data.data.total;
		}
	},
	actions: {
		addBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('blog/add', info)
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},

		getBlogList ({commit}, params) {
			return new Promise( (resolve, reject) => {
				axios.get('blog/list', params)
					.then( res => {
						commit('BLOGLIST', res)
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		delBlog ({commit}, id) {
			return new Promise( (resolve, reject) => {
				axios.get('blog/del', {id: id})
					.then( res => {
						resolve(res)
					}).catch( err => {
						reject(err)
					})
			})
		},
		updateBlog ({commit}, info) {
			return new Promise( (resolve, reject) => {
				axios.postFile('blog/update', info)
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