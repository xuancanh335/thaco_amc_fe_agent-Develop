<template lang="">
    
    <section v-if="$CheckPermission('User_Config','is_allow_access')">
        <Modal_CreateUser @RefreshData="getDataUser"></Modal_CreateUser>
        <Modal_DeleteUser 
            :item="this.item_selected" 
            @RefreshData="getDataUser"
            @resetSelected="ResetSelected"
        ></Modal_DeleteUser>
        <Modal_UpdateUser @RefreshData="getDataUser"></Modal_UpdateUser>
        
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-one">
                    <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="false">
                   
                        <button class="btn bg-success text-white rounded-circle p-2 border-0 hover-jello" data-bs-toggle="modal" data-bs-target="#Modal_CreateUser" v-if="$CheckPermission('User_Config','is_allow_create')">
                            <IconPlus color="white" :size="24" stroke-width="2" class="d-flex" />
                        </button>
                    </Filters>

                    <div class="card-body" style="min-height:70vh">
                        
                        <div v-if="data.length <= 0" class="position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light" style="z-index: 99;">
                            <img src="/assets/images/empty.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <p class="text-muted" style="font-size:14px">CHƯA TÌM THẤY DỮ LIỆU</p>
                        </div>

                        <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                            <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                        </div>

                        <div class="h-scrollbar table-responsive mb-3" style="min-height: 60vh;">
                            <table class="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th class="text-center" scope="col" width="4%">STT</th>
                                        <th scope="col" width="15%">Thông tin người dùng</th>
                                        <th scope="col" width="15%">Email</th>
                                        <th scope="col">Diễn giải</th>
                                        <th scope="col" width="10%">Ngày tạo</th>
                                        <th scope="col" width="10%">Người tạo</th>
                                        <th scope="col" class="text-center">Kích hoạt</th>
                                        <th scope="col" width="15%"><IconDots :size="20" stroke-width="2" class="text-muted" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <th class="text-center" scope="row">
                                            <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                            <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>    
                                        </th>
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
                                        <td>{{FormatDate(item.create_time,'DD/MM/YYYY')}}</td>
                                        <td>{{item.create_by}}</td>
                                        <td>
                                            <div class="form-check form-check-danger form-switch d-flex justify-content-center">
                                                <input class="form-check-input form-check-input-info form-control rounded-5" style="height:20px; width:40px" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="item.is_active" 
                                                @click="ChangeUserStatus(item,index)">
                                            </div>
                                        </td>
                                        <td>
                                            <div class="d-flex gap-1">
                                                <button type="button" class="btn btn-info bg-gradient btn-sm p-1"
                                                v-if="$CheckPermission('User_Config','is_allow_edit')" 
                                                @click="OpenModal({
                                                    modal : 'Modal_UpdateUser',
                                                    item : item.username
                                                })">
                                                    <IconPencil color="white" :size="20" stroke-width="2" class="d-flex" />
                                                </button>
                                                <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" data-bs-toggle="modal" data-bs-target="#Modal_DeleteUser" 
                                                @click="this.item_selected = item.username"
                                                v-if="$CheckPermission('User_Config','is_allow_delete')"
                                                >
                                                    <IconX color="white" :size="20" stroke-width="2" class="d-flex" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <Paginate
                            :total="paginate.total"
                            :limit="paginate.limit"
                            @Handle="changePaginate"
                        ></Paginate>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Icons from '@Admin/common/js/Icons';
import Modal_CreateUser from './modal/Create_User.vue';
import Modal_DeleteUser from './modal/Delete_User.vue';
import Modal_UpdateUser from './modal/Update_User.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import {ShowToast} from '@Helpers/Notify.js'
import Paginate from '@Admin/components/common/Paginate.vue'
const auth = JSON.parse(localStorage.getItem('authorize'))
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
import Filters from '@Admin/components/common/Filters.vue'
import {FormatDate} from '@Helpers/utils.js'

export default {
    data(){
        return {
            preloader : true,
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            filter : {
                request : {
                    start_time : null,
                    end_time : null,
                },
            },
            data : [],
            item_selected : null,
            item : null,

            current_user : null,
            authorize : null,
            app_path : null,
        }
    },
    async created(){
        const AppPath = import.meta.env.VITE_APP_PATH;
        this._Init()
        this.getDataUser()
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.app_path = import.meta.env.VITE_APP_PATH;
            this.current_user = current_user;
            this.authorize = authorize;
        },
        async OpenModal(e){
            bootstrap.Modal.getOrCreateInstance(document.getElementById(e.modal)).show();
            document.getElementById(e.modal).setAttribute('data-core', e.item);
        },
        async setDataFilter(e){
            this.filter = await e
            this.getDataUser()
        },
        ResetSelected(){this.item_selected = null},
        async ChangeUserStatus(e,index){
            
            const params = {
                username : e.email,
                is_active : event.target.checked
            }
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            await axios.post(API_USER_PATH + '/user/update-is-active',params,config)
            .then(async res => {
                this.getDataUser();
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
                ShowToast({status_code : 401, message : 'Cập nhật thật bại'});
            })
        },
        changePaginate(value){
            this.paginate.page = value.page
            this.paginate.limit = value.limit
            this.getDataUser()
        },
        getDataUser(){
            const data = {
                ...this.filter,
                page: this.paginate.page,
                limit: this.paginate.limit,
                "flag": true
            }
            axios({
                method:'post',
                url: API_USER_PATH + '/user/get-all',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                this.paginate.total = res.data.data.total
                this.data = res.data.data.items
                setTimeout(() => {
                    this.preloader = false
                }, 1000);
            })
        },
        imageError(event) {event.target.src = '/assets/images/avatar-default.webp';},
        FormatDate
    },
    computed : {
        
    },
    components: {
        ...Icons,
        Modal_CreateUser,Modal_DeleteUser,Modal_UpdateUser,Paginate,Filters
    }
}
</script>
<style lang="">
    
</style>