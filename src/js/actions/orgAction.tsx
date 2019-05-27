
import * as Immutable from "immutable";
import {ThunkAction} from "redux-thunk";
import { Action } from 'redux';
import  ReduceCreate from "./createReucer";



const REQUEST_POSTS_ORG = "REQUEST_POSTS_ORG";
const RECEIVE_POSTS_ORG = "RECEIVE_POSTS_ORG";
const GET_ORG_URL = "http://127.0.0.1:3033/mock/11/getOrg";


const requestPostOrg = function(){
	return {
			 type:REQUEST_POSTS_ORG,
	}
};


const receivePostOrg = function(json:orgState["data"]){
		return {
			 type:RECEIVE_POSTS_ORG,
			 json,
		}
};


const shouldPost = (state:appStore)=>{

		
			if(state.orgs.get("isFetching")){
				return false ;
			}	

			if(!state.orgs.get("data").length){
					return true
			}

			return false;

}




const fetchPostOrgIfNeeded = ():ThunkAction<void,appStore,null,Action<string>>=>(dispatch,getState)=>{
		if(shouldPost(getState())){
				return dispatch(fetchPosts());
		}
};


// 异步的action
 const fetchPosts = (): ThunkAction<void, appStore, null, Action<string>> => (dispatch) => {
 			
 		dispatch(requestPostOrg());
		fetch(GET_ORG_URL)
	 	.then(res=>{
					return res.json()
	 	})
	 	.then(json=>{
	 			dispatch(receivePostOrg(json))
	 	})
};




const defaultOrgState:Immutable.Map<string, boolean | orgState["data"]>=Immutable.Map({
	"data":[],
	"isFetching":false,
});


const orgReducer = ReduceCreate(defaultOrgState,{
	[REQUEST_POSTS_ORG]:function(state){
			return state.set("isFetching",false)
	},
	[RECEIVE_POSTS_ORG]:function(state,action:NonNullable<ReturnType<typeof receivePostOrg>>){
			return state.set("isFetching",true).set("data",action.json)
	},
})



export {
	fetchPostOrgIfNeeded,
	orgReducer,
}