import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import HeadOpt from "./ConditionHead";
import ResultSearch from "./CaseTable";
import { connect, MapStateToProps } from "react-redux";
import Api from "@api/summary";
import Modal from "@js/common/Modal";
import { Notification } from "@js/common/toast/index";
import Loading from "@js/common/Loading";
import {InpBox} from "@js/common/InputBtn";
type caseProps = {

};


type CaseState = {
	checkArr: string;
	data: any;
	initDelModal: boolean;
	showModal: boolean;
	initUpfileModal: boolean;
	showUpfileModal: boolean;
	delId: string;
	fetching: boolean;
	enPk:string;
	url:string;
}



class CaseManage extends React.PureComponent<RouteComponentProps<caseProps> & reduxProp, CaseState>{

	params: {
		pageNum: string;
		pageSize: string;
		status: string;
		fsex: string;
		fage: string;
		lrdata: string;
		fdept: string; //科室
		gddata: string; //归档时间
	} = {
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
		checkArr: "",
		data: null,
		initDelModal: false,
		showModal: false,
		delId: "",
		fetching: false,
		initUpfileModal: false,
		showUpfileModal: false,
		url:"http://10.100.1.38:8080/iemr/webservice/IEMRWebService?wsdl",
		enPk:""
	}
	notificationRef: React.RefObject<Notification> = React.createRef();
	componentDidMount() {
		this.getTableData(this.props.roleId);
	}
	toggleShowDelModal = () => {

		this.setState(pre => {
			return {
				showModal: !pre.showModal,
				initDelModal: true
			}
		})

	}

	webServerHandle=(field:"url"|"enPk",value:string)=>{




		this.setState({
			[field as "url"]:value
		})


	}

	componentWillReceiveProps(nextProp: reduxProp) {


		if (nextProp.roleId !== this.props.roleId) {
			this.getTableData(nextProp.roleId)
		}

	}

	getTableData(role_id: string) {
		const flag = this.props.location.pathname === "/summary" ? "0" : "1";
		this.setState({
			fetching: true,
		})
		Api.getAllSummaryCaseByStatus(Object.assign({ role_id, flag }, this.params)).then(res => {
			this.setState({
				data: res.data,
				fetching: false
			})
		});
	}

	refreshData = () => {

		this.getTableData(this.props.roleId)
	}

	delCase = () => {

		const flag = this.state.delId;
		const notification = this.notificationRef.current!;
		Api.delSummaryCaseById(flag).then((res: AxiosInterfaceResponse) => {

			this.toggleShowDelModal();
			notification.addNotice(res.message, "success")
			this.getTableData(this.props.roleId);
		});

	}
	delitem = (id: string) => {

		this.setState({
			delId: id
		});

		this.toggleShowDelModal();

	}
	delMultiply = () => {

		if (!this.state.checkArr) {
			this.notificationRef.current!.addNotice("请选择病历！", "warn");
			return;
		}

		this.setState(pre => {
			return {
				delId: pre.checkArr
			}
		});

		this.toggleShowDelModal();

	}

	changeState = (filed: "checkArr" | keyof CaseManage["params"], value: string) => {

		if (filed === "checkArr") {

			this.setState({
				checkArr: value
			})
		} else {
			this.params[filed] = value;
			this.getTableData(this.props.roleId);
		}
	}

	upfileHandle = () => {

		const {enPk,url} = this.state;
		if(!enPk || !url){

			this.notificationRef.current!.addNotice("填写完整！","warn");
		}
		Api.upCaseFile(url,enPk).then((res:AxiosInterfaceResponse)=>{


			if(res.code==200){

				this.getTableData(this.props.roleId);
				this.toggleShowUpfileModal();
			}

			this.notificationRef.current!.addNotice(res.message,(res.code==200?"success":"warn"));



		})

	}
	toggleShowUpfileModal = () => {
		this.setState(pre => {
			return {
				showUpfileModal: !pre.showUpfileModal,
				initUpfileModal: true
			}
		});

	}

	daoPatch = () => {

		const { checkArr } = this.state;
		if (!checkArr) {

			this.notificationRef.current!.addNotice("选择病例!", "warn");
			return;

		}

		const a = document.createElement("a");
		a.href = window.getSession("getPath") + "summary/wordExport?ids=" + checkArr;
		document.body.appendChild(a);
		a.download = "文件下载"
		a.click();
		document.body.removeChild(a);

	}

	

	render() {


		const { location: { state: { text }, pathname }, roleId } = this.props;





		const { data, initDelModal, showModal, fetching, initUpfileModal, showUpfileModal ,url,enPk} = this.state;
		const modalDom = document.getElementById("s-modal")!;

		return (
			<div className="g-padding g-summary" >
				{fetching ? <Loading container={modalDom} /> : null}
				<Notification ref={this.notificationRef} />
				{initDelModal ? (<Modal
					className="m-del-modal"
					tit="提示"
					type="question"
					container={modalDom}
					onSure={this.delCase}
					onCancel={this.toggleShowDelModal}
					show={showModal}
				>
					<p style={{ padding: "20px 10px" }}>确定删去吗？</p>
				</Modal>) : null}
				{initUpfileModal ? (<Modal
					className="pwd-M"
					tit="导入病例"
					container={modalDom}
					onSure={this.upfileHandle}
					onCancel={this.toggleShowUpfileModal}
					show={showUpfileModal}
					
				>
					<div className="m-file-box">

						<p className="item-inp" style={{color:"#535be9",padding:"0 10px"}}><span className="m-inp-tit">url提示</span>http://10.100.1.38:8080/iemr/webservice/IEMRWebService?wsdl</p>
						<InpBox
							type="text"
							styleType="normal"
							field="url"
							title="URL"
							value={url}
							changeHandle={this.webServerHandle}
						/>
						<InpBox
							type="text"
							styleType="normal"
							field="enPk"
							title="就诊流水号"
							value={enPk}
							changeHandle={this.webServerHandle}
						/>
					</div>	
				</Modal>) : null}

				<p style={{ paddingBottom: 16 }}>{text}</p>
				<HeadOpt
					changeHandle={this.changeState}
					type={pathname}
					showModal={this.delMultiply}
					daoPatch={this.daoPatch}
					roleId={roleId}
					showUpfileHandle={this.toggleShowUpfileModal}

				/>
				{data ? <ResultSearch
					data={data}
					changeHandle={this.changeState}
					type={pathname}
					delItem={this.delitem}
					roleId={roleId}
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



