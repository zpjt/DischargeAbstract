import * as React from "react";
import MenuNav from "@js/common/NavMenu";
import ErrorBoundary from "@js/common/ErrorBoundary";
import * as Velocity from "velocity-react";
import axios from "@js/common/AxiosInstance";
import {connect,MapStateToProps} from "react-redux";


type slideMenu={
	expand:boolean;
	isFetch:boolean;
	data:any[];
};


	
type SlideMenuProp={

}
type SlideMenuState ={


}

class SlideMenu extends React.PureComponent< SlideMenuProp & reduxProp,SlideMenuState>{

	state:slideMenu = {
		expand:true,
		isFetch:false,
		data:[],
	}
  

	getMenu(){

		this.setState({
				isFetch:true,
		});

		const {roleId}  = this.props;

		axios({
			url:"/summary/getMenu",
			params:{role_id:roleId},
		}).then(res=>{
			this.setState({
						data:res.data,
						isFetch:false,
				});
			
		})
		
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

		return (
			<Velocity.VelocityComponent duration={300} animation={{width:this.state.expand ? 250 : 50}}>
					<div className={"g-slideMenu "+ (!expand ? "expand" : "")}>
											<div className="g-logo">
													<span className="m-logo"></span>
													<span className="j-slideBar" onClick={this.expandHandle}>
														 <i className="fa fa-bars fa-2x"></i>
													</span>	
											</div>
											<ErrorBoundary>
											{data.length ?	<MenuNav  data={data} expand={expand} textField="name" iconField="sysParam"/> :null}
											</ErrorBoundary>
					</div>
			</Velocity.VelocityComponent> );
	}



}

type reduxProp ={
	roleId:string;
} 

const mapStateToProp:MapStateToProps<reduxProp,SlideMenuProp,appStore>=({app})=>{

	const roleId = app.get("role_ids")[app.get("role_index")];
	return {

		roleId,

	}
}


export default connect(mapStateToProp)(SlideMenu);