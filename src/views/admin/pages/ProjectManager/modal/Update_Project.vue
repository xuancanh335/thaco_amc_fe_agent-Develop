<template lang="">
    <div class="modal fade" id="Modal_UpdateProject" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" style="min-width:1280px">
            <div class="modal-content min-h-100">
                <!-- <div :class="{'hide' : !preloader}" class="preloader position-absolute top-0 start-0 bg-white w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                    <img src="/assets/images/loading.webp" width="180" alt="" style="margin-bottom:-40px">
                    <div class="bottom-0">
                        Đang tải dữ liệu ...
                    </div>
                </div> -->
                <div class="modal-header p-5 pb-1 border-bottom-0">
                    <div class="flex-grow-1">
                        <div class="d-flex align-items-center gap-3">
                                <div class="bg-warning bg-opacity-25 rounded-4 p-2 text-warning">
                                    <IconDatabaseEdit :size="38" class="d-flex" stroke-width="2" />
                                </div>
                                <div>
                                    <h5 class="mb-0">
                                        <span>THÔNG TIN DỰ ÁN</span>&nbsp;
                                    </h5>
                                    <p class="mb-0 text-muted">Xem hoặc cập nhật dự án đầu tư cụ thể và hiệu quả</p>
                                </div>
                        </div>
                    </div>
                        <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer">
                            <IconX :size="28" class="d-flex text-muted" stroke-width="1" />
                        </div>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body p-5 custom-scrollbar" style="position:initial;">
                    <!-- <div class="mb-4 d-flex">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-warning bg-opacity-25 rounded-4 p-2 text-warning">
                                    <IconDatabaseEdit :size="38" class="d-flex" stroke-width="2" />
                                </div>
                                <div>
                                    <h5 class="mb-0">
                                        <span>THÔNG TIN DỰ ÁN</span>&nbsp;
                                    </h5>
                                    <p class="mb-0 text-muted">Xem hoặc cập nhật dự án đầu tư cụ thể và hiệu quả</p>
                                </div>
                            </div>
                        </div>
                        <div data-bs-dismiss="modal" aria-label="Close" class="cursor-pointer">
                            <IconX :size="28" class="d-flex text-muted" stroke-width="1" />
                        </div>
                    </div> -->

                    <ul class="nav nav-pills mb-3" id="menu-tab" role="tablist">
                        <li class="nav-item me-3" role="presentation"
                        v-if="$CheckPermission('Project_Manager','is_show')"
                        >
                            <button class="nav-link active p-2" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconDatabaseEdit :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Thông tin dự án
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li class="nav-item me-3" @click="handleClickLegal" role="presentation"
                        v-if="$CheckPermission('Proposal_Management','is_show')"
                        >
                            <button class="nav-link p-2 pe-4" id="pills-proposal-tab" data-bs-toggle="pill" data-bs-target="#pills-legal" type="button" role="tab">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconScale :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Pháp lý
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li class="nav-item me-3" @click="handleClickProposal" role="presentation"
                        v-if="$CheckPermission('Proposal_Management','is_show')"
                        >
                            <button class="nav-link p-2 pe-3" id="pills-progress-tab" data-bs-toggle="pill" data-bs-target="#pills-progress" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconCash :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Tiến độ
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li class="nav-item me-3" @click="handleClickFinance" role="presentation"
                        v-if="$CheckPermission('Proposal_Management','is_show')"
                        >
                            <button class="nav-link p-2" id="pills-finance-tab" data-bs-toggle="pill" data-bs-target="#pills-finance" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconCash :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Tài Chính
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li class="nav-item me-3" @click="handleClickProposal" role="presentation"
                        v-if="$CheckPermission('Proposal_Management','is_show')"
                        >
                            <button class="nav-link p-2" id="pills-proposal-tab" data-bs-toggle="pill" data-bs-target="#pills-proposal" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconClipboardText :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Thông tin chủ trương
                                    </div>
                                </div>
                            </button>
                        </li>

                        <li class="nav-item" @click="handleClickAssets" role="presentation"
                        v-if="$CheckPermission('Asset_Manager','is_show')"
                        >
                            <button class="nav-link p-2" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                <div class="d-flex align-items-center gap-3">
                                    <div class="bg-white bg-opacity-25 p-2 rounded-3">
                                        <IconBriefcase :size="24" class="d-flex" stroke-width="2" />
                                    </div>
                                    <div>
                                        Thông tin tài sản
                                    </div>
                                </div>
                            </button>
                        </li>
                    </ul>

                    <div class="tab-content mb-5" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"
                        v-if="$CheckPermission('Project_Manager','is_show')"
                        >
                            <ProjectManager ref="ProjectManager" @RefreshData="RefreshData"></ProjectManager>
                        </div>

                        <div class="tab-pane fade" id="pills-legal" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"
                        >
                            <LegalManager ref="LegalManager" @RefreshData="RefreshData"></LegalManager>
                        </div>
        
                        <div class="tab-pane fade h-100" id="pills-finance" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"
                        >
                            <FinanceManager ref="FinanceManager" @RefreshData="RefreshData"></FinanceManager>
                        </div>
                        
                        <div class="tab-pane fade" id="pills-progress" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"
                        >
                            <ProgressManager ref="ProgressManager" @RefreshData="RefreshData"></ProgressManager>
                        </div>

                        <div class="tab-pane fade" id="pills-proposal" role="tabpanel" aria-labelledby="pills-proposal-tab" tabindex="0"
                        v-if="$CheckPermission('Proposal_Management','is_show')"
                        >
                            <ProposalManager ref="ProposalManager"></ProposalManager>
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0"
                        v-if="$CheckPermission('Asset_Manager','is_show')"
                        >
                            <AssetsManager ref="AssetsManager"></AssetsManager>
                        </div>
                    </div>
                </div>
                <!-- <div class="modal-footer" v-if="!view">
                    <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
                    <button type="button" class="btn btn-success" @click="updateProject">Cập nhật dự án</button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import dayjs from 'dayjs';

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {ShowToast} from '@Helpers/Notify.js'
import Icons from '@Admin/common/js/Icons';

import Land_Legal from '../components/ProjectManager/Land_Legal/Main.vue';
import Planning_Legal from '../components/ProjectManager/Planning_Legal/Main.vue';
import Construction_Legal from '../components/ProjectManager/Construction_Legal/Main.vue';
import Acceptance_Legal from '../components/ProjectManager/Acceptance_Legal/Main.vue';
import Invest_Legal from '../components/ProjectManager/Invest_Legal/Main.vue';
import Construction_Progress from '../components/ProjectManager/Construction_Progress/Main.vue';
import Land_Origin from '../components/ProjectManager/Land_Origin/Main.vue';
import Project_Finance from '../components/ProjectManager/Project_Finance/Main.vue';

import ProjectManager from '../components/ProjectManager/Main.vue';
import LegalManager from '../components/LegalManager/Main.vue';
import ProgressManager from '../components/ProgressManager/Main.vue';
import FinanceManager from '../components/FinanceManager/Main.vue';
import ProposalManager from '../components/ProposalManager/Main.vue';
import AssetsManager from '../components/AssetsManager/Main.vue';



import{useProjectStore} from '@Store'

const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));

export default {
    data(){
        return {
            preloader : true,
            view : false,
            tenant : [],
            customer : [],
            proposal : [],
            project_create_time : null,
            data : {
                status_content : '',
            },
            show : {
                add_landlegal : false
            },
            location : null,
        }
    },
    mounted(){
        var Modal = document.getElementById('Modal_UpdateProject')
        var vm = this
        Modal.addEventListener('show.bs.modal', async function (event) {
            var type_modal = await Modal.getAttribute('data-modal');
            await vm.GetProjectById()
            await vm.GetLocations()
            type_modal == "view" ? vm.view = true : vm.view = false
        })
        Modal.addEventListener('hide.bs.modal', async function (event) {
            var sel = document.querySelector('#pills-home-tab')
            bootstrap.Tab.getOrCreateInstance(sel).show()
        })
    },
    methods : {
        RefreshData(){
            this.$emit('RefreshData');
        },
        GetLocations(){
            const ProjectStore = useProjectStore();
            ProjectStore.GetLocations
            this.location = ProjectStore.GetLocations
        },
        GetProjectById(){
            this.preloader = true
            var Modal = document.getElementById('Modal_UpdateProject')
            var id = Modal.getAttribute('data-id');
            try {
                const params = {
                    item        : id,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project/get-by-id',params,config)
                .then(async res => {
                    setTimeout(() => {
                        this.preloader = false
                    }, 500);
                    
                    this.data = res.data.data
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        handleClickAssets(){
            this.$refs.AssetsManager.GetData();
        },
        handleClickProposal(){
            this.$refs.ProposalManager.GetData();
        },
        handleClickLegal(){
            this.$refs.LegalManager._Init(this.data);
        },
        handleClickFinance(){
            this.$refs.FinanceManager._Init(this.data);
        },

        updateProject(){
            this.$refs.ProjectManager.UpdateProject();
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        ProjectManager,AssetsManager,ProposalManager,LegalManager,ProgressManager,FinanceManager
    },

}
</script>
<style lang="scss">

#Modal_UpdateProject{
    #menu-tab{
        .nav-item{
            .nav-link{
                background: #eeedf0!important;
                color:#bbbdc7;
                transition: .3s ease-in-out;
                &.active{
                    background: linear-gradient(186deg, #009aff -10%, #1200FF) !important;
                    box-shadow: 0px 9px 20px -9px #838383;
                    color:#FFFFFF;
                    transform: translateY(-3px);
                }
            }

        }
    }
}
    .hide-arrow-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>