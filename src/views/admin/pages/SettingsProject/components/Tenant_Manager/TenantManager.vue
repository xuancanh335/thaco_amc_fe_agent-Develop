<template lang="">
    <div class="tab-pane h-100 fade show" id="tenant-manager-pane" role="tabpanel">
        <Create_Modal @RefreshData="getData"></Create_Modal>
        <Update_Modal @RefreshData="getData" ref="update"></Update_Modal>
        <Delete_Modal @RefreshData="getData"></Delete_Modal>
        <div class="card card-one">
            <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="false">
                <nav class="nav nav-icon nav-icon-sm ms-auto">
                    <button data-bs-toggle="modal" data-bs-target="#Modal_CreateTenant" class="btn bg-success text-white rounded-circle p-2 border-0 hover-jello" href="#">
                        <IconPlus :size="24" stroke-width="2" class="d-flex" />
                    </button>
                </nav>
            </Filters>

            <div class="card-body">
                <div class="table-responsive mb-3 h-scrollbar">
                    <table class="table table-fixed table-sm table-striped align-middle" style="width:120%">
                        <thead>
                            <tr>
                                <th class="text-center" scope="col" width="3%">STT</th>
                                <th scope="col" class="text-center" width="6%">Mã đơn vị</th>
                                <th scope="col" class="fw-bold" width="20%">Tên đơn vị</th>
                                <th scope="col" width="10%">Tên quản trị</th>
                                <th scope="col" width="25%">Địa chỉ</th>
                                <th scope="col" width="10%" class="text-center">Tập đoàn</th>
                                <th scope="col" class="text-center" width="10%">Trạng thái</th>
                                <th scope="col" width="10%" class="text-center"><IconDots :size="20" stroke-width="2" class="text-muted" /></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in data" :key="index">
                                <th class="text-center" scope="row">
                                    <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                    <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>
                                </th>
                                <td class="text-center">{{item.tenant_code}}</td>
                                <td>{{item.tenant_name}}</td>
                                <td>{{item.admin_name}}</td>
                                <td>{{item.address}}</td>
                                <td class="text-center">{{item.group_name}}</td>
                                <td>
                                    <div class="form-check form-check-danger form-switch d-flex justify-content-center">
                                        <input class="form-check-input form-check-input-info form-control rounded-5" style="height:20px; width:40px" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="item.is_active" 
                                        @click="ChangeStatus(item,index)">
                                    </div>
                                </td>
                                <td >
                                    <div class="d-flex gap-1 justify-content-center">
                                        <button type="button" class="btn btn-info bg-gradient btn-sm p-1" 
                                        @click="OpenModal('Modal_UpdateTenant',item.id)">
                                            <IconPencil color="white" :size="20" stroke-width="2" class="d-flex" />
                                        </button>
                                        <button type="button" class="btn btn-danger bg-gradient btn-sm p-1" @click="OpenModal('Modal_DeleteTenant',item.id)">
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

import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue';
const auth = JSON.parse(localStorage.getItem('authorize'))
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const APP_PATH = import.meta.env.VITE_APP_PATH;
export default {
    data(){
        return{
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            filters : {
                // request : {
                //     start_time : null,
                //     end_time : null,
                // },
            },
            data :[]
        }
    },
    methods : {
        async setDataFilter(e){
            this.filters = await e
            this.getData()
        },
        changePaginate(value){
            this.paginate.page = value.page
            this.paginate.limit = value.limit
            this.getData()
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
        getData(){
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
                this.paginate.total = res.data.data.total
                this.data = res.data.data.items
            })
        }
    },
    components: {
        ...Icons,
        Create_Modal,Update_Modal,Delete_Modal,
        Paginate,Filters
    }
}
</script>
<style lang="">
    
</style>