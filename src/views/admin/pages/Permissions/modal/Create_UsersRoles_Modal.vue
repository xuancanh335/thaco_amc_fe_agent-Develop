<template lang="">
    <div class="modal  fade" id="Create_UsersRoles_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-4">
                        <div class="d-flex align-items-top mb-3">
                            <div class="bg-success bg-opacity-25 rounded-circle p-2 text-success">
                                <IconPlus :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                        <div>
                            <h5>Thêm người dùng vào role</h5>
                            <p class="text-muted mb-0">Thêm người dùng mới dựa trên dữ liệu</p>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-column gap-2 overflow-auto custom-scrollbar" style="max-height:340px">
                        
                        <div class="card" v-for="(item, index) in users" :key="index">
                            <div class="card-body d-flex gap-3 align-items-center" style="padding : 10px 20px">
                                <div class="me-2">
                                    <input class="form-check-input scale-1x cursor-pointer" type="checkbox" id="flexCheckChecked" @change="SelectUser(item.username)">
                                </div>
                                <div>
                                    <div class="rounded-circle overflow-hidden" style="height : 36px; width : 36px;">
                                        <img :src="app_path + item.avatar" class="w-100 h-100 object-fit-cover" alt="" srcset="" @error="imageError">
                                    </div>  
                                </div>
                                <div>
                                    <h6 class="fw-bold text-uppercase mb-0">{{item.fullname}}</h6>
                                    <small class="mb-0 text-muted">{{item.username}}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient text-white" @click="AddUserToRoles">Thêm người dùng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
import {ShowToast} from '@Helpers/Notify.js'
const auth = JSON.parse(localStorage.getItem('authorize'))
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
const API_USER_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;
var modal
export default {
    data(){
        return {
            filter:{},
            init : null,
            type : null,
            data : {},
            users : [],
            app_path : null,
            users_selected : [],
            users_filtered : []
        }
    },
    props : {
        item : String
    },

    mounted(){
        modal = new bootstrap.Modal('#Create_UsersRoles_Modal');
    },
    methods : {

        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            modal.show();
            this.GetDataUsers()
        },

        SearchValueFormat(str) {
            str = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return str;
        },

        async AddUserToRoles(){
            let params = {
                profile_id : this.init.id,
                usernames : this.users_selected
            }
            let config = { headers: { Authorization: `Bearer ${this.authorize.token}` } };
            try {
                let response = await axios.post(API_USER_PATH + '/profile/add-user-to-profile', params, config);
                ShowToast({status_code : 200, message : 'Thêm người dùng thành công'});
                modal.hide();
                this.$emit('RefreshData');
            } catch (error) {
                ShowToast({status_code : 200, message : 'Thêm người dùng thất bại'});
            }
        },

        GetDataUsers(){
            let params = {
                limit : 0,
                page : 0,
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(API_USER_PATH + '/user/get-all',params, config)
            .then(async res => {
                var users_data = await res.data.data.items
                await users_data.unshift(this.current_user) 
                this.users = users_data.filter(data_1 => !this.init.user_exits.some(data_2 => data_1.username === data_2.username));
            })
            .catch(err => {
                ShowToast({status_code : 401, message : 'Không lấy được danh sách người dùng'});
            })
        },

        imageError(event) {event.target.src = '/assets/images/avatar-default.webp';},

        SelectUser(username){
            event.target.checked ? 
            this.users_selected.push(username) : 
            this.users_selected = this.users_selected.filter(item => item.username == username)
        }

        
    },
    components: {...Icons,}
}
</script>
<style lang="">
    
</style>