<template lang="">
    <div class="modal fade" id="Modal_CreateProposal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-5">
                        <div class="d-flex align-items-top mb-3 gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-success bg-opacity-25 rounded-circle p-2 text-success">
                                    <IconPlus :size="36" stroke-width="2" class="d-flex" />
                                </div>
                                <div>
                                    <h5 class="mb-1">Tạo chủ trương đầu tư</h5>
                                    <p class="text-muted mb-0">Tạo chủ trương đầu tư mới dựa trên dữ liệu</p>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Tên chủ trương</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconUser :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.proposal_name" placeholder="Nhập tên chủ trương ...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Thông tin tờ trình chủ trương</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.proposal_info" placeholder="Nhập thông tin tờ trình chủ trương ...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Thuộc dự án</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                            </span>

                            <el-select class="custom-selectbox flex-grow-1" v-model="data.project_id" filterable placeholder="---CHỌN DỰ ÁN ÁP DỤNG---" size="large" :teleported="false" :fit-input-width="true">
                                <el-option
                                v-for="item in projects"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>

                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Nhập ghi chú</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconKey :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập ghi chú ...">
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Chọn ngày bắt đầu</label>
                        <div class="d-flex">
                            <span class="input-group-text text-muted border-end-0 rounded-0 rounded-start" id="basic-addon1">
                                <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'" class="custom-datepicker icon"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="CreateProposal">Tạo chủ trương mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import {ShowToast} from '@Helpers/Notify.js'
const auth = JSON.parse(localStorage.getItem('authorize'))

const APP_PATH = import.meta.env.VITE_APP_PATH;
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;

import Icons from '@Admin/common/js/Icons.js'
import vueFilePond from 'vue-filepond';
const FilePond = vueFilePond();
import VueDatePicker from '@vuepic/vue-datepicker';

import { ElSelect,ElOption } from 'element-plus'

var modal
export default {
    data(){
        return {
            type : null,
            data : {
                project_id : '',
                status_content : '',
                proposal_name           : null,
                proposal_info           : null,
                description             : null,
                tenant_id               : auth.tenant_id,
            },
            projects : [],
            current_user    : null,
            authorize       : null,
            app_path        : null,
        }
    },

    mounted(){
        modal = new bootstrap.Modal('#Modal_CreateProposal');
    },
    components: {
        ...Icons,FilePond,VueDatePicker,ElSelect,ElOption
    },
    props : {
        item : String
    },
    methods : {

        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            this.GetAllProject()
            modal.show();
        },

        CreateProposal(){
            axios({
                method:'post',
                url: PATH_API_DATA + '/proposal/create',
                headers: {
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data: this.data
            }).then(res => {
                this.$emit('RefreshData');
                modal.hide();
                ShowToast({status_code : 200, message : 'Tạo chủ trương thành công'});
            })
        },

        GetAllProject(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/get-all',params,config)
                .then(async res => {
                    this.projects = res.data.data.items

                    this.projects = this.projects.map(item => {
                        let arr = {
                            value : item.id,
                            label : item.project_code + '|' + item.project_name
                        }
                        return arr
                    })

                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },
    },
    
}
</script>
<style lang="">
    
</style>