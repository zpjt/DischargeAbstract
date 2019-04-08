


interface Window{
	__REDUX_DEVTOOLS_EXTENSION__:any;
}


interface Todo{
	title:string;
	id:string;
}


interface State {
		 selectSubreddit:string,
  	 postBySubreddit:{
  	 		[key:string]:{
          items:Todo[],
          isFectching:boolean,
          didInvalidate:boolean,
          lastUpdated:number , 
         }	
  	 }
}





interface NodeModule {
        hot : {
            accept(path?: string, callback?: () => void): void
        }
    }