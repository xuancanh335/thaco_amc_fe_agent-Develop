<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:1000px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo tiến độ thanh toán</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo tiến độ thanh toán với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted cursor-pointer" @click="modal.show = false" stroke-width="1" />
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="mb-3">
                        <label class="form-label">Tên tiến độ thanh toán (<span class="text-danger">*</span>)</label>
                        <textarea type="text" class="form-control" placeholder="Nhập tên tiến độ thanh toán ..." v-model="data.construction_payment_content" rows="1"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá trị đầu tư (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập giá trị đầu tư ..." v-model.lazy="data.investment_value" v-number="number">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                        <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ngày dự kiến hoàn thành (<span class="text-danger">*</span>)</label>
                        <VueDatePicker v-model="data.estimated_date_finish" placeholder="Chọn ngày dự kiến hoàn thành" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Dữ liệu đồng bộ (<span class="text-danger">*</span>)</label>
                        <select class="form-select" name="" id="" @click="GetStatus" v-model="data.bravo_construction_payment_id" @change="GetDataSyncById">
                            <option value="" selected>--CHỌN DỮ LIỆU--</option>
                            <option :value="item.id" v-for="(item, index) in list_sync" :key="index">{{item.docNo}}|{{item.desCription}}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                        <textarea type="text" class="form-control" placeholder="Nhập diễn giải pháp lý ..." v-model="data.description" rows="1"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Trạng thái (<span class="text-danger">*</span>)</label>
                        <select class="form-select" name="" id="" @click="GetStatus" v-model="data.status_content">
                            <option value="" selected>--CHƯA CHỌN TRẠNG THÁI--</option>
                            <option :value="item.id" v-for="(item, index) in status" :key="index">{{item.value}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-lg-6">
                    <FileManager ref="FileManager" :multiple="true" type_upload="create"></FileManager>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="modal.show = false">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="CreateLegal">Tạo pháp lý</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'

const APP_PATH = import.meta.env.VITE_APP_PATH;
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;

let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import FileManager from '@Admin/components/common/FileManager.vue';
export default {
    components: {
        ...Icons,VueDatePicker,FileManager
    },
    data(){
        return {
            init : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : authorize.tenant_id
            },
            status: {},
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
                params.investment_value = await parseFloat(String(params.investment_value).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/construction-payment/create',params,config)
                .then(async res => {
                    await this.$refs.FileManager.UpdateLegal({id:res.data.data.id,type:'TYPE_CONSTRUCTION_PAYMENT'})
                    this.modal.show = false
                    this.$emit('ReloadData');
                    setTimeout(() => {
                        ShowToast({status_code : 200, message : 'Tạo pháp lý thành công'});
                    }, 500);
                })
                .catch(err => {
                   
                })
            } catch (err) {
                console.log(err)
            }
        },
        _Init(value){
            value ? this.init = value : false
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            const authorize = JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.modal.show = true
            if(this.init){
                console.log(this.init)
                this.GetDataSync();
            }
        },

        GetDataSync(){
            this.list_sync = []
            if(this.init.bravo_project_code){
                const params = {
                    item : this.init.bravo_project_code
                }
                let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
                axios.post(PATH_API_WEBHOOK + '/investment-value/sync-list-by-product-code',params,config)
                .then(res => {
                    let data = res.data.data.items
                    this.list_sync = data.filter(item => item.is_used == 0)
                })
                .catch(err => {
                    console.error(err); 
                })
            }
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
        }

    }
}
</script>
<style lang="">
    
</style>