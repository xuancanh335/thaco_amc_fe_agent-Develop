<template lang="">
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Tên dự án</span>
                <input type="text" class="form-control border-start-0" name="" id="" @input="$emit('FilterData',{name_field:'project_name'});" placeholder="Nhập tên dự án..." v-model="search_value">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            search_value : ""
        }
    },
    methods : {
        RemoveFilter(){
            this.search_value = ""
        }
    }
}
</script>
<style lang="">
    
</style>