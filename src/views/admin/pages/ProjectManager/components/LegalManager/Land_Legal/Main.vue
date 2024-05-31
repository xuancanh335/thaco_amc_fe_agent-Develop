<template lang="">
    <Create_Legal ref="Create_Modal" @ReloadData="ReloadData"></Create_Legal>
    <Delete_Legal ref="Delete_Modal" @ReloadData="ReloadData"></Delete_Legal>
    <Update_Legal ref="Update_Modal" @ReloadData="ReloadData"></Update_Legal>
    <File_Legal ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Legal>
    <div class="row mb-3">
        <div class="col-lg-12">
            <div class="card" style="border-color: #d7e1ff;border-width: medium;">
                <div class="card-body">
                    <div class="d-flex mb-3">
                        <div class="d-flex align-items-center gap-3 flex-grow-1">
                            <div class="bg-gradient-blue text-white rounded-3 p-2 bg-opacity-25 ">
                                <IconDimensions :size="22" class="d-flex" stroke-width="2" />
                            </div>
                            <div class="d-flex w-100 justify-content-between align-items-center">
                                <div>
                                    <h6 class="mb-0 fw-bold mb-1 text-gradient-blue">Pháp lý đất</h6>
                                    <p class="mb-0 text-muted" style="font-size:12px">Danh sách pháp lý đất</p>
                                </div>
                                <div class="d-flex gap-1" v-if="!view">
                                    <button class="btn bg-secondary bg-opacity-50 text-white btn-sm p-1 px-3" @click="DeleteLegalData">Xóa pháp lý</button>
                                    <button class="btn btn-success btn-sm p-1 px-3" @click="SaveLegalData">Lưu pháp lý</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3 bg-light">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="d-flex flex-column gap-2">
                                        <div class="row">
                                            <div class="col-lg-5">
                                                <div class="d-flex align-items-center h-100">
                                                    <IconKey :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                                    <span class="ms-2">Mục đích sử dụng đất :</span>
                                                </div>
                                            </div>
                                            <div class="col-lg-7">
                                                <input type="text" class="form-control form-control-sm" placeholder="Nhập mục đích sử dụng đất ..." :readonly="view" :disabled="view" v-model="data.land_function">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-5">
                                                <div class="d-flex align-items-center h-100">
                                                    <IconFileInfo :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                                    <span class="ms-2">Hình thức sử dụng đất :</span>
                                                </div>
                                            </div>
                                            <div class="col-lg-7">
                                                <input type="text" class="form-control form-control-sm" placeholder="Nhập hình thức sử dụng đất..." :readonly="view" :disabled="view" v-model="data.land_use_type">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="d-flex flex-column gap-2">
                                        <div class="row">
                                            <div class="col-lg-5">
                                                <div class="d-flex align-items-center h-100">
                                                    <IconKey :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                                    <span class="ms-2">Nguồn gốc tạo lập :</span>
                                                </div>
                                            </div>
                                            <div class="col-lg-7">
                                                <input type="text" class="form-control form-control-sm" placeholder="Nhập nguồn gốc tạo lập ..." :readonly="view" :disabled="view" v-model="data.land_origin">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="accordion" :id="slug+'Parent'">
                                <div class="accordion-item rounded-0 border-bottom position-relative">
                                    <h2 class="accordion-header">
                                        <div class="w-100 border-0 p-3 collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+slug" aria-expanded="true">
                                            <div class="d-flex">
                                                <div class="d-flex align-items-center gap-3 flex-grow-1">
                                                    <div>
                                                        <h6 class="mb-0 fw-semibold">
                                                            DANH SÁCH PHÁP LÝ ĐẤT
                                                            <span v-if="value.lstLandLegal">
                                                                <span class="ms-2" v-if="value.lstLandLegal.length > 0">
                                                                    <span v-if="status == 1" class="badge bg-success fw-medium rounded-2 py-1 px-2 status-badge">Hoàn thành</span>
                                                                    <span v-if="status == 0" class="badge bg-danger fw-medium rounded-2 py-1 px-2 status-badge">Chưa hoàn thành</span>
                                                                </span>
                                                            </span>
                                                        </h6>
                                                        
                                                    </div>
                                                    
                                                    <div class="position-absolute end-0 top-0 p-1 pe-2"
                                                    v-if="$CheckPermission('Invest_Legal','is_allow_create')"
                                                    >
                                                        <button v-if="!view" @click="Display(true,'create')" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                                                            <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </h2>
                                    <div :id="slug" class="accordion-collapse collapse" :data-bs-parent="'#'+slug+'Parent'">
                                        <div class="accordion-body border-top p-0">
                                            <div class="table-responsive h-scrollbar" 
                                                v-if="$CheckPermission('Land_Legal','is_allow_access')"
                                                style="max-height:250px"
                                            >
                                                <table v-if="data.lstLandLegal && data.lstLandLegal.length != 0" class="table table-sm table-striped table-fixed align-middle" style="width:200%">
                                                    <thead>
                                                        <tr>
                                                            <th width="50" class="bg-white text-center">#</th>
                                                            <th width="120" class="bg-white text-capitalize py-2 text-center">Trạng thái</th>
                                                            <th width="400" class="bg-white py-2">Nội dung pháp lý</th>
                                                            <th width="400" class="bg-white py-2">Quyền sử dụng đât</th>
                                                            <th width="400" class="bg-white text-capitalize py-2">Diễn giải</th>
                                                            <th width="200" class="bg-white text-capitalize py-2 text-center">Ngày tạo</th>
                                                            <th width="200" class="bg-white text-capitalize py-2 text-center">Ngày dự kiến hoàn thành</th>
                                                            <th width="200" class="bg-white text-capitalize py-2 text-center">Người tạo</th>
                                                            <th width="100" class="bg-white text-capitalize py-2 text-center" style="z-index:99">
                                                                <IconDotsVertical :size="20" class="text-muted" stroke-width="2" />
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in data.lstLandLegal" :key="index">
                                                            <td class="text-center text-back-50">{{index + 1}}</td>
                                                            <td class="text-center">
                                                                <ProjectStatus :status_content="item.status_content" :data="item" @ProjectStatus="ChangeStatus"></ProjectStatus>
                                                            </td>
                                                            <td class="text-capitalize">{{item.land_legal_content}}</td>
                                                            <td class="text-capitalize">{{item.land_legal_owner}}</td>
                                                            <td>
                                                                <span>{{item.description}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{FormatDate(item.start_date,'DD/MM/YYYY')}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{item.estimated_date_finish}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{item.create_by}}</span>
                                                            </td>
                                                            <td>
                                                                <div class="d-flex gap-1 justify-content-center">
                                                                    <button type="button" @click="Display(true,'file',item.id)" class="btn btn-primary bg-gradient btn-sm p-1"
                                                                    v-if="$CheckPermission('Land_Legal','is_allow_edit')"
                                                                    >
                                                                        <IconPaperclip :size="16" class="d-flex text-white" stroke-width="2" />
                                                                    </button>
                                                                    <div
                                                                    v-if="$CheckPermission('Land_Legal','is_allow_edit')"
                                                                    >
                                                                        <button v-if="!view" @click="Display(true,'update',item.id)" type="button" class="btn btn-info bg-gradient btn-sm p-1"
                                                                    >
                                                                        <IconPencil :size="16" class="d-flex text-white" stroke-width="2" />
                                                                    </button>
                                                                    </div>

                                                                    <div v-if="$CheckPermission('Land_Legal','is_allow_edit')">
                                                                        <button v-if="!view" @click="Display(true,'delete',item.id)" type="button" class="btn btn-danger bg-gradient btn-sm p-1">
                                                                            <IconX :size="16" class="d-flex text-white" stroke-width="2" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <div v-else>
                                                    <div class="w-100 d-flex align-items-center justify-content-center flex-column">
                                                        <div>
                                                            <img src="/assets/images/empty.svg" alt="" srcset="" width="200" style="opacity:.8">
                                                            <h5 class="fw-light text-muted">Không tìm thấy dữ liệu !</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import Create_Legal from './modal/Create_Legal.vue';
import Delete_Legal from './modal/Delete_Legal.vue';
import Update_Legal from './modal/Update_Legal.vue';
import File_Legal from './modal/File_Legal.vue';
import ProjectStatus from '../../Common/ProjectStatus.vue';
import {FormatDate} from '@Helpers/utils.js'
import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
const API_USER_STORE = import.meta.env.VITE_API_PATH_STORE;
const APP_PATH = import.meta.env.VITE_APP_PATH;
export default {
    data(){
        return{
            value : [],
            status : 0,
        }
    },
    props : {
        data    : Object,
        title   : String,
        ProjectId   : String,
        subtitle   : String,
        slug : String,
        view: Boolean,
        
    },
    components: {
        ...Icons,
        Create_Legal,Delete_Legal,Update_Legal,File_Legal,ProjectStatus
    },
    mounted(){
        this.CheckStatus()   
    },
    watch: {
        data: {
        immediate: true,
            handler(newData, oldData) {
                this.value = newData;
                this.CheckStatus()
            }
        }
    },
    created(){
        this._Init()
    },
    methods : {

        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
        },

        ChangeStatus(e){
            const params = e.data
            params.status_content = e.status.id
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            axios.post(API_USER_STORE + '/land-legal/update',params,config)
            .then(async res => {
                this.Display(false)
                this.ReloadData();
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
            })
        },
        CheckStatus(){
            if(this.data.lstLandLegal && this.data.lstLandLegal != undefined && this.data.lstLandLegal != ''){
                let TotalLegal = this.data.lstLandLegal.filter(item => (item.status_content === 2 || item.status_content === 3)).length
                TotalLegal == this.data.lstLandLegal.length ? this.status = 1 : this.status = 0
            }
        },

        SaveLegalData(){
            const params ={
                "id": this.data.id,
                "land_function": this.data.land_function,
                "land_origin": this.data.land_origin,
                "land_use_type": this.data.land_use_type,
                "project_id": this.ProjectId,
            }
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            axios.post(API_USER_STORE + '/land-legal/create-or-update-master',params,config)
            .then(async res => {
                this.ReloadData();
                ShowToast({status_code : 200, message : 'Lưu pháp lý thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
            })
        },

        DeleteLegalData(){
            const params = {
                item : this.data.id
            }
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            axios.post(API_USER_STORE + '/land-legal/delete-master',params,config)
            .then(async res => {
                this.ReloadData();
                ShowToast({status_code : 200, message : 'Xóa pháp lý thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 401, message : 'Xóa pháp lý thành công'});
            })
        },

        ReloadData(){
            this.$emit('ReloadData')
        },
        Display(value,modal,data){
            switch (modal) {
                case 'create':
                this.$refs.Create_Modal.Display(value)
                break;

                case 'delete':
                this.$refs.Delete_Modal.Display(value,data)
                break;

                case 'update':
                this.$refs.Update_Modal.Display(value,data)
                break;

                case 'file':
                this.$refs.File_Modal.Display(value,data)
                break;
            }
        },
        FormatDate
    }
}
</script>
<style lang="">
    
</style>