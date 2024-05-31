<template lang="">

    <div class="modal fade scale-in-center" id="Modal_DeleteAsset" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <h5>Xóa dữ liệu</h5>
                            <p class="mb-0 text-muted">Bạn chắc chắn muốn xóa dữ liệu. Hành động này không thể được hoàn tác</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end gap-2">
                        <a class="btn border-0 bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</a>
                        <button class="btn btn-danger" @click="DeleteAsset">Xóa dữ liệu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-4 rounded-3" style="width:500px">
            <div class="d-flex">
                <div class="d-flex gap-3">
                    <div>
                        <div class="bg-danger bg-opacity-10 p-3 rounded-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" size="40" class="d-flex text-danger"><path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <h5>Xóa tài sản</h5>
                        <p class="mb-0 text-muted">
                            Bạn sẽ mất tất cả dữ liệu khi xóa dữ liệu của mình. Hành động này không thể được hoàn tác
                        </p>
                    </div>
                </div>
                <div>
                    <IconX :size="24" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-danger bg-gradient" @click="DeleteLegal">Chấp nhận xóa</button>
            </div>
        </div>
    </div> -->
    
</template>
<script>

import Icons from '@Admin/common/js/Icons.js'
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';
var modal
export default {
    components: {
        VueDatePicker,...Icons
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : authorize.tenant_id
            }
        }
    },
    mounted(){
        modal = new bootstrap.Modal('#Modal_DeleteAsset');
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.app_path = import.meta.env.VITE_APP_PATH
            modal.show();
        },
        async DeleteAsset(){            
            try {
                const params = {
                    item        : this.init.id,
                    tenant_id   : this.authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(apiProject + '/asset/delete',params,config)
                .then(async res => {
                    modal.hide()
                    this.$emit('ReloadData');
                    ShowToast({status_code : 200, message : 'Xóa tài sản thành công'});
                })
                .catch(err => {
                   
                })
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>
<style lang="">
    
</style>