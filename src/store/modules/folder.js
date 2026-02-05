import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "folders" ,
    title: "ថតឯកសារ" 
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
    return await crud.list(
      import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async globalFolder ({ state, commit, rootState },params) {
    return await crud.list(
      import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/global?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/read")
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name,params)
  },
  async regulators ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/regulators"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async addRegulator ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/regulators/add",params)
  },
  async removeRegulator ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/regulators/remove",params)
  },
  async ofUser ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/user"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async listRegulatorWithValidation ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/list/regulator/validation"+ "?" + new URLSearchParams({
      search: params.search ,
      perPage: params.perPage ,
      page: params.page ,
      regulator_id : params.regulator_id
    }).toString(),
    null,
    true
  )},
  async updateAccessibility ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+'/'+params.id+'/accessibility',{mode: params.mode})
  },
}

// mutations
const mutations = {

  setRecords (state, records) {
    state.records = records
  },
  setRecord (state, record) {
    state.record = record
  },

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}