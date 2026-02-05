import crud from '../../api/crud'

// initial state
const state = () => ({
  model: {
    name: "organizations" ,
    title: "អង្គភាព" 
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
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name 
    + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        id: params.id
      }).toString()
    )
  },
  async organizationStructure ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name 
    + "/structure_organization?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        id: params.id
      }).toString()
    )
  },
  async listByParent ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/listbyparent" 
    + "?" + new URLSearchParams({
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        id: params.id
      }).toString()
    )
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      search: params.search ,
    }).toString(): ""))
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/read')
  },
  async people ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+'/people')
  },
  async create ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/create",params)
  },
  async addchild ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/addchild",params)
  },
  async update ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/update",params)
  },
  async delete ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/delete")
  },
  async activate({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/activate",params)
  },
  async deactivate({state, commit, rootState}, params){
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/deactivate",params)
  },
  async setLeader ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/setleader",params)
  },
  async addPeople ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/addstaff",params)
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
  async users ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/staffs"+ "?" + new URLSearchParams({
      folder_id: params.id ,
      search: params.search ,
      perPage: params.perPage ,
      page: params.page
    }).toString(),
    null,
    true
  )},
  async positions ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/positions"+ "?" + new URLSearchParams({
      search: params.id ,
      perPage: params.search ,
      page: params.perPage ,
      organization_id : parseInt( params.id ) > 0 ? parseInt( params.id ) > 0 : null
    }).toString(),
    null,
    true
  )},
  /**
   * Structure
   */
  async getStructure ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/structure"
      + "?" + new URLSearchParams({
        organization_structure_id: params.organization_structure_id 
      }).toString()
    )
  },
  async addStructure ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/structure/add",params)
  },
  async deleteStructure ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/structure/"+params.id+"/delete")
  },
  /**
   * Position
   */
  async getPosition ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/position"
      + "?" + new URLSearchParams({
        organization_structure_position_id: params.organization_structure_position_id 
      }).toString()
    )
  },
  async addPosition ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/position/add",params)
  },
  async deletePosition ({ state, commit, rootState },params) {
    return await crud.delete(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/position/"+params.id+"/delete")
  },
  async togglePermissionOfPosition ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/position/permission/toggle",params)
  },
  async getOrganizationStructurePosition ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/organization_structures_position"
      + "?" + new URLSearchParams({
        organization_structure_id: params.organization_structure_id
      }).toString()
    )
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