import {fetchPostOrgIfNeeded} from "./orgAction";
import {fetchPostLoginIfNeeded} from "./LoginAction";
import * as Immutable from "immutable";


type orgItem = {
			dim_id: string;
			dim_name: string;
			dim_value: string;
			par_id:string;
			sub: orgItem[];
			type: string;
}



declare global{

	interface orgState {
				isFetch:boolean;
				data:orgItem[];

	}

	interface app {
		isLogin:boolean;
		isFetching:boolean;
		userInfo:{[key:string]:string; };
	}

	interface appStore {
			app:TypedMap<app>,
			orgs:Immutable.Map<string,any>,
	}

}

export {fetchPostOrgIfNeeded,fetchPostLoginIfNeeded};