<template lang="">
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Nhóm dự án</span>
                <!-- <select name="" id="" class="form-control border-start-0" @input="$emit('FilterData',{name_field:'project_group_code'});" v-model="search_value">
                    <option value="">---CHỌN NHÓN DỰ ÁN---</option>
                    <option value="0">Dự án chính</option>
                    <option value="1">Dự án con</option>
                    <option value="2">Dự án nâng cấp - cải tạo</option>
                </select> -->
                <el-select
                    v-model="search_value"
                    multiple
                    collapse-tags
                    collapse-tags-tooltip
                    placeholder="Chọn nhóm dự án..."
                    style="width: 240px"
                    @change="$emit('FilterData',{name_field:'project_group_code',search_value : FilterValue()});"
                    :teleported="false"
                    class="custom-selectbox flex-grow-1"
                >
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
                </el-select>

            </div>
        </div>
    </div>
</template>
<script>
import { ElSelect,ElOption } from 'element-plus'
export default {
    data(){
        return {
            value3 : [],
            options : [
                {
                    label : 'Dự án chính',
                    value : 0
                },
                {
                    label : 'Dự án con',
                    value : 1
                },
                {
                    label : 'Dự án nâng cấp - cải tạo',
                    value : 2
                },
            ],
            search_value : ""
        }
    },

    async mounted(){
        let query_get = this.$route.query
        if(query_get){
            if(query_get.project_group){
                let search = query_get.project_group.split(",")
                search = search.map(Math.floor)
                this.search_value = search
            }
        }
    },

    methods : {
        RemoveFilter(){
            this.search_value = ""
        },
        FilterValue(){
            return this.search_value ? this.search_value.toString() : ""
        }
    },
    components : {ElSelect,ElOption}
}
</script>
<style lang="">
    
</style>