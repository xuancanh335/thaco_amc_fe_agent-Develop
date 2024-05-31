<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:500px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật hiện trạng tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật hiện trạng tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="mb-3">
                    <label class="form-label">Tên hiện trạng tài sản (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tên hiện trạng tài sản ..." v-model="data.asset_status_content">
                </div>
                <div class="mb-3">
                    <label class="form-label">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                    <VueDatePicker class="custom-datepicker" v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                </div>
<div class="mb-3">
                    <label class="form-label">Diễn giải (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập Diễn giải ..." v-model="data.description">
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

export default {
    components: {
        VueDatePicker,
        ...Icons
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',}
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
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset-status/update',params,config)
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
                axios.post(apiProject + '/asset-status/get-by-id',params,config)
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
            await this.GetDataAsset()
        }
    }
}
</script>
<style lang="">
    
</style>