<template lang="">
    <div v-if="statusItem = StatusDisplay(status_content)">
        <div class="dropdown">
            <button class="btn border-0 fs-xs text-white text-nowrap px-1 py-0" type="button" data-bs-toggle="dropdown" aria-expanded="false"
            :style="{ backgroundColor : '#' + statusItem.color}" style="width:140px" data-boundary="window"
            >
                {{ statusItem.value }}
            </button>
            <ul class="dropdown-menu fs-xs">
                <li v-for="(item, index) in status" :key="index">
                    <a class="dropdown-item text-white text-center mb-1 p-1 cursor-pointer" @click="ChangeStatus({status : item, data : data})" :style="{ backgroundColor : '#' + item.color}">{{item.value}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import{useProjectStore} from '@Store'
export default {
    data(){
        return{
            status : [],
        }
    },
    props:['status_content','data','dropdown'],
    created(){
        const ProjectStore = useProjectStore();
        this.status = ProjectStore.GetStatus
    },
    methods : {
        ChangeStatus(status){
            this.$emit('ProjectStatus',status)
        },
        StatusDisplay(status){
            const checkStatus = this.status.find(item => item.id == status);
            return checkStatus || null;
        }
    }
}
</script>
<style lang="">
    
</style>