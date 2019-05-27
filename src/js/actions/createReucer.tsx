import {Action} from "redux";



export default function createReducer<T>(initState:T,actionHandle:{[key:string]:(state:T,action:Action<string>)=>T}){



		return function(state = initState,action:{type:string}){

				 if(actionHandle.hasOwnProperty(action.type)){

				 		return  actionHandle[action.type](state,action);
				 }else{
				 		return state ;
				 }
		}

};