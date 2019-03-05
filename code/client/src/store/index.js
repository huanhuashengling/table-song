import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import student from './modules/student'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        student
    },
    getters
})

export default store;