import { permissions } from './authentication'
export default {
  install(app, options = {}) {
    app.config.globalProperties.$hasPermission = ( code ) => {
      let permissionKeys = permissions()
      return Array.isArray( code ) ? (
        permissionKeys.find( p => code.includes( p ) ) != undefined
        ? true : false
      ) : permissionKeys.includes( code )
    }
  }
}