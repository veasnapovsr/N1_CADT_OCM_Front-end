export const authLogout = () => {
  try {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  } catch (error) {
    console.log(error)
  }
}
export const isAuth = () => {
  try {
    if( getAuthorization() != false && getUser() != null ){
      return true
    }
    return false
  } catch (error) {
    console.log(error)
  }
}
export const getToken = () => {
  try {
    return JSON.parse( localStorage.getItem('token') )
  } catch (error) {
    console.log(error)
  }
}
export const getAuthorization = () => {
  try {
    return getToken() != null ? ( getToken().token_type + ' ' + getToken().access_token ) : false
  } catch (error) {
    console.log(error)
  }
}
export const getAccessToken = () => {
  try {
    return getToken() != null ? getToken().access_token : ''
  } catch (error) {
    console.log(error)
  }
}
export const getAccessTokenType = () => {
  try {
    return getToken() != null ? getToken().token_type : ''
  } catch (error) {
    console.log(error)
  }
}
export const getExpiresAt = () => {
  try {
    return getToken().expires_at
  } catch (error) {
    console.log(error)
  }
}
export const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify( token ));
}

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (error) {
    console.log(error)
  }
}
export const setUser = (user) => {
  localStorage.setItem('user',JSON.stringify(user));
}
export const isAdmin = () => {
  let admin = getUser()
  if( isAuth() && admin !== null && admin.role == 1 ){
    return true 
  }
  return false
}
export const permissions = () => {
  let user = getUser()
  return user != null && user != undefined && user.permissions != undefined && user.permissions.length > 0 ? user.permissions : []
}
export const roles = () => {
  let user = getUser()
  return user != null && user != undefined && user.roles != undefined && user.roles.length > 0 ? user.roles : []
}
export const hasPermission = ( code ) => {
  return  Array.isArray( code ) ? (
    permissions().find( p => code.includes( p ) ) != undefined
    ? true : false
  ) : permissions().includes( code )
}
