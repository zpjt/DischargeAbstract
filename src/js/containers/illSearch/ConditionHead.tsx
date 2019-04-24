import * as React from "react";
import {connect ,MapStateToProps} from "react-redux";
import {fetchPostOrgIfNeeded} from "@js/actions/index";
import Combobox from "@js/common/Combobox";
import ComTreebox from "@js/common/ComTreebox";
import {Radio} from "@js/common/InputBtn";



type props = {
	
}

type HeadState = {

}

type Dispatch = {
	dispatch:Function
}


class HeadInp extends React.PureComponent<props & reduxProps & Dispatch,HeadState>{


	componentDidMount(){
			this.props.dispatch(fetchPostOrgIfNeeded());
	}

	render(){

		const data= [{id:"1",text:"方法1"},{id:"2",text:"方法2"},{id:"3",text:"方法3"}];

		const {orgs} = this.props;

		return (<div className="g-illtype-head">
							<div style={{"display":"flex",justifyContent:"space-between"}}>
								<h3>病种查询</h3>
								<span className="m-optBtn">
								 		<button className="s-btn normal-btn"><i className="fa fa-refresh">&nbsp;</i>重 置</button>
								 		<button className="s-btn normal-btn"> <i className="fa fa-search">&nbsp;</i>查 询</button>
								 		<button className="s-btn normal-btn"><i className="fa fa-reply">&nbsp;</i>返回</button>
								 </span>	
								
							</div>
							<div className="g-condition">
								 <span className="item-inp">
								 		<span className="m-inp-tit">科室名称</span>
										<ComTreebox data={orgs} idField="dim_value" childField="sub" textFiled="dim_name" />
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
									 		<Radio changeHandle={()=>console.log(1)} 
									 		 	data={[
										 		 		{value:"1",tit:"男"},
										 		 		{value:"2",tit:"女"}
									 		 		]}
									 		 		nameFiled="sex"
									 		 />
								 </span>
							</div>
						</div>)
	}

}

type reduxProps = {
		orgs:orgState["data"];
		isFetch:boolean;
}

const mapStateToProps:MapStateToProps<reduxProps,props,appStore> = (state)=>{
	
	const {orgs} = state;

	return {
		orgs:orgs.get("data"),
		isFetch:orgs.get("isFetch"),
	}
}


export default connect(mapStateToProps)(HeadInp);