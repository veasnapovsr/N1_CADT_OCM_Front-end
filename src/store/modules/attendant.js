import crud from '../../api/crud'
import axios from "axios"

// initial state
const state = () => ({
  model: {
    name: "attendants" ,
    title: "វត្តមាន" 
  },
  records: [] ,
  record: null ,
})

// getters
const getters = {
  getRecords (state, getters, rootState) {
    return state.records
  },
  getRecord (state, getters, rootState) {
    return state.record
  }
}

// actions
const actions = {
  async list ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        date: params.date ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/read')
  },
  async readPhoto ({ state, commit, rootState },params) {
    // id is the checktime id
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checktime/"+params.id+'/readphoto')
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async checkinwithfinger ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkin/finter",params)
  },
  async checkinwithface ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkin/face",params)
  },
  async checkinwithsystem ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkin/system",params)
  },
  async checkoutwithfinger ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkout/finget",params)
  },
  async checkoutwithface ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkout/face",params)
  },
  async checkoutwithsystem ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkout/system",params)
  },
  async userAttendants({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + '/' + params.date + '/month/' + params.userId + '/user'
    )
  },
  async checkAttendant({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/checkattendantbyemailorphone",params)
  },
  async getAttendant({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/getattendantbyemailorphone/"+params.term+'/'+params.type)
  }
  // async requestFengshui({ state, commit, rootState },params) {
  //   return await axios({
  //     method: 'POST' ,
  //     url: 'https://fengshui.vi-school.com/calculate' ,
  //     data: { 
  //       "BDY" : 1994 ,
  //       "BDM" : 2,
  //       "BDD" : 14 ,
  //       "BDH" : 5 ,
  //       "BDMIN" : 0 ,
  //       "SEX" : "Male"
  //     },
  //     headers: {
  //       'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-Api-Key, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials',
  //       'Access-Control-Allow-Credentials': 'true' ,
  //       'Access-Control-Allow-Origin' : 'http://127.0.0.1:3000' ,
  //       'Content-Type' : 'application/json; charset=utf-8' ,
  //       'Access-Control-Allow-Methods': 'POST',
  //       'X-Api-Key' : '7042ef3b-hwvk-7084-ewu3-71d2ba685471'
  //     }
  //   })
  // }
}

// mutations
const mutations = {
  // increment (state) {
  //   // `state` is the local module state
  //   state.count++
  // }
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

  // decrementProductInventory (state, { id }) {
  //   const product = state.all.find(product => product.id === id)
  //   product.inventory--
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}