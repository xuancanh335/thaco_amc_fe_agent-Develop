<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-4 rounded-3" style="width:600px; max-height:650px; overflow:hidden">

            <div class="d-flex mb-4">
                <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="bg-primary rounded-3 p-2 text-white">
                        <IconDatabaseEdit :size="22" class="d-flex" stroke-width="2" />
                    </div>
                    <div>
                        <h6 class="mb-0 fw-bold text-primary mb-1">Danh sách tập tin pháp lý</h6>
                        <p class="mb-0 text-muted" style="font-size:12px">Danh sách tập tin pháp lý đất với dữ liệu đi kèm</p>
                    </div>
                </div>
                <IconX :size="22" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
            </div>

            <ul class="nav nav-pills" id="myTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Danh sách tập tin</button>
                </li>
                <li class="nav-item" role="presentation" v-if="!view">
                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Tải tập tin lên</button>
                </li>
            </ul>

            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active overflow-auto custom-scrollbar mt-3" id="home" role="tabpanel" aria-labelledby="home-tab" style="max-height: 510px;">
                    <table class="table table-xl table-borderless mb-0 z-custom-table align-middle">
                        <tbody>
                            <tr class="bg-secondary bg-opacity-5" v-for="(item, index) in data" :key="index">
                                <td style="width:10%" class="text-center">{{index + 1}}</td>
                                <td style="width:50%">{{item.file_name}}</td>
                                <td style="width:20%" class="text-center">{{item.size}}</td>
                                <td style="width:20%">
                                    <div class="d-flex gap-1 justify-content-center">
                                        <button @click="DownloadFile(item.file_name,item.id)" type="button" class="btn btn-success bg-gradient btn-sm p-1">
                                            <IconDownload :size="20" class="d-flex text-white" stroke-width="2" />
                                        </button>

                                        <button v-if="!view" @click="RemoveFile(item.id)" type="button" class="btn btn-danger bg-gradient btn-sm p-1">
                                            <IconX :size="20" class="d-flex text-white" stroke-width="2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade mt-3" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <div class='text-center mb-3'>
                        <label class="label-require fw-bold text-primary" style="font-size:12px">File đính kèm hỗ trợ các định dạng tập tin được tải lên với kích thước tối đa là 300Mb</label>
                        <label style="font-size:12px">( .pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg )</label>
                    </div>
                    <file-pond
                        :accepted-file-types="filepond.acceptedFileTypes"
                        name="test"
                        ref="pond"
                        class-name="uploadfile-pond"
                        label-idle="Chọn hoặc thả file vào đây..."
                        allow-multiple="true"
                        max-file-size= "300MB"
                        :files="myFiles"
                        label-file-type-not-allowed="File không đúng định dạng"
                        max-files="5"
                        @updatefiles = "FileUpload"
                        @addfilestart="addFileStart"
                    />
                    <div class="d-flex justify-content-end gap-2 mt-4">
                        <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                        <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Tải lên</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import vueFilePond from 'vue-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker'

const FilePond = vueFilePond();


export default {
    components: {
        ...Icons,FilePond
    },
    data(){
        return {
            filepond : {
                acceptedFileTypes: [
                    'image/jpeg',
                    'image/png',
                    'application/pdf',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/msword',
                    'application/vnd.ms-excel',
                ],
            },
            id : null,
            modal : {
                show : false,
            },
            data : [],
            myfile : [],
            myFiles: [],
            files : [],
        }
    },
    props : {
        view : Boolean,
    },
    methods : {
        addFileStart(fileItem) {
            if (!this.isFileTypeValid(fileItem.fileType)) {
                fileItem.abortLoad();
                ShowToast({ status_code: 401, message: 'File không hợp lệ' });
            } else if (!this.isFileSizeValid(fileItem.fileSize)) {
                fileItem.abortLoad();
                ShowToast({ status_code: 401, message: 'Kích thước tệp quá lớn (tối đa 300MB)' });
            } 
        },
        isFileTypeValid(fileType) {
            return this.filepond.acceptedFileTypes.includes(fileType);
        },
        isFileSizeValid(fileSize) {
            return fileSize <= 300000000;
        },
        FileUpload(){
            let a = this.$refs.pond.getFiles();
            var b = a.map(item => {return item.file})
            this.files = b
        },


        async UpdateLegal(){           
            let data = new FormData();
            data.append('object_id', this.id);
            data.append('object_type', 'TYPE_CONSTRUCTION_PROGRESS');
            for (let i = 0; i < this.files.length; i++) {
                data.append('file', this.files[i]);
            }
            let config = {
                method: 'post',
                url: apiProject + '/file-manager/create',
                headers: { 
                    maxBodyLength: Infinity,
                    'accept': '*/*', 
                    'Authorization': 'Bearer ' + authorize.token, 
                },
                data : data
            };

            axios.request(config)
            .then((res) => {
                this.GetDataFile()
                ShowToast({status_code : 200, message : 'Tải file lên thành công'});
                this.myFiles = []
            })
            .catch((error) => {
                ShowToast({status_code : 200, message : 'Tải file lên thất bại'});
            });


        },

        async RemoveFile(id){            
            try {
                const params = {
                    item        : id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/file-manager/delete',params,config)
                .then(async res => {
                    this.GetDataFile()
                    ShowToast({status_code : 200, message : 'Xóa file thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 200, message : 'Xóa file thất bại'});
                })
            } catch (err) {
                console.log(err)
            }
        },

        async GetDataFile(){            
            try {
                const params = {
                    request: {
                        object_id   : this.id,
                        object_type : "TYPE_CONSTRUCTION_PROGRESS"
                    },
                    page        : 0,
                    limit       : 0,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/file-manager/get-all',params,config)
                .then(async res => {
                    this.data = res.data.data.items
                })
                .catch(err => { })
            } catch (err) {
                console.log(err)
            }
        },

        async Display(value,data){
            this.modal.show = value
            this.id = await data
            await this.GetDataFile()
        },
        
        async DownloadFile(file_name,file_id) {
            try {
                const params = {
                    item   : file_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`},responseType: 'arraybuffer'};
                axios.post(apiProject + '/file-manager/download-file',params,config)
                .then(async res => {
                    const blob = new Blob([res.data], { type: 'application/octet-stream' });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = file_name;
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(url);
                    ShowToast({status_code : 200, message : 'Tải file thành công'});
                })
                .catch(err => {
                    ShowToast({status_code : 401, message : 'Tải file thất bại'});
                })
            } catch (err) {
                console.log(err)
            }
        },

    }
}
</script>
<style lang="scss">
    .uploadfile-pond{
        .filepond--credits{display: none;}
    }
</style>