import * as React from "react";
import Combobox from "@js/common/combobox/index"


const GlobSearch = ()=>{

	const fn=function(slected:any,field:string,node:any){

			console.log(slected,field,node)
	}

	return (
		
			<div>
				globSearch
				<Combobox field="a"  data={[{id:"1",text:"e",name:"name"},{id:"2","text":"3",name:"eee"}]} multiply={true} inpShowField="name" clickCallback={fn} />
			</div>
			
	)
};




export default GlobSearch;