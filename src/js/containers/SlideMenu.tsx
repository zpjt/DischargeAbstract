import * as React from "react";
import MenuNav from "@js/common/NavMenu";
import ErrorBoundary from "@js/common/ErrorBoundary";
import * as Velocity from "velocity-react";
import {connect,MapStateToProps} from "react-redux";
import  Api from "@api/main";
import {SvgIcon} from "@js/common/Button"

type slideMenu={
	expand:boolean;
	data:any[];
};


	
type SlideMenuProp={

}
type SlideMenuState ={


}

class SlideMenu extends React.PureComponent< SlideMenuProp & reduxProp,SlideMenuState>{

	state:slideMenu = {
		expand:true,
		data:[],
	}
  

	getMenu(role_id:string){

		
		Api.getMenu({role_id}).then(res=>{

			this.setState({
						data:res.data,
				});
			
		})
		
	}

	componentDidMount(){
			this.getMenu(this.props.roleId);
	}
	componentWillReceiveProps(nextProps:reduxProp){
		if(nextProps.roleId!=this.props.roleId){
			this.getMenu(nextProps.roleId);
		}
			
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
														<SvgIcon styleType={expand?"menu-expand":"menu-shrink"} size="size2"/>
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