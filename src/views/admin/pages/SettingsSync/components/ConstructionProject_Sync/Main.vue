<template lang="">
    <div class="tab-pane h-100 fade show" id="construction-project-sync-pane" role="tabpanel">
        <Create_Modal @RefreshData="GetDataSync"></Create_Modal>
        <Update_Modal @RefreshData="GetDataSync" ref="update"></Update_Modal>
        <Delete_Modal ref="Delete_Modal" @RefreshData="GetDataSync"></Delete_Modal>
        <div class="card card-one">
            <Filters @handleFilter="setDataFilter" ref="Filter" :date_time="false">
                <nav class="nav nav-icon nav-icon-sm ms-auto">
                    <button data-bs-toggle="modal" class="btn bg-gradient-green text-white rounded-3 p-2 border-0 hover-jello"
                    @click="SyncData()"
                    v-if="$CheckPermission('Sync_Bravo_Config','is_allow_create')"
                    >
                        <IconRefresh :size="24" stroke-width="2" class="d-flex" :class="{'fx-rotate-center' : sync}"/>
                    </button>
                </nav>
            </Filters>
            <div class="card-body d-flex flex-column position-relative">
                <div v-if="sync" class="bg-white position-absolute w-100 h-100 start-0 top-0 rounded-1 d-flex align-items-center justify-content-center flex-column" style="z-index:2">
                    <img src="/public/assets/images/sync-data.webp" width="200" alt="" style="height: 80px;object-fit: cover;">
                    <h5 class="fw-light mt-3">ĐANG ĐỒNG BỘ DỮ LIỆU ...</h5>
                </div>
                <table class="table table-striped align-middle">
                    <thead>
                        <tr>
                            <th class="text-center" scope="col" width="4%">STT</th>
                            <th scope="col" width="10%">Mã dự án công trình</th>
                            <th scope="col" width="20%">Tên dự án công trình</th>
                            <th scope="col" width="15%">Mã dự án cha</th>
                            <th scope="col" width="10%"><IconDots :size="20" stroke-width="2" class="text-muted" /></th>
                        </tr>
                    </thead>
                    <tbody v-if="$CheckPermission('Sync_Bravo_Config','is_allow_access')">
                        <tr v-for="(item, index) in data" :key="index">
                            <th class="text-center" scope="row">
                                <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>
                            </th>
                            <td>
                                {{item.code}}
                            </td>
                            <td>{{item.name}}</td>
                            <td>{{item.parentCode}}</td>
                            <td>
                                <div class="d-flex gap-1">
                                    <button type="button" class="btn bg-gradient-green btn-sm p-1" 
                                    @click="SyncData({id:item.code,index:index})"
                                    v-if="$CheckPermission('Sync_Bravo_Config','is_allow_create')"
                                    >
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
                <Paginate
                    :total="paginate.total"
                    :limit="paginate.limit"
                    @Handle="changePaginate"
                    class="mt-auto"
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
import {FormatDate} from '@Helpers/utils.js'
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
                // request : {
                //     start_time : null,
                //     end_time : null,
                // },
            },
            data :[]
        }
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetDataSync()
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
            axios.post(PATH_API_WEBHOOK + '/construction-project/get-all',params,config)
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
        SyncData(data){
            let params
            ShowToast({ status_code: 201, message: 'Đang đồng bộ...' });
            data ? this.data[data.index].sync = true : this.sync = true;
            this.sync = true
            data ? params = [{"code" : data.id}] : params = [{"code" : ""}]
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/construction-project/sync-data-bravo',params,config)
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
        },FormatDate
    },
    components: {
        ...Icons,Paginate,
        Create_Modal,Update_Modal,Delete_Modal,Filters
    }
}
</script>
<style lang="">
    
</style>