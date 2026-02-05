import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "birthcertificates" ,
    title: "ឯកសារអត្រានុកុលដ្ឋាន" 
  },
  groups: [] ,
  records: [] ,
  record: null ,

})

// getters
const getters = {
  getGroups (state, getters, rootState) {
    return state.groups
  },
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
        perPage: params.perPage ,
        page: params.page ,
        people_id : params.people_id ,
        wedding_certificate_id : params.wedding_certificate_id != undefined && parseInt( params.wedding_certificate_id ) > 0 ? params.wedding_certificate_id : 0
      }).toString()
    )
  },
  async group ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/groups")
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/pdf?id="+params.id)
  },
  async upload({ state, commit, rootState },formData) {
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload",formData)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
}

// mutations
const mutations = {
  setGroups (state, records) {
    state.groups = records
  },
  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}