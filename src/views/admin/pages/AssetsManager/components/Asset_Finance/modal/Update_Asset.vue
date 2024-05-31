<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:1200px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật tài chính tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật tài chính tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Mã code (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập tên tài chính ..." v-model="data.asset_finance_code">
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
                                <label class="form-label">Giá trị khấu hao (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập giá trị khấu hao ..." v-model="data.depreciation_value" v-number="number">
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
                                <label class="form-label">Ngày ký HĐ thế chấp (<span class="text-danger">*</span>)</label>
                                <VueDatePicker v-model="data.mortgage_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Giá trị HĐ thế chấp (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập giá trị HĐ thế chấp ..." v-model="data.mortgage_value" v-number="number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Số lượng tài sản thế chấp (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập số lượng ..." v-model="data.asset_mortgage_quantity" v-number="number">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Số HĐ tín dụng (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập số HĐ tín dụng ..." v-model="data.number_credit">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Đối tượng thế chấp (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập đối tượng ..." v-model="data.mortgage_object">
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="form-label">Thông tin ngân hàng (<span class="text-danger">*</span>)</label>
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
                                <label class="form-label mb-0">Diễn giải (<span class="text-danger">*</span>)</label>
                                <input type="text" class="form-control" placeholder="Nhập Diễn giải ..." v-model="data.description">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <FileManager ref="FileManager"></FileManager>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Cập nhật hạng mục</button>
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
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
const PATH_API_STORE = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
import FileManager from '@Admin/components/common/FileManager.vue';
export default {
    components: {
        VueDatePicker,
        ...Icons,FileManager
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                bank_id : "",
                status_content : '',
            },
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
        }
    },
    directives: {number: VNumber,},
    props : {
        assetId : String
    },
    methods : {
        async UpdateLegal(){            
            try {
                const params = this.data
                params.tenant_id = authorize.tenant_id
                params.asset_id = this.assetId
                params.accounting_value = this.FormatNumberic(params.accounting_value)
                params.depreciation_value = this.FormatNumberic(params.depreciation_value)
                params.valuation_value = this.FormatNumberic(params.valuation_value)
                params.mortgage_value = this.FormatNumberic(params.mortgage_value)
                params.asset_mortgage_quantity = this.FormatNumberic(params.asset_mortgage_quantity)
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset-finance/update',params,config)
                .then(async res => {
                    this.Display(false)
                    ShowToast({status_code : 200, message : 'Cập nhật thành công'});
                    this.$emit('ReloadData');
                })
                .catch(err => {
                    ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },
        GetBankData(){
            const data = {
                "page": 0,
                "limit": 0,
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
        async GetDataAsset(){            
            try {
                const params = {
                    item        : await this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset-finance/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
                })
                .catch(err => { })
            } catch (err) {
                console.log(err)
            }
        },
        async Display(value,data){
            this.modal.show = value
            if(value){
                this.id = await data
                this.$refs.FileManager._Init({id:data,type:'TYPE_ASSET_FINANCE'});
                this.GetBankData()
                await this.GetDataAsset()
            }
        },
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>