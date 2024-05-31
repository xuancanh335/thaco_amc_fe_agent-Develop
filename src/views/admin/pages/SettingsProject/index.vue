<template lang="">
    <section>
        <section>
            <div class="d-flex gap-4">
                <div style="width:120px">
                    <ul class="nav nav-pills nav-settings flex-column" id="myTab" role="tablist">
                        <li class="nav-item mb-3" role="presentation" @click="this.$refs.Default_Legal.getData()">
                            <div class="nav-link active p-0" id="group-manager" data-bs-toggle="tab" data-bs-target="#group-manager-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">
                                <div class="d-flex justify-content-center flex-column align-items-center p-3 gap-2 rounded-4">
                                    <div class="bg-dark bg-opacity-10 p-2 rounded-circle">
                                        <IconScript :size="24" stroke-width="1.5" class="d-flex" />
                                    </div>
                                    <span style="font-size:12px">Pháp lý</span>
                                </div>
                            </div>
                        </li>
          
                    </ul>
                </div>
                <div class="w-100">
                    <div class="tab-content h-100" id="myTabContent">
                        <Default_Legal ref="Default_Legal"></Default_Legal>
                        <TenantManager ref="getData_Tenant"></TenantManager>
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

import Default_Legal from './components/Default_Legal/DefaultLegal.vue';
import TenantManager from './components/Tenant_Manager/TenantManager.vue';

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
        this.$refs.Default_Legal.getData()
    },
    components: {
        ...Icons,
        Default_Legal,TenantManager
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