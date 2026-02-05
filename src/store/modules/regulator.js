import crud from '../../api/crud'
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
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "?" + new URLSearchParams({
        // unit: params.unit ,
        // date: params.date ,
        // number: params.number ,
        // type: params.type ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page
      },true).toString()
    )
  },
  async childList ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/child?" + new URLSearchParams({
        // unit: params.unit ,
        // date: params.date ,
        // number: params.number ,
        // type: params.type ,
        search: params.search ,
        perPage: params.perPage ,
        page: params.page ,
        parent_id : params.parent_id
      }).toString()
    )
  },
  async matras ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name +"/"+params.regulator_id + "/matras?" + new URLSearchParams(params).toString()
    )
  },
  async read ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id)
  },
  async kunty ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/kunties")
  },
  async matika ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/matikas")
  },
  async matikasByKunty ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/kunties/"+params.id+"/matikas")
  },
  async chaptersByMatika ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/matikas/"+params.id+"/chapters")
  },
  async chaptersByKunty ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/kunties/"+params.id+"/chapters")
  },
  async partsByChapter ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/chapters/"+params.id+"/parts")
  },
  async sectionsByPart ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/parts/"+params.id+"/sections")
  },
  async structure ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/structure")
  },
  async compact ({ state, commit, rootState },params) {
    return await crud.list(import.meta.env.VITE_API_SERVER+"/"+state.model.name + "/compact" + ( params !== undefined ? "?" + new URLSearchParams({
      page: params.page ,
      perPage : params.perPage ,
      search: params.search ,
    }).toString(): ""))
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
  async upload({ state, commit, rootState },formData) {
    // return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/"+params.id+"/upload",{pdfs: params.pdfs})
    return await crud.upload(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/upload",formData)
  },
  async activate ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+'/'+params.id+'/activate',{})
  },
  async deactivate ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+'/'+params.id+'/deactivate',{})
  },
  async childDocument ({ state, commit, rootState },params) {
    return await crud.create(import.meta.env.VITE_API_SERVER+"/orgchart",{
      parent_id : params.parent_id ,
      document_id : params.document_id ,
      name: params.name ,
      document_parent_id : params.document_parent_id ,
      desc: params.desc ,
      image: params.image
    })
  },
  async getChildDocument ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/orgchart")
  },
  async updateDocument ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/orgchart",{
      id : params.id ,
      parent_id : params.parent_id ,
      document_id : params.document_id ,
      name: params.name ,
      document_parent_id : params.document_parent_id ,
      desc: params.desc ,
      image: params.image
    })
  },
  async updateDocument ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/orgchart/linkdocument",{
      id : params.id ,
      document_id : params.document_id 
    })
  },
  async updateAccessibility ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+'/'+params.id+'/accessibility',{mode: params.mode})
  },
  async addReader ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/addreader",{
      user_id : params.user_id ,
      document_id : params.document_id 
    })
  },
  async removeReader ({ state, commit, rootState },params) {
    return await crud.update(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/removereader",{
      user_id : params.user_id ,
      document_id : params.document_id 
    })
  },
  async pdf ({ state, commit, rootState },params) {
    return await crud.read(import.meta.env.VITE_API_SERVER+"/"+state.model.name+"/pdf?id="+params.id)
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