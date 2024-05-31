<template lang="">
    <div class="modal fade scale-in-center" id="Modal_DeleteLocal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <h5>Xóa {{CheckRegionType}}</h5>
                            <p class="mb-0 text-muted">Bạn sẽ mất tất cả các dữ liệu liên quan đến {{CheckRegionType}}, bạn có chắc chắn muốn xóa !</p>
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
export default {
    data(){
        return{
            id : null,
            init : {}
        }
    },
    components: {
        ...Icons
    },
    props:{
        item : String,
    },
    mounted(){
        // var modal = document.getElementById('Modal_DeleteTenant')
        // var main = this
        // modal.addEventListener('shown.bs.modal', function (event) {
        //     main.id = this.dataset.id
        // })
    },
    methods : {
        _Init(e){
            this.init = e
            var modal = new bootstrap.Modal('#Modal_DeleteLocal');
            modal.show();
        },

        async DeleteData(){
            try {
                const params = {
                    item: this.init.item,
                };
                const config = {headers: {Authorization: `Bearer ${auth.token}`}};
                await axios.post(PATH_API_USER + '/region/delete',params,config)
                .then(async res => {
                    var Modal_DeleteTenant = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_DeleteLocal'));
                    this.$emit('RefreshData',{region_type : this.init.region_type, delete_item : this.init.item});
                    Modal_DeleteTenant.hide();
                    const toast = {status_code : res.status}
                    ShowToast({status_code : 200, message : 'Xóa dữ liệu thành công'});
                })
                .catch(err => {
                    switch (err.response.data.error_code) {
                        case 167: ShowToast({status_code : 401, message : 'Dữ liệu con còn tồn tại'}); break;
                        default: ShowToast({status_code : 401, message : 'Xóa dữ liệu thất bại'}); break;
                    }
                })
            } catch (error) {
                
            }
        },
    },
    computed : {
        CheckRegionType(){
            if(this.init.region_type == 1){
                return "tỉnh / thành phố"
            }
            else if(this.init.region_type == 2){
                return "quận / huyện"
            }else{
                return "quốc gia"
            }
        },
    },
    
}
</script>
<style lang="scss">
    .scale-in-center{-webkit-animation:scale-in-center .5s cubic-bezier(.68,-.55,.265,1.55) both;animation:scale-in-center .5s cubic-bezier(.68,-.55,.265,1.55) both}
    @-webkit-keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}@keyframes scale-in-center{0%{-webkit-transform:scale(0);transform:scale(0);opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);opacity:1}}
</style>