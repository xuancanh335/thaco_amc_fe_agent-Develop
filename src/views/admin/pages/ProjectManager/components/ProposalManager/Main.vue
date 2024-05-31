<template lang="">
    <Create_Asset ref="Create_Modal" @ReloadData="GetData"></Create_Asset>
    <Update_Asset ref="Update_Modal" @ReloadData="GetData"></Update_Asset> 
    <Delete_Asset ref="Delete_Modal" @ReloadData="GetData"></Delete_Asset>
    <div class="row mb-3" v-if="data">
        <div class="col-lg-6 mb-3">
            <div>
                <label for="" class="text-muted mb-1">Tên chủ trương</label>
                <div class="input-group">
                    <span class="input-group-text text-muted" id="basic-addon1">
                        <IconMail :size="22" stroke-width="1" class="d-flex" />
                    </span>
                    <input type="text" class="form-control shadow-none" placeholder="Nhập mã chủ trương ..." :disabled="view" :readonly="view" v-model="data.proposalData.proposalData.proposal_name">
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
                    <VueDatePicker v-model="data.proposalData.proposalData.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'" class="custom-datepicker icon"  :enable-time-picker="false" hide-input-icon :disabled="view" :readonly="view"></VueDatePicker>
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
                    <input type="text" v-model="data.proposalData.proposalData.proposal_info" class="form-control shadow-none" placeholder="Nhập thông tin tờ trình chủ trương ..." :disabled="view" :readonly="view">
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
                    <input type="text" v-model="data.proposalData.proposalData.description" class="form-control shadow-none" placeholder="Nhập Diễn giải..." :disabled="view" :readonly="view">
                </div>
            </div>
        </div>
    </div>

    <div class="d-flex align-items-center mb-4 gap-3">
        <h5 class="m-0 fw-medium">THÔNG TIN CHỦ TRƯƠNG</h5>
        <hr class="border-1 flex-grow-1 m-0">
    </div>
    
    <div v-if="data">
        <div class="position-relative" style="min-height:350px">
            <div v-if="!proposal_info" class="card bg-secondary bg-opacity-5 border-0 h-100">
                <div class="card-body d-flex flex-column align-items-center justify-content-center p-5">
                    <img src="/assets/images/no-choice.svg" width="200" alt="" srcset="">
                    <h5 class="fw-light text-muted">Chưa cập nhật thông tin chủ trương</h5>
                </div>
            </div>
            <div v-else>

                <div v-if="$CheckPermission('Proposal_Implement_Project','is_show')">
                    <Proposal_ImplementProject
                    :proposal_id="data.proposalData.proposalData.id"
                    :data="data.proposalData.lstProposalImplementProject"
                    :slug="'Implement_Project'"
                    @ReloadData="GetData"
                    :view="view"
                    ></Proposal_ImplementProject>
                </div>

                
                <div v-if="$CheckPermission('Proposal_Approve_Policy','is_show')">
                    <Proposal_ApprovePolicy 
                        :proposal_id="data.proposalData.proposalData.id"
                        :data="data.proposalData.lstProposalApprovePolicy"
                        :slug="'Approve_Policy'"
                        @ReloadData="GetData"
                        :view="view"
                    ></Proposal_ApprovePolicy>
                </div>
                
                <div v-if="$CheckPermission('Proposal_Approve_Project','is_show')">
                    <Proposal_ApproveProject 
                        :proposal_id="data.proposalData.proposalData.id"
                        :data="data.proposalData.lstProposalApproveProject"
                        :slug="'Approve_Project'"
                        @ReloadData="GetData"
                        :view="view"
                    ></Proposal_ApproveProject>
                </div>
                
                <div v-if="$CheckPermission('Proposal_Approve_Decisions','is_show')">
                    <Proposal_ApproveDecisions 
                        :proposal_id="data.proposalData.proposalData.id"
                        :data="data.proposalData.lstProposalApproveDecisions"
                        :slug="'Approve_Decisions'"
                        @ReloadData="GetData"
                        :view="view"
                    ></Proposal_ApproveDecisions>
                </div>
                
            </div>
        </div>
    </div>

    <div class="modal-footer position-absolute bottom-0 start-0 w-100 bg-white" v-if="!view">
        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
        <button v-if="proposal_info" type="button" class="btn btn-success" @click="Update_Proposal">Cập nhật chủ trương</button>
        <button v-else type="button" class="btn btn-success" @click="CreateProposal">Thêm chủ trương</button>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
import dayjs from 'dayjs';

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ShowToast} from '@Helpers/Notify.js'
import {FormatDate} from '@Helpers/utils.js'

import Create_Asset from './modal/Create_Asset.vue';
import Update_Asset from './modal/Update_Asset.vue';
import Delete_Asset from './modal/Delete_Asset.vue';

import Proposal_ApproveDecisions from './Approve_Decisions/Main.vue'
import Proposal_ApprovePolicy from './Approve_Policy/Main.vue'
import Proposal_ApproveProject from './Approve_Project/Main.vue'
import Proposal_ImplementProject from './Implement_Project/Main.vue'

const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'

export default {
    data(){
        return {
            project_id : '',
            view : false,
            project_create_time : null,
            show : {
                add_landlegal : false
            },
            proposal_info : false,
            data :{
                proposalData: {
                    proposalData: {
                        proposal_name: 'akjshdkahskd',
                        proposal_info: '',
                        project_id: '',
                        start_date: '',
                        description: '',
                        tenant_id: ''
                    },
                    lstProposalApproveDecisions: null,
                    lstProposalApprovePolicy: null,
                    lstProposalApproveProject: null,
                    lstProposalImplementProject: null
                },
            },
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        Create_Asset,Update_Asset,Delete_Asset,
        Proposal_ApproveDecisions,Proposal_ApprovePolicy,Proposal_ApproveProject,Proposal_ImplementProject
    },
    mounted(){
        var Modal = document.getElementById('Modal_UpdateProject')
        this.data = this.proposal
        var vm = this
        Modal.addEventListener('shown.bs.modal', async function (event) {
       
            var id = Modal.getAttribute('data-id');
            vm.project_id = Modal.getAttribute('data-id');
            var type_modal = Modal.getAttribute('data-modal');
            type_modal == "view" ? vm.view = true : vm.view = false
        })
    },
    methods : {
        // ReloadData(){
        //     this.$emit('ReloadData')
        // },
        async SelectAsset(id,index){
            this.asset_selected = index
            this.asset_id = id
            await this.GetAssetById()
        },

        GetData(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var id = Modal.getAttribute('data-id');
            try {
                const params = {
                    item        : id,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
                    this.exitsProposal()
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        async Update_Proposal(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var project_id = Modal.getAttribute('data-id');
            let data = this.data.proposalData.proposalData
            let params = {
                id: data.id,
                proposal_name: data.proposal_name,
                proposal_info: data.proposal_info,
                project_id: project_id,
                start_date: data.start_date,
                description: data.description,
                tenant_id: authorize.tenant_id,
            }
            const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
            await axios.post(apiProject + '/proposal/update',params,config)
            .then(async res => {
                this.GetData();
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },

        async CreateProposal(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var project_id = Modal.getAttribute('data-id');
            let data = this.data.proposalData.proposalData
            let params = {
                proposal_name: data.proposal_name,
                proposal_info: data.proposal_info,
                project_id: project_id,
                start_date: data.start_date,
                description: data.description,
                tenant_id: authorize.tenant_id,
            }
            const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
            await axios.post(apiProject + '/proposal/create',params,config)
            .then(async res => {
                this.GetData();
                ShowToast({status_code : 200, message : 'Tạo chủ trương thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
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
        exitsProposal(){this.proposal_info = !!this.data.proposalData.proposalData.id;},
        FormatDate,
    },
}
</script>
<style lang="scss">
.hide-arrow-select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
.table-header-fixed {
	overflow-y: auto;
	height: 250px;
	thead {
		th {
			position: sticky;
			top: 0px;
		}
	}
}



</style>