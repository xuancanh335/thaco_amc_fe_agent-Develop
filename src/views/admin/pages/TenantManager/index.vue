<template lang="">
    
    <section v-if="$CheckPermission('Proposal_Management','is_allow_access')">
        <Modal_CreateTenant ref="Modal_CreateTenant" @RefreshData="GetDataTenant"></Modal_CreateTenant>
        <Modal_DeleteTenant ref="Modal_DeleteTenant" @RefreshData="GetDataTenant"></Modal_DeleteTenant>
        <Modal_UpdateTenant ref="Modal_UpdateTenant" @RefreshData="GetDataTenant"></Modal_UpdateTenant>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-one">
                    <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="false">
                        <nav class="nav nav-icon nav-icon-sm ms-auto">
                            <!-- <a href="" class="nav-link"><i class="ri-refresh-line"></i></a>
                            <a href="" class="nav-link"><i class="ri-more-2-fill"></i></a> -->
                            <a v-if="$CheckPermission('Tenant_Manager','is_allow_create')" href="#" class="btn btn-success d-flex align-items-center gap-2" @click="$refs.Modal_CreateTenant._Init()"
                            >
                                <IconUserPlus color="white" :size="16" stroke-width="2" class="d-flex" />
                                Tạo đơn vị mới
                            </a>
                        </nav>
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
                            <table class="table table-striped align-middle" style="width:120%">
                                <thead class="table-fixed">
                                    <tr>
                                        <th class="text-center bg-white" scope="col" width="2%">STT</th>
                                        <th scope="col" width="28%" class="bg-white">Thông tin đơn vị</th>
                                        <th scope="col" class="text-center bg-white" width="10%">Tên quản trị</th>

                                        <th scope="col" width="12%" class="text-nowrap bg-white">Trạng thái vốn</th>
                                        <th scope="col" width="8%" class="text-center bg-white">Trạng thái hoạt động</th>
                      
                                        <th scope="col" width="10%" class="text-center bg-white">Tập đoàn</th>
                                        <th scope="col" width="15%" class="text-nowrap bg-white">Thông tin quản lý</th>
                                        <th scope="col" width="8%" class="text-nowrap bg-white">Trạng thái</th>
                                        <th scope="col" width="10%" class="bg-white" style="z-index:99">
                                            <IconDots :size="20" stroke-width="2" class="text-muted" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody v-if="$CheckPermission('Tenant_Manager','is_allow_access')">
                                    <tr class="table-fixed" v-for="(item, index) in data" :key="index">
                                        <th class="text-center" scope="row">{{index + 1}}</th>
                                        <td>
                                            <div>
                                                <span class="fw-bold">Tên đơn vị : </span>
                                                <span class="text-primary fw-bold">
                                                    {{item.tenant_code}} | {{item.tenant_name}}
                                                </span>
                                            </div>
                                            <div>
                                                <span class="fw-bold">Mã số thuế : </span>
                                                <span>{{item.mst}}</span>
                                            </div>

                                            <div>
                                                <span class="fw-bold">Địa chỉ : </span>
                                                <span>{{item.address}}</span>
                                            </div>
                                        </td>
                                        <td class="text-center">{{item.admin_name}}</td>
                                  
                                        <td>
                                            <div>
                                                <span class="fw-bold">Vốn điều lệ : </span>
                                                <span>{{FormatCurrency(item.charter_capital)}} </span>
                                            </div>
                                            <div>
                                                <span class="fw-bold">Tỷ lệ sở hữu: </span>
                                                <span>{{FormatCurrency(item.ownership_ratio)}}</span>
                                            </div>

                                            <div>
                                                <span class="fw-bold">Vốn góp theo tỷ lệ sở hữu : </span>
                                                <span>{{FormatCurrency(item.contributed_ownership_ratio)}}</span>
                                            </div>
                                            <div>
                                                <span class="fw-bold">Vốn đã góp : </span>
                                                <span>{{FormatCurrency(item.contributed_capital)}}</span>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            {{item.active_state}}
                                        </td>
                            
                                        <td class="text-center">
                                            {{item.group_name}}
                                        </td>

                                        <td class="text-nowrap">
                                            <div>
                                                <span class="fw-bold">Giám đốc: </span>
                                                <span>  {{item.director}} | {{item.director_phone}} </span>
                                            </div>
                                            <div>
                                                <span class="fw-bold">Kế toán trưởng: </span>
                                                <span> {{item.chief_accountant}} | {{item.chief_accountant_phone}}</span>
                                            </div>
                                        </td>

                                        <td>
                                            <div class="form-check form-check-danger form-switch ">
                                                <input class="form-check-input form-check-input-info form-control rounded-5" style="height:20px; width:40px" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="item.is_active" 
                                                @click="ChangeStatus(item,index)">
                                            </div>
                                        </td>
                                        <td >
                                            <div class="d-flex gap-1">
                                                <button v-if="$CheckPermission('Tenant_Manager','is_allow_edit')" type="button" class="btn btn-info bg-gradient btn-sm p-1" 
                                                @click="$refs.Modal_UpdateTenant._Init({id:item.id})"
                                                >
                                                    <IconPencil color="white" :size="20" stroke-width="2" class="d-flex" />
                                                </button>
                                                <button v-if="$CheckPermission('Tenant_Manager','is_allow_delete')" type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="$refs.Modal_DeleteTenant._Init({id:item.id})"
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
        </div>
    </section>
</template>

<script>
import Icons from '@Admin/common/js/Icons';
import Modal_CreateTenant from './modal/Create_Tenant.vue';
import Modal_DeleteTenant from './modal/Delete_Tenant.vue';
import Modal_UpdateTenant from './modal/Update_Tenant.vue';
import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import {ShowToast} from '@Helpers/Notify.js'

const auth = JSON.parse(localStorage.getItem('authorize'))

const PATH_API_STORE = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;

const AppPath = import.meta.env.VITE_APP_PATH;
import {CheckPermission,FormatCurrency} from '@Helpers/utils.js'

export default {
    data(){
        return {
            preloader : true,
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
            data : [],
            item : null,
        }
    },

    async created(){
        await this._Init()
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetDataTenant()
        },
        ChangeStatus(item){
            this.$refs.update.UpdateStatus(item,event.target.checked)
        },
        async setDataFilter(e){
            this.filters = await e
            this.GetDataTenant()
        },

        changePaginate(e){
            this.paginate.page = e.page
            this.paginate.limit = e.limit
            this.GetDataTenant()
        },
        
        OpenModal(modal,value,view){
            var current_modal = document.getElementById(modal);
            current_modal.setAttribute('data-id', value);
            current_modal.setAttribute('data-view', view);
            var modal = new bootstrap.Modal(current_modal);
            modal.show();
        },

        GetDataTenant(){
            const data = {
                "page": this.paginate.page,
                "limit": this.paginate.limit,
                ...this.filters,
                "flag": true
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/tenant/get-all',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                console.log(res)
                this.paginate.total = res.data.data.total
                this.data = res.data.data.items
                setTimeout(() => {
                        this.preloader = false
                }, 1000);
            })
        },

        ResetSelected(){this.item_selected = null},
        ChangeUserStatus(e,index){
            const data = {
                email: e.email,
                fullname: e.fullname,
                is_active: !e.is_active,
                phone: e.phone,
                username: e.username
            };
            axios({
                method:'post',
                url: PATH_API_USER + '/user/update',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                this.data[index] = res.data.data
                const toast = {status_code : res.status}
                ShowToast(toast);
            })
        },FormatCurrency

        // Get_DataProposal(){
        //     const data = {
        //         "page": this.paginate.page,
        //         "limit": this.paginate.limit,
        //         ...this.filters,
        //         "tenant_id": auth.tenant_id,
        //         "flag": true
        //     }
        //     axios({
        //         method:'post',
        //         url: PATH_API_STORE + '/proposal/get-all',
        //         headers: {
        //             'Authorization': 'Bearer ' + auth.token
        //         },
        //         data: data
        //     }).then(res => {
        //         this.paginate.total = res.data.data.total
        //         const result = res.data.data.items.map(item => {
        //             item.start_date = dayjs(item.start_date).format('DD-MM-YYYY')
        //             return item
        //         })
        //         this.data = result
        //     })
        // },
    },
    computed : {
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
    },
    components: {
        ...Icons,
        Modal_CreateTenant,Modal_DeleteTenant,Modal_UpdateTenant,Paginate,Filters,
        CheckPermission
    }
}
</script>
<style lang="">
    
</style>