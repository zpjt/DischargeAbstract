import {combineReducers} from "redux";
import {userInfo} from "./appAction";

export default combineReducers({
	app:userInfo,
})