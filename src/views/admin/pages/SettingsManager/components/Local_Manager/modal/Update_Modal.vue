<template lang="">
    <div class="modal fade" id="Modal_UpdateLocal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-4 d-flex">
                        <div class="d-flex align-items-center gap-3 ">
                            <div class="bg-info bg-opacity-25 rounded-circle p-2 text-info">
                                <IconPencil :size="36" stroke-width="1.5" class="d-flex" />
                            </div>
                            <div>
                                <h5 class="mb-0">Cập nhật {{CheckRegionType}}</h5>
                                <p class="text-muted mb-0">Cập nhật {{CheckRegionType}} trên dữ liệu</p>
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
                        <button type="button" class="btn btn-info bg-gradient text-white" @click="Update_Data">Cập nhật {{CheckRegionType}}</button>
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
            init : {},
            type : null,
            data : {
                status_content : '',
            },
        }
    },
    props : {
        item : String
    },
     mounted(){
        var modal = document.getElementById('Modal_UpdateTenant')
        var vm = this
        modal.addEventListener('show.bs.modal', async function (event) {
            // await vm.Get_GroupData()
            // vm.getData(this.dataset.id);
        })
    },
    methods : {

        _Init(e){
            this.init = e
            var modal = new bootstrap.Modal('#Modal_UpdateLocal');
            this.getData(e)
            modal.show();
        },   

        async UpdateStatus(item,status){
            this.data = await item
            this.data.is_active = await status
            await this.Update_Data()
        },

        async Update_Data(){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/region/update',params,config)
            .then(async res => {
                var Modal_UpdateTenant = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateLocal'));
                this.$emit('RefreshData',{region_type : this.init.region_type, data : res.data.data});
                Modal_UpdateTenant.hide();
                const toast = {status_code : res.status}
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },

        async Update_Order(e){
            let params = {lstListRegion : e}
            console.log(params)
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/region/update-order',params,config)
            .then(async res => {
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                ShowToast({status_code : 200, message : 'Cập nhật thất bại'});
            })
        },

        async getData(e){
            const params = {
                item : this.init.item,
            }
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/region/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data.dataMaster
            })
            .catch(err => {
                console.error(err); 
            })
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
    components: {
        ...Icons,
    }
}
</script>
<style lang="">
    
</style>