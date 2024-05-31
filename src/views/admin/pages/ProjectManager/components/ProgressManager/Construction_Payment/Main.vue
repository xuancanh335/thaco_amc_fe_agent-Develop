<template lang="">
    <Create_Legal ref="Create_Modal" @ReloadData="ReloadData"></Create_Legal>
    <Delete_Legal ref="Delete_Modal" @ReloadData="ReloadData"></Delete_Legal>
    <Update_Legal ref="Update_Modal" @ReloadData="ReloadData"></Update_Legal>
    <File_Legal ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Legal>

    <div class="row mb-3">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex mb-3">
                        <div class="d-flex align-items-center gap-3 flex-grow-1">
                            <div class="bg-gradient-blue text-white rounded-3 p-2 bg-opacity-25 ">
                                <IconCreditCard :size="22" class="d-flex" stroke-width="2" />
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold mb-1 text-primary">Tiến độ thanh toán 
                                    <span class="ms-2" v-if="value.length > 0">
                                        <span v-if="status == 1" class="badge bg-success fw-medium rounded-2 py-1 px-2 status-badge">Hoàn thành</span>
                                        <span v-if="status == 0" class="badge bg-danger fw-medium rounded-2 py-1 px-2 status-badge">Chưa hoàn thành</span>
                                    </span>
                                </h6>
                                <p class="mb-0 text-muted" style="font-size:12px">Quản lý tiến độ thanh toán</p>
                            </div>
                        </div>
                        <div class="position-absolute end-0 top-0 p-3" style="margin-top:2px"
                        v-if="$CheckPermission('Construction_Payment','is_allow_create')"
                        >
                            <button v-if="!view" @click="$refs.Create_Modal._Init({bravo_project_code : bravo_project_code})" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                                <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="accordion" :id="slug+'Parent'">
                                <div class="accordion-item rounded-0 border-bottom position-relative">
                                    <h2 class="accordion-header">
                                        <div class="w-100 border-0 p-3 accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+slug" aria-expanded="true">
                                            <div class="d-flex">
                                                <div class="d-flex align-items-center gap-3 flex-grow-1">
                                                    <div>
                                                        <h6 class="mb-0 fw-semibold">DANH SÁCH TIẾN ĐỘ THANH TOÁN</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </h2>
                                    <div :id="slug" class="accordion-collapse collapsed" :data-bs-parent="'#'+slug+'Parent'">
                                        <div class="accordion-body border-top p-0">
                                            <div class="table-responsive h-scrollbar" style="min-height:250px;max-height:250px">
                                                <table v-if="data && data.length != 0" class="table table-sm table-striped table-fixed align-middle" style="width:180%">
                                                    <thead>
                                                        <tr>
                                                            <th width="50" class="text-center bg-white">#</th>
                                                            <th width="120" class="text-capitalize py-2 text-center bg-white">Trạng thái</th>
                                                            <th width="400" class="py-2 bg-white">Nội dung pháp lý</th>
                                                            <th width="200" class="py-2 bg-white">Giá trị đầu tư</th>
                                                            <th width="400" class="text-capitalize py-2 bg-white">Diễn giải</th>
                                                            <th width="200" class="text-capitalize py-2 text-center bg-white">Ngày tạo</th>
                                                            <th width="200" class="text-capitalize py-2 text-center bg-white">Ngày dự kiến hoàn thành</th>
                                                            <th width="200" class="text-capitalize py-2 text-center bg-white">Người tạo</th>
                                                            <th width="100" class="text-capitalize py-2 text-center bg-white" style="z-index:999">
                                                                <IconDotsVertical :size="20" class="text-muted" stroke-width="2" />
                                                            </th>
                                                        </tr>
                                                        
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, index) in data" :key="index">
                                                            <td class="text-center text-back-50">{{index + 1}}</td>
                                                            <td class="text-center">
                                                                <ProjectStatus :status_content="item.status_content" :data="item" @ProjectStatus="ChangeStatus"></ProjectStatus>
                                                            </td>
                                                            <td class="text-capitalize">{{item.construction_payment_content}}</td>
                                                            <td>
                                                                <span>{{FormatCurrency(item.investment_value)}}</span>
                                                            </td>
                                                            <td>
                                                                <span>{{item.description}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{FormatDate(item.start_date,'DD/MM/YYYY')}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{FormatDate(item.estimated_date_finish,'DD/MM/YYYY')}}</span>
                                                            </td>
                                                            <td class="text-center">
                                                                <span>{{item.create_by}}</span>
                                                            </td>
                                                            <td>
                                                                <div class="d-flex gap-1 justify-content-center">
                                                                    
                                                                    <div v-if="$CheckPermission('Construction_Payment','is_allow_edit')">
                                                                        <button type="button" @click="Display(true,'file',item.id)" class="btn btn-primary bg-gradient btn-sm p-1">
                                                                            <IconPaperclip :size="16" class="d-flex text-white" stroke-width="2" />
                                                                        </button>
                                                                    </div>

                                                                    <div v-if="$CheckPermission('Construction_Payment','is_allow_edit')">
                                                                        <button v-if="!view" 
                                                                        @click="$refs.Update_Modal._Init({bravo_project_code : bravo_project_code,id:item.id})"
                                                                        type="button" class="btn btn-info bg-gradient btn-sm p-1">
                                                                            <IconPencil :size="16" class="d-flex text-white" stroke-width="2" />
                                                                        </button>
                                                                    </div>

                                                                    <div v-if="$CheckPermission('Construction_Payment','is_allow_delete')">
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
import Icons from '@Admin/common/js/Icons.js'
import Create_Legal from './modal/Create_Legal.vue';
import Delete_Legal from './modal/Delete_Legal.vue';
import Update_Legal from './modal/Update_Legal.vue';
import File_Legal from './modal/File_Legal.vue';
import ProjectStatus from '../../Common/ProjectStatus.vue';
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'
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
    props : ['data','title','subtitle','slug','view','bravo_project_code'],
    components: {
        ...Icons,
        Create_Legal,Delete_Legal,Update_Legal,File_Legal,ProjectStatus
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
            axios.post(API_USER_STORE + '/construction-payment/update',params,config)
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
            let TotalLegal = this.value.filter(item => (item.status_content === 2 || item.status_content === 3)).length
            TotalLegal == this.value.length ? this.status = 1 : this.status = 0
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
        FormatDate,FormatCurrency
    }
}
</script>
<style lang="">
    
</style>