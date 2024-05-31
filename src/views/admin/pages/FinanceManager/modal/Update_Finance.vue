<template lang="">
    <div class="modal fade" id="Modal_UpdateFinance" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" style="min-width: 1280px;">
            <div class="modal-content">
                <div class="modal-body p-5 custom-scrollbar mb-5">
                    <div class="mb-5">
                        <div class="d-flex align-items-top mb-3 gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                    <IconPencil :size="36" stroke-width="2" class="d-flex" />
                                </div>
                                <div>
                                    <h5 class="mb-1">Cập nhật tài chính</h5>
                                    <p class="text-muted mb-0">Cập nhật tài chính dựa trên dữ liệu</p>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div>

                <div class="row">
                    <div class="col-lg-7">
                        <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Tên tài chính dự án (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <textarea type="text" class="form-control" placeholder="Nhập tên tài chính dự án ..." v-model="data.project_finance_content" rows='1'></textarea>
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
                                    <input type="text" class="form-control" placeholder="Nhập giá trị kế toán ..." v-model="data.accounting_value" v-number="number">
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
                                    <input type="text" class="form-control" placeholder="Nhập giá trị thẩm định ..." v-model="data.valuation_value" v-number="number">
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
                                    <VueDatePicker class="custom-datepicker-icon" v-model="data.mortgage_date" placeholder="Chọn Ngày ký HĐ thế chấp ..." auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Gía trị HĐ thế chấp (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control" placeholder="Chọn Ngày ký HĐ thế chấp ..." v-model="data.mortgage_value" v-number="number">
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
                                    <input type="text" class="form-control" placeholder="Chọn số lượng tài sản thế chấp ..." v-model="data.project_mortgage_quantity" v-number="number">
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
                                    <input type="text" class="form-control" placeholder="Số HĐ tín dụng ..." v-model="data.number_credit">
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
                                    <select class="form-select form-select-sm px-2" name="" id="" v-model="data.mortgage_object_id">
                                        <option value="" selected>CHỌN ĐỐI TƯỢNG THẾ CHẤP</option>
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
                                    <select class="form-select form-select-sm px-2" name="" id="" v-model="data.bank_id">
                                        <option value="" selected>CHỌN THÔNG TIN NGÂN HÀNG</option>
                                        <option :value="item.id" v-for="(item, index) in bank" :key="index">
                                            {{item.bank_code}}|{{item.bank_name}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-1">Thuộc dự án</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <select class="form-select form-select-sm px-2" name="" id="" v-model="data.project_id">
                                        <option value="" selected>CHỌN DỰ ÁN ÁP DỤNG</option>
                                        <option :value="item.id" v-for="(item, index) in projects" :key="index">
                                            {{item.project_code}} | {{item.project_name}}
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
                                    <VueDatePicker class="custom-datepicker-icon" v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                                <div class="mb-3">    
                                    <label class="form-label">Ngày dự khiến hoàn thành (<span class="text-danger">*</span>)</label>
                                    <div class="d-flex">
                                        <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                            <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                        </span>
                                        <VueDatePicker class="custom-datepicker-icon" v-model="data.estimated_date_finish" placeholder="Chọn ngày dự khiến hoàn thành" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                    </div>
                                </div>
                            </div>
                        
                        <div class="col-lg-6">
                            <label class="form-label">Trạng thái (<span class="text-danger">*</span>)</label>
                            <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <select class="form-select" name="" id="" @click="GetStatus" v-model="data.status_content">
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
                                    <textarea type="text" class="form-control" placeholder="Nhập diễn giải pháp lý ..." v-model="data.description" rows="1"></textarea>
                                </div>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5">
                        <FileManager ref="FileManager"></FileManager>
                    </div>
                 </div>
                </div>
                <div class="modal-footer position-absolute bottom-0 start-0 w-100 bg-white" v-if="!view" style="z-index: 9999;">
                    <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button type="button" class="btn btn-success bg-gradient" @click="UpdateData">Cập nhật tài sản</button>
                </div>
            </div>

            

        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons.js'
import{useProjectStore} from '@Store'
import axios from 'axios'
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
import FileManager from '@Admin/components/common/FileManager.vue';

import Asset_Item from '../components/Asset_Item/Main.vue';
import Asset_Status from '../components/Asset_Status/Main.vue';
import Asset_Repair from '../components/Asset_Repair/Main.vue';
import Asset_Depreciation from '../components/Asset_Depreciation/Main.vue';
import Asset_Use from '../components/Asset_Use/Main.vue';
import Asset_Finance from '../components/Asset_Finance/Main.vue';

var modal
export default {
    components: {
        VueDatePicker,...Icons,FileManager,
        Asset_Item,Asset_Status,Asset_Repair,Asset_Depreciation,Asset_Use,Asset_Finance,
    },
    data(){
        return {
            id : null,
            customer : {},
            projects : {},
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                project_id : '',
                tenant_used_id : '',
            },
            legal : {
                lstAssetItem            :[],
                lstAssetStatus          :[],
                lstAssetRepair          :[],
                lstAssetDepreciation    :[],
                lstAssetUse             :[],
                lstAssetFinance         :[]
            },
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            current_user    : null,
            authorize       : null,
            app_path        : null,
        }
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_UpdateFinance');
    },
    directives: { number: VNumber,},
    methods : {

        async _Init(value){
            this.data.project_id = ""
            this.data.tenant_used_id = ""
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            await this.GetCustomerData()
            await this.GetStatus()
            await this.GetBankData()
            await this.GetAllProject()
            await this.GetDataLegal()
            modal.show();
        },

        async UpdateData(){      
            
            try {
                const params = this.data
                params.accounting_value = await parseFloat(String(params.accounting_value).replace(/ꓸ/g,'').replace(',','.'))
                params.valuation_value = await parseFloat(String(params.valuation_value).replace(/ꓸ/g,'').replace(',','.'))
                params.mortgage_value = await parseFloat(String(params.mortgage_value).replace(/ꓸ/g,'').replace(',','.'))
                params.project_mortgage_quantity = await parseFloat(String(params.project_mortgage_quantity).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/project-finance/update',params,config)
                .then(async res => {
                    modal.hide()
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật pháp lý thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },

        async GetDataLegal(){            
            try {
                const params = {
                    item        : this.init.id,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/project-finance/get-by-id',params,config)
                .then(async res => {
                    this.$refs.FileManager._Init({id:this.init.id,type:'TYPE_PROJECT_FINANCE'});
                    this.data = res.data.data
                })
                .catch(err => { })
            } catch (err) {
                console.log(err)
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

        GetStatus(){
            try {
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/get-status-json/get-status-legal-project',{},config)
                .then(async res => {
                    // const ProjectStore = useProjectStore();
                    // ProjectStore.SetStatus(res.data)
                    this.status = res.data
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async GetDataAsset(){            
            try {
                const params = {
                    item        : this.init.id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset/get-by-id',params,config)
                .then(async res => {
                    let result = res.data.data
                    this.data = res.data.data.assetData
                    delete result.assetData
                    this.legal = result
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async GetCustomerData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
                .then(async res => {
                    this.customer = await res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        async GetAllProject(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/get-all',params,config)
                .then(async res => {
                    this.projects = await res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>