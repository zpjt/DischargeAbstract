import * as React from "react";
import {connect} from "react-redux";
import {slecteSubreddit,fetchPostsIfNeeded,invalidateSubreddit} from "../actions/index";

type stateProp = {
	subscreddit:string;
}
type dispatchProp = {
		change:(subsreddit:string)=>void;
	  refresh:(subsreddit:string)=>void;
}


const AddTodo = ({subscreddit,change,refresh}: stateProp & dispatchProp)=>{

	const onChange = function(e:React.ChangeEvent<HTMLInputElement>){
			const value = e.target.value;
			change(value);
	}

	return (
				<div>
					<p>{subscreddit}</p>
					<label htmlFor="reactjs">reactJs </label><input type="radio"  name="subsreddit" id="reactjs" value="reactjs" onChange={onChange} />
					<label htmlFor="fontEnd">fontEnd</label> <input type="radio" name="subsreddit" id="fontEnd" value="fontEnd" onChange={onChange} />
					<button 

							onClick={()=>{
										refresh(subscreddit);
								}}
					>刷新</button>

				</div>
		)

};

const mapStateToProp= function(state:State):stateProp{

		return {
			subscreddit:state.selectSubreddit
		}
};

const mapDispatchToProp = function(dispatch:any):dispatchProp{

	return {
		change:(subsreddit:string)=>{
					dispatch(slecteSubreddit(subsreddit));
					dispatch(fetchPostsIfNeeded(subsreddit));

		},
		refresh:function(subsreddit:string){

				dispatch(invalidateSubreddit(subsreddit));
				dispatch(fetchPostsIfNeeded(subsreddit))

		}
	}

};





export default connect(mapStateToProp,mapDispatchToProp)(AddTodo);




