import {Route} from "react-router";
import * as React from "react";
import Loading from "@js/common/Loading";

import * as loadable from "react-loadable";

const Main = ()=>{

			return (
								<>
									<Route path="/index/report" component={loadable({
											loader:()=>import( /*webpackChunkName: "report" */"./containers/report/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<Route path="/index/my_report" component={loadable({
											loader:()=>import( /*webpackChunkName: "myReport" */"./containers/myReport/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<Route path="/index/my_back" component={loadable({
											loader:()=>import( /*webpackChunkName: "myBack" */"./containers/myBack/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<Route path="/index/my_analysis" component={loadable({
											loader:()=>import( /*webpackChunkName: "myAnalysis" */"./containers/myAnalysis/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<Route path="/index/my_inspector" component={loadable({
											loader:()=>import( /*webpackChunkName: "myInspector" */"./containers/myInspector/index"),
											loading:()=><Loading.LoadingCom  />
									})}  />
									<div  id="s-modal"></div>
								</>
				);
}

export default Main ;