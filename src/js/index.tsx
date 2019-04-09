import * as React from "react" ;
import {Switch} from "react-router";
import {BrowserRouter,Route} from "react-router-dom";

import ErrorBoundary from "@js/common/ErrorBoundary";

import SlideMenu from "@js/components/SlideMenu";

import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;
import DefaultRouter from "./containers/defaultRouter" ;

class App extends React.Component{

	state = {
		isFetch:false,
		data:[]
	}

	getMenu(){

		this.setState({
				isFetch:true,
		});
		fetch("/69276/getMenu").then(res=>{
				return res.json();
		}).then(data=>{

			if(Array.isArray(data)){
					this.setState({
							data:data,
							isFetch:false,
					});
			}
		
				
		});
	}

	componentDidMount(){
			this.getMenu();
	}

	render(){
			const data = this.state.data ;
			return (
					<BrowserRouter>
							<ErrorBoundary>
								<SlideMenu data = {data}/>
							</ErrorBoundary>
						  <div className="g-content">
								 <Head/>
								<div className="g-main">
											<Switch>
												<Route path="/" exact component={DefaultRouter} />	
												<MainRouter routerData={data} />
											</Switch>
								</div>
						 </div>
					</BrowserRouter>
					)
	}
}



export	default App;