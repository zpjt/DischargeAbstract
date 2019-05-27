import * as React from "react";
import Table from "@js/common/Table";
import Search from "@js/common/SearchCom";
import Modal from  "@js/common/Modal";

const ModalDom = document.getElementById("s-modal") as HTMLDivElement;


type itemObj = {
		org:string;
		sex:string;
		id:string;
		name:string;
		illNmae:string;
}


type ResultProp ={
		data:itemObj[];
}

type props={
	location:{
		query:{
			type:string;
		}
	}
};
type state={

	data:itemObj[];

}


type HeadOptProp = {

}

type HeadOptState = {
	showUserM:boolean;
	showOptM:boolean;
	initUserM:boolean;
	initOptM:boolean;
}

type UserModalProp = {
	//show:boolean;
}

type UserModalState = {

}

class UserModal extends React.PureComponent<UserModalProp,UserModalState>{

		render(){
			//	const {show} = this.props;
			//	console.log(show)
				return (<span >
										adfasdf
										<input type="text"/>
								</span>)

		}


} 

class HeadOpt extends React.PureComponent<HeadOptProp,HeadOptState>{

		state={
			showUserM:false,
			showOptM:false,
			initUserM:false,
			initOptM:false,
		}
		constructor(props:HeadOptProp){
				super(props);

		}
		toggleShow = ()=>{
			this.setState(preState=>({
					showUserM:!preState.showUserM,
					initUserM:true,
			}))
		}
		toggleShow1 = ()=>{
			this.setState(preState=>({
					showOptM:!preState.showOptM,
					initOptM:true,
			}))
		}



	
		render(){
			const {showUserM,showOptM,initOptM,initUserM} = this.state;
			return (<>
								<div>
									<h3 style={{paddingBottom:"14px"}}>用户管理</h3>
									<div style={{display:"flex",justifyContent:"space-between"}}>
										<Search searchHandle={(key:string)=>console.log(key)}  closeHandle={()=>console.log(2)}/>
										<div className="m-optBtn">
											<button className="s-btn normal-btn" onClick={this.toggleShow1}><i className="fa fa-cogs">&nbsp;</i>批量操作</button>
											<button className="s-btn normal-btn" onClick={this.toggleShow}> <i className="fa fa-user-plus">&nbsp;</i>新增用户</button>
										</div>
									</div>
								</div>
								{initUserM ?(<Modal 
																	container={ModalDom}
																	tit="af"
																	onCancel={this.toggleShow}
																	show={showUserM}
																	onSure={this.toggleShow}
																>
																	<UserModal />
															</Modal>):null}
								{initOptM ?(<Modal 
																	container={ModalDom}
																	tit="af"
																	onCancel={this.toggleShow1}
																	show={showOptM}
																	onSure={this.toggleShow1}
																>
																	<UserModal />
															</Modal>):null}
							</>
				)
		}

}

const ResultSearch:React.SFC<ResultProp>=({data})=>{

		const column = [
						{
							text:"用户",
							field:"org",
						},
						{
							text:"病种名称",
							field:"illNmae",
						},
						{
							text:"姓名",
							field:"name",
						},
							{
							text:"性别",
							field:"sex",
							width:80,
						},
						{
							text:"操作",
							field:"opt",
							width:180,
							formatter:function(){

									return (<button className="s-btn normal-btn">查看</button>)
							}
						}
					]

			return <Table data={data} column={column}  checkbox={true} />
			
}


export default class Usermanage extends React.PureComponent<props,state>{
	

	state={
			data:[],
	}
	componentDidMount(){
			fetch("/11/getIllRes").then(res=>res.json()).then(res=>{

					if(res && res.data){
							this.setState({
								data:res.data
							})
					}
			})
	}

	render(){

		const {data} = this.state;

		return (
				<div className="g-padding " style={{height:"100%",boxSizing:"border-box"}}>
							<div className="g-result g-layout">
									<HeadOpt />
									<ResultSearch data={data} />
							</div>
						
				</div>
			
			)

	}
}


