import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        menuShow: false,
        titleList: [],
        doc:'',
        _id: 0
    },
    mutations: {
        menuLogin (state, payload){
            state.menuShow = payload.menuShow
        },
        changTitleList (state, payload){
            //console.log(payload.titleList)
            state.titleList = payload.titleList
        },
        changeNote (state, payload){
            state.doc = payload.doc
        },
        changeId (state, payload){
            state._id = payload._id
        }
    },
    actions: {
        titleList ({commit}, payload){//{commit}其实是解构了context
            //console.log(payload.category+','+payload.type)
            let category = payload.category
            let type = payload.type
            axios.post('/api/list',{category,type})
            .then(function(res){
                //console.log(res.data)
                commit('changTitleList',{titleList: res.data.msg})
            })
            .catch(function(err){
                console.log(err)
            })
        },
        actNote ({commit}, payload){
            let {_id} = payload
            axios.post('/api/note',{_id})
            .then(function(res){
                commit('changeNote',{doc: res.data.msg[0].doc})
                commit('changeId',{_id})
            })
            .catch(function(err){
                console.log(err)
            })
        }
    }
})

export default store