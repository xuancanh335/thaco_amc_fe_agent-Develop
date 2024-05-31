<template lang="">
    <div class="modal fade" id="SelectTenant_Modal" data-bs-backdrop="static" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-4 d-flex">
                        <div class="d-flex gap-3 flex-grow-1 align-items-center">
                            <div class="bg-info rounded-circle p-2 text-white">
                                <IconBuildingCommunity :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div>
                                <h5>Thay đổi đơn vị</h5>
                                <p class="text-muted mb-0">Thay đổi sang đơn vị khác</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-top mb-3">
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label class="form-label d-flex justify-content-between">Chọn đơn vị</label>
                        <div class="dropdown">
                            <input type="text" class="form-control cursor-pointer" placeholder="Vui lòng chọn đơn vị..." data-bs-toggle="dropdown" aria-expanded="false" v-model="tenant_selected.tenant_name"/>
                            <ul class="dropdown-menu rounded-0 p-4" style="min-width:100%;">
                                <div class="custom-scrollbar list-tenant" style="max-height: 300px;overflow: auto;">
                                    <div v-if="tenant.length <= 0" class="text-center w-100">Không có dữ liệu</div>
                                    <div v-for="(item, index) in tenant" :key="index">
                                        <span 
                                            class="fw-bold dropdown-item cursor-pointer" 
                                            @click="ChoiceGroup(item)" 
                                            v-if="current_user.is_type_account == 1 || current_user.is_type_account == 0"
                                            >{{index}}
                                        </span>
                                        <div>
                                            <span class="fw-bold" v-if="is_type_account == 2">{{index}}</span>
                                                <div v-for="(tenant, index) in item" :key="index">
                                                    <div v-if="tenant">
                                                        <div
                                                            class="dropdown-item cursor-pointer fs-6 px-3"
                                                            @click="ChoiceTenant(tenant)"
                                                            v-if="tenant.tenant_code != ''">
                                                            {{tenant.tenant_code}} | {{tenant.tenant_name}}
                                                        </div>
                                                    </div>   
                                                </div>
                                            <hr>
                                        </div>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button class="w-100 btn btn-primary text-white p-2" @click="ChangeNewTenant">ÁP DỤNG ĐƠN VỊ</button>
                    </div>
                    <!-- <div class="d-flex justify-content-end gap-2 mt-5">
                        <button
                            v-if="step == 1"
                            type="button" 
                            class="btn bg-secondary bg-opacity-10" 
                            data-bs-dismiss="modal">Hủy bỏ</button>
                        <button 
                            v-if="step > 1"
                            type="button" 
                            class="btn bg-secondary bg-opacity-10" 
                            @click="step = step - 1"
                        >Trở về</button>
                        <button 
                            v-if="step == 1"
                            type="button" 
                            class="btn btn-success bg-gradient text-white" 
                            @click="[this.GetDataUsers(),step = step + 1]"
                        >Bước tiếp theo</button>

                        <button
                            v-if="step == 2"
                            type="button" 
                            class="btn btn-success bg-gradient text-white" 
                            @click="CreateData">Tạo quyền mới
                        </button>
                    </div> -->
                     
                </div>
            </div>
        </div>
    </div>
</template>
<script>
var modal
import axios from 'axios'
import Icons from '@Admin/common/js/Icons.js'
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
const API_USER_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;
import {ShowToast} from '@Helpers/Notify.js'
export default {
    data(){
        return {
            authorize : null,
            current_user : null,
            app_path : null,
            tenant : [],
            tenant_selected : {},
            is_select_group : false,
            group_selected : {}
        }
    },
    mounted(){
        modal = new bootstrap.Modal('#SelectTenant_Modal');
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            modal.show();
            await this.GetAllTenant()
        },

        async GetAllTenant(){
            let params = {};
            if((this.current_user.is_type_account == 1 || this.current_user.is_type_account == 0) && this.current_user.group_id != null){
                this.tenant_selected.tenant_name = this.current_user.group_name
            }else{
                this.tenant_selected.tenant_name = this.current_user.tenant_name
            }        
            let config = { headers: { Authorization: `Bearer ${this.authorize.token}` } };
            try {
                let response = await axios.post(API_USER_PATH + '/tenant/get-list-tenant-by-user', params, config);
                this.tenant = response.data.data.listTenant;
                let group = []
                await this.tenant.map(item => {
                    group[item.group_name] = []
                })
                await this.tenant.map(async item => {
                    let tenant = {
                        id : item.id,
                        tenant_code : item.tenant_code,
                        tenant_name : item.tenant_name,
                        group_id    : item.group_id,
                        group_name  : item.group_name
                    }
                    await group[item.group_name].push(tenant)
                })
                this.tenant = {...group}

            } catch (error) {
                // console.error(error);
                // return false;
            }
        },

        ChoiceTenant(e){
            this.is_select_group = false
            this.tenant_selected = e
        },

        ChoiceGroup(e){
            try {
                this.is_select_group = true
                if(e || e === 0){
                    this.tenant_id = null
                    this.tenant_selected.tenant_name = e[0].group_name
                    this.group_selected = {
                        group_id    : e[0].group_id,
                        group_name  : e[0].group_name
                    }
                }else{ShowToast({status_code : 401, message : 'Tập đoàn không xác định'})}
            } catch (error) {ShowToast({status_code : 401, message : 'Tập đoàn không xác định'})}
        },

        async ChangeNewTenant(){
            let params = {};
            if(this.is_select_group){
                params.group_id = this.group_selected.group_id
            }else{
                params.tenant_id = this.tenant_selected.id
            }
            params.email = this.current_user.email

            let config = { headers: { Authorization: `Bearer ${this.authorize.token}` } };
            try {
                let response = await axios.post(API_USER_PATH + '/auth/re-login', params, config);
                let authorize = {
                    tenant_id : await response.data.data.tenant_id,
                    token : await response.data.data.token,
                }
                await this.getInfoUser(response.data.data)
                localStorage.setItem('authorize',JSON.stringify(authorize))
                ShowToast({status_code : 200, message : 'Chuyển đơn vị thành công'})
                this.$router.replace('/admin'); 
                setTimeout(() => {
                    this.$router.go(0)
                }, 1000);
            } catch (error) {
                ShowToast({status_code : 401, message : 'Chuyển đơn vị thất bại'})
            }
        },

        async getInfoUser(e){
           
            // let authorize = JSON.parse(this.user_login.authorize);
            // if (this.authorize.token || this.authorize.token === 0) {
                let params
            if(this.current_user.is_type_account == 0){
                params = {
                    item : await e.email,
                }
            }

            if(this.current_user.is_type_account == 1){
                params = {
                    item : await e.email,
                }
            }

            if(this.current_user.is_type_account == 2){
                params = {
                    item : await e.email,
                    tenant_id : await e.tenant_id,
                }
            }                
            const config = {headers: {Authorization: `Bearer ${e.token}`}};
            await axios.post(API_USER_PATH + '/user/get-info-by-username',params,config)
            .then(async res => {
                localStorage.setItem('current_user', await JSON.stringify(res.data.data))
            })
            .catch(err => {
                console.error(err); 
            })
        },
    },
    components : {...Icons}
}
</script>
<style lang="">
    
</style>