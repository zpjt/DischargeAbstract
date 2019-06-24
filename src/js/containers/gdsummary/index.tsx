import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalText from "../summary/CaseModalText";
import Api from "@api/gdsummary";
import CaseModalInp from "../summary/CaseModalInp";
import {Link} from "react-router-dom";
import {Button,Icon, SvgIcon} from "@js/common/Button";
import {Notification} from "@js/common/toast/index";
import Modal from "@js/common/Modal";
import html2canvas from "html2canvas";

type translateProps = {
	data:any;
	id:string;
	type:string;//路由路径
	roleId:string;
	pathTo(path:"gdsummary"|"summary"):void;
};


type translateState = SummarySpace.params & {
	initModal:boolean;
	showModal:boolean;
	reasonTxt:string;
}; 
	


type ContainerState = {
	data:any;
}
		  
		   
enum caseStatus {
	noTranslate = 1,
	translate,
	submitCase,
	returnCase,
	checkedCase,
	errorCase
}



class TranslateManage extends React.PureComponent<translateProps, translateState> {
	static pathObj = { pathname: "/gdsummary", state: { text: "归档文案" } }
	
	
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
			reasonTxt:"",
		} ;
    
        if(data){
            for (const iterator  in obj) {
               const key = iterator as "fname";
                 data[key] && (obj[key] = data[key]);
            }
		};

		return obj ;

	}
	componentDidMount(){
		const chinaData = this.props.data.china;
		 const hasModal = chinaData.status == caseStatus.errorCase ? chinaData.errmessages : chinaData.status == caseStatus.returnCase ? chinaData.descr :false;
		
		hasModal && this.notificationRef.current!.addNotice( (caseStatus.returnCase == chinaData.status && "驳回："||"报错：")+hasModal,"warn",0)

	}
	
	changeState=(field:keyof SummarySpace.params,value:string)=>{

		this.setState({
			[field as "fname"]:value,
		})

	}

	submit=(e:React.MouseEvent<HTMLButtonElement>)=>{
		const type = e.currentTarget!.name as "save" | "submit" | "error" |"pass" |"reject";
		const {id,pathTo} = this.props;
		const {initModal,showModal,reasonTxt,...params} = this.state;
		const obj =Object.assign({id,},params); 
		const notification = this.notificationRef.current!;

		switch (type) {
			case "error":
			
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
			
				this.toggleModal();
				break;
			default:
				break;
		}
	}

	modalSureHanlde=()=>{

		const {id,roleId} = this.props;
		const {reasonTxt} = this.state;

		const notification = this.notificationRef.current!;
		if(!reasonTxt){

			notification.addNotice("不能为空！","warn")
			return ;
		}

		if(roleId=="3202"){

			Api.upSummaryCaseError(id,reasonTxt).then((res:AxiosInterfaceResponse)=>{

				this.toggleModal();

				notification.addNotice(res.message,"success");

				



			});

		}else{
			Api.returnSummaryCase(id,reasonTxt).then((res:AxiosInterfaceResponse)=>{

				this.toggleModal();

				notification.addNotice(res.message,"success");

				



			});
		}



	}

	daoHandle=(e:React.MouseEvent<HTMLLIElement>)=>{

		const type = e.currentTarget.dataset.name;
		const {id} = this.props;
		const baseUrl = window.getSession("getPath");
		switch (type) {
			case "word":
				this.downFile(baseUrl+"summary/wordExport?ids="+id);
				break;
			case "pdf":
				this.downFile(baseUrl+"summary/pdfExport?ids="+id);
				break;
			case "images":
				this.downImag();
				break;
			default:
				break;
		}
	}
	downImag(){

		const dom = document.getElementById("gTranslate")!
		html2canvas(dom,{
			width:dom.clientWidth,
			height:dom.clientHeight,
		}).then((canvas)=>{


			this.downFile(canvas.toDataURL(),'img-snapshoot.jpg');
			
			

    	});





	}
	downFile(url:string,fileName="文件下载"){

		const a = document.createElement("a");
		a.href=url;
		a.download = fileName;
		
		document.body.appendChild(a);

		a.click();
		document.body.removeChild(a);

	}

	getDao(){


		return (<div className="j-dao" >
					<Link to={TranslateManage.pathObj}><button className="s-btn line-btn green ">返回</button></Link>
					<div > 
						<span><button className="s-btn normal-btn primary">导出</button></span>
						<ul className="m-dao-drop">
							<li data-name="images" onClick={this.daoHandle}><i className="fa fa-file-image-o">&nbsp;</i><span>导出图片</span></li>
							<li data-name="pdf" onClick={this.daoHandle}><i className="fa fa-file-pdf-o">&nbsp;</i><span>导出pdf</span></li>
							<li data-name="word" onClick={this.daoHandle}><i className="fa fa-file-word-o"></i>&nbsp;<span>导出文档</span></li>
						</ul>
					</div>
				</div>)
	}

	getCheckOpt(){
		return (
			<div className="m-check-opt">
				<Link to={TranslateManage.pathObj}><button className="s-btn line-btn green ">返回</button></Link>
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
	changeReason=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{


		this.setState({
			reasonTxt:e.currentTarget!.value
		})
	}
	render() {

		const { data,type,roleId} = this.props;
		const {initModal,showModal,reasonTxt} = this.state;
		const status = data.china.status;
		const is_gdsummary = type == "/gdsummary";
		const text = is_gdsummary && "归档文案" || "病例清单"
		return (
			<div className="g-padding g-gdsummary" id="g-gdsummary" >
				{
					initModal ? (<Modal
						
						show={showModal}
						tit={roleId !="3202" ? "驳回"  :"报错"}
						type="tip"
						onSure={this.modalSureHanlde}
						onCancel={this.toggleModal}
						className="m-translate-modal"
						container= {document.getElementById("s-modal")!}
					
					>
						<div>
							<p style={{padding:"6px 0"}}><span>{roleId!="3202"? "驳回" :"报错"}原因：</span></p>
							<div><textarea value={reasonTxt} onChange={this.changeReason} className="s-txt" style={{width:"100%"}} rows={6}></textarea></div>
						</div>

					</Modal>):null
				}
				<Notification ref={this.notificationRef} />
				<p style={{ paddingBottom: 16 }}>{text} / 查看详情</p>
				<div className="g-translate-box" >

				{  status == "5" ? this.getDao():null} 
					<div className="g-translate" id="gTranslate">

						{
							status != "6" ?	<CaseModalText
								type="ch"
								params={data.china}
							/> : 
							<CaseModalInp data={data.china} type="ch" changeState={this.changeState} >
                           
                        </CaseModalInp>
						}

						{!is_gdsummary ?<CaseModalInp
							data={this.state}
							type="en"
							changeState={this.changeState}
						/>:<CaseModalText
							params={this.state}
							type="en"
						/>}

					</div>
				
					{!is_gdsummary ? (<div className="translate-footer-opt">

						{
							roleId == "3202" ?
							 <>
								<Button field="error" handle={this.submit} styleType="line-btn" type="danger"><Icon styleType=""/>报错</Button>
								<Button field="save" handle={this.submit}  type="green"><Icon styleType="fa-floppy-o"/>保存</Button>	<button className="s-btn normal-btn primary" name="submit" onClick={this.submit}><SvgIcon styleType="submit"/>提交</button>
							</>
							:<>
								<button className="s-btn normal-btn primary" name="pass" onClick={this.submit}><SvgIcon styleType="submit"/>通过</button>
								<button className="s-btn normal-btn danger" name="reject" onClick={this.submit}>驳回</button>
							</>

						}

						


					
						<Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><button className="s-btn line-btn green" ><i className="fa fa-undo">&nbsp;</i>返回</button></Link>
					</div>):null}
				</div>
				
			</div>

		)

	}
}


class Container extends React.PureComponent<RouteComponentProps & reduxProp ,ContainerState> {

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
		const{location:{state:{id,type}} ,roleId} =this.props;

		return data ? <TranslateManage roleId={roleId} data={data} id={id}  type={type}  pathTo={this.back}/>:null;
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



