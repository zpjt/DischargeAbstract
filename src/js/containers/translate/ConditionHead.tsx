import * as React from "react";
import {connect ,MapStateToProps} from "react-redux";
import {fetchPostOrgIfNeeded} from "@js/actions/index";
import ComTreebox from "@js/common/ComTreebox";
import {InpBox} from "@js/common/InputBtn";


type props = {
	
}

type HeadState = {
 	isSearch:boolean;
 	orgSel:string[];
 	sickNum:string;
 	sickName:string;
 	licenseNum:string;
}

type Dispatch = {
	dispatch:Function
}


class HeadInp extends React.PureComponent<props & reduxProps & Dispatch,HeadState>{

	state={
		isSearch:false,
		orgSel:[],
		sickNum:"",
		sickName:"",
		licenseNum:"",
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
		const {isSearch,sickName,sickNum,licenseNum} = this.state;

		return (<div className="g-illtype-head">
							<div style={{"display":"flex",justifyContent:"space-between"}}>
								<h3>双语翻译</h3>
								<span className="m-optBtn">
								 		<button className="s-btn normal-btn" onClick={this.searchHandle}> <i className="fa fa-search">&nbsp;</i>查 询</button>
								 		<button className="s-btn normal-btn"><i className="fa fa-reply">&nbsp;</i>返回</button>
								 </span>	
								
							</div>
							<div className="g-condition">

								<InpBox 
										type="text" 
										styleType="normal" 
										title="病人号"
										changeHandle={this.setParams}
										field = "sickNum"
										value={sickNum}
									/>
									<InpBox 
										type="text" 
										styleType="normal" 
										title="姓名"
										changeHandle={this.setParams}
										field = "sickName"
										value={sickName}
									/>
									<InpBox 
										type="text" 
										styleType="normal" 
										title="证件号"
										changeHandle={this.setParams}
										field = "licenseNum"
										value={licenseNum}
									/>
							
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