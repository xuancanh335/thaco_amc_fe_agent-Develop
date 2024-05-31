<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:500px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Tạo khấu hao tài sản</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Tạo khấu hao tài sản với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>
            <div>
                <div class="mb-3">
                    <label class="form-label">Tên khấu hao tài sản (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập tên khấu hao ..." v-model="data.asset_depreciation_content">
                </div>
                <div class="mb-3">
                    <label class="form-label">Giá trị khấu hao tài sản (<span class="text-danger">*</span>)</label>
                    <input type="text" class="form-control form-control-sm rounded-0 border-0 border-bottom shadow-none" placeholder="Nhập giá trị khấu hao ..." v-model="data.asset_depreciation_value" v-number>
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
                <button type="button" class="btn btn-success bg-gradient" @click="CreateAsset">Tạo hạng mục</button>
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
export default {
    components: {
        VueDatePicker,
        ...Icons
    },
    props : {
        assetId : String
    },
    data(){
        return {
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : authorize.tenant_id
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
    methods : {
        async CreateAsset(){            
            try {
                const params = this.data
                params.asset_id = this.assetId
                params.asset_depreciation_value = this.FormatNumberic(params.asset_depreciation_value)
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset-depreciation/create',params,config)
                .then(async res => {
                    this.Display(false)
                    ShowToast({status_code : 200, message : 'Tạo hạng mục thành công'});
                    this.$emit('ReloadData');
                })
                .catch(err => {
                   
                })
            } catch (err) {
                console.log(err)
            }
        },
        Display(value){this.modal.show = value},
        FormatNumberic
    }
}
</script>
<style lang="">
    
</style>