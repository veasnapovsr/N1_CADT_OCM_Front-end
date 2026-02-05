import auth from '../../api/auth'
import { setToken, setUser } from '../../plugins/authentication'

// initial state
const state = () => ({
  user: null ,
  token: {
    access_token: null ,
    expires_at: new Date() ,
    token_type: "Bearer"
  }
})

// getters
const getters = {
  getAuthorization( state , getters, rootState ){
    return state.token.token_type + " " + state.token.access_token 
  },
  checkAuth(state, getters, rootState ){
    return state.token.access_token !== "" && ( new Date(state.token.expires_at) >= new Date() )
  }
}

// actions
const actions = {
  /**
   * Login
   */
   async login({state, commit, rootState }, params ){
    // console.log( import.meta.env.VITE_API_SERVER )
    return await auth.login(import.meta.env.VITE_API_SERVER+"/authentication/login", params) 
   },
  
  /**
   * Logout
   */
  async logout({state , commit, rootState},params){
    /**
     * Logout user
     */
    return await auth.logout(import.meta.env.VITE_API_SERVER+"/authentication/logout",params)
  },

  /**
   * Signup
   */
  async signup({state, commit, rootState }, params ){
    return await auth.signup(import.meta.env.VITE_API_SERVER+"/authentication/signup", params) 
  },

  /**
   * Get profile
   */
  /**
   * Update profile
   */
  /**
   * Update profile picture
   */
  
}

// mutations
const mutations = {
  setAuthentication (state, { user, token }) {
    state.user = user
    state.token = token
    setToken(token)
    setUser(user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}