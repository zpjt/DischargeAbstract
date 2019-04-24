import {Action} from "redux";



export default function createReducer<T>(initState:T,actionHandle:{[key:string]:(stat:T,action:Action<string>)=>T}){



		return function(state:any,action:{type:string}){

				 if(actionHandle.hasOwnProperty(action.type)){

				 		return  actionHandle[action.type](state,action);
				 }else{
				 		return initState ;
				 }
		}

};