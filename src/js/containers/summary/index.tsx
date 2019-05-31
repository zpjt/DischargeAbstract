import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import { connect, MapStateToProps } from "react-redux";
import Api from "@api/summary";

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
	checkArr:string;
	data:any;
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
	//  componentWillUpdate(nextProp:reduxProp,nextState:CaseState){


	//  	console.log(nextProp,nextState,"will")
		
    // }
	
	getTableData(role_id:string){

		const {checkArr,data, ...obj } = this.state;
		
		Api.getAllSummaryCaseByStatus(Object.assign({role_id},obj)).then(res => {
			this.setState({
				data: res.data
			})
		});


	}


    


	changeState = (filed: "checkArr" , value: string) => {


			this.setState({
			[filed]:value
			},()=>{
				filed !=="checkArr" && this.getTableData(this.props.roleId);
			})


	}

	render() {

		const { location: { state: { text } } } = this.props;
		const {data,checkArr} = this.state;

		return (
			<div className="g-padding g-summary" >

				<p style={{ paddingBottom: 16 }}>{text}</p>
				<HeadOpt checkArr={checkArr} />
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



