import * as React from "react";
import {Link,NavLink} from "react-router-dom";
import "@css/menu.scss";
import * as Immutable from "immutable";
import * as Velocity from "velocity-react";

type MenuItem = TypedMap<{
		 id: string;
   	 appId: string;
     name: string;
     url: string;
     sysParam: string;
     parId:number;
     active:boolean;
     children:Immutable.List<MenuItem>
}>;



type ItemProps ={
	obj:MenuItem;
	textField:"name";
	index:number;//索引位置
	pathField:"url";
	iconField:"sysParam";
	idField:"id";
	slectItem:(index:number,parIndex?:number)=>void;
	expand:boolean;
	parIndex?:number;
	sub?:Immutable.List<ItemProps["obj"]>;
};

class ParMenu extends React.PureComponent<ItemProps>{

	state={
		drop:true,
	}

	toggle=()=>{
		this.setState((prevState:{drop:boolean})=>({drop:!prevState.drop}))
	}

	

	render(){

	
			
			const {obj,textField,idField,iconField,pathField,slectItem,sub,index} = this.props;

			const path = obj.get(pathField);
			const text = obj.get(textField);
			const icon = obj.get(iconField);

 			const activeName = obj.get("active") ? "active" : "";

			const hObj = this.props.expand ? {display: "block"} : {};

			return (
					<li className="li-par">
							<div  className={"menu-item menu-par " + activeName} onClick={()=>slectItem(index)}>
									<span className="par-icon">
										<i className={icon}></i>
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
													sub!.map((node:MenuItem,childIndex)=>{
																	 
																	  const nodeId = node.get(idField);
																	return <SubMenu 
																						obj={node} 
																						key={nodeId} 
																						slectItem={slectItem} 
																						idField={idField}
																						textField={textField}
																						iconField={iconField}
																						pathField={pathField}
																						parIndex={index}
																						index={childIndex}
																						/>
													})

											}
									</ul>
							</Velocity.VelocityComponent>
						
					</li>
				)

	}

}


type SubMenuProp= Pick<ItemProps,Exclude<keyof ItemProps,"expand">>



type SubMenuState={

}

class SubMenu extends React.PureComponent<SubMenuProp,SubMenuState>{


	render(){

		const {obj,idField,textField,pathField,slectItem,parIndex,index} = this.props;
		
		 const path = obj.get(pathField);
			const text = obj.get(textField);
		  const id = obj.get(idField);

		  const pathObj={
			  	 pathname: path,
	       	 state: {
	       	 	id,
	       	 	text
	       	 },
			  };

		 	const activeName = obj.get("active") ? "active" : "";

			return (
					<li className="li-child">
							<div  className={"menu-item menu-child "+activeName} >
									<span className="j-nav" onClick={()=>slectItem(index,parIndex)}>
										<NavLink 
										to={pathObj} 
										replace={true}
										>{text}</NavLink>
									</span>
							</div>	
					</li>
				)


	}

}



type props = {
		data:any[];
		expand:boolean;//是否展开，提示到父组件,可以通过兄弟组件控制
		textField?:"name";
		childrenField?:string;
		pathField?:"url";
		iconField?:"sysParam";
		idField?:"id";
};


type state={
	data:Immutable.List<MenuItem>;
	preIndex:number[];			
}

class NavMenu extends React.PureComponent<props,state>{
	
	static defaultProps = {
					textField:"text",
					childrenField:"children",
					pathField:"url",
					iconField:"icon",
					idField:"id"
				};


	constructor(props:props){

		super(props);
		const menuData = this.addFieldToData(this.props.data);
		this.state={
			data:Immutable.fromJS(menuData),
			preIndex:[],
		}
	}

	addFieldToData(data:props["data"]){

		return data.map((val:any)=>{
							val.active = false ;
							const child = val.children.map((node:any)=>{
								node.active = false ;
								return node ;
							});
							val.children = child ;
							return val ;
		});

	}

	restPreSel(pre:state){





		const {preIndex,data} = pre ;
		const {childrenField} = this.props ;

		if(preIndex.length === 0){
			return data ;
		}

		let newSata ;

		newSata = data.updateIn([preIndex[0]],(node:MenuItem)=>{
			return node.set("active",false)
		})

		if(preIndex.length>1){

					newSata = newSata.updateIn([preIndex[0],childrenField,preIndex[1]],(node:MenuItem)=>{
							return node.set("active",false)
					})

		}

		return newSata ;
	}


	slectItem=(index:number,parIndex?:number)=>{

			const {childrenField} = this.props;

			const curPath = parIndex ? (parIndex+""+index) :(index+"") ;

			if( curPath === this.state.preIndex.join("")){
				return ;
			}


				this.setState(pre=>{

						
						let preIndex;
						let data = this.restPreSel(pre);
								data = data.updateIn([(parIndex!==undefined ? parIndex :index)],(node:MenuItem)=>{
										return node.set("active",true)
									});



						if(parIndex!==undefined){ //  子节点
							 data = data.updateIn([parIndex,childrenField,index],(node:MenuItem)=>{
									return node.set("active",true)
								});	

							 preIndex = [parIndex,index]
					
						}else{

							 preIndex = [index]

						}



						return{data,preIndex}
				});
		
	}


	render(){
		const {textField,childrenField,idField,iconField,expand,pathField} = this.props;
		const {data} = this.state;

		return <ul className="g-menu">
						
							{

								data.map((item,oIndex)=>{
															const val = item;
															const child = val.get(childrenField as "children");
															const id = val.get("id");

															if(child && child.size){
																	return <ParMenu 
																						expand={expand} 
																						index={oIndex}
																						sub={child}  
																						obj={val}  
																						key={id} 
																						slectItem={this.slectItem} 
																						idField={idField!}
																						textField={textField!}
																						pathField={pathField!}
																						iconField={iconField!}
																					/> 
															}else{
																	return <SubMenu 
																						obj={val} 
																						key={id} 
																						slectItem={this.slectItem} 
																						index={oIndex}
																						idField={idField!}
																						textField={textField!}
																						pathField={pathField!}
																						iconField={iconField!}
																						/>
																				}
													})
							
							}
		</ul>
	}
}


export default NavMenu ;