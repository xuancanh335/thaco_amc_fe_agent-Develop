<template lang="">
    <div class="main main-app p-3 p-lg-4">
        <Header v-if="$route.meta.breadcrumb"></Header>
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
        <!-- <Footer></Footer> -->
    </div>
</template>
<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
export default {
    components: {Footer,Header},
}
</script>
<style lang="scss">
.slide-fade-enter-active {
    transition: all .5s ease-out;
}
.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
}
</style>