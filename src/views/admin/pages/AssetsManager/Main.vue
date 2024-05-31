<template lang="">
    <section>
        <Create_Asset ref="Create_Asset" @ReloadData="GetAllAssets"></Create_Asset>
        <Update_Asset ref="Update_Asset" @ReloadData="GetAllAssets"></Update_Asset> 
        <Delete_Asset ref="Delete_Asset" @ReloadData="GetAllAssets"></Delete_Asset>

        <section class="mb-4">
            <div class="card card-one">
                <!-- <div class="card-header p-3">
                    <div class="d-flex align-items-center w-100">
                        <div class="flex-grow-1 lh-1 w-100">
                            <h5 class="flex-grow-1 mb-0">Danh sách tài sản</h5>
                            <small class="text-muted">Danh sách tài sản thuộc dự án</small>
                        </div>

                        <button v-if="!view" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" @click="$refs.Create_Asset._Init()">
                            <IconPlus :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                        </button>

                    </div>
                </div> -->

                <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="true">
                    <button type="button" class="btn btn-success d-flex align-items-center gap-2" @click="$refs.Create_Asset._Init()"
                    v-if="$CheckPermission('Asset_Manager','is_allow_create')"
                    >
                        <IconPlus :size="24" class="d-flex text-white p-1 rounded-2" stroke-width="3" />
                        <span>Tạo tài sản</span>
                    </button>
                </Filters>

                <div class="card-body">
                    <div class="table-responsive h-scrollbar mb-3" style="max-height: 72vh;min-height: 72vh">

                        <div v-if="assets.length <= 0" class="position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light" style="z-index: 999;">
                            <img src="/assets/images/empty.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <p class="text-muted" style="font-size:14px">CHƯA TÌM THẤY DỮ LIỆU</p>
                        </div>

                        <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                            <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                        </div>

                        <table class="table table-hover table-striped align-middle" style="width:100%"
                        v-if="$CheckPermission('Asset_Manager','is_allow_access')"
                        >
                            <thead class="table-fixed">
                                <tr>
                                    <th scope="col" width="4%" class="text-center bg-white fw-semibold">#</th>
                                    <th scope="col" width="20%" class="bg-white fw-semibold">Thông tin dự án</th>
                                    <th scope="col" width="25%" class="bg-white fw-semibold">Thông tin tài sản</th>
                                    <th scope="col" width="20%" class="bg-white fw-semibold">Giá trị</th>
                                    <th scope="col" width="10%" class="bg-white fw-semibold">Đơn vị sử dụng</th>
                                    <th scope="col" width="8%" class="bg-white fw-semibold text-end">Tổng diện tích</th>
                                    <th scope="col" width="86%" class="bg-white fw-semibold text-end">Ngày tạo</th>
                                    <th v-if="!view" width="15%" scope="col" class="bg-white" style="z-index:99">
                                        <IconDotsVertical :size="20" class="d-flex text-muted bg-opacity-10 rounded-2" stroke-width="2" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in assets" :key="index" class="cursor-pointer table-fixed">
                                    <th scope="row" class="text-center">{{index + 1}}</th>

                                    <td>
                                        <div>
                                            <span class="fw-semibold">Mã dự án : </span>
                                            <span>{{item.project_name}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Tên dự án : </span>
                                            <span>{{item.project_code}}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            <span class="fw-semibold">Mã tài sản : </span>
                                            <span>{{item.asset_code}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Tên tài sản : </span>
                                            <span>{{item.asset_name}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Tài sản gốc : </span>
                                            <span>{{item.asset_parent}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Loại tài sản : </span>
                                            <span>{{item.asset_type}}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            <span class="fw-semibold">Tổng nguyên giá : </span>
                                            <span>{{FormatCurrency(item.total_unit_price)}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Tổng giá khấu hao : </span>
                                            <span>{{FormatCurrency(item.total_depreciation_price)}}</span>
                                        </div>
                                        <div>
                                            <span class="fw-semibold">Giá trị còn lại : </span>
                                            <span>{{FormatCurrency(ResidualValue(item.total_unit_price,item.total_depreciation_price))}}</span>
                                        </div>
                                    </td>

                                    <td>{{item.tenant_used_name}}</td>
                                    <td class="text-end">{{FormatCurrency(item.total_area_used)}}</td>
                                    <td class="text-end">{{FormatDate(item.asset_create_time,'DD/MM/YYYY')}}</td>
                                    <td v-if="!view">
                                        <div class="d-flex gap-1">
                                            <button type="button" class="btn btn-info bg-gradient btn-sm p-1" @click.stop="$refs.Update_Asset._Init({id : item.id})"
                                            v-if="$CheckPermission('Asset_Manager','is_allow_edit')"
                                            >
                                                <IconPencil :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                            </button>
                                            <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click.stop="$refs.Delete_Asset._Init({id : item.id})"
                                            v-if="$CheckPermission('Asset_Manager','is_allow_delete')"
                                            >
                                                <IconX :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Paginate
                        :total="paginate.total"
                        :limit="paginate.limit"
                        @Handle="changePaginate"
                    ></Paginate>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
import dayjs from 'dayjs';

import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue'

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ShowToast} from '@Helpers/Notify.js'
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'

import Create_Asset from './modal/Create_Asset.vue';
import Update_Asset from './modal/Update_Asset.vue';
import Delete_Asset from './modal/Delete_Asset.vue';



const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'

export default {
    data(){
        return {
            preloader : true,
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

            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            filter : {
                request : {
                    start_time : null,
                    end_time : null,
                },
            },
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        Create_Asset,Update_Asset,Delete_Asset,
        Filters,Paginate
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
    },
    methods : {

        _Init(){
            this.GetAllAssets()
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

        changePaginate(e){
            this.paginate.page = e.page
            this.paginate.limit = e.limit
            this.GetAllAssets()
        },

        async setDataFilter(e){
            this.filter = await e
            this.GetAllAssets()
        },

        GetAllAssets(){
            // var id = document.getElementById('Modal_UpdateProject').dataset.id;
            // console.log(id)
            try {
                const params = {
                    ...this.filter,
                    page    : this.paginate.page,
                    limit   : this.paginate.limit,
                    // request: {
                    //     project_id: id
                    // },
                    // page    : 0,
                    // limit   : 0,
                    // // "search_list": [
                    // //     {
                    // //     "name_field": "string",
                    // //     "value_search": "string"
                    // //     }
                    // // ]
                    // tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset/get-all',params,config)
                .then(async res => {
                    this.paginate.total = res.data.data.total
                    this.assets = res.data.data.items
                    setTimeout(() => {
                        this.preloader = false
                    }, 1000);
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
        ResidualValue(total_unit_price,total_depreciation_price){
            let unit_price
            let depreciation_price
            total_unit_price ? unit_price = total_unit_price : unit_price = 0
            total_depreciation_price ? depreciation_price = total_depreciation_price : depreciation_price = 0
            return unit_price - depreciation_price
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