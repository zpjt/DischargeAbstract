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



/*declare function Immutable<T>(o: T): Immutable<T>;

interface Immutable<T> {
  get<K extends keyof T>(name: K): T[K];
  set<S>(o: S): Immutable<T & S>;
}

const alice = Immutable({ name: 'Alice', age: 29 });
alice.get('name');      // Ok, returns a `string`
alice.get('age');       // Ok, returns a `number`
alice.get('lastName');  // Error: Argument of type '"lastName"' is not assignable to parameter of type '"name" | "age"'.

const aliceSmith = alice.set({ lastName: 'Smith' });
aliceSmith.get('name');     // Ok, returns a `string`
aliceSmith.get('age');      // Ok, returns a `number`
aliceSmith.get('lastName'); // Ok, returns `string`*/


/*interface IState {
  foo: string;
  bar: number;
}

const State = Record<IState>({
  foo: '123',
  bar: 456
});

type StateType = Record<IState> & IState;*/



declare global{

	/*interface MapState<T> extends Immutable.Map<string,any>{
		get<K extends keyof T>(key:K):T[K];

	}*/

	interface orgState {
				isFetch:boolean;
				data:orgItem[];
	}
	

	interface appStore {
			app:Immutable.Map<string,any>,
			orgs:Immutable.Map<string,any>,
	}
}

export {fetchPostOrgIfNeeded};