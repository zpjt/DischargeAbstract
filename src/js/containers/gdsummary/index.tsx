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
};


type translateState = {
	
}

type ContainerState = {
	data:any;
}




class TranslateManage extends React.PureComponent<translateProps, translateState> {

	
	params:SummarySpace.params = this.initState(this.props.data.enData);
		
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
		}
    
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

		this.params[field]=value;

	}

	submit=(e:React.MouseEvent<HTMLButtonElement>)=>{
		const type = e.currentTarget!.name as "save" | "submit" | "error" ;
		const {id} = this.props;

		const obj =Object.assign({id},this.params); 

		switch (type) {
			case "error":
				Api.upSummaryCaseError(id,"asdfsadf").then(res=>{

						console.log(res)
				});
				break;
			case "submit":
				Api.commitEnSummaryCase(obj).then(res=>{

					console.log(res)

				})	
					break;
			case "save":
				Api.updataEnSummaryCase(obj).then(res=>{
					console.log(res)
				})	
					break;
		
			default:
				break;
		}
	}
	

	render() {

		const { text ,data} = this.props;

	

		return (
			<div className="g-padding g-gdsummary" >
				<p style={{ paddingBottom: 16 }}>{text}</p>
				<div className="g-translate-box" >
					<div style={{ textAlign: "right", padding: 10 }}>
						<button className="s-btn normal-btn">导出</button>
					</div>
					<div className="g-translate">

							<CaseModalText
								type="ch"
								params={data.china}
							/> 

						<CaseModalInp
							data={this.params}
							type="en"
							changeState={this.changeState}
						/>

					</div>
				
					<div className="translate-footer-opt">
						<button className="s-btn normal-btn" name="error" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>报错</button>
						<button className="s-btn normal-btn" name="save" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>保存</button>
						<button className="s-btn normal-btn" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
						<button className="s-btn normal-btn" ><Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><i className="fa fa-refresh">&nbsp;</i>返回</Link></button>
					</div>
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
		const{location:{state:{id,text},} } =this.props;

		return data ? <TranslateManage data={data} id={id} text={text} />:null;
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



