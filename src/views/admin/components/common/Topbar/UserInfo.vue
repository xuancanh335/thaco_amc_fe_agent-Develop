<template lang="">
    <div class="dropdown dropdown-profile ms-3 ms-xl-4">
        <a href="" class="dropdown-link" data-bs-toggle="dropdown" data-bs-auto-close="outside">
            <div class="avatar online"><img :src="user_info.avatar" alt="" @error="imageError"/></div>
        </a>
        <div class="dropdown-menu dropdown-menu-end mt-10-f">
            <div class="dropdown-menu-body">
                <div class="avatar avatar-xl online mb-3"><img :src="user_info.avatar" alt="" @error="imageError"/></div>
                <h5 class="mb-1 text-dark fw-semibold">{{user_info.fullname}}</h5>
                <p class="fs-sm text-secondary">{{user_info.email}}</p>
                <!-- <nav class="nav">
                    <a href=""><i class="ri-edit-2-line"></i> Tùy chỉnh tài Khoản</a>
                    <a href=""><i class="ri-profile-line"></i> Xem hồ sơ</a>
                    <a href=""><i class="ri-profile-line"></i> Thay đổi mật khẩu</a>
                </nav> -->
                <hr />
                <nav class="nav">
                    <!-- <a href=""><i class="ri-question-line"></i> Trung tâm hỗ trợ</a> -->
                    <!-- <a href=""><i class="ri-lock-line"></i> Phần quyên</a> -->
                    <!-- <a href=""><i class="ri-user-settings-line"></i> Cài đặt</a> -->
                    <a class="btn border-0" @click="LogOut"><i class="ri-logout-box-r-line"></i> Đăng xuất</a>
                </nav>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios'
const app_path = import.meta.env.VITE_APP_PATH;
const apiPath = import.meta.env.VITE_API_PATH_USER;
var current_user = localStorage.getItem('current_user')
export default {
    computed : {
        user_info(){
            let data = {
                avatar          : 'Undentified',
                fullname        : 'Undentified',
                email           : 'Undentified',
                tenant_name     : 'Undentified'
            }
            if (current_user || current_user === 0) {
                var user = JSON.parse(current_user)
                user.avatar || user.avatar === 0 ? data.avatar = app_path + user.avatar : data.avatar = './assets/images/avatar-default.webp'
                user.fullname || user.fullname === 0 ? data.fullname = user.fullname : data.fullname = 'Undentified'
                user.email || user.email === 0 ? data.email = user.email : data.email = 'Undentified'
                user.tenant_code || user.tenant_code === 0 ? data.tenant_code = user.tenant_code : data.tenant_code = 'Undentified'
            }
            return data
        }
    },
    methods : {
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
        },
        imageError(event) {event.target.src = '/assets/images/avatar-default.webp';},
    }
}
</script>
<style lang="">
    
</style>