<template lang="">
    <div class="modal fade" id="Modal_UpdateProposal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content" >
                <div class="modal-body p-5 custom-scrollbar" style="display: initial">
                    <div class="mb-5 d-flex align-items-top">
                        <div class="d-flex align-items-center gap-3">
                            <div class="bg-info bg-opacity-25 rounded-3 p-2 text-info">
                                <IconPencil :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div>
                                <h5 class="mb-1">Cập nhật thông tin</h5>
                                <p class="text-muted mb-0">Cập nhật này sẽ thay đổi thông tin chủ trương đầu tư hiện tại</p>
                            </div>
                        </div>
                        <div class="ms-auto">
                            <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                    </div>

                    <div class="row mb-3" >         

                        <div class="col-lg-6 mb-3">
                            <div>
                                <label for="" class="text-muted mb-1">Tên chủ trương</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMail :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.proposalData.proposal_name" placeholder="Nhập mã chủ trương ..." :disabled="view" :readonly="view">
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 mb-3">
                            <div>
                                <label for="" class="text-muted mb-1">Chọn ngày bắt đầu</label>
                                <div class="d-flex">
                                    <span class="input-group-text text-muted border-end-0 rounded-0 rounded-start" id="basic-addon1">
                                        <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <VueDatePicker v-model="data.proposalData.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'" class="custom-datepicker icon"  :enable-time-picker="false" hide-input-icon :disabled="view" :readonly="view"></VueDatePicker>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 mb-3">
                            <div>
                                <label for="" class="text-muted mb-1">Thông tin tờ trình</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconUser :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.proposalData.proposal_info" placeholder="Nhập thông tin tờ trình chủ trương ..." :disabled="view" :readonly="view">
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 mb-3">
                            <div>
                                <label for="" class="text-muted mb-1">Diễn giải</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconUser :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.proposalData.description" placeholder="Nhập Diễn giải..." :disabled="view" :readonly="view">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-3">
                            <label for="" class="text-muted mb-2">Thuộc dự án</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <el-select class="custom-selectbox flex-grow-1" v-model="data.proposalData.project_id" filterable placeholder="---CHỌN DỰ ÁN ÁP DỤNG---" size="large" :teleported="false" :fit-input-width="true">
                                    <el-option
                                    v-for="item in projects"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    />
                                </el-select>

                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center mb-3 gap-3">
                        <h5 class="m-0 fw-medium">THÔNG TIN CHỦ TRƯƠNG</h5>
                        <hr class="border-1 flex-grow-1 m-0">
                    </div>

                    <Proposal_ImplementProject 
                        :data="data.lstProposalImplementProject"
                        :slug="'Implement_Project'"
                        @ReloadData="Get_DataProposal"
                        :view="view"
                    ></Proposal_ImplementProject>

                    <Proposal_ApprovePolicy 
                        :data="data.lstProposalApprovePolicy"
                        :slug="'Approve_Policy'"
                        @ReloadData="Get_DataProposal"
                        :view="view"
                    ></Proposal_ApprovePolicy>

                    <Proposal_ApproveProject 
                        :data="data.lstProposalApproveProject"
                        :slug="'Approve_Project'"
                        @ReloadData="Get_DataProposal"
                        :view="view"
                    ></Proposal_ApproveProject>

                    <Proposal_ApproveDecisions 
                        :data="data.lstProposalApproveDecisions"
                        :slug="'Approve_Decisions'"
                        @ReloadData="Get_DataProposal"
                        :view="view"
                    ></Proposal_ApproveDecisions>

                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Update_Proposal">Cập nhật chủ trương</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import Proposal_ApproveDecisions from '../components/Approve_Decisions/Main.vue'
import Proposal_ApprovePolicy from '../components/Approve_Policy/Main.vue'
import Proposal_ApproveProject from '../components/Approve_Project/Main.vue'
import Proposal_ImplementProject from '../components/Implement_Project/Main.vue'
import Icons from '@Admin/common/js/Icons.js'
const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;
const AppPath = import.meta.env.VITE_APP_PATH;
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
import { ElSelect,ElOption } from 'element-plus'
var modal
export default {
    data(){
        return {
            id : null,
            type : null,
            data : {
                status_content : '',
                proposalData: {}
            },
            init : [],
            view : false,
            form : {
                avatar: null,
                create_by: null,
                create_time: null,
                description: null,
                email: null,
                fullname: null,
                is_active: true,
                modify_by: null,
                modify_time: null,
                phone: null,
                tenant_id: null,
                username: null,
            },
            projects : []
        }
    },
    props : {
        item : String
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_UpdateProposal');

        // var Modal_UpdateProposal = document.getElementById('Modal_UpdateProposal')
        // var main = this
        // Modal_UpdateProposal.addEventListener('shown.bs.modal', function (event) {
        //     main.id = this.dataset.id;
        //     this.dataset.view == 'true' ? main.view = true : main.view = false
        //     main.Get_DataProposal();
        // })
    },
    methods : {

        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetAllProject()
            await this.Get_DataProposal();
            
            modal.show()
            // await this.GetDataCustomer()
        },

        open(){
            var Modal_UpdateProject = document.getElementById('staticBackdrop');
            // Modal_UpdateProject.setAttribute('data-id', id);
            // Modal_UpdateProject.setAttribute('data-modal', modal);
            var modal = new bootstrap.Modal(Modal_UpdateProject);
            modal.show();
        },

        async Update_Proposal(){
            const params = {
                id              : this.data.proposalData.id,
                proposal_name   : this.data.proposalData.proposal_name,
                proposal_info   : this.data.proposalData.proposal_info,
                project_id      : this.data.proposalData.project_id,
                start_date      : this.data.proposalData.start_date, 
                description     : this.data.proposalData.description,
            }
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_DATA + '/proposal/update',params,config)
            .then(async res => {
                var Modal_UpdateProposal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateProposal'));
                this.$emit('RefreshData');
                Modal_UpdateProposal.hide();
                const toast = {status_code : res.status}
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },
        async Get_DataProposal(){
            const params = {
                item : this.init.id,
                tenant_id : auth.tenant_id,
            }
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            await axios.post(PATH_API_DATA + '/proposal/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data                
            })
            .catch(err => {
                console.error(err); 
            })
        },

        async GetAllProject(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/get-all',params,config)
                .then(async res => {
                    this.projects = await res.data.data.items
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
    components: {
        ...Icons,Proposal_ApproveDecisions,Proposal_ApprovePolicy,Proposal_ApproveProject,Proposal_ImplementProject,VueDatePicker,ElSelect,ElOption
    }
}
</script>
<style lang="">
    
</style>