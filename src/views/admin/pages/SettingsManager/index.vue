<template lang="">
    
    <section>
        <section>
            <div class="d-flex gap-4">
                <div style="width:120px">
                    <ul class="nav nav-pills nav-settings flex-column" id="myTab" role="tablist">
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.getData_Group.getData()">
                            <div class="nav-link active p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#group-manager-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuildingCommunity :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px">Tập đoàn</span>
                                </div>
                            </div>
                        </li>
                        <!-- <li class="nav-item mb-3" role="presentation" @click="this.$refs.getData_Tenant.getData()">
                            <div class="nav-link p-0" id="tenant-manager" data-bs-toggle="tab" data-bs-target="#tenant-manager-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuilding :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px">Đơn vị</span>
                                </div>
                            </div>
                        </li> -->
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.getData_Customer.getData()">
                            <div class="nav-link p-0" id="customer-manager" data-bs-toggle="tab" data-bs-target="#customer-manager-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconUsers :size="24" stroke-width="2" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px">Khách hàng</span>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.getData_Bank.getData()">
                            <div class="nav-link p-0" id="bank-manager" data-bs-toggle="tab" data-bs-target="#bank-manager-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconBuildingBank :size="24" stroke-width="2" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px">Ngân hàng</span>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.getData_Local.getData()">
                            <div class="nav-link p-0" id="local-manager" data-bs-toggle="tab" data-bs-target="#local-manager-pane" type="button" role="tab">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconMap2 :size="24" stroke-width="2" class="d-flex" />
                                    </div>
                                    <span class="text-nowrap" style="font-size:12px">Đ.vị hành chính</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="w-100">
                    <div class="tab-content h-100" id="myTabContent">
                        <BankManager ref="getData_Bank"></BankManager>
                        <CustomerManager ref="getData_Customer"></CustomerManager>
                        <GroupManager ref="getData_Group"></GroupManager>
                        <TenantManager ref="getData_Tenant"></TenantManager>
                        <LocalManager ref="getData_Local"></LocalManager>
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

import BankManager from './components/Bank_Manager/BankManager.vue';
import CustomerManager from './components/Customer_Manager/CustomerManager.vue';
import GroupManager from './components/Group_Manager/GroupManager.vue';
import TenantManager from './components/Tenant_Manager/TenantManager.vue';
import LocalManager from './components/Local_Manager/LocalManager.vue';

import axios from 'axios';
import {ShowToast} from '@Helpers/Notify.js'

const auth = JSON.parse(localStorage.getItem('authorize'))
const apiPath = import.meta.env.VITE_API_PATH_USER;

const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
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
        this.$refs.getData_Group.getData()
    },
    components: {
        ...Icons,
        BankManager,CustomerManager,GroupManager,TenantManager,LocalManager
    }
}
</script>
<style lang="scss">

.nav-settings{
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
                transform: translateY(-5px);
                border: none!important;
                color:#FFFFFF;
            }   
           
        }
    }
    
}
    
</style>