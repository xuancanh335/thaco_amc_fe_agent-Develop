
import { createRouter, createWebHistory } from 'vue-router';
import Admin from './views/admin/Main.vue';
import Login from './views/login/Main.vue';

import Dashboard from './views/admin/pages/Dashboard/index.vue';
import Test from './views/admin/pages/Dashboard_BAK/index.vue';
import MarketsManager from './views/admin/pages/MarketsManager/index.vue';

import UsersManager from './views/admin/pages/UsersManager/index.vue';
import Permissions from './views/admin/pages/Permissions/index.vue';
import ProjectManager from './views/admin/pages/ProjectManager/index.vue';
import ProposalManager from './views/admin/pages/ProposalManager/index.vue';
import SettingsManager from './views/admin/pages/SettingsManager/index.vue';
import SettingsProject from './views/admin/pages/SettingsProject/index.vue';
import SettingsSync from './views/admin/pages/SettingsSync/index.vue';


import AssetsManager from './views/admin/pages/AssetsManager/Main.vue';
import FinanceManager from './views/admin/pages/FinanceManager/Main.vue';
import TenantManager from './views/admin/pages/TenantManager/index.vue';

import Reports_Project from './views/admin/pages/Reports/Project/index.vue';
import Reports_Detail from './views/admin/pages/Reports/Detail/index.vue';

import Error_404 from './views/site/error_404.vue';


import axios from 'axios';
import {EnCode,DeCode} from '@Helpers/authorize.js'
import { CheckPermission } from '@Helpers/utils.js';

const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;

const routes = [
    {
        path: '/',
        component : Login,
        // redirect: to => {
        //     return { path: '/admin'}
        // },
    },
    {
        path: '/admin',
        component : Admin,
        children: [
            {
                path: '',
                component: Dashboard,
                meta : {
                    title: 'Bảng tin tổng quan',
                    breadcrumb : false,
                }
            },

            {
                path: 'test',
                component: Test,
                meta : {
                    title: 'Bảng tin tổng quan',
                    breadcrumb : false,
                }
            },

            {
                path: 'users-manager',
                component: UsersManager,
                meta : {
                    title: 'Quản lý người dùng',
                    breadcrumb : true,
                }
            },
            {
                path: 'markets-manager',
                component: MarketsManager,
                meta : {
                    title: 'Quản Lý Tài Sản',
                    breadcrumb : true,
                }
            },
            {
                path: 'permissions',
                component: Permissions,
                meta : {
                    title: 'Phân quyền quản trị',
                    breadcrumb : true,
                }
            },
            {
                path: 'project-manager',
                component: ProjectManager,
                meta : {
                    title: 'Quản lý dự án đầu tư',
                    breadcrumb : true,
                }
            },
            {
                path: 'proposal-manager',
                component: ProposalManager,
                meta : {
                    title: 'Quản lý chủ trương đầu tư',
                    breadcrumb : true,
                }
            },
            {
                path: 'settings-manager',
                component: SettingsManager,
                meta : {
                    title: 'Cấu hình danh mục chức năng',
                    breadcrumb : true,
                }
            },
            {
                path: 'settings-project',
                component: SettingsProject,
                meta : {
                    title: 'Cấu hình danh mục dự án',
                    breadcrumb : true,
                }
            },
            {
                path: 'settings-sync',
                component: SettingsSync,
                meta : {
                    title: 'Cấu hình đồng bộ',
                    breadcrumb : true,
                }
            },


            

            {
                path: 'assets-manager',
                component: AssetsManager,
                meta : {
                    title: 'Quản lý tài sản',
                    breadcrumb : true,
                }
            },

            {
                path: 'finance-manager',
                component: FinanceManager,
                meta : {
                    title: 'Quản lý tài chính',
                    breadcrumb : true,
                }
            },
            {
                path: 'tenant-manager',
                component: TenantManager,
                meta : {
                    title: 'Quản lý pháp nhân',
                    breadcrumb : true,
                }
            },

            {
                path: 'reports',
                children: [
                    {
                        path: '',
                        redirect: '/admin/reports/project',
                    },
                    {
                        path: 'project',
                        component: Reports_Project,
                        meta : {
                            title: 'Báo cáo dự án',
                            breadcrumb : true,
                        }
                    },
                    {
                        path: 'detail',
                        component: Reports_Detail,
                        meta : {
                            title: 'Báo cáo chi tiết',
                            breadcrumb : true,
                        }
                    },
                    
                ]
            },
        ]
    },

    {
        path: '/:catchAll(.*)',
        component: Error_404, // NotFound là component hiển thị trang 404
        meta: {
          title: 'Trang không tồn tại'
        }
    }

];

const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes,
});
router.beforeEach(async (to, from) => {
    if(to.path != "/"){
        if (localStorage.getItem('authorize') || localStorage.getItem('authorize') === 0) {
            let authorize = JSON.parse(localStorage.getItem('authorize'));
            if (authorize.token || authorize.token === 0) {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_USER_PATH + '/auth/check-authentication',params,config)
                .then(res => {return true;})
                .catch(err => {router.replace('/');})
            }
        }else{router.push('/')}

        let authorize = await JSON.parse(localStorage.getItem('authorize'));
        let current_user = await JSON.parse(localStorage.getItem('current_user'));
        const params = {
            item : current_user.username
        }
        const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
        axios.post(API_USER_PATH + '/permission/get-list-permission-by-user',params,config)
        .then(async res => {
            let roles = await EnCode(res.data.data)
            await localStorage.setItem('user_role',roles)
        })
        .catch(err => {
            console.error(err); 
        })

    }
})


export default router;