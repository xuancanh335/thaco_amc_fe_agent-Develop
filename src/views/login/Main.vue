<template lang="">
    <section class="page-sign position-relative vh-100" style="background:linear-gradient(347deg, #3668bb, #0cadff);">
        <div id="particles-js" class="position-fixed w-100 h-100 top-0 start-0" ></div>
        <div class="card card-sign border pt-5" style="width:400px">
            <div class="card-header d-flex align-items-center justify-content-center">
                <img src="/assets/images/logo-thaco.svg" width="200" alt="" srcset="">
            </div>
            <div v-if="step == 1" class="card-body p-5">
                <div class="mb-3">
                    <label class="form-label">Tên đăng nhập</label>
                    <input type="email" v-model="email" class="form-control" @keydown.enter="AuthLogin" placeholder="Nhập tên đăng nhập của bạn..." require/>
                </div>
                <div class="mb-5">
                    <label class="form-label d-flex justify-content-between">Mật khẩu 
                        <!-- <a href="">Forgot password?</a> -->
                    </label>
                    <input type="password" v-model="password" class="form-control" placeholder="Nhập tên mật khẩu của bạn..." @keydown.enter="AuthLogin" require/>
                </div>
                <div class="d-flex align-items-center justify-content-center">
                    <vueRecaptcha 
                        v-show="showRecaptcha"
                        :sitekey="sitekey"
                        size="normal" 
                        theme="light"
                        hl="vi"
                        :loading-timeout="loadingTimeout"
                        @verify="recaptchaVerified"
                        @expire="recaptchaExpired"
                        @fail="recaptchaFailed"
                        @error="recaptchaError"
                        ref="vueRecaptcha">
                    </vueRecaptcha>
                </div>
                <div class="d-flex gap-2 mt-3">
                    <button class="btn btn-primary btn-sign w-100" @click="Login">ĐĂNG NHẬP</button>
                </div>
                <!-- <div class="divider"><span>Đăng nhập với tài khoản của Thaco</span></div> -->
            </div>

            <div v-if="step == 2" class="card-body p-5">
                <div class="mb-4">
                    <label class="form-label d-flex justify-content-between">Chọn đơn vị</label>
                    <div class="dropdown">
                        <input type="text" class="form-control cursor-pointer" placeholder="Vui lòng chọn đơn vị..." data-bs-toggle="dropdown" aria-expanded="false" v-model="tenant_selected.tenant_name"/>
                        <ul class="dropdown-menu rounded-0 p-4" style="min-width:100%;">
                            <div class="custom-scrollbar list-tenant" style="max-height: 300px;overflow: auto;">
                                <div v-if="tenant.length <= 0" class="text-center w-100">Không có dữ liệu</div>
                                <div v-for="(item, index) in tenant" :key="index">
                                    <span 
                                        class="fw-bold dropdown-item cursor-pointer" 
                                        @click="ChoiceGroup(item)" 
                                        v-if="is_type_account == 1 || is_type_account == 0"
                                        >{{index}}
                                    </span>
                                    <div>
                                        <span class="fw-bold" v-if="is_type_account == 2">{{index}}</span>
                                            <div 
                                                v-for="(tenant, index) in item" 
                                                :key="index">
                                            <div
                                                class="dropdown-item cursor-pointer fs-6 px-3"
                                                @click="ChoiceTenant(tenant)"
                                                v-if="tenant.tenant_code != ''">
                                                {{tenant.tenant_code}} | {{tenant.tenant_name}}
                                            </div>
                                        </div><hr>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
                <div class="d-flex gap-2 mt-4">
                    <button class="btn btn-primary btn-sign" @click="CheckLogin">TRUY CẬP HỆ THỐNG</button>
                </div>
            </div>
        </div>
    </section>
    
</template>
<script>
import axios from 'axios'
import CryptoJS from 'crypto-js';
const apiPath = import.meta.env.VITE_API_PATH_USER;
const API_USER_PATH = import.meta.env.VITE_API_PATH_USER;
import {ShowToast} from '@Helpers/Notify.js'
import {EnCode,DeCode} from '@Helpers/authorize.js'
import { IconChessBishopFilled } from '@tabler/icons-vue';
import vueRecaptcha from 'vue3-recaptcha2';

export default {
    data(){
        return {
            sitekey : '6Lc4XPMoAAAAAKhYZLxGO9g8UwqMp_-vH5KdIWV1',
            step : 1,
            email : null,
            password : null,
            tenant_id : "",
            tenant_selected : {},
            is_remember_me : false,
            is_select_group : false,
            data : [],
            ldap : false,
            skip_ldap : false,
            tenant : [],
            is_type_account : null,
            group_selected : {},
            recapcha : false,
            showRecaptcha: true,
		    loadingTimeout: 30000,

            user_login : {

            }
        }
    },
    created(){
        var authorize = localStorage.getItem('authorize')
        if (authorize || authorize === 0) {
            this.$router.push('/admin')
        }
    },
    mounted(){
        particlesJS.load('particles-js', '/lib/particles/particles.json', function() {
            console.log('callback - particles.js config loaded');
        });
    },
    components : {vueRecaptcha},
    methods : {
        recaptchaVerified(response) {
            this.recapcha = true
        },
        recaptchaExpired() {
            this.recapcha = false
            this.$refs.vueRecaptcha.reset();
        },
        recaptchaFailed() {
            this.recapcha = false
        },
        recaptchaError(reason) {
            this.recapcha = false
        },
        async Verify_Ldap() {
            try {
                const params = {
                    email: this.email,
                    password: this.password,
                };
                const res = await axios.post(apiPath + '/auth/check-authen-login', params);
                this.tenant = res.data.data.listTenant;
                this.is_type_account = res.data.data.is_type_account;
                let group = []
                await this.tenant.map(item => {
                    group[item.group_name] = []
                })
                await this.tenant.map(item => {
                    let tenant = {
                        id : item.id,
                        tenant_code : item.tenant_code,
                        tenant_name : item.tenant_name,
                        group_id    : item.group_id,
                        group_name  : item.group_name
                    }
                    group[item.group_name].push(tenant)
                })
                this.tenant = {...group}
                return true;
            } catch (err) {
                if(err.response.data.error_code === 1){
                    ShowToast({status_code : 401, message : 'Tài khoản đã bị khóa'});
                    return false;
                }else{
                    ShowToast({status_code : 401, message : 'Tài khoản không xác định'});
                    return false;
                }
            }
        },
        async Login(){
            if(this.recapcha === true){
                if(this.email || this.email === 0){
                    if(this.password || this.password === 0){
                        let ldap = await this.Verify_Ldap()
                        if(ldap || this.skip_ldap){
                            ShowToast({status_code : 200, message : 'Xác thực thành công'})
                            this.step = 2
                        }
                    }else{ShowToast({status_code : 401, message : 'Chưa nhập mật khẩu'})}
                }else{ShowToast({status_code : 401, message : 'Chưa nhập email'})}
            }else{ShowToast({status_code : 401, message : 'Chưa xác thực'});}
        },

        async Skip_LDAP(){
            this.skip_ldap = true
            await this.Login();
        },

        ChoiceTenant(e){
            this.is_select_group = false
            this.tenant_selected = e
        },

        ChoiceGroup(e){
            try {
                this.is_select_group = true
                if(e || e === 0){
                    this.tenant_id = null
                    this.tenant_selected.tenant_name = e[0].group_name
                    this.group_selected = {
                        group_id    : e[0].group_id,
                        group_name  : e[0].group_name
                    }
                }else{ShowToast({status_code : 401, message : 'Tập đoàn không xác định'})}
            } catch (error) {ShowToast({status_code : 401, message : 'Tập đoàn không xác định'})}
        },

        CheckLogin(){
            if(this.email || this.email === 0){
                if(this.password || this.password === 0){
                    if(this.tenant_selected.id || this.tenant_selected.id === 0){
                        this.AuthLogin()
                    }else if(this.group_selected.group_id || this.group_selected.group_id === 0){
                        this.AuthLogin()
                    }
                    else{ShowToast({status_code : 401, message : 'Chưa chọn đơn vị'})}
                }else{ShowToast({status_code : 401, message : 'Chưa nhập mật khẩu'})}
            }else{ShowToast({status_code : 401, message : 'Chưa nhập tài khoản'})}
        },
        
        async AuthLogin(){
            
            if(this.is_type_account || this.is_type_account === 0){

                let params = 
                {
                    email : this.email,
                    password : this.password,
                    is_remember_me : true,
                }
                if(this.is_type_account == 0 || this.is_type_account == 1){
                    if(this.is_select_group){
                        params.group_id = this.group_selected.group_id
                    }else{
                        params.tenant_id = this.tenant_selected.id
                    }
                }else{
                    params.tenant_id = this.tenant_selected.id
                }
                axios.post(apiPath + '/auth/login',params)
                .then(async res => {
                    const data = res.data.data;
                    const obj = {
                        "token" : data.token,
                        "tenant_id" : data.tenant_id
                    }
                    this.user_login.authorize = await JSON.stringify(obj)
                    if (this.user_login.authorize || user_login.authorize === 0) {
                        await this.getInfoUser()
                        let PermissionUser = await this.getPermissionUser()
                        if(PermissionUser){
                            await localStorage.setItem('authorize',this.user_login.authorize)
                            await localStorage.setItem('current_user',this.user_login.current_user)
                            await localStorage.setItem('user_role',this.user_login.user_role)
                            ShowToast({status_code : 200, message : 'Đăng nhập thành công'});
                            setTimeout(() => {
                                this.$router.push('/admin')
                                this.$router.go(0)
                            }, 1000); 
                        }
                    }
                })
                .catch(err => {
                    const message = err.response.data.message
                    ShowToast({status_code : 401, message : message})
                })
            }
        },

        async getInfoUser(){
            let authorize = JSON.parse(this.user_login.authorize);
            if (authorize.token || authorize.token === 0) {
                let params
                if(this.is_type_account == 0){
                    params = {
                        item : this.email,
                    }
                }

                if(this.is_type_account == 1){
                    params = {
                        item : this.email,
                    }
                }

                if(this.is_type_account == 2){
                    params = {
                        item : this.email,
                        tenant_id : authorize.tenant_id,
                    }
                }
                
                const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
                await axios.post(apiPath + '/user/get-info-by-username',params,config)
                .then(async res => {
                    this.user_login.current_user = await JSON.stringify(res.data.data)
                })
                .catch(err => {
                    console.error(err); 
                })
            }
        },

        async getPermissionUser(){
            let authorize = await JSON.parse(this.user_login.authorize);
            let current_user = await JSON.parse(this.user_login.current_user);
            const params = {
                item : current_user.username
            }
            const config = {headers: {Authorization: `Bearer ${authorize.token}`}};
            let response = await axios.post(API_USER_PATH + '/permission/get-list-permission-by-user',params,config)
            
            if((current_user.is_type_account == 0 || current_user.is_type_account == 1) && current_user.group_id != null){
                this.user_login.user_role = ['is_group']
                return true
            }else{
                if(!response.data.data.length > 0){
                    ShowToast({status_code : 401, message : 'Không có quyền truy cập'})
                    return false
                }else{
                    let roles = await EnCode(response.data.data)
                    this.user_login.user_role = await roles
                    return true
                }
            }

        }
    }
}
</script>
<style lang="scss">
.page-sign{
    zoom:100%!important;
}
.tree {
  position: relative;
  background: white;
  margin-top: 20px;
  padding: 30px;
  font-family: 'Roboto Mono', monospace;
  font-size: .85rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  
  span {
    font-size: 13px;
    font-style: italic;
    letter-spacing: .4px;
    color: #a8a8a8;
  }
  
  .fa-folder-open, .fa-folder {
    color: #007bff;
  }
  
  .fa-html5 {
    color: #f21f10;
  }
  
  ul {
    padding-left: 5px;
    list-style: none;
    
    li {
      position: relative;
    //   padding-top: 5px;
    //   padding-bottom: 5px;
      padding-left: 15px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      
      &:before {
        position: absolute;
        top: 15px;
        left: 0;
        width: 10px;
        height: 1px;
        margin: auto;
        content: '';
        background-color: #666;
      }
      
      &:after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 100%;
        content: '';
        background-color: #666;
      }
      
      &:last-child:after {
        height: 15px;
      }
    }
    
    a {
      cursor: pointer;
      
      &:hover {
        text-decoration: none;
      }
    }
  }
}
    
</style>