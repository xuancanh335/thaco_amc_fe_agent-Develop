<template lang="">

    <div class="card h-100">
        <div class="card-body bg-light p-2">
            <div class="bg-white rounded-3">
                <!-- <div class='text-left mb-3'>
                    <label class="label-require fw-bold text-primary" style="font-size:12px">File đính kèm hỗ trợ các định dạng tập tin được tải lên với kích thước tối đa là 300Mb</label>
                    <label style="font-size:12px">( .pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg )</label>
                </div> -->
                <file-pond
                    :accepted-file-types="filepond.acceptedFileTypes"
                    name="test"
                    ref="pond"
                    :allow-multiple="multiple"
                    class-name="uploadfile-pond"
                    label-idle="
                    <div style='font-size:13px; font-weight:light; color:#00529c'>File đính kèm hỗ trợ các định dạng tập tin được tải lên với kích thước tối đa là 300Mb</div>
                    <div style='font-size:13px'>( .pdf, .doc, .docx, .xls, .xlsx, .jpg, .jpeg )</div>"
                    max-file-size= "300MB"
                    :files="myFiles"
                    label-file-type-not-allowed="File không đúng định dạng"
                    @addfile = "FileUpload"
                    @addfilestart="addFileStart"
                    :allowBrowse="!disabledFile"
                />
            </div>
            <div v-if="type_upload != 'create'">
                <div class="table-responsive custom-scrollbar" style="max-height:300px">
                    <table class="table table-sm table-borderless mb-0 table-list-fileUpload align-middle" style="width:100%">
                        <tbody>
                            <tr class="bg-dark bg-opacity-5" v-for="(item, index) in data" :key="index">
                                <td style="width:50%" class="text-nowrap">
                                    <div class="d-flex gap-2 ps-2">
                                        <IconFileDescription :size="20" class="d-flex text-primary" stroke-width="2" />
                                        <p class='text-truncate mb-0 ' style="max-width:180px">
                                            {{item.file_name}}
                                        </p>
                                    </div>
                                </td>
                                <td style="width:25%" class="text-center">{{item.size}}</td>
                                <td style="width:10%">
                                    <div class="d-flex gap-1 justify-content-center">
                                        <button :disabled="disabledFile" @click="DownloadFile(item.file_name,item.id)" class="d-flex text-danger bg-gradient bg-success cursor-pointer rounded-2 text-white p-1 border-0 d-flex align-items-center justify-content-center" style="width:26px;height:26px">
                                            <IconDownload  :size="12"  stroke-width="2" />
                                        </button>
                                        <button :disabled="disabledFile" @click="RemoveFile(item.id)" class="d-flex text-danger bg-gradient bg-danger cursor-pointer rounded-2 text-white p-1 border-0 align-items-center justify-content-center" style="width:26px;height:26px">
                                            <IconX  :size="12"  stroke-width="2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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

const FilePond = vueFilePond(FilePondPluginFileValidateType,FilePondPluginFileValidateSize);
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
    props : ['view','multiple','type_upload','disabledFile'],

    mounted(){
        this.GetDataFile()
    },
    methods : {
        async _Init(value){
            value ? this.init = value : false
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            this.GetDataFile()
        },

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
            if(this.type_upload != 'create'){
                this.UpdateLegal()
            }
        },

        async UpdateLegal(object){          
            let data = new FormData();
            if(object){
                data.append('object_id', object.id);
                data.append('object_type', object.type);
            }else{
                data.append('object_id', this.init.id);
                data.append('object_type', this.init.type);
            }

            if(this.files.length > 0){
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
                    if(this.type_upload != 'create'){
                        this.GetDataFile()
                    }
                    ShowToast({status_code : 200, message : 'Tải file lên thành công'});
                    this.myFiles = []
                })
                .catch((error) => {
                    ShowToast({status_code : 200, message : 'Tải file lên thất bại'});
                });
            }
        },

        async RemoveFile(id){            
            try {
                const params = {
                    item        : id,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
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
            if(this.init){
                try {
                    const params = {
                        request: {
                            object_id   : this.init.id,
                            object_type : this.init.type
                        },
                        page        : 0,
                        limit       : 0,
                    }
                    const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                    axios.post(apiProject + '/file-manager/get-all',params,config)
                    .then(async res => {
                        this.data = res.data.data.items
                    })
                    .catch(err => { })
                } catch (err) {
                    console.log(err)
                }
            }
            
        },

        async DownloadFile(file_name,file_id) {
            try {
                const params = {
                    item   : file_id,
                }
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`},responseType: 'arraybuffer'};
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

    table.table-list-fileUpload {
    border-collapse: separate;
    border-spacing: 0 5px;
    tr{
        td{
            padding:5px 0px!important;
            &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
    }
}
</style>