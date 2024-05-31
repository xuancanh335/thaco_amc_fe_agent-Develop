<template lang="">
    <SelectTenant_Modal ref="SelectTenant_Modal"></SelectTenant_Modal>
    <div class="sidebar">
        <sidebarHeader></sidebarHeader>
        <sidebarMenu></sidebarMenu>
        <sidebarFooter @TenantModal="$refs.SelectTenant_Modal._Init()"></sidebarFooter>
    </div>
</template>
<script>
import sidebarHeader from './Sidebar/Header.vue';
import sidebarMenu from './Sidebar/Menu.vue';
import sidebarFooter from './Sidebar/Footer.vue';

import SelectTenant_Modal from './Sidebar/modal/SelectTenant_Modal.vue'
var modal_tenant
export default {
    components : {sidebarHeader,sidebarMenu,sidebarFooter,SelectTenant_Modal}
}
</script>
<style lang="">
    
</style>