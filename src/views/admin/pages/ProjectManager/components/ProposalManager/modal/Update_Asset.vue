<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:700px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-gradient-blue rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-gradient-blue mb-1">Cập nhật tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Mã tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập mã tài sản ..." v-model="data.asset_code">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tên tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tên tài sản ..." v-model="data.asset_name">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tài sản gốc (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tài sản gốc ..." v-model="data.asset_parent">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Loại tài sản (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập loại tài sản ..." v-model="data.asset_type">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Đơn vị sử dụng (<span class="text-danger">*</span>)</label>
                            <select class="form-select rounded-0 border-0 border-bottom shadow-none" v-model="data.tenant_used_id">
                                <option value="">--CHỌN ĐƠN VỊ SỬ DỤNG--</option>
                                <option :value="item.id" v-for="(item, index) in customer" :key="index">{{item.customer_name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng nguyên giá (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng nguyên giá ..." v-model="data.total_unit_price">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng giá khấu hao (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng giá sau khấu hao ..." v-model="data.total_depreciation_price">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tổng diện tích sử dụng (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tổng diện tích sử dụng ..." v-model="data.total_area_used">
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Ngày tạo tài sản (<span class="text-danger">*</span>)</label>
                            <VueDatePicker class="custom-datepicker" v-model="data.asset_create_time" placeholder="Chọn ngày tạo tài sản" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập Diễn giải pháp lý ..." v-model="data.description">
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateData">Cập nhật pháp lý</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';

export default {
    components: {
        VueDatePicker,
        ...Icons
    },
    data(){
        return {
            id : null,
            customer : {},
            modal : {
                show : false,
            },
            data : {
                status_content : '',}
        }
    },
    methods : {
        async UpdateData(){            
            try {
                const params = this.data
                params.tenant_id = authorize.tenant_id
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset/update',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật tài sản thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },

        async GetData(){            
            try {
                const params = {
                    item        : this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data.assetData
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async Display(value,data){
            this.modal.show = value
            this.id = await data
            await this.GetCustomerData()
            await this.GetData()
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
    }
}
</script>
<style lang="">
    
</style>