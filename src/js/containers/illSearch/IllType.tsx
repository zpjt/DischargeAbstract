import * as React from "react";
import HeadInp from "./ConditionHead";
import Table from "@js/common/Table";
import Search from "@js/common/SearchCom";


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

			return (<div className="g-result g-layout">
				
					<Search searchHandle={(key:string)=>console.log(key)}  closeHandle={()=>console.log(2)}/>

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

