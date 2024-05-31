<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:700px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo tài chính dự án</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo tài chính dự án với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Tên tài chính dự án (<span class="text-danger">*</span>)</label>
                            <textarea type="text" class="form-control" placeholder="Nhập tên tài chính dự án ..." v-model="data.project_finance_content" rows='1'></textarea>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Giá trị kế toán (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập giá trị kế toán ..." v-model="data.accounting_value" v-number="number">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Giá trị thẩm định (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Nhập giá trị thẩm định ..." v-model="data.valuation_value" v-number="number">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-0">Ngày ký HĐ thế chấp (<span class="text-danger">*</span>)</label>
                            <VueDatePicker v-model="data.mortgage_date" placeholder="Chọn Ngày ký HĐ thế chấp ..." auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Gía trị HĐ thế chấp (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Chọn Ngày ký HĐ thế chấp ..." v-model="data.mortgage_value" v-number="number">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Số lượng tài sản thế chấp (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Chọn số lượng tài sản thế chấp ..." v-model="data.project_mortgage_quantity" v-number="number">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Số HĐ tín dụng (<span class="text-danger">*</span>)</label>
                            <input type="text" class="form-control" placeholder="Số HĐ tín dụng ..." v-model="data.number_credit">
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label">Đối tượng thế chấp (<span class="text-danger">*</span>)</label>
                            <select class="form-select" name="" v-model="data.mortgage_object_id" require>
                                <option value="" selected>---CHỌN ĐỐI TƯỢNG THẾ CHẤP---</option>
                                <option :value="item.id" v-for="(item, index) in customer" :key="index">{{item.customer_name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-1">Thông tin ngân hàng (<span class="text-danger">*</span>)</label>
                            <select class="form-select" name="" v-model="data.bank_id" require>
                                <option value="" selected>---CHỌN THÔNG TIN NGÂN HÀNG---</option>
                                <option :value="item.id" v-for="(item, index) in bank" :key="index">{{item.bank_code}}|{{item.bank_name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-0">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                            <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="mb-3">
                            <label class="form-label mb-1">Diễn giải</label>
                            <textarea type="text" class="form-control" placeholder="Nhập diễn giải pháp lý ..." v-model="data.description" rows="1"></textarea>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <label class="form-label mb-1">Trạng thái (<span class="text-danger">*</span>)</label>
                        <select class="form-select" name="" id="" @click="GetStatus" v-model="data.status_content">
                            <option value="" selected>--CHƯA CHỌN TRẠNG THÁI--</option>
                            <option :value="item.id" v-for="(item, index) in status" :key="index">{{item.value}}</option>
                        </select>
                    </div>
                </div>                
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="CreateLegal">Tạo pháp lý</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import { directive as VNumber } from '@coders-tm/vue-number-format'
export default {
    components: {
        ...Icons,
        VueDatePicker
    },
    data(){
        return {
            modal : {
                show : false,
            },
            customer : [],
            bank : [],
            data : {
                status_content : '',
                mortgage_object_id : '',
                bank_id : "",
                tenant_id : authorize.tenant_id
            },
            status : {},
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
        }
    },
    directives: { number: VNumber,},
    methods : {
        GetStatus(){
            const ProjectStore = useProjectStore();
            this.status = ProjectStore.GetStatus
        },
        async CreateLegal(){ 
            try {
                const ProjectStore = await useProjectStore();
                const project = await ProjectStore.GetState
                this.data.project_id = await project.project_id
                const params = this.data
                params.accounting_value = await parseFloat(String(params.accounting_value).replace(/ꓸ/g,'').replace(',','.'))
                params.valuation_value = await parseFloat(String(params.valuation_value).replace(/ꓸ/g,'').replace(',','.'))
                params.mortgage_value = await parseFloat(String(params.mortgage_value).replace(/ꓸ/g,'').replace(',','.'))
                params.project_mortgage_quantity = await parseFloat(String(params.project_mortgage_quantity).replace(/ꓸ/g,'').replace(',','.'))

                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project-finance/create',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Tạo pháp lý thành công'});
                })
                .catch(err => {
                   
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
                    // tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_USER + '/customer/get-all',params,config)
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

        GetBankData(){
            const data = {
                "page": 0,
                "limit": 0,
                // "tenant_id": authorize.tenant_id,
                "flag": true
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/bank/get-all',
                headers: {
                    'Authorization': 'Bearer ' + authorize.token
                },
                data: data
            }).then(res => {
                this.bank = res.data.data.items
            })
        },

        Display(value){
            this.modal.show = value
            if(value == true){
                this.GetCustomerData()
                this.GetBankData()
            }
        }
    }
}
</script>
<style lang="">
    
</style>