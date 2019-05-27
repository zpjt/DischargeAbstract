import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import {connect,MapStateToProps} from "react-redux";
import axions from "@js/common/AxiosInstance";



type caseProps={
	
};


type CaseState={

	data:any;
	pageNum:string;
	pageSize:string;
	status:string;
	fsex:"男"|"女"|null;
	fage:string|null;
	lrdata:string|null;
}



 class CaseManage extends React.PureComponent<RouteComponentProps<caseProps> & reduxProp,CaseState>{
	

	state:CaseState={
		data:null,
		pageNum:"1",
		pageSize:"4",
		status:"0",
		fsex:"男",
		fage:null,
		lrdata:null,
	}

	componentDidMount(){

		// const {data,...obj} = this.state;
		// const {roleId} = this.props;
		

		
		axions({
		
			url:"summary/getAllSummaryCaseByStatus",
			params:{
				pageNum:"1",
				pageSize:"4",
				role_id:"3202",
				status:"0",
				fdept:"",
				fsex:"男",
				fage:null,
				lrdata:null,
			},

			
			
			
		}).then(res=>{

			console.log(res);

			this.setState({
				data:res.data
			})


		})



	}

	render(){

		const {data} = this.state;
		const {location:{state:{text}}} = this.props;

		return (
				<div className="g-padding g-summary" >

					<p style={{paddingBottom:16}}>{text}</p>
					<HeadOpt />
					<ResultSearch data={data} />
					
						
				</div>
			
			)

	}
}

type reduxProp ={
	roleId:string;
} 

const mapStateToProp:MapStateToProps<reduxProp,caseProps,appStore>=({app})=>{

	const roleId = app.get("role_ids")[app.get("role_index")];
	return {

		roleId,

	}
}


export default connect(mapStateToProp)(CaseManage);



