import crud from '../../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "regulators/organizations" ,
    title: "អង្គភាព លិខិតបទដ្ឋានគតិយុត្ត" 
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
        page : 1 ,
        perPage : 1000 ,
        search: ''
      }).toString()
    )
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      search: params.search ,
    }).toString(): ""))
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
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id)
  }
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