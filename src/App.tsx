import "@css/main.scss";
import App from "./js/index";
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from "redux";
import {logger} from "redux-logger" ;
import  thunk from "redux-thunk" ;
import  rootRecuders from "./js/reducers/index" ;
import * as React from "react";
import * as ReactDom from "react-dom" ;




const middleware = [thunk,logger];
let store:any;

if(window.__REDUX_DEVTOOLS_EXTENSION__){
	store  = createStore(rootRecuders,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__()));
}else{
	store  = createStore(rootRecuders,applyMiddleware(...middleware));
}

/*const store  = createStore(rootRecuders,compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));*/


const domApp = document.getElementById("app");

ReactDom.render((

	<Provider store={store}>
			<App />
	</Provider>

	),domApp);


if(module.hot){

		// 热替换react
		module.hot.accept("./js/index",()=>{
					import("./js/index").then((module:any)=>{
						const AppCom = module.default;
							ReactDom.render((
								<Provider store={store}>
										<AppCom />
								</Provider>
								),domApp);
					});
		});

		//热替换redux

		module.hot.accept("./js/reducers/index",()=>{

					import("./js/reducers/index").then((module:any)=>{
						const nextRootReducers = module.default;
						store.replaceReducer(nextRootReducers);
					});
		});

}