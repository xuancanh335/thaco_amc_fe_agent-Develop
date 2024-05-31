<template lang="">
    <div class="modal fade" id="Modal_UpdateTenant" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-4 d-flex">
                        <div class="d-flex align-items-top mb-3 gap-3">
                            <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                <IconPencil :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div>
                                <h5>Cập nhật đơn vị</h5>
                                <p class="text-muted mb-0">Cập nhật đơn vị mới dựa trên dữ liệu</p>
                            </div>
                        </div>
                        <div class="ms-auto">
                            <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                    </div>
       
                    <div class="row" v-if="data.tenantData">
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Mã đơn vị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.tenant_code" placeholder="Nhập mã đơn vị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tên đơn vị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.tenant_name" placeholder="Nhập tên đơn vị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Mã số thuế</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.mst" placeholder="Nhập mã số thuế...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn điều lệ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.charter_capital" placeholder="Nhập vốn điều lệ..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tỷ lệ sở hữu</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.ownership_ratio" placeholder="Nhập tỷ lệ sở hữu..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn góp theo tỷ lệ sở hữu</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.contributed_ownership_ratio" placeholder="Vốn góp theo tỷ lệ sở hữu..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn đã góp</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.contributed_capital" placeholder="Vốn đã góp..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Trạng thái hoạt động</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.active_state" placeholder="Trạng thái hoạt động...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tên quản trị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconUser :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.admin_name" placeholder="Nhập tên quản trị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Địa chỉ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMapPin :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.address" placeholder="Nhập địa chỉ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Số điện thoại</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconPhone :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.phone" placeholder="Nhập số điện thoại...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Email</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMail :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenantData.email" placeholder="Nhập email...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="row mb-3">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="divider divider-start m-0 mb-3">
                                                <span class="fw-medium">Thông tin giám đốc</span>
                                            </div>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconUser :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Tên giám đốc :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.tenantData.director" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconPhone :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Số điện thoại :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.tenantData.director_phone" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="divider divider-start m-0 mb-3">
                                                <span class="fw-medium">Thông tin kế toán</span>
                                            </div>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconUser :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Kế toán trưởng :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.tenantData.chief_accountant" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconPhone :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Số điện thoại :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.tenantData.chief_accountant_phone" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Thuộc tập đoàn</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuildingCommunity :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <select class="form-select shadow-none" name="" id="" v-model="data.tenantData.group_id">
                                        <option value="">-- CHỌN TẬP ĐOÀN --</option>
                                        <option :value="item.id" v-for="(item, index) in groups" :key="index">{{item.group_name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Dữ liệu đồng bộ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconRefresh :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.tenantData.bravo_tenant_id" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in list_sync"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <Infomation_Legal 
                            :data="data.lstTenantDetail"
                            :slug="'Implement_Project'"
                            :TenantId="data.tenantData.id"
                            @ReloadData="Get_DataTenantById"
                            :view="view"
                        ></Infomation_Legal>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Update_Tenant">Cập nhật đơn vị</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    

    <!-- <div class="modal fade" id="Modal_UpdateTenant" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static">
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
    </div> -->
</template>
<script>

import axios from 'axios'
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import Infomation_Legal from '../components/Infomation_Legal/Main.vue'
import Icons from '@Admin/common/js/Icons.js'
const auth = JSON.parse(localStorage.getItem('authorize'))
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const AppPath = import.meta.env.VITE_APP_PATH;
const API_PATH_STORE = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
import { FormatNumberic } from '@Helpers/utils.js';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { ElSelect,ElOption } from 'element-plus'
var modal
export default {
    data(){
        return {
            id : null,
            type : null,
            data : {},
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
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            list_sync : [],
            groups : [],
        }
    },
    directives: { number: VNumber,},
    props : {
        item : String
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_UpdateTenant');
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.Get_DataTenantById()
            this.Get_GroupData();
            this.GetDataSync()
            modal.show()
        },

        async Update_Tenant(){
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            let params = this.data.tenantData
            params.contributed_capital = this.FormatNumberic(params.contributed_capital)
            params.contributed_ownership_ratio = this.FormatNumberic(params.contributed_ownership_ratio)
            params.ownership_ratio = this.FormatNumberic(params.ownership_ratio)
            params.charter_capital = this.FormatNumberic(params.charter_capital)
            await axios.post(PATH_API_USER + '/tenant/update',params,config)
            .then(async res => {
                modal.hide()
                this.$emit('RefreshData');
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
            })
        },

        Get_GroupData(){
            const data = {
                "page": 0,
                "limit": 0,
                "flag": true
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/group/get-all',
                headers: {
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data: data
            }).then(res => {
                const result = res.data.data.items.filter(item => {return item.is_active == true})
                this.groups = result
            })
        },

        GetDataSync(){
            const params = {}
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/tenant-bravo/get-all',params,config)
            .then(res => {
                this.list_sync = res.data.data.items
                this.list_sync = this.list_sync.map(item => {
                    let arr = {
                        value : item.id,
                        label : item.maDonVi + '|' + item.tenDonVi
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },

        async Get_DataTenantById(){
            const params = {
                item : this.init.id,
            }
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            await axios.post(PATH_API_USER + '/tenant/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        },FormatNumberic
    },
    components: {
        ...Icons,Infomation_Legal,VueDatePicker,ElSelect,ElOption
    }
}
</script>
<style lang="">
    
</style>