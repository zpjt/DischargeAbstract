import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom"
import { connect, MapStateToProps } from "react-redux";
import Modal from "@js/common/Modal";
import { InpBox } from "@js/common/InputBtn"

type HeadProp = {

}

type HeadState = {
	initPasswordModal: boolean;
	showPasswordModal: boolean;
	password: string;
}

class Head extends React.PureComponent<RouteComponentProps<HeadProp> & reduxStateProp, HeadState>{

	state: HeadState = {
		initPasswordModal: false,
		showPasswordModal: false,
		password: "",
	}

	logOut=()=>{

		console.log("login")
	}

	togglePassword = () => {

		this.setState(pre => ({
			initPasswordModal: true,
			showPasswordModal: !pre.showPasswordModal,
		}))
	}

	changePassword = (file: "password", pwd: string) => {

		this.setState({
			[file]: pwd,
		})

	}

	render() {

		const { user_name} = this.props;
		const { initPasswordModal, showPasswordModal, password } = this.state;

		const rootModalDom = document.getElementById("modal_root") as HTMLDivElement;

		return (<div className="g-head">
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


			</Modal>) : null}
			<span className="m-theme">医疗安全（不良）事件上报管理</span>
			<div className="g-sys_set">
				<div className="m-mail">邮箱</div>
				<div className="g-user-opt" >
					<div style={{ padding: "20px 10px" }}>
						<span className="fa fa-user">&nbsp;&nbsp;</span>
						<span>{user_name}</span>
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
}

const mapStateToProps: MapStateToProps<reduxStateProp, RouteComponentProps<HeadProp>, appStore> = ({app}) => {

	return {
		user_name: app.get("user_name")
	}

}


export default withRouter(connect(mapStateToProps)(Head));