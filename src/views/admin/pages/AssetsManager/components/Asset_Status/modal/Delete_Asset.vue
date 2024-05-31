<template lang="">
    <div v-if="modal.show" class="h-100 w-100 bg-dark bg-opacity-50 position-fixed d-flex align-items-center justify-content-center top-0 start-0" style="z-index:999999">
        <div class="bg-white p-4 rounded-3" style="width:500px">
            <div class="d-flex">
                <div class="d-flex gap-3">
                    <div>
                        <div class="bg-danger bg-opacity-10 p-3 rounded-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" size="40" class="d-flex text-danger"><path d="M12 1.67c.955 0 1.845 .467 2.39 1.247l.105 .16l8.114 13.548a2.914 2.914 0 0 1 -2.307 4.363l-.195 .008h-16.225a2.914 2.914 0 0 1 -2.582 -4.2l.099 -.185l8.11 -13.538a2.914 2.914 0 0 1 2.491 -1.403zm.01 13.33l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007zm-.01 -7a1 1 0 0 0 -.993 .883l-.007 .117v4l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4l-.007 -.117a1 1 0 0 0 -.993 -.883z" stroke-width="0" fill="currentColor"></path></svg>
                        </div>
                    </div>
                    <div class="flex-grow-1">
                        <h5>Xóa hạng mục</h5>
                        <p class="mb-0 text-muted">
                            Bạn chắc chắn muốn xóa dữ liệu. Hành động này không thể được hoàn tác
                        </p>
                    </div>
                </div>
                <div>
                    <IconX :size="24" class="d-flex text-muted" @click="this.Display(false)" stroke-width="1" />
                </div>
            </div>
            <div class="d-flex justify-content-end gap-2 mt-4">
                <button type="button" class="btn bg-secondary bg-opacity-25" @click="Display(false)">Hủy bỏ</button>
                <button type="button" class="btn btn-danger bg-gradient" @click="CreateLegal">Xóa Dữ Liệu</button>
            </div>
        </div>
    </div>
</template>
<script>

import {IconFilter,IconSearch,IconUser,IconX, IconBriefcase, IconPlus, IconDimensions,IconCalendar,IconBuildingCommunity,IconRefresh,IconDotsVertical,IconEye,IconBrowserPlus,IconDatabaseEdit,IconPencil} from '@tabler/icons-vue';
import{useProjectStore} from '@Store'
import axios from 'axios'
const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import {ShowToast} from '@Helpers/Notify.js'
import VueDatePicker from '@vuepic/vue-datepicker';

export default {
    components: {
        VueDatePicker,
        IconSearch, IconBriefcase,IconDimensions,IconCalendar,IconUser,IconBuildingCommunity,IconRefresh,IconDotsVertical,IconEye,IconPlus, IconFilter,IconBrowserPlus,IconX,IconDatabaseEdit,IconPencil,
    },
    data(){
        return {
            id : null,
            modal : {
                show : false,
            },
            data : {
                status_content : '',
                tenant_id : authorize.tenant_id
            }
        }
    },
    methods : {
        async CreateLegal(){            
            try {
                const params = {
                    item        : this.id,
                    tenant_id   : authorize.tenant_id
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/asset-status/delete',params,config)
                .then(async res => {
                    this.Display(false)
                    ShowToast({status_code : 200, message : 'Xóa hạng mục thành công'});
                    this.$emit('ReloadData');
                })
                .catch(err => {
                   
                })
            } catch (err) {
                console.log(err)
            }
        },

        Display(value,data){
            this.modal.show = value
            this.id = data
        }
    }
}
</script>
<style lang="">
    
</style>