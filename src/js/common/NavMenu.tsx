import * as React from "react";
import {Link} from "react-router-dom";
import "@css/menu.scss";
import * as Immutable from "immutable";

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
};

class ParMenu extends React.PureComponent<ItemProps>{

	state={
		drop:true,
	}

	toggle=()=>{
		this.setState((prevState:{drop:boolean})=>({drop:!prevState.drop}))
	}

	componentWillReceiveProps(nextProps:any){
		
		if(nextProps.expand!==this.props.expand){
				this.setState({
								drop:!this.props.expand,
				});
		}
	
	}
	componentWillUpdate(){
		console.log("update")
	}
	render(){

	
			console.log("reder")
			const {obj,config,children,slectItem,activeName} = this.props;


			const path = obj.get(config.pathFiled);
			const text = obj.get(config.textFile);
			const icon = obj.get(config.iconField!) || "fa-circle";
			const id = obj.get(config.idField);

			const hObj = !this.state.drop ?{maxHeight:"0"}:{maxHeight:"120px"};
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
							<ul className="child-ul " style={hObj}>
								{children}
							</ul>
					</li>
				)

	}

}



const SubMenu:React.SFC< (Pick<ItemProps,Exclude<keyof ItemProps,"expand">>  & {parId:string})> = ({obj,config,slectItem,parId,activeName})=>{

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
		test:false,
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

		const {childrenField,...itemConfig} = config ;

		const {parSlected,childSlected} = this.state;
		childSlected
		const val = data.get(0);


			const node = val ? val.get("children").get(0) : null ;

		return <ul className="g-menu">
							{val ? <ParMenu expand={expand} activeName={val.get("id") === parSlected ? "active":""}  obj={val}  config={NavMenu.defaultConfig} key={val.get("id")} slectItem={this.slectItem}>
																																<SubMenu obj={node} activeName={""}   config={itemConfig} key={node.get("id")} slectItem={this.slectItem} parId={val.get("id")}/>
															</ParMenu>:""}
												{

								// data.map(item=>{
															

								// 							const val = item!;
								// 							const child = val.get(childrenField!) as Immutable.List<Immutable.Map<string,any>>;
								// 							const id = val.get("id");
								// 							const activeName = id === parSlected ? "active" : "";

								// 							if(child && child.size){
								// 									return (
								// 												<ParMenu expand={expand} activeName={activeName}  obj={val}  config={NavMenu.defaultConfig} key={id} slectItem={this.slectItem}>
								// 													{
								// 															child.map((node:Immutable.Map<string,any>)=>{
								// 																const nodeId = node.get("id");
								// 																	const activeName = nodeId === childSlected ? "active":"";
								// 																return <SubMenu obj={node} activeName={activeName}   config={itemConfig} key={nodeId} slectItem={this.slectItem} parId={id}/>
								// 															})
								// 													}
								// 												</ParMenu>
								// 										)
								// 							}else{
								// 									return <SubMenu obj={val} key={id} config={itemConfig} activeName={activeName}  slectItem={this.slectItem} parId={""} />
								// 							}
								// 					})
							}
							<li><button onClick={this.chageState}>测试纯组件</button></li>
		</ul>
	}
}


export default NavMenu ;