import * as React from "react";
import {withRouter,RouteComponentProps} from "react-router-dom"
import {connect,MapStateToProps,MapDispatchToProps} from "react-redux";
import {fetchPostsLoginOut} from "@js/actions/index";
import Loading from "@js/common/Loading";
import Modal from "@js/common/Modal";
import {InpBox} from "@js/common/InputBtn"

type HeadProp = {

}

type HeadState = {
	initPasswordModal:boolean;
	showPasswordModal:boolean;
	password:string;
}

class Head extends React.PureComponent<RouteComponentProps<HeadProp> & reduxDispatchProp & reduxStateProp,HeadState>{

	state:HeadState = {
		initPasswordModal:false,
		showPasswordModal:false,
		password:"",
	}

	loginOut=()=>{
		const {loginOut}  = this.props;
		
		//this.props.history.push("/login");

		loginOut();

	}

	togglePassword=()=>{

			this.setState(pre=>({
				initPasswordModal:true,
				showPasswordModal:!pre.showPasswordModal,
			}))
	}

	changePassword=(file:"password",pwd:string)=>{

		this.setState({
			[file]:pwd,
		})

	}

	render(){

		const {isFetching,orgName} = this.props;
		const {initPasswordModal,showPasswordModal,password} = this.state;

		const rootModalDom = document.getElementById("modal_root") as HTMLDivElement ;

		return (<div className="g-head">
							<Loading show={isFetching} container={rootModalDom!}/> 
							{initPasswordModal ? (<Modal 
																				show={showPasswordModal} 
																				container={rootModalDom!}
																				tit={"修改密码"}
																				onCancel={this.togglePassword}
																				onSure={this.togglePassword}
																				className="pwd-M"
	
																			 >
																						<InpBox	
																								type="password"
																								styleType="normal"
																								field="password"
																								title="旧密码"
																								value={password}
																								changeHandle={this.changePassword}
																							/>	
																								<InpBox	
																								type="password"
																								styleType="normal"
																								field="password"
																								title="新密码"
																								value={password}
																								changeHandle={this.changePassword}
																							/>			 	


																	 </Modal>) :null}
							<span className="m-theme">医疗安全（不良）事件上报管理</span>
							<div className="g-sys_set">
								<div>
										<p><i className="fa fa-bell-o"></i>消息</p>
								</div>
								<div>
								
									<div >
										<span>{orgName}&nbsp;&nbsp;&nbsp;</span>
										<span className="fa fa-arrows-v ">&nbsp;切换角色</span>
									</div>

								</div>
								<div className="g-user-opt" >
									<div style={{padding:"20px 10px"}}>
										<span className="fa fa-user">&nbsp;&nbsp;</span>
										<span>demo</span>
									</div>
									<ul className="m-sysOpt">
											<li onClick={this.loginOut}>
												<span className="fa fa-power-off ">&nbsp;&nbsp;</span>
												<span>退出系统</span>
											</li>
											<li onClick={this.togglePassword}>
												<span className="fa fa-key ">&nbsp;&nbsp;</span>
												<span>修改密码</span>
											</li>
									</ul>
								</div>
							</div>
						</div>
						); 


	}



};


type reduxStateProp = {
	isLogin:boolean;
	isFetching:boolean;
	orgName:string;
}

type reduxDispatchProp = {
	loginOut:()=>void;
}
const mapStateToProps:MapStateToProps<reduxStateProp,RouteComponentProps<HeadProp>,appStore> = ({app})=>{

	
		return {
			isLogin:app.get("isLogin"),
			isFetching:app.get("isFetching"),
			orgName:(app.get("userInfo").orgName!)[0],
		}

}


const mapDisPatchProps:MapDispatchToProps<reduxDispatchProp,RouteComponentProps<HeadProp>>=(dispatch:any)=>{

	return {
			loginOut:()=>{

				dispatch(fetchPostsLoginOut());
			}

	}


}

export default withRouter(connect(mapStateToProps,mapDisPatchProps)(Head));