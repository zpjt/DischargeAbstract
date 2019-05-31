import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap";

const defaultLoginState:appStore["app"] = createTypedMap(window.getSession("getUser"));

const CHANGE_ROLE = "CHANGE_ROLE";

const changeRole = (roleId:number)=>{

	return {
		type:CHANGE_ROLE,
		roleId,
	}

}

const userInfo= ReduceCreate(defaultLoginState,{
	[CHANGE_ROLE]:function(state,action:ReturnType<typeof changeRole>){

		return state.set("role_index",action.roleId);


	}
})



export {
	userInfo,
	changeRole,
}

