import {combineReducers} from "redux";
import {orgReducer} from "./orgAction";
import {loginReducer} from "./LoginAction";

export default combineReducers({
	orgs:orgReducer,
	app:loginReducer,
})