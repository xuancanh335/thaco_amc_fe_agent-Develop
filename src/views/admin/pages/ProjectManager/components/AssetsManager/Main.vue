<template lang="">
    <Create_Asset ref="Create_Modal" @ReloadData="GetData"></Create_Asset>
    <Update_Asset ref="Update_Modal" @ReloadData="GetData"></Update_Asset> 
    <Delete_Asset ref="Delete_Modal" @ReloadData="GetData"></Delete_Asset>
    <section class="mb-4">
        <div class="card">
            <div class="card-header p-3">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 lh-1">
                        <h5 class="flex-grow-1 mb-0">Danh sách tài sản</h5>
                        <small class="text-muted">Danh sách tài sản thuộc dự án</small>
                    </div>
                    <button v-if="!view" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#" @click="Display(true,'create')">
                        <IconPlus :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive table-header-fixed h-scrollbar">
                    <table class="table table-hover align-middle" :class="{'table-fixed' : !view}" style="width:180%">
                        <thead>
                            <tr>
                                <th scope="col" width="3%" class="text-center bg-white fw-semibold">#</th>
                                <th scope="col" class="bg-white fw-semibold">Mã tài sản</th>
                                <th scope="col" class="bg-white fw-semibold">Tên tài sản</th>
                                <th scope="col" class="bg-white fw-semibold">Tài sản gốc</th>
                                <th scope="col" class="bg-white fw-semibold">Phân loại tài sản</th>
                                <th scope="col" class="bg-white fw-semibold text-end">Tổng nguyên giá</th>
                                <th scope="col" class="bg-white fw-semibold text-end">Tổng giá khấu hao</th>
                                <th scope="col" class="bg-white fw-semibold">Đơn vị sử dụng</th>
                                <th scope="col" class="bg-white fw-semibold text-end">Tổng diện tích</th>
                                <th scope="col" class="bg-white fw-semibold text-end">Ngày tạo</th>
                                <th v-if="!view" scope="col" class="bg-white">
                                    <IconDotsVertical :size="20" class="d-flex text-muted bg-opacity-10 rounded-2" stroke-width="2" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in assets" :key="index" class="cursor-pointer" 
                            @click="SelectAsset(item.id,index)" 
                            :class="{'bg-thaco text-white' : asset_selected == index}"
                            >
                                <th scope="row" class="text-center">{{index + 1}}</th>
                                <td class="fw-semibold">{{item.asset_code}}</td>
                                <td>{{item.asset_name}}</td>
                                <td>{{item.asset_parent}}</td>
                                <td>{{item.asset_type}}</td>
                                <td class="text-end">{{FormatCurrency(item.total_unit_price)}}</td>
                                <td class="text-end">{{FormatCurrency(item.total_depreciation_price)}}</td>
                                <td>{{item.tenant_used_name}}</td>
                                <td class="text-end">{{FormatCurrency(item.total_area_used)}}</td>
                                <td class="text-end">{{FormatDate(item.asset_create_time,'DD/MM/YYYY')}}</td>
                                <td v-if="!view">
                                    <div class="d-flex gap-1">
                                        <button type="button" class="btn btn-info bg-gradient btn-sm p-1" @click="Display(true,'update',item.id)">
                                            <IconPencil :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                        </button>
                                        <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="Display(true,'delete',item.id)">
                                            <IconX :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <div class="row">
        <div class="d-flex align-items-center mb-4 gap-3">
            <h5 class="m-0 fw-medium">THÔNG TIN TÀI SẢN</h5>
            <hr class="border-1 flex-grow-1 m-0">
        </div>

        <div v-if="Object.keys(data).length === 0">
            <div class="card bg-secondary bg-opacity-5 border-0" style="min-height:250px">
                <div class="card-body d-flex flex-column align-items-center justify-content-center p-5">
                    <img src="/assets/images/no-choice.svg" width="200" alt="" srcset="">
                    <h5 class="fw-light text-muted">Chưa chọn tài sản để hiển thị</h5>
                </div>
            </div>
        </div>
        <div v-else class="col-lg-12" >

            <div v-if="$CheckPermission('Asset_Item','is_show')">
                <Asset_Item 
                    v-if="data.lstAssetItem" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetItem"
                    :slug="'AssetItem'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Item>
            </div>
            
            <div v-if="$CheckPermission('Asset_Status','is_show')">
                <Asset_Status 
                    v-if="data.lstAssetStatus" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetStatus"
                    :slug="'AssetStatus'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Status>
            </div>
            
            <div v-if="$CheckPermission('Asset_Repair','is_show')">
                <Asset_Repair 
                    v-if="data.lstAssetRepair" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetRepair"
                    :slug="'AssetRepair'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Repair>
            </div>
            
            <div v-if="$CheckPermission('Asset_Depreciation','is_show')">
                <Asset_Depreciation 
                    v-if="data.lstAssetDepreciation" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetDepreciation"
                    :slug="'AssetDepreciation'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Depreciation>
            </div>

            <div v-if="$CheckPermission('Asset_Use','is_show')">
                <Asset_Use 
                    v-if="data.lstAssetUse" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetUse"
                    :slug="'AssetUse'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Use>
            </div>

            <div v-if="$CheckPermission('Asset_Finance','is_show')">
                <Asset_Finance 
                    v-if="data.lstAssetFinance" 
                    :assetId="data.assetData.id"
                    :data="data.lstAssetFinance"
                    :slug="'AssetFinance'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetAssetById"
                    :view="view"
                ></Asset_Finance>
            </div>
        </div>
    </div>
    <div class="modal-footer" v-if="!view">
        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
        <!-- <button type="button" class="btn btn-success bg-gradient" @click="UpdateProject">Cập nhật dự án</button> -->
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
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'

import Create_Asset from './modal/Create_Asset.vue';
import Update_Asset from './modal/Update_Asset.vue';
import Delete_Asset from './modal/Delete_Asset.vue';

import Asset_Item from './Asset_Item/Main.vue';
import Asset_Status from './Asset_Status/Main.vue';
import Asset_Repair from './Asset_Repair/Main.vue';
import Asset_Depreciation from './Asset_Depreciation/Main.vue';
import Asset_Use from './Asset_Use/Main.vue';
import Asset_Finance from './Asset_Finance/Main.vue';

const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'

export default {
    data(){
        return {
            asset_selected: null,
            asset_id : null, 
            project_id : '',
            view : false,
            tenant : [],
            customer : [],
            proposal : [],
            project_create_time : null,
            data : [],
            show : {
                add_landlegal : false
            },
            assets : {},
            data : {},
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        Asset_Item,Asset_Status,Asset_Repair,Asset_Depreciation,Asset_Use,Asset_Finance,
        Create_Asset,Update_Asset,Delete_Asset
    },

    mounted(){
        var Modal = document.getElementById('Modal_UpdateProject')
        var vm = this
        Modal.addEventListener('shown.bs.modal', async function (event) {
            var id = Modal.getAttribute('data-id');
            vm.project_id = Modal.getAttribute('data-id');
            var type_modal = Modal.getAttribute('data-modal');
            type_modal == "view" ? vm.view = true : vm.view = false

            // vm.GetProjectById(id)
            await vm.GetTenantData()
            // const ProjectStore = useProjectStore();
            // ProjectStore.SetState({project_id : id})
            vm.GetCustomerData()
            // vm.GetProposalData()
        })
    },
    methods : {
        async SelectAsset(id,index){
            this.asset_selected = index
            this.asset_id = id
            await this.GetAssetById()
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

        GetData(){
            var id = document.getElementById('Modal_UpdateProject').dataset.id;
            try {
                const params = {
                    request: {
                        project_id: id
                    },
                    page    : 0,
                    limit   : 0,
                    // "search_list": [
                    //     {
                    //     "name_field": "string",
                    //     "value_search": "string"
                    //     }
                    // ]
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset/get-by-project-id',params,config)
                .then(async res => {
                    this.assets = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetAssetById(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var id = Modal.getAttribute('data-id');
            try {
                const params = {
                    item        : this.asset_id,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
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
                axios.post(apiUser + '/tenant/get-all',params,config)
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
                    // tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiUser + '/customer/get-all',params,config)
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
        
        GetProposalData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/proposal/get-all',params,config)
                .then(async res => {
                    console.log(res)
                    this.proposal = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },
        FormatDate,FormatCurrency
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