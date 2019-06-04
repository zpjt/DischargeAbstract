import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalText from "../summary/CaseModalText";
import Api from "@api/gdsummary";
import CaseModalInp from "../summary/CaseModalInp";
import {Link} from "react-router-dom";


type translateProps = {
	data:any;
	id:string;
	text:string;
	type:string;
	status:string;
};


type translateState = SummarySpace.params; 
	


type ContainerState = {
	data:any;
}




class TranslateManage extends React.PureComponent<translateProps, translateState> {

	
	
	obj = 	{
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
	state:SummarySpace.params = this.initState(this.props.data.english);
	initState(data:SummarySpace.params){

		const obj = this.obj;
    
        if(data){

            for (const iterator  in obj) {

               const key = iterator as "fname";

                 data[key] && (obj[key] = data[key]);
                
            }
            return obj;

        }else{
            return obj;
        }


    }
	
	changeState=(field:keyof SummarySpace.params,value:string)=>{

		this.setState({
			[field as "fname"]:value,
		})

	}

	submit=(e:React.MouseEvent<HTMLButtonElement>)=>{
		const type = e.currentTarget!.name as "save" | "submit" | "error" |"pass" |"reject";
		const {id} = this.props;

		const obj =Object.assign({id},this.state); 

		switch (type) {
			case "error":
				Api.upSummaryCaseError(id,"报错").then(res=>{

						console.log(res);
				});
				break;
			case "submit":
				if(document.querySelectorAll("#g-gdsummary .no-fill").length){
					alert("填写完整！")
					return ;
				}
				Api.commitEnSummaryCase(obj).then(res=>{

					console.log(res)

				})	
					break;
			case "save":
				Api.updataEnSummaryCase(obj).then(res=>{
					console.log(res)
				})	
					break;
			case "pass"	:
				Api.passEnSummaryCase(id).then(res=>{
					console.log(res)
				})
				break;
			case "reject":
				Api.returnSummaryCase(id,"驳回").then(res=>{
					console.log(res);
				});
				break;
			default:
				break;
		}
	}

	getDao(){


		return (<div className="j-dao" ><div > 
						<span><button className="s-btn normal-btn">导出</button></span>
						<ul className="m-dao-drop">
							<li><i className="fa fa-file-image-o">&nbsp;</i><span>导出图片</span></li>
							<li><i className="fa fa-file-pdf-o">&nbsp;</i><span>导出pdf</span></li>
							<li><i className="fa fa-file-word-o"></i>&nbsp;<span>导出文档</span></li>
							<li><i className="fa fa-print"></i>&nbsp;<span>打印</span></li>
						</ul>
					</div></div>)
	}

	getCheckOpt(){


		return (
			<div className="m-check-opt">
				<button className="s-btn normal-btn" name="reject" onClick={this.submit}>驳回</button>
				<button className="s-btn normal-btn" name="pass" onClick={this.submit}>通过</button>
			</div>
		)
	}
	

	render() {

		const { text,data,type,status} = this.props;

		const is_gdsummary = type == "/gdsummary";

		return (
			<div className="g-padding g-gdsummary" id="g-gdsummary" >
				<p style={{ paddingBottom: 16 }}>{text}</p>
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
						<button className="s-btn normal-btn" name="error" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>报错</button>
						<button className="s-btn normal-btn" name="save" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>保存</button>
						<button className="s-btn normal-btn" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
						<button className="s-btn normal-btn" ><Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><i className="fa fa-refresh">&nbsp;</i>返回</Link></button>
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
		const{location:{state:{id,text,type,status}} } =this.props;

		return data ? <TranslateManage data={data} id={id} text={text} type={type} status={status}/>:null;
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



