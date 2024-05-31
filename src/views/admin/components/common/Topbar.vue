<template lang="">
    <div class="header-main px-3 px-lg-4">
        <div class="d-flex">
            <a id="menuSidebar" href="#" class="menu-link me-3 me-lg-4"><i class="ri-menu-2-fill"></i></a>
            <h5 class="mb-0 fw-bold" style="color:#00529c">PHẦN MỀM QUẢN TRỊ PHÁP NHÂN, TÀI SẢN VÀ DỰ ÁN ĐẦU TƯ</h5>
        </div>

        <div class="me-auto">
            <!-- <input type="text" class="form-control" placeholder="Search" />
            <i class="ri-search-line"></i> -->
        </div>
        <!-- form-search -->
        <Settings></Settings>
        <!-- <Notification></Notification> -->
        <UserInfo></UserInfo>
    </div>
</template>
<script>
import Settings from './Topbar/Settings.vue';
import Notification from './Topbar/Notification.vue';
import UserInfo from './Topbar/UserInfo.vue';
export default {
    components : {Settings,Notification,UserInfo}
}
</script>
<style lang="">
    
</style>