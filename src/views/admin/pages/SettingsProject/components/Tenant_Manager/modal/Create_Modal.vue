<template lang="">
    <div class="modal fade" id="Modal_CreateTenant" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
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
                            <h5>Tạo đơn vị mới</h5>
                            <p class="text-muted mb-0">Tạo đơn vị mới dựa trên dữ liệu</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Mã đơn vị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenant_code" placeholder="Nhập mã đơn vị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tên đơn vị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.tenant_name" placeholder="Nhập tên đơn vị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tên quản trị</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconUser :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.admin_name" placeholder="Nhập tên quản trị...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Địa chỉ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMapPin :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.address" placeholder="Nhập địa chỉ...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Số điện thoại</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconPhone :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.phone" placeholder="Nhập số điện thoại...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Email</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconMail :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.email" placeholder="Nhập email...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Thuộc tập đoàn</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuildingCommunity :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <select class="form-select shadow-none" name="" id="" v-model="data.group_id">
                                        <option value="">-- CHỌN TẬP ĐOÀN --</option>
                                        <option :value="item.id" v-for="(item, index) in groups" :key="index">{{item.group_name}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Create_Data">Tạo đơn vị mới</button>
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
            type : null,
            groups : [],
            data : {
                status_content : '',
                group_id : "",
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
                url: PATH_API_USER + '/tenant/create',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: this.data
            }).then(res => {
                var Modal_CreateTenant = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_CreateTenant'));
                this.$emit('RefreshData');
                Modal_CreateTenant.hide();
                ShowToast({status_code : 200, message : 'Tạo tập đoàn thành công'});
            })
        },
        Get_GroupData(){
            const data = {
                "page": 0,
                "limit": 0,
                "flag": true
            }
            axios({
                method:'post',
                url: PATH_API_USER + '/group/get-all',
                headers: {
                    'Authorization': 'Bearer ' + auth.token
                },
                data: data
            }).then(res => {
                const result = res.data.data.items.filter(item => {return item.is_active == true})
                this.groups = result
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