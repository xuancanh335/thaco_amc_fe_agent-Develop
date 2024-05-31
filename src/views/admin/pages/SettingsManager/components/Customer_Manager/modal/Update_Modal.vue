<template lang="">
    <div class="modal fade" id="Modal_UpdateCustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <p class="text-muted mb-0">Cập nhật này sẽ thay đổi thông tin khách hàng hiện tại</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Mã khách hàng</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconKey :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.customer_code" placeholder="Nhập mã khách hàng ...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Tên khách hàng</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconUser :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.customer_name" placeholder="Nhập tên khách hàng...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Tên quản trị</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconUser :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.customer_admin" placeholder="Nhập tên quản trị...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Địa chỉ</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconMapPin :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.customer_address" placeholder="Nhập địa chỉ...">
                        </div>
                    </div>

                    <div class="mb-3" v-if="$CheckGroupUser()">
                        <label for="" class="text-muted mb-2">Dữ liệu đồng bộ</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconRefresh :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <select class="form-select shadow-none" name="" id="" v-model="data.bravo_customer_id">
                                <option value="" selected>-- CHỌN DỮ LIỆU --</option>
                                <option :value="item.id" v-for="(item, index) in list_sync" :key="index">{{item.name}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-info bg-gradient text-white" @click="Update_Data">Cập nhật khách hàng</button>
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
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
var modal
export default {
    data(){
        return {
            type : null,
            data : {
                status_content : '',
            },
            list_sync : [],
        }
    },
    props : {
        item : String
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_UpdateCustomer');
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetDataSync()
            modal.show()
        },
        async UpdateStatus(item,status){
            this.data = await item
            this.data.is_active = await status
            await this.Update_Data()
        },
        async Update_Data(){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/customer/update',params,config)
            .then(async res => {
                var Modal_UpdateCustomer = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateCustomer'));
                this.$emit('RefreshData');
                Modal_UpdateCustomer.hide();
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
            await axios.post(PATH_API_USER + '/customer/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        },
        GetDataSync(){
            const params = {
                group_id    : this.current_user.group_id,
                limit : 30,
                page : 1,
            }
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/customer-bravo/get-all',params,config)
            .then(res => {
                this.list_sync = res.data.data.items
            })
            .catch(err => {
                console.error(err); 
            })
        },
    },
    components: {
        ...Icons
    }
}
</script>
<style lang="">
    
</style>