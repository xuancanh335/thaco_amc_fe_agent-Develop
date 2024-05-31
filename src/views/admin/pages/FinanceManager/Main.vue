<template lang="">
    <section>
        <Create_Finance ref="Create_Finance" @ReloadData="GetAllFinance"></Create_Finance>
        <Update_Finance ref="Update_Finance" @ReloadData="GetAllFinance"></Update_Finance> 
        <Delete_Finance ref="Delete_Finance" @ReloadData="GetAllFinance"></Delete_Finance>

        <section class="mb-4">
            <div class="card card-one">
                <!-- <div class="card-header p-3">
                    <div class="d-flex align-items-center w-100">
                        <div class="flex-grow-1 lh-1 w-100">
                            <h5 class="flex-grow-1 mb-0">Danh sách tài sản</h5>
                            <small class="text-muted">Danh sách tài sản thuộc dự án</small>
                        </div>

                        <button v-if="!view" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" @click="$refs.Create_Finance._Init()">
                            <IconPlus :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                        </button>

                    </div>
                </div> -->

                <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="true">
                    <button type="button" class="btn btn-success d-flex align-items-center gap-2" 
                    @click="$refs.Create_Finance._Init()"
                    v-if="$CheckPermission('Asset_Manager','is_allow_create')"
                    >
                        <IconPlus :size="24" class="d-flex text-white p-1 rounded-2" stroke-width="3" />
                        <span>Tạo tài chính</span>
                    </button>
                </Filters>

                <div class="card-body">
                    <div class="table-responsive h-scrollbar mb-3" style="max-height: 72vh;min-height: 72vh">
                        <div v-if="data.length <= 0" class="position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light" style="z-index: 999;">
                            <img src="/assets/images/empty.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <p class="text-muted" style="font-size:14px">CHƯA TÌM THẤY DỮ LIỆU</p>
                        </div>
                        <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                            <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                        </div>
                        <table class="table table-hover table-striped align-middle" style="width:110%" v-if="$CheckPermission('Asset_Manager','is_allow_access')">
                            <thead class="table-fixed">
                                <tr>
                                    <th scope="col" width="3%" class="text-center bg-white fw-semibold text-nowrap">#</th>
                                    <th scope="col" width="1%" class="bg-white fw-semibold text-nowrap text-center">Trạng thái</th>
                                    <th scope="col" width="20%" class="bg-white fw-semibold text-nowrap">Thông tin dự án</th>
                                    <th scope="col" width="15%" class="bg-white fw-semibold text-nowrap">Thông tin ngân hàng</th>
                                    <th scope="col" width="15%" class="bg-white fw-semibold text-nowrap">Nội dung tài chính</th>
                                    <th scope="col" width="15%" class="bg-white fw-semibold text-nowrap">Giá trị thế chấp</th>
                                    <th scope="col" width="15%" class="bg-white fw-semibold text-nowrap">Thông tin thế chấp</th>
                                    <th scope="col" width="5%" class="bg-white fw-semibold text-nowrap">Ngày tạo</th>
                                    <th scope="col" width="5%" class="bg-white fw-semibold text-nowrap">Ngày dự kiến hoàn thành</th>
                                    <th v-if="!view" width="8%" scope="col" class="bg-white" style="z-index:99">
                                        <IconDotsVertical :size="20" class="d-flex text-muted bg-opacity-10 rounded-2" stroke-width="2" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="index" class="cursor-pointer table-fixed">
                                    <th scope="row" class="text-center">{{index + 1}}</th>
                                    <td class="fw-semibold text-nowrap text-center"> 
                                        <div v-for="(v_status, index) in status" :key="index">
                                            <div v-if="v_status.id == item.status_content">
                                                <span class="status-badge badge fw-medium rounded-2 py-1 px-2" :style="{ backgroundColor : '#' + v_status.color}">{{v_status.value}}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span class='fw-bold'>Mã dự án : </span><span>{{item.project_code}}</span>
                                        </div>
                                        <div>
                                            <span class='fw-bold'>Tên dự án : </span><span>{{item.project_name}}</span>
                                        </div>
                                    </td>

                                    <td>{{item.bank_name}}</td>

                                    <td>{{item.project_finance_content}}</td>

                                    <td>
                                        <div>
                                            <span class='fw-bold'>Giá trị kế toán : </span>
                                            <span>{{FormatCurrency(item.accounting_value)}}</span>
                                        </div>
                                        <div>
                                            <span class='fw-bold'>Giá trị thẩm định : </span>
                                            <span>{{FormatCurrency(item.valuation_value)}}</span>
                                        </div>
                                        <div>
                                            <span class='fw-bold'>Giá trị Hđ thế chấp : </span>
                                            <span>{{FormatCurrency(item.mortgage_value)}}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            <span class='fw-bold'>Ngày ký Hđ thế chấp : </span>
                                            <span>{{FormatDate(item.mortgage_date,'DD/MM/YYYY')}}</span>
                                        </div>
                                        <div>
                                            <span class='fw-bold'>Số lượng tài sản thế chấp : </span>
                                            <span>{{FormatCurrency(item.project_mortgage_quantity)}}</span>
                                        </div>
                                        <div>
                                            <span class='fw-bold'>Số Hđ tín dụng : </span>
                                            <span>{{item.number_credit}}</span>
                                        </div>
                                    </td>


                                    <td>{{FormatDate(item.start_date,'DD/MM/YYYY')}}</td>
                                    <td>{{FormatDate(item.estimated_date_finish,'DD/MM/YYYY')}}</td>
                                    <td v-if="!view">
                                        <div class="d-flex gap-1">
                                            <button type="button" class="btn btn-info bg-gradient btn-sm p-1" @click.stop="$refs.Update_Finance._Init({id : item.id})"
                                            v-if="$CheckPermission('Asset_Manager','is_allow_edit')"
                                            >
                                                <IconPencil :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                            </button>
                                            <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click.stop="$refs.Delete_Finance._Init({id : item.id})"
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

import Create_Finance from './modal/Create_Finance.vue';
import Update_Finance from './modal/Update_Finance.vue';
import Delete_Finance from './modal/Delete_Finance.vue';

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
        Create_Finance,Update_Finance,Delete_Finance,
        Filters,Paginate
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
        this.GetStatus()
    },
    methods : {

        _Init(){
            this.GetAllFinance()
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
        GetStatus(){
            try {
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/get-status-json/get-status-legal-project',{},config)
                .then(async res => {
                    const ProjectStore = useProjectStore();
                    ProjectStore.SetStatus(res.data)
                    this.status = res.data
                    setTimeout(() => {
                        this.preloader = false
                    }, 1000);
                })
                .catch(err => {
                    
                })
            } catch (err) {
                console.log(err)
            }
        },

        changePaginate(e){
            this.paginate.page = e.page
            this.paginate.limit = e.limit
            this.GetAllFinance()
        },

        async setDataFilter(e){
            this.filter = await e
            this.GetAllFinance()
        },

        GetAllFinance(){
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
                axios.post(apiProject + '/project-finance/get-all',params,config)
                .then(async res => {
                    this.paginate.total = res.data.data.total
                    this.data = res.data.data.items
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