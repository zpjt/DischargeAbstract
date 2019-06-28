import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap";

const defaultApp = Object.assign({menuUrl:"0,0",filterType:"0"},window.getSession("getUser"));

const defaultLoginState:appStore["app"] =  createTypedMap(defaultApp);

const CHANGE_ROLE = "CHANGE_ROLE";
const CHANGE_MENUURL = "CHANGE_MENUURL";
const CHANGE_FILTER = "CHANGE_FILTER";

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

const changeFilterType =(fitler:string)=>{


	return {
		type:CHANGE_FILTER,
		fitler,
	}
}

const userInfo= ReduceCreate(defaultLoginState,{
	[CHANGE_ROLE]:function(state,action:ReturnType<typeof changeRole>){

		return state.set("role_index",action.roleId).set("menuUrl","0,0").set("filterType","0");


	},
	[CHANGE_MENUURL]:function(state,action:ReturnType<typeof changeMenuUrl>){

		return state.set("menuUrl",action.menuUrl);

	},
	[CHANGE_FILTER]:function(state,action:ReturnType<typeof changeFilterType>){

		return state.set("filterType",action.fitler).set("menuUrl","0,0");

	}
});






export {
	userInfo,
	changeRole,
	changeMenuUrl,
	changeFilterType
}

