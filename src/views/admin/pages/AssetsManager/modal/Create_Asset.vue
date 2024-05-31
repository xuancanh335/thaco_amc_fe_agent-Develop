<template lang="">
    <div class="modal fade" id="Modal_CreateAsset" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <h5 class="mb-1">Tạo tài sản mới</h5>
                                    <p class="text-muted mb-0">Tạo tài sản mới dựa trên dữ liệu</p>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Mã tài sản</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.asset_code" placeholder="Nhập mã tài sản ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tên tài sản</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.asset_name" placeholder="Nhập tên tài sản ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tài sản gốc</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.asset_parent" placeholder="Nhập tài sản gốc ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Loại tài sản</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconHome2 :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.asset_type" placeholder="Nhập loại tài sản ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6" >
                            <div class="mb-3">
                                <label class="form-label">Đơn vị sử dụng (<span class="text-danger">*</span>)</label>
                                <div class="input-group flex-grow-1">
                                    <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                                        <IconClipboardData :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.tenant_used_id" filterable placeholder="--CHỌN ĐƠN VỊ SỬ DỤNG--" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6" >
                            <div class="mb-3">
                                <label class="form-label">Thuộc dự án (<span class="text-danger">*</span>)</label>
                                <div class="input-group flex-grow-1">
                                    <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                                        <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.project_id" filterable placeholder="--CHỌN DỰ ÁN ÁP DỤNG--" size="large" :teleported="false" :fit-input-width="true">
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
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tổng nguyên giá</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconCashBanknote :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.total_unit_price" v-number="number" placeholder="Nhập tổng nguyên giá ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tổng giá khấu hao</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconCashBanknote :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.total_depreciation_price" v-number="number" placeholder="Nhập tổng giá sau khấu hao ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Tổng diện tích sử dụng</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconRulerMeasure :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.total_area_used" v-number="number" placeholder="Nhập tổng diện tích sử dụng ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Ngày tạo tài sản</label>
                                <div class="d-flex">
                                    <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                        <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <VueDatePicker class="custom-datepicker-icon" v-model="data.asset_create_time" placeholder="Chọn ngày tạo tài sản" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Diễn giải</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconQuote :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập Diễn giải ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6" >
                            <div class="mb-3">
                                <label class="form-label">Dữ liệu đồng bộ</label>
                                <!-- <div class="input-group flex-grow-1">
                                    <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                                        <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.bravo_asset_id" @change="GetDataSyncById" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in list_sync"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div> -->
                                <DropdownTable 
                                    ref="DropdownTable" 
                                    @handleDropdownTable="handleDropdownTable"
                                    @handleSelectItem="DropdownTable_Select"
                                    :data = "list_sync.data"
                                    :total = "list_sync.total"
                                    :label_init = "list_sync.label_init"
                                ></DropdownTable>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="CreateAsset">Tạo tài sản mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:700px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo tài sản mới</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Mã tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập mã tài sản ..." v-model="data.asset_code">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tên tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tên tài sản ..." v-model="data.asset_name">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tài sản gốc (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tài sản gốc ..." v-model="data.asset_parent">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Loại tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập loại tài sản ..." v-model="data.asset_type">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Đơn vị sử dụng (<span class="text-danger">*</span>)</label>
                            <select class="form-select rounded-0 border-0 border-bottom shadow-none" v-model="data.tenant_used_id">
                                <option value="" selected>--CHỌN ĐƠN VỊ SỬ DỤNG--</option>
                                <option :value="item.id" v-for="(item, index) in customer" :key="index">{{item.customer_name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng nguyên giá (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng nguyên giá ..." v-model="data.total_unit_price" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng giá khấu hao (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng giá sau khấu hao ..." v-model="data.total_depreciation_price" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng diện tích sử dụng (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng diện tích sử dụng ..." v-model="data.total_area_used" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-0">Ngày tạo tài sản (<span class="text-danger">*</span>)</label>
                            <VueDatePicker class="custom-datepicker" v-model="data.asset_create_time" placeholder="Chọn ngày tạo tài sản" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập Diễn giải ..." v-model="data.description">
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="CreateAsset">Tạo tài sản</button>
            </div>
        </div>
    </div> -->
</template>
<script>

import Icons from '@Admin/common/js/Icons.js'

import{useProjectStore} from '@Store'
import axios from 'axios'

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
import { ElSelect,ElOption } from 'element-plus'
import DropdownTable from '@Admin/components/common/DropdownTable.vue';
var modal

export default {
    components: {
        ...Icons,VueDatePicker,ElSelect,ElOption,DropdownTable
    },
    data(){
        return {
            modal : {
                show : false,
            },
            customer : [],
            data : {
                status_content : '',
                project_id : '',
                tenant_used_id : '',
                bravo_asset_id : '',
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
            list_sync : {
                data : [],
                total : 1,
                paginate : {
                    limit : 10,
                    page : 1,
                },
                search_value : '',
                label_init : ''
            }
        }
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_CreateAsset');
    },
    directives: {number: VNumber,},
    methods : {

        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            this.GetDataSync()
            this.GetCustomerData()
            this.GetAllProject()
            modal.show();
        },

        async CreateAsset(){ 
            try {
                const params = this.data
                params.total_unit_price = this.FormatNumberic(params.total_unit_price)
                params.total_depreciation_price = this.FormatNumberic(params.total_depreciation_price)
                params.total_area_used = this.FormatNumberic(params.total_area_used)
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset/create',params,config)
                .then(async res => {
                    modal.hide()
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Tạo tài sản thành công'});
                })
                .catch(err => {
                   
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
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
                .then(async res => {
                    this.customer = res.data.data.items
                    this.customer = this.customer.map(item => {
                        let arr = {
                            value : item.id,
                            label : item.customer_code + '|' + item.customer_name
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

        GetDataSyncById(id){
            if(id){
                const params = {
                    item : id
                }
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
                axios.post(PATH_API_WEBHOOK + '/asset-item/get-by-id',params,config)
                .then(res => {
                    let data = res.data.data
                    this.data.asset_code    = data.code
                    this.data.asset_name                    = data.name
                    this.data.asset_parent                  = data.parentCode
                    // this.data.asset_type                    = data.desCription
                    this.data.asset_create_time             = data.docDate
                    // this.data.total_area_used               = data.desCription
                    // this.data.total_unit_price              = data.desCription
                    // this.data.total_depreciation_price      = data.desCription
                    // this.data.description                   = data.docDate
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },
        handleDropdownTable(data){
            this.list_sync.paginate.page = data.page
            this.list_sync.search_value = data.search_value
            this.GetDataSync()
        },
        DropdownTable_Select(data){
            this.data.bravo_asset_id = data.value
            this.list_sync.label_init = data.label_init
            this.GetDataSyncById(data.value)
        },
        GetDataSync(){
            const params = {
                limit : this.list_sync.paginate.limit,
                page : this.list_sync.paginate.page,
                search_list: [
                    {
                        name_field: "search_field",
                        value_search: this.list_sync.search_value
                    }
                ]
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/asset-item/get-all',params,config)
            .then(res => {
                this.list_sync.data = res.data.data.items
                this.list_sync.total = res.data.data.total
                this.list_sync.data = this.list_sync.data.map(item => {
                    let arr = {
                        value : item.id,
                        label : item.code + '|' + item.name
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        FormatNumberic
    },
}
</script>
<style lang="">
    
</style>