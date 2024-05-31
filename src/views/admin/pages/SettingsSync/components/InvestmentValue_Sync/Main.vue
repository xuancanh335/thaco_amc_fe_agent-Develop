<template lang="">
    <div class="tab-pane h-100 fade show" id="investment-value-sync-pane" role="tabpanel">
        <Create_Modal @RefreshData="GetDataSync"></Create_Modal>
        <Update_Modal @RefreshData="GetDataSync" ref="update"></Update_Modal>
        <Delete_Modal ref="Delete_Modal" @RefreshData="GetDataSync"></Delete_Modal>
        <div class="card card-one">
            <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="true">
                <template v-slot:extend>
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
                </template>
                <nav class="nav nav-icon nav-icon-sm ms-auto">
                    <button data-bs-toggle="modal" class="btn bg-gradient-green text-white rounded-3 p-2 border-0 hover-jello"
                    @click="SyncData()"
                    v-if="$CheckPermission('Sync_Bravo_Config','is_allow_create')"
                    >
                        <IconRefresh :size="24" stroke-width="2" class="d-flex" :class="{'fx-rotate-center' : sync}"/>
                    </button>
                </nav>
            </Filters>
            <div class="card-body h-100 d-flex flex-column">
                <div v-if="sync" class="bg-white position-absolute w-100 h-100 start-0 top-0 rounded-1 d-flex align-items-center justify-content-center flex-column" style="z-index:2">
                    <img src="/public/assets/images/sync-data.webp" width="200" alt="" style="height: 80px;object-fit: cover;">
                    <h5 class="fw-light mt-3">ĐANG ĐỒNG BỘ DỮ LIỆU ...</h5>
                </div>
                <div class="table-responsive h-scrollbar mb-4 flex-grow-1">
                    <table class="table table-striped align-middle" style="width:140%">
                        <thead>
                            <tr>
                                <th class="text-center" scope="col" width="4%">STT</th>
                                <th scope="col" width="5%">Mã công trình</th>
                                <th scope="col" width="5%">Mã đơn vị</th>
                                <!-- <th scope="col" width="5%">Mã hợp đồng</th> -->
                                <th scope="col" width="10%">Ngày chứng từ</th>
                                <th scope="col" width="6%">Mã chứng từ</th>
                                <th scope="col" width="5%">Số chứng từ</th>
                                <th scope="col" width="20%">Nội dung/Diễn giải</th>
                                <th scope="col" width="5%">Tk Nợ</th>
                                <th scope="col" width="5%">Tk Có</th>
                                <th scope="col" width="5%">Tiền nt</th>
                                <th scope="col" width="5%">Tỷ giá</th>
                                <th scope="col" width="5%">Tiền</th>
                                <th scope="col" width="8%">Mã đối tượng</th>
                                
                                <th scope="col" width="5%">Mã hạng mục</th>
                                <th scope="col" width="20%">Mã khoản mục phí</th>
                                <!-- <th scope="col" width="10%"><IconDots :size="20" stroke-width="2" class="text-muted" /></th> -->
                            </tr>
                        </thead>
                        <tbody v-if="$CheckPermission('Sync_Bravo_Config','is_allow_access')">
                            <tr v-for="(item, index) in data" :key="index">
                                <th class="text-center" scope="row">
                                    <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                    <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>
                                </th>
                                <td>{{item.productCode}}</td>
                                <td>{{item.branchCode}}</td>
                                <!-- <td>{{item.bizDocId}}</td> -->
                                <td>{{item.docDate}}</td>
                                <td>{{item.docCode}}</td>
                                <td>{{item.docNo}}</td>
                                <td>{{item.desCription}}</td>
                                <td>{{item.debitAccount}}</td>
                                <td>{{item.creditAccount}}</td>
                                <td>{{FormatCurrency(item.originalAmount)}}</td>
                                <td>{{FormatCurrency(item.exchangeRate)}}</td>
                                <td>{{FormatCurrency(item.amount)}}</td>
                                <td>{{item.customerCode00}}</td>
                                <td>{{item.productCatgCode0}}</td>
                                <td>{{item.expenseCatgCode}}</td>
                                <!-- <td>
                                    <div class="d-flex gap-1"> -->
                                        <!-- <button type="button" class="btn bg-gradient-green btn-sm p-1" 
                                        @click="SyncData({id:item.code,index:index})">
                                            <IconRefresh color="white" :size="20" stroke-width="2" class="d-flex"
                                            :class="{'fx-rotate-center' : item.sync}"
                                            />
                                        </button> -->
                                        <!-- <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="$refs.Delete_Modal._Init({id : item.id})"
                                        v-if="$CheckPermission('Sync_Bravo_Config','is_allow_delete')"
                                        >
                                            <IconX color="white" :size="20" stroke-width="2" class="d-flex" />
                                        </button>
                                    </div>
                                </td> -->
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
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'
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
            tenant_selected : "",
            tenant : [],
            data :{}
        }
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetAllTenant()
            await this.GetDataSync()
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
            axios.post(PATH_API_WEBHOOK + '/investment-value/get-all',params,config)
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

        SyncData(data){
            let start_date  = this.FormatDate(this.filters.request.start_time,'YYYY-MM-DD')
            let end_date    = this.FormatDate(this.filters.request.end_time,'YYYY-MM-DD')
            let tenant      = this.tenant_selected
            if(this.filters.request.start_time && this.filters.request.end_time)
            {
                let params = [
                    {
                        branchCode : tenant,
                        docDate1 : start_date,
                        docDate2 : end_date,
                    }
                ]
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}

                if(tenant){
                data ? this.data[data.index].sync = true : this.sync = true;
                this.sync = true
                // data ? params = [{"code" : data.id}] : params = [{"code" : ""}]

                
                    ShowToast({ status_code: 201, message: 'Đang đồng bộ...' });
                    axios.post(PATH_API_WEBHOOK + '/investment-value/sync-data-bravo',params,config)
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
                    })
                }else{
                    ShowToast({ status_code: 201, message: 'Chưa chọn đơn vị' });
                }
            } else{
                    ShowToast({ status_code: 201, message: 'Chưa chọn ngày đồng bộ' });
                }
        },FormatDate,FormatCurrency
    },
    components: {
        ...Icons,Paginate,
        Create_Modal,Update_Modal,Delete_Modal,Filters
    }
}
</script>
<style lang="">
    
</style>