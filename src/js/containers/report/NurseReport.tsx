import * as  React from "react";
import ReportHead from "./component/ReportHead";
import ReportSecond from "./component/ReportSecond";
import {ReportResult} from "./component/ReportThree";
import {ReportSeason,ReportImproveMeasure} from "./component/ReportFour";
import {ReportOpinion,ReportOrangeOpinion} from "./component/ReportFive";
import OrgDefineLevel from "./component/OrgDefineLevel";


type NurseReportProps={
		formType:string;
		showPage:number;
		getMethods:ReportSpace.ReportAPI["getMethods"];
		upOrgName:string;
}

type NurseReportState={


}

export default class NurseReport extends React.PureComponent<NurseReportProps,NurseReportState>{



	render(){

		const {showPage,formType,getMethods,upOrgName} = this.props;

		let statusArr = new Array(2).fill("none"); 
				statusArr[showPage] = "block";

		const hospitalName		 = "中医院";

		return (<>
								
									<div className="report-content" style={{display:statusArr[0]}}>
											<table >
												<tbody>
													<tr>
														<td>
																<ReportHead formType={formType} hospitalName={hospitalName} getMethods={getMethods} upOrgName={upOrgName} />
														</td>
													</tr>
													<tr>
														<td>
																<ReportSecond formType={formType} getMethods={getMethods}/>
														</td>
													</tr>
													<tr>
														<td>
																<ReportResult hospitalName={hospitalName}  getMethods={getMethods}/>
														</td>
													</tr>
													<tr>
														<td >
																<ReportSeason hospitalName={hospitalName} getMethods={getMethods} />
														</td>
													</tr>
													</tbody>
											</table>
									</div>
									<div className="report-content" style={{display:statusArr[1]}}>
											<table >
												<tbody>
													
													<tr>
														<td >
																<ReportImproveMeasure  getMethods={getMethods} />
														</td>
													</tr>
													<OrgDefineLevel  getMethods={getMethods}/>
													<tr>
															<td >
																	<ReportOpinion/>
															</td>
														</tr>
														<tr>
															<td >
																	<ReportOrangeOpinion/>
																	
															</td>
														</tr>
													</tbody>
												</table>
									</div>

						</>)

	}

}