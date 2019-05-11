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



/*type AllowedValue =
  string |
  number |
  boolean |
  AllowedMap |
  AllowedList |
  TypedMap<any> |
  undefined;

interface AllowedList extends Immutable.List<AllowedValue> {}

interface AllowedMap extends Immutable.Map<string, AllowedValue> {}

export type MapTypeAllowedData<DataType> = {
  [K in keyof DataType]: AllowedValue;
};

export interface TypedMap<DataType extends MapTypeAllowedData<DataType>> extends Immutable.Map<keyof DataType, AllowedValue> {
  toJS(): DataType;
  get<K extends keyof DataType>(key: K, notSetValue?: DataType[K]): DataType[K];
  set<K extends keyof DataType>(key: K, value: DataType[K]): this;
}

const createTypedMap = <DataType extends MapTypeAllowedData<DataType>>(data: DataType): TypedMap<DataType> => Immutable.Map(data) as any;*/



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