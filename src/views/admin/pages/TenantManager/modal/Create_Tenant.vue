<template lang="">
    <div class="modal fade" id="Modal_CreateTenant" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <h5>Tạo đơn vị mới</h5>
                            <p class="text-muted mb-0">Tạo đơn vị mới dựa trên dữ liệu</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Mã số thuế</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.mst" placeholder="Nhập mã số thuế...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn điều lệ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.charter_capital" placeholder="Nhập vốn điều lệ..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Tỷ lệ sở hữu</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.ownership_ratio" placeholder="Nhập tỷ lệ sở hữu..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn góp theo tỷ lệ sở hữu</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.contributed_ownership_ratio" placeholder="Vốn góp theo tỷ lệ sở hữu..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Vốn đã góp</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.contributed_capital" placeholder="Vốn đã góp..." v-number="number">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Trạng thái hoạt động</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconBuilding :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <input type="text" class="form-control shadow-none" v-model="data.active_state" placeholder="Trạng thái hoạt động...">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
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
                        <div class="col-lg-4">
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
                            <div class="row mb-3">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="divider divider-start m-0 mb-3">
                                                <span class="fw-medium">Thông tin giám đốc</span>
                                            </div>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconUser :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Tên giám đốc :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.director" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconPhone :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Số điện thoại :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.director_phone" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-body p-3">
                                            <div class="divider divider-start m-0 mb-3">
                                                <span class="fw-medium">Thông tin kế toán</span>
                                            </div>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconUser :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Kế toán trưởng :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.chief_accountant" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul class="list-group list-group-one">
                                                <li class="list-group-item px-0 d-flex align-items-center gap-3">
                                                    <IconPhone :size="26" stroke-width="1" class="d-flex bg-secondary bg-opacity-25 text-muted p-1 rounded-3" />
                                                    <div>
                                                        <h6 class="mb-0 fw-normal text-muted">Số điện thoại :</h6>
                                                    </div>
                                                    <div class="text-end ms-auto">
                                                        <input type="text" class="form-control form-control-sm shadow-none" v-model="data.chief_accountant_phone" placeholder="Tên giám đốc..." style="width:300px">
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
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
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label for="" class="text-muted mb-2">Dữ liệu đồng bộ</label>
                                    <div class="input-group">
                                    <span class="input-group-text text-muted" id="basic-addon1">
                                        <IconRefresh :size="22" stroke-width="1" class="d-flex" />
                                    </span>
                                    <el-select class="custom-selectbox flex-grow-1" v-model="data.bravo_tenant_id" filterable placeholder="--CHỌN DỮ LIỆU ĐỒNG BỘ--" size="large" :teleported="false" :fit-input-width="true">
                                        <el-option
                                        v-for="item in list_sync"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                        />
                                    </el-select>
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
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
const APP_PATH = import.meta.env.VITE_APP_PATH;
import { FormatNumberic } from '@Helpers/utils.js';
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { ElSelect,ElOption } from 'element-plus'
var modal
export default {
    mounted(){
        modal = new bootstrap.Modal('#Modal_CreateTenant');
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
                bravo_tenant_id : 0,
            },
            list_sync : [],
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
        }
    },
    directives: { number: VNumber,},
    props : {
        item : String
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            modal.show()
            await this.Get_GroupData()
            await this.GetDataSync()
        },
        Create_Data(){
            let params = this.data
            params.contributed_capital = this.FormatNumberic(params.contributed_capital)
            params.contributed_ownership_ratio = this.FormatNumberic(params.contributed_ownership_ratio)
            params.ownership_ratio = this.FormatNumberic(params.ownership_ratio)
            params.charter_capital = this.FormatNumberic(params.charter_capital)
            let config = {
                'Authorization': 'Bearer ' + this.authorize.token
            }
            axios.post(PATH_API_USER + '/tenant/create',params,config)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err); 
            })

            axios({
                method:'post',
                url: PATH_API_USER + '/tenant/create',
                headers: {
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data: this.data
            }).then(res => {
                modal.hide()
                this.$emit('RefreshData');
                ShowToast({status_code : 200, message : 'Tạo đơn vị thành công'});
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
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data: data
            }).then(res => {
                const result = res.data.data.items.filter(item => {return item.is_active == true})
                this.groups = result
            })
        },
        GetDataSync(){
            const params = {}
            let config = {headers: {Authorization: `Bearer ${this.authorize.token}`}}
            axios.post(PATH_API_WEBHOOK + '/tenant-bravo/get-all',params,config)
            .then(res => {
                this.list_sync = res.data.data.items
                this.list_sync = this.list_sync.map(item => {
                    let arr = {
                        value : item.id,
                        label : item.maDonVi + '|' + item.tenDonVi
                    }
                    return arr
                })
            })
            .catch(err => {
                console.error(err); 
            })
        },
        
        FormatNumberic,
    },
    components: {
        ...Icons,ElSelect,ElOption
    }
}
</script>
<style lang="">
    
</style>