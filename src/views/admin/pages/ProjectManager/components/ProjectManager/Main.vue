<template lang="">
    <div class="row mb-3" v-if="data.projectData">
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body d-flex flex-column gap-2">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconKey :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Mã dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Nhập mã dự án ..." :readonly="view" :disabled="view" v-model="data.projectData.project_code">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconFileInfo :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Tên dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Nhập tên dự án..." :readonly="view" :disabled="view" v-model="data.projectData.project_name">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconFileInfo :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Dự án gốc :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.project_parent">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconFileInfo :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Loại dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.project_type">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconCalendarStats :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Thời hạn sử dụng :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <VueDatePicker class="custom-datepicker custom-datepicker-sm" hide-input-icon v-model="data.projectData.project_expiration_date" placeholder="Chưa có dữ liệu..." auto-apply :format="'dd/MM/yyyy'" :enable-time-picker="false" :readonly="view" :disabled="view"></VueDatePicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconCalendarEvent :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Ngày tạo dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <VueDatePicker class="custom-datepicker custom-datepicker-sm" hide-input-icon v-model="data.projectData.project_create_time" placeholder="Chưa có dữ liệu..." auto-apply :format="'dd/MM/yyyy'" :enable-time-picker="false" :readonly="view" :disabled="view"></VueDatePicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconCalendarEvent :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Dự kiến hoàn thành:</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <VueDatePicker class="custom-datepicker custom-datepicker-sm" hide-input-icon v-model="data.projectData.estimated_date_finish" placeholder="Chưa có dữ liệu..." auto-apply :format="'dd/MM/yyyy'" :enable-time-picker="false" :readonly="view" :disabled="view"></VueDatePicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconBook :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Trạng thái dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <select class="form-select form-select-sm px-2" name="" id="" v-model="data.projectData.project_status" :readonly="view" :disabled="view">
                                <option value="">---CHỌN TRẠNG THÁI DỰ ÁN--</option>
                                <option :value="item.id" v-for="(item, index) in status" :key="index">{{item.value}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconRefresh :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Dữ liệu đồng bộ :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <DropdownTable 
                                ref="DropdownTable" 
                                @handleDropdownTable="handleDropdownTable"
                                @handleSelectItem="DropdownTable_Select"
                                :data = "list_sync.data"
                                :total = "list_sync.total"
                                :label_init = "list_sync.label_init"
                                :disabledDropdownTable = "view"
                                hide_icon
                                small
                            ></DropdownTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="card h-100">
                <div class="card-body d-flex flex-column gap-2">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconMapPin :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Nhóm dự án :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <!-- <input type="text" class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.place_info"> -->

                            <select class="form-select form-select-sm px-2" name="" id="" v-model="data.projectData.project_group_code" :readonly="view" :disabled="view">
                                <option value="" selected>---CHỌN NHÓM DỰ ÁN--</option>
                                <option value="0">Dự án chính</option>
                                <option value="1">Dự án con</option>
                                <option value="2">Dự án nâng cấp - cải tạo</option>
                            </select>

                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconMapPin :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Địa chỉ :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.place_info">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconWorld :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Quốc gia :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <select class="form-select form-select-sm px-2" name="" id="" v-model="data.projectData.country_id" :readonly="view" :disabled="view" @change="SelectCountry">
                                <option value="">---CHỌN QUỐC GIA--</option>
                                <option :value="item.id" v-for="(item, index) in location" :key="index">{{item.country_name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconBuildingSkyscraper :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Tỉnh/Thành Phố :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <el-select class="w-100 custom-selectbox custom-selectbox-sm" v-model="data.projectData.province_id" filterable placeholder="---CHỌN TỈNH/THÀNH PHỐ---" size="large" :teleported="false" :fit-input-width="true"
                            :readonly="view" :disabled="view" @click="SelectProvices" @change="ChangeProvices"
                            >
                                <el-option
                                v-for="item in province"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconBuildingCommunity :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Quận/Huyện :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <el-select class="w-100 custom-selectbox custom-selectbox-sm" v-model="data.projectData.district_id" filterable placeholder="---CHỌN QUẬN / HUYỆN---" size="large" :teleported="false" :fit-input-width="true"
                            :readonly="view" :disabled="view" @click="SelectDistrict"
                            >
                                <el-option
                                v-for="item in districts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                />
                            </el-select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconFocus2 :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Tọa độ :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input type="text" class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.location_info">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconRulerMeasure :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Tổng diện tích :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input  class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model="data.projectData.total_area" v-number="number">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center h-100">
                                <IconBusinessplan :size="24" class="d-flex text-muted bg-dark bg-opacity-10 p-1 rounded-2" stroke-width="2" />
                                <span class="ms-2">Giá trị dự toán :</span>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <input  class="form-control form-control-sm" placeholder="Chưa có dữ liệu..." :readonly="view" :disabled="view" v-model.lazy="data.projectData.estimated_investment_value" v-number="number">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-3" v-if="data.projectData">
        <div class="col-lg-6 mb-3">
            <div class="card h-100">
                <div class="card-body">
                    <ul class="list-group list-group-one">
                        <li class="list-group-item px-0 d-flex align-items-center gap-3 p-0">
                            <div>
                                <div>
                                    <div class="text-white bg-gradient-blue p-2 rounded-3">
                                        <IconBuildingCommunity :size="32" class="d-flex" stroke-width="2" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 text-nowrap fw-bold text-uppercase mb-1">Đơn vị sở hữu</h6>
                                <div class="text-start">
                                    <!-- <select v-model="data.projectData.owner_info_id" class="outline-none w-100 border-0" :readonly="view" :disabled="view" :class="{'hide-arrow-select':view}">
                                        <option v-for="(item, index) in tenant" :key="index" :value="item.id">{{item.tenant_name}}</option>
                                    </select> -->
                                    <span>{{data.projectData.owner_info_name}}</span> 
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-lg-6 mb-3">
            <div class="card h-100">
                <div class="card-body">
                    <ul class="list-group list-group-one">
                        <li class="list-group-item px-0 d-flex align-items-center gap-3 p-0">
                            <div>
                                <div>
                                    <div class="text-white bg-gradient-green p-2 rounded-3">
                                        <IconChartTreemap :size="32" class="d-flex" stroke-width="2" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 text-nowrap fw-bold text-upperca mb-1 text-uppercase">Chủ sở hữu đất</h6>
                                <div class="text-start">
                                    <el-select class="w-100 custom-selectbox custom-selectbox-sm" v-model="data.projectData.owner_land_id" filterable placeholder="---CHỌN CHỦ SỞ HỮU ĐẤT---" size="large" :teleported="false" :fit-input-width="true"
                                    :readonly="view" :disabled="view"
                                    >
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-lg-6 mb-3">
            <div class="card h-100">
                <div class="card-body h-100">
                    <ul class="list-group list-group-one">
                        <li class="list-group-item px-0 d-flex align-items-center gap-3 p-0">
                            <div>
                                <div class="text-white bg-gradient-yellow p-2 rounded-3">
                                    <IconBriefcase :size="32" class="d-flex" stroke-width="1.5" />
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 text-nowrap fw-bold text-uppercase mb-1">Đơn vị đầu tư</h6>
                                <div class="text-start">
                                    <el-select class="w-100 custom-selectbox custom-selectbox-sm" v-model="data.projectData.investor_info_id" filterable placeholder="---CHỌN ĐƠN VỊ ĐẦU TƯ---" size="large" :teleported="false" :fit-input-width="true"
                                    :readonly="view" :disabled="view"
                                    >
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-lg-6 mb-3">
            <div class="card h-100">
                <div class="card-body">
                    <ul class="list-group list-group-one">
                        <li class="list-group-item px-0 d-flex align-items-center gap-3 p-0">
                            <div>
                                <div class="text-white bg-gradient-magenta p-2 rounded-3">
                                    <IconDimensions :size="32" class="d-flex" stroke-width="2" />
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <h6 class="mb-0 text-nowrap fw-bold text-uppercase mb-1">Đơn vị sử dụng</h6>
                                <div class="text-start">
                                    <el-select class="w-100 custom-selectbox custom-selectbox-sm" v-model="data.projectData.tenant_used_id" filterable placeholder="---CHỌN ĐƠN VỊ SỬ DỤNG---" size="large" :teleported="false" :fit-input-width="true"
                                    :readonly="view" :disabled="view"
                                    >
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="d-flex align-items-center mb-4 gap-3">
        <h5 class="m-0 fw-medium">THÔNG TIN PHÁP LÝ</h5>
        <hr class="border-1 flex-grow-1 m-0">
    </div> -->

    <div class="row">
        <div class="col-lg-12">

            <!-- <div v-if="$CheckPermission('Planning_Legal','is_show')">
                <Planning_Legal 
                    v-if="data.lstPlanningLegal" 
                    :data="data.lstPlanningLegal"
                    :slug="'PlanningLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Planning_Legal>
            </div> -->
            
            <!-- <div v-if="$CheckPermission('Invest_Legal','is_show')">
                <Invest_Legal 
                    v-if="data.lstInvestLegal" 
                    :data="data.lstInvestLegal"
                    :slug="'InvestLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Invest_Legal>
            </div> -->

            <!-- <div v-if="$CheckPermission('Land_Legal','is_show')">
                <Land_Legal 
                    v-if="data.lstLandLegal" 
                    :data="data.lstLandLegal"
                    :slug="'LandLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Land_Legal>
            </div> -->
            
            
            <!-- <Land_Origin 
                v-if="data.lstLandOrigin" 
                :data="data.lstLandOrigin"
                :slug="'LandOrigin'"
                @Display="Display_AddNewLegal"
                @ReloadData="GetProjectById"
                :view="view"
            ></Land_Origin> -->
            
            <!-- <div v-if="$CheckPermission('Construction_Legal','is_show')">
                <Construction_Legal 
                    v-if="data.lstConstructionLegal" 
                    :data="data.lstConstructionLegal"
                    :slug="'ConstructionLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Construction_Legal>
            </div> -->
            
            <!-- <div v-if="$CheckPermission('Acceptance_Legal','is_show')">
                <Acceptance_Legal 
                    v-if="data.lstAcceptanceLegal" 
                    :data="data.lstAcceptanceLegal"
                    :slug="'AcceptanceLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Acceptance_Legal>
            </div> -->

            <!-- <div v-if="$CheckPermission('Project_Contract','is_show')">
                <Project_Contract 
                    v-if="data.lstProjectContract" 
                    :data="data.lstProjectContract"
                    :slug="'ProjectContract'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Project_Contract>
            </div>
            

            <div v-if="$CheckPermission('Construction_Progress','is_show')">
                <Construction_Progress 
                    v-if="data.lstConstructionProgress" 
                    :data="data.lstConstructionProgress"
                    :slug="'ConstructionProgress'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Construction_Progress>
            </div>

            

            <div v-if="$CheckPermission('Construction_Payment','is_show')">
                <Construction_Payment
                    v-if="data.lstConstructionPayment" 
                    :data="data.lstConstructionPayment"
                    :slug="'ConstructionPayment'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Construction_Payment>
            </div> -->
            

            <!-- <div v-if="$CheckPermission('Project_Finance','is_show')">
                <Project_Finance 
                    v-if="data.lstProjectFinance" 
                    :data="data.lstProjectFinance"
                    :slug="'ProjectFinance'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Project_Finance>
            </div> -->
        </div>
    </div>

    <div class="modal-footer position-absolute bottom-0 start-0 w-100 bg-white" v-if="!view" style="z-index: 9999;">
        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
        <button type="button" class="btn btn-success" @click="UpdateProject">Cập nhật dự án</button>
    </div>

</template>
<script>
import Icons from '@Admin/common/js/Icons';

import axios from 'axios'
import dayjs from 'dayjs';

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


import Land_Legal from './Land_Legal/Main.vue';
import Planning_Legal from './Planning_Legal/Main.vue';
import Construction_Legal from './Construction_Legal/Main.vue';
import Acceptance_Legal from './Acceptance_Legal/Main.vue';
import Invest_Legal from './Invest_Legal/Main.vue';
import Construction_Progress from './Construction_Progress/Main.vue';
import Construction_Payment from './Construction_Payment/Main.vue';
import Land_Origin from './Land_Origin/Main.vue';
import Project_Finance from './Project_Finance/Main.vue';
import Project_Contract from './Project_Contract/Main.vue';
import DropdownTable from '@Admin/components/common/DropdownTable.vue';

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'
import {ShowToast} from '@Helpers/Notify.js'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { CheckPermission } from '@Helpers/utils.js';
import { ElSelect,ElOption } from 'element-plus'
export default {
    data(){
        return {
            view : false,
            tenant : [],
            customer : [],
            proposal : [],
            status : [],
            project_create_time : null,
            data : {
                status_content : '',
            },
            show : {
                add_landlegal : false
            },
            formatInput : null,
            location : null,
            province : null,
            districts : null,
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            list_sync : {
                data : [],
                total : 1,
                paginate : {
                    limit : 10,
                    page : 1,
                },
                search_value : '',
                label_init : ''
            }
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        Land_Legal,Planning_Legal,Construction_Legal,Acceptance_Legal,Invest_Legal,Construction_Progress,Land_Origin,Project_Finance,Project_Contract,Construction_Payment,ElSelect,ElOption,DropdownTable
    },

    async mounted(){
        
        const current_user = await JSON.parse(localStorage.getItem('current_user'));
        const authorize = await JSON.parse(localStorage.getItem('authorize'));
        this.current_user = current_user;
        this.authorize = authorize;

        var Modal = document.getElementById('Modal_UpdateProject')
        var vm = this
        Modal.addEventListener('show.bs.modal', async function (event) {
            var id = Modal.getAttribute('data-id');
            var type_modal = await Modal.getAttribute('data-modal');
            type_modal == "view" ? vm.view = true : vm.view = false
            vm.GetProjectById(id)
            await vm.GetTenantData()
            const ProjectStore = useProjectStore();
            ProjectStore.SetState({project_id : id})
            vm.GetStatusProject();
            vm.GetProjectById(id)
            await vm.GetTenantData()
            vm.GetCustomerData()
            vm.GetLocations()
            vm.GetDataSync()
        })
    },
    directives: { 
        number: VNumber,
    },
    methods : {

        handleDropdownTable(data){
            this.list_sync.paginate.page = data.page
            this.list_sync.search_value = data.search_value
            this.GetDataSync()
        },
        DropdownTable_Select(data){

            console.log(data)
            this.data.projectData.bravo_project_id = data.value
            this.list_sync.label_init = data.label_init
        },

        GetLocations(){
            const ProjectStore = useProjectStore();
            ProjectStore.GetLocations
            this.location = ProjectStore.GetLocations
        },
        SelectCountry(){
            this.data.projectData.province_id = ''
            this.data.projectData.district_id = ''
        },
        ChangeProvices(){
            this.data.projectData.district_id = ''
        },
        SelectProvices(){
            let data = this.location.find(item => item.id == this.data.projectData.country_id)
            this.province = data.dataProvince
            this.province = this.province.map(item => {
                return item = {
                    value : item.id,
                    label : item.province_name,
                    dataDistrict : item.dataDistrict
                }
            })
        },
        SelectDistrict(){
            let data = this.province.find(item => item.value == this.data.projectData.province_id)
            this.districts = data.dataDistrict
            this.districts = this.districts.map(item => {
                return item = {
                    value : item.id,
                    label : item.district_name,
                }
            })
        },
        GetDataSync(){
            const params = {
                limit : this.list_sync.paginate.limit,
                page : this.list_sync.paginate.page,
                search_list: [
                    {
                        name_field: "search_field",
                        value_search: this.list_sync.search_value
                    }
                ]
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/construction-project/get-all',params,config)
            .then(res => {
                this.list_sync.data = res.data.data.items
                this.list_sync.total = res.data.data.total
                this.list_sync.data = this.list_sync.data.map(item => {
                    let arr = {
                        value : item.id,
                        label : item.code + '|' + item.name
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        GetStatusProject(){
            try {
                const params = this.data.projectData
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/get-status-json/get-status-legal-project',params,config)
                .then(async res => {
                    const ProjectStore = useProjectStore();
                    ProjectStore.SetStatus(res.data)
                    this.status = res.data
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },
        async UpdateProject(){
            try {
                let params = this.data.projectData
                params.total_area = await parseFloat(String(params.total_area).replace(/ꓸ/g,'').replace(',','.'))
                params.estimated_investment_value = await parseFloat(String(params.estimated_investment_value).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/update',params,config)
                .then(async res => {
                    this.$emit('RefreshData');
                    ShowToast({status_code : 200, message : 'Cập nhật dự án thành công'});
                })
                .catch(err => {
                    let res = err.response.data.error_code
                    switch (res) {
                        case 162:   ShowToast({status_code : 401, message : 'Tên dự án đã tồn tại'});
                        case 32 :   ShowToast({status_code : 401, message : 'Không tìm thấy dự án'});
                        break;
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
        GetProjectById(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var id = Modal.getAttribute('data-id');
            try {
                const params = {
                    item        : id,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/get-by-id',params,config)
                .then(async res => {
                    this.data = await res.data.data
                    if(this.data.projectData.bravo_project_code){
                        this.list_sync.label_init = await this.data.projectData.bravo_project_code + '|' + this.data.projectData.bravo_project_name
                    }else{
                        this.list_sync.label_init = ""
                    }
                    await this.SelectProvices()
                    await this.SelectDistrict()
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
                axios.post(PATH_API_USER + '/tenant/get-all',params,config)
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
                    //tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
                .then(async res => {
                    this.customer = res.data.data.items
                    this.customer = this.customer.map(item => {
                        let arr = {
                            value : item.id,
                            label : item.customer_code + '|' + item.customer_name
                        }
                        return arr
                    })
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        formatInput(event) {
            let a = event.target.value.replace(/[^\d,]/g, '');
        },
        CheckPermission
    }
}
</script>
<style lang="scss">
    .hide-arrow-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>