<template lang="">
    <section v-if="$CheckPermission('Project_Manager','is_allow_access')">

        <Modal_CreateProject @RefreshData="GetAllProject" @OpenModalUpdate="OpenModalUpdate"></Modal_CreateProject>
        <Modal_UpdateProject @RefreshData="GetAllProject" ></Modal_UpdateProject>
        <Modal_DeleteProject @RefreshData="GetAllProject" ></Modal_DeleteProject>
        <div class="row">
            <div class="col-lg-12">
                <div class="card card-one">
                    <Filters 
                        :AdvancedFilter="true" 
                        @handleFilter="setDataFilter" 
                        ref="Filter" 
                        :date_time="true"
                        :ApplyFilter="['project_name','local','investor','tenant_used','status','project_group']"
                    >
                        <button type="button" class="btn btn-success d-flex align-items-center gap-2" data-bs-toggle="modal" data-bs-target="#Modal_CreateProject" v-if="$CheckPermission('Project_Manager','is_allow_create')">
                            <IconPlus :size="24" class="d-flex text-white p-1 rounded-2" stroke-width="3" />
                            <span>Tạo dự án</span>
                        </button>
                    </Filters>
                    <div class="card-body">
                        <div v-if="project.length <= 0" class="position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light" style="z-index: 999;">
                            <img src="/assets/images/empty.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <p class="text-muted" style="font-size:14px">CHƯA TÌM THẤY DỮ LIỆU</p>
                        </div>

                        <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 h-100 w-100 d-flex flex-column align-items-center justify-content-center text-center bg-light">
                            <img src="/assets/images/loading.webp" width="180" alt="" style="mix-blend-mode: multiply;">
                            <h6 class="text-muted fw-light" style="margin-top:-40px">Đang tải dữ liệu...</h6>
                        </div>

                        <div class="h-scrollbar table-responsive mb-3" style="min-height: 72vh;max-height: 72vh;">
                            <table class="table table-hover table-striped align-middle" style="font-size:14px; min-width:120%">
                                <thead class="table-fixed">
                                    <tr>
                                        <th class="text-center bg-white" scope="col" width="2%">STT</th>
                                        <th scope="col" width="1%" class="text-center bg-white">Trạng Thái</th>
                                        <!-- <th scope="col" width="5%">Mã dự án</th>
                                        <th scope="col" width="10%">Tên dự án</th>
                                        <th scope="col" width="8%">Loại dự án</th> -->

                                        <th scope="col" width="20%" class="bg-white">Thông tin dự án</th>
                                        <th scope="col" width="24%" class="bg-white">Thông tin pháp nhân</th>

                                        <th scope="col" width="5%" class="bg-white text-end">Tổng diện tích</th>
                                        <th scope="col" width="5%" class="bg-white text-end">Giá trị dự toán</th>
                                        <th scope="col" width="12%" class="bg-white">Thông tin địa chỉ</th>
                                        <th scope="col" width="8%" class="bg-white">Nhóm dự án</th>
                                        <!-- <th scope="col" width="6%" class="text-center">Dự án gốc</th> -->
                                        <!-- <th scope="col" width="6%" class="text-center">Tỉnh/Thành phố</th>
                                        <th scope="col" width="6%" class="text-center">Quận/Huyện</th> -->
                                        <!-- <th scope="col" width="13%">Chủ sở hữu</th>
                                        <th scope="col" width="13%">Chủ đầu tư</th>
                                        <th scope="col" width="13%">Đơn vị sử dụng</th> -->
                                        <th scope="col" width="4%" class="text-end bg-white">Ngày tạo</th>
                                        <th scope="col" width="5%" class="bg-white" style="z-index:99">
                                            <IconDots :size="22" class="d-flex text-muted" stroke-width="2" />
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in project" :data="item" :key="index" @OpenModalUpdate="OpenModalUpdate" class="table-fixed">
                                        <th class="text-center" scope="row">
                                            <span v-if="paginate.page <= 1">{{ index + 1 }}</span>
                                            <span v-else>{{ (paginate.page - 1) * paginate.limit + index + 1 }}</span>
                                        </th>
                                        <td class="fw-medium text-center">
                                            <div v-for="(v_status, index) in status" :key="index">
                                                <div v-if="v_status.id == item.project_status">
                                                    <span class="status-badge badge fw-medium rounded-2 py-1 px-2" :style="{ backgroundColor : '#' + v_status.color}">{{v_status.value}}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <!-- <td class="fw-medium">{{item.project_code}}</td>
                                        <td>
                                            <span class="text-primary fw-medium cursor-pointer d-flex align-items-center"
                                            @click="OpenModalUpdate(item.id,'view')"
                                            >{{item.project_name}}
                                            </span>
                                        </td>
                                        <td>{{item.project_type}}</td> -->

                                        <td>
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Mã dự án : </span>
                                                <span>{{item.project_code}}</span>
                                            </div>

                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Tên dự án : </span>
                                                <span class="text-primary fw-medium cursor-pointer align-items-center"
                                                @click="OpenModalUpdate(item.id,'view')"
                                                >{{item.project_name}}
                                                </span>
                                            </div>
                                            
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Loại dự án : </span>
                                                <span>{{item.project_type}}</span>
                                            </div>

                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Dự án gốc : </span>
                                                <span>{{item.project_parent}}</span>
                                            </div>

                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Mã dự án bravo : </span>
                                                <span v-if="item.bravo_project_code || item.bravo_project_code === 0">
                                                    {{item.bravo_project_code}} | {{item.bravo_project_name}}
                                                </span>
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Chủ sở hữu : </span>
                                                <span>{{item.owner_info_name}}</span>
                                            </div>

                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Chủ đầu tư : </span>
                                                <span>{{item.investor_info_name}}</span>
                                            </div>

                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Đơn vị sử dụng : </span>
                                                <span>{{item.tenant_used_name}}</span>
                                            </div>
                                        </td>
                                        <td class="text-end">{{item.total_area}} m2</td>
                                        <td class="text-end">{{item.estimated_investment_value}}</td>
                                        <td>
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Tỉnh/Thành Phố : </span>
                                                <span>{{item.province_name}}</span>
                                            </div>
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Quận/Huyện : </span>
                                                <span>{{item.district_name}}</span>
                                            </div>
                                            <div>
                                                <span class="badge-dot bg-twitter me-2"></span>
                                                <span class="fw-semibold">Địa chỉ : </span>
                                                <span>{{item.place_info}}</span>
                                            </div>
                                        </td>
                                        <td class="">
                                            <span v-if="item.project_group_code == 0">Dự án chính</span>
                                            <span v-if="item.project_group_code == 1">Dự án con</span>
                                            <span v-if="item.project_group_code == 2">Dự án nâng cấp - cải tạo</span>
                                        </td>
                                        <!-- <td class="">{{item.province_name}}</td>
                                        <td class="">{{item.district_name}}</td> -->
                                        <!-- <td>{{item.owner_info_name}}</td>
                                        <td>{{item.investor_info_name}}</td>
                                        <td>{{item.tenant_used_name}}</td> -->
                                        <td class="text-end text-nowrap">
                                            {{FormatDate(item.project_create_time,'DD-MM-YYYY')}}
                                        </td>
                                        <td>
                                            <div class="d-flex gap-1">
                                                <button type="button" class="btn btn-info bg-gradient btn-sm p-1"
                                                v-if="$CheckPermission('Project_Manager','is_allow_edit')"
                                                @click="OpenModalUpdate(item.id,'edit')"
                                                >
                                                    <IconPencil :size="20" class="d-flex text-white bg-opacity-10 rounded-2" stroke-width="2" />
                                                </button>
                                                <button type="button" class="btn btn-danger bg-gradient btn-sm p-1"
                                                v-if="$CheckPermission('Project_Manager','is_allow_delete')"
                                                @click="OpenModalUpdate(item.id,'delete')"
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
            </div>
        </div>
    </section>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import Modal_CreateProject from './modal/Create_Project.vue';
import Modal_UpdateProject from './modal/Update_Project.vue';
import Modal_DeleteProject from './modal/Delete_Project.vue';
import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue'
import axios from 'axios'
import Project from './components/ProjectManager/Project.vue';
import ProjectStatus from './components/Common/ProjectStatus.vue';
import { CheckPermission, FormatDate } from '@Helpers/utils.js';
const apiPath = import.meta.env.VITE_API_PATH_STORE;
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import{useProjectStore} from '@Store'
import dayjs from 'dayjs';
export default {

    data(){
        return{
            preloader : true,
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
                search_list : []
            },
            project : [],
        }
    },

    components: {
        ...Icons,
        // Modal
        Modal_CreateProject,Modal_UpdateProject,Modal_DeleteProject,
        //Components
        Project, VueDatePicker,Paginate,Filters,ProjectStatus
    },
    mounted(){
        this.$refs.Filter.setDateFilter()
        this.GetStatusProject()
        this.GetLocations()
        
        // console.log(this.filter)
    },
    methods : {
        GetLocations(){
            try {
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiUser + '/region/get-all',{},config)
                .then(async res => {
                    const ProjectStore = useProjectStore();
                    ProjectStore.SetLocations(res.data.data.dataCountry)
                })
                .catch(err => {
                    
                })
            } catch (err) {
                console.log(err)
            }
        },
        GetStatusProject(){
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
            this.GetAllProject()
        },
        async setDataFilter(e){
            this.filter = await e
            this.GetAllProject()
        },
        OpenModalUpdate(id,modal){
            var modal_name
            switch (modal) {
                case 'edit':
                    modal_name = "Modal_UpdateProject"
                break;
                case 'view':
                    modal_name = "Modal_UpdateProject"
                break;
                case 'delete':
                    modal_name = "Modal_DeleteProject"
                break;
            }
            var Modal_UpdateProject = document.getElementById(modal_name);
            Modal_UpdateProject.setAttribute('data-id', id);
            Modal_UpdateProject.setAttribute('data-modal', modal);
            var modal = new bootstrap.Modal(Modal_UpdateProject);
            modal.show();
        },

        GetAllProject(){
            try {
                const params = {
                    ...this.filter,
                    page    : this.paginate.page,
                    limit   : this.paginate.limit,
                    tenant_id: authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiPath + '/project/get-all',params,config)
                .then(async res => {
                    this.paginate.total = res.data.data.total
                    const result = res.data.data.items.map(item => {
                        item.create_time = dayjs(item.create_time).format('DD-MM-YYYY hh:mm:ss')
                        return item
                    })
                    this.project = result
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },
        CheckPermission,FormatDate
    }
}
</script>
<style lang="scss">
.card-preloader {
    position: absolute;
    background: #ffffff91;
    z-index: 999;
    border-radius: 5px;
    backdrop-filter: blur(10px);
    transition: .3s ease-in-out;
    outline: none!important;
    &.hide{
        opacity : 0;
        background: #ffffff00;
        z-index: -11;
        transition: .3s ease-in-out;
    }
}
</style>