import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import { connect, MapStateToProps } from "react-redux";
import Api from "@api/summary";
import Modal from "@js/common/Modal";
import {Notification} from "@js/common/toast/index";
import Loading from "@js/common/Loading";
type caseProps = {

};


type CaseState = {
	checkArr:string;
	data:any;
	initDelModal:boolean;
	showModal:boolean;
	delId:string;
	fetching:boolean;
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
		initDelModal:false,
		showModal:false,
		delId:"",
		fetching:false,
	}
	notificationRef:React.RefObject<Notification>=React.createRef();
    componentDidMount() {
		this.getTableData(this.props.roleId);
	}
	toggleShowDelModal=()=>{

		this.setState(pre=>{
			return {
				showModal:!pre.showModal,
				initDelModal:true
			}
		})

	}


	componentWillReceiveProps(nextProp:reduxProp){


		if(nextProp.roleId!==this.props.roleId){
			this.getTableData(nextProp.roleId)
		}

	}

	getTableData(role_id:string){
		const flag = this.props.location.pathname === "/summary" ? "0" :"1";
		this.setState({
			fetching:true,
		})
		Api.getAllSummaryCaseByStatus(Object.assign({role_id,flag},this.params)).then(res => {
			this.setState({
				data: res.data,
				fetching:false
			})
		});
	}

	refreshData=()=>{

		this.getTableData(this.props.roleId)
	}

	delCase=()=>{

		const flag = this.state.delId;
		const notification = this.notificationRef.current!;
		Api.delSummaryCaseById(flag).then((res:AxiosInterfaceResponse)=>{

			this.toggleShowDelModal();
			notification.addNotice(res.message,"success")	
			this.getTableData(this.props.roleId);
		});

	}
	delitem=(id:string)=>{

		this.setState({
			delId:id
		});
		
		this.toggleShowDelModal();

	}
	delMultiply=()=>{

		if(!this.state.checkArr){
			this.notificationRef.current!.addNotice("请选择病历！","warn");
			return;
		}

		this.setState(pre=>{
			return {
				delId:pre.checkArr
			}
		});

		this.toggleShowDelModal();

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

	daoPatch=()=>{
		
		const {checkArr} = this.state;
		if(!checkArr){

			this.notificationRef.current!.addNotice("选择病例!","warn");
			return;

		}

		const a = document.createElement("a");
		a.href=window.getSession("getPath")+"summary/wordExport?ids="+checkArr;
		document.body.appendChild(a);
		a.download="文件下载"
		a.click();
		document.body.removeChild(a);

	}

	render() {

		const { location: { state: { text } ,pathname} } = this.props;
		const {data,initDelModal,showModal,fetching} = this.state;
		const modalDom = document.getElementById("s-modal")!;

		return (
			<div className="g-padding g-summary" >
				{fetching?<Loading container={modalDom}/>:null}
				<Notification ref={this.notificationRef}/>
				{initDelModal ? (<Modal 
								className="m-del-modal"
								tit="提示"
								type="question"
								container={modalDom}
								onSure={this.delCase}
								onCancel={this.toggleShowDelModal}
								show={showModal}
						 >
							<p style={{padding:"20px 10px"}}>确定删去吗？</p>
				</Modal>) : null }
				<p style={{ paddingBottom: 16 }}>{text}</p>
				<HeadOpt 
					changeHandle={this.changeState} 
					type={pathname}
					showModal={this.delMultiply}
					daoPatch={this.daoPatch}
				/>
				{data ?  <ResultSearch  
					data={data}
				    changeHandle={this.changeState} 
					type={pathname}
					delItem = {this.delitem}
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



