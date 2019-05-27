import * as React from "react";

type ReportOpinionProp = {
}

type ReportOpinionState = {
}

class ReportOpinion extends React.PureComponent<ReportOpinionProp,ReportOpinionState>{


	render(){

		return (<>
							<p className="main-tit">跟踪意见：</p>
							<div className="main" style={{height: "120px"}}>
								
								</div>
							<div className="footer">
								<span className="detail">	
											<label >职能科室：</label>
											<span className="underline" style={{width: "80px"}}></span>
								</span>
								<span className="detail" >	
										<span>日期：</span><span className="underline" style={{width: "80px"}}></span>
								</span>
							</div>
							</>
						)

	}
}



type ReportOrangeOpinionProp = {

}

type ReportOrangeOpinionState = {



}

class ReportOrangeOpinion extends React.PureComponent<ReportOrangeOpinionProp,ReportOrangeOpinionState>{


	render(){

		return (<>
							<p className="main-tit">医疗质量与安全管理委员会意见：</p>
							<div className="main" style={{height: "120px"}}>
									
								</div>
							<div className="footer">
								<span className="detail">	
											<label >质控科：</label>
											<span className="underline" style={{width: "80px"}}></span>
								</span>
								<span className="detail" >	
										<span>日期：</span><span className="underline" style={{width: "80px"}}></span>
								</span>
							</div>
							</>)

	}
}


export {ReportOpinion,ReportOrangeOpinion};