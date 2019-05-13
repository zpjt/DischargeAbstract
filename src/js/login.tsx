import * as React  from "react";
import {withRouter ,RouteComponentProps ,Redirect} from "react-router-dom";
import "@css/login.scss";




type LoginProp = {};

type LoginState = {

	login:boolean;
};


 class Login extends React.PureComponent<LoginProp & RouteComponentProps<{}>,LoginState>{

	userDom:React.RefObject<HTMLInputElement> = React.createRef();
	psdDom:React.RefObject<HTMLInputElement> = React.createRef();
	state={
		login:false,
	}
	//使用 重定向跳转
	set = ()=>{

		this.setState({
			login:true,
		})
	}
	//使用withRouter跳转,注意使用withRouter时，注意组件的props类型要加 RouteComponentProps<{}>
	login = ()=>{

		const user = (this.userDom.current)!.value;
		const psd = (this.userDom.current)!.value;

		if(!user || !psd){
			return;
		}

		console.log(this.context)
		this.props.history.push("/index");
		//window.location.href="/index"
	}


	render(){
		const {login} = this.state;

		return !login ?(
				<div className="g-login">
						<div className="m-login">
								<div className="login-title">
								 		<svg style={{width:"100%",height:"100%"}}>
								 			<polygon points="20,0 280,0 300,40 280,80 20,80 0,40" fill="#00a0e9"></polygon>
								 			<text x="150"  y="50" fill="white" textAnchor="middle">不良事件管理系统</text>
								 		</svg>
								</div>
								<div className="login-content">
										<p style={{color:"#00a0e9"}}>账号登录</p>
										<div className="login-inpBox">
												<div className="login-inp">
													<input type="text" ref={this.userDom} className="s-inp" placeholder="用户名"/>
												</div>
												<div className="login-inp">
													<input type="password" ref={this.psdDom} className="s-inp" placeholder="请输入密码"/>
												</div>
										</div>
										<div className="submit-btn">
														<button className="s-btn login-btn" onClick={this.set}>登 录</button>
										</div>
								</div>
								<div className="login-footer">
									<span>长城网科智慧医疗</span>
									<span>v1.0.0</span>
								</div>
						</div>
						<p className="copyright">
									<span>Copyright@ 2017 深圳市长城网信息科技股份有限公司 版权所有 </span>
						</p>
				</div>
			) : <Redirect to="/index" />
	}


}

export default withRouter(Login);