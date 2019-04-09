


export default (initState:any,actionHandle:{[key:string]:Function})=>{



		return function(state:any,action:{type:string}){

				 if(actionHandle.hasOwnProperty(action.type)){

				 		return  actionHandle[action.type](state,action);
				 }else{
				 		return initState ;
				 }
		}

};