<template lang="">
    
    <section v-if="$CheckPermission('Proposal_Management','is_allow_access')">
        <Modal_CreateProposal @RefreshData="Get_DataProposal" ref="Modal_CreateProposal"></Modal_CreateProposal>
        <Modal_DeleteProposal @RefreshData="Get_DataProposal"></Modal_DeleteProposal>
        <Modal_UpdateProposal ref="Modal_UpdateProposal" @RefreshData="Get_DataProposal"></Modal_UpdateProposal>

        <div class="row">
            <div class="col-lg-12">
                <div class="card card-one">
                    
                    <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="true">
                        <nav class="nav nav-icon nav-icon-sm ms-auto">
                            <!-- <a href="" class="nav-link"><i class="ri-refresh-line"></i></a>
                            <a href="" class="nav-link"><i class="ri-more-2-fill"></i></a> -->
                            <a href="#" class="btn btn-success d-flex align-items-center gap-2" @click="$refs.Modal_CreateProposal._Init()"
                            v-if="$CheckPermission('Proposal_Management','is_allow_create')"
                            >
                                <IconUserPlus color="white" :size="16" stroke-width="2" class="d-flex" />
                                Tạo chủ trương mới
                            </a>
                        </nav>
                    </Filters>

                    <div class="card-body">
                        <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                            <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                        </div>
                        <div class="table-responsive h-scrollbar mb-3" style="max-height: 72vh;min-height: 72vh">
                            <table class="table table-striped align-middle">
                                <thead>
                                    <tr>
                                        <th class="text-center" scope="col" width="4%">STT</th>
                                        <!-- <th scope="col" width="15%">Mã chủ trương</th> -->
                                        <th scope="col" width="15%">Tên Chủ trương</th>
                                        <th scope="col" width="20%">Thông tin tờ trình chủ trương</th>
                                        <th scope="col" width="20%">Ghi chú</th>
                                        <th scope="col">Ngày tạo chủ trương</th>
                                        <th scope="col">Người tạo</th>
                                        <th scope="col" width="10%"><IconDots :size="20" stroke-width="2" class="text-muted" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data" :key="index">
                                        <th class="text-center" scope="row">{{index + 1}}</th>
                                        <td>
                                            <span class="text-primary cursor-pointer" @click="OpenModal('Modal_UpdateProposal',item.id,true)">
                                                {{item.proposal_name}}
                                            </span>
                                        </td>
                                        <!-- <td>{{item.proposal_name}}</td> -->
                                        <td>{{item.proposal_info}}</td>
                                        <td>{{item.description}}</td>
                                        <td>
                                            {{item.start_date}}
                                        </td>
                                        <td>
                                            {{item.create_by}}
                                        </td>
                                        <td >
                                            <div class="d-flex gap-1">
                                                <button type="button" class="btn btn-info bg-gradient btn-sm p-1" 
                                                @click="$refs.Modal_UpdateProposal._Init({id:item.id})"
                                                v-if="$CheckPermission('Proposal_Management','is_allow_edit')"
                                                >
                                                    <IconPencil color="white" :size="20" stroke-width="2" class="d-flex" />
                                                </button>
                                                <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="OpenModal('Modal_DeleteProposal',item.id)"
                                                v-if="$CheckPermission('Proposal_Management','is_allow_delete')"
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
import Modal_CreateProposal from './modal/Create_Proposal.vue';
import Modal_DeleteProposal from './modal/Delete_Proposal.vue';
import Modal_UpdateProposal from './modal/Update_Proposal.vue';
import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue';
import axios from 'axios';
import dayjs from 'dayjs';
import {ShowToast} from '@Helpers/Notify.js'

const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;
const path_apiStore = import.meta.env.VITE_API_PATH_STORE;
const AppPath = import.meta.env.VITE_APP_PATH;
import {CheckPermission} from '@Helpers/utils.js'

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
    methods : {
        async setDataFilter(e){
            this.filters = await e
            this.Get_DataProposal()
        },

        changePaginate(e){
            this.paginate.page = e.page
            this.paginate.limit = e.limit
            this.Get_DataProposal()
        },
        
        OpenModal(modal,value,view){
            var current_modal = document.getElementById(modal);
            current_modal.setAttribute('data-id', value);
            current_modal.setAttribute('data-view', view);
            var modal = new bootstrap.Modal(current_modal);
            modal.show();
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
                url: apiPath + '/user/update',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                this.data[index] = res.data.data
                const toast = {status_code : res.status}
                ShowToast(toast);
            })
        },
        Get_DataProposal(){
            const data = {
                "page": this.paginate.page,
                "limit": this.paginate.limit,
                ...this.filters,
                "tenant_id": auth.tenant_id,
                "flag": true
            }
            axios({
                method:'post',
                url: path_apiStore + '/proposal/get-all',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                this.paginate.total = res.data.data.total
                const result = res.data.data.items.map(item => {
                    item.start_date = dayjs(item.start_date).format('DD-MM-YYYY')
                    return item
                })
                this.data = result
                setTimeout(() => {
                        this.preloader = false
                }, 1000);
            })
        },
    },
    computed : {
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
    },
    components: {
        ...Icons,
        Modal_CreateProposal,Modal_DeleteProposal,Modal_UpdateProposal,Paginate,Filters,
        CheckPermission
    }
}
</script>
<style lang="">
    
</style>