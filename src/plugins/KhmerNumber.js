var numbers = {
  khmer : ['១','២','៣','៤','៥','៦','៧','៨','៩','០'] ,
  latin : ['1','2','3','4','5','6','7','8','9','0']
};
export default {
  install(app, options = {}) {
    app.config.globalProperties.$toKhmer = ( str ) => {
      str = str != null && str != undefined ? str.toString().trim() : ''
      if( str.length > 0 ){
        for(let i in numbers.latin){
          str = str.replaceAll( numbers.latin[i] , numbers.khmer[i] )
        }
      }
      return str
    }
  }
}