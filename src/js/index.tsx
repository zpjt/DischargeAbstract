import * as React from "react" ;
import {Switch} from "react-router";
import {BrowserRouter,Route} from "react-router-dom";



import SlideMenu from "@js/containers/SlideMenu";

import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;
import DefaultRouter from "./containers/defaultRouter" ;

class App extends React.Component{
	

	render(){
			return (
					<BrowserRouter>
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
					</BrowserRouter>
					)
	}
}



export	default App;