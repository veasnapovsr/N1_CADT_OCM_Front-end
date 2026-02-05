import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "regulators" ,
    title: "លិខិតបទដ្ឋានគតិយុត្ត" 
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
      import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/search?" + new URLSearchParams({
        fid: params.fid ,
        year: params.year ,
        types: params.types ,
        signatures: params.signatures ,
        organizations: params.organizations ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString(),
      null,
      false
    )
  },
  async favorites ({ state, commit, rootState },params) {
    return await crud.list(
      import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/favorites?" + new URLSearchParams({
        fid: params.fid ,
        year: params.year ,
        types: params.types ,
        signatures: params.signatures ,
        organizations: params.organizations ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      }).toString(),
      null,
      false
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id)
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/pdf" + ( params !== undefined ? "?" + new URLSearchParams(
      ( params.id != undefined && parseInt( params.id ) > 0 ) ? { id : params.id } 
        : (
          typeof params.serial == 'string' && params.serial.length > 0 ? { serial : params.serial } : ''
        )
    ).toString(): ""))
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      page: params.page ,
      perPage : params.perPage ,
      search: params.search ,
    }).toString(): ""))
  },
  async type ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/types")
  },
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