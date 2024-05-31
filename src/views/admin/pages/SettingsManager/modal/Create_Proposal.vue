<template lang="">
    <div class="modal fade" id="Modal_CreateProposal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-5 pb-0">
                    <div class="mb-5">
                        <div class="d-flex align-items-top mb-3">
                            <div class="bg-success bg-opacity-25 rounded-circle p-2 text-success">
                                <IconPlus :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                        <div>
                            <h5>Tạo chủ trương đầu tư</h5>
                            <p class="text-muted mb-0">Tạo chủ trương đầu tư mới dựa trên dữ liệu</p>
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
                    <a href="#" class="btn btn-success ms-auto" @click="CreateProposal">
                        Tạo chủ trương mới
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
const path_apiStore = import.meta.env.VITE_API_PATH_STORE;
const AppPath = import.meta.env.VITE_APP_PATH;
export default {
    data(){
        return {
            type : null,
            data : {
                status_content : '',
                proposal_name           : null,
                proposal_info           : null,
                description             : null,
                tenant_id               : auth.tenant_id,
            }
        }
    },
    props : {
        item : String
    },
    methods : {
        CreateProposal(){
            axios({
                method:'post',
                url: path_apiStore + '/proposal/create',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: this.data
            }).then(res => {
                var Modal_CreateProposal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateProposal'));
                this.$emit('RefreshData');
                Modal_CreateProposal.hide();
                ShowToast({status_code : 200, message : 'Tạo chủ trương thành công'});
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