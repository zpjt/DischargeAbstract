import * as React from "react" ;
import {Switch} from "react-router";
import {BrowserRouter,Route} from "react-router-dom";

import Login from "./login";
import SlideMenu from "@js/containers/SlideMenu";
import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;
import DefaultRouter from "./containers/defaultRouter" ;



type appProps = {

}

type appState={

}
class App extends React.PureComponent<appProps,appState>{
	

	render(){
			return (
					<BrowserRouter>
							<Switch>
										<Route path="/login" component={Login} />	
										<Route path="/index">	
												<SlideMenu/>
											  <div className="g-content">
													 <Head/>
													<div className="g-main">
																<Switch>
																	<Route path="/" exact component={DefaultRouter} />	
																	<MainRouter  />
																</Switch>
													</div>
											 </div>
											</Route >	
							</Switch>
					</BrowserRouter>
					)
	}
}





export	default App;