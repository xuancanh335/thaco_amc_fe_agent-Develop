<template lang="">
    <div class="modal fade scale-in-center" id="Modal_DeleteTenantSync" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <h5>Xóa cấu hình pháp lý</h5>
                            <p class="mb-0 text-muted">Bạn sẽ mất tất cả các dữ liệu liên quan đến cấu hình, bạn có chắc chắn muốn xóa !</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                        <a class="btn border-0 bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</a>
                        <button class="btn btn-danger" @click="DeleteData">Chấp nhận xóa</button>
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
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
var modal
export default {
    data(){
        return{
            id : null
        }
    },
    components: {
        ...Icons
    },
    props:{
        item : String,
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_DeleteTenantSync');
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            modal.show()
        },
        async DeleteData(){
            try {
                const params = {
                    item: this.init.id,
                };
                const config = {headers: {Authorization: `Bearer ${auth.token}`}};
                await axios.post(PATH_API_WEBHOOK + '/tenant-bravo/delete',params,config)
                .then(async res => {
                    
                    this.$emit('RefreshData');
                    modal.hide();
                    
                    ShowToast({status_code : 200, message : 'Xóa dữ liệu thành công'});
                })
                .catch(err => {
                    console.error(err); 
                })
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