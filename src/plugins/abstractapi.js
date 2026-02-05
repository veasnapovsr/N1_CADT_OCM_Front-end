import axios from "axios"
export const getHoliday = async (country,year,month,day) => {
    try {
        let params = Array()
        country != undefined && country.length > 0 ? params.push({ name : 'country' , value : country}) : false
        year != undefined && year.length > 0 ? params.push({ name : 'year' , value : year}) : false
        month != undefined && month.length > 0 ? params.push({ name : 'month' , value : month}) : false
        day != undefined && day.length > 0 ? params.push({ name : 'day' , value : day}) : false
        console.log( ( params.length > 0 ? '&' + ( params.map( p => p.name + "=" + p.value ) ).join('&') : '' ) )
        return await axios({
            method: 'get' ,
            url: 'https://holidays.abstractapi.com/v1/?api_key=6db4169570fe4c09ba2a9d714da8bd70' + ( params.length > 0 ? '&' + ( params.map( p => p.name + "=" + p.value ) ).join('&') : '' ) ,
            data: params
        })
    } catch (error) {
      console.log(error)
    }
}