var khmer = {
  months : {
    1 : "មករា",2 : "កុម្ភៈ",3 : "មីនា",4 : "មេសា",5 : "ឧសភា",6 : "មិថុនា",7 : "កក្កដា",8 : "សីហា",9 : "កញ្ញា",10 : "តុលា",11 : "វិច្ឆិកា",12 : "ធ្នូ",
  },
  days : {
    0 : "អាទិត្យ",1 : "ច័ន្ទ",2 : "អង្គារ៍",3 : "ពុធ",4 : "ព្រហស្បត៍",5 : "សុក្រ",6 : "សៅរ៍"
  },
  current: {
    today: new Date()
  }
};
export default {
  install(app, options = {}) {
    app.config.globalProperties.$getKhMonth = ( month )=>{   
      return parseInt( month ) >= 1 && parseInt( month ) <= 12 ? khmer.months[ parseInt( month ) ] : khmer.months[ khmer.current.today.getMonth() + 1 ]
    }
    app.config.globalProperties.$getKhDay = ( day )=>{
      return parseInt( day ) >= 0 && parseInt( day ) <= 6 ? khmer.days[ parseInt( day ) ] : khmer.days[ khmer.current.today.getDay() ]
    }
  }
}