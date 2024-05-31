<template lang="">
    <div class="modal fade" id="Modal_CreateProject" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style="min-width:1280px"> 
            <div class="modal-content">
                <div class="modal-header p-5 pb-1 border-bottom-0">
                    <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                    <IconBrowserPlus :size="38" class="d-flex" stroke-width="2" />
                                </div>
                                <div>
                                    <h5 class="mb-0">TẠO DỰ ÁN MỚI</h5>
                                    <p class="mb-0 text-muted">Tạo và quản lý các dự án đầu tư cụ thể và hiệu quả</p>
                                </div>
                            </div>
                        </div>
                        <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer">
                            <IconX :size="28" class="d-flex text-muted" stroke-width="1" />
                        </div>
                </div>
                <div class="modal-body p-5 custom-scrollbar">
                    <!-- <div class="mb-5 d-flex">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-info bg-opacity-25 rounded-4 p-2 text-info">
                                    <IconBrowserPlus :size="38" class="d-flex" stroke-width="2" />
                                </div>
                                <div>
                                    <h5 class="mb-0">TẠO DỰ ÁN MỚI</h5>
                                    <p class="mb-0 text-muted">Tạo và quản lý các dự án đầu tư cụ thể và hiệu quả</p>
                                </div>
                            </div>
                        </div>
                        <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer">
                            <IconX :size="28" class="d-flex text-muted" stroke-width="1" />
                        </div>
                    </div> -->
                    <div class="row mb-4">
                        <div class="col-lg-12">
                            <h5 class="mb-3">THÔNG TIN DỰ ÁN</h5>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mã dự án (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconClipboardData :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập mã dự án ..." v-model="data.project_code" require>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Tên dự án (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconClipboardData :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập tên dự án ..." v-model="data.project_name" require>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Dự án gốc (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconClipboardData :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập dự án gốc ..." v-model="data.project_parent" require>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Loại dự án (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconClipboardData :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập loại dự án ..." v-model="data.project_type" require>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Ngày bắt đầu dự án (<span class="text-danger">*</span>)</label>
                                <div class="d-flex">
                                    <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                        <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <VueDatePicker class="custom-datepicker-icon" v-model="data.project_create_time" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Ngày dự kiến hoàn thành (<span class="text-danger">*</span>)</label>
                                <div class="d-flex">
                                    <span class="input-group-text text-muted rounded-0 rounded-start" id="basic-addon1">
                                        <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <VueDatePicker class="custom-datepicker-icon" v-model="data.estimated_date_finish" placeholder="Chọn ngày dự kiến hoàn thành" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false" hide-input-icon></VueDatePicker>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Thuộc dự án (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconClipboardData :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <select class="form-select form-select-sm px-2" name="" id="" v-model="data.project_group_code">
                                        <option value="" selected>---CHỌN NHÓM DỰ ÁN--</option>
                                        <option value="0">Dự án chính</option>
                                        <option value="1">Dự án con</option>
                                        <option value="2">Dự án nâng cấp - cải tạo</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6" >
                            <div class="mb-3">
                                <label class="form-label">Đồng bộ dữ liệu (<span class="text-danger">*</span>)</label>
                                <!-- <div class="input-group flex-grow-1">
                                    <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
                                        <IconClipboardData :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.bravo_project_id" filterable placeholder="Chọn đơn vị đồng bộ..." size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in list_sync"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>

                                    

                                </div> -->
                                <DropdownTable 
                                    ref="DropdownTable" 
                                    @handleDropdownTable="handleDropdownTable"
                                    @handleSelectItem="DropdownTable_Select"
                                    :data = "list_sync.data"
                                    :total = "list_sync.total"
                                    :label_init = "list_sync.label_init"
                                ></DropdownTable>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-lg-12">
                            <h5 class="mb-3">THÔNG TIN PHÁP NHÂN</h5>
                        </div>
            
                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Chọn chủ sở hữu đất (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.owner_land_id" filterable placeholder="---CHỌN CHỦ SỞ HỮU ĐẤT---" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Chủ đầu tư (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.investor_info_id" filterable placeholder="---CHỌN CHỦ ĐẦU TƯ DỰ ÁN---" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Bên sử dụng dự án (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.tenant_used_id" filterable placeholder="---CHỌN BÊN SỬ DỤNG DỰ ÁN---" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in customer"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <h5 class="mb-3">VỊ TRÍ DỰ ÁN</h5>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Địa chỉ (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconAddressBook :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập địa chỉ ..." v-model="data.place_info" require>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Chọn quốc gia (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMap :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <select class="form-select form-select-sm px-2" name="" id="" v-model="data.country_id" @change="SelectCountry">
                                        <option value='' selected>--- CHỌN QUỐC GIA ---</option>
                                        <option :value="item.id" v-for="(item, index) in location" :key="index">{{item.country_name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Chọn tỉnh (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMap :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" @click="SelectProvices" v-model="data.province_id" filterable placeholder="---CHỌN TỈNH / THÀNH PHỐ---" size="large" :teleported="false" :fit-input-width="true" :disabled="data.country_id == ''" :readonly="data.country_id == ''">
                                        <el-option
                                        v-for="item in province"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>

                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                    <label class="form-label">Chọn quận (<span class="text-danger">*</span>)</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMap :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" @click="SelectDistrict" v-model="data.district_id" filterable placeholder="---CHỌN QUẬN / HUYỆN---" size="large" :teleported="false" :fit-input-width="true" :disabled="data.province_id == ''" :readonly="data.province_id == ''">
                                        <el-option
                                        v-for="item in districts"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Tọa độ</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMapPin :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập tọa độ ..." v-model="data.location_info" require>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Tổng diện tích dự án</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconRulerMeasure :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập tổng diện tích ..." v-model="data.total_area" v-number="number">
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Tổng giá trị dự toán (<span class="text-danger">*</span>)</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconCashBanknote :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Nhập giá trị dự toán ..." v-model="data.estimated_investment_value" v-number="number">
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Diễn giải dự án</label>
                                <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconQuote :size="22" class="d-flex" stroke-width="1" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" placeholder="Diễn giải dự án ..." v-model="data.description">
                                </div>
                            </div>
                        </div>
     
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button type="button" class="btn btn-success bg-gradient" @click="CreateNewProject">Tạo dự án</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import dayjs from 'dayjs';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ShowToast} from '@Helpers/Notify.js'
import{useProjectStore} from '@Store'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { ElSelect,ElOption } from 'element-plus'
import DropdownTable from '@Admin/components/common/DropdownTable.vue';
export default {
    data(){
        return {
            tenant : [],
            customer : [],
            proposal : [],
            project_create_time : null,
            data : {
                project_group_code : "",
                status_content : '',
                bravo_project_id : '',
                project_code        : null,
                project_name        : null,
                project_parent      : null,
                project_type        : null,
                proposal_id         : '',
                owner_info_id       : authorize.tenant_id,
                investor_info_id    : '',
                tenant_used_id      : '',
                owner_land_id       : '',
                tenant_id           : authorize.tenant_id,
                place_info          : null,
                country_id        : '',
                district_id       : '',
                province_id       : '',
                location_info       : null,
                total_area          : 0,
                description         : null,
                project_create_time : null
            },
            location : null,
            country : [],
            province : [],
            districts : [],
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
        ...Icons,VueDatePicker,ElSelect,ElOption,DropdownTable
    },
    mounted(){
        var Modal = document.getElementById('Modal_CreateProject')
        var vm = this
        Modal.addEventListener('shown.bs.modal', function (event) {    
            vm.GetCustomerData()
            vm.GetLocation()
            vm._Init()
            vm.GetDataSync()
        })
    },
    directives: { number: VNumber,},
    methods : {

        _Init(){
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            const authorize = JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
        },
        SelectCountry(){
            this.data.province_id = ''
            this.data.district_id = ''
            let data = this.location.find(item => item.id == this.data.country_id)
            this.province = data.dataProvince
            this.province = this.province.map(item => {
                return item = {
                    value : item.id,
                    label : item.province_name,
                    dataDistrict : item.dataDistrict
                }
            })
        },
        SelectProvices(){
            let data = this.location.find(item => item.id == this.data.country_id)
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
            this.districts = []
            let data = this.province.find(item => item.value == this.data.province_id)
            this.districts = data.dataDistrict
            this.districts = this.districts.map(item => {
                return item = {
                    value : item.id,
                    label : item.district_name,
                }
            })
        },

        GetLocation(){
            const ProjectStore = useProjectStore();
            this.location = ProjectStore.GetLocations
        },

        handleDropdownTable(data){
            this.list_sync.paginate.page = data.page
            this.list_sync.search_value = data.search_value
            this.GetDataSync()
        },
        DropdownTable_Select(data){
            this.data.bravo_project_id = data.value
            this.list_sync.label_init = data.label_init
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

        async CreateNewProject(){
            try {
                const params = this.data
                params.total_area = await parseFloat(String(params.total_area).replace(/ꓸ/g,'').replace(',','.'))
                params.estimated_investment_value = await parseFloat(String(params.estimated_investment_value).replace(/ꓸ/g,'').replace(',','.'))
                let create_date = this.data.project_create_time;
                params.project_create_time = dayjs(create_date).format('YYYY-MM-DD HH:mm:ss')
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/project/create',params,config)
                .then(async res => {
                    var Modal_CreateProject = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateProject'));
                    this.$emit('RefreshData');
                    var id = await res.data.data.id
                    await this.$emit('OpenModalUpdate',id,'edit');
                    Modal_CreateProject.hide();
                    ShowToast({status_code : 200, message : 'Tạo dự án thành công'});
                })
                .catch(err => {
                    console.log(err)
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

        formatCurrency() {
            const options = {
                style: 'currency',
                currency: 'VND',
            };
            this.price = parseFloat(this.price.replace(/\D/g, '')).toLocaleString('vi-VN', options);
        },
    },
    
}
</script>
<style lang="scss">

</style>