<template lang="">
    <div class="tab-pane h-100 fade show" id="depreciation-value-sync-pane" role="tabpanel">
        <Create_Modal @RefreshData="GetDataSync"></Create_Modal>
        <Update_Modal @RefreshData="GetDataSync" ref="update"></Update_Modal>
        <Delete_Modal ref="Delete_Modal" @RefreshData="GetDataSync"></Delete_Modal>
        <div class="card card-one">
            <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="true">
                <template v-slot:extend>

                    <!-- <DropdownTable 
                        ref="DropdownTable" 
                        @handleDropdownTable="handleDropdownTable"
                        @handleSelectItem="DropdownTable_Select"
                        :data = "dropdown_table.data"
                        :total = "dropdown_table.total"
                        :label_init = "dropdown_table.label_init"
                        style="max-width:300px"
                    ></DropdownTable> -->
                    <div>
                        <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconBuilding :size="22" stroke-width="1" class="d-flex" />    
                            </span>
                            <select class="form-control border-start-0" v-model="tenant_selected" style="width:250px">
                                <option value="" selected>---CHỌN ĐƠN VỊ---</option>
                                <option :value="item.bravo_tenant_code" v-for="(item, index) in tenant" :key="index">
                                    {{item.tenant_code}}|{{item.tenant_name}}
                                </option>
                            </select>
                        </div>
                    </div>
                    <!-- <div>
                        <div class="input-group flex-grow-1">
                            <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                                <IconClipboardData :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <div>
                                <input type="text" class="dropdown-toggle form-control border-start rounded-0 rounded-end cursor-pointer" readonly data-bs-toggle="dropdown" data-bs-auto-close="false" placeholder="Chọn đơn vị..." v-model="sync_code">
                                <div class="dropdown-menu shadow-sm" style="min-width:500px">
                                    <div>
                                        <input type="text" class="form-control form-sm mb-2" v-model="assets_new.paginate.search_value" @change="GetAllAssets" placeholder="Nhập từ khóa tìm kiếm ...">
                                        <IconSearch :size="20" stroke-width="1" class="d-flex position-absolute top-0 end-0" style="margin:12px 12px" />
                                    </div>

                                    <table class='table table-sm table-bordered align-middle' style="font-size:13px">
                                        <tbody>
                                            <tr v-for="(item, index) in assets_new.data" :key="index">
                                                <th>{{item.value}}</th>
                                                <td class="text-nowrap text-truncate" style="max-width:250px">
                                                    {{item.label}}
                                                </td>
                                                <td class="text-center">
                                                    <button class="btn btn-sm btn-primary" @click="sync_code = item.value">Chọn</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="d-flex justify-content-center mb-3">
                                        <el-pagination
                                            small
                                            background
                                            layout="prev, pager, next"
                                            :total="assets_new.paginate.total"
                                            @current-change="TestA"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->
                    <!-- <div class="d-flex gap-2">
                        <div class="mb-0">
                            <div class="d-flex" >
                                <el-date-picker
                                    v-model="sync_date"
                                    type="date"
                                    placeholder="Chọn ngày tạo tài sản"
                                    date-format="DD/MM/YYYY"
                                    format="DD/MM/YYYY"
                                    style="height:37px"
                                />
                            </div>
                        </div>
                    </div> -->
                </template>
                <nav class="nav nav-icon nav-icon-sm ms-auto">
                    <button class="btn bg-gradient-green text-white rounded-3 p-2 border-0 hover-jello"
                    @click="SyncData()"
                    v-if="$CheckPermission('Sync_Bravo_Config','is_allow_create')"
                    >
                        <IconRefresh :size="24" stroke-width="2" class="d-flex" :class="{'fx-rotate-center' : sync}"/>
                    </button>
                </nav>
            </Filters>
            <div class="card-body h-100 d-flex flex-column">
                <div v-if="sync" class="bg-white position-absolute w-100 h-100 start-0 top-0 rounded-1 d-flex align-items-center justify-content-center flex-column" style="z-index:99">
                    <img src="/public/assets/images/sync-data.webp" width="200" alt="" style="height: 80px;object-fit: cover;">
                    <h5 class="fw-light mt-3">ĐANG ĐỒNG BỘ DỮ LIỆU ...</h5>
                </div>
                <div class="table-responsive h-scrollbar mb-3 flex-grow-1">
                    <table class="table table-striped align-middle table-fixed" style="width:140%">
                        <thead>
                            <tr>
                                <th class="text-center" scope="col" width="2%">STT</th>
                                <!-- <th scope="col" width="6%">Mã giá trị khấu hao</th> -->
                                <th scope="col" width="4%">Mã đơn vị</th>
                                <th scope="col" width="6%">Mã tài sản</th>
                                <th scope="col" width="20%">Tên giá trị khấu hao</th>
                                <th scope="col" width="6%">Ngày chứng từ</th>
                                <th scope="col" width="10%">Nội dung/Diễn giải</th>
                                <th scope="col" width="5%">Tài khoản ghi có</th>
                                <th scope="col" width="5%">Tài khoản ghi nợ</th>
                                <th scope="col" width="5%">Mã sản phẩm</th>
                                <th scope="col" width="5%">Mã chi phí</th>
                                <th scope="col" width="5%">
                                    <IconDots :size="20" stroke-width="2" class="text-muted" />
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="$CheckPermission('Sync_Bravo_Config','is_allow_access')">
                            <tr v-for="(item, index) in data" :key="index">
                                <th class="text-center" scope="row">
                                    <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                    <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>
                                </th>
                                <!-- <td>{{item.id}}</td> -->
                                <td>{{item.branchCode}}</td>
                                <td>{{item.assetCode}}</td>
                                <td>{{item.name}}</td>
                               <!-- <td>{{item.docDate}}</td> -->
                                <td>{{FormatDate(item.docDate,'DD/MM/YYYY')}}</td> 
                                <td>{{FormatCurrency(item.depreciation)}}</td>
                                <td>{{item.deprCreditAccount}}</td>
                                <td>{{item.deprDebitAccount}}</td>
                                <td>{{item.productCode}}</td>
                                <td>{{item.expenseCatgCode}}</td>
                                <td>
                                    <div class="d-flex gap-1">
                                        <button type="button" class="btn bg-gradient-green btn-sm p-1" 
                                        @click="SyncData()" v-if="$CheckPermission('Sync_Bravo_Config','is_allow_create')">
                                            <IconRefresh color="white" :size="20" stroke-width="2" class="d-flex"
                                            :class="{'fx-rotate-center' : item.sync}"
                                            />
                                        </button>
                                        <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="$refs.Delete_Modal._Init({id : item.id})"
                                        v-if="$CheckPermission('Sync_Bravo_Config','is_allow_delete')"
                                        >
                                            <IconX color="white" :size="20" stroke-width="2" class="d-flex" />
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
    </div>
</template>
<script>

import axios from 'axios';
import Icons from '@Admin/common/js/Icons';
import Create_Modal from './modal/Create_Modal.vue'
import Update_Modal from './modal/Update_Modal.vue'
import Delete_Modal from './modal/Delete_Modal.vue'
import dayjs from 'dayjs';
import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue';
import DropdownTable from '@Admin/components/common/DropdownTable.vue';


import {FormatDate, FormatCurrency} from '@Helpers/utils.js'
import VueDatePicker from '@vuepic/vue-datepicker';
const auth = JSON.parse(localStorage.getItem('authorize'))

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

const APP_PATH = import.meta.env.VITE_APP_PATH;

import {ShowToast} from '@Helpers/Notify.js'

export default {
    data(){
        return{
            sync : false,
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            filters : {
                request : {
                    start_time : null,
                    end_time : null,
                },
            },
            data : {},
            assets  : [],
            tenant_selected : "",
            tenant : [],
            sync_date : null,
            sync_code : null,

            assets_new : {
                data : [],
                paginate : {
                    limit : 10,
                    page : 1,
                    total : 1,
                    search_value : ""
                }
            },

            dropdown_table : {
                data : [],
                total : 1,
                paginate : {
                    limit : 10,
                    page : 1,
                },
                search_value : '',
                label_init : '',
            }
        }
    },


    methods : {
        handleDropdownTable(data){
            console.log(data)
            this.dropdown_table.paginate.page = data.page
            this.dropdown_table.search_value = data.search_value
            this.GetAllAssets()
        },
        DropdownTable_Select(data){
            this.sync_code = data.value
            this.dropdown_table.label_init = data.label_init
        },

        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetDataSync()
            this.GetAllAssets()
            this.GetAllTenant()
            this.sync_date = dayjs().endOf('month')
        },
        async setDataFilter(e){
            this.filters = await e
            this.GetDataSync()
        },
        ChangeStatus(item){
            this.$refs.update.UpdateStatus(item,event.target.checked)
        },
        OpenModal(modal,value){
            var current_modal = document.getElementById(modal);
            current_modal.setAttribute('data-id', value);
            var modal = new bootstrap.Modal(current_modal);
            modal.show();
        },
        changePaginate(value){
            this.paginate.page = value.page
            this.paginate.limit = value.limit
            this.GetDataSync()
        },
        GetDataSync(){
            const params = {
                page        : this.paginate.page,
                limit       : this.paginate.limit,
                flag        : true,
                ...this.filters,
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/depreciation-value/get-all',params,config)
            .then(res => {
                this.data = res.data.data.items
                this.paginate.total = res.data.data.total
                this.data.map(item => {
                    item.sync = false
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },

        GetAllTenant(){
            const params = {
                limit : 0,
                page : 0,
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/tenant/get-all',
                headers: {
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data: params
            }).then(res => {
                let tenant = res.data.data.items.filter(item => item.bravo_tenant_code != '')
                this.tenant = tenant
            })
        },
     
        GetAllAssets(){
            const params = {
                limit : this.dropdown_table.paginate.limit,
                page : this.dropdown_table.paginate.page,
                search_list: [
                    {
                        name_field: "search_field",
                        value_search: this.dropdown_table.search_value
                    }
                ]
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/asset-item/get-all',params,config)
            .then(res => {
                this.dropdown_table.data = res.data.data.items
                this.dropdown_table.total = res.data.data.total
                this.dropdown_table.data = this.dropdown_table.data.map(item => {
                    let arr = {
                        value : item.code,
                        label : item.code + '|' + item.name
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },

        SyncData(data){
            let tenant = this.tenant_selected
            if(this.filters.request.start_time && this.filters.request.end_time)
            {
                let params = [{
                        branchCode : tenant,
                        date1 : dayjs(this.filters.request.start_time).format('YYYY-MM-DD'),
                        date2 : dayjs(this.filters.request.end_time).format('YYYY-MM-DD')
                    }]
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
                if(tenant){
                    ShowToast({ status_code: 201, message: 'Đang đồng bộ...' });
                    this.sync = true
                    data ? this.data[data.index].sync = true : this.sync = true;
                    axios.post(PATH_API_WEBHOOK + '/depreciation-value/sync-data-bravo',params,config)
                    .then(res => {
                        setTimeout(() => {
                            data ? this.data[data.index].sync = false : this.sync = false;
                            this.sync = false
                            ShowToast({ status_code: 200, message: 'Đồng bộ thành công' });
                            this.GetDataSync()
                        }, 1000);
                    })
                    .catch(err => {
                        ShowToast({ status_code: 401, message: 'Đồng bộ thất bại' });
                        console.error(err); 
                    })}
                else{
                    ShowToast({ status_code: 201, message: 'Chưa chọn đơn vị' });
                }
            } else{
                    ShowToast({ status_code: 201, message: 'Chưa chọn ngày đồng bộ' });
                }
        } ,FormatDate, FormatCurrency
    },
    components: {
        ...Icons,Paginate,
        Create_Modal,Update_Modal,Delete_Modal,Filters,VueDatePicker,
        ElSelect,ElOption,ElPagination,DropdownTable
    }
}
</script>
<style lang="">
    
</style>