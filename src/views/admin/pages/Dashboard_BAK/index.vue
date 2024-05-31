<template lang="" >
    <div>
        <div v-if="show_label">
            <div 
                data-bs-toggle="offcanvas" 
                data-bs-target="#offcanvasRight" 
                aria-controls="offcanvasRight" 
                class="cursor-pointer text-white bottom-0 rounded-end-3 shadow-lg d-flex align-items-center justify-content-center"
                style="
                    z-index: 999;
                    background: rgb(0, 82, 156);
                    top: 120px;
                    position: fixed;
                    height: 50px;
                    width: 50px;
                    right: 0;
                    border-radius: 100% 0% 0% 100%;
                "
                v-if="CheckAccount()"
            >
                <IconBuildingCommunity :size="26" class="d-flex" stroke-width="2" />
            </div>
        </div>
            
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header border-bottom">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Chọn đơn vị</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="d-flex align-items-center gap-3 p-3 border-bottom">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Nhập từ khóa tìm kiếm">
                </div>
                <div class="text-nowrap">
                    <span v-if="!select_all_tenant" class="cursor-pointer" @click="SelectAllTenant(true)">Chọn tất cả</span>
                    <span v-else class="cursor-pointer"  @click="SelectAllTenant(false)">Bỏ chọn tất cả</span>
                </div>
            </div>
            <div class="offcanvas-body d-flex flex-column custom-scrollbar p-3">
                <div class="d-flex flex-column gap-2 flex-grow-1">
                    <div v-for="(item, index) in list_tenant" :key="index">
                        <div class="card cursor-pointer">
                            <div class="card-body d-flex gap-3 p-2" :title="item.tenant_name">
                                <div>
                                    <input class="form-check-input scale-1x" type="checkbox" value="" id="flexCheckDefault" :checked="item.is_active" @change="SelectTenant(item.id)">
                                </div>
                                <div class="d-flex">{{item.tenant_code}} | <div class="text-truncate mb-0" style="max-width:240px"> &nbsp;{{item.tenant_name}}</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="offcanvas-footer d-flex justify-content-end position-sticky fixed-bottom bg-white p-3 border-top">
                <div class="d-flex gap-2">
                    <button class="btn bg-secondary text-muted bg-opacity-25" data-bs-dismiss="offcanvas">Hủy bỏ</button>
                    <button class="btn btn-success" @click="GetData" data-bs-dismiss="offcanvas">Áp dụng</button>
                </div>
            </div>
        </div>

        <div class="d-flex gap-3 mb-3 Carousel_GroupLogo">
            <div class="card flex-grow-1 cursor-pointer _Inner" v-for="(item, index) in group" :key="index" @click="SelectGroup(item)" :class="{'active' : item.id == group_selected}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" style="max-width: 20%;">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <div>
                        <img :src="'/assets/images/logo/' + item.group_code + '.png'" alt="" srcset="">
                    </div>
                </div>
            </div>
        </div>
        <Summary ref="Summary"></Summary>
        <div class="row">
            <div class="col-lg-4">
                <div class="card h-100" style="min-height:350px;max-height:350px">
                    <button @click="chart_estimate = !chart_estimate" class="position-absolute btn btn-info text-white hover-jello btn-sm end-0 mt-3 me-3 p-0" style="z-index:9">
                        <IconArrowsExchange :size="28" stroke-width="2" class="d-flex p-1" />
                    </button>
                    <div class="card-body" v-show="chart_estimate">
                        <Charts ref="ChartEstimate" :id="'ChartEstimate'"></Charts>
                    </div>
                    <div class="card-body" v-show="!chart_estimate">
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
        }
    },
    created(){
        this._Init();
    },
    mounted(){

    },
    methods : {
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

        async _Init(){
            this.current_user = await JSON.parse(localStorage.getItem('current_user'))
            this.authorize = JSON.parse(localStorage.getItem('authorize'));
            let CheckAccount = this.CheckAccount()
            
            if(CheckAccount){
                await this.GetDataGroups();
            }else{
                this.is_group = await false
                await this.tenant_selected.push(this.current_user.tenant_id)
                this.GetData()
            }
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
                const params = {
                    lstObject : this.tenant_selected,
                    is_group : this.is_group
                }
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
                const params = {
                    lstObject : this.tenant_selected,
                    is_group : this.is_group
                }
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
                const params = {
                    lstObject : this.tenant_selected,
                    is_group : this.is_group
                }
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
                const params = {
                    lstObject : this.tenant_selected,
                    is_group : this.is_group
                }
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
                const params = {
                    lstObject : this.tenant_selected,
                    is_group : this.is_group
                }
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