import {Route} from "react-router";
import * as React from "react";
import Loading from "@js/common/Loading";

import * as loadable from "react-loadable";

const Main = ()=>{

			return (
								<>
									<Route path="/summary" component={loadable({
											loader:()=>import( /*webpackChunkName: "summary" */"./containers/summary/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<Route path="/gdsummary" component={loadable({
											loader:()=>import( /*webpackChunkName: "gdsummary" */"./containers/gdsummary/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<div  id="s-modal"></div>
								</>
				);
}

export default Main ;