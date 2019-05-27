import * as React from "react" ;
import {Switch} from "react-router";
import {Route ,HashRouter,BrowserRouter} from "react-router-dom";

import Login from "./login";
import SlideMenu from "@js/containers/SlideMenu";
import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;
import {connect,MapStateToProps,MapDispatchToProps} from "react-redux";
import {Redirect} from "react-router-dom";
import {fetchPostLoginIfNeeded} from "@js/actions/index";


BrowserRouter

type indexProps = {
	isLogin:boolean
}

type indexState={

}
class IndexCom extends React.PureComponent<indexProps,indexState>{
	
	render(){
		const {isLogin}= this.props;
			return (isLogin ? (
								<>
												<SlideMenu/>
											  <div className="g-content">
													 <Head/>
													<div className="g-main">
																<Switch>
																	<MainRouter  />
																</Switch>
													</div>
											 </div>
									</>				
								) : <Redirect to="/login" />)
		
	}
}



type appProps = {

}

type appState={

}
class App extends React.PureComponent<appProps & ReduxStateProp & dispatchProp,appState>{
	

	render(){
		const {isLogin,isFetching,login} = this.props;
			return (
					<HashRouter >
							<Switch>
										<Route path="/login">
												<Login isLogin={isLogin} isFetching={isFetching} login={login}/>	
										</Route>
										<Route path="/" exact   >	
												<Login isLogin={isLogin} isFetching={isFetching} login={login}/>	
										</Route>
										<Route  >	
												<IndexCom isLogin={isLogin}/>
										</Route>
							</Switch>
					</HashRouter>
					)
		}
	
}


type ReduxStateProp={
		isLogin:boolean;
		isFetching:boolean;
}


const mapStateToProps:MapStateToProps<ReduxStateProp,appProps,appStore>=({app})=>{

	return {
		isLogin:app.get("isLogin"),
		isFetching:app.get("isFetching"),
	}
}



type dispatchProp = {
		login:(user:string,pwd:string)=>void;
}
const mapDispatchToProp:MapDispatchToProps<dispatchProp,appProps>= (dispatch:any)=>{

	return {
			login:(user,pwd)=>{
				dispatch(fetchPostLoginIfNeeded(user,pwd));
			}
	}

}

export	default connect(mapStateToProps,mapDispatchToProp)(App);