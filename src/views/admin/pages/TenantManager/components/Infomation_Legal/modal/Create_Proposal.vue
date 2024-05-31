<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:1000px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo thông tin doanh nghiệp</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo thông tin doanh nghiệp với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div class="row">
                <div class="col-lg-6"> 
                    <div class="mb-3">
                        <label class="form-label">Thông tin (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập thông tin ..." v-model="data.content_value">
                    </div>

                    <div class="mb-3">
                        <label class="form-label mb-0">Ngày khởi tạo (<span class="text-danger">*</span>)</label>
                        <VueDatePicker v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Trạng thái (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập trạng thái ..." v-model="data.status_content">
                    </div>
                
                    <div class="mb-3">
                        <label class="form-label">Diễn giải</label>
                        <input type="text" class="form-control" placeholder="Nhập ghi chú ..." v-model="data.description">
                    </div>
                </div>
                <div class="col-lg-6">
                    <FileManager ref="FileManager" :multiple="true" type_upload="create"></FileManager>
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="CreateLegal">Tạo dữ liệu</button>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import VueDatePicker from '@vuepic/vue-datepicker';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import FileManager from '@Admin/components/common/FileManager.vue';
import {ShowToast} from '@Helpers/Notify.js'
export default {
    components: {
        ...Icons,VueDatePicker,FileManager
    },
    data(){
        return {
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : '',
            }
        }
    },
    methods : {
        async CreateLegal(){            
            try {
                const params = this.data
                params.tenant_id = this.tenant_id
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiUser + '/tenant-detail/create',params,config)
                .then(async res => {
                    await this.$refs.FileManager.UpdateLegal({id:res.data.data.id,type:'TYPE_TENANT_DETAIL'})
                    await this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Tạo dữ liệu thành công'});
                    this.Display(false)
                })
                .catch(err => {
                    ShowToast({status_code : 200, message : 'Tạo dữ liệu thất bại'});
                })
            } catch (err) {
                console.log(err)
            }
        },
        Display(value,data){
            this.modal.show = value
            this.tenant_id = data.id
        }
    }
}
</script>
<style lang="">
    
</style>