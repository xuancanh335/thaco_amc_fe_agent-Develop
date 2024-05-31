<template lang="" >
    <div>
        <div class="row">
            <div class="col-lg-12">
                <Summary ref="Summary" @SelectStatus="SelectSummary"></Summary>
            </div>   
        </div>
        
        <div class="row">

            <div class="col-lg-4" :class="{'mb-3' : CheckAccount()}">
                <div class="card h-100" style="min-height:350px;max-height:350px">
                    <button v-if="!CheckAccount()" @click="chart_estimate = !chart_estimate" class="position-absolute btn btn-info text-white hover-jello btn-sm end-0 mt-3 me-3 p-0" style="z-index:9">
                        <IconArrowsExchange :size="28" stroke-width="2" class="d-flex p-1" />
                    </button>
                    <div class="card-body" v-show="chart_estimate">
                        <Charts ref="ChartEstimate" :id="'ChartEstimate'"></Charts>
                    </div>
                    <div v-if="!CheckAccount()" class="card-body" v-show="!chart_estimate">
                        <Charts ref="ChartReception" :id="'ChartReception'"></Charts>
                    </div>
                </div>
            </div>

            <div class="col-lg-8 mb-3" v-if="CheckAccount()">
                <div class="card h-100">
                    <div class="card-header d-flex align-items-center p-3">
                        <h6 class="card-title mb-0">Danh sách đơn vị thành viên</h6>
                        <nav class="nav nav-icon nav-icon-sm ms-auto">
                            <a href="" class="nav-link"><i class="ri-refresh-line"></i></a>
                            <a href="" class="nav-link"><i class="ri-more-2-fill"></i></a>
                        </nav>
                    </div>
                    <!-- card-header -->
                    <div class="card-body p-3">
                        <div class="d-flex flex-column gap-3">
                            <div class="table-responsive overflow-auto h-scrollbar" style="max-height:250px;">
                                <table class="table table-hover table-borderless align-middle table-tenant mb-0" style="width:100%">
                                    <thead>
                                        <tr>
                                            <td width="30%">
                                                <span class="ps-3">Tên đơn vị</span>
                                            </td>
                                            <td class="text-center">
                                                <label class="d-block text-dark fs-sm mb-1">Tổng dự án</label>
                                            </td>
                                            <td class="text-center">
                                                <label class="d-block text-dark fs-sm mb-1">Đang triển khai</label>
                                            </td>
                                            <td class="text-center">
                                                <label class="d-block text-dark fs-sm mb-1">Hoàn thành</label>
                                            </td>
                                            <td class="text-center">
                                                <label class="d-block text-dark mb-1">Chưa thực hiện</label>
                                            </td>

                                            <td class="text-center">
                                                <label class="d-block text-dark mb-1">Tạm dừng</label>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr 
                                            v-for="(item, index) in tenant_new" :key="index" 
                                            class="cursor-pointer"
                                        >
                                            <td>
                                                <h6 class="mb-1 text-truncate text-primary ps-3" style="max-width:29vw"
                                                @click="SelectTenant_New({id:item.id,type:item.object_type,project_group:'0,2'})"
                                                >{{item.code_value}} | {{item.name_value}}</h6>
                                            </td>
                                            <td class="text-center">
                                                <span @click="SelectTenant_New({id:item.id,type:item.object_type,project_group:'0,2'})" class="d-block fw-medium text-dark ff-numerals"><span class="badge-dot bg-twitter me-2"></span>{{item.total_project}}</span>
                                            </td>
                                            <td class="text-center">
                                                <span class="d-block fw-medium text-dark ff-numerals"
                                                @click.stop="SelectTenant_New({id:item.id,status:1,type:item.object_type,project_group:'0,2'})"
                                                >
                                                    <span class="badge-dot bg-success me-2"></span>
                                                    {{item.project_status_in_progress}}
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="d-block fw-medium text-dark ff-numerals"
                                                @click.stop="SelectTenant_New({id:item.id,status:2,type:item.object_type,project_group:'0,2'})"
                                                >
                                                    <span class="badge-dot bg-warning me-2"></span>{{item.project_status_done}}
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="d-block fw-medium text-dark ff-numerals"
                                                @click.stop="SelectTenant_New({id:item.id,status:'0',type:item.object_type,project_group:'0,2'})"
                                                >
                                                    <span class="badge-dot bg-pink me-2"></span>
                                                    {{item.project_status_open}}
                                                </span>
                                            </td>
                                            <td class="text-center">
                                                <span class="d-block fw-medium text-dark ff-numerals" @click.stop="SelectTenant_New({id:item.id,status:4,type:item.object_type,project_group:'0,2'})">
                                                    <span class="badge-dot bg-secondary me-2"></span>
                                                    {{item.project_status_pending}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!-- card-body -->
                </div>
            </div>

            <div class="col-lg-4" v-if="CheckAccount()">
                <div class="card h-100" style="min-height:350px;max-height:350px">
                    <div class="card-body" >
                        <Charts ref="ChartReception" :id="'ChartReception'"></Charts>
                    </div>
                </div>
            </div>

            
            <div class="col-lg-5">
                <div class="card h-100">
                    <div class="card-body">
                        <Charts ref="ChartLegal" :id="'ChartLegal'"></Charts>
                    </div>
                </div>
            </div>

            <div class="col-lg-3">
                <div class="card h-100">
                    <div class="card-body">
                        <Charts ref="ChartMortgage" :id="'ChartMortgage'"></Charts>
                    </div>
                </div>
            </div>

            <div class="col-lg-12 mt-4">
                <div class="card h-100" style="min-height:400px;max-height:400px">
                    <div class="card-body">
                        <Charts ref="ChartByProvices" :id="'ChartByProvices'"></Charts>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


import Icons from '@Admin/common/js/Icons';
import Summary from './components/Summary.vue'
import Charts from '@Admin/components/common/Charts/Chart.vue'

import axios from 'axios'
const API_PROJECT_PATH = import.meta.env.VITE_API_PATH_STORE;
const apiUser = import.meta.env.VITE_API_PATH_USER;
let authorize = JSON.parse(localStorage.getItem('authorize'));
import{useProjectStore} from '@Store'
import {ShowToast} from '@Helpers/Notify.js'

export default {
    data(){
        return {
            select_all_tenant : true,
            chart_estimate : true,
            group : [],
            is_group : true,
            group_selected : 0,
            chart_preloader : true,
            current_user : {},
            list_tenant : [],
            tenant_selected : [],
            show_label : false,

            tenant_new : [],
        }
    },
    created(){
        this._Init();
    },
    mounted(){

    },
    methods : {

        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            let CheckAccount = this.CheckAccount()
            this.GetAllSummary()
            if(CheckAccount){
                await this.GetDataGroups();
            }else{
                this.is_group = await false
                await this.tenant_selected.push(this.current_user.tenant_id)
                this.GetData()
            }
        },

        GetAllSummary(){
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${this.authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project',params,config)
                .then(async res => {
                    let data = await res.data.data.items
                    this.$refs.Summary._Init(data[0])
                    if(this.CheckAccount()){
                        this.tenant_new = data.slice(1)
                    }else{
                        this.tenant_new = data
                    }
                })
                .catch(err => {
                    
                })
            } catch (err) {
                console.log(err)
            }
        },

        SelectTenant_New(e){
            let params = {}
            e.status ? params.status = e.status : false
            e.id ? params.id = e.id : false
            e.type != undefined && e.type != null ? params.type = e.type : false
            e.project_group != undefined && e.project_group != null ? params.project_group = e.project_group : false
            this.$router.push({ path: '/admin/project-manager', query: params})
        },

        SelectSummary(e){
            let params = {}
            params.status = e
            params.project_group = '0,2'
            if(this.CheckAccount()){
                if(this.current_user.is_root_group != 1){
                    params.id = this.current_user.group_id
                }
            }
            this.$router.push({ path: '/admin/project-manager', query: params})
        },

        SelectTenant(e){
            if(event.target.checked){
                let check_exits = this.tenant_selected.find(item => item == e)
                if(!check_exits){
                    this.tenant_selected.push(e)
                }
            }else{
                let check_exits = this.tenant_selected.find(item => item == e)
                if(check_exits){
                    this.tenant_selected = this.tenant_selected.filter(item => item != e)
                }
            }
            this.list_tenant.map(item => {
                if(item.id == e){
                    item.is_active = event.target.checked
                }
            })
        },

        GetDataGroups(){
            let data = {page: 0,limit: 0,flag: true,};
            let CheckAccount = this.CheckAccount()
            if(CheckAccount){
                if(this.current_user.is_root_group != 1){
                    data.search_list = [
                        {
                            name_field: "id",
                            value_search: this.current_user.group_id,
                        },
                    ];
                }
            }
            axios({
                method:'post',
                url: apiUser + '/group/get-all',
                headers: {
                    'Authorization': 'Bearer ' + this.authorize.token
                },
                data : data
            }).then(async res => {
                let group = res.data.data.items.filter(item => item.is_root != 1)
                this.group = group

                if(CheckAccount){
                     this.group.map(item => {
                        this.tenant_selected.push(item.id)
                        this.list_tenant.push({
                            id : item.id,
                            tenant_name : item.group_name,
                            tenant_code : item.group_code,
                            is_active : true
                        })
                    })
                }else{
                    let a = await this.GetTenantById({id : this.current_user.group_id})
                    a.map(item => {
                        this.tenant_selected.push(item.id)
                        this.list_tenant.push({
                            id : item.id,
                            tenant_name : item.tenant_name,
                            tenant_code : item.tenant_code,
                            is_active : true
                        })
                    })
                }
                this.GetData()
            })
        },

        SelectAllTenant(e){
            this.select_all_tenant = e
            if(e){
                this.tenant_selected = []
                this.list_tenant.map(item => {
                    item.is_active = true
                    this.tenant_selected.push(item.id)
                })
            }else{
                this.tenant_selected = []
                this.list_tenant.map(item => {
                    item.is_active = false
                })
            }
        },

        async SelectGroup(e){
            this.show_label = true
            this.list_tenant = []
            this.tenant_selected = []
            this.select_all_tenant = true
            if(this.CheckAccount){
                if(e.group_code == 'THACO' && this.current_user.is_root_group != 2){
                    this.is_group = true
                    this.group.map(item => {
                        this.tenant_selected.push(item.id)
                        this.list_tenant.push({
                            id : item.id,
                            tenant_name : item.group_name,
                            tenant_code : item.group_code,
                            is_active : true
                        })
                    })
                }
                else{
                    this.is_group = false
                    this.tenant_selected = []
                    let tenant = await this.GetTenantById(e);
                    tenant.map(item => {
                        this.list_tenant.push(item)
                        this.tenant_selected.push(item.id)
                        item.is_active = true
                    })
                }
            }else{
                let a = await this.GetTenantById({id : this.current_user.group_id})
                a.map(item => {
                    this.tenant_selected.push(item.id)
                    this.list_tenant.push({
                        id : item.id,
                        tenant_name : item.tenant_name,
                        tenant_code : item.tenant_code,
                        is_active : true
                    })
                })
            }
            this.GetData()
        },

        async GetData(){
            this.chart_preloader = await true
            await this.$refs.Summary.GetSummary({is_group : this.is_group, tenant_selected : this.tenant_selected})
            await this.GetDataChart()
            await this.GetDataChartMortgage()
            await this.GetDataChartLegal()
            await this.GetDataByProvices()
            await this.GetDataReception()
            this.chart_preloader = false
        },


        async GetTenantById(e){
            try {
                const params = {
                    group_id        : e.id,
                }
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                const result = await axios.post(apiUser + '/tenant/get-by-group-id',params,config)
                return result.data.data.items
            } catch (err) {
                console.log(err)
            }
        },

        
        GetDataChart(){
            this.$refs.ChartEstimate.ReloadChart('ChartEstimate')
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project-investment-value',params,config)
                .then(async res => {
                    let data = res.data.data
                    let chart_data = {
                        series: [
                            data.project_value_status_done,
                            data.project_value_status_in_progress,
                            data.project_value_status_open,
                        ],
                        chart: {
                            width: '100%',
                            type: 'pie',
                            height: 350,
                            fontFamily: 'Open Sans, sans-serif'
                        },
                        labels: ['Đã đưa vào hoạt động', 'Đang xây dựng', 'Nghiên cứu khả thi',],
                        legend: {
                            position: 'bottom',
                            horizontalAlign: 'center',
                        },
                        title: {
                            text: 'DỰ TOÁN ĐẦU TƯ',
                            align: 'left',
                        },
                        colors: ['#1e5cfa', '#e74e79','#0acec7'],
                        fill: {
                        type: "gradient",
                            gradient: {
                                shade: 'light',
                                shadeIntensity: .1,
                                opacityFrom: .9,
                                opacityTo: 100,
                                stops: [0, 80, 150]
                            }
                        },
                        responsive: [
                        {
                            breakpoint: 1700,
                                options: {
                                    chart: {
                                        width: '100%'
                                    },
                                    legend: {
                                        position: 'bottom'
                                    }
                                }
                            }
                        ],
                        tooltip: {
                            y: {
                                formatter: function(value) {
                                    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                                }
                            }
                        }
                     
                    };
                    await this.$refs.ChartEstimate.RenderChart(chart_data)
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },


        GetDataChartMortgage(){
            this.$refs.ChartEstimate.ReloadChart('ChartMortgage')
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project-finance',params,config)
                .then(async res => {
                    let data = res.data.data
                    let chart_data = {
                        chart: {
                            type: 'bar',
                            width: '100%',
                            height: 300,
                            fontFamily: 'Open Sans, sans-serif'
                        },
                        xaxis: {
                            categories: [''],
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                columnWidth: '40%',
                                Padding: 10,
                                distributed: false,
                            }
                        },
                        stroke: {
                            width: 10,
                            colors: ['#ffffff00']
                        },    
                        dataLabels: {
                            enabled: true,
                            formatter: function (val) {
                                return val;
                            },
                        },
                        series: [
                            {
                                name: 'Đã thế chấp',
                                data: [data.project_has_finance]
                            },
                            {
                                name: 'Chưa thế chấp',
                                data: [data.project_not_finance]
                            }
                        ],
                        yaxis: {
                            labels: {
                                formatter: function (val) {
                                    return Math.round(val); // Làm tròn số
                                }
                            }
                        },
                        colors: ['#008FFB', '#FF4560'], // Màu riêng cho từng cột
                        title: {
                            text: 'THẾ CHẤP',
                            align: 'left',
                        },
                    };
                    await this.$refs.ChartMortgage.RenderChart(chart_data)
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },
        GetDataChartLegal(){
            this.$refs.ChartEstimate.ReloadChart('ChartLegal')
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project-by-legal',params,config)
                .then(async res => {
                    let data = res.data.data
                    let chart_data = {
                        chart: {
                            type: 'bar',
                            width: '100%',
                            height: 300,
                            fontFamily: 'Open Sans, sans-serif'
                        },
                        plotOptions: {
                            bar: {
                                horizontal: true,
                                columnWidth: '40%',
                                Padding: 10,
                                distributed: true,
                            }
                        },
                        stroke: {
                            width: 10,
                            colors: ['#ffffff00']
                        },    
                        dataLabels: {
                            enabled: true,
                            formatter: function (val) {
                                return val;
                            },
                        },
                        series: [{
                            name : "Hạng mục pháp lý",
                            data: [data.project_legal_done, data.project_legal_in_progress, data.project_legal_open,]
                        }],
                        xaxis: {
                            categories: ['Hoàn thành', 'Đang thực hiện', 'Chưa thực hiện', ],
                        },
                        colors: ['#0acec7', '#1e5cfa', '#e74e79',],
                        title: {
                            text: 'PHÁP LÝ',
                            align: 'left',
                        },
                    };
                    await this.$refs.ChartLegal.RenderChart(chart_data)
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        async GetDataByProvices(){
            this.$refs.ChartEstimate.ReloadChart('ChartByProvices')
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project-by-province',params,config)
                .then(async res => {
                    let data = await res.data.data.items
                    let result = await {
                        provices : [],
                        project_in_progress : [],
                        project_done : [],
                        project_open : [],
                    }

                    await data.forEach(async item => {
                        result.provices.push(item.province_name)
                        result.project_in_progress.push(item.project_in_progress)
                        result.project_done.push(item.project_done)
                        result.project_open.push(item.project_open)
                    });

                    let chart_data = {
                    series: [
                        {
                            name: 'Hoàn thành',
                            data: result.project_done
                        }, 
                        {
                            name: 'Đang thực hiện',
                            data: result.project_in_progress
                        }, 
                        {
                            name: 'Chưa thực hiện',
                            data: result.project_open
                        }
                    ],
                    chart: {
                        type: 'bar',
                        height: 350,
                        fontFamily: 'Open Sans, sans-serif',

                        zoom: {
                            enabled: true,
                            type: 'x',
                            autoScaleYaxis: true,  
                            zoomedArea: {
                                fill: {
                                color: '#90CAF9',
                                opacity: 0.4
                                },
                                stroke: {
                                color: '#0D47A1',
                                opacity: 0.4,
                                width: 1
                                }
                            }  
                        }
                    },
        
                    yaxis: {
                        labels: {
                            formatter: function (val) {
                                return Math.round(val);
                            }
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '120%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    xaxis: {
                        type: 'category',
                        categories: result.provices,
                        tickPlacement: 'on'
                    },
                    colors: ['#0acec7', '#1e5cfa', '#e74e79',],
                    tooltip: {
                        y: {
                            formatter: function (val) {
                            return val + " Dự án"
                            }
                        }
                    },
                    title: {
                        text: 'DỰ ÁN THEO TỈNH THÀNH',
                        align: 'left',
                    },
                    };
                    await this.$refs.ChartByProvices.RenderChart(chart_data)
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },

        GetDataReception(){
            this.$refs.ChartEstimate.ReloadChart('ChartReception')
            try {
                const params = {}
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                axios.post(API_PROJECT_PATH + '/dashboard/get-summary-project-by-construction-payment',params,config)
                .then(async res => {
                    let data = res.data.data
                    let chart_data = {
                    series: [
                        {
                            name: 'Tổng dự toán',
                            data: [data.project_value_done,data.project_value_in_progress,data.project_value_open]
                        }, 
                        {
                            name: 'Đã chi',
                            data: [data.project_investment_value_done,data.project_investment_value_in_progress,data.project_investment_value_open]
                        },
                    ],
                    chart: {
                        type: 'bar',
                        height: '100%',
                        width: '100%',
                        maxHeight: 350,
                        fontFamily: 'Open Sans, sans-serif',
                        toolbar: {
                            show: false,
                        }
                    },
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false,
                        formatter: function (val) {
                            return val;
                        },
                    },
                    stroke: {
                        show: true,
                        width: 5,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: ['Đã đưa vào hoạt động','Đang xây dựng','Nghiên cứu khả thi'],
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value) {
                                if (Math.abs(value) >= 1000000000) {
                                    return (value / 1000000000) + ' tỷ';
                                }
                                if (Math.abs(value) >= 1000000) {
                                    return (value / 1000000) + ' triệu';
                                }
                                return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                            }
                        },
                    },
                    colors: ['#1e5cfa','#0acec7'],
                    tooltip: {
                        y: {
                            formatter: function(value) {
                                return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
                            }
                        }
                    },
                    title: {
                        text: 'DỰ TOÁN CHI ĐẦU TƯ',
                        align: 'left',
                    },
                    };
                    await this.$refs.ChartReception.RenderChart(chart_data)
                })
                .catch(err => {})
            } catch (err) {
                console.log(err)
            }
        },


        CheckAccount(){
            if(this.current_user.is_root_group == 1){
                return true
            }else{
                if(this.current_user.is_type_account == 0 || this.current_user.is_type_account == 1){
                    if(this.current_user.group_id != null){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }
        },

        
    },
    components : {
        ...Icons,Summary,Charts
    }
}
</script>
<style lang="scss">

table.table-tenant {
    border-collapse: separate;
    border-spacing: 0 5px;
    thead{
        font-size:12px;
        font-weight: 400;
        text-transform: uppercase;
        tr{
            td{
                color:#000!important;
            }
        }
        
    }
    tr{
        background: #f8f9fc;
        td{
            padding:5px 5px!important;
            &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }
    }
}

.Carousel_GroupLogo{
    ._Inner{
        transition: .2s ease-in-out;
        img{
            max-width: 90px;
            width: 100%;
        }
        &.active{
            background-color: #fffcd6;
        }
    }
}
</style>