<template>
    <section class="MainWrapper">
        <Sidebar></Sidebar>
        <Topbar></Topbar>
        <Content></Content>
    </section>
</template>
<script>
import Init from '../../js/Init.js';
import Sidebar from './components/common/Sidebar.vue';
import Topbar from './components/common/Topbar.vue';
import Content from './components/layouts/Content.vue';
export default {
    components: {Sidebar,Topbar,Content},
    mounted(){
        Init();
    }
}
</script>
<style lang="scss"></style>