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
								<div>
									<span className="fa fa-user">&nbsp;&nbsp;</span>
									<span>demo</span>
								</div>
							</div>
						</div>
						); 


	}



};

export default Head ;