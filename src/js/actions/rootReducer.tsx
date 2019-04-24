import {combineReducers} from "redux";
import {orgReducer} from "./orgAction"

export default combineReducers({
	orgs:orgReducer,
})