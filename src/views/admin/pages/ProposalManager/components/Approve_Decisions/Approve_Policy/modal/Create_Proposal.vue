<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:550px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo quyết định phê duyệt chủ trương đầu tư</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo quyết định phê duyệt chủ trương đầu tư với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div>               
                <div class="mb-3">
                    <label class="form-label">Nội dung (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập nội dung ..." v-model="data.content">
                </div>

                <div class="mb-3">
                    <label class="form-label">Giá trị (<span class="text-danger">*</span>)</label>
                    <input type="number" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập giá trị ..." v-model="data.content_value">
                </div>
            
                <div class="mb-3">
                    <label class="form-label mb-0">Ngày khởi tạo </label>
                    <VueDatePicker class="custom-datepicker" v-model="data.start_date" placeholder="Chọn ngày bắt đầu" auto-apply :format="'dd/MM/yyyy'"  :enable-time-picker="false"></VueDatePicker>
                </div>
            
                <div class="mb-3">
                    <label class="form-label">Diễn giải</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập diễn giải ..." v-model="data.description">
                </div>
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
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
import Icons from '@Admin/common/js/Icons';
export default {
    components: {
        ...Icons,VueDatePicker
    },
    data(){
        return {
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : authorize.tenant_id
            }
        }
    },
    methods : {
        async CreateLegal(){            
            try {
                const params = this.data
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/proposal-approve-policy/create',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Tạo dữ liệu thành công'});
                })
                .catch(err => {
                   
                })
            } catch (err) {
                console.log(err)
            }
        },
        Display(value,data){
            this.modal.show = value
            const proposal_id = document.getElementById('Modal_UpdateProposal').dataset.id
            this.data.proposal_id = proposal_id
        }
    }
}
</script>
<style lang="">
    
</style>