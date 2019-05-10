import * as React from "react";
import {connect ,MapStateToProps} from "react-redux";
import {fetchPostOrgIfNeeded} from "@js/actions/index";
import ComTreebox from "@js/common/ComTreebox";


type props = {
	
}

type HeadState = {
 	isSearch:boolean;
 	orgSel:string[];
 	
}

type Dispatch = {
	dispatch:Function
}


class HeadInp extends React.PureComponent<props & reduxProps & Dispatch,HeadState>{

	state={
		isSearch:false,
		orgSel:[],
	}

	componentDidMount(){
			this.props.dispatch(fetchPostOrgIfNeeded());
	}
	getER<T>(d:T){
			console.log(d)
	}
	searchHandle=()=>{

		this.setState((preState)=>{
			return {
				 isSearch:!preState.isSearch,
			}
		});

	}

	setParams=(files:"orgSel",data:any)=>{

		this.setState({
				[files]:data
		})

	}

	render(){

		const {orgs} = this.props;
		const {isSearch} = this.state;

		return (<div className="g-illtype-head">
							<div style={{"display":"flex",justifyContent:"space-between"}}>
								<h3>双语翻译</h3>
								<span className="m-optBtn">
								 		<button className="s-btn normal-btn" onClick={this.searchHandle}> <i className="fa fa-search">&nbsp;</i>查 询</button>
								 		<button className="s-btn normal-btn"><i className="fa fa-reply">&nbsp;</i>返回</button>
								 </span>	
								
							</div>
							<div className="g-condition">

								<span className="item-inp">
								 		<span className="m-inp-tit">病人号</span>
								 		<input type="text" className="s-inp normal no-fill"/>
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">姓名</span>
								 		<input type="text" className="s-inp normal no-fill"/>
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">证件号</span>
								 		<input type="text" className="s-inp normal no-fill"/>
								 </span>
								 <span className="item-inp">
								 		<span className="m-inp-tit">科室</span>
										<ComTreebox data={orgs} idField="dim_value" childField="sub" textFiled="dim_name" getValStatus={isSearch} changeParState={this.setParams}/>
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