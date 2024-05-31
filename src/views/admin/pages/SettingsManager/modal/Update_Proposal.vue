<template lang="">
    <div class="modal fade" id="Modal_UpdateProposal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-5 pb-0">
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
                            <p class="text-muted mb-0">Cập nhật này sẽ thay đổi thông tin người dùng hiện tại</p>
                        </div>
                    </div>
                    <div class="input-group border-bottom mb-4">
                        <span class="input-group-text border-0 bg-transparent text-muted" id="basic-addon1">
                            <IconMail :size="22" stroke-width="1" class="d-flex" />
                        </span>
                        <input type="text" class="form-control border-0 shadow-none" v-model="data.proposal_name" placeholder="Nhập tên Chủ trương ...">
                    </div>
                     
                    <div class="input-group border-bottom mb-4">
                        <span class="input-group-text border-0 bg-transparent text-muted" id="basic-addon1">
                            <IconPhone :size="22" stroke-width="1" class="d-flex" />
                        </span>
                        <input type="text" class="form-control border-0 shadow-none" v-model="data.proposal_info" placeholder="Nhập thông tin tờ trình chủ trương ...">
                    </div>

                    <div class="input-group border-bottom mb-4">
                        <span class="input-group-text border-0 bg-transparent text-muted" id="basic-addon1">
                            <IconQuote :size="22" stroke-width="1" class="d-flex" />
                        </span>
                        <input type="text" class="form-control border-0 shadow-none" v-model="data.description" placeholder="Nhập ghi chú...">
                    </div>
                </div>
                <div class="modal-footer border-0 p-4">
                    <a href="#" class="btn btn-link link-secondary" data-bs-dismiss="modal">
                    Hủy bỏ
                    </a>
                    <a href="#" class="btn btn-info ms-auto text-white" @click="Update_Proposal">
                        Cập nhật thông tin
                    </a>
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
const API_PATH_STORE = import.meta.env.VITE_API_PATH_STORE;
export default {
    data(){
        return {
            type : null,
            data : {
                status_content : '',},
            form : {
                avatar: null,
                create_by: null,
                create_time: null,
                description: null,
                email: null,
                fullname: null,
                is_active: true,
                modify_by: null,
                modify_time: null,
                phone: null,
                tenant_id: null,
                username: null,
            }
        }
    },
    props : {
        item : String
    },
    mounted(){
        var Modal_UpdateProposal = document.getElementById('Modal_UpdateProposal')
        var main = this
        Modal_UpdateProposal.addEventListener('shown.bs.modal', function (event) {
            main.Get_DataProposal(this.dataset.id);
        })
    },
    methods : {
        async Update_Proposal(){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
           
            await axios.post(API_PATH_STORE + '/proposal/update',params,config)
            .then(async res => {
                var Modal_UpdateProposal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateProposal'));
                this.$emit('RefreshData');
                Modal_UpdateProposal.hide();
                const toast = {status_code : res.status}
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },
        async Get_DataProposal(e){
            const params = {
                item : e,
                tenant_id : auth.tenant_id,
            }
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(API_PATH_STORE + '/proposal/get-by-id',params,config)
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