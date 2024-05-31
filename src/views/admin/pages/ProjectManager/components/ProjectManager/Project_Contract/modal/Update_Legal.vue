<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:500px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật nguồn gốc đất</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật nguồn gốc đất với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="mb-3">
                    <label class="form-label">Nội dung hợp đồng, hồ sơ (<span class="text-danger">*</span>)</label>
                    <textarea type="text" class="form-control" placeholder="Nhập tên hợp đồng, hồ sơ ..." v-model="data.contract_content" rows="1"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Gia trị HĐ (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control" placeholder="Nhập giá trị hợp đồng ..." v-model="data.contract_value" v-number="number">
                </div>
                <div class="mb-3">
                    <label class="form-label">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                    <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
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
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Cập nhật pháp lý</button>
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
import VueDatePicker from '@vuepic/vue-datepicker'
import { directive as VNumber } from '@coders-tm/vue-number-format'
export default {
    components: {
        ...Icons,VueDatePicker
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
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
        async UpdateLegal(){            
            try {
                const params = this.data
                params.tenant_id = authorize.tenant_id
                params.contract_value = await parseFloat(String(params.contract_value).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project-contract/update',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật pháp lý thành công'});
                })
                .catch(err => {
                    // ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },
        async GetDataLegal(){            
            try {
                this.GetStatus()
                const params = {
                    item        : this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project-contract/get-by-id',params,config)
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
            this.id = await data
            await this.GetDataLegal()
        }
    }
}
</script>
<style lang="">
    
</style>