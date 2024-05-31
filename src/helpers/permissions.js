import dayjs from 'dayjs';
import {EnCode,DeCode} from '@Helpers/authorize.js'

export default {
  install(app) {
	var current_usr = JSON.parse(localStorage.getItem('current_user'))
    app.config.globalProperties.$CheckPermission = function(object_name,permission) {
		if(current_usr){
			if((current_usr.is_type_account == 0 || current_usr.is_type_account == 1) && current_usr.group_id != null){
				if(permission == 'is_allow_edit' || permission == 'is_allow_create' || permission == 'is_allow_delete'){
					let arr = ['User_Config','Tenant_Manager','Sync_Bravo_Config']
					if(!arr.includes(object_name)){
						return false
					}else{
						return true
					}
				}else{
					return true
				}
			}else{
				let get_roles = localStorage.getItem('user_role')
				let list_permissions = JSON.parse(DeCode(get_roles))
				let object = list_permissions.find(item => item.object_name == object_name)
				if(object != '' && object != undefined && object != null){
					if( permission in object){
						return object[permission]
					}else{
						return false
					}
				}else{return false}
			}
		}
    };
	app.config.globalProperties.$CheckGroupUser = function(){
		if(current_usr){
			if((current_usr.is_type_account == 0 || current_usr.is_type_account == 1) && current_usr.group_id != null){
				return true
			}else{
				return false
			}
		}
	};
  }
};