<template lang="">

<Update_Legal ref="Update_Modal" @ReloadData="GetProjectById"></Update_Legal>
<File_Legal ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Legal>
<Delete_Legal ref="Delete_Modal" @ReloadData="ReloadData"></Delete_Legal>

<div class="row">
    <div class="col-lg-7">
        <div class="card" v-if="init.dataProjectFinance">
            <div class="card-body bg-light">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tên tài chính dự án (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <textarea type="text" class="form-control" placeholder="Nhập tên tài chính dự án ..." v-model="init.dataProjectFinance.project_finance_content" rows='1' :disabled="view" :readonly="view"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Giá trị kế toán (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control" placeholder="Nhập giá trị kế toán ..." :disabled="view" :readonly="view" v-model="init.dataProjectFinance.accounting_value" v-number="number">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Giá trị thẩm định (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control" placeholder="Nhập giá trị thẩm định ..." :disabled="view" :readonly="view" v-model="init.dataProjectFinance.valuation_value" v-number="number">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-2">Ngày ký HĐ thế chấp (<span class="text-danger">*</span>)</label>
                            <div class="d-flex">
                                <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                    <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <VueDatePicker class="custom-datepicker-icon" v-model="init.dataProjectFinance.mortgage_date" placeholder="Chọn Ngày ký HĐ thế chấp ..." auto-apply :disabled="view" :readonly="view" :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Giá trị HĐ thế chấp (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control" placeholder="Chọn Ngày ký HĐ thế chấp ..." :disabled="view" :readonly="view" v-model="init.dataProjectFinance.mortgage_value" v-number="number">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Số lượng tài sản thế chấp (<span class="text-danger">*</span>)</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control" placeholder="Chọn số lượng tài sản thế chấp ..." :disabled="view" :readonly="view" v-model="init.dataProjectFinance.project_mortgage_quantity" v-number="number">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Số HĐ tín dụng (<span class="text-danger">*</span>)</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control" placeholder="Số HĐ tín dụng ..." :disabled="view" :readonly="view" v-model="init.dataProjectFinance.number_credit">
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Đối tượng thế chấp (<span class="text-danger">*</span>)</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <select class="form-control" name="" id="" v-model="init.dataProjectFinance.mortgage_object_id" :disabled="view" :readonly="view">
                                    <option value="" selected>---CHỌN ĐỐI TƯỢNG THẾ CHẤP---</option>
                                    <option :value="item.id" v-for="(item, index) in customer" :key="index">
                                        {{item.customer_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-1">Thông tin ngân hàng (<span class="text-danger">*</span>)</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <select class="form-control" name="" id="" v-model="init.dataProjectFinance.bank_id" :disabled="view" :readonly="view">
                                    <option value="" selected>---CHỌN THÔNG TIN NGÂN HÀNG---</option>
                                    <option :value="item.id" v-for="(item, index) in bank" :key="index">
                                        {{item.bank_code}}|{{item.bank_name}}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">    
                            <label class="form-label">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                            <div class="d-flex">
                                <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                    <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <VueDatePicker class="custom-datepicker-icon" v-model="init.dataProjectFinance.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'" :disabled="view" :readonly="view"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">    
                            <label class="form-label">Ngày dự kiến hoàn thành (<span class="text-danger">*</span>)</label>
                            <div class="d-flex">
                                <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                    <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <VueDatePicker class="custom-datepicker-icon" v-model="init.dataProjectFinance.estimated_date_finish" placeholder="Chọn ngày dự kiến hoàn thành" auto-apply :format="'dd/MM/yyyy'" :disabled="view" :readonly="view"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-6">
                        <label class="form-label">Trạng thái (<span class="text-danger">*</span>)</label>
                        <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <select class="form-select" name="" id="" @click="GetStatus" v-model="init.dataProjectFinance.status_content" :disabled="view" :readonly="view">
                                <option value="" selected>--CHƯA CHỌN TRẠNG THÁI--</option>
                                <option :value="item.id" v-for="(item, index) in status" :key="index">{{item.value}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-1">Diễn giải</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <textarea type="text" class="form-control" placeholder="Nhập diễn giải pháp lý ..." :disabled="view" :readonly="view"  v-model="init.dataProjectFinance.description" rows="1"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-5">
        <FileManager ref="FileManager"
            :disabledFile="view"
            :type_upload="this.init.dataProjectFinance.id != '00000000-0000-0000-0000-000000000000' ? 'update' : 'create'"
            :multiple="this.init.dataProjectFinance.id != '00000000-0000-0000-0000-000000000000' ? false : true"
        ></FileManager>
    </div>
</div>



<!-- <div class="row" v-else>
    <div class="col-lg-12">
        <div class="card bg-light">
            <div class="card-body">
                <div class="d-flex flex-column align-items-center justify-content-center" style="min-height:560px;">
                    <img src="/public/assets/images/empty.svg" width="250" alt="" srcset="">
                    <h5 class="fw-light">CHƯA CÓ DỮ LIỆU TÀI CHÍNH</h5>
                </div>
            </div>
        </div>
    </div>
</div> -->
    <div class="modal-footer position-absolute bottom-0 start-0 w-100 bg-white" v-if="!view" style="z-index: 9999;">
        <button v-if="this.init.dataProjectFinance.id != '00000000-0000-0000-0000-000000000000'" @click="$refs.File_Modal.Display(true,init.dataProjectFinance.id)" class="btn btn-primary d-flex gap-2 align-items-center"><IconPaperclip :size="16" class="d-flex text-white" stroke-width="2"/> Danh sách file</button>
        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
        <button type="button" class="btn btn-success" @click="UpdateLegal" v-if="this.init.dataProjectFinance">
            <span v-if="this.init.dataProjectFinance.id != '00000000-0000-0000-0000-000000000000'">Cập nhật pháp lý</span>
            <span v-else>Tạo pháp lý</span>
        </button>
    </div>

</template>
<script>
import Icons from '@Admin/common/js/Icons';

import axios from 'axios'
import dayjs from 'dayjs';

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import ProjectStatus from '../Common/ProjectStatus.vue';
import {FormatDate} from '@Helpers/utils.js'
import Project_Finance from './Project_Finance/Main.vue';

const apiProject = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'
import {ShowToast} from '@Helpers/Notify.js'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { CheckPermission } from '@Helpers/utils.js';

import Delete_Legal from './modal/Delete_Legal.vue';
import Update_Legal from './modal/Update_Legal.vue';
import File_Legal from './modal/File_Legal.vue';
import FileManager from '@Admin/components/common/FileManager.vue';
export default {
    data(){
        return {
            init : {
                dataProjectFinance : {
                    'status_content' : "",
                    'bank_id' : "",
                    'mortgage_object_id' : "",
                    'status_content' : "",
                }
            },
            view : false,
            tenant : [],
            customer : [],
            proposal : [],
            status : [],
            project_create_time : null,
            data : {
                mortgage_object_id : '',
                bank_id : '',
                status_content : '',
            },
            show : {
                add_landlegal : false
            },
            formatInput : null,
            location : null,
            province : null,
            districts : null,
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            bank : [],
        }
    },
    components: {
        ...Icons,
        VueDatePicker,Project_Finance,
        Update_Legal,File_Legal,Delete_Legal,ProjectStatus,
        FileManager
    },

    mounted(){
        var Modal = document.getElementById('Modal_UpdateProject')
        var vm = this
        Modal.addEventListener('show.bs.modal', async function (event) {
            var id = Modal.getAttribute('data-id');
            var type_modal = await Modal.getAttribute('data-modal');
            type_modal == "view" ? vm.view = true : vm.view = false
            await vm.GetTenantData()
            const ProjectStore = useProjectStore();
            ProjectStore.SetState({project_id : id})
            vm.GetStatusProject();
            // vm.GetProjectById(id)
            await vm.GetTenantData()
            vm.GetCustomerData()
            vm.GetLocations()
        })
    },
    directives: { 
        number: VNumber,
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            await this.GetCustomerData()
            await this.GetBankData()
            if(this.init.dataProjectFinance.id != '00000000-0000-0000-0000-000000000000'){
                this.$refs.FileManager._Init({id:value.dataProjectFinance.id,type:'TYPE_PROJECT_FINANCE'});
            }
        },

        GetBankData(){
            const data = {
                "page": 0,
                "limit": 0,
                // "tenant_id": authorize.tenant_id,
                "flag": true
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/bank/get-all',
                headers: {
                    'Authorization': 'Bearer ' + authorize.token
                },
                data: data
            }).then(res => {
                this.bank = res.data.data.items
            })
        },

        ReloadData(){
            this.$emit('RefreshData')
        },

        GetLocations(){
            const ProjectStore = useProjectStore();
            ProjectStore.GetLocations
            this.location = ProjectStore.GetLocations
        },
        SelectCountry(){
            this.data.projectData.province_id = ''
            this.data.projectData.district_id = ''
        },
        ChangeProvices(){
            this.data.projectData.district_id = ''
        },
        SelectProvices(){
            let data = this.location.find(item => item.id == this.data.projectData.country_id)
            this.province = data.dataProvince
        },
        SelectDistrict(){
            let data = this.province.find(item => item.id == this.data.projectData.province_id)
            this.districts = data.dataDistrict
        },
        GetStatusProject(){
            try {
                const params = this.data.projectData
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/get-status-json/get-status-legal-project',params,config)
                .then(async res => {
                    const ProjectStore = useProjectStore();
                    ProjectStore.SetStatus(res.data)
                    this.status = res.data
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async UpdateLegal(){            
            try {
                let data = this.init.dataProjectFinance
                if(data.id != '00000000-0000-0000-0000-000000000000'){
                    const params = data
                    params.tenant_id = authorize.tenant_id
                    params.project_id = this.init.projectData.id
                    params.accounting_value = await parseFloat(String(params.accounting_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.valuation_value = await parseFloat(String(params.valuation_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.mortgage_value = await parseFloat(String(params.mortgage_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.project_mortgage_quantity = await parseFloat(String(params.project_mortgage_quantity).replace(/ꓸ/g,'').replace(',','.'))
                    const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                    axios.post(apiProject + '/project-finance/update',params,config)
                    .then(async res => {
                        // this.Display(false)
                        this.$emit('ReloadData');
                        ShowToast({status_code : 200, message : 'Cập nhật pháp lý thành công'});
                    })
                    .catch(err => {
                        ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
                    })
                }else{
                    const params = data
                    delete params['id']
                    params.project_id = this.init.projectData.id
                    params.accounting_value = await parseFloat(String(params.accounting_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.valuation_value = await parseFloat(String(params.valuation_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.mortgage_value = await parseFloat(String(params.mortgage_value).replace(/ꓸ/g,'').replace(',','.'))
                    params.project_mortgage_quantity = await parseFloat(String(params.project_mortgage_quantity).replace(/ꓸ/g,'').replace(',','.'))
                    const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                    axios.post(apiProject + '/project-finance/create',params,config)
                    .then(async res => {

                        console.log(res)
                        if(res){
                            await this.$refs.FileManager.UpdateLegal({id:res.data.data.id,type:'TYPE_PROJECT_FINANCE'})
                            this.$emit('ReloadData');
                        }
                        setTimeout(() => {
                            ShowToast({status_code : 200, message : 'Tạo pháp lý thành công'});
                        }, 500);
                    })
                    .catch(err => {
                        ShowToast({status_code : 401, message : 'Tạo pháp lý thất bại'});
                    })
                }
            } catch (err) {

            }
        },

        GetProjectById(){
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
                    this.data = await res.data.data
                    await this.SelectProvices()
                    await this.SelectDistrict()
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetTenantData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    // tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_USER + '/tenant/get-all',params,config)
                .then(async res => {
                    this.tenant = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetCustomerData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    //tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
                .then(async res => {
                    this.customer = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        formatInput(event) {
            let a = event.target.value.replace(/[^\d,]/g, '');
        },
        CheckPermission
    }
}
</script>
<style lang="scss">
    .hide-arrow-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>