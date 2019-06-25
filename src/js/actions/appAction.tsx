import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap";

const defaultApp = Object.assign({menuUrl:"0,0"},window.getSession("getUser"));

const defaultLoginState:appStore["app"] =  createTypedMap(defaultApp);

const CHANGE_ROLE = "CHANGE_ROLE";
const CHANGE_MENUURL = "CHANGE_MENUURL";

const changeRole = (roleId:number)=>{

	return {
		type:CHANGE_ROLE,
		roleId,
	}

}

const changeMenuUrl = (menuUrl:string)=>{

	return {
		type:CHANGE_MENUURL,
		menuUrl,
	}

}

const userInfo= ReduceCreate(defaultLoginState,{
	[CHANGE_ROLE]:function(state,action:ReturnType<typeof changeRole>){

		return state.set("role_index",action.roleId).set("menuUrl","0,0");


	},
	[CHANGE_MENUURL]:function(state,action:ReturnType<typeof changeMenuUrl>){

		return state.set("menuUrl",action.menuUrl);

	}
});






export {
	userInfo,
	changeRole,
	changeMenuUrl
}

