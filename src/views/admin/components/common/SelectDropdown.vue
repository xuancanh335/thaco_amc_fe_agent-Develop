<template lang="">
    <div class="input-group flex-grow-1 Ui_SelectDropdown">
        <span class="input-group-text text-muted fw-semibold" id="basic-addon1">
        CHỌN DỰ ÁN
        </span>
        <div class="dropdown">
            <input type="text" class="form-control dropdown-toggle cursor-pointer rounded-0 rounded-end" data-bs-toggle="dropdown" placeholder="Nhập từ khóa cần tìm..." style="width:300px" @click="_Init" @input="FindItem">
            <div class="dropdown-menu overflow-auto h-scrollbar shadow-lg px-1 cursor-pointer" style="max-height:300px;width:max-content">
                <div class="dropdown-item ursor-pointer p-1" @click="SelectItem(item.id)" v-for="(item, index) in DataSearch" :key="index">
                    <p class="mb-0 text-truncate" style="max-width:600px">{{item.project_code}}|{{item.project_name}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props : ['DataSearch'],

    data(){
        return {
            data : [],
            filter_result : []
        }
    },

    methods : {
        _Init(){
            this.data = this.DataSearch
            this.filter_result = this.DataSearch
        },

        FindItem(){
            let a = this.filter_result.filter(item => item.project_code == event.target.value)
            console.log(a)
        },

        SearchValueFormat(str) {
            str = str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return str;
        },


        SelectItem(e){
            console.log(e)
        }
    }
}
</script>
<style lang="scss">
    .Ui_SelectDropdown{
        .dropdown{
            .dropdown-menu{
                .dropdown-item{
                    transition: .1s ease-in-out;
                    &:hover{
                        background:#00529c;
                        color:#FFFFFF;
                        transition: .1s ease-in-out;
                    }
                }
            }
        }
    }
</style>