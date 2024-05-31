<template lang="">
    <Create_Proposal ref="Create_Modal" @ReloadData="ReloadData"></Create_Proposal>
    <Delete_Proposal ref="Delete_Modal" @ReloadData="ReloadData"></Delete_Proposal>
    <Update_Proposal ref="Update_Modal" @ReloadData="ReloadData"></Update_Proposal>
    <File_Proposal ref="File_Modal" @ReloadData="ReloadData" :view="view"></File_Proposal>

    <div class="accordion" :id="slug+'Parent'">
        <div class="accordion-item mb-3 rounded-0 border-bottom position-relative">
            <div class="position-absolute end-0 top-0 p-3" style="margin-top:2px"
            v-if="$CheckPermission('Proposal_Approve_Decisions','is_allow_create')"
            >
                <button v-if="!view" @click="Display(true,'create',proposal_id)" class="btn bg-success rounded-circle p-2 border-0 text-dark hover-jello" href="#">
                    <IconPlus :size="18" class="d-flex text-white" stroke-width="2" />
                </button>
            </div>
            <h2 class="accordion-header">
                <div class="w-100 border-0 p-3" type="button" data-bs-toggle="collapse" :data-bs-target="'#'+slug" aria-expanded="true">
                    <div class="d-flex">
                        <div class="d-flex align-items-center gap-3 flex-grow-1">
                            <div class="bg-gradient-blue rounded-3 p-2 text-white">
                                <IconDimensions :size="22" class="d-flex" stroke-width="2" />
                            </div>
                            <div>
                                <h6 class="mb-0 fw-bold text-gradient-blue mb-1">Quyết định phê duyệt</h6>
                                <p class="mb-0 text-muted" style="font-size:12px">Danh sách quyết định phê duyệt</p>
                            </div>
                        </div>
                    </div>
                </div>
            </h2>

            <div :id="slug" class="accordion-collapse collapse " :data-bs-parent="'#'+slug+'Parent'">
                <div class="accordion-body border-top"
                v-if="$CheckPermission('Proposal_Approve_Decisions','is_allow_access')"
                >
                    <table v-if="data && data.length != 0" class="table table-xl table-striped align-middle">
                        <thead>
                            <tr>
                                <th width="5%" class="text-center py-2">#</th>
                                <th class="py-2">Nội dung</th>
                                <th class="text-capitalize py-2">Diễn giải</th>
                                <th class="py-2">Giá trị</th>
                                <th class="text-capitalize py-2">Ngày tạo nội dung</th>
                                <th class="text-capitalize py-2">Người tạo</th>                                
                                <th class="text-capitalize py-2">
                                    <IconDotsVertical :size="20" class="d-flex text-muted" stroke-width="2" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in data" :key="index">
                                <td class="text-center text-back-50">{{index + 1}}</td>
                                <td class="fw-bold text-back-50 text-capitalize">{{item.approve_decisions_content}}</td>                               
                                <td>
                                    <span>{{item.description}}</span>
                                </td>
                                <td><span>{{FormatCurrency(item.content_value)}}</span></td>                                
                                <td><span>{{item.start_date}}</span></td>
                                <td><span>{{item.create_by}}</span></td>
                                <td>
                                    <div class="d-flex gap-1">
                                        <div v-if="$CheckPermission('Proposal_Approve_Decisions','is_allow_edit')">
                                            <button type="button" @click="Display(true,'file',item.id)" class="btn btn-primary bg-gradient btn-sm p-1">
                                                <IconPaperclip :size="16" class="d-flex text-white" stroke-width="2" />
                                            </button>
                                        </div>

                                        <div v-if="$CheckPermission('Proposal_Approve_Decisions','is_allow_edit')">
                                            <button v-if="!view" @click="Display(true,'update',item.id)" type="button" class="btn btn-info bg-gradient btn-sm p-1">
                                                <IconPencil :size="16" class="d-flex text-white" stroke-width="2" />
                                            </button>
                                        </div>

                                        <div v-if="$CheckPermission('Proposal_Approve_Decisions','is_allow_delete')">
                                            <button v-if="!view" @click="Display(true,'delete',item.id)" type="button" class="btn btn-danger bg-gradient btn-sm p-1">
                                                <IconX :size="16" class="d-flex text-white" stroke-width="2" />
                                            </button>
                                        </div>
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
import Create_Proposal from './modal/Create_Proposal.vue';
import Delete_Proposal from './modal/Delete_Proposal.vue';
import Update_Proposal from './modal/Update_Proposal.vue';
import File_Proposal from './modal/File_Proposal.vue';
import Icons from '@Admin/common/js/Icons';
import { FormatCurrency } from '@Helpers/utils.js';
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
        proposal_id : String,
    },
    components: {
        ...Icons,
        Create_Proposal,Delete_Proposal,Update_Proposal,File_Proposal 
    },
    methods : {
        ReloadData(){
            this.$emit('ReloadData')
        },
        Display(value,modal,data){
            switch (modal) {
                case 'create':
                this.$refs.Create_Modal.Display(value,data)
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
        },FormatCurrency
    }
}
</script>
<style lang="">
    
</style>