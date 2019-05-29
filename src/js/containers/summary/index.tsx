import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import { connect, MapStateToProps } from "react-redux";



type caseProps = {

};


type CaseState = {

	pageNum: string;
	pageSize: string;
	status: string;
	fsex: string;
	fage: string;
	lrdata: string;
	fdept: string; //科室
	gddata: string; //归档时间
}



class CaseManage extends React.PureComponent<RouteComponentProps<caseProps> & reduxProp, CaseState>{


	state: CaseState = {
		pageNum: "1",
		pageSize: "10",
		status: "0",
		fsex: "0",
		fage: "",
		lrdata: "",
		fdept: "",
		gddata: "",
	}

	


	changeState = (filed: "pageSize", value: string) => {


			this.setState({
			[filed]:value
			})


	}

	render() {

		const { location: { state: { text } } ,roleId} = this.props;
		const {pageNum,pageSize,lrdata,fdept,fage,fsex,status,gddata} = this.state;

		return (
			<div className="g-padding g-summary" >

				<p style={{ paddingBottom: 16 }}>{text}</p>
				<HeadOpt />
				<ResultSearch  

					changeHandle={this.changeState} 
					role_id={roleId}
					pageNum={pageNum}
					fsex={fsex}
					pageSize={pageSize}
					lrdata={lrdata}
					fdept={fdept}
					fage={fage}
					status={status}		
					gddata={gddata}		
				/>


			</div>

		)

	}
}

type reduxProp = {
	roleId: string;
}

const mapStateToProp: MapStateToProps<reduxProp, caseProps, appStore> = ({ app }) => {

	const roleId = app.get("role_ids")[app.get("role_index")];
	return {

		roleId,

	}
}


export default connect(mapStateToProp)(CaseManage);



