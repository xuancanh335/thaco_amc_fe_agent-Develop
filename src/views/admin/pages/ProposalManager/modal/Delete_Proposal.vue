<template lang="">
    <div class="modal fade scale-in-center" id="Modal_DeleteProposal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-4">
                    <div class="d-flex gap-3 mb-4">
                        <div>
                            <div class="bg-danger bg-opacity-10 p-3 rounded-circle">
                                <IconAlertTriangleFilled :size="40" stroke-width="1" class="d-flex text-danger" />
                            </div>
                        </div>
                        <div class="flex-grow-1">
                            <h5>Bạn muốn xóa chủ trương</h5>
                            <p class="mb-0 text-muted">Bạn sẽ mất tất cả dữ liệu khi xóa chủ trương. Hành động này không thể được hoàn tác</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                        <a class="btn border-0 bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</a>
                        <button class="btn btn-danger" @click="DeleteData">Xóa chủ trương</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'
const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;
const API_PATH_STORE = import.meta.env.VITE_API_PATH_STORE;
export default {

    data(){
        return{
            id : null
        }
    },
    components: {
        ...Icons
    },
    mounted(){
        var modal = document.getElementById('Modal_DeleteProposal')
        var main = this
        modal.addEventListener('shown.bs.modal', function (event) {main.id = this.dataset.id})
    },
    methods : {
        async DeleteData(){
            try {
                const params = {
                    item: this.id,
                    tenant_id: auth.tenant_id,
                };
                const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            
                await axios.post(API_PATH_STORE + '/proposal/delete',params,config)
                .then(async res => {
                    var Modal_DeleteProposal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_DeleteProposal'));
                    this.$emit('RefreshData');
                    Modal_DeleteProposal.hide();
                    const toast = {status_code : res.status}
                    ShowToast({status_code : 200, message : 'Xóa dữ liệu thành công'});
                })
                .catch(err => {
                    console.error(err); 
                })

                // var Modal_DeleteProposal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_DeleteProposal'));
                // const data = {
                //     item: this.dataset.id,
                //     tenant_id: auth.tenant_id,
                // };
                // axios({
                //     method:'post',
                //     url: apiPath + '/user/delete',
                //     headers: {
                //         'Authorization': 'Bearer ' + auth.token
                //     },
                //     data: data
                // }).then(res => {
                //     this.$emit('customEvent');
                //     Modal_DeleteProposal.hide();
                //     const toast = {status_code : res.status}
                //     ShowToast(toast);
                // })
            } catch (error) {
                
            }
        },
    }
}
</script>
<style lang="scss">
    .scale-in-center{-webkit-animation:scale-in-center .5s cubic-bezier(.68,-.55,.265,1.55) both;animation:scale-in-center .5s cubic-bezier(.68,-.55,.265,1.55) both}
    @-webkit-keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}
</style>