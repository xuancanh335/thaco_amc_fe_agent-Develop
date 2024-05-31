<template lang="">
    <div class="modal fade" id="Modal_UpdateBank" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-5">
                        <div class="d-flex align-items-top mb-3">
                            <div class="bg-info bg-opacity-25 rounded-circle p-2 text-info">
                                <IconPencil :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                        <div>
                            <h5>Cập nhật thông tin</h5>
                            <p class="text-muted mb-0">Cập nhật này sẽ thay đổi thông tin ngân hàng hiện tại</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Mã ngân hàng</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconKey :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.bank_code" placeholder="Nhập mã ngân hàng ...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Tên ngân hàng</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconBuildingBank :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.bank_name" placeholder="Nhập tên ngân hàng ...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Diễn giải ngân hàng</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconQuote :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập Diễn giải ngân hàng ...">
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-info bg-gradient text-white" @click="Update_Data">Cập nhật ngân hàng</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
import {ShowToast} from '@Helpers/Notify.js'
const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;
const AppPath = import.meta.env.VITE_APP_PATH;
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
export default {
    data(){
        return {
            type : null,
            data : {
                status_content : '',},
        }
    },
    props : {
        item : String
    },
    mounted(){
        var Modal_UpdateBank = document.getElementById('Modal_UpdateBank')
        var main = this
        Modal_UpdateBank.addEventListener('shown.bs.modal', function (event) {
            main.getData(this.dataset.id);
        })
    },
    methods : {
        async UpdateStatus(item,status){
            this.data = await item
            this.data.is_active = await status
            await this.Update_Data()
        },
        async Update_Data(){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/bank/update',params,config)
            .then(async res => {
                var Modal_UpdateBank = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateBank'));
                this.$emit('RefreshData');
                Modal_UpdateBank.hide();
                const toast = {status_code : res.status}
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },
        async getData(e){
            const params = {
                item : e,
                tenant_id : auth.tenant_id,
            }
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/bank/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        }
    },
    components: {
        ...Icons
    }
}
</script>
<style lang="">
    
</style>