import axios from "axios"
import { getAuthorization } from "./../plugins/authentication"
export default {
  async list(url,params){
    return await axios({
      method: 'GET' ,
      url: url ,
      params: params ,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async read(url,params){
    return await axios({
      method: 'GET' ,
      url: url ,
      params: params,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async create(url,params){
    return await axios({
      method: 'POST' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async update(url,params){
    return await axios({
      method: 'PUT' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async patch(url,params){
    return await axios({
      method: 'PATCH' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async delete(url,params){
    return await axios({
      method: 'DELETE' ,
      url: url ,
      data: params,
      headers: {
        'Authorization' : getAuthorization() // bear token
      }
    })
  },
  async upload(url,formData){
    return await axios.post( url , formData ,
      { 
        headers: {
          Authorization : getAuthorization()  , // bear token
          // 'Content-Type': 'multipart/form-data' ,
        }
      }
    )
  }
}