import crud from '../api/crud.js'
class Crud {
    _server = "" 
    _model = {
        name: '' ,
        model: '' ,
        title: ''
    }
    _columns = {
        all: [] ,
        visible : [] ,
        searchable : []
    }
    _records = {
        all : [] ,
        selected: [] ,
        matched: [] ,
        record : null ,
        created: [] ,
        updated: [] ,
        deleted: []
    }
    _pagination = {
        ids: [] ,
        page: 0 ,
        perPage: 10 ,
        search: '' ,
        totalRecords : 0 ,
        totalPages : 0 ,
        totalButtons: 10 ,
        buttons: [] ,
        start: 0 ,
        end: 0 
    }

    // Constructor
    constructor() {
        this.setConfig( 'server' , 'model' , ['id'] , "" , 1 , 10 )
    }

    setConfig( server , model , columns = [] , search = "" , page = 1 , perPage = 10 ) {
        this.setServer( server )
        this.setModel( model ) 
        this.setVisibleColumns( columns )
        this.setSearchableColumns( columns )
        this.setSearch( search )
        this.setPage( page )
        this.setPerPage( perPage )
    }
    
    getRecords(){
        return this._records.all
    }

    getSelectedRecords(){
        return this._records.selected
    }

    getMatchedRecords(){
        return this._records.matched
    }

    getRecord(){
        return this._records.record
    }

    getCreatedRecords(){
        return this._records.created
    }

    getUpdatedRecords(){
        return this._records.updated
    }

    getDeletedRecords(){
        return this._records.deleted
    }

    setIds( ids = [] ){
        this._pagination.ids = ids != null && ids != undefined && ids.length > 0 ? this._pagination.ids.filter( ( id ) => parseInt( id ) > 0 ) : []
    }

    getIds(){
        return this._ids 
    }

    setServer( server ){
        if( server == null || server == undefined || server == "" ){
            throw new Error(`សូមបញ្ជាក់ពី Server ៖ ${server}`);
        }
        this._server = server
    }

    getServer(){
        return this._server
    }

    setModel( model ){
        if( model == null || model == undefined || model == "" ){
            throw new Error('model មិនមានទម្រង់ត្រឹមត្រូវ');
        }
        this._model = model
    }

    getModel(){
        return this._model
    }

    setSearch(string){
        if( string == null || string == undefined ){
            throw new Error(`សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក : ${string}`);
        }
        this._pagination.search = string
    }

    getSearch(){
        return this._pagination.search
    }

    setVisibleColumns(columns){
        if( !Array.isArray( columns ) || ( Array.isArray( columns ) && columns.length <= 0 ) ){
            throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
        }
        this._columns.visible = columns
    }
    setSearchableColumns(columns){
        if( !Array.isArray( columns ) || ( Array.isArray( columns ) && columns.length <= 0 ) ){
            throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
        }
        this._columns.searchable = columns
    }

    getColumns(){
        return this._columns.all
    }

    getVisibleColumns(){
        return this._columns.visible
    }

    getSearchableColumns(){
        return this._columns.searchable
    }

    setPage(page){
        if( !(typeof page === 'number') ){
            throw new Error(`លេខទំព័រមិនត្រឹមត្រូវ ៖ ${page} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.page = parseInt( page )
    }

    getPage(){
        return this._pagination.page
    }

    setTotalButtons( numberOfButotns = 5 ){
        if( !(typeof numberOfButotns === 'number') ){
            throw new Error(`ចំនួន គ្រាប់ចុច មិនត្រឹមត្រូវ ៖ ${numberOfButotns} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.totalButtons = parseInt( numberOfButotns )
        this.generateButtons()
    }

    getTotalButtons(){
        return this._pagination.totalButtons
    }

    generateButtons(){
        this._pagination.start = this._pagination.page - parseInt( this._pagination.totalButtons / 2 )
        this._pagination.start = this._pagination.start <= 0 ? 1 : this._pagination.start
        this._pagination.end = this._pagination.page + parseInt( this._pagination.totalButtons / 2 )
        this._pagination.end = this._pagination.end >= this._pagination.totalPages ? this._pagination.totalPages : this._pagination.end
        let index = this._pagination.start
        this._pagination.buttons = []
        while( index <= this._pagination.end ){
            this._pagination.buttons.push( index )
            index++
        }
    }

    setPerPage(perPage){
        if( !(typeof perPage === 'number') ){
            throw new Error(`ចំនួនទិន្នន័យក្នុង ១ ទំព័រ មិនត្រឹមត្រូវ ៖ ${perPage} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.perPage = parseInt( perPage )
    }

    getPerPage(){
        return this._pagination.perPage
    }

    setPagination( page, perPage , search , totalRecords = 0 , totalPages = 0){
        this.setPage( page )
        this.setPerPage( perPage )
        this.setSearch( search )
        this._pagination.totalPages = totalPages
        this._pagination.totalRecords = totalRecords
        this.setTotalButtons( this._pagination.totalButtons )
    }
    getPagination(){
        return this._pagination 
    }

    async list ( params , callback=(()=>{}) , errorCallback=(()=>{}) ) {
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        try {
            if( params != null && params != undefined ){

                let paramsArrayKeys = Object.keys( params )

                if( paramsArrayKeys.indexOf( 'ids' ) != -1 ){
                    this.setIds( 
                        params.ids.length > 0 
                            ? params.ids.filter( ( id ) => parseInt( id ) > 0 ) 
                            : [] 
                    )
                }

                if( paramsArrayKeys.indexOf( 'page' ) != -1 ){
                    this.setPage( 
                        parseInt( params.page ) > 0 
                            ? parseInt( params.page ) 
                            : 0 
                    )
                }

                if( paramsArrayKeys.indexOf( 'perPage' ) != -1 ){
                    this.setPerPage( 
                        parseInt( params.perPage ) > 0 
                            ? parseInt( params.perPage ) 
                            : 0 
                    )
                }

                if( paramsArrayKeys.indexOf( 'search' ) != -1 ){
                    this.setSearch( 
                        params.search != null && params.search != undefined && params.search.length > 0 
                            ? params.search
                            : "" 
                    )
                }

            }else{
                params = {
                    ids: this._ids , 
                    page : this._page ,
                    perPage : this._perPage ,
                    search : this._search.string
                }
            }
            return await crud.list( this._server+"/"+this._model.module + "?" + new URLSearchParams( params ).toString() ).then(
                res => {
                    if( res.status == 200 ){
                        // Write to localStorage with specific model name
                        this._records.all = this._records.matched = res.data.records
                        this.setPagination( res.data.pagination.page , res.data.pagination.perPage , res.data.pagination.search , res.data.pagination.totalRecords , res.data.pagination.totalPages )
                        callback( res )
                    }else{
                        errorCallback( res )
                        console.error( res )    
                    }
                }
            ).catch(
                err => {
                    errorCallback( err )
                    console.error(err)
                }
            )
        }catch (error) {
            errorCallback( error )
            console.error(error)
        }
    }

    async read ( id , callback=(()=>{}) , errorCallback=(()=>{}) ) {
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof id !== 'number' && parseInt( id ) <= 0 ) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        this._records.record = this._records.matched.find( ( r ) => r.id == id )
        try{
            if( this._records.record != undefined && parseInt( this._records.record.id ) > 0){
                return await crud.read(
                    this._server+"/"+this._model.module + "/" + this._records.record.id + '/read'
                ).then(
                    res => {
                        if( res.data.ok == true ){
                            // Write to localStorage with specific model name
                            this._records.record = res.data.record
                            callback(res)
                        }else{
                            errorCallback( res )
                            console.error( res )    
                        }
                    }
                ).catch(
                    error => {
                        errorCallback( error )
                        console.error( error )
                    }
                )
            }
        }catch( error ){
            errorCallback( error )
            console.error( error )
        }
    }

    async create ( params , callback=(()=>{}) , errorCallback=(()=>{}) ) {
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        try{
            let paramsArrayKeys = Object.keys( params )
            if( paramsArrayKeys.length < 1 ) throw new Error(`អថេមិនត្រឹមត្រូវ ៖ ${params}`)

            return await crud.create(
                this._server + "/" + this._model.module + "/create" ,
                params
            ).then(
                res => {
                    if( res.data.ok == true ){
                        // Write to localStorage with specific model name
                        this._records.record = res.data.record
                        this._records.created.push( this._records.record )
                        callback( res )
                    }else{
                        console.error( res )    
                        errorCallback( res )
                    }
                }
            ).catch(
                error => {
                    console.error( error )
                    errorCallback( error )
                }
            )
        }catch( error ){
            console.error( error )
            errorCallback( error )
        }
    }

    async update ( params , callback=(()=>{}) , errorCallback=(()=>{}) ) {
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        try{
            if( params == null || params == undefined || params.length == undefined || params.length <= 0 ){
                throw new Error(`មិនមានព័ត៌មានឡើយ ៖ ${params}`);
            }
            return await crud.update(
                this._server+"/"+this._model.module + "/update" ,
                params
            ).then(
                res => {
                    if( res.data.ok == true ){
                        // Write to localStorage with specific model name
                        this._records.record = res.data.record
                        this._records.updated.push( this._records.record )
                        callback(this._records.record)
                    }else{
                        console.error( res )    
                        errorCallback( res )
                    }
                }
            ).catch(
                error => {
                    console.error( error )
                    errorCallback( error )
                }
            )
        }catch( error ){
            console.error( error )
            errorCallback( error )
        }
    }

    async delete ( id , callback=(()=>{}) , errorCallback=(()=>{}) ) {
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        this._records.record = this._records.matched.find( ( r ) => r.id == id )
        try{
            if( this._records.record != undefined && parseInt( this._records.record.id ) > 0){
                return await crud.delete(
                    this._server+"/"+this._model.module + "/" + this._records.record.id + '/delete'
                ).then(
                    res => {
                        if( res.data.ok == true ){
                            // Write to localStorage with specific model name
                            this._records.record = res.data.record
                            this._records.deleted.push( this._records.record )
                            callback(res)
                        }else{
                            console.error( res )    
                            errorCallback( res )
                        }
                    }
                ).catch(
                    error => {
                        console.error( error )
                        errorCallback( error )
                    }
                )
            }
        }catch( error ){
            console.error( error )
            errorCallback( error )
        }
    }

    async toggleActive( id , callback=(()=>{}) , errorCallback=(()=>{}) ){
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof id !== 'number' && parseInt( id ) <= 0 ) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        this._records.record = this._records.matched.find( ( r ) => r.id == id )
        try{
            if( this._records.record != undefined && parseInt( this._records.record.id ) > 0){
                return await crud.update(
                    this._server+"/"+this._model.module +"/toggleactive",params
                ).then(
                    res => {
                        if( res.data.ok == true ){
                            // Write to localStorage with specific model name
                            this._records.record = res.data.record
                            callback(res)
                        }else{
                            console.error( res )    
                            errorCallback( res )
                        }
                    }
                ).catch(
                    error => {
                        console.error( error )
                        errorCallback( error )
                    }
                )
            }
        }catch( error ){
            console.error( error )
            errorCallback( error )
        }
    }

    async upload( id, formData , callback=(()=>{}) , errorCallback=(()=>{}) ) { 
        if (typeof callback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`Function callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof id !== 'number' && parseInt( id ) <= 0 ) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        if ( !(formData instanceof FormData) ) {
            throw new Error(`ទម្រង់ទិន្នន័យមិនត្រឹមត្រូវ ៖ ${formData}`)
        }
        this._records.record = this._records.matched.find( ( r ) => r.id == id )
        try{
            if( this._records.record != undefined && parseInt( this._records.record.id ) > 0){

                return await crud.upload(
                    this._server+"/"+this._model.module + '/upload' ,
                    formData
                ).then(
                    res => {
                        if( res.data.ok == true ){
                            // Write to localStorage with specific model name
                            this._records.record = res.data.record
                            callback(this._records.record)
                        }else{
                            console.error( res )   
                            errorCallback( res ) 
                        }
                    }
                ).catch(
                    error => {
                        console.error( error )
                        errorCallback( error )
                    }
                )
                
            }
        }catch( error ){
            console.error( error )
            errorCallback( error )
        }
    }

    // Method to display person details
    getDetails() {
        console.log(`model: ${this._model}`);
    }

    async goTo( callback , pagination , errorCallback = ( ()=>{} ) ){
        return await this.list( callback , {
            ids: pagination.ids ,
            page: pagination.page ,
            perPage: pagination.perPage ,
            search : pagination.search
        }, errorCallback )
    }
    async previous( callback , errorCallback = ( ()=>{} ) ){
        this._pagination.page <= 1 ? 1 : this._pagination.page - 1 
        return await this.goTo( callback , {
            ids: this._pagination.ids ,
            page: this._pagination.page ,
            perPage: this._pagination.perPage ,
            search : this._pagination.search
        }, errorCallback )
    }
    async next( callback , errorCallback = ( ()=>{} ) ){
        this._pagination.page >= this._pagination.totalPages ? this._pagination.totalPages : this._pagination.page + 1
        return await this.goTo( callback , {
            ids: this._pagination.ids ,
            page: this._pagination.page ,
            perPage: this._pagination.perPage ,
            search : this._pagination.search
        }, errorCallback )
    }
}
export default Crud