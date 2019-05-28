import * as React from "react";
import {RouteComponentProps} from "react-router-dom";
import {connect,MapStateToProps} from "react-redux";



type translateProps={
	
};


type translateState={

	data:any;
	pageNum:string;
	pageSize:string;
	status:string;
	fsex:string;
	fage:string;
	lrdata:string;
	fdept:string; //科室
	gddata:string; //归档时间
}



 class TranslateManage extends React.PureComponent<RouteComponentProps<translateProps> & reduxProp,translateState>{
	

	state:translateState={
		data:null,
		pageNum:"1",
		pageSize:"4",
		status:"0",
		fsex:"0",
		fage: "",
		lrdata: "",
		fdept: "",
		gddata: "",
	}

	 componentDidMount() {

		


	}

	render(){

		const {location:{state:{text}}} = this.props;

		return (
				<div className="g-padding g-gdsummary" >
					<p style={{paddingBottom:16}}>{text}</p>
					<div className="g-translate-box" >
						<div style={{textAlign:"right",padding:10}}>

							<button className="s-btn normal-btn">导出</button>
						</div>
						<div className="g-translate">

							<div className="g-ch-translate m-translate">
								<p className="m-tit">
									深圳市萨米医疗中心
								</p>
								<div className="g-translate-header">
									<div>
										<span >姓名：</span>
										<span >性别：</span>
										<span >年龄：</span>
									</div>
									<div>
										<span >科室：</span>
										<span >床号：</span>
										<span >病案号：</span>
									</div>
								</div>
								<div className="g-en-translate g-tanslate-content">
									<p className="translate-item"><span className="m-right-tit">患者：</span></p>
									<p className="translate-item"><span className="m-right-tit">入院情况：</span></p>
									<p className="translate-item"><span  className="m-right-tit">诊疗经过：</span></p>
									<p className="translate-item"><span className="m-right-tit">出院诊断：</span></p>
									<p className="translate-item"><span className="m-right-tit">出院情况：</span></p>
									<p className="translate-item"><span className="m-right-tit">出院医嘱：</span></p>
								</div>
							</div>
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



