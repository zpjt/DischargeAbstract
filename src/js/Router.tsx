import {Route} from "react-router";
import * as React from "react";

import * as loadable from "react-loadable";

const Main = ()=>{

			return (
								<>
									<Route path="/index/ill_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "illSearch" */"./containers/illSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/index/con_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "conSearch" */"./containers/conSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/index/glob_search" component={loadable({
											loader:()=>import( /*webpackChunkName: "globSearch" */"./containers/globSearch/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/index/translate" component={loadable({
											loader:()=>import( /*webpackChunkName: "translate" */"./containers/translate/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/index/usermanage" component={loadable({
											loader:()=>import( /*webpackChunkName: "usermanage" */"./containers/usermanage/index"),
											loading:()=><div>loading...</div>
									})}  />
									<Route path="/index/ill_type/:type" component={loadable({
											loader:()=>import( /*webpackChunkName: "illType" */"./containers/illSearch/illType"),
											loading:()=><div>loading...</div>
									})}  />
									<div  id="s-modal"></div>
								</>
				);
}

export default Main ;