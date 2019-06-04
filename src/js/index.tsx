import * as React from "react" ;
import {Switch} from "react-router";
import {Route ,HashRouter,BrowserRouter} from "react-router-dom";

import SlideMenu from "@js/containers/SlideMenu";
import Head from "@js/containers/Head";
import MainRouter from "@js/Router" ;

BrowserRouter

class IndexCom extends React.PureComponent{
	
	render(){
			return (
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
			) 
	}
}



class App extends React.PureComponent{
	

	render(){
			return (
					<HashRouter>
							<Switch>
                            	<Route  path="/"   component={IndexCom} />	
							</Switch>
					</HashRouter>
					)
		}
	
}




export	default App ; 