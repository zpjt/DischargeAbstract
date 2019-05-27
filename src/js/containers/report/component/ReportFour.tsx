import * as React from "react";
import Calendar  from "@js/common/calendar/index";

type ReportSeasonProp = {
	hospitalName:ReportSpace.hospitalName; // 医院名称
	getMethods:ReportSpace.ReportAPI["getMethods"];
}

type ReportSeasonState = {

}

class ReportSeason extends React.PureComponent<ReportSeasonProp,ReportSeasonState>{


	render(){
			const {hospitalName,getMethods} = this.props;
			const inputChange = getMethods<"inputChange">("inputChange");
			const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
			const {analysisCauses,man,ring,machine,object,law,acDate} = getMethods<"getParams">("getParams")();

		return (<>
							<p className="main-tit">原因分析：</p>
							<div className="main" >

									{hospitalName !== "中医院" ? <textarea  
																								className="txtInp" 
																								placeholder="填写内容..." 
																								maxLength={340} 
																								onChange={inputChange}
																								defaultValue={analysisCauses}
																								name="analysisCauses"
																								style={{height:190}}
																							/> : 
												(
												<>
													 <div className="reportSeason-txtItem">
													 	<span>人：</span>
													 	<textarea  
	 																	className="txtInp" 
	 																	placeholder="填写内容..." 
	 																	maxLength={100} 
	 																	onChange={inputChange}
	 																	defaultValue={man}
	 																	name="man"
	 															/>
													 </div>
													 <div className="reportSeason-txtItem">
													 	<span>机：</span>
													 	<textarea  
	 																	className="txtInp" 
	 																	placeholder="填写内容..." 
	 																	maxLength={100} 
	 																	onChange={inputChange}
	 																	defaultValue={machine}
	 																	name="machine"
	 															/>
													 </div>
													 <div className="reportSeason-txtItem">
													 	<span>物：</span>
													 	<textarea  
	 																	className="txtInp" 
	 																	placeholder="填写内容..." 
	 																	maxLength={100} 
	 																	onChange={inputChange}
	 																	defaultValue={object}
	 																	name="object"
	 															/>
													 </div>
													 <div className="reportSeason-txtItem">
													 	<span>法：</span>
													 	<textarea  
	 																	className="txtInp" 
	 																	placeholder="填写内容..." 
	 																	maxLength={100} 
	 																	onChange={inputChange}
	 																	defaultValue={law}
	 																	name="law"
	 															/>
													 </div>
													 <div className="reportSeason-txtItem">
													 	<span>环：</span>
													 	<textarea  
	 																	className="txtInp" 
	 																	placeholder="填写内容..." 
	 																	maxLength={100} 
	 																	onChange={inputChange}
	 																	defaultValue={ring}
	 																	name="ring"
	 															/>
													 </div>
												</>
										)}

							</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input type="text"  className="inp" name="acSignatory" onChange={inputChange} style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><Calendar  width={120} field="acDate" clickBack={setCalendarObj} selTimeValArr={acDate} />
								</div>
							</div>
							</>
						)

	}
}



type ReportImproveMeasureProp = {
	getMethods:ReportSpace.ReportAPI["getMethods"];
}

type ReportImproveMeasureState = {



}

class ReportImproveMeasure extends React.PureComponent<ReportImproveMeasureProp,ReportImproveMeasureState>{


	render(){

			const {getMethods} = this.props;
			const inputChange = getMethods<"inputChange">("inputChange");
			const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
			const {caSignatory,correctiveActions,caDate} = getMethods<"getParams">("getParams")();

		return (<>
							<p className="main-tit require">改进措施：</p>
							<div className="main" style={{height: "160px"}}>
									<textarea name="correctiveActions" required defaultValue={correctiveActions} onChange={inputChange} className={correctiveActions ? "txtInp" :"txtInp no-fill"} placeholder="填写内容..." maxLength={280}></textarea>
								</div>
							<div className="footer">
								<div className="detail">	
											<label >护士长：<input defaultValue={caSignatory} name="caSignatory" type="text"  className="inp" style={{width:"120px"}} /></label>
								</div>
								<div className="detail">	
										<span>日期：</span><Calendar  width={120} field="caDate" clickBack={setCalendarObj} selTimeValArr={caDate} />
								</div>
							</div>
							</>)

	}
}


export {ReportSeason,ReportImproveMeasure};