<template lang="">
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
        <li class="nav-item" role="presentation">
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
                                <button @click="DownloadFile(item.file_name,item.url_file)" type="button" class="btn btn-success bg-gradient btn-sm p-1">
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
            <file-pond
                name="test"
                ref="pond"
                class-name="uploadfile-pond"
                label-idle="Chọn hoặc thả file vào đây..."
                allow-multiple="true"
                :files="myFiles"
                @updatefiles = "FileUpload"
            />
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-success bg-gradient" @click="UpdateLegal">Tải lên</button>
            </div>
        </div>
    </div>


</template>
<script>

import {IconFilter,IconSearch,IconUser,IconX, IconBriefcase, IconPlus, IconDimensions,IconCalendar,IconBuildingCommunity,IconRefresh,IconDotsVertical,IconEye,IconBrowserPlus,IconDatabaseEdit,IconPencil,IconDownload} from '@tabler/icons-vue';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import vueFilePond from 'vue-filepond';
import {ShowToast} from '@Helpers/Notify.js'

const FilePond = vueFilePond();
export default {
    components: {
        IconSearch, IconBriefcase,IconDimensions,IconCalendar,IconUser,IconBuildingCommunity,IconRefresh,IconDotsVertical,IconEye,IconPlus, IconFilter,IconBrowserPlus,IconX,IconDatabaseEdit,IconPencil,IconDownload,FilePond
    },
    data(){
        return {
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
        view: Boolean,
        ObjectType : String,
    },
    methods : {

        FileUpload(){
            let a = this.$refs.pond.getFiles();
            var b = a.map(item => {
                return item.file
            })
            this.files = b
        },

        async UpdateLegal(){           
            let data = new FormData();
            data.append('object_id', this.id);
            data.append('object_type', this.ObjectType);
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
                        object_type : "TYPE_ASSET_DEPRECIATION"
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

        async DownloadFile(file,url) {
            try {
                const response = await axios.get(url, {responseType: 'blob'});
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = fileURL;
                link.target = '_blank';
                link.download = file;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(fileURL);
            } catch (error) {
                console.error('Lỗi tải file:', error);
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