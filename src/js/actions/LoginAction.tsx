
import {ThunkAction} from "redux-thunk";
import { Action } from 'redux';
import  ReduceCreate from "./createReucer";
import {createTypedMap} from "@js/common/ImmutableMap";
import axios from "@js/common/AxiosInstance";



const REQUEST_POSTS_LOGIN = "REQUEST_POSTS_LOGIN";
const RECEIVE_POSTS_LOGIN = "RECEIVE_POSTS_lOGIN";
const STOP_LOGIN = "STOP_LOGIN";
const RECEIVE_POSTS_LOGIN_OUT = "RECEIVE_POSTS_lOGIN_OUT";

const GET_LOGIN_URL = "/login/logVal";
const GET_LOGIN_OUT_URL = "/login/logOut";



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

const stopLogin = function(){
	return {
			 type:STOP_LOGIN,
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
 const fetchPosts = (userName:string,password:string): ThunkAction<void, appStore, null, Action<string>> => (dispatch) => {

 		dispatch(requestPostLogin());

 		axios({
 			url:GET_LOGIN_URL,
 			 method: 'post', 
 			 data:{userName,password:window.hex_md5(window.hex_md5(password))},
 			 headers:{
 				"Content-Type":"application/json",
 			}
 		}).then(res=>{

 			const data = res.data;

 			if(data.data== "登陆失败!"){
					dispatch(stopLogin());
 			}else{
 					dispatch(receivePostLogin(data.data));
 			}
			
 		});
	
};



const fetchPostLoginIfNeeded = (userName:string,password:string):ThunkAction<void,appStore,null,Action<string>>=>(dispatch,getState)=>{
		if(shouldPost(getState())){
				return dispatch(fetchPosts(userName,password));
		}
};

const fetchPostsLoginOut = (): ThunkAction<void, appStore, null, Action<string>> => (dispatch) => {
 			
 		dispatch(requestPostLogin());

		axios({url:GET_LOGIN_OUT_URL})
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
	[STOP_LOGIN]:function(state){
		return state.set("isFetching",false);
	}
})



export {
	fetchPostLoginIfNeeded,
	fetchPostsLoginOut,
	loginReducer,
}

