<template lang="">
    <div class="modal fade" id="Modal_UpdateDefaultLegal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-5">
                    <div class="mb-5">
                        <div class="d-flex align-items-top mb-3">
                            <div class="bg-info bg-opacity-25 rounded-circle p-2 text-info">
                                <IconPencil :size="36" stroke-width="2" class="d-flex" />
                            </div>
                            <div class="ms-auto">
                                <IconX :size="24" stroke-width="1" class="ms-auto cursor-pointer text-muted" data-bs-dismiss="modal" aria-label="Close"/>
                            </div>
                        </div>
                        <div>
                            <h5>Cập nhật thông tin</h5>
                            <p class="text-muted mb-0">Cập nhật này sẽ thay đổi thông tin tập đoàn hiện tại</p>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Nội dung pháp lý</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconScript :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.default_content" placeholder="Nhập nội dung pháp lý...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Loại pháp lý</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconScript  :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <select class="form-control" name="" id="" v-model="data.default_type" placeholder="Nhập loại pháp lý...">
                                <option value="" selected>--- Chọn loại pháp lý ---</option>
                                <option value="0">Pháp lý quy hoạch</option>
                                <option value="1">Pháp lý đầu tư</option>
                                <option value="2">Pháp lý đất</option>
                                <option value="3">Pháp lý xây dựng</option>
                                <option value="4">Pháp lý nghiệm thu & sở hữu công trình</option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Vị trí hiển thị</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconSortAscending2 :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="number" class="form-control shadow-none" v-model="data.default_stt" placeholder="Nhập vị trí hiển thị...">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="" class="text-muted mb-2">Diễn giải</label>
                            <div class="input-group">
                            <span class="input-group-text text-muted" id="basic-addon1">
                                <IconQuote  :size="22" stroke-width="1" class="d-flex" />
                            </span>
                            <input type="text" class="form-control shadow-none" v-model="data.description" placeholder="Nhập tên tập đoàn...">
                        </div>
                    </div>
                    
                    <div class="d-flex justify-content-end gap-2 mt-5">
                        <button type="button" class="btn bg-secondary bg-opacity-10" data-bs-dismiss="modal">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="Update_Data">Cập nhật cấu hình pháp lý</button>
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
            type : null,
            data : {
                status_content : '',},
        }
    },
    props : {
        item : String
    },
    mounted(){
        var Modal_UpdateDefaultLegal = document.getElementById('Modal_UpdateDefaultLegal')
        var main = this
        Modal_UpdateDefaultLegal.addEventListener('shown.bs.modal', function (event) {
            main.GetDataSync(this.dataset.id);
        })
    },
    methods : {
        async UpdateStatus(item,status){
            this.data = await item
            this.data.is_active = await status
            await this.Update_Data()
        },
        async Update_Data(){
            const params = this.data
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/default-legal/update',params,config)
            .then(async res => {
                var Modal_UpdateDefaultLegal = bootstrap.Modal.getOrCreateInstance(document.getElementById('Modal_UpdateDefaultLegal'));
                this.$emit('RefreshData');
                Modal_UpdateDefaultLegal.hide();
                
                ShowToast({status_code : 200, message : 'Cập nhật thành công'});
            })
            .catch(err => {
                console.error(err); 
            })
        },
        async GetDataSync(e){
            const params = {
                item : e,
            }
            const config = {headers: {Authorization: `Bearer ${auth.token}`}};
            await axios.post(PATH_API_USER + '/default-legal/get-by-id',params,config)
            .then(async res => {
                this.data = res.data.data
            })
            .catch(err => {
                console.error(err); 
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