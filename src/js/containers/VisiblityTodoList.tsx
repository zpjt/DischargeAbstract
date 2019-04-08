import {connect} from "react-redux";
import * as Immutable from "immutable";
import TodoList from "../components/TodoList";




 
const mapStateToProp = (state:any)=>{

	const $$data:any =   state.postBySubreddit.get(state.selectSubreddit) || Immutable.Map({isFectching:false,items:[]}) 

	const isFectching = $$data.get("isFectching");
	return {
		todos:$$data.get("items"),
		isFectching
		}
};

export default connect(mapStateToProp)(TodoList);




