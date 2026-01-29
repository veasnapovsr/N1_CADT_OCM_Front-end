import { createStore, createLogger } from 'vuex'
import auth from './modules/authentication'
import user from './modules/user'
import organization from './modules/organization'
import position from './modules/position'
import countesy from './modules/countesy'
import regulator from './modules/regulator'
import regulatorSearch from './modules/regulator/search'
import regulatorType from './modules/regulator/type'
import regulatorOrganization from './modules/regulator/organization'
import regulatorSignature from './modules/regulator/signature'

import folder from './modules/folder'

// import meeting from './modules/meeting/meeting'
// import meetingCountesy from './modules/meeting/countesy'
// import meetingOrganization from './modules/meeting/organization'
// import meetingPeople from './modules/meeting/people'
// import meetingPosition from './modules/meeting//position'
// import meetingRoom from './modules/meeting/room'
// import meetingType from './modules/meeting/type'

import attendant from './modules/attendant'
import officer from './modules/officer'
import officerjobbackground from './modules/officer/officerjobbackground'
import officerrankbycertificate from './modules/officer/officerrankbycertificate'
import officerrankbyworking from './modules/officer/officerrankbyworking'
import officerpendingwork from './modules/officer/officerpendingwork'
import officermedalhistory from './modules/officer/officermedalhistory'
import officerpenaltyhistory from './modules/officer/officerpaneltyhistory'
import rank from './modules/officer/rank'

// Location
import province from './modules/location/province'
import district from './modules/location/district'
import commune from './modules/location/commune'
import village from './modules/location/village'

import people from './modules/people/people'
import certificate from './modules/people/certificate'
import niccertificate from './modules/people/niccertificate'
import passport from './modules/people/passport'
import birthcertificate from './modules/people/birthcertificate'
import achievement from './modules/people/achievement'
import weddingcertificate from './modules/people/weddingcertificate'
import childcertificate from './modules/people/childcertificate'
import spokenlanguage from './modules/people/spokenlanguage'

import transaction from './modules/document/transaction'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {},
  modules: {
    auth ,
    user ,
    attendant ,
    organization ,
    position , 
    countesy ,
    // Transaction Document
    transaction ,
    // Regulator
    regulator ,
    regulatorSearch ,
    regulatorSignature ,
    regulatorOrganization ,
    regulatorType ,
    // Folder 
    folder ,
    // Meeting
    // meeting ,
    // meetingCountesy ,
    // meetingOrganization ,
    // meetingPeople ,
    // meetingPosition ,
    // meetingRoom ,
    // meetingType ,
    // People
    people,
    certificate ,
    niccertificate ,
    birthcertificate ,
    achievement ,
    passport,
    weddingcertificate ,
    childcertificate ,
    spokenlanguage ,
    // Officer
    officer,
    officerjobbackground ,
    officerrankbycertificate ,
    officerrankbyworking ,
    officerpendingwork ,
    officermedalhistory ,
    officerpenaltyhistory ,
    rank ,
    // Province , District , Commune , Village
    province ,
    district ,
    commune ,
    village ,
  },
  strict: debug,
  plugins: debug ? 
    [
      createLogger()
    ] : 
    [
      
    ]
})