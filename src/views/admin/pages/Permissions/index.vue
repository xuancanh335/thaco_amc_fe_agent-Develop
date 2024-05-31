<template lang="">

    

    <section>
        <Create_Modal @RefreshData="GetDataRoles" ref="Create_Modal"></Create_Modal>
        <Delete_Modal @RefreshData="GetDataRoles" ref="Delete_Modal"></Delete_Modal>
        <Update_Modal @RefreshData="GetDataRoles" ref="Update_Modal"></Update_Modal>

        <Delete_UsersRoles_Modal @RefreshData="GetUsersByRoles" ref="Delete_UsersRoles_Modal"></Delete_UsersRoles_Modal>
        <Create_UsersRoles_Modal @RefreshData="GetUsersByRoles" ref="Create_UsersRoles_Modal"></Create_UsersRoles_Modal>

        <div class="d-flex gap-3">
            <div class="card card-one col-lg-3">
                <div class="card-header p-3 d-flex align-items-center">
                    <div class="flex-grow-1">
                        <h6 class="mb-0 card-title">QUẢN LÝ ROLE</h6>
                        <small class="text-muted">Quản lý danh sách role người dùng</small>     
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <div class="hover-rotate-reverse cursor-pointer">
                            <IconRefresh :size="28" stroke-width="" class="d-flex p-1" />
                        </div>

                        <button 
                            class="btn bg-success rounded-circle p-1 border-0 text-white hover-jello"
                            @click="$refs.Create_Modal._Init()"
                        >
                            <IconPlus :size="26" stroke-width="2" class="d-flex p-1" />
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-column gap-2 ListRoles overflow-auto custom-scrollbar" style="max-height:78vh">
                        <div 
                            class="card cursor-pointer _Item" 
                            v-for="(item, index) in roles" :key="index" 
                            @click="SelectRoles(item)"
                            :class="{'active' : roles_selected == item.id}"
                        >
                            <div class="card-body d-flex align-items-center" style="padding:12px">
                                <p class="mb-0 fw-semibold text-uppercase flex-grow-1">{{item.profile_name}}</p>
                                <div class="d-flex gap-1">
                                    <div class="form-check form-switch m-auto p-0 d-flex cursor-pointer me-3">
                                        <input type="checkbox" class="form-check-input form-check-input m-auto px-3 py-2 rounded-5 cursor-pointer" id="customswitchv2-2" :checked="item.is_active" @click="$refs.Update_Modal.UpdateStatus(item,!item.is_active)">
                                    </div>
                                    <IconPencil 
                                        :size="24" 
                                        stroke-width="2" 
                                        class="d-flex p-1 bg-info bg-gradient text-white rounded-2 cursor-pointer fx-hover"
                                        @click="$refs.Update_Modal._Init({id : item.id})"
                                    />
                                    <IconX 
                                        :size="24" stroke-width="2" 
                                        class="d-flex p-1 bg-danger bg-gradient text-white rounded-2 cursor-pointer fx-hover" 
                                        @click="$refs.Delete_Modal._Init({id : item.id})"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-100">
                <ul class="nav nav-pills mb-2" id="permission-users-tab">
                    <li class="nav-item me-2" role="presentation">
                        <button class="nav-link border p-2 rounded-3 d-flex align-items-center gap-2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#tab-pane-permission" type="button" role="tab" aria-controls="pills-home" aria-selected="true" :class="{'disabled cursor-not-allow' : roles_selected == null, 'active' : roles_selected != null}">
                            <div>
                                <IconKey :size="32" stroke-width="2" class="d-flex p-2 bg-dark bg-opacity-25 text-white rounded-3" />
                            </div>
                            <h6 class="mb-0 text-uppercase">Ds Phân Quyền</h6>
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link border p-2 rounded-3 d-flex align-items-center gap-2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#tab-pane-users" type="button" role="tab" aria-controls="pills-home" aria-selected="true" :class="{'disabled cursor-not-allow' : roles_selected == null}">
                            <div>
                                <IconUsers :size="32" stroke-width="2" class="d-flex p-2 bg-dark bg-opacity-25 text-white rounded-3" />
                            </div>
                            <h6 class="mb-0 text-uppercase">Ds Người Dùng</h6>
                        </button>
                    </li>
                </ul>
             
                    <div class="tab-content" id="pills-tabContent">
                        
                        <div class="tab-pane fade show active" id="tab-pane-permission" role="tabpanel">
                            <div class="card card-one w-100 h-100">
                                <div class="card-header p-3 d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-0 card-title fw-bold">QUẢN LÝ ROLE</h6>
                                        <small class="text-muted">Quản lý danh sách role người dùng</small>     
                                    </div>
                                    <!-- <div class="d-flex align-items-center gap-2">
                                        <div class="hover-rotate-reverse cursor-pointer">
                                            <IconRefresh :size="28" stroke-width="" class="d-flex p-1" />
                                        </div>
                                        <button data-bs-toggle="modal" data-bs-target="#Modal_AddNewRole" class="btn bg-success rounded-circle p-1 border-0 text-white hover-jello" href="#">
                                            <IconPlus :size="26" stroke-width="2" class="d-flex p-1" />
                                        </button>
                                    </div> -->
                                </div>
                                <div class="card-body p-0 " >         
                                    <div class="position-absolute w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column" v-if="roles_selected == null">
                                        <img src="/assets/images/no-choice.svg" alt="" width="300">
                                        <h5 class="fw-light text-uppercase text-muted">Chưa chọn quyền hiển thị</h5>
                                    </div>    
                                    <div class="overflow-auto custom-scrollbar" style="height:75vh">
                                        <table class="table table-lg mb-0">
                                            <thead>
                                                <tr class="bg-light text-uppercase">
                                                    <th scope="col" width="5%" class="text-center">#</th>
                                                    <th scope="col">Chức năng</th>
                                                    <th scope="col" class="text-center">Quyền truy cập</th>
                                                    <th scope="col" class="text-center">Quyền xem</th>
                                                    <th scope="col" class="text-center">Quyền tạo</th>
                                                    <th scope="col" class="text-center">Quyền sửa</th>
                                                    <th scope="col" class="text-center">Quyền xóa</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(object, index) in objects" :key="index">
                                                    <td class="text-center">{{index + 1}}</td>
                                                    <th>{{object.display_name}}</th>
                                                    <td v-for="(permission, index) in test" :key="index">
                                                        <div class="form-check form-switch m-auto p-0 d-flex cursor-pointer me-3 justify-content-center">
                                                            <input 
                                                                type="checkbox" 
                                                                class="form-check-input form-check-input m-auto px-3 py-2 rounded-5 cursor-pointer" id="customswitchv2-2" 
                                                                :checked="CheckPermission(permission,object)"
                                                                @click="ChangePermission(permission,object)"
                                                            >
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="tab-pane-users" role="tabpanel">
                            <div class="card card-one">
                                <div class="card-header p-3 d-flex align-items-center">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-0 card-title fw-bold">QUẢN LÝ NGƯỜI DÙNG</h6>
                                        <small class="text-muted">Quản lý danh sách người dùng của role</small>     
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="hover-rotate-reverse cursor-pointer">
                                            <IconRefresh :size="28" stroke-width="" class="d-flex p-1" />
                                        </div>
                                        <button 
                                            class="btn bg-success rounded-circle p-1 border-0 text-white hover-jello"
                                            href="#"
                                            @click="$refs.Create_UsersRoles_Modal._Init({id : roles_selected, user_exits : users})"
                                        >
                                            <IconPlus :size="26" stroke-width="2" class="d-flex p-1" />
                                        </button>
                                    </div>
                                </div>

                                <div class="card-body p-0 overflow-auto custom-scrollbar" style="height:75vh">
                                    <div class="position-absolute w-100 h-100 bg-light d-flex align-items-center justify-content-center flex-column" v-if="roles_selected == null">
                                        <img src="/assets/images/no-choice.svg" alt="" width="300">
                                        <h5 class="fw-light text-uppercase text-muted">Chưa chọn quyền hiển thị</h5>
                                    </div>            
                                    <table class="table table-striped align-middle">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="text-center" scope="col" width="10%">STT</th>
                                                <th scope="col" width="20%">Thông tin người dùng</th>
                                                <th scope="col" width="20%">Email</th>
                                                <th scope="col" width="20%">Diễn giải</th>
                                                <th scope="col" width="10%">Người tạo</th>
                                                <th scope="col" width="20%" class="text-center"><IconDots :size="20" stroke-width="2" class="text-muted" /></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in users" :key="index">
                                                <th class="text-center" scope="row">{{index + 1}}</th>
                                                <td>
                                                    <div class="d-flex gap-3 align-items-center">
                                                        <div class="rounded-circle overflow-hidden border " style="width:40px; height:40px">
                                                            <img :src="app_path + item.avatar" class="w-100 h-100 object-fit-cover" alt="" srcset="" @error="imageError">
                                                        </div>
                                                        <div class="lh-1">
                                                            <h6 class="fw-bold mb-0">{{item.fullname}}</h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{{item.email}}</td>
                                                <td>{{item.description}}</td>
                                                <td>{{item.create_by}}</td>
                                                <td class="text-center">
                                                    <button 
                                                        type="button" class="btn btn-danger bg-gradient btn-sm p-1"
                                                        @click="$refs.Delete_UsersRoles_Modal._Init(
                                                            {
                                                                username : item.username, 
                                                                profile_id : roles_selected, 
                                                            }
                                                        )"
                                                    >
                                                        <IconX color="white" :size="20" stroke-width="2" class="d-flex" />
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
            </div>
            
        </div>
    </section>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'
import Create_Modal from './modal/Create_Modal.vue'
import Update_Modal from './modal/Update_Modal.vue'
import Delete_Modal from './modal/Delete_Modal.vue'
import Delete_UsersRoles_Modal from './modal/Delete_UsersRoles_Modal.vue'
import Create_UsersRoles_Modal from './modal/Create_UsersRoles_Modal.vue'




const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
const API_USER_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;

export default {

    data(){
        return {
            roles :[],
            objects : [],
            permissions : [],
            users : [],
            roles_selected : null,
            test : ['is_show','is_allow_access','is_allow_create','is_allow_edit','is_allow_delete'],
            authorize : {},
            current_user : {},
            app_path : null,
        }
    },

    created(){
        this.app_path = import.meta.env.VITE_APP_PATH;
        this._Init();
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetDataRoles()
            this.GetDataObjects()
        },

        async GetDataRoles(){
            let params = {page: 0,limit: 0,}
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            let response = await axios.post(API_USER_PATH + '/profile/get-all',params, config)
            this.roles = response.data.data.items
        },

        async SelectRoles(e){
            this.roles_selected = e.id
            await this.GetPermissionByRoles()
            await this.GetUsersByRoles()
        },

        async GetUsersByRoles(){
            // this.permissions = []
            let params = {
                page: 0,
                limit: 0,
                search_list: [
                    {
                    "name_field": "profile_id",
                    "value_search": this.roles_selected
                    }
                ],
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            let response = await axios.post(API_USER_PATH + '/profile/get-list-user-by-profile',params, config)
            this.users = response.data.data.items
        },

        async GetPermissionByRoles(){
            this.permissions = []
            let params = {
                page: 0,
                limit: 0,
                request : {
                    profile_id : this.roles_selected
                }
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            let response = await axios.post(API_USER_PATH + '/permission/get-list-permission-by-profile',params, config)
            console.log(response)
            this.permissions = response.data.data.items
        },

        async GetPermissionByRoles(){
            let params = {
                page: 0,
                limit: 0,
                request : {
                    profile_id : this.roles_selected
                }
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            let response = await axios.post(API_USER_PATH + '/permission/get-list-permission-by-profile',params, config)
            this.permissions = response.data.data.items
        },

        CheckPermission(permission,object){
            let rules = this.permissions.find(item => item.permissionobject_id === object.id)
            if(rules){return rules[permission] ? true : false}  
        },

        async GetDataObjects(e){
            let params = {page: 0,limit: 0,}
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            let response = await axios.post(API_USER_PATH + '/permission-object/get-all',params, config)
            this.objects = response.data.data.items
        },

        async ChangePermission(permission,object){

            console.log(object)
            console.log(this.permissions)


            let rules = this.permissions.find(item => item.permissionobject_id === object.id)
            if(rules != undefined && rules != null && rules != ''){
                this.UpdatePermission({'data' : rules, 'permission' : permission, value : event.target.checked })
            }else{
                this.CreatePermission({'data' : object, 'permission' : permission, value : event.target.checked })
            }
        },

        CreatePermission(rules){
            try {
                const params = {
                    profile_id              : this.roles_selected,
                    permissionobject_id     : rules.data.id,
                    object_name             : rules.data.object_name,
                    is_active               : true,
                    description             : '',
                }
                if(rules.permission){
                    params[rules.permission] = rules.value
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_USER_PATH + '/permission/create',params,config)
                .then(async res => {
                    ShowToast({status_code : 200, message : 'Cập nhật quyền thành công'});
                    this.GetPermissionByRoles()
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Cập nhật quyền thất bại'});
                })
            } catch (err) {
                ShowToast({status_code : 401, message : 'Cập nhật quyền thất bại'});
            }
        },

        UpdatePermission(rules){
            try {
                const params = {
                    profile_id              : rules.data.profile_id,
                    permissionobject_id     : rules.data.permissionobject_id,
                    object_name             : rules.data.object_name,
                    is_active               : true,
                    id                      : rules.data.id,
                }
                if(rules.permission){
                    params[rules.permission] = rules.value
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_USER_PATH + '/permission/update',params,config)
                .then(async res => {
                    ShowToast({status_code : 200, message : 'Cập nhật quyền thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Cập nhật quyền thất bại'});
                })
            } catch (err) {
                ShowToast({status_code : 401, message : 'Cập nhật quyền thất bại'});
            }
        },
        imageError(event) {event.target.src = '/assets/images/avatar-default.webp';},

    },
    components : {
        ...Icons,
        Create_Modal,Delete_Modal,Update_Modal,Delete_UsersRoles_Modal,Create_UsersRoles_Modal
    }
}



</script>
<style lang="scss">
    .ListRoles{
        ._Item{
            transition: .2s ease-in-out;
            &.active{
                transition: .2s ease-in-out;
                background: #00529c;
                color:#FFFFFF;
            }
            
        }
    }
    #permission-users-tab{
        .nav-item{
            .nav-link{
                color:#c4c7ca;
                &.active{
                    background-color: #00529c;
                    color:#FFFFFF;
                }
                
            }
        }
    }
</style>