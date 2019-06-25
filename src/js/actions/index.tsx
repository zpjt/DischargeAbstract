
declare global{

	interface app {
			org_ids: string[];
			org_names: string[];
			role_ids: string[];
			role_index:number ;
			role_names:string[];
			status: string;
			user_id: string;
			user_name: string;
			menuUrl:string;
	}

	interface appStore {
			app:TypedMap<app>,
	}

}
const a = "3";

export {a};