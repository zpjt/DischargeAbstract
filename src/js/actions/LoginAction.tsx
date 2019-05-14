
import {ThunkAction} from "redux-thunk";
import { Action } from 'redux';
import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap"



const REQUEST_POSTS_LOGIN = "REQUEST_POSTS_LOGIN";
const RECEIVE_POSTS_LOGIN = "RECEIVE_POSTS_lOGIN";

const RECEIVE_POSTS_LOGIN_OUT = "RECEIVE_POSTS_lOGIN_OUT";

const GET_LOGIN_URL = "http://127.0.0.1:3033/mock/11/getOrg";
const GET_LOGIN_OUT_URL = "http://127.0.0.1:3033/mock/11/getOrg";


const defaultLoginState:appStore["app"] = createTypedMap({
	isLogin:false,
	userInfo:{},
	isFetching:false,
});

 

const requestPostLogin = function(){
	return {
			 type:REQUEST_POSTS_LOGIN,
	}
};


const receivePostLogin = function(json:app["userInfo"]){
		return {
			 type:RECEIVE_POSTS_LOGIN,
			 json,
		}
};

const receivePostLoginOut = function(){
		return {
			 type:RECEIVE_POSTS_LOGIN_OUT,
		}
};

const shouldPost = (state:appStore)=>{

			if(state.app.get("isFetching")){
				return false ;
			}	
			return true;
}


// 异步的action
 const fetchPosts = (): ThunkAction<void, appStore, null, Action<string>> => (dispatch) => {
 			
 		dispatch(requestPostLogin());
		fetch(GET_LOGIN_URL)
	 	.then(res=>{
					return res.json()
	 	})
	 	.then(json=>{
	 			dispatch(receivePostLogin(json))
	 	})
};



const fetchPostLoginIfNeeded = ():ThunkAction<void,appStore,null,Action<string>>=>(dispatch,getState)=>{
		if(shouldPost(getState())){
				return dispatch(fetchPosts());
		}
};

const fetchPostsLoginOut = (): ThunkAction<void, appStore, null, Action<string>> => (dispatch) => {
 			
 		dispatch(requestPostLogin());
		fetch(GET_LOGIN_OUT_URL)
	 	.then(res=>{
					return res.json()
	 	})
	 	.then(json=>{
	 			console.log(json,"退出");
	 			dispatch(receivePostLoginOut())
	 	})
};





const loginReducer = ReduceCreate(defaultLoginState,{

	[REQUEST_POSTS_LOGIN]:function(state){
			return state.set("isFetching",true) ;
	},
	[RECEIVE_POSTS_LOGIN]:function(state,action:NonNullable<ReturnType<typeof receivePostLogin>>){
			return state.set("isLogin",true).set("userInfo",action.json).set("isFetching",false);
	},
	[RECEIVE_POSTS_LOGIN_OUT]:function(state){

			return state.set("isLogin",false).set("userInfo",{}).set("isFetching",false);

	},
})



export {
	fetchPostLoginIfNeeded,
	fetchPostsLoginOut,
	loginReducer,
}

