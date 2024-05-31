<template lang="">
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">{{title}}</span>
                <select name="" id="" class="form-control border-start-0" @click="_Init" v-model="search_value"
                @change="$emit('FilterData',{name_field:name_field, search_value : search_value});">
                    <option value="" selected>---CHỌN ĐƠN VỊ---</option>
                    <option :value="item.id" v-for="(item, index) in data" :key="index">
                        {{item.customer_code}} | {{item.customer_name}}
                    </option>
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
            search_value : ""
        }
    },
    props : ['title','name_field'],
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetDataCustomer()
        },
        GetDataCustomer(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
                .then(async res => {
                    this.data = res.data.data.items
                })
                .catch(err => {})
            }
            catch (err) {
                console.log(err)
            }
        },
        RemoveFilter(){
            this.search_value = ""
        }

    }
}
</script>
<style lang="">
    
</style>