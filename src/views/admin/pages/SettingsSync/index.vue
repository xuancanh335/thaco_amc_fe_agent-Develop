<template lang="">
    <section>
        <section>
            <div class="d-flex gap-4">
                <div style="width:180px;max-height:90vh;" class="overflow-auto custom-scrollbar">
                    <ul class="nav nav-pills nav-settings flex-column" id="SettingsSyncMenu" role="tablist">
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.TenantSync._Init()">
                            <div class="nav-link active p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#tenant-sync-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuilding :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Đơn vị</span>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.CustomerSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#customer-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuildingCommunity :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Đối tượng</span>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.ConstructionProjectSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#construction-project-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuildingSkyscraper :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Dự án công trình</span>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.ListItemSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#list-item-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconArchive :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Danh mục hạng mục</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.FeeItemSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#fee-item-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconReportMoney :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Khoản mục phí</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.AssetGroupSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#asset-group-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconTournament :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Nhóm tài sản</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.AccountItemSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#account-item-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconUser :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Tài khoản</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.ContractItemSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#contract-item-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconNotes :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Hợp đồng</span>
                                </div>
                            </div>
                        </li>
                        
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.AssetItemSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#asset-item-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconNotes :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Tài sản</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.InvestmentValueSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#investment-value-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconNotes :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Giá trị đầu tư</span>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.DepreciationValueSync._Init()">
                            <div class="nav-link p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#depreciation-value-sync-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconNotes :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px" class="text-nowrap">Giá trị khấu hao</span>
                                </div>
                            </div>
                        </li>

                        
                        
                    </ul>
                </div>
                <div class="w-100">
                    <div class="tab-content h-100" id="myTabContent">

                        <TenantSync ref="TenantSync"></TenantSync>
                        <CustomerSync ref="CustomerSync"></CustomerSync>
                        <ConstructionProjectSync ref="ConstructionProjectSync"></ConstructionProjectSync>
                        <ListItemSync ref="ListItemSync"></ListItemSync>
                        <FeeItemSync ref="FeeItemSync"></FeeItemSync>
                        <AssetGroupSync ref="AssetGroupSync"></AssetGroupSync>
                        <AccountItemSync ref="AccountItemSync"></AccountItemSync>
                        <ContractItemSync ref="ContractItemSync"></ContractItemSync>
                        <AssetItemSync ref="AssetItemSync"></AssetItemSync>
                        <InvestmentValueSync ref="InvestmentValueSync"></InvestmentValueSync>
                        <DepreciationValueSync ref="DepreciationValueSync"></DepreciationValueSync>


<!-- 
                        <Default_Legal ref="Default_Legal"></Default_Legal>
                        <TenantManager ref="getData_Tenant"></TenantManager> -->
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import Icons from '@Admin/common/js/Icons';
// import Modal_CreateProposal from './modal/Create_Proposal.vue';
import Modal_DeleteProposal from './modal/Delete_Proposal.vue';
import Modal_UpdateProposal from './modal/Update_Proposal.vue';

import TenantSync from './components/Tenant_Sync/Main.vue';
import CustomerSync from './components/Customer_Sync/Main.vue';
import ConstructionProjectSync from './components/ConstructionProject_Sync/Main.vue';
import ListItemSync from './components/ListItem_Sync/Main.vue';
import FeeItemSync from './components/FeeItem_Sync/Main.vue';
import AssetGroupSync from './components/AssetGroup_Sync/Main.vue';
import AccountItemSync from './components/AccountItem_Sync/Main.vue';
import ContractItemSync from './components/ContractItem_Sync/Main.vue';
import AssetItemSync from './components/AssetItem_Sync/Main.vue';
import InvestmentValueSync from './components/InvestmentValue_Sync/Main.vue';
import DepreciationValueSync from './components/DepreciationValue_Sync/Main.vue';

import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'

const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const PATH_API_WEBHOOK = import.meta.env.VITE_API_PATH_WEBHOOK;
const path_apiStore = import.meta.env.VITE_API_PATH_STORE;

const AppPath = import.meta.env.VITE_APP_PATH;

export default {
    data(){
        return {
            data : [],
            item : null,
        }
    },
    computed : {
    },

    mounted(){
        this.$refs.TenantSync._Init()
    },
    components: {
        ...Icons,
        TenantSync,CustomerSync,ConstructionProjectSync,ListItemSync,FeeItemSync,AssetGroupSync,AccountItemSync,ContractItemSync,AssetItemSync,InvestmentValueSync,DepreciationValueSync
    }
}
</script>
<style lang="scss">

#SettingsSyncMenu.nav-settings{
    .nav-item{
        .nav-link{
            background: #ffffff;
            transform: translateY(0px);
            transition: .3s ease-in-out;
            box-shadow: inset 0px 0px 0px 1px #e2e5ec;
            color:rgb(172, 172, 172);
            &.active{
                background: #0064ff;
                background-image: linear-gradient(22deg, #0000004f 10%, #ffffff0a 90%);
                box-shadow: 0px 10px 15px -7px #12499f;
                transform: translateY(0px);
                border: none!important;
                color:#FFFFFF;
            }   
           
        }
    }
}
    
</style>