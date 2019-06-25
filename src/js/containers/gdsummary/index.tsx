import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps ,MapDispatchToProps} from "react-redux";
import CaseModalText from "../summary/CaseModalText";
import Api from "@api/gdsummary";
import CaseModalInp from "../summary/CaseModalInp";
import {Link} from "react-router-dom";
import {Button,Icon, SvgIcon} from "@js/common/Button";
import {Notification} from "@js/common/toast/index";
import Modal from "@js/common/Modal";
import html2canvas from "html2canvas";
import {createTypedMap} from "@js/common/ImmutableMap";
import { changeMenuUrl } from "@js/actions/appAction";

type translateProps = {
	data:any;
	id:string;
	type:string;//路由路径
	roleId:string;
	orgData:any[];
	pathTo(path:"gdsummary"|"summary"):void;
	changeMenu(menuUrl:string):void;
};


type paramsObj= TypedMap<{
	en:TypedMap<SummarySpace.params>,
	ch:TypedMap<SummarySpace.params>
}>

type translateState =  {
	initModal:boolean;
	showModal:boolean;
	reasonTxt:string;
	obj:paramsObj;
	timeId:null | number;
	isChange:boolean;
}; 
	


type ContainerState = {
	data:any;
	orgData:any[];
}
		  
		   
enum caseStatus {
	noTranslate = 1,
	translate,
	submitCase,
	returnCase,
	checkedCase,
	errorCase
};

enum roleEnum{
	doctor="3202",
	director="3201"

};







class TranslateManage extends React.PureComponent<translateProps, translateState> {
	static pathObj = { pathname: "/gdsummary", state: { text: "归档文案" } }
	
	timeSave=10000;
	state:translateState = {
		initModal: false,
		showModal: false,
		reasonTxt: "",
		obj:this.initState(this.props.data,this.props.roleId),
		timeId:null,
		isChange:false,
	}; 
	notificationRef:React.RefObject<Notification> = React.createRef();
	initState(data:{english:SummarySpace.params,china:SummarySpace.params},roleId:string){

		const obj:SummarySpace.params ={
			fname: "",
			fsex: "",
			fage: "",
			fdept: "",
			fdeb: "",
			fprn: "",
			fsurvey: "",
			fryqk: "",
			fzljg: "",
			fcyzd: "",
			fcyqk: "",
			fcyyz: "",
			frydata: "",
			fcydata: "",
			fsumd: "",
		};
		
        if(data.english    ){

			if(roleId == roleEnum.doctor || (roleId == roleEnum.director && data.china.status! !== caseStatus.translate && data.china.status! !==caseStatus.noTranslate)){
				for (const iterator  in obj) {
				const key = iterator as "fname";
					data.english[key] && (obj[key] = data.english[key]);
				}
			}

           
		};

		return createTypedMap({
			en:createTypedMap(obj),
			ch:createTypedMap(data.china)
		}) ;

	}
	componentDidMount(){
		const chinaData = this.props.data.china;
		 const hasModal = chinaData.status == caseStatus.errorCase ? chinaData.errmessages : chinaData.status == caseStatus.returnCase ? chinaData.descr :false;
		
		hasModal && this.notificationRef.current!.addNotice( (caseStatus.returnCase == chinaData.status && "驳回："||"报错：")+hasModal,"warn",0);

		  // 添加自动保存的定时器
		  
		if(this.props.roleId!="3202"){ //医生
			  return 
		}
       const _self = this;
       let oldData = this.state.obj;
        const timeId = window.setInterval(function(){

            const newData = _self.state.obj;

            if(oldData !== newData){

                const obj = Object.assign({ id:_self.props.id }, newData.toJS().en);
                Api.updataEnSummaryCase(obj).then(() => {

                        oldData = newData ;

                        _self.setState({
                            isChange:false
                        });
                });
            }

        },this.timeSave);

        this.setState({
            timeId,
        });

	}
	componentWillUnmount(){

        const {timeId} = this.state;

        timeId && window.clearInterval(timeId);
    }
	changeState=(field:keyof SummarySpace.params,value:string)=>{

		this.setState(pre=>{

			return {
				obj:pre.obj.setIn(["en",field],value),
				isChange:true,
			}
		})

	}
	changeStateCh=(field:keyof SummarySpace.params,value:string)=>{

		this.setState(pre=>{

			return {
				obj:pre.obj.setIn(["ch",field],value)
			}
		})

	}

	submit=(e:React.MouseEvent<HTMLButtonElement>)=>{
		const type = e.currentTarget!.name as "save" | "submit" | "error" |"pass" |"reject";
		const {id,pathTo,changeMenu} = this.props;
	 
		const notification = this.notificationRef.current!;

		switch (type) {
			case "error":
			
				this.toggleModal();
				break;
			case "submit":{
				const status = this.props.data.china.status;
				const oindex =  status ==6 ? 0 : 1 ;
				if(document.querySelectorAll("#gTranslate .m-translate")[oindex].querySelectorAll(".no-fill").length){
					notification.addNotice("填写完整，然后提交！","warn")
					return ;
				}
				const { obj: paramsObj } = this.state;

				const paramsData = paramsObj.toJS();

				const obj =Object.assign({id},paramsData.ch);

				if( status== "6"){ // 报错，修改中文；
					Api.saveChSummaryCase(obj).then(() => {
						pathTo("summary");
					})

				}else{
					Api.commitEnSummaryCase(obj).then(()=>{
						pathTo("summary");

					});	
				}
			}
					break;
			case "save":	
				{
					const {obj:paramsObj} = this.state;

				const paramsData = paramsObj.toJS();

				const obj =Object.assign({id},paramsData.en);
				Api.updataEnSummaryCase(obj).then(()=>{
					notification.addNotice("保存成功","success");
					this.setState({
						isChange:false
					})
				});	
			}
					break;
			case "pass"	:
			
				Api.passEnSummaryCase(id).then(()=>{
						pathTo("gdsummary");
						changeMenu("1,0");
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
	orgItemHandle = (e: React.MouseEvent<HTMLLIElement>) => {

        const text = e.currentTarget!.dataset.name;

        this.setState(pre=>({
		  obj:pre.obj.setIn(["ch","fdept"],text!)  ,
		  isChange:true
        }))

    }
	filterOrg() {
        const {orgData} = this.props;
        const fdept = this.state.obj.getIn(["ch","fdept"]);

        return orgData.filter(val=>{
            return val.name.includes(fdept)
        });

	}
	


	render() {

		const { data,type,roleId} = this.props;
		const {initModal,showModal,reasonTxt,obj,isChange} = this.state;
		const status = data.china.status;
		const is_gdsummary = type == "/gdsummary";
		const text = is_gdsummary && "归档文案" || "病例清单";

		 let orgData:any[] = [];

		status == "6" &&( orgData = this.filterOrg());

        const saveAlert:React.CSSProperties | undefined  = isChange ? {color:"black"} : undefined;

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
							<CaseModalInp data={obj.get("ch")} type="ch" changeState={this.changeStateCh} >
                              <ul className="m-org-drop" >{
								 
                                orgData.map(val=>{
                                    return (
                                        <li onClick={this.orgItemHandle} data-name={val.name} key={val.id}>{val.name}</li>
                                    )
                                })
                            }
                            </ul>  
                        	</CaseModalInp>
						}

						{!is_gdsummary ?<CaseModalInp
							data={obj.get("en")}
							type="en"
							ableEdit={roleId=="3202"}
							changeState={this.changeState}
						/>:<CaseModalText
							params={data.english}
							type="en"
							
						/>}

					</div>
				
					{!is_gdsummary ? (<div className="translate-footer-opt">

						{
							roleId == roleEnum.doctor ?
							 <>
								<Button field="error" handle={this.submit} styleType="line-btn" type="danger"><Icon styleType=""/>报错</Button>
								<Button field="save" handle={this.submit}  type="green"><Icon styleType="fa-floppy-o"/><span style={saveAlert}>保存</span></Button>	
								<button className="s-btn normal-btn primary" name="submit" onClick={this.submit}><SvgIcon styleType="submit"/>提交</button>
							</>
							:<>
								{status == caseStatus.submitCase  ?  <button className="s-btn normal-btn primary" name="pass" onClick={this.submit}><SvgIcon styleType="submit"/>通过</button>:null}

								{status == caseStatus.errorCase ? <button className="s-btn normal-btn primary" name="submit" onClick={this.submit}><SvgIcon styleType="submit" />提交</button> : null}
								{
									status == caseStatus.submitCase ? 	<button className="s-btn normal-btn danger" name="reject" onClick={this.submit}>驳回</button> :null
								}
								
							</>

						}

					
						<Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><button className="s-btn line-btn green" ><i className="fa fa-undo">&nbsp;</i>返回</button></Link>
					</div>):null}
				</div>
				
			</div>

		)

	}
}





class Container extends React.PureComponent<RouteComponentProps & reduxProp & reduxDisPatch  ,ContainerState> {

	state:ContainerState={
		data:null,
		orgData:[],
	}

	back=(path:"gdsummary" | "summary")=>{

		this.props.history.push({ pathname: "/"+path, state: { text: "病历清单" } })
	}
	componentDidMount() {

		const { id } = this.props.location.state;


		const translateData = Api.getSummaryCaseById(id);
		
		const Org = Api.getAllOrg();

        Promise.all([translateData,Org]).then((res:any[])=>{

            const [data,orgData] =res;

                this.setState({
                    data:data.data,
                    orgData:orgData.data
                })

        })
	}

	render(){

		const {data,orgData} = this.state;
		const{location:{state:{id,type}} ,roleId,changeMenu} =this.props;

		return data ? <TranslateManage changeMenu={changeMenu}  orgData={orgData} roleId={roleId} data={data} id={id}  type={type}  pathTo={this.back}/>:null;
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
type reduxDisPatch ={
	changeMenu(menuUrl:string):void;
} 

const mapDisPatchToProp:MapDispatchToProps<reduxDisPatch,translateProps>=(dispatch)=>{

	return {

		changeMenu:function(menuUrl:string){

			dispatch(changeMenuUrl(menuUrl));

		},

	}
}; 

export default connect(mapStateToProp,mapDisPatchToProp)(Container);



