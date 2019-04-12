import {Route} from "react-router";
import * as React from "react";

import * as loadable from "react-loadable";

const Main = ()=>{

			return (
								<>
									<Route path="/ill_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "illSearch" */"./containers/illSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/con_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "conSearch" */"./containers/conSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/glob_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "globSearch" */"./containers/globSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/translate" component={loadable({
											loader:()=>import( /*webpackChunkName: "translate" */"./containers/translate/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/usermanage" component={loadable({
											loader:()=>import( /*webpackChunkName: "usermanage" */"./containers/usermanage/index"),
											loading:()=><div>loading...</div>
									})}  />
								</>
				);
}

export default Main ;