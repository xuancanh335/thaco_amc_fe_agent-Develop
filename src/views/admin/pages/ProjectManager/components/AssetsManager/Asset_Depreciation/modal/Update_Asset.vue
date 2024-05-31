<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:1000px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật khấu hao tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật khấu hao tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.modal.show = false" stroke-width="1" />
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="mb-3">
                        <label class="form-label">Tên khấu hao tài sản (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập tên khấu hao ..." v-model="data.asset_depreciation_content">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá trị khấu hao tài sản (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập giá trị khấu hao ..." v-model="data.asset_depreciation_value" v-number="number">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                        <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                    </div>
                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Dữ liệu đồng bộ</label>
                        <el-select class="custom-selectbox asset flex-grow-1 w-100" v-model="data.bravo_asset_depreciation_id" @change="GetDataSyncById" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                            <el-option
                            v-for="item in list_sync"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            />
                        </el-select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập Diễn giải ..." v-model="data.description">
                    </div>
                </div>
                <div class="col-lg-6">
                    <FileManager ref="FileManager"></FileManager>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="this.modal.show = false">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Cập nhật hạng mục</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
import FileManager from '@Admin/components/common/FileManager.vue';
import { ElSelect,ElOption } from 'element-plus'
export default {
    components: {
        VueDatePicker,FileManager,ElSelect,ElOption,
        ...Icons
    },
    directives: {number: VNumber,},
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
            }
        }
    },
    props : {
        assetId : String
    },
    methods : {
        async UpdateLegal(){            
            try {
                const params = this.data
                params.tenant_id = authorize.tenant_id
                params.asset_depreciation_value = this.FormatNumberic(params.asset_depreciation_value)
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset-depreciation/update',params,config)
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
        async GetDataAsset(){            
            try {
                const params = {
                    item        : await this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/asset-depreciation/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
                })
                .catch(err => { })
            } catch (err) {
                console.log(err)
            }
        },
        GetDataSync(){
            const params = {}
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/depreciation-value/get-all',params,config)
            .then(res => {
                this.list_sync = res.data.data.items
                this.list_sync = this.list_sync.map(item => {
                    let arr = {
                        value : item.productCode,
                        label : item.assetCode + '|' + item.name
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        GetDataSyncById(){
            if(event.target.value){
                const params = {
                    item : event.target.value
                }
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
                axios.post(PATH_API_WEBHOOK + '/investment-value/sync-data-by-project',params,config)
                .then(res => {
                    let data = res.data.data
                    this.data.construction_payment_content  = data.docNo
                    this.data.investment_value    = data.amount
                    this.data.description       = data.desCription
                    this.data.start_date       = data.docDate
                    this.data.estimated_date_finish       = data.docDate
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },

        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.modal.show = true
            this.id = await value.id
            this.$refs.FileManager._Init({id:value.id,type:'TYPE_ASSET_DEPRECIATION'});
            await this.GetDataAsset()
            await this.GetDataSync()
        },
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>