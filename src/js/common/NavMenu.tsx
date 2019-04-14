import * as React from "react";
import {Link} from "react-router-dom";
import "@css/menu.scss";
import * as Immutable from "immutable";
import * as Velocity from "velocity-react";

type fieldConfig = {
		textFile:string;
		childrenField?:string;
		pathFiled:string;
		iconField?:string;
		idField:string;
} & {
			[key:string]:any
		};

type props = {
		data:MenuImmtubleData;
		config?:fieldConfig ;
		expand:boolean;
};


type ItemProps ={
	obj:Immutable.Map<string,any>;
	config:fieldConfig;
	slectItem:(id:string,type?:string)=>void;
	activeName:string;
	expand:boolean;
	sub?:Immutable.List<ItemProps["obj"]>;
	childSlected?:string;
	parId?:string;
};

class ParMenu extends React.PureComponent<ItemProps>{

	state={
		drop:true,
	}

	toggle=()=>{
		this.setState((prevState:{drop:boolean})=>({drop:!prevState.drop}))
	}

	componentWillReceiveProps(nextProps:any){

		nextProps
		
		/*if(nextProps.expand!==this.props.expand){
				this.setState({
								drop:true,
				});
		}*/
	
	}
	componentWillUpdate(){
		console.log("update")
	}
	render(){

	
			
			const {obj,config=NavMenu.defaultConfig,slectItem,activeName,sub,childSlected} = this.props;



			const path = obj.get(config.pathFiled);
			const text = obj.get(config.textFile);
			const icon = obj.get(config.iconField!) || "fa-circle";
			const id = obj.get(config.idField);

		const hObj = this.props.expand ? {display: "block"} : {};

			return (
					<li className="li-par">
							<div  className={"menu-item menu-par " + activeName} onClick={()=>slectItem(id)}>
									<span className="par-icon">
										<i className={"fa "+icon}></i>
									</span>	
									<span className="j-nav" >
										<Link to={path}>{text}</Link>
									</span>
									<span className="j-slide_menu" onClick={this.toggle}>
										<i className={"fa fa-chevron-"+(this.state.drop ? "down":"up")}></i>
									</span>
							</div>	
							<Velocity.VelocityComponent animation={this.state.drop ? "slideDown": "slideUp"} duration={300}>
									<ul className="child-ul " style={hObj}>
											{
													sub!.map((node:Immutable.Map<string,any>)=>{
																	  const nodeId = node.get("id");
																		const activeName = nodeId === childSlected ? "active":"";
																	return <SubMenu obj={node} activeName={activeName}   config={config} key={nodeId} slectItem={slectItem} parId={id}/>
													})

											}
									</ul>
							</Velocity.VelocityComponent>
						
					</li>
				)

	}

}



const SubMenu:React.SFC< (Pick<ItemProps,Exclude<keyof ItemProps,"expand">>)> = ({obj,config=NavMenu.defaultConfig,slectItem,parId,activeName})=>{

		  const path = obj.get(config.pathFiled);
			const text = obj.get(config.textFile);
		  const id = obj.get(config.idField);
	return (
			<li className="li-child">
					<div  className={"menu-item menu-child "+activeName} >
							<span className="j-nav" onClick={()=>slectItem(id,parId)}>
								<Link to={path}>{text}</Link>
							</span>
					</div>	
			</li>
		)
};


type state={
	parSlected:string,
	childSlected:string,
	test?:boolean;
}

class NavMenu extends React.PureComponent<props,state>{
	
	static defaultConfig = {
					textFile:"text",
					childrenField:"children",
					pathFiled:"url",
					iconField:"icon",
					idField:"id"
				};

	state={
		parSlected:"",
		childSlected:"",
	}

	slectItem=(id:string,type?:string)=>{
			if(!type){ //  父节点

				this.setState({
					parSlected:id,
					childSlected:"",
				});
				 
			
			}else{ 

				this.setState({
					parSlected:type,
					childSlected:id,
				});
				 

			}
	}

	chageState=()=>{

		this.setState(prevState=>({test:!prevState.test}));
	}

	render(){
		const {data,config=NavMenu.defaultConfig,expand} = this.props;

		const {childrenField} = config ;

		const {parSlected,childSlected} = this.state;
		

		return <ul className="g-menu">
						
							{

								data.map(item=>{
															const val = item!;
															const child = val.get(childrenField!) as Immutable.List<Immutable.Map<string,any>>;
															const id = val.get("id");
															const activeName = id === parSlected ? "active" : "";

															if(child && child.size){
																	return <ParMenu expand={expand} activeName={activeName} childSlected={childSlected} sub={child}  obj={val}  config={config} key={id} slectItem={this.slectItem} /> 
															}else{
																	return <SubMenu obj={val} key={id} config={config}  activeName={activeName}  slectItem={this.slectItem} parId={""} />
															}
													})
							
							}
		</ul>
	}
}


export default NavMenu ;