<template lang="">
    <div class="modal fade" id="Modal_CreateGroup" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-body p-5">
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
                            <h5>Tạo tập đoàn mới</h5>
                            <p class="text-muted mb-0">Tạo tập đoàn mới dựa trên dữ liệu</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Mã tập đoàn</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconBuildingCommunity :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.group_code" placeholder="Nhập mã tập đoàn...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Tên tập đoàn</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconBuilding  :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.group_name" placeholder="Nhập tên tập đoàn...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Vị trí hiển thị</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconSortAscending2 :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="number" class="form-control shadow-none" v-model="data.group_stt" placeholder="Nhập vị trí hiển thị...">
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Create_Data">Tạo tập đoàn mới</button>
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
    data(){
        return {
            type : null,
            data : {
                status_content : '',
                is_active   : true,
                tenant_id   : auth.tenant_id,
            }
        }
    },
    props : {
        item : String
    },
    methods : {
        Create_Data(){
            axios({
                method:'post',
                url: PATH_API_USER + '/group/create',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: this.data
            }).then(res => {
                var Modal_CreateGroup = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateGroup'));
                this.$emit('RefreshData');
                Modal_CreateGroup.hide();
                ShowToast({status_code : 200, message : 'Tạo tập đoàn thành công'});
            })
        }
    },
    components: {
        ...Icons,
    }
}
</script>
<style lang="">
    
</style>