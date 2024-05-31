<template lang="">
    <div class="modal fade" id="Modal_DetailAsset" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header p-5 pb-1 border-bottom-0">
                <div class="d-flex align-items-center gap-3">
                                <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                    <IconPencil :size="36" stroke-width="2" class="d-flex" />
                                </div>
                                <div>
                                    <h5 class="mb-1">Cập nhật tài sản</h5>
                                    <p class="text-muted mb-0">Cập nhật tài sản dựa trên dữ liệu</p>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
            </div>
                <div class="modal-body p-5 custom-scrollbar mb-5">
                    <!-- <div class="mb-5">
                        <div class="d-flex align-items-top mb-3 gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                    <IconPencil :size="36" stroke-width="2" class="d-flex" />
                                </div>
                                <div>
                                    <h5 class="mb-1">Cập nhật tài sản</h5>
                                    <p class="text-muted mb-0">Cập nhật tài sản dựa trên dữ liệu</p>
                                </div>
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                    </div> -->
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
                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label for="" class="text-muted mb-2 label-require">Đơn vị sử dụng</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
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
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2 label-require">Thuộc dự án</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
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
                                <label for="" class="text-muted mb-2">Dữ liệu đồng bộ</label>
                                <div class="input-group">
                                    <!-- <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconFileInfo :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.bravo_asset_id" @change="GetDataSyncById" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in list_sync"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select> -->

                                    <div class="bg-secondary bg-opacity-25 position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center mt-2 me-2 cursor-pointer" style="width:22px; height:22px; z-index:9;" 
                                    @click="data.bravo_asset_id = ''; list_sync.label_init = ''"
                                    >
                                        <IconX :size="14" stroke-width="1.5" class="text-secondary" />
                                    </div>

                                    <DropdownTable 
                                        ref="DropdownTable" 
                                        @handleDropdownTable="handleDropdownTable"
                                        @handleSelectItem="DropdownTable_Select"
                                        id="AssetDropdown"
                                        :data = "list_sync.data"
                                        :total = "list_sync.total"
                                        :label_init = "list_sync.label_init"
                                    ></DropdownTable>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="d-flex align-items-center mb-4 gap-3">
                            <h5 class="m-0 fw-medium">THÔNG TIN TÀI SẢN</h5>
                            <hr class="border-1 flex-grow-1 m-0">
                        </div>

                        <div class="col-lg-12" >
                            <Asset_Item 
                                :assetId="data.id"
                                :slug="'AssetItem'"
                                :data="legal.lstAssetItem"
                                @ReloadData="GetDataAsset"
                            ></Asset_Item>

                            <Asset_Status 
                                :assetId="data.id"
                                :slug="'AssetStatus'"
                                :data="legal.lstAssetStatus"
                                @ReloadData="GetDataAsset"
                            ></Asset_Status>

                            <Asset_Repair 
                                :assetId="data.id"
                                :slug="'AssetRepair'"
                                :data="legal.lstAssetRepair"
                                @ReloadData="GetDataAsset"
                            ></Asset_Repair>

                            <Asset_Depreciation 
                                :assetId="data.id"
                                :slug="'AssetDepreciation'"
                                :data="legal.lstAssetDepreciation"
                                @ReloadData="GetDataAsset"
                                :bravo_asset_code="data.bravo_asset_code"
                            ></Asset_Depreciation>

                            <Asset_Use 
                                :assetId="data.id"
                                :slug="'AssetUse'"
                                :data="legal.lstAssetUse"
                                @ReloadData="GetDataAsset"
                            ></Asset_Use>

                            <Asset_Finance 
                                :assetId="data.id"
                                :slug="'AssetFinance'"
                                :data="legal.lstAssetFinance"
                                @ReloadData="GetDataAsset"
                            ></Asset_Finance>
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
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'

import Asset_Item from '../components/Asset_Item/Main.vue';
import Asset_Status from '../components/Asset_Status/Main.vue';
import Asset_Repair from '../components/Asset_Repair/Main.vue';
import Asset_Depreciation from '../components/Asset_Depreciation/Main.vue';
import Asset_Use from '../components/Asset_Use/Main.vue';
import Asset_Finance from '../components/Asset_Finance/Main.vue';
import { ElSelect,ElOption } from 'element-plus'
import DropdownTable from '@Admin/components/common/DropdownTable.vue';
var modal
export default {
    components: {
        VueDatePicker,...Icons,
        Asset_Item,Asset_Status,Asset_Repair,Asset_Depreciation,Asset_Use,Asset_Finance,ElSelect,ElOption,DropdownTable,
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
        modal = new bootstrap.Modal('#Modal_DetailAsset');
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

            await this.GetDataSync()
            await this.GetCustomerData()
            await this.GetAllProject()
            await this.GetDataAsset()
            modal.show();
        },

        async UpdateData(){            
            try {
                const params = this.data
                params.total_unit_price = this.FormatNumberic(params.total_unit_price)
                params.total_depreciation_price = this.FormatNumberic(params.total_depreciation_price)
                params.total_area_used = this.FormatNumberic(params.total_area_used)
                params.tenant_id = this.authorize.tenant_id
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset/update',params,config)
                .then(async res => {
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật tài sản thành công'});
                    modal.hide()
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

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
                    this.list_sync.label_init = result.assetData.bravo_asset_code + '|' +  result.assetData.bravo_asset_code
                    this.data = res.data.data.assetData
                    let legal = res.data.data
                    delete legal.assetData
                    this.legal = legal
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

        GetDataSyncById(id){
            if(id){
                const params = {
                    item : id
                }
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
                axios.post(PATH_API_WEBHOOK + '/asset-item/get-by-id',params,config)
                .then(res => {
                    let data = res.data.data
                    // this.data.asset_code    = data.code
                    // this.data.asset_name                    = data.name
                    // this.data.asset_type                    = data.parentCode
                    // this.data.asset_create_time             = data.docDate
                    // this.data.total_area_used               = data.desCription
                    // this.data.total_unit_price              = data.originalCost
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
            this.data.bravo_asset_code = data.data.code
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
                        label : item.code + '|' + item.name,
                        data : {code : item.code}
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>