import crud from '../api/crud.js';

class Crud {
    constructor(server, model, columns = ['id'], search = "", page = 1, perPage = 10) {
        this._server = "";
        this._model = {
            name: '',
            module: '',
            title: '' ,
            uri: ''
        };
        this._columns = {
            all: [],
            visible: [],
            searchable: []
        };
        this._records = {
            all: [],
            selected: [],
            matched: [],
            record: null,
            created: [],
            updated: [],
            deleted: []
        };
        this._pagination = {
            ids: [],
            page: 0,
            perPage: 10,
            search: '',
            totalRecords: 0,
            totalPages: 0,
            totalButtons: 10,
            buttons: [],
            start: 0,
            end: 0
        };
        
        this.setConfig(server, model, columns, search, page, perPage);
    }

    setConfig(server, model, columns = [], search = "", page = 1, perPage = 10) {
        this.setServer(server);
        this.setModel(model);
        this._columns.all = columns ;
        this.setVisibleColumns(this._columns.all);
        this.setSearchableColumns(this._columns.all);
        this.setSearch(search);
        this.setPage(page);
        this.setPerPage(perPage);
    }

    first(){
        return this._records.all.length > 0 ? this._records.all[0] : null
    }
    last(){
        return this._records.all.length > 0 ? this._records.all[this._records.all.length - 1] : null    
    }
    getRecordById(id){
        return this._records.all.find((r) => r.id == id)
    }
    getRecordByIndex(index){
        return this._records.all.length > index ? this._records.all[index] : null
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

    setIds(ids = []){
        if (ids == null || ids == undefined) {
            this._pagination.ids = [];
            return;
        }
        
        if (!Array.isArray(ids)) {
            throw new Error(`បញ្ជីលេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${ids}`);
        }
        
        this._pagination.ids = ids
            .map(id => parseInt(id))
            .filter(id => !isNaN(id) && id > 0);
    }

    getIds(){
        return this._pagination.ids
    }

    setServer(server){
        if (typeof server === 'string' && URL.canParse(server) ) {
            if( !this.isUrlReachable(server)){
                throw new Error('ម៉ាស៊ីនបម្រើការមិនអាចចូលដំណើរការ បានទេ។ សូមពិនិត្យមើលអាសយដ្ឋានរបស់ម៉ាស៊ីនបម្រើការវិញ។');
            }
            this._server = server
        } else {
            throw new Error('អាសយដ្ឋានរបស់ម៉ាស៊ីនបម្រើការមិនត្រឹមត្រូវ។');
        }
    }

    getServer(){
        return this._server
    }

    setModel(model){
        if (typeof model !== 'object' ) {
            throw new Error('អថេរម៉ូឌែលគួរតែជាអថេរវត្ថុ។');
        }
        if (!model.module || !model.name) {
            throw new Error('ម៉ូឌែលត្រូវតែមានលក្ខណៈសម្បត្តិ "ឈ្មោះ" និង "ម៉ូឌុល"');
        }
        this._model = { ...this._model, ...model };
    }

    getModel(){
        return this._model
    }

    setSearch(string){
        if(string == null || string == undefined){
            throw new Error(`សូមបញ្ចូលពាក្យគន្លឹះដើម្បីស្វែងរក : ${string}`);
        }
        this._pagination.search = string
    }

    getSearch(){
        return this._pagination.search
    }

    setVisibleColumns(columns){
        if(!Array.isArray(columns) || (Array.isArray(columns) && columns.length <= 0)){
            throw new Error(`សូមបញ្ចូលឈ្មោះក្បាលតារាង ៖ ${columns}`);
        }
        this._columns.visible = columns
    }
    
    setSearchableColumns(columns){
        if(!Array.isArray(columns) || (Array.isArray(columns) && columns.length <= 0)){
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
        if(!(typeof page === 'number')){
            throw new Error(`លេខទំព័រមិនត្រឹមត្រូវ ៖ ${page} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.page = parseInt(page)
    }

    getPage(){
        return this._pagination.page
    }

    setTotalButtons(numberOfButtons = 5){
        if(!(typeof numberOfButtons === 'number')){
            throw new Error(`ចំនួន គ្រាប់ចុច មិនត្រឹមត្រូវ ៖ ${numberOfButtons} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.totalButtons = parseInt(numberOfButtons)
        this.generateButtons()
    }

    getTotalButtons(){
        return this._pagination.totalButtons
    }

    generateButtons(){
        this._pagination.start = this._pagination.page - parseInt(this._pagination.totalButtons / 2)
        this._pagination.start = this._pagination.start <= 0 ? 1 : this._pagination.start
        this._pagination.end = this._pagination.page + parseInt(this._pagination.totalButtons / 2)
        this._pagination.end = this._pagination.end >= this._pagination.totalPages ? this._pagination.totalPages : this._pagination.end
        let index = this._pagination.start
        this._pagination.buttons = []
        while(index <= this._pagination.end){
            this._pagination.buttons.push(index)
            index++
        }
    }

    setPerPage(perPage){
        if(!(typeof perPage === 'number')){
            throw new Error(`ចំនួនទិន្នន័យក្នុង ១ ទំព័រ មិនត្រឹមត្រូវ ៖ ${perPage} មិនមែនជាប្រភេទតួលេខ។`)
        }
        this._pagination.perPage = parseInt(perPage)
    }

    getPerPage(){
        return this._pagination.perPage
    }

    setPagination(page, perPage, search, totalRecords = 0, totalPages = 0){
        this.setPage(page)
        this.setPerPage(perPage)
        this.setSearch(search)
        this._pagination.totalPages = totalPages
        this._pagination.totalRecords = totalRecords
        this.setTotalButtons(this._pagination.totalButtons)
    }
    
    getPagination(){
        return this._pagination 
    }

    async list(params, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        try {
            if(params != null && params != undefined){
                let paramsArrayKeys = Object.keys(params)

                if(paramsArrayKeys.indexOf('ids') != -1){
                    this.setIds(params.ids)
                }

                if(paramsArrayKeys.indexOf('page') != -1){
                    this.setPage(params.page)
                }

                if(paramsArrayKeys.indexOf('perPage') != -1){
                    this.setPerPage(params.perPage)
                }

                if(paramsArrayKeys.indexOf('search') != -1){
                    this.setSearch(params.search)
                }
            }else{
                params = {
                    ids: this._pagination.ids, 
                    page: this._pagination.page,
                    perPage: this._pagination.perPage,
                    search: this._pagination.search
                }
            }
            
            return await crud.list(this._server + "/" + this._model.module + ( this._model.uri != undefined && this._model.uri != '' ? '/' + this._model.uri : '' ) + "?" + new URLSearchParams(params).toString()).then(
                res => {
                    if(res.status == 200){
                        this._records.all = this._records.matched = res.data.records
                        this.setPagination(res.data.pagination.page, res.data.pagination.perPage, res.data.pagination.search, res.data.pagination.totalRecords, res.data.pagination.totalPages)
                        callback(res)
                    }else{
                        errorCallback(res)
                        console.error(res)    
                    }
                }
            ).catch(
                err => {
                    errorCallback(err)
                    console.error(err)
                }
            )
        }catch (error) {
            errorCallback(error)
            console.error(error)
        }
    }

    async read(id, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        if (typeof id !== 'number' && parseInt(id) <= 0) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        this._records.record = this._records.matched.find((r) => r.id == id)
        try{
            if(this._records.record != undefined && parseInt(this._records.record.id) > 0){
                return await crud.read(
                    this._server + "/" + this._model.module + "/" + this._records.record.id + '/read'
                ).then(
                    res => {
                        if(res.data.ok == true){
                            this._records.record = res.data.record
                            callback(res)
                        }else{
                            errorCallback(res)
                            console.error(res)    
                        }
                    }
                ).catch(
                    error => {
                        errorCallback(error)
                        console.error(error)
                    }
                )
            } else {
                throw new Error(`មិនមានកំណត់ត្រាជាមួយលេខសម្គាល់ ៖ ${id}`)
            }
        }catch(error){
            errorCallback(error)
            console.error(error)
        }
    }

    async create(params, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        try{
            let paramsArrayKeys = Object.keys(params)
            if(paramsArrayKeys.length < 1) throw new Error(`អថេរមិនត្រឹមត្រូវ ៖ ${params}`)

            return await crud.create(
                this._server + "/" + this._model.module + "/create",
                params
            ).then(
                res => {
                    if(res.data.ok == true){
                        this._records.record = res.data.record
                        this._records.created.push(this._records.record)
                        callback(res)
                    }else{
                        console.error(res)    
                        errorCallback(res)
                    }
                }
            ).catch(
                error => {
                    console.error(error)
                    errorCallback(error)
                }
            )
        }catch(error){
            console.error(error)
            errorCallback(error)
        }
    }

    async update(params, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        try{
            if(params == null || params == undefined || params.length == undefined || params.length <= 0){
                throw new Error(`មិនមានព័ត៌មានឡើយ ៖ ${params}`);
            }
            return await crud.update(
                this._server + "/" + this._model.module + "/update",
                params
            ).then(
                res => {
                    if(res.data.ok == true){
                        this._records.record = res.data.record
                        this._records.updated.push(this._records.record)
                        callback(this._records.record)
                    }else{
                        console.error(res)    
                        errorCallback(res)
                    }
                }
            ).catch(
                error => {
                    console.error(error)
                    errorCallback(error)
                }
            )
        }catch(error){
            console.error(error)
            errorCallback(error)
        }
    }

    async delete(id, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        this._records.record = this._records.matched.find((r) => r.id == id)
        try{
            if(this._records.record != undefined && parseInt(this._records.record.id) > 0){
                return await crud.delete(
                    this._server + "/" + this._model.module + "/" + this._records.record.id + '/delete'
                ).then(
                    res => {
                        if(res.data.ok == true){
                            this._records.record = res.data.record
                            this._records.deleted.push(this._records.record)
                            callback(res)
                        }else{
                            console.error(res)    
                            errorCallback(res)
                        }
                    }
                ).catch(
                    error => {
                        console.error(error)
                        errorCallback(error)
                    }
                )
            } else {
                throw new Error(`មិនមានកំណត់ត្រាជាមួយលេខសម្គាល់ ៖ ${id}`)
            }
        }catch(error){
            console.error(error)
            errorCallback(error)
        }
    }

    async toggleActive(id, params = {}, callback = (()=>{}), errorCallback = (()=>{})){
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        if (typeof id !== 'number' && parseInt(id) <= 0) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        
        try{
            this._records.record = this._records.matched.find((r) => r.id == id)
            if(this._records.record != undefined && parseInt(this._records.record.id) > 0){
                return await crud.update(
                    this._server + "/" + this._model.module + "/toggleactive",
                    { id: id, ...params }
                ).then(
                    res => {
                        if(res.data.ok == true){
                            this._records.record = res.data.record
                            callback(res)
                        }else{
                            console.error(res)    
                            errorCallback(res)
                        }
                    }
                ).catch(
                    error => {
                        console.error(error)
                        errorCallback(error)
                    }
                )
            } else {
                throw new Error(`មិនមានកំណត់ត្រាជាមួយលេខសម្គាល់ ៖ ${id}`)
            }
        }catch(error){
            console.error(error)
            errorCallback(error)
        }
    }

    async upload(id, formData, callback = (()=>{}), errorCallback = (()=>{})) { 
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        if (typeof id !== 'number' && parseInt(id) <= 0) {
            throw new Error(`លេខសម្គាល់មិនត្រឹមត្រូវ ៖ ${id}`)
        }
        if (!(formData instanceof FormData)) {
            throw new Error(`ទម្រង់ទិន្នន័យមិនត្រឹមត្រូវ ៖ ${formData}`)
        }
        
        try{
            this._records.record = this._records.matched.find((r) => r.id == id)
            if(this._records.record != undefined && parseInt(this._records.record.id) > 0){
                return await crud.upload(
                    this._server + "/" + this._model.module + '/upload',
                    formData
                ).then(
                    res => {
                        if(res.data.ok == true){
                            this._records.record = res.data.record
                            callback(this._records.record)
                        }else{
                            console.error(res)   
                            errorCallback(res) 
                        }
                    }
                ).catch(
                    error => {
                        console.error(error)
                        errorCallback(error)
                    }
                )
            } else {
                throw new Error(`មិនមានកំណត់ត្រាជាមួយលេខសម្គាល់ ៖ ${id}`)
            }
        }catch(error){
            console.error(error)
            errorCallback(error)
        }
    }

    // វិធីសាស្រ្តដើម្បីបង្ហាញព័ត៌មានលម្អិត
    getDetails() {
        console.log(`ម៉ូឌែល: ${this._model.name}`);
        console.log(`ចំនួនកំណត់ត្រា: ${this._records.all.length}`);
        console.log(`ទំព័របច្ចុប្បន្ន: ${this._pagination.page}/${this._pagination.totalPages}`);
    }

    async goTo(callback, pagination, errorCallback = (()=>{})){
        return await this.list(pagination, callback, errorCallback)
    }
    
    async previous(callback, errorCallback = (()=>{})){
        this._pagination.page = this._pagination.page <= 1 ? 1 : this._pagination.page - 1 
        return await this.goTo(callback, {
            ids: this._pagination.ids,
            page: this._pagination.page,
            perPage: this._pagination.perPage,
            search: this._pagination.search
        }, errorCallback)
    }
    
    async next(callback, errorCallback = (()=>{})){
        this._pagination.page = this._pagination.page >= this._pagination.totalPages ? this._pagination.totalPages : this._pagination.page + 1
        return await this.goTo(callback, {
            ids: this._pagination.ids,
            page: this._pagination.page,
            perPage: this._pagination.perPage,
            search: this._pagination.search
        }, errorCallback)
    }

    // វិធីសាស្រ្តថ្មីៗដែលបានបន្ថែម
    reset() {
        this._records = {
            all: [],
            selected: [],
            matched: [],
            record: null,
            created: [],
            updated: [],
            deleted: []
        };
        this._pagination.page = 1;
        this._pagination.totalRecords = 0;
        this._pagination.totalPages = 0;
        this.generateButtons();
    }

    selectRecord(id) {
        const record = this._records.matched.find(r => r.id == id);
        if (record && !this._records.selected.some(r => r.id == id)) {
            this._records.selected.push(record);
        }
    }

    deselectRecord(id) {
        this._records.selected = this._records.selected.filter(r => r.id != id);
    }

    selectAll() {
        this._records.selected = [...this._records.matched];
    }

    deselectAll() {
        this._records.selected = [];
    }

    filterRecords(predicate) {
        return this._records.all.filter(predicate);
    }

    findRecordByField(field, value) {
        return this._records.all.find(record => record[field] === value);
    }

    async batchDelete(ids, callback = (()=>{}), errorCallback = (()=>{})) {
        if (typeof callback !== 'function') {
            throw new Error(`អនុគមន៍ callback មិនត្រឹមត្រូវ ៖ ${callback}`)
        }
        if (typeof errorCallback !== 'function') {
            throw new Error(`អនុគមន៍ errorCallback មិនត្រឹមត្រូវ ៖ ${errorCallback}`)
        }
        
        try {
            const url = `${this._server}/${this._model.module}/batch-delete`;
            const res = await crud.delete(url, { ids });
            
            if (res.data.ok === true) {
                this._records.all = this._records.all.filter(r => !ids.includes(r.id));
                this._records.matched = this._records.matched.filter(r => !ids.includes(r.id));
                this._records.deleted.push(...res.data.records);
                callback(res);
                return res;
            } else {
                errorCallback(res);
                throw new Error('ការលុបជាក្រុមបានបរាជ័យ');
            }
        } catch (error) {
            errorCallback(error);
            console.error('កំហុសក្នុងការលុបជាក្រុម:', error);
            throw error;
        }
    }

    getState() {
        return {
            server: this._server,
            model: this._model,
            recordsCount: this._records.all.length,
            selectedCount: this._records.selected.length,
            pagination: { ...this._pagination }
        };
    }

    async isUrlReachable(url) {
        try {
            // Use 'HEAD' method for efficiency as we don't need the body
            const response = await fetch(url, {
            method: 'HEAD',
            mode: 'no-cors' 
            });
            // If a response is received, the network is reachable
            return true; 
        } catch (error) {
            // A network error occurred, the URL is not reachable
            return false;
        }
    }
}

export default Crud;