import * as React from "react";



class Head extends React.Component{



	

	render(){

		
		return (<div className="g-head">

							<span className="m-theme">出院小结双语平台</span>
							<div className="g-sys_set">
								<div>
										<p>切换语言</p>
								</div>
								<div>
									<p>系统设置</p>
								</div>
								<div className="g-user-opt" >
									<div style={{padding:"20px 10px",}}>
										<span className="fa fa-user">&nbsp;&nbsp;</span>
										<span>demo</span>
									</div>
									<ul className="m-sysOpt">
											<li>
												<span className="fa fa-power-off ">&nbsp;&nbsp;</span>
												<span>推出系统</span>
											</li>
									</ul>
								</div>
							</div>
						</div>
						); 


	}



};

export default Head ;