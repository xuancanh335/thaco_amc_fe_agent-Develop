<template lang="">
    <div id="sidebarMenu" class="sidebar-body">
        <div class="nav-group show mb-3 mt-3">
            <!-- <a href="#" class="nav-label">Dashboard</a> -->
            <ul class="nav nav-sidebar">
                
                <li class="nav-item mb-2" v-if="$CheckPermission('Dashboard','is_show')">
                    <router-link to="/admin" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconLayoutDashboard :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Bảng thông tin</span>
                    </router-link>
                </li>

                <li class="nav-item mb-2" v-if="$CheckPermission('Proposal_Management','is_show')">
                    <router-link to="/admin/proposal-manager" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconBusinessplan :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Quản lý chủ trương đầu tư</span>
                    </router-link>
                </li>

                <li class="nav-item mb-2" v-if="$CheckPermission('Project_Manager','is_show')">
                    <router-link to="/admin/project-manager" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconCoin :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Quản lý dự án đầu tư</span>
                    </router-link>
                </li>
                
                <li class="nav-item mb-2" v-if="$CheckPermission('Asset_Manager','is_show')">
                    <router-link to="/admin/assets-manager" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconCash :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Quản lý tài sản</span>
                    </router-link>
                </li>

                <li class="nav-item mb-2">
                    <router-link to="/admin/finance-manager" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconZoomMoney :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Quản lý tài chính</span>
                    </router-link>
                </li>

                <li class="nav-item mb-2" v-if="$CheckPermission('Tenant_Manager','is_show')">
                    <router-link to="/admin/tenant-manager" class="nav-link">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconUsersGroup :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Quản lý pháp nhân</span>
                    </router-link>
                </li>

                <li class="nav-item mb-2" v-if="$CheckPermission('Report','is_show')">
                    <a href="" class="nav-link has-sub">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconChartBar :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Báo cáo</span>
                    </a>
                    <nav class="nav nav-sub">
                        <router-link to="/admin/reports/project" class="nav-sub-link">Báo cáo dự án</router-link>
                        <router-link to="/admin/reports/detail" class="nav-sub-link">Báo cáo chi tiết</router-link>
                    </nav>
                </li>
                
                <li class="nav-item mb-2">
                    <a href="" class="nav-link has-sub">
                        <div class="p-1 rounded-2 bg-primary bg-gradient">
                            <IconAdjustmentsAlt :size="18" color="#FFFFFF" stroke-width="2" class="d-flex"/>
                        </div>
                        <span class="ms-2 text-primary">Cấu hình hệ thống</span>
                    </a>
                    <nav class="nav nav-sub">
                        <router-link v-if="$CheckPermission('Catetory_Config','is_show')" to="/admin/settings-manager" class="nav-sub-link">Cấu hình danh mục</router-link>
                        <router-link v-if="$CheckPermission('Project_Config','is_show')" to="/admin/settings-project" class="nav-sub-link">Cấu hình dự án</router-link>
                        <router-link v-if="$CheckPermission('Sync_Bravo_Config','is_show')" to="/admin/settings-sync" class="nav-sub-link">Cấu hình đồng bộ</router-link>
                        <router-link to="/admin/users-manager" v-if="$CheckPermission('User_Config','is_show')" class="nav-sub-link">Danh sách người dùng</router-link>
                        <router-link to="/admin/permissions" v-if="$CheckPermission('Permission_Config','is_show')" class="nav-sub-link">Phân quyền quản trị</router-link>
                    </nav>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons.js'
import { CheckPermission } from '@Helpers/utils.js';
export default {
    data(){
        return {
            current_user : null,
        }
    },
    async created(){
        await this._Init()
    },
    methods : {
        _Init(){
            var current_user = localStorage.getItem('current_user')
            current_user = JSON.parse(current_user)
            this.current_user = current_user
        },
        CheckPermission
    },
    components: {...Icons},
    computed : {
        checkRoot() {
            const role = this.current_user;
            return role.is_type_account !== 2 && (role.group_id || role.group_id === 0);
        }
    }
}
</script>
<style lang="scss">
    .nav-sidebar{
        .nav-item{
            .nav-link{
                transition: .2s ease-in-out;
                filter:grayscale(1);
                opacity: .8;
                &.router-link-exact-active{
                    transform:translateX(0px)!important;
                    transition: .2s ease-in-out;
                    filter:grayscale(0);
                    opacity: 1;
                }
                &:hover{
                    transform:translateX(3px);
                    transition: .2s ease-in-out;
                    filter:grayscale(0);
                    opacity: 1;
                }
            }
        }
    }
</style>