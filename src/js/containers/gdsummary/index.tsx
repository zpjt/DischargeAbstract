import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalText from "../summary/CaseModalText";
import Api from "@api/gdsummary";
import CaseModalInp from "../summary/CaseModalInp";
import {Link} from "react-router-dom";
import {Button,Icon} from "@js/common/Button";
import {Notification} from "@js/common/toast/index";
import Modal from "@js/common/Modal";
type translateProps = {
	data:any;
	id:string;
	type:string;//路由路径
	pathTo(path:"gdsummary"|"summary"):void;
};


type translateState = SummarySpace.params & {
	initModal:boolean;
	showModal:boolean;
}; 
	


type ContainerState = {
	data:any;
}
		   //     return <span className={name}>{["","未翻译","翻译（未提交）","提交（未审核）","驳回","已审核","报错"][status]}</span>; 
		   
enum caseStatus {
	noTranslate = 1,
	translate,
	submitCase,
	returnCase,
	checkedCase,
	errorCase
}


class TranslateManage extends React.PureComponent<translateProps, translateState> {

	obj = {
			fname: "",
			fsex: "",
			fage: "",
			fdept: "",
			fdeb: "",
			fprn: "",
			fsurvey: "",
			fryqk: "",
			fryzd: "",
			fzljg: "",
			fcyzd: "",
			fcyqk: "",
			fcyyz: "",
			frydata: "",
			fcydata: "",
			fsumd: "",
	}
	
	state:translateState = this.initState(this.props.data.english);
	notificationRef:React.RefObject<Notification> = React.createRef();
	initState(data:SummarySpace.params){

		const obj ={
			fname: "",
			fsex: "",
			fage: "",
			fdept: "",
			fdeb: "",
			fprn: "",
			fsurvey: "",
			fryqk: "",
			fryzd: "",
			fzljg: "",
			fcyzd: "",
			fcyqk: "",
			fcyyz: "",
			frydata: "",
			fcydata: "",
			fsumd: "",
			initModal:false,
			showModal:false,
		} ;
    
        if(data){
            for (const iterator  in obj) {
               const key = iterator as "fname";
                 data[key] && (obj[key] = data[key]);
            }
		};

		;
		
		 
		// obj.initModal = hasModal;
		// obj.showModal = hasModal;

		return obj ;


	}
	componentDidMount(){
		const chinaData = this.props.data.china;
		 const hasModal = chinaData.status == caseStatus.errorCase ? chinaData.errmessages : chinaData.status == caseStatus.returnCase ? chinaData.descr :false;
		
		hasModal && this.notificationRef.current!.addNotice( (caseStatus.returnCase && "驳回："||"报错：")+hasModal,"warn",0)

	}
	
	changeState=(field:keyof SummarySpace.params,value:string)=>{

		this.setState({
			[field as "fname"]:value,
		})

	}

	submit=(e:React.MouseEvent<HTMLButtonElement>)=>{
		const type = e.currentTarget!.name as "save" | "submit" | "error" |"pass" |"reject";
		const {id,pathTo} = this.props;

		const obj =Object.assign({id},this.state); 
		const notification = this.notificationRef.current!;

		switch (type) {
			case "error":
				// Api.upSummaryCaseError(id,"报错").then(res=>{

				// 		console.log(res);
				// 		pathTo("summary");
				// });
				this.toggleModal();
				break;
			case "submit":
				if(document.querySelectorAll("#g-gdsummary .no-fill").length){
					notification.addNotice("填写完整，然后提交！","warn")
					return ;
				}
				Api.commitEnSummaryCase(obj).then(()=>{
						pathTo("gdsummary");
				});	
					break;
			case "save":
				Api.updataEnSummaryCase(obj).then(()=>{
					notification.addNotice("保存成功","success")
				});	
					break;
			case "pass"	:
				Api.passEnSummaryCase(id).then(()=>{
						pathTo("gdsummary");
				})
				break;
			case "reject":
				// Api.returnSummaryCase(id,"驳回").then(()=>{
				// 		pathTo("summary");
				// });
				this.toggleModal();
				break;
			default:
				break;
		}
	}

	getDao(){


		return (<div className="j-dao" >
					<Link to={{ pathname: "/gdsummary", state: { text: "归档文案" } }}><button className="s-btn line-btn green ">返回</button></Link>
					<div > 
						<span><button className="s-btn normal-btn primary">导出</button></span>
						<ul className="m-dao-drop">
							<li><i className="fa fa-file-image-o">&nbsp;</i><span>导出图片</span></li>
							<li><i className="fa fa-file-pdf-o">&nbsp;</i><span>导出pdf</span></li>
							<li><i className="fa fa-file-word-o"></i>&nbsp;<span>导出文档</span></li>
							<li><i className="fa fa-print"></i>&nbsp;<span>打印</span></li>
						</ul>
					</div>
				</div>)
	}

	getCheckOpt(){


		return (
			<div className="m-check-opt">
				<Link to={{ pathname: "/gdsummary", state: { text: "归档文案" } }}><button className="s-btn line-btn green ">返回</button></Link>
				<button className="s-btn normal-btn danger" name="reject" onClick={this.submit}>驳回</button>
				<button className="s-btn normal-btn green" name="pass" onClick={this.submit}>通过</button>
			</div>
		)
	}
	
	toggleModal=()=>{

		this.setState(pre=>({
			initModal:true,
			showModal:!pre.showModal
		}));
	}
	render() {

		const { data,type,} = this.props;
		const {initModal,showModal} = this.state;
		const status = data.china.status;
		const is_gdsummary = type == "/gdsummary";
		const text = is_gdsummary && "归档文案" || "病例清单"
		return (
			<div className="g-padding g-gdsummary" id="g-gdsummary" >
				{
					initModal ? (<Modal
						
						show={showModal}
						tit={is_gdsummary ? "驳回" :"报错"}
						type="tip"
						onSure={()=>console.log(1)}
						onCancel={this.toggleModal}
						className="m-translate-modal"
						container= {document.getElementById("s-modal")!}
					
					>
						<div>

							<span>原因：</span>
							<textarea rows={3}></textarea>
						</div>

					</Modal>):null
				}
				<Notification ref={this.notificationRef} />
				<p style={{ paddingBottom: 16 }}>{text} / 查看详情</p>
				<div className="g-translate-box" >

				{is_gdsummary ? status == "5" ? this.getDao():this.getCheckOpt(): null} 
					<div className="g-translate">

							<CaseModalText
								type="ch"
								params={data.china}
							/> 

						{!is_gdsummary ?<CaseModalInp
							data={this.state}
							type="en"
							changeState={this.changeState}
						/>:<CaseModalText
							params={this.obj}
							type="en"
						/>}

					</div>
				
					{!is_gdsummary ? (<div className="translate-footer-opt">
						<Button field="error" handle={this.submit} styleType="line-btn" type="danger"><Icon styleType=""/>报错</Button>
						<Button field="save" handle={this.submit}  type="green"><Icon styleType="fa-floppy-o"/>保存</Button>
						<button className="s-btn normal-btn primary" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
						<Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><button className="s-btn line-btn green" ><i className="fa fa-undo">&nbsp;</i>返回</button></Link>
					</div>):null}
				</div>
				
			</div>

		)

	}
}


class Container extends React.PureComponent<RouteComponentProps<reduxProp>,ContainerState> {

	state={
		data:null,
	}

	back=(path:"gdsummary" | "summary")=>{

		this.props.history.push({ pathname: "/"+path, state: { text: "病历清单" } })
	}
	componentDidMount() {

		const { id } = this.props.location.state;


		Api.getSummaryCaseById(id).then(res => {

			this.setState({
				data: res.data
			})
		})
	}

	render(){

		const {data} = this.state;
		const{location:{state:{id,type}} } =this.props;

		return data ? <TranslateManage data={data} id={id}  type={type}  pathTo={this.back}/>:null;
	}
}


type reduxProp = {
	roleId: string;
}

const mapStateToProp: MapStateToProps<reduxProp, translateProps, appStore> = ({ app }) => {

	const roleId = app.get("role_ids")[app.get("role_index")];
	return {

		roleId,

	}
}


export default connect(mapStateToProp)(Container);



