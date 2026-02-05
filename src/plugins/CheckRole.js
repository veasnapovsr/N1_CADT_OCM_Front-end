import { roles } from './authentication'
export default {
  install(app, options = {}) {
    let roleIds = Array.isArray( roles() ) ? roles().map(r => r.id ) : []
    app.config.globalProperties.$hasRole = ( code ) => {
      return Array.isArray( code ) 
        ? ( code.find( role => roleIds.includes( role ) ) != undefined ? true : false )
        : false 
    }
  }
}