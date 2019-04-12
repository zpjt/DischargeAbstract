import * as React from "react";
import MenuNav from "@js/common/NavMenu";
import SlideBar from "@js/components/SlideBar";
import ErrorBoundary from "@js/common/ErrorBoundary";
import * as Immutable from "immutable";

type slideMenu={

	expand:boolean;
	isFetch:boolean;
	data:MenuData;
};
type MenuData = Immutable.List<Immutable.Map<string,any>> ;
	
declare global {
	interface MenuImmtubleData extends MenuData{
	
	}
}


class SlideMenu extends React.PureComponent{

	state:slideMenu = {
		expand:true,
		isFetch:false,
		data:Immutable.List([]),
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
							data:Immutable.fromJS(data),
							isFetch:false,
					});
			}
		
				
		});
	}

	componentDidMount(){
			this.getMenu();
	}
	expandHandle=()=>{

		this.setState((prevState:slideMenu)=>{
			return {
				expand:!prevState.expand,
			}
		})
	}

	

	render(){

		const {expand,data} = this.state;

							
		return (<div className={"g-slideMenu "+ (!expand ? "expand" : "")}>
										<SlideBar expandHandle={this.expandHandle}/>
										<ErrorBoundary>
											<MenuNav  data={data} expand={expand} /> 
										</ErrorBoundary>
						</div>

						);
	}



}



export default SlideMenu ;