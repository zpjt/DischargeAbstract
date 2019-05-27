import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap";

const defaultLoginState:appStore["app"] = createTypedMap(window.getSession("getUser"));

const userInfo= ReduceCreate(defaultLoginState,{

})



export {
	userInfo,
}

