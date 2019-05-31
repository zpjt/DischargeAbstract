import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import { connect, MapStateToProps } from "react-redux";
import Api from "@api/summary";

type caseProps = {

};


type CaseState = {
	checkArr:string;
	data:any;
}



class CaseManage extends React.PureComponent<RouteComponentProps<caseProps> & reduxProp, CaseState>{

	params:{
		pageNum: string;
		pageSize: string;
		status: string;
		fsex: string;
		fage: string;
		lrdata: string;
		fdept: string; //科室
		gddata: string; //归档时间
	}={
		pageNum: "1",
		pageSize: "10",
		status: "0",
		fsex: "0",
		fage: "",
		lrdata: "",
		fdept: "", //科室
		gddata: "", //归档时间
	}

	state: CaseState = {
		checkArr:"",
		data:null,
	}

    componentDidMount() {
		this.getTableData(this.props.roleId);
	}

	componentWillReceiveProps(nextProp:reduxProp){


		if(nextProp.roleId!==this.props.roleId){
			this.getTableData(nextProp.roleId)
		}

	}

	getTableData(role_id:string){
		Api.getAllSummaryCaseByStatus(Object.assign({role_id},this.params)).then(res => {
			this.setState({
				data: res.data
			})
		});
	}

	refreshData=()=>{

		this.getTableData(this.props.roleId)
	}

	changeState = (filed: "checkArr" | keyof CaseManage["params"], value: string) => {
		
			if(filed==="checkArr"){

				this.setState({
					checkArr:value
				})
			}else{
				this.params[filed] = value;
				this.getTableData(this.props.roleId);
			}
	}

	render() {

		const { location: { state: { text } } } = this.props;
		const {data,checkArr} = this.state;

		return (
			<div className="g-padding g-summary" >

				<p style={{ paddingBottom: 16 }}>{text}</p>
				<HeadOpt 
				checkArr={checkArr} 
				refreshHandle={this.refreshData} 
				changeHandle={this.changeState} 
				
				/>
				{data ?  <ResultSearch  
					data={data}
				    changeHandle={this.changeState} 
				/> : null}

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



