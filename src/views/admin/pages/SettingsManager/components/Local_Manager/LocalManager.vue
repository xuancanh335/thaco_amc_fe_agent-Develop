<template lang="">
    <div class="tab-pane h-100 fade show" id="local-manager-pane" role="tabpanel">
        <Create_Modal ref="CreateModal" @RefreshData="RefreshData"></Create_Modal>
        <Delete_Modal ref="DeleteModal" @RefreshData="RefreshData"></Delete_Modal>
        <Update_Modal ref="UpdateModal" @RefreshData="RefreshData"></Update_Modal>

        <div class="row" style="zoom:108%">
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header p-2">
                        <div class="w-100 d-flex align-items-center justify-content-between">
                            <h6 class="mb-0 ps-2 fw-semibold flex-grow-1">DANH SÁCH QUỐC GIA</h6>
                            <div :class="{'show' : country_order}" class="d-flex justify-content-end gap-1 me-2 order-list">
                                <a
                                    @click="[$refs.UpdateModal.Update_Order(order.country),country_order = false]"
                                    class="cursor-pointer bg-success p-1 px-2 rounded-1 text-white" style="font-size:12px">Lưu vị trí</a>
                                <a @click="country_order = false" class="cursor-pointer bg-secondary bg-opacity-50 p-1 px-2 rounded-1 text-white" style="font-size:12px">Hủy</a>
                            </div>
                            <div @click="$refs.CreateModal._Init({region_type : 0,})">
                                <IconPlus :size="26" stroke-width="2" class="d-flex bg-success rounded-circle p-1 text-white cursor-pointer hover-jello" />
                            </div>
                        </div>
                    </div>
                    <div class="p-3 card-body d-flex flex-column gap-3 overflow-auto custom-scrollbar" style="height:70vh">
                        <draggable
                            id="country"
                            class="d-flex flex-column gap-2"
                            tag="transition-group"
                            :component-data="{
                            tag: 'div',
                            type: 'transition-group',
                            name: !drag ? 'flip-list' : null
                            }"
                            v-model="country"
                            v-bind="dragOptions"
                            :move="checkMove"
                            @start="drag = true"
                            @end="drag = false"
                            item-key="order"
                            handle=".drag-point"
                        >
                            <template #item="{ element }">
                                <div @click="SelectCountry(element.id)" class="card cursor-pointer local-inner" :class="{'active' : element.active}">
                                    <div class="card-body d-flex align-items-center" style="padding:10px;" data-core="aksgdahskd">
                                        <div class="flex-grow-1 d-flex align-items-center gap-2">
                                            <div class="drag-point">
                                                <IconArrowsMove :size="18" stroke-width="1" class="d-flex cursor-pointer" />
                                            </div>
                                            <h6 class="card-title mb-0">{{element.country_code}} | {{element.country_name}}</h6>
                                        </div>
                                        <div class="d-flex gap-1 align-items-center">
                                            <div @click="$refs.UpdateModal._Init({item : element.id, region_type : 0,})">
                                                <IconPencil :size="18" stroke-width="2" class="d-flex rounded-3 text-primary cursor-pointer hover-jello" />
                                            </div>
                                            <div @click="$refs.DeleteModal._Init({item : element.id, region_type : 0,})">
                                                <IconX :size="18" stroke-width="2" class="d-flex rounded-3 text-danger cursor-pointer hover-jello" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header p-2">
                        <div class="w-100 d-flex align-items-center justify-content-between">
                            <h6 class="mb-0 ps-2 fw-semibold flex-grow-1">DANH SÁCH TỈNH / THÀNH PHỐ</h6>
                            <div :class="{'show' : province_order}" class="d-flex justify-content-end gap-1 me-2 order-list">
                                <a
                                    @click="[$refs.UpdateModal.Update_Order(order.province),province_order = false]"
                                    class="cursor-pointer bg-success p-1 px-2 rounded-1 text-white" style="font-size:12px">Lưu vị trí</a>
                                <a @click="province_order = false" class="cursor-pointer bg-secondary bg-opacity-50 p-1 px-2 rounded-1 text-white" style="font-size:12px">Hủy</a>
                            </div>
                            <div v-if="country_selected !== null" @click="$refs.CreateModal._Init({region_type : 1, id_parent : country_selected})">
                                <IconPlus :size="26" stroke-width="2" class="d-flex bg-success rounded-circle p-1 text-white cursor-pointer hover-jello" />
                            </div>
                            <div v-else>
                                <IconPlus :size="26" stroke-width="2" class="d-flex bg-secondary bg-opacity-25 rounded-circle p-1 text-white" />
                            </div>
                        </div>
                    </div>
                    <div class="p-3 card-body d-flex flex-column gap-3 overflow-auto custom-scrollbar position-relative" style="height:70vh">
                        <div v-if="province.length == 0" class="bg-light position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center justify-content-center" style="z-index:9">
                            <div class="d-flex justify-content-center flex-column align-items-center">
                                <img src="/assets/images/choice_maps.webp" class="w-50 mix-blend-multiply" style="filter: grayscale(.8);" alt="" srcset="">
                                <h6 class="fw-medium text-secondary" style="margin-top:-30px">CHƯA CHỌN QUỐC GIA</h6>
                            </div>
                        </div>
                        <draggable
                            id="province"
                            class="d-flex flex-column gap-2"
                            tag="transition-group"
                            :component-data="{
                            tag: 'div',
                            type: 'transition-group',
                            name: !drag ? 'flip-list' : null
                            }"
                            :move="checkMove"
                            v-model="province"
                            v-bind="dragOptions"
                            @start="drag = true"
                            @end="drag = false"
                            item-key="order"
                            handle=".drag-point"
                        >
                            <template #item="{ element }">
                                <div @click="SelectProvince(element.id)" class="card cursor-pointer local-inner" :class="{'active' : element.active}">
                                    <div class="card-body d-flex align-items-center" style="padding:10px;">
                                        <div class="flex-grow-1 d-flex align-items-center gap-2">
                                            <div class="drag-point">
                                                <IconArrowsMove :size="18" stroke-width="1" class="d-flex cursor-pointer" />
                                            </div>
                                            <h6 class="card-title mb-0">{{element.province_code}} | {{element.province_name}}</h6>
                                        </div>
                                        <div class="d-flex gap-1 align-items-center">
                                            <div @click="$refs.UpdateModal._Init({item : element.id, region_type : 1,})">
                                                <IconPencil :size="18" stroke-width="2" class="d-flex rounded-3 text-primary cursor-pointer hover-jello" />
                                            </div>
                                            <div @click="$refs.DeleteModal._Init({item : element.id, region_type : 1,})">
                                                <IconX :size="18" stroke-width="2" class="d-flex rounded-3 text-danger cursor-pointer hover-jello" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header p-2">
                        <div class="w-100 d-flex align-items-center justify-content-between">
                            <h6 class="mb-0 ps-2 fw-semibold flex-grow-1">DANH SÁCH QUẬN / HUYỆN</h6>
                            <div :class="{'show' : district_order}" class="d-flex justify-content-end gap-1 me-2 order-list">
                                <a
                                    @click="[$refs.UpdateModal.Update_Order(order.district),district_order = false]"
                                    class="cursor-pointer bg-success p-1 px-2 rounded-1 text-white" style="font-size:12px">Lưu vị trí</a>
                                <a @click="district_order = false" class="cursor-pointer bg-secondary bg-opacity-50 p-1 px-2 rounded-1 text-white" style="font-size:12px">Hủy</a>
                            </div>

                            <div v-if="province_selected !== null" @click="$refs.CreateModal._Init({region_type : 2, id_parent : province_selected})">
                                <IconPlus :size="26" stroke-width="2" class="d-flex bg-success rounded-circle p-1 text-white cursor-pointer hover-jello" />
                            </div>
                            <div v-else>
                                <IconPlus :size="26" stroke-width="2" class="d-flex bg-secondary bg-opacity-25 rounded-circle p-1 text-white" />
                            </div>
                        </div>
                    </div>
                    <div class="p-3 card-body d-flex flex-column gap-3 position-relative overflow-auto custom-scrollbar" style="height:70vh">
                        <div v-if="district.length == 0" class="bg-light position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center justify-content-center" style="z-index:9">
                            <div class="d-flex justify-content-center flex-column align-items-center">
                                <img src="/assets/images/choice_maps.webp" class="w-50 mix-blend-multiply" style="filter: grayscale(.8);" alt="" srcset="">
                                <h6 class="fw-medium text-secondary" style="margin-top:-30px">CHƯA CHỌN QUẬN / HUYỆN</h6>
                            </div>
                        </div>
                        <draggable
                            id="district"
                            class="d-flex flex-column gap-2"
                            tag="transition-group"
                            :component-data="{
                            tag: 'div',
                            type: 'transition-group',
                            name: !drag ? 'flip-list' : null
                            }"
                            :move="checkMove"
                            v-model="district"
                            v-bind="dragOptions"
                            @start="drag = true"
                            @end="drag = false"
                            item-key="order"
                            handle=".drag-point"
                        >
                            <template #item="{ element }">
                                <div class="card cursor-pointer" :class="{'bg-gradient-blue text-white' : index == 0}">
                                    <div class="card-body d-flex align-items-center" style="padding:10px;">
                                        <div class="flex-grow-1 d-flex align-items-center gap-2">
                                            <div class="drag-point">
                                                <IconArrowsMove :size="18" stroke-width="1" class="d-flex cursor-pointer" />
                                            </div>
                                            <h6 class="card-title mb-0">{{element.district_code}} | {{element.district_name}}</h6>
                                        </div>
                                        <div class="d-flex gap-1 align-items-center">
                                            <div @click="$refs.UpdateModal._Init({item : element.id, region_type : 2,})">
                                                <IconPencil :size="18" stroke-width="2" class="d-flex rounded-3 text-primary cursor-pointer hover-jello" />
                                            </div>
                                            <div @click="$refs.DeleteModal._Init({item : element.id, region_type : 2,})">
                                                <IconX :size="18" stroke-width="2" class="d-flex rounded-3 text-danger cursor-pointer hover-jello" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import Icons from '@Admin/common/js/Icons';

import Create_Modal from './modal/Create_Modal.vue'
import Update_Modal from './modal/Update_Modal.vue'
import Delete_Modal from './modal/Delete_Modal.vue'

import draggable from "vuedraggable";
import Paginate from '@Admin/components/common/Paginate.vue'
import Filters from '@Admin/components/common/Filters.vue';
const auth = JSON.parse(localStorage.getItem('authorize'))
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const APP_PATH = import.meta.env.VITE_APP_PATH;

export default {
    data(){
        return{
            paginate : {
                total : 1,
                limit : 10,
                page : 1,
            },
            order : {},
            country : [],
            country_order : false,
            province_order : false,
            district_order : false,

            province : [],
            district : [],
            country_selected : null,
            province_selected : null,
            filters : {
                // request : {
                //     start_time : null,
                //     end_time : null,
                // },
            },
            data :[],
            dragging: true,
        }
    },

    created(){
        this._Init();
    },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
        },

        SelectCountry(e){
            this.province_selected = null
            this.country_selected = e
            this.district = []
            this.province.map(item => item.active = false)
            this.country.map(item => {item.id == e ? item.active = true : item.active = false})
            let country = this.data.find(item => item.id == e)
            this.province = country.dataProvince
        },

        SelectProvince(e){
            this.province_selected = e
            this.province.map(item => {item.id == e ? item.active = true : item.active = false})
            let province = this.province.find(item => item.id == e)
            this.district = province.dataDistrict
        },


        add: function() {
            this.list.push({ name: "Juan " + id, id: id++ });
        },
        replace: function() {
            this.list = [{ name: "Edgard", id: id++ }];
        },
        checkMove: function(e) {
            if(e.from.id == 'country'){
                this.country_order = true
            }
            if(e.from.id == 'province'){
                this.province_order = true
            }
            if(e.from.id == 'district'){
                this.district_order = true
            }
           
        },

        RefreshData(e){
            if (e !== null && e !== undefined && e !== '' && e !== 0) {
                if(e.region_type === 1){
                    if(e.delete_item && e.delete_item != '' && e.delete_item !== undefined){
                        let check_exits = this.province.findIndex(item => item.id === e.delete_item)
                        this.province.splice(check_exits, 1);
                    }else{
                        let check_exits = this.province.findIndex(item => item.id === e.data.id)
                        if(check_exits !== -1){
                            this.province[check_exits] = {
                                ...this.province[check_exits],
                                province_code: e.data.region_code,
                                province_name: e.data.region_name,
                                description : e.data.description,
                            }
                        }else{
                            this.province.unshift({
                                id: e.data.id,
                                province_code: e.data.region_code,
                                province_name: e.data.region_name,
                                id_parent: e.data.id_parent,
                                region_stt: e.data.region_stt,
                                region_type : e.data.region_type,
                                description : e.data.description,
                                dataDistrict : [],
                            })
                        }
                    }
                }
                else if(e.region_type === 2){
                    if(e.delete_item && e.delete_item != '' && e.delete_item !== undefined){
                        let check_exits = this.district.findIndex(item => item.id === e.delete_item)
                        this.district.splice(check_exits, 1);
                    }else{
                        let check_exits = this.district.findIndex(item => item.id === e.data.id)
                        if(check_exits !== -1){
                            this.district[check_exits] = {
                                ...this.district[check_exits],
                                district_code: e.data.region_code,
                                district_name: e.data.region_name,
                                description : e.data.description,
                            }
                        }else{
                            this.district.unshift({
                                id: e.data.id,
                                district_code: e.data.region_code,
                                district_name: e.data.region_name,
                                id_parent: e.data.id_parent,
                                region_stt: e.data.region_stt,
                                region_type : e.data.region_type,
                                description : e.data.description,
                            })
                        }
                    }
                }else{this.getData()}
            }else{this.getData()}
        },

        getData(){
            this.province = []
            this.district = []
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(PATH_API_USER + '/region/get-all',params,config)
                .then(async res => {
                    this.data = res.data.data.dataCountry
                    this.country = []
                    this.data.forEach(country => {
                        let arr = {
                            id              :   country.id,
                            country_code    :   country.country_code,
                            country_name    :   country.country_name,
                            region_stt      :   country.region_stt
                        }
                        this.country.push(arr)
                        this.province = []
                    });
                })
                .catch(err => {})
            }
            catch (err) {
                console.log(err)
            }
        }

    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }

    },
    components: {
        ...Icons,
        Create_Modal,Update_Modal,Delete_Modal,
        Paginate,Filters,draggable,
    },

    watch : {
        country(new_value,old_value){
            let arr = []
            new_value.map((item,key) => {
                let data = {
                    id: item.id,
                    region_stt: key
                }
                arr.push(data)
            })
            this.order.country = arr
        },
        province(new_value,old_value){
            let arr = []
            new_value.map((item,key) => {
                let data = {
                    id: item.id,
                    region_stt: key
                }
                arr.push(data)
            })
            this.order.province = arr
        },
        district(new_value,old_value){
            let arr = []
            new_value.map((item,key) => {
                let data = {
                    id: item.id,
                    region_stt: key
                }
                arr.push(data)
            })
            this.order.district = arr
        },
    }
}
</script>
<style lang="scss">

.order-list {
    opacity: 0;
    transition: .1s ease-in-out;
    transform: translateX(10px);
    &.show{
        opacity: 1;
        transition: .1s ease-in-out;
        transform: translateX(0px);
    }
}

.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: rgb(155, 197, 255);
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.local-inner{
    transition: .3s ease-in-out;
    &.active{
        background: #0773ff;
        color: #FFFFFF;
        box-shadow: 0px 6px 14px -6px #08006682;
        border-color: #0773ff;
        svg{color:#FFFFFF!important}
    }
    &:hover{
        background: #0773ff;
        color: #FFFFFF;
        box-shadow: 0px 6px 14px -6px #08006682;
        border-color: #0773ff;
        svg{color:#FFFFFF!important}
    }
}
</style>