import * as React from "react";

import Combobox from "@js/common/Combobox";



type HeadProp = {

}

type HeadState = {

}


class HeadInp extends React.PureComponent<HeadProp,HeadState>{




	render(){

		const data= [{id:"1",text:"方法1"},{id:"2",text:"方法2"},{id:"3",text:"方法3"}]

		return (<div className="g-illtype-head">
							<h3>

								<b className="fa fa-reply">&nbsp;&nbsp;</b>
								<span>病种查询</span>
							</h3>
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
									 				<input type="radio" className="" name="sex" />
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

}


type ResultProp ={
		data:itemObj[];
}
const ResultSearch:React.SFC<ResultProp>=({data})=>{
			data ;
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

					<div className="s-table">
							<table>
								<thead className="tHead">
										<th>序号</th>
										<th>科室名称</th>
										<th>病种名称</th>
										<th>姓名</th>
										<th>性别</th>
										<th>操作</th>
								</thead>
								<tbody>
									<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
									<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
									<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
									<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
									<tr><td></td><td></td><td></td><td></td><td></td><td></td></tr>
								</tbody>
								<tbody></tbody>
							</table>
							<div className="g-pageCode">
									<div className="m-page-total">
										 <span>共5页</span>
										 <span>40条</span>
										 <span  style={{marginLeft:"40px"}}>
										 		<span >跳转到</span>
										 		<input className="j-jump-page" type="number"/>
										 </span>
									</div>
									<div className="m-code-number">
										<button className="s-btn normal-btn"><i className="fa fa-chevron-left "></i></button>
										<span className="g-page-nums">
												<span>1</span>
												<span>2</span>
												<span>3</span>
										</span>
										<button className="s-btn normal-btn"><i className="fa fa-chevron-right "></i></button>
									</div>

							</div>
					</div>
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

	data:itemObj;

}
export default class IllType extends React.Component<props,state>{
	

	state={
			data:[]
	}
	componentDidMount(){

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

