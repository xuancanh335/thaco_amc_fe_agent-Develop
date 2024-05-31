<template lang="">
    <Create_Legal ref="Create_Modal" @ReloadData="ReloadData"></Create_Legal>
    <Delete_Legal ref="Delete_Modal" @ReloadData="ReloadData"></Delete_Legal>
    <Update_Legal ref="Update_Modal" @ReloadData="ReloadData"></Update_Legal>
    <File_Legal ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Legal>
    <div class="accordion" :id="slug+'Parent'">
        <div class="accordion-item mb-3 rounded-0 border-bottom position-relative">
            <div class="position-absolute end-0 top-0 p-3" style="margin-top:2px">
                <button v-if="!view" @click="Display(true,'create')" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                    <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                </button>
            </div>
            <h2 class="accordion-header">
                <div class="w-100 border-0 p-3" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+slug" aria-expanded="true">
                    <div class="d-flex">
                        <div class="d-flex align-items-center gap-3 flex-grow-1">
                            <div class="bg-gradient-blue text-white rounded-3 p-2 bg-opacity-25 ">
                                <IconFolder :size="22" class="d-flex" stroke-width="2" />
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold mb-1 text-gradient-blue">Hợp đồng và hồ sơ 
                                    <span class="ms-2" v-if="value.length > 0">
                                        <span v-if="status == 1" class="badge bg-success fw-medium rounded-2 py-1 px-2 status-badge">Hoàn thành</span>
                                        <span v-if="status == 0" class="badge bg-danger fw-medium rounded-2 py-1 px-2 status-badge">Chưa hoàn thành</span>
                                    </span>
                                </h6>
                                <p class="mb-0 text-muted" style="font-size:12px">Danh sách hợp đồng và hồ sơ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </h2>
            <div :id="slug" class="accordion-collapse collapse " :data-bs-parent="'#'+slug+'Parent'">
                <div class="accordion-body border-top">
                    <div class="table-responsive h-scrollbar">
                        <table v-if="data && data.length != 0" class="table table-sm table-striped table-fixed align-middle" style="width:205%">
                            <thead>
                                <tr>
                                    <th width="50" class="text-center">#</th>
                                    <th width="120" class="text-capitalize py-2 text-center">Trạng thái</th>
                                    <th width="400" class="py-2">Nội dung pháp lý</th>
                                    <th width="400" class="py-2">Giá trị hợp đồng</th>
                                    <th width="400" class="text-capitalize py-2">Diễn giải</th>
                                    <th width="200" class="text-capitalize py-2 text-center">Ngày tạo</th>
                                    <th width="200" class="text-capitalize py-2 text-center">Người tạo</th>
                                    <th width="100" class="text-capitalize py-2 text-center">
                                        <IconDotsVertical :size="20" class="text-muted" stroke-width="2" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in data" :key="index">
                                    <td class="text-center text-back-50">{{index + 1}}</td>
                                    <td class="text-center">
                                        <ProjectStatus :status_content="item.status_content" :data="item" @ProjectStatus="ChangeStatus"></ProjectStatus>
                                    </td>
                                    <td class="text-capitalize">{{item.contract_content}}</td>
                                    <td class="text-capitalize">{{FormatCurrency(item.contract_value)}}</td>
                                    <td>
                                        <span>{{item.description}}</span>
                                    </td>
                                    <td class="text-center">
                                        <span>{{FormatDate(item.start_date,'DD-MM-YYYY')}}</span>
                                    </td>
                                    <td class="text-center">
                                        <span>{{item.create_by}}</span>
                                    </td>
                                    <td>
                                        <div class="d-flex gap-1 justify-content-center">
                                            <button type="button" @click="Display(true,'file',item.id)" class="btn btn-primary bg-gradient btn-sm p-1">
                                                <IconPaperclip :size="16" class="d-flex text-white" stroke-width="2" />
                                            </button>
                                            <button v-if="!view" @click="Display(true,'update',item.id)" type="button" class="btn btn-info bg-gradient btn-sm p-1">
                                                <IconPencil :size="16" class="d-flex text-white" stroke-width="2" />
                                            </button>
                                            <button v-if="!view" @click="Display(true,'delete',item.id)" type="button" class="btn btn-danger bg-gradient btn-sm p-1">
                                                <IconX :size="16" class="d-flex text-white" stroke-width="2" />
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
    </div>
</template>
<script>

import Icons from '@Admin/common/js/Icons';
import Create_Legal from './modal/Create_Legal.vue';
import Delete_Legal from './modal/Delete_Legal.vue';
import Update_Legal from './modal/Update_Legal.vue';
import File_Legal from './modal/File_Legal.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import ProjectStatus from '../../Common/ProjectStatus.vue';
import {FormatDate,FormatCurrency} from '@Helpers/utils.js'
export default {
    data(){
        return{
            value : [],
            status : 0,
        }
    },
    props : {
        data    : Object,
        title   : String,
        subtitle   : String,
        slug : String,
        view: Boolean,
    },
    components: {
        ...Icons,
        Create_Legal,Delete_Legal,Update_Legal,File_Legal,VueDatePicker,ProjectStatus
    },
    watch: {
        data: {
        immediate: true,
            handler(newData, oldData) {
                this.value = newData;
                this.CheckStatus()
            }
        }
    },
    methods : {
        CheckStatus(){
            let TotalLegal = this.value.filter(item => (item.status_content === 2 || item.status_content === 3)).length
            TotalLegal == this.value.length ? this.status = 1 : this.status = 0
        },
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
        FormatDate,FormatCurrency
    }
}
</script>
<style lang="">
    
</style>