<template lang="">
    <div class="w-100">
        <div class="input-group flex-grow-1">
            <span v-if="!hide_icon" class="input-group-text text-muted fw-semibold" id="basic-addon1">
                <IconClipboardData :size="22" stroke-width="1" class="d-flex" />
            </span>
            <div class="flex-grow-1">
                <input :id="'Dropdown_' + dropdown_id" :class="{'rounded-0 rounded-end' : !hide_icon, 'form-control-sm' : small}" type="text" class="dropdown-toggle form-control border-start cursor-pointer h-100" readonly data-bs-toggle="dropdown" data-bs-auto-close="outside" placeholder="Chọn dữ liệu đồng bộ..." :value="label_init" :disabled="disabledDropdownTable">

                <div class="dropdown-menu shadow-sm" style="min-width:500px">
                    <div>
                        <input type="text" class="form-control form-sm mb-2" v-model="search_value" @input="SearchValue" placeholder="Nhập từ khóa tìm kiếm ...">
                        <IconSearch :size="20" stroke-width="1" class="d-flex position-absolute top-0 end-0" style="margin:12px 12px" />
                    </div>

                    <div class="table-responsive custom-scrollbar" style="height:310px">
                        <table class='table table-sm table-bordered align-middle' style="font-size:13px">
                            <tbody v-if="data">
                                <tr :class="{'bg-primary bg-opacity-25' : index == selected}" v-for="(item, index) in data" :key="index">
                                    <th>{{item.value}}</th>
                                    <td class="text-nowrap text-truncate" style="max-width:250px">{{item.label}}</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-primary" @click="SelectItem(index,item.value,item.label,item.data)">Chọn</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="d-flex justify-content-center py-2 mt-2">
                        <el-pagination
                            small
                            background
                            layout="prev, pager, next"
                            :total="total"
                            @current-change="changePaginate"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ElPagination } from 'element-plus'
import Icons from '@Admin/common/js/Icons';
var dropdown
export default {
    data(){
        return {
            search_value : "",
            page : 1,
            selected : null,
            label : '',
            dropdown_id : Math.floor(Math.random() * 999999999) + 1
        }
    },
    props : {
        data : Object,
        total : Number,
        hide_icon : Boolean,
        small : Boolean,
        label_init : String,
        id : String,
        disabledDropdownTable: false
    }, 
  
    mounted() {
        document.getElementById('Dropdown_' + this.dropdown_id).addEventListener('hidden.bs.dropdown', this.dropdownHidden)
    },

    beforeDestroy() {
        document.getElementById('Dropdown_' + this.dropdown_id).removeEventListener('hidden.bs.dropdown', this.dropdownHidden)
    },
    methods: { 
        changePaginate(current_page){
            this.selected = null
            this.page = current_page
            this.$emit('handleDropdownTable',{page : this.page, search_value : this.search_value})
        },
        SearchValue(){
            this.selected = null
            this.$emit('handleDropdownTable',{page : this.page, search_value : this.search_value})
        },
        SelectItem(index,value,label,data){
            let dropdown = new bootstrap.Dropdown('#Dropdown_' + this.dropdown_id)
            dropdown.hide()
            this.selected = index
            this.$emit('handleSelectItem',{value : value, label_init : label, data : data})
        },
 
        dropdownHidden() {
            this.search_value = ""
            this.$emit('handleDropdownTable',{page : 1, search_value : ''})
        }
    },
    
    components: {
        ...Icons,
        ElPagination
    }

}
</script>
<style lang="">
    
</style>