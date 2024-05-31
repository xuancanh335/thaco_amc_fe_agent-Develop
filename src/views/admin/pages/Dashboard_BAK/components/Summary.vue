<template lang="">
    <div class="row mb-4">
        <div class="col-lg-3">
            <div class="card card-one bg-gradient-blue bubble-decor-1 overflow-hidden">
                <div class="card-body p-3">
                    <div class="d-flex d-sm-block d-xl-flex align-items-center">
                        <div class="helpdesk-icon bg-white text-gradient-blue">
                            <IconChartTreemap :size="42" class="d-flex" stroke-width="2" />
                        </div>
                        <div class="ms-3 ms-sm-0 ms-xl-3 mt-sm-3 mt-xl-0">
                            <label class="card-label fs-lg fw-medium mb-1 text-white">Tổng số dự án</label>
                            <h1 class="card-value d-flex align-items-baseline mb-0 text-white">
                                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='data.total_project' :duration='.3' :autoinit='true' style="font-weight:900!important"/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-one bg-gradient-green bubble-decor-1 overflow-hidden">
                <div class="card-body p-3">
                    <div class="d-flex d-sm-block d-xl-flex align-items-center">
                        <div class="helpdesk-icon bg-white text-gradient-green">
                            <IconFlag :size="42" class="d-flex " stroke-width="2" />
                        </div>
                        <div class="ms-3 ms-sm-0 ms-xl-3 mt-sm-3 mt-xl-0">
                            <label class="card-label fs-lg fw-medium mb-1 text-white">Dự án hoàn thành</label>
                            <h1 class="card-value d-flex align-items-baseline mb-0 text-white" style="font-weight:900!important">
                                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='data.project_status_done' :duration='.3' :autoinit='true' style="font-weight:900!important"/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-one bg-gradient-yellow bubble-decor-1 overflow-hidden">
                <div class="card-body p-3">
                    <div class="d-flex d-sm-block d-xl-flex align-items-center">
                        <div class="helpdesk-icon bg-white text-gradient-yellow">
                            <IconRun :size="42" class="d-flex" stroke-width="2" />
                        </div>
                        <div class="ms-3 ms-sm-0 ms-xl-3 mt-sm-3 mt-xl-0">
                            <label class="card-label fs-lg fw-medium mb-1 text-white">Dự án đang triển khai</label>
                            <h1 class="card-value d-flex align-items-baseline mb-0 text-white fw-bold">
                                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='data.project_status_in_progress' :duration='.3' :autoinit='true' style="font-weight:900!important"/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="card card-one bg-gradient-magenta bubble-decor-1 overflow-hidden">
                <div class="card-body p-3">
                    <div class="d-flex d-sm-block d-xl-flex align-items-center">
                        <div class="helpdesk-icon bg-white text-gradient-magenta">
                            <IconFlask :size="42" class="d-flex" stroke-width="2" />
                        </div>
                        <div class="ms-3 ms-sm-0 ms-xl-3 mt-sm-3 mt-xl-0">
                            <label class="card-label fs-lg fw-medium mb-1 text-white">Dự án Chưa thực hiện</label>
                            <h1 class="card-value d-flex align-items-baseline mb-0 text-white fw-bold">
                                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='data.project_status_open' :duration='.3' :autoinit='true' style="font-weight:900!important"/>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icons from '@Admin/common/js/Icons';
import axios from 'axios'
const API_PROJECT_PATH = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'
import {ShowToast} from '@Helpers/Notify.js'
import Vue3autocounter from 'vue3-autocounter';
export default {
    data(){
        return {
            data : {
                total_project               : 0,
                project_status_open         : 0,
                project_status_in_progress  : 0,
                project_status_done         : 0
            }
        }
    },
    components : {
        ...Icons,Vue3autocounter
    },
    methods: {
        GetSummary(e){
            try {
                const params = {
                    lstObject : e.tenant_selected,
                    is_group : e.is_group
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project',params,config)
                .then(async res => {
                    this.data = res.data.data
                })
                .catch(err => {
                    
                })
            } catch (err) {
                console.log(err)
            }
        },
    },
}
</script>
<style lang="scss">
    .bg-gradient-blue{
        background: linear-gradient(193deg, #5581F1 26%, #1153FC);
    }
    .text-gradient-blue{
        color:#4173f4
    }

    .bg-gradient-green{
        background: linear-gradient(23deg, #00afcb 26%, #00d9c3)
    }
    .text-gradient-green{
        color:#00afcb
    }


    .bg-gradient-yellow{
        background: linear-gradient(23deg, #ffa400 26%, #ffc824);
    }
    .text-gradient-yellow{
        color:#ffa400
    }

    .bg-gradient-magenta{
        background: linear-gradient(23deg, #e74e79 26%, #ff6b93)
    }
    .text-gradient-magenta{
        color:#e74e79
    }

    .bubble-decor-1{
        &:after{
                content: '';
                background: linear-gradient(90deg, #ffffff1b, transparent);
                width: 200px;
                height: 200px;
                position: absolute;
                border-radius: 100%;
                right: -64px;
                bottom: -92px;
                transition: .3s ease-in-out;
            }
        &:hover{
            &:after{
                content: '';
                width: 250px;
                height: 250px;
                right: -80px;
                bottom: -20px;
                transform: rotate(45deg);
                transition: 1s cubic-bezier(0.860, 0.000, 0.070, 1.000);
            }
        }
    }
</style>