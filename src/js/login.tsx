import "@css/login.scss";
import * as React  from "react";
import {Redirect} from "react-router-dom";
import {connect,MapStateToProps,MapDispatchToProps} from "react-redux";
import {fetchPostLoginIfNeeded} from "@js/actions/index";




type LoginProp = {

};

type LoginState = {
	
};


 class Login extends React.PureComponent<LoginProp & LoginReduxProps & dispatchProp ,LoginState>{

	userDom:React.RefObject<HTMLInputElement> = React.createRef();
	psdDom:React.RefObject<HTMLInputElement> = React.createRef();

	loginHandle=()=>{

		const user = (this.userDom.current!).value;
		const pwd = (this.psdDom.current!).value;

		this.props.login(user,pwd);

	}
	render(){
		const {isFetching,isLogin} = this.props;

		return !isLogin ?(
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
														<button className="s-btn login-btn" onClick={this.loginHandle}>
															{isFetching?<span style={{paddingRight:20}}><i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i></span>:null}
															<b>登 录</b>
														</button>
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


};


type LoginReduxProps = Pick<app,"isFetching" | "isLogin">
const mapStateToProp:MapStateToProps<LoginReduxProps,LoginProp,appStore>  = ({app})=>{

	return {
		isFetching:app.get("isFetching"),
		isLogin:app.get("isLogin"),

	}

}

type dispatchProp = {
		login:(user:string,pwd:string)=>void;
}
const mapDispatchToProp:MapDispatchToProps<dispatchProp,LoginProp>= (dispatch:any)=>{

	return {
			login:(user,pwd)=>{
				console.log(user,pwd)
				dispatch(fetchPostLoginIfNeeded());

			}
	}

}

const LoginConnect = connect(mapStateToProp,mapDispatchToProp)(Login);

export default LoginConnect;