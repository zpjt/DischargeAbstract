import {fetchPostOrgIfNeeded} from "./orgAction";
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

	interface MapState<T> extends Immutable.Map<string,any>{
		get<K extends keyof T>(key:K):T[K];

	}

	interface orgState {
				isFetch:boolean;
				data:orgItem[];
	}
	

	interface appStore {
			app:MapState<{
				isFetch:boolean;	
			}>,
			orgs:MapState<orgState>
	}
}



export {fetchPostOrgIfNeeded};