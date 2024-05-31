<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-5 rounded-3" style="width:1000px">
            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Cập nhật hợp đồng và hồ sơ</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Cập nhật hợp đồng và hồ sơ với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="modal.show = false" stroke-width="1" />
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <div class="mb-3">
                        <label class="form-label">Mã hợp đồng, hồ sơ (<span class="text-danger">*</span>)</label>
                        <textarea type="text" class="form-control" placeholder="Nhập tên hợp đồng, hồ sơ ..." v-model="data.contract_code" rows="1"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Nội dung hợp đồng, hồ sơ (<span class="text-danger">*</span>)</label>
                        <textarea type="text" class="form-control" placeholder="Nhập tên hợp đồng, hồ sơ ..." v-model="data.contract_content" rows="1"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Giá trị HĐ (<span class="text-danger">*</span>)</label>
                        <input type="text" class="form-control" placeholder="Nhập giá trị hợp đồng ..." v-model="data.contract_value" v-number="number">
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
                        <DropdownTable 
                            ref="DropdownTable" 
                            @handleDropdownTable="handleDropdownTable"
                            @handleSelectItem="DropdownTable_Select"
                            :data = "list_sync.data"
                            :total = "list_sync.total"
                            :label_init = "list_sync.label_init"
                            hide_icon
                        ></DropdownTable>
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
                    <FileManager ref="FileManager"></FileManager>
                </div>
            </div>

            
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="modal.show = false">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Cập nhật pháp lý</button>
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
import VueDatePicker from '@vuepic/vue-datepicker'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import FileManager from '@Admin/components/common/FileManager.vue';
import DropdownTable from '@Admin/components/common/DropdownTable.vue';
export default {
    components: {
        ...Icons,VueDatePicker,FileManager,DropdownTable
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                bravo_contract_id : '',
            },
            status: {},
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            list_sync : {
                data : [],
                total : 1,
                paginate : {
                    limit : 10,
                    page : 1,
                },
                search_value : '',
                label_init : ''
            }
        }
    },
    directives: { number: VNumber,},
    methods : {
        GetStatus(){
            const ProjectStore = useProjectStore();
            this.status = ProjectStore.GetStatus
        },
        handleDropdownTable(data){
            this.list_sync.paginate.page = data.page
            this.list_sync.search_value = data.search_value
            this.GetDataSync()
        },
        DropdownTable_Select(data){
            this.data.bravo_contract_id = data.value
            this.list_sync.label_init = data.label_init
        },
        async UpdateLegal(){            
            try {
                const params = this.data
                params.tenant_id = authorize.tenant_id
                params.contract_value = await parseFloat(String(params.contract_value).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/project-contract/update',params,config)
                .then(async res => {
                    this.Display(false)
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Cập nhật pháp lý thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Cập nhật thất bại'});
                })
            } catch (err) {

            }
        },
        async GetDataLegal(){            
            try {
                this.GetStatus()
                const params = {
                    item        : this.init.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(PATH_API_DATA + '/project-contract/get-by-id',params,config)
                .then(async res => {
                    this.data = res.data.data
                    if(this.data.contract_code){
                        this.list_sync.label_init = this.data.contract_code + '|' + this.data.contract_content
                    }else{
                        this.list_sync.label_init = ''
                    }
                })
                .catch(err => { })
            } catch (err) {
                console.log(err)
            }
        },


        async _Init(value){
            value ? this.init = value : false
            const current_user = JSON.parse(localStorage.getItem('current_user'));
            const authorize = JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.modal.show = true
            value ? this.init = await value : false
            if(this.init){
                await this.$refs.FileManager._Init({id:this.init.id,type:'TYPE_PROJECT_CONTRACT'});
                await this.GetDataLegal()
                await this.GetDataSync()
            }
        },


        GetDataSync(){
            const params = {
                limit : this.list_sync.paginate.limit,
                page : this.list_sync.paginate.page,
                search_list: [
                    {
                        name_field: "search_field",
                        value_search: this.list_sync.search_value
                    },
                    {
                        name_field: "productCode",
                        value_search: this.init.bravo_project_code
                    }
                ]
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            // axios.post(PATH_API_WEBHOOK + '/contract-item/get-all',params,config)
            axios.post(PATH_API_WEBHOOK + '/contract-item/get-by-product-code',params,config)
            .then(res => { 
                let data = res.data.data.items
                // data = data.filter(item => item.bizDocId == this.data.bravo_contract_id || item.is_used == 0)
                data = data.filter(item => item.docNo == this.data.bravo_contract_id || item.is_used == 0)

                this.list_sync.data = res.data.data.items
                this.list_sync.total = res.data.data.total
                this.list_sync.data = this.list_sync.data.map(item => {
                    let arr = {
                        value : item.docNo,
                        label : item.description
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        GetDataSyncById(){
            const params = {
                item : event.target.value
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/contract-item/get-by-id',params,config)
            .then(res => {
                let data = res.data.data
                this.data.contract_content  = data.docNo
                this.data.contract_value    = data.totalOriginalAmount
                this.data.description       = data.description
                this.data.start_date       = data.docDate
                this.data.estimated_date_finish       = data.docDate
            })
            .catch(err => {
                console.error(err); 
            })
        }
    }
}
</script>
<style lang="">
    
</style>