<template lang="">
    <div class="d-flex justify-content-between align-items-center">
        <div class="flex-grow-1">Hiển thị {{this.limit}} Trên tổng {{this.total}} kết quả</div>
        <nav class="d-flex gap-3">
            <div class="d-flex gap-3 align-items-center">
                <div class="text-nowrap">Số dòng</div>
                <select class="form-select" v-model="per_page" @change="changePerPage">
                    <option value="5" selected>5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <vue-awesome-paginate
                :total-items="this.total"
                :items-per-page="this.limit"
                :max-pages-shown="4"
                v-model="page"
                :on-click="changePagination"
                class="pagination text-nowrap"
            />
        </nav>
    </div>
</template>
<script>
import {IconChevronRight,IconChevronLeft } from '@tabler/icons-vue';
export default {
    data(){
        return {
            page : 1,
            per_page : this.limit,
            total_page : this.total,
        }
    },
    methods : {
        NextPrevPagination(value){
            if(value == 'prev'){
                if(this.page > 1){
                    this.page = this.page - 1
                }
            }
            if(value == 'next'){
                if(this.page < this.TotalPage){
                    this.page = this.page + 1
                }
            }
            this.ApplyPaginate()
        },
        changePerPage(){
            this.page = 1;
            this.per_page = event.target.value
            this.ApplyPaginate()
        },
        changePagination(page){
            this.page = page
            this.ApplyPaginate()
        },
        ApplyPaginate(){
            this.$emit('Handle',{page:this.page,limit:this.per_page})
        },
    },

    props : ['total','limit'],
    components: {
        IconChevronRight,IconChevronLeft
    }
}
</script>
<style lang="scss">
  
</style>