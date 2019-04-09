import {Route} from "react-router";
import * as React from "react";

import * as loadable from "react-loadable";

const Main = ({routerData}:{routerData:any[]})=>{

			

			const a = routerData.map(val=>{

						const child  = val.children;
						let childRouter ;
						
						if(child.length){

								childRouter = child.map((val:any)=>{
											const {url,id} = val;
											return <Route path={`${url}`} key={id} component={loadable({
																loader:()=>import("./containers/about/About"),
																loading:()=><div>loading...</div>
															})}  />

									})

						}

				return  childRouter;

			});


			return (a as any).flat();


			// return (

			// 										<Route path="/about" component={loadable({
			// 												loader:()=>import( /*webpackChunkName: "about" */"./containers/about/About"),
			// 												loading:()=><div>loading...</div>
			// 										})}  />

			// 	);


}

export default Main ;