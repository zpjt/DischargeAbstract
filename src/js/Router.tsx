import {Route} from "react-router-dom";
import * as React from "react";
import Summary from "./containers/summary/index";
import AddCaseModal from "./containers/summary/AddCaseModal";
import Gdsummary from "./containers/gdsummary/index";

const Main = ()=>{

			return (
								<>
									<Route path="/summary" component={Summary}/>
									<Route path="/gdsummary" component={Summary}  />
									<Route path="/translate" component={Gdsummary}  />
									<Route path="/addCaseModal" component={AddCaseModal}  />
									<div  id="s-modal"></div>
								</>
				);
}

export default Main ;