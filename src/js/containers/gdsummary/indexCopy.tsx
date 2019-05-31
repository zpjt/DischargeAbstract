import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import {connect,MapStateToProps} from "react-redux";
import CaseModalText from "../summary/CaseModalText";
import Api from "@api/gdsummary";


type translateProps={
	
};


type translateState={
	
	chData:any;
}



 class TranslateManage extends React.PureComponent<RouteComponentProps<translateProps> & reduxProp,translateState>{
	

	state:translateState={
		chData:null,
	}

	componentDidMount() {

		const {id} = this.props.location.state;

		Api.getSummaryCaseById(id).then(res=>{



			this.setState({
				chData:res.data.china
			})
		})


	}

	render(){

		const {location:{state:{text}}} = this.props;

		const {chData} = this.state;

		return (
				<div className="g-padding g-gdsummary" >
					<p style={{paddingBottom:16}}>{text}</p>
					<div className="g-translate-box" >
						<div style={{textAlign:"right",padding:10}}>

							<button className="s-btn normal-btn">导出</button>
						</div>
						<div className="g-translate">

							{ chData ?
							 
							<CaseModalText
								type="ch"
								params={chData}
							
							/>:null}



							<div className="g-ch-translate m-translate">
								<p className="m-tit">
									Shenzhen Samii Medical Center	
								</p>
								<div className="g-translate-header">
									<div>
										<span >Name：</span>
										<span >Gender：</span>
										<span >Age：</span>
									</div>
									<div>
										<span >Administrative office：</span>
										<span >Bed Number：</span>
										<span >Medical record number：</span>
									</div>
								</div>
								<div className="g-en-translate g-tanslate-content">
									<p className="translate-item"><span className="m-right-tit4">Patient：</span></p>
									<p className="translate-item"><span className="m-right-tit4">Admission situation：</span></p>
									<p className="translate-item"><span  className="m-right-tit4">Medical treatment：</span></p>
									<p className="translate-item"><span className="m-right-tit4">Discharge diagnosis：</span></p>
									<p className="translate-item"><span className="m-right-tit4">Discharge situation：</span></p>
									<p className="translate-item"><span className="m-right-tit4">Discharge Instructions：</span></p>
								</div>
							</div>
							
						</div>
					</div>
				</div>
			
			)

	}
}

type reduxProp ={
	roleId:string;
} 

const mapStateToProp:MapStateToProps<reduxProp,translateProps,appStore>=({app})=>{

	const roleId = app.get("role_ids")[app.get("role_index")];
	return {

		roleId,

	}
}


export default connect(mapStateToProp)(TranslateManage);



