<template lang="">
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Trạng thái</span>
                <select name="" id="" class="form-control border-start-0" @click="_Init"
                @change="$emit('FilterData',{name_field:'project_status', search_value : status})" v-model="status">
                    <option value="" selected>---CHỌN TRẠNG THÁI---</option>
                    <option :value="Number(item.id)" v-for="(item, index) in data" :key="index">{{item.value}}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const APP_PATH = import.meta.env.VITE_APP_PATH;
import axios from 'axios';
export default {

    data(){
        return {
            data : [],
            status : "",
        }
    },
    async mounted(){
        await this._Init()
        let query_get = this.$route.query
        if(query_get){
            if(query_get.status){
                this.status = query_get.status
            }
        }
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetDataStatus()
        },
        GetDataStatus(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/get-status-json/get-status-legal-project',params,config)
                .then(async res => {
                    this.data = res.data
                })
                .catch(err => {})
            }
            catch (err) {
                console.log(err)
            }
        },
        RemoveFilter(){
            this.status = ""
        }
    }
}
</script>
<style lang="">
    
</style>