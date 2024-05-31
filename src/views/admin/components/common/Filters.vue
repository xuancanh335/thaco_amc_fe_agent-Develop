<template lang="">
    <div class="card-header d-flex">
        <div class="d-flex gap-2 flex-grow-1">
            <div class="d-flex flex-grow-1 gap-2">
                <slot name="extend"></slot>
                <div v-if="AdvancedFilter" @click="show = !show">
                    <a class="btn bg-gradient-green d-flex align-items-center gap-2 p-2 rounded-2 text-white">
                        <IconFilter :size="18" stroke-width="2" class="d-flex" />
                    </a>
                </div>
                <div v-if="date_time">
                    <el-date-picker
                        v-model="date_new"
                        :clearable="true"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="Ngày bắt đầu"
                        end-placeholder="Ngày kết thúc"
                        style="height:37px"
                        :editable="true"
                        :arrow-control="false"
                        value-format="MM/DD/YYYY"
                        format="DD/MM/YYYY"
                        :unlink-panels="true"
                        @change="setDateFilter()"
                    />

                    <!-- <div class="d-flex input-date-startend">
                        <span class="input-group-text text-muted border-end-0 rounded-0 rounded-start" id="basic-addon1">
                            <IconCalendarEvent :size="22" stroke-width="1" class="d-flex" />
                        </span>

                        <VueDatePicker style="width:120px" placeholder="Bắt đầu" auto-apply :format="'dd/MM/yyyy'" class="custom-datepicker icon" v-model="date_start" :enable-time-picker="false" hide-input-icon
                        @update:model-value="setDateFilter" @cleared="setDateFilter"
                        ></VueDatePicker>

                        <div class="d-flex align-items-center arrow">
                            <IconArrowNarrowRight color="#8d96a1" :size="18" stroke-width="1" class="d-flex" />
                        </div>

                        <VueDatePicker style="width:120px" placeholder="Kết thúc" auto-apply :format="'dd/MM/yyyy'" class="custom-datepicker icon" v-model="date_end" :enable-time-picker="false" hide-input-icon
                        @update:model-value="setDateFilter" @cleared="setDateFilter"
                        ></VueDatePicker>

                    </div> -->
                </div>
                <div>
                    <div class="input-group">
                        <input type="text" class="form-control border-end-0" placeholder="Từ khóa cần tìm kiếm ..." style="max-width:300px;width:300px" v-model="keyword" @keydown.enter="setKeywordFilter">
                        <span class="input-group-text bg-gradient-blue bg-opacity-75 cursor-pointer py-0 px-2" @click="setKeywordFilter">
                            <IconSearch :size="26" class="d-flex text-white p-1 rounded-2 hover-find" stroke-width="2" />
                        </span>
                    </div>
                </div>
            </div>
            <slot></slot>
        </div>
    </div><!-- card-header -->
    <div v-if="show" class="card-header d-flex">
        <div class="w-100">
            <div class="card bg-light">
                <div class="card-header">
                    <div class="d-flex w-100">
                        <div class="card-title flex-grow-1">
                            <span>LỌC DỮ LIỆU</span>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <Filters_ProjectName 
                            @FilterData="handleFilters" 
                            ref="Filters_ProjectName"
                            v-if="ApplyFilter && ApplyFilter.includes('project_name')"
                        ></Filters_ProjectName>
                        
                        <Filters_Country 
                            @FilterData="handleFilters" 
                            ref="Filters_Country"
                            v-if="ApplyFilter && ApplyFilter.includes('local')"
                        ></Filters_Country>
                    </div>
                    <div class="row">
                        <Filters_Status 
                            @FilterData="handleFilters" 
                            ref="Filters_Status"
                            v-if="ApplyFilter && ApplyFilter.includes('status')"
                        ></Filters_Status>

                        <Filters_Customers 
                            @FilterData="handleFilters"
                            title="Đơn vị đầu tư"
                            name_field = 'investor_info_name'
                            ref="Filters_CustomersInvestor"
                            v-if="ApplyFilter && ApplyFilter.includes('investor')"
                        ></Filters_Customers>

                        <Filters_Customers
                            @FilterData="handleFilters"
                            title="Đơn vị sử dụng"
                            name_field = 'tenant_used_name'
                            ref="Filters_CustomersTenant"
                            v-if="ApplyFilter && ApplyFilter.includes('tenant_used')"
                        ></Filters_Customers>

                        <Filters_ProjectGroup 
                            @FilterData="handleFilters" 
                            ref="Filters_ProjectGroup"
                            v-if="ApplyFilter && ApplyFilter.includes('project_group')"
                        ></Filters_ProjectGroup>

                    </div>
                    
                    <div class="row mt-3" v-if="ApplyFilter">
                        <div class="col-lg-12">
                            <div class="d-flex gap-2">
                                <button class="btn btn-success d-flex gap-2 align-items-center" @click="ApplyAdvancedFilter">
                                    <IconFilter color="#FFFFFF" :size="18" stroke-width="2" class="d-flex" />
                                    <span>Áp dụng</span>
                                </button>
                                <button @click="RemoveFilter" class="btn bg-secondary bg-opacity-25 text-muted d-flex gap-2 align-items-center">
                                    <IconFilterOff :size="18" stroke-width="2" class="d-flex" />
                                    <span>Bỏ lọc</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- card-header -->
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import VueDatePicker from '@vuepic/vue-datepicker';
import dayjs from 'dayjs';
import Filters_Country from './Filters/Filters_Country.vue'
import Filters_ProjectName from './Filters/Filters_ProjectName.vue'
import Filters_Status from './Filters/Filters_Status.vue'
import Filters_Customers from './Filters/Filters_Customers.vue'
import Filters_ProjectGroup from './Filters/Filters_ProjectGroup.vue'
export default {
    data(){
        return {
            date_new : '',
            filters : {
                request : {
                    start_time : "",
                    end_time : "",
                },
                search_list: [],
            },
            date : [],
            date_start : '',
            date_end : '',
            keyword : "",
            show: false,
        }
    },

    props : {
        date_time : String,
        AdvancedFilter : Boolean,
        ApplyFilter : Array,
        default_date : Boolean,
    },
    mounted(){
        if(this.default_date){
            this.date_new[0] = dayjs().startOf('year').format('YYYY-MM-DD 00:00:00');
            this.date_new[1] = dayjs().endOf('year').format('YYYY-MM-DD 23:59:59');
        }
        this.InitFilter()
    },

    methods: {
        handleFilters(e){
            let filter = {}
            filter.name_field = e.name_field
            filter.value_search = e.search_value
            let objIndex = this.filters.search_list.findIndex((obj => obj.name_field == e.name_field));
            if(objIndex >= 0){
                if(e.search_value){
                    this.filters.search_list[objIndex].value_search = e.search_value
                }else{
                    this.filters.search_list[objIndex].value_search = ""
                }
            }else{
                this.filters.search_list.push(filter)
            }
        },

        setDateFilter(){
            if(Object.keys(this.date_new).length > 0){

                console.log(this.date_new[0])
                console.log(this.date_new[1])



                

                this.filters.request.start_time = dayjs(this.date_new[0]).format('YYYY-MM-DD 00:00:00');
                this.filters.request.end_time = dayjs(this.date_new[1]).format('YYYY-MM-DD 23:59:59');


                console.log(this.filters.request)
            }else{
                this.filters.request.start_time = "";
                this.filters.request.end_time = "";
            }
            this.handleFilter()
        },

        setKeywordFilter(){
            const existingItem = this.filters.search_list.find(item => item.name_field === 'search_field');
            if (existingItem) {
                existingItem.value_search = this.keyword;
            } else {
                this.filters.search_list.push({ name_field: 'search_field', value_search: this.keyword });
            }
            this.handleFilter()
        },
        ApplyAdvancedFilter(){
            this.filters.search_list = this.filters.search_list.filter(item => 
                item.name_field != 'search_field' &&
                item.name_field != 'object_id' &&
                item.name_field != 'object_type'
            )
            this.handleFilter();
        },
        handleFilter(){
            this.$emit('handleFilter',this.filters)
        },
        RemoveFilter(){
            this.filters.search_list = [];
            this.$refs.Filters_ProjectName.RemoveFilter();
            this.$refs.Filters_Country.RemoveFilter();
            this.$refs.Filters_Status.RemoveFilter();
            this.$refs.Filters_CustomersInvestor.RemoveFilter();
            this.$refs.Filters_CustomersTenant.RemoveFilter();
            this.$refs.Filters_ProjectGroup.RemoveFilter();
            this.InitFilter()
            this.handleFilter()
        },
        InitFilter(){
            let query_get = this.$route.query
            if(query_get){                
                query_get.id ?  this.filters.search_list.push({name_field : 'object_id',value_search : query_get.id,}) : false
                query_get.type ? this.filters.search_list.push({name_field : 'object_type',value_search : query_get.type,}) : false
                query_get.status ? this.filters.search_list.push({name_field : 'project_status',value_search : query_get.status,}) : false
                query_get.project_group ? this.filters.search_list.push({name_field : 'project_group_code',value_search : query_get.project_group}) : false
            }
        }
    },
    components :{
        ...Icons,VueDatePicker,
        Filters_Country,Filters_ProjectName,Filters_Status,Filters_Customers,Filters_ProjectGroup
    }
}
</script>
<style lang="scss">

</style>