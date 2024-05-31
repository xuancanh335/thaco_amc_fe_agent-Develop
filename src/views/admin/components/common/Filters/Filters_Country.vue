<template lang="">
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Quốc gia</span>
                <select name="" id="" class="form-control border-start-0" @click="_Init"
                @change="$emit('FilterData',{name_field:'country_name', search_value : filters.country});SelectCountry()" v-model="filters.country">
                    <option value="" selected>---CHỌN QUỐC GIA---</option>
                    <option :value="item.id" v-for="(item, index) in country" :key="index">{{item.country_name}}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Tỉnh/Thành phố</span>
                <select name="" id="" class="form-control border-start-0" @click="GetListProvices"
                @change="$emit('FilterData',{name_field:'province_name', search_value : filters.province});SelectProvice()" v-model="filters.province"
                :disabled="filters.country == ''" :readonly="filters.country == ''"
                >
                    <option value="" selected>---CHỌN TỈNH/THÀNH PHỐ---</option>
                    <option :value="item.id" v-for="(item, index) in province" :key="index">{{item.province_name}}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
        <div>
            <div class="input-group">
                <span class="input-group-text text-muted" id="basic-addon1">Quận/Huyện</span>
                <select name="" id="" class="form-control border-start-0" @click="GetListDistrict"
                @change="$emit('FilterData',{name_field:'district_name', search_value : filters.district});" v-model="filters.district"
                :disabled="filters.province == ''" :readonly="filters.province == ''"
                >
                    <option value="" selected>---CHỌN QUẬN/HUYỆN---</option>
                    <option :value="item.id" v-for="(item, index) in district" :key="index">{{item.district_name}}</option>
                </select>
            </div>
        </div>
    </div>
</template>
<script>
const PATH_API_DATA = import.meta.env.VITE_API_PATH_STORE;
const PATH_API_USER = import.meta.env.VITE_API_PATH_USER;
const APP_PATH = import.meta.env.VITE_APP_PATH;
import axios from 'axios';
export default {

    data(){
        return {
            data : [],
            country : [],
            province : [],
            district : [],
            filters : {
                country : "",
                province : "",
                district : "",
            }
        }
    },
    // async mounted(){
    //     await this._Init()
    // },
    methods : {
        async _Init(){
            const current_user = await JSON.parse(localStorage.getItem('current_user'));
            const authorize = await JSON.parse(localStorage.getItem('authorize'));
            this.current_user = current_user;
            this.authorize = authorize;
            await this.GetDataCountry()
        },
        GetDataCountry(){
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
        },

        SelectCountry(){
            this.filters.province = ''
            this.filters.district = ''
            this.filters.country = event.target.value
        },

        SelectProvice(){
            this.filters.district = ''
            this.filters.province = event.target.value
        },

        GetListProvices(){
            let data = this.data.find(item => item.id == this.filters.country)
            this.province = data.dataProvince
        },
        GetListDistrict(){
            let data = this.province.find(item => item.id == this.filters.province)
            this.district = data.dataDistrict
        },
        RemoveFilter(){
            this.filters.country = ""
            this.filters.province = ""
            this.filters.district = ""
        }
    }
}
</script>
<style lang="">
    
</style>