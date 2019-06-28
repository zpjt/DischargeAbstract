import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom"
import { connect, MapStateToProps ,MapDispatchToProps} from "react-redux";
import Modal from "@js/common/Modal";
import { InpBox } from "@js/common/InputBtn";
import {changeRole,changeFilterType,changeMenuUrl} from "@js/actions/appAction";
import {SvgIcon} from "@js/common/Button";
import Api from "@api/main";
import {Notification} from "@js/common/toast/index";
import SocketNews from "./Socket";
import {Icon} from "@js/common/Button"

 const LoginUrl = window.getSession("getPath")+"login";

type HeadProp = {

}

type HeadState = {
	initPasswordModal: boolean;
	showPasswordModal: boolean;
	password: string;
	newPassword:string;
	warnText:string;
}

class Head extends React.PureComponent<RouteComponentProps<HeadProp> & reduxStateProp & dispatchProp, HeadState>{

	state: HeadState = {
		initPasswordModal: false,
		showPasswordModal: false,
		password: "",
		newPassword: "",
		warnText:""
	}

	componentDidMount(){

	}
	componentWillMount(){

	}

	logOut = () => {

		Api.logOut()
	}

	notifitionRef:React.RefObject<Notification>=React.createRef();
	async submitPassword(){

		const {newPassword,password} = this.state;
		const {user_id} = this.props;

		

		const result = await Api.checkPwd(user_id,password) as AxiosInterfaceResponse;
	
		if(result.code===200){
				Api.updatePwd(user_id,newPassword).then(()=>{

						
						this.togglePassword();
						window.location.href=LoginUrl;

				});
		}else{
			
			this.setState({
				warnText:result.message
			})
		}


	}

	submit=()=>{

		const {newPassword,password} = this.state;
		if(!newPassword || !password){

			this.setState({
				warnText:"填写完整！"
			});
			return

		}

		this.submitPassword();
	}

	togglePassword = () => {

		this.setState(pre => ({
			initPasswordModal: true,
			showPasswordModal: !pre.showPasswordModal,
			warnText:"",
			password: "",
			newPassword: "",
		}))
	}

	changePassword = (file: "password", pwd: string) => {

		this.setState({
			[file]: pwd,
		})

	}

	changeRole = (e: React.MouseEvent<HTMLLIElement>) => {

		const roleIndex = +(e.currentTarget!.dataset.id)!;

		this.props.dispatchChangeRole(roleIndex);
	}

	changeFilterAndJump=(filter:string)=>{

		
		
		if(this.props.location.pathname=="/summary"){
				this.props.dispatchChangeFilter(filter);
		}else{
			const _self = this;
			this.props.dispatchChangeMenu("1,0");
				setTimeout(function(){
				_self.props.dispatchChangeFilter(filter);

			},0);
		}
		
		
		

		this.props.history.push({
			pathname:"/summary",
			state:{
				text:"病例清单"	
			}
		})

	}

	render() {

		const { user_name, role_arr, role_index, role_ids ,user_id,org_name} = this.props;
		const { initPasswordModal, showPasswordModal, password,newPassword,warnText} = this.state;

		const role_id = role_ids[role_index];

		const rootModalDom = document.getElementById("modal_root") as HTMLDivElement;

		return (<div className="g-head">
			<Notification ref={this.notifitionRef} />
			{initPasswordModal ? (<Modal
				show={showPasswordModal}
				container={rootModalDom!}
				tit={"修改密码"}
				onCancel={this.togglePassword}
				onSure={this.submit}
				className="pwd-M"

			>
				<p className="item-inp"><span className="m-inp-tit">用户名</span>{user_name}</p>
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
					field="newPassword"
					title="新密码"
					value={newPassword}
					changeHandle={this.changePassword}
				/>

				{warnText ? <div><p className="m-warn"><Icon styleType="fa-exclamation-triangle" />{warnText}</p></div> : null} 

			</Modal>) : null}
			<span className="m-theme">出院小结管理</span>
			<div className="g-sys_set">
				<div className="g-role-sys">
					<div style={{ padding: "20px 10px"}}>
						<span>{role_arr[role_index]}&nbsp;&nbsp;&nbsp;</span>
					{role_ids.length ?	<span className="fa fa-arrows-v ">&nbsp;切换角色</span>:null}
					</div>
					{role_ids.length ?<ul className="m-sysOpt">
						{
							role_ids.map((val, index) => {
								return (
									<li onClick={this.changeRole} key={val} data-id={index} className={role_index==index ? "active":""}>
										<span>{role_arr[index]}</span>
									</li>
								)
							})
						}
					</ul>:null}
				</div>
				<div className="m-mail">
					 <SocketNews  user_id={user_id} role_id={role_id} filterDispatch={this.changeFilterAndJump}/>
				</div>
				<div>
					<span >{org_name}</span>
				</div>
				<div className="g-user-opt" >
					<div style={{ padding: "20px 10px" }}>
						
						<SvgIcon styleType="user" size="size1"/>
						<span style={{verticalAlign:4}}>{user_name}</span>
					</div>
					<ul className="m-sysOpt">
						<li onClick={this.logOut}>
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
	user_name: string;
	role_arr: string[];
	role_index: number;
	role_ids: string[];
	user_id:string;
	org_name:string;
}

type dispatchProp = {

	dispatchChangeFilter:(filter:string)=>void;
	dispatchChangeRole:(roleIndex:number)=>void;
	dispatchChangeMenu(url:string):void;
}

const mapStateToProps: MapStateToProps<reduxStateProp, RouteComponentProps<HeadProp>, appStore> = ({ app }) => {

	return {
		user_name: app.get("user_name"),
		role_arr: app.get("role_names"),
		role_ids: app.get("role_ids"),
		role_index: app.get("role_index"),
		user_id:app.get("user_id"),
		org_name:app.get("org_names")[0]
	}

}
const mapDispatchToProps: MapDispatchToProps<dispatchProp, RouteComponentProps<HeadProp>> = (dispatch) => {

	return {
		dispatchChangeRole:function(roleIndex:number){


			dispatch(changeRole(roleIndex))
		},
		dispatchChangeFilter:function(filter:string){


			dispatch(changeFilterType(filter))
		},
		dispatchChangeMenu: function (url: string) {


			dispatch(changeMenuUrl(url))
		},

	}

}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Head));