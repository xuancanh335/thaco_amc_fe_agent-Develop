<template lang="">
    <Create_Asset ref="Create_Modal" @ReloadData="ReloadData" :assetId="assetId"></Create_Asset>
    <Delete_Asset ref="Delete_Modal" @ReloadData="ReloadData" :assetId="assetId"></Delete_Asset>
    <Update_Asset ref="Update_Modal" @ReloadData="ReloadData" :assetId="assetId"></Update_Asset>
    <File_Asset ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Asset>
    <div class="accordion" :id="slug+'Parent'">
        <div class="accordion-item mb-3 rounded-0 border-bottom position-relative">
            <div class="position-absolute end-0 top-0 p-3" style="margin-top:2px">
                <!-- <button 
                v-if="!view" 
                @click="Display(true,'create')" 
                class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                    <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                </button> -->
                <button
                v-if="!view"
                @click="Display(true,'create')" 
                class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                    <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                </button>
            </div>
            <h2 class="accordion-header">
                <div class="w-100 border-0 p-3" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+slug" aria-expanded="true">
                    <div class="d-flex">
                        <div class="d-flex align-items-center gap-3 flex-grow-1">
                            <div class="bg-primary rounded-3 p-2 text-white">
                                <IconDimensions :size="22" class="d-flex" stroke-width="2" />
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold text-primary mb-1">Hiện trạng tài sản</h6>
                                <p class="mb-0 text-muted" style="font-size:12px">Danh sách hiện trạng tài sản</p>
                            </div>
                        </div>
                    </div>
                </div>
            </h2>
            <div :id="slug" class="accordion-collapse collapse " :data-bs-parent="'#'+slug+'Parent'">
                <div class="accordion-body border-top">
                    <table v-if="data && data.length != 0" class="table table-sm table-striped table-fixed align-middle">
                        <thead>
                            <tr>
                                <th width="5%" class="text-center py-2">#</th>
                                <th class="py-2">Tên hạng mục</th>
                                <th class="text-capitalize py-2">Ghi chú</th>
                                <th class="text-capitalize py-2 text-center">Người tạo</th>
                                <th class="text-capitalize py-2 text-center">Ngày tạo</th>
                                <th class="text-capitalize py-2 text-end" width="150px">
                                    <IconDotsVertical :size="20" class="text-muted" stroke-width="2" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(item, index) in data" :key="index">
                                <td class="text-center text-back-50">{{index + 1}}</td>
                                <td class="fw-bold text-back-50 text-capitalize">{{item.asset_status_content}}</td>
                                <td>
                                    <span>{{item.description}}</span>
                                </td>
                                <td class="text-center">
                                    <span>{{item.create_by}}</span>
                                </td>
                                <td class="text-center">
                                    <span>{{FormatDate(item.start_date,'DD/MM/YYYY')}}</span>
                                </td>
                                <td>
                                    <div class="d-flex gap-1 justify-content-end">
                                        <button type="button" @click="Display(true,'file',item.id)" class="btn btn-primary bg-gradient btn-sm p-1">
                                            <IconPaperclip :size="20" class="d-flex text-white" stroke-width="2" />
                                        </button>
                                        <button v-if="!view" @click="Display(true,'update',item.id)" type="button" class="btn btn-info bg-gradient btn-sm p-1">
                                            <IconPencil :size="20" class="d-flex text-white" stroke-width="2" />
                                        </button>
                                        <button v-if="!view" @click="Display(true,'delete',item.id)" type="button" class="btn btn-danger bg-gradient btn-sm p-1">
                                            <IconX :size="20" class="d-flex text-white" stroke-width="2" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else>
                        <div class="w-100 d-flex align-items-center justify-content-center flex-column">
                            <div>
                                <img src="/assets/images/empty.svg" alt="" srcset="" width="200" style="opacity:.8">
                                <h5 class="fw-light text-muted">Không tìm thấy dữ liệu !</h5>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>

import {IconX, IconPlus, IconCalendar, IconDotsVertical,IconEye,IconBrowserPlus,IconDatabaseEdit,IconPencil, IconPaperclip,IconDimensions  } from '@tabler/icons-vue';
import Create_Asset from './modal/Create_Asset.vue';
import Delete_Asset from './modal/Delete_Asset.vue';
import Update_Asset from './modal/Update_Asset.vue';
import File_Asset from './modal/File_Asset.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import {FormatDate,FormatNumberic} from '@Helpers/utils.js'
export default {
    data(){
        return{

        }
    },
    props : {
        data    : Object,
        title   : String,
        subtitle   : String,
        slug : String,
        view: Boolean,
        assetId : String,
    },
    components: {
VueDatePicker,
        IconX, IconPlus, IconCalendar, IconDotsVertical,IconEye,IconBrowserPlus,IconDatabaseEdit,IconPencil,IconPaperclip,
        Create_Asset,Delete_Asset,Update_Asset,File_Asset,IconDimensions 
    },
    methods : {
        ReloadData(){
            this.$emit('ReloadData')
        },
        Display(value,modal,data){
            switch (modal) {
                case 'create':
                this.$refs.Create_Modal.Display(value)
                break;

                case 'delete':
                this.$refs.Delete_Modal.Display(value,data)
                break;

                case 'update':
                this.$refs.Update_Modal.Display(value,data)
                break;

                case 'file':
                this.$refs.File_Modal.Display(value,data)
                break;
            }
        },
        FormatDate
    }
}
</script>
<style lang="">
    
</style>