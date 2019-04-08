import {Route,Switch} from "react-router";
import {Link,BrowserRouter} from "react-router-dom";
import * as React from "react";
import lazyComponent from "@js/common/Boudle";

import * as loadable from "react-loadable"




const Nav = ()=>(
			 <div>
					<Link to="/todo" > tdos </Link>
					<Link to="/about" >Aaddddsout</Link>
				</div> 
	);

const Page = ()=>(
						<BrowserRouter basename="/asdf">
							<Nav/>
							<Switch>
										

								<Route path="/about" component={loadable({
										loader:()=>import(/* webpackChunkName: "about" */"./containers/about/About"),
										loading:()=><div>loading...</div>

								})}  />
									
								<Route path="/todo" 
									component={lazyComponent(()=>import(/* webpackChunkName: "todo" */"@js/index"))}
								/>
							</Switch>
				
							<div id="modal" className="modal"> </div>
						</BrowserRouter>

	);

export default Page ;