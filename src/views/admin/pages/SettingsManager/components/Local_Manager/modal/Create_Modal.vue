<template lang="">
    <div class="modal fade" id="Modal_CreateLocal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-4 d-flex">
                        <div class="d-flex align-items-center gap-3 ">
                            <div class="bg-success bg-opacity-25 rounded-circle p-2 text-success">
                                <IconPlus :size="36" stroke-width="1.5" class="d-flex" />
                            </div>

                            <div>
                                <h5 class="mb-0">Tạo {{CheckRegionType}} mới</h5>
                                <p class="text-muted mb-0">Tạo {{CheckRegionType}} mới dựa trên dữ liệu</p>
                            </div>
                        </div>
                        <div class="ms-auto">
                            <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                        </div> 
                    </div>

                    <div>
                        <div class="mb-3">
                            <label for="" class="text-muted mb-2">Mã {{CheckRegionType}}</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconMap2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control shadow-none" v-model="data.region_code" :placeholder="'Nhập mã ' + CheckRegionType + '...'">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="" class="text-muted mb-2">Tên {{CheckRegionType}}</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconMap2 :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control shadow-none" v-model="data.region_name" :placeholder="'Nhập tên ' + CheckRegionType + '...'">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="" class="text-muted mb-2">Diễn giải</label>
                                <div class="input-group">
                                <span class="input-group-text text-muted" id="basic-addon1">
                                    <IconQuote :size="22" stroke-width="1" class="d-flex" />
                                </span>
                                <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập diễn giải...">
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Create_Data">Tạo {{CheckRegionType}} mới</button>
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
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const APP_PATH = import.meta.env.VITE_APP_PATH;
export default {
    mounted(){
        var modal = document.getElementById('Modal_CreateTenant')
        var vm = this
        modal.addEventListener('show.bs.modal', function (event) {
            vm.Get_GroupData()
        })
        modal.addEventListener('hidden.bs.modal', function (event) {
            vm.data = {
                group_id : "",
                is_active   : true,
                tenant_id   : auth.tenant_id,
            }
        })
    },

    data(){
        return {
            init : {},
            type : null,
            groups : [],
            data : {
                region_code     : "",
                region_name     : "",
                id_parent       : null,
                region_stt      : 0,
                description     : "",
            }
        }
    },
    props : {
        item : String
    },
    methods : {
        _Init(e){
            this.init = e
            var modal = new bootstrap.Modal('#Modal_CreateLocal');
            modal.show();
        },
        Create_Data(){
            try {
                const params = this.data
                params.region_type = this.init.region_type
                params.id_parent = this.init.id_parent
                var Modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateLocal'));
                const config = {headers: {Authorization: `Bearer ${auth.token}`}};
                axios.post(PATH_API_USER + '/region/create',params,config)
                .then(async res => {
                    this.$emit('RefreshData',{region_type : this.init.region_type, data : res.data.data});
                    Modal.hide();
                    ShowToast({status_code : 200, message : 'Cập nhật thành công'});
                    this.data = {}
                })
                .catch(err => {})
            }
            catch (err) {
                console.log(err)
            }
        },
    },
    computed : {
        CheckRegionType(){
            if(this.init.region_type == 0){
                return "quốc gia"
            }
            if(this.init.region_type == 1){
                return "tỉnh / thành phố"
            }
            if(this.init.region_type == 2){
                return "quận / huyện"
            }
        },
    },
    components: {...Icons}
}
</script>
<style lang="">
    
</style>