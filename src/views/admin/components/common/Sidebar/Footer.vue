<template lang="">

    <div class="sidebar-footer cursor-pointer" @click="$emit('TenantModal')">
        <div class="sidebar-footer-top d-flex align-items-center">
            <div class="sidebar-footer-thumb">
                <!-- <img :src="user_info.avatar" alt="" /> -->
                <IconBuildingCommunity :size="38" stroke-width="2" class="d-flex bg-twitter text-white p-2 rounded-circle" />
            </div>
            <!-- sidebar-footer-thumb -->
            <div class="sidebar-footer-body">
                <p class="text-truncate" style="max-width: 140px;">Đơn vị</p>

                <span v-if="data.is_type_account == 1 || data.is_type_account == 0">
                    <span v-if="data.group_code && data.group_code != null">
                        <h6 class="text-nowrap text-truncate text-start cursor-pointer" :title="data.tenant_name">
                            {{data.group_name}}
                        </h6>
                    </span>
                    <span v-else>
                        <h6 class="text-nowrap text-truncate text-end cursor-pointer" :title="data.tenant_name" style="max-width:160px"><a>{{data.tenant_code}} | {{data.tenant_name}}</a></h6>
                    </span>
                </span>
                <span v-if="data.is_type_account == 2">
                    <h6 class="text-nowrap text-truncate text-end cursor-pointer" :title="data.tenant_name" style="max-width:160px"><a>{{data.tenant_code}} | {{data.tenant_name}}</a></h6>
                </span>
            </div>
            <!-- sidebar-footer-body -->
            <!-- <a id="sidebarFooterMenu" href="" class="dropdown-link"><i class="ri-arrow-down-s-line"></i></a> -->
        </div>
        <!-- sidebar-footer-top -->
        <!-- <div class="sidebar-footer-menu">
            <nav class="nav">
                <a href=""><i class="ri-edit-2-line"></i> Edit Profile</a>
                <a href=""><i class="ri-profile-line"></i> View Profile</a>
            </nav>
            <hr />
            <nav class="nav">
                <a href=""><i class="ri-question-line"></i> Help Center</a>
                <a href=""><i class="ri-lock-line"></i> Privacy Settings</a>
                <a href=""><i class="ri-user-settings-line"></i> Account Settings</a>
                <a @click="LogOut"><i class="ri-logout-box-r-line"></i> Log Out</a>
            </nav>
        </div> -->
        <!-- sidebar-footer-menu -->
    </div>
</template>
<script>
import axios from 'axios'
import Icons from '@Admin/common/js/Icons.js'
import SelectTenant_Modal from './modal/SelectTenant_Modal.vue'

const app_path = import.meta.env.VITE_APP_PATH;
const apiPath = import.meta.env.VITE_API_PATH_USER;
export default {
    data(){
        return {
            data : null
        }
    },
    async created(){
        await this.GetData()
    },
    components : {
        ...Icons,SelectTenant_Modal
    },
    methods : {

        GetData(){
            var current_user = localStorage.getItem('current_user')
            let current_user_b = JSON.parse(current_user)
            this.data = current_user_b
        },
        LogOut(){
            let authorize = JSON.parse(localStorage.getItem('authorize'));
            if (authorize.token || authorize.token === 0) {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiPath + '/auth/logout',params,config)
                .then(async res => {
                    await localStorage.clear();
                    await sessionStorage.clear();
                    this.$router.push('/')
                    window.location.reload();
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        }
    }
}
</script>
<style lang="">
    
</style>