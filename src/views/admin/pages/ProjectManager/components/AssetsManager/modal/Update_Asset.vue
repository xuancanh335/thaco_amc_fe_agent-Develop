<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:700px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Mã tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập mã tài sản ..." v-model="data.asset_code">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tên tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập tên tài sản ..." v-model="data.asset_name">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tài sản gốc (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập tài sản gốc ..." v-model="data.asset_parent">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Loại tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập loại tài sản ..." v-model="data.asset_type">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Đơn vị sử dụng (<span class="text-danger">*</span>)</label>
                            <el-select class="custom-selectbox asset flex-grow-1 w-100" v-model="data.tenant_used_id" filterable placeholder="--CHỌN ĐƠN VỊ SỬ DỤNG--" size="large" :teleported="false" :fit-input-width="true">
                                <el-option
                                v-for="item in customer"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng nguyên giá (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập tổng nguyên giá ..." v-model="data.total_unit_price" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng giá khấu hao (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập tổng giá sau khấu hao ..." v-model="data.total_depreciation_price" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng diện tích sử dụng (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập tổng diện tích sử dụng ..." v-model="data.total_area_used" v-number="number">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Ngày tạo tài sản (<span class="text-danger">*</span>)</label>
                            <VueDatePicker v-model="data.asset_create_time" placeholder="Chọn ngày tạo tài sản" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Dữ liệu đồng bộ (<span class="text-danger">*</span>)</label>
                            <!-- <el-select class="custom-selectbox asset flex-grow-1 w-100" v-model="data.bravo_asset_id" @change="GetDataSyncById" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                                <el-option
                                v-for="item in list_sync"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select> -->
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
                    <div class="col-lg-12">
                        <div class="mb-3">
                            <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập Diễn giải pháp lý ..." v-model="data.description">
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateData">Cập nhật pháp lý</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
import { ElSelect,ElOption } from 'element-plus'
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
import DropdownTable from '@Admin/components/common/DropdownTable.vue';
export default {
    components: {
        VueDatePicker,
        ...Icons,ElSelect,ElOption,DropdownTable
    },
    data(){
        return {
            id : null,
            customer : {},
            modal : {
                show : false,
            },
            data : {status_content : '',},
            list_sync : {
                data : [],
                total : 1,
                paginate : {
                    limit : 10,
                    page : 1,
                },
                search_value : '',
                label_init : 'asdads'
            }
        }
    },
    directives: { number: VNumber,},
    methods : {
        async UpdateData(){            
            try {
                const params = this.data
                params.total_unit_price = this.FormatNumberic(params.total_unit_price)
                params.total_depreciation_price = this.FormatNumberic(params.total_depreciation_price)
                params.total_area_used = this.FormatNumberic(params.total_area_used)
                params.tenant_id = authorize.tenant_id
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset/update',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật tài sản thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },

        async GetData(){            
            try {
                const params = {
                    item        : this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data.assetData
                    if(this.data.asset_code){
                        this.list_sync.label_init = this.data.asset_code + '|' + this.data.asset_name
                    }
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async Display(value,data){
            this.modal.show = value
            if(value == true){
                this._Init()
                this.id = await data
                await this.GetCustomerData()
                await this.GetData()
                this.GetDataSync()
            }
        },

        _Init(){
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            const authorize = JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
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
                    this.data.asset_type                    = data.parentCode
                    this.data.asset_create_time             = data.docDate
                    // this.data.total_area_used               = data.desCription
                    this.data.total_unit_price              = data.originalCost
                    // this.data.total_depreciation_price      = data.desCription
                    // this.data.description                   = data.docDate
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },
        GetCustomerData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    // tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
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
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>