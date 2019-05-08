import * as React from "react";
import Table from "@js/common/Table";
import Search from "@js/common/SearchCom";
import * as ReactDom from "react-dom";

const ModalDom = document.getElementById("s-modal");


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
	showUserM:boolean
}

type UserModalProp = {
	show:boolean;
}

type UserModalState = {

}

class UserModal extends React.PureComponent<UserModalProp,UserModalState>{

		render(){
				const {show} = this.props;
				console.log(show)
				return (<span style={{display:show ? "block" :"none"}}>
										adfasdf
										<input type="text"/>
								</span>)

		}


} 

class HeadOpt extends React.PureComponent<HeadOptProp,HeadOptState>{

		state={
			showUserM:false,
		}
		toggleShow = ()=>{
			this.setState(preState=>{
				return {
					showUserM:!preState.showUserM
				}
			})
		}
		render(){
			const {showUserM} = this.state;
			return (<>
								<h3 style={{paddingBottom:"14px"}}>用户管理</h3>
								<div style={{display:"flex",justifyContent:"space-between"}}>
									<Search searchHandle={(key:string)=>console.log(key)}  closeHandle={()=>console.log(2)}/>
									<div className="m-optBtn">
										<button className="s-btn normal-btn"><i className="fa fa-cogs">&nbsp;</i>批量操作</button>
										<button className="s-btn normal-btn" onClick={this.toggleShow}> <i className="fa fa-user-plus">&nbsp;</i>新增用户</button>
									</div>
								</div>
								{ReactDom.createPortal(<UserModal show={showUserM}/>,ModalDom!)}
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
				<div className="g-padding g-layout">
							<div className="g-result">
									<HeadOpt />
									<ResultSearch data={data} />
							</div>
						
				</div>
			
			)

	}
}


