<template lang="">
    <div class="Chart_Preloader d-flex align-items-center justify-content-center" :class="{'hide' : !loading}">
        <img src="/assets/images/spinner.webp" width="150" alt="" srcset="">
    </div>
    <div :id="id"></div>
</template>
<script>
import ApexCharts from 'apexcharts'

let chart
export default {
    props : ['id'],
    data(){
        return {
            data : [],
            loading : true,
        }
    },
    methods : {
        async RenderChart(chart_data){
            this.loading = true
            chart = await new ApexCharts(document.querySelector("#" + this.id), chart_data);
            let main = this
            chart.render().then(() => {
                setTimeout(() => {
                    main.loading = false
                }, 800);
            });
        },
        ReloadChart(e){
            this.loading = true
            document.querySelector('#' + e).innerHTML = ""
        }
    }
}
</script>
<style lang="scss">
.Chart_Preloader{
    position: absolute;
    width: 100%;
    height: 100%;
    background: #ffffff;
    z-index: 99;
    border-radius: 4px;
    top : 0;
    left : 0;
    opacity: 1;
    &.hide{
        transition: .2s ease-in-out;
        opacity: 0;
        z-index: -9;
    }
}
</style>