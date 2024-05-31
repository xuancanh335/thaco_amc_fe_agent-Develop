<template lang="">
    <div class="modal fade" id="Modal_CreateUser" tabindex="-1" aria-labelledby="Modal_CreateUserLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-5 d-flex justify-content-between align-items-top">
                        <div class="d-flex gap-3 align-items-center">
                            <div>
                                <div class="bg-success bg-opacity-25 rounded-circle p-2 text-success">
                                    <IconPlus :size="36" stroke-width="2" class="d-flex" />
                                </div>
                            </div>
                            <div>
                                <h5 class="mb-1">Tạo người dùng mới</h5>
                                <p class="text-muted mb-0">Tạo người dùng mới dựa trên dữ liệu</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-top mb-3">
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-5">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tên đầy đủ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconUser  :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="form.fullname" placeholder="Nhập tên đầy đủ..." require>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Email</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMail  :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="email" class="form-control shadow-none" v-model="form.email" placeholder="Nhập tên email người dùng..." require>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Số điện thoại</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconPhone  :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="tel" class="form-control shadow-none" v-model="form.phone" placeholder="Nhập số điện thoại..." v-mask="'###.###.####.##'" require>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Diễn giải</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconQuote  :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <textarea type="text" class="form-control shadow-none" v-model="form.description" placeholder="Nhập diễn giải..." rows="1"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-7">
                            <div class="card text-left h-100 bg-light" style="max-height: 320px;">
                                <div class="card-header bg-light d-flex justify-content-between align-items-center">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="input-group input-group-sm">

                                            <input type="text"  @input="SearchTenant" class="form-control shadow-none border-end-0 bg-transparent" placeholder="Tên đơn vị cần tìm..." aria-label="Username" aria-describedby="basic-addon1" style="max-width: 250px;" :disabled="is_master" :readonly="is_master">

                                            <span class="input-group-text bg-transparent py-0 px-2 border-start-0" id="basic-addon1">
                                                <IconSearch :size="18" stroke-width="1" class="d-flex" />
                                            </span>
                                        </div>

                                        <div v-if="current_user">
                                            <div v-if="current_user.is_root_group == 1" class="form-switch d-flex align-items-center gap-1">
                                                <input class="form-check-input form-control rounded-5 mb-1" type="checkbox" role="switch" style="height: 20px; width: 35px;" @click="ChoiceMaster" :checked="is_master">
                                                <label class="text-nowrap">Quản trị tất cả tập đoàn</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="!is_master">
                                        <a v-if="select_all" class="cursor-pointer" @click="SelectAllTenant(true)">
                                            <span>Chọn tất cả</span>
                                        </a>
                                        <a v-else class="cursor-pointer" @click="SelectAllTenant(false)">
                                            <span>Bỏ chọn tất cả</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="card-body custom-scrollbar h-100 position-relative" 
                                    :class="is_master ? 'overflow-hidden' : 'overflow-auto'"
                                >
                                    <div v-if="is_master" class="position-absolute w-100 h-100 bg-primary bg-opacity-10 top-0 start-0 d-flex align-items-center justify-content-center" style="z-index:9;backdrop-filter: blur(5px);">
                                        <div class="d-flex align-items-center flex-column mb-4">
                                            <IconLock :size="40" stroke-width="1.3" class="d-flex text-primary mb-2" />
                                            <span class="text-primary">Đã chọn quyền quản trị cao nhất</span>
                                        </div>
                                    </div>
                                    <div class="card text-left mb-2" v-for="(item, index) in tenant_filter" :key="index">
                                        <div class="card-body px-3 py-2">
                                            <div class="form-check d-flex gap-3">
                                                <div>
                                                    <input class="form-check-input scale-1x cursor-pointer" type="checkbox" value="" id="flexCheckChecked" @change="SelectTenant(item.id)" :checked="item.is_selected">
                                                </div>
                                                <div class="d-flex gap-1" v-if="current_user.is_type_account == 0 && current_user.is_root_group == 1">
                                                    <div>{{item.group_code}}</div>
                                                    <div>|</div>
                                                    <div>{{item.group_name}}</div>
                                                </div>

                                                <div class="d-flex gap-1" v-else>
                                                    <div>{{item.tenant_code}}</div>
                                                    <div>|</div>
                                                    <div>{{item.tenant_name}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="CreateUser">Tạo người dùng mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
const auth = JSON.parse(localStorage.getItem('authorize'))
const API_PROJECT_PATH = import.meta.env.VITE_API_PATH_STORE;
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
export default {
    data(){
        return {
            type : null,
            form : {
                fullname        : null,
                phone           : null,
                email           : null,
                description     : null,
                is_active       : true,
            },
            current_user : null,
            authorize : null,
            tenant : [],
            tenant_selected : [],
            tenant_filter : [],
            tenant_master : [],
            search : '',
            select_all : true,
            is_master:false,
        }
    },
    props : {
        item : String
    },
    components : {...Icons},
    async created(){
        await this._Init()
    },
    mounted(){
        var modal = document.getElementById('Modal_CreateUser')
        var main = this
        modal.addEventListener('shown.bs.modal', async function (event) {
            await main.GetTenantData();
            main.is_master = false
            main.tenant_selected = []
            // console.log(this.dataset.core)
        })
    },
    methods : {
        ChoiceMaster(){
            this.is_master = !this.is_master
            this.tenant_filter.map(item => {
                item.is_selected = this.is_master
            })
            this.tenant.map(item => {item.is_selected = this.is_master})
            this.tenant_selected = []
            if(this.is_master){
                this.tenant_selected.push(this.tenant_master.id)
            }
        },

        SearchTenant(){
            this.tenant_filter = this.tenant.filter(item => 
                {
                    if(this.current_user.is_type_account == 0){
                        return (
                            this.SearchValueFormat(item.group_name).includes(this.SearchValueFormat(event.target.value)) || 
                            this.SearchValueFormat(item.group_code).includes(this.SearchValueFormat(event.target.value))
                        )
                    }else{
                        return (
                            this.SearchValueFormat(item.tenant_name).includes(this.SearchValueFormat(event.target.value)) || 
                            this.SearchValueFormat(item.tenant_code).includes(this.SearchValueFormat(event.target.value))
                        )
                    }
                }
            )
        },

        SearchValueFormat(str) {
            str = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return str;
        },

        SelectTenant(e) {
            const tenant = this.tenant_filter.find(item => item.id === e);
            if (!tenant) return;
            tenant.is_selected = event.target.checked;
            if (tenant.is_selected) {
                this.tenant_selected.push(e);
            } else {
                this.tenant_selected = this.tenant_selected.filter(item => item !== e);
            }
        },

        SelectAllTenant(e){
            this.select_all = e
            this.tenant_filter.map(item => {
                item.is_selected = this.select_all
                this.tenant_selected.push(item.id)
            })
            this.tenant.map(item => {item.is_selected = this.select_all})          
            this.select_all ? this.tenant_selected : this.tenant_selected = []
            this.select_all = !this.select_all
        },

        async CreateUser(){
            if(this.tenant_selected.length >= 1){
                const params = this.form
                if(this.current_user.is_type_account == 0 && this.current_user.is_root_group == 1){
                    params.is_type_account = this.is_master ? this.current_user.is_type_account : 1
                    params.lstGroup_id = this.tenant_selected
                }
                else{
                    params.is_type_account = this.is_master ? this.current_user.is_type_account : 2
                    params.lstTenant_id = this.tenant_selected
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                var Modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateUser'));
                await axios.post(API_USER_PATH + '/user/create',params,config)
                .then(async res => {
                    this.$emit('RefreshData');
                    Modal.hide();
                    ShowToast({status_code : 200, message : 'Tạo người dùng thành công'});
                })
                .catch(err => {
                    if(err.response.data.error_code == 11){
                        ShowToast({status_code : 401, message : 'Người dùng đã tồn tại'});
                    }else{
                        ShowToast({status_code : 401, message : Object.values(err.response.data.errors)[0]});
                    }         
                })
            }else{
                ShowToast({status_code : 401, message : 'Chưa chọn đơn vị'});
            }
        },

        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
        },
        async GetTenantData(){
            if(this.current_user.is_type_account == 0 && this.current_user.is_root_group == 1){
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};            
                await axios.post(API_USER_PATH + '/group/get-all',params,config)
                .then(async res => {
                    res.data.data.items.map(item => {
                        item.is_selected = false
                    })
                    this.tenant_master = res.data.data.items.find(item => item.is_root === 1)
                    this.tenant_filter = res.data.data.items.filter(item => item.is_root !== 1) 
                    this.tenant = res.data.data.items.filter(item => item.is_root !== 1) 
                })
                .catch(err => {
                    console.error(err); 
                    ShowToast({status_code : 401, message : 'Không lấy được danh sách đơn vị'});
                })
            }else{
                const params = {
                    group_id : this.current_user.group_id
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};            
                await axios.post(API_USER_PATH + '/tenant/get-by-group-id',params,config)
                .then(async res => {
                    res.data.data.items.map(item => {
                        item.is_selected = false
                    })              
                    this.tenant_filter = res.data.data.items
                    this.tenant = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                    ShowToast({status_code : 401, message : 'Không lấy được danh sách đơn vị'});
                })
            }
        }
    }
}
</script>
<style lang="">
    
</style>