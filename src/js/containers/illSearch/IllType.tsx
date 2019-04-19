import * as React from "react";

import Combobox from "@js/common/Combobox";
import Table from "@js/common/Table";



type HeadProp = {

}

type HeadState = {

}


class HeadInp extends React.PureComponent<HeadProp,HeadState>{




	render(){

		const data= [{id:"1",text:"方法1"},{id:"2",text:"方法2"},{id:"3",text:"方法3"}]

		return (<div className="g-illtype-head">
							<div style={{"display":"flex",justifyContent:"space-between"}}>
								<h3>病种查询</h3>
								<button className="s-btn normal-btn"><i className="fa fa-reply">&nbsp;</i>返回</button>
							</div>
							<div className="g-condition">
								 <span className="item-inp">
								 		<span className="m-inp-tit">科室名称</span>
								 		<Combobox data={data}  />
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">病种名称</span>
								 		<Combobox data={data}  />
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">姓名</span>
								 		<input type="text" className="s-inp normal no-fill"/>
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">性别</span>
								 		<span className="m-radio">
									 		<label className="lab-radio">
									 				<span className="lab-tit">男</span>
									 				<input type="radio" className="" name="sex"  defaultChecked />
									 			</label>
									 			<label className="lab-radio">
									 				<span className="lab-tit">女</span>
									 				<input type="radio" className="" name="sex" />
									 			</label>
								 		</span>
								 	
								 </span>
								  <span className="m-optBtn">
								 		<button className="s-btn normal-btn"><i className="fa fa-refresh">&nbsp;</i>重 置</button>
								 		<button className="s-btn normal-btn"> <i className="fa fa-search">&nbsp;</i>查 询</button>
								 </span>	
							</div>
						</div>)
	}

}

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
const ResultSearch:React.SFC<ResultProp>=({data})=>{

		const column = [
						{
							text:"科室名称",
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

			return (<div className="g-result">
				
					<div className="m-search">
							<span className="m-inp-val">
								<input type="text"  className="s-inp" placeholder="搜索查询的结果..." />
								<span className="m-search-close"><i className="fa fa-times fa-lg"></i></span>
							</span>
							<button className="s-btn normal-btn">
								<span className="fa fa-search"></span>
							</button>
					</div>
					<Table data={data} column={column} />
			</div>)
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
export default class IllType extends React.Component<props,state>{
	

	state={
			data:[]
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

		//const type = this.props.match.query.type;
		const {data} = this.state;

		//console.log(type)

		return (
				<div className="g-padding g-layout">
						<HeadInp />

						<ResultSearch data={data} />
				</div>
			
			)

	}
}

