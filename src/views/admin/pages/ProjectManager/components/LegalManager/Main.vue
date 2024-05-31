<template lang="">
    
    <div class="row">
        <div class="col-lg-12">
            <div v-if="$CheckPermission('Planning_Legal','is_show')">
                <Planning_Legal 
                    v-if="data.dataPlanningLegal" 
                    :data="data.dataPlanningLegal"
                    :slug="'PlanningLegal'"
                    :ProjectId = "data.projectData.id"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Planning_Legal>
            </div>
            
            <div v-if="$CheckPermission('Invest_Legal','is_show')">
                <Invest_Legal 
                    v-if="data.dataInvestLegal" 
                    :data="data.dataInvestLegal"
                    :slug="'InvestLegal'"
                    :ProjectId = "data.projectData.id"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Invest_Legal>
            </div>

            <div v-if="$CheckPermission('Land_Legal','is_show')">
                <Land_Legal 
                    v-if="data.dataLandLegal" 
                    :data="data.dataLandLegal"
                    :slug="'LandLegal'"
                    :ProjectId = "data.projectData.id"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Land_Legal>
            </div>
            
            <div v-if="$CheckPermission('Construction_Legal','is_show')">
                <Construction_Legal 
                    v-if="data.dataConstructionLegal" 
                    :data="data.dataConstructionLegal"
                    :slug="'ConstructionLegal'"
                    :ProjectId = "data.projectData.id"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Construction_Legal>
            </div>
            
            <div v-if="$CheckPermission('Acceptance_Legal','is_show')">
                <Acceptance_Legal 
                    v-if="data.dataAcceptanceLegal" 
                    :data="data.dataAcceptanceLegal"
                    :ProjectId = "data.projectData.id"
                    :slug="'AcceptanceLegal'"
                    @Display="Display_AddNewLegal"
                    @ReloadData="GetProjectById"
                    :view="view"
                ></Acceptance_Legal>
            </div>
        </div>
    </div>

    <div class="modal-footer position-absolute bottom-0 start-0 w-100 bg-white" v-if="!view" style="z-index: 9999;">
        <button type="button" class="btn bg-secondary bg-opacity-25" data-bs-dismiss="modal">Hủy bỏ</button>
        <!-- <button type="button" class="btn btn-success" @click="UpdateProject">Cập nhật dự án</button> -->
    </div>

</template>
<script>
import Icons from '@Admin/common/js/Icons';

import axios from 'axios'
import dayjs from 'dayjs';

//Libary
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Land_Legal from './Land_Legal/Main.vue';
import Planning_Legal from './Planning_Legal/Main.vue';
import Construction_Legal from './Construction_Legal/Main.vue';
import Acceptance_Legal from './Acceptance_Legal/Main.vue';
import Invest_Legal from './Invest_Legal/Main.vue';


const apiProject = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'
import {ShowToast} from '@Helpers/Notify.js'
import { directive as VNumber } from '@coders-tm/vue-number-format'
import { CheckPermission } from '@Helpers/utils.js';
export default {
    data(){
        return {
            view : false,
            tenant : [],
            customer : [],
            proposal : [],
            status : [],
            project_create_time : null,
            data : {
                status_content : '',
            },
            show : {
                add_landlegal : false
            },
            formatInput : null,
            location : null,
            province : null,
            districts : null,
            number: {
                decimal: ',',
                separator: 'ꓸ',
                precision: 2,
                masked: true,
            },
            init : [],
        }
    },
    components: {
        ...Icons,
        VueDatePicker,
        Land_Legal,Planning_Legal,Construction_Legal,Acceptance_Legal,Invest_Legal
    },

    mounted(){
        var Modal = document.getElementById('Modal_UpdateProject')
        var vm = this
        Modal.addEventListener('show.bs.modal', async function (event) {
            var id = Modal.getAttribute('data-id');
            var type_modal = await Modal.getAttribute('data-modal');
            type_modal == "view" ? vm.view = true : vm.view = false
            const ProjectStore = useProjectStore();
            ProjectStore.SetState({project_id : id})
        })
    },
    directives: { 
        number: VNumber,
    },
    methods : {
        async _Init(value){
            value ? this.data = value : false
            await this.GetTenantData()
            await this.GetStatusProject();
            await this.GetTenantData()
            await this.GetCustomerData()
            await this.GetLocations()
            
            // await this.GetCustomerData()
            // await this.GetBankData()
        },

        GetLocations(){
            const ProjectStore = useProjectStore();
            ProjectStore.GetLocations
            this.location = ProjectStore.GetLocations
        },
        SelectCountry(){
            this.data.projectData.province_id = ''
            this.data.projectData.district_id = ''
        },
        ChangeProvices(){
            this.data.projectData.district_id = ''
        },
        SelectProvices(){
            let data = this.location.find(item => item.id == this.data.projectData.country_id)
            this.province = data.dataProvince
        },
        SelectDistrict(){
            let data = this.province.find(item => item.id == this.data.projectData.province_id)
            this.districts = data.dataDistrict
        },
        GetStatusProject(){
            try {
                const params = this.data.projectData
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/get-status-json/get-status-legal-project',params,config)
                .then(async res => {
                    const ProjectStore = useProjectStore();
                    ProjectStore.SetStatus(res.data)
                    this.status = res.data
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },
        async UpdateProject(){
            try {
                let params = this.data.projectData
                params.total_area = await parseFloat(String(params.total_area).replace(/ꓸ/g,'').replace(',','.'))
                params.estimated_investment_value = await parseFloat(String(params.estimated_investment_value).replace(/ꓸ/g,'').replace(',','.'))
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project/update',params,config)
                .then(async res => {
                    this.$emit('RefreshData');
                    ShowToast({status_code : 200, message : 'Cập nhật dự án thành công'});
                })
                .catch(err => {
                    let res = err.response.data.error_code
                    switch (res) {
                        case 162:   ShowToast({status_code : 401, message : 'Tên dự án đã tồn tại'});
                        case 32 :   ShowToast({status_code : 401, message : 'Không tìm thấy dự án'});
                        break;
                    }
                })
            } catch (err) {
                console.log(err)
            }
        },
        GetProjectById(){
            var Modal = document.getElementById('Modal_UpdateProject')
            var id = Modal.getAttribute('data-id');
            try {
                const params = {
                    item        : id,
                    tenant_id   : authorize.tenant_id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiProject + '/project/get-by-id',params,config)
                .then(async res => {
                    this.data = await res.data.data
                    await this.SelectProvices()
                    await this.SelectDistrict()
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetTenantData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    // tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiUser + '/tenant/get-all',params,config)
                .then(async res => {
                    this.tenant = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        GetCustomerData(){
            try {
                const params = {
                    page        : 0,
                    limit       : 0,
                    //tenant_id   : authorize.tenant_id,
                    flag        : true
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(apiUser + '/customer/get-all',params,config)
                .then(async res => {
                    this.customer = res.data.data.items
                })
                .catch(err => {
                    console.error(err); 
                })
            } catch (err) {
                console.log(err)
            }
        },

        formatInput(event) {
            let a = event.target.value.replace(/[^\d,]/g, '');
        },
        CheckPermission
    }
}
</script>
<style lang="scss">
    .hide-arrow-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
</style>