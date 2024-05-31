<template lang="">
    <div class="sidebar-header">
        <img class="cursor-pointer" src="/assets/images/logo-thaco.svg" width="150" alt="" srcset="" @click="handleImageClick">
        <!-- <a href="../" class="sidebar-logo">THACO GROUP</a> -->
    </div>
</template>
<script>
export default {
    methods : {
        async handleImageClick() {
            this.$router.push('/admin');
        }
    }
}
</script>
<style lang="">
    
</style>