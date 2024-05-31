<template lang="">
    <div class="modal fade" id="Update_Modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
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

                    <div>
                        <div class="mb-3">
                            <label for="" class="text-muted mb-2 label-require">Tên quyền mới</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconKey :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control shadow-none" v-model="data.profile_name" placeholder="Nhập mã ngân hàng ...">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="" class="text-muted mb-2">Diễn giải</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconQuote :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập tên ngân hàng ...">
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-info bg-gradient text-white" @click="UpdateData">Cập nhật</button>
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
var modal
export default {
    data(){
        return {
            type : null,
            data : {},
        }
    },
    props : {
        item : String
    },
    mounted(){
        modal = new bootstrap.Modal('#Update_Modal');
    },

    methods : {
        async _Init(value){
            value ? this.init = value : false
            modal.show();
            await this.GetDataAuthorize()
            await this.GetDataUpdate(this.init.id)
        },

        async GetDataAuthorize(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
        },

        async UpdateStatus(data,status){
            await this.GetDataAuthorize()
            this.data = await data
            this.data.is_active = status
            await this.UpdateData()
        },

        async UpdateData(e){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            await axios.post(PATH_API_USER + '/profile/update',params,config)
            .then(async res => {
                this.$emit('RefreshData');
                modal.hide();
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
            })
        },

        async GetDataUpdate(id){
            const params = {item : id,}
            const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
            await axios.post(PATH_API_USER + '/profile/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data
            })
            .catch(err => {
                console.error(err); 
            })
        }

    },
    components: {...Icons}
}
</script>
<style lang="">
    
</style>