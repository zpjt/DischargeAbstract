
import * as React from "react";
import * as Immutable from "immutable";
import {VelocityComponent} from "velocity-react";
import Search from "@js/common/SearchCom";
import "@css/combobox.scss";
import {Checkbox} from "@js/common/InputBtn";




type Parprops={
	selected?:states["selected"];
	itemObj:{[key:string]:any};
	idField:string;
	childField:string;
	textFiled:string;
	icon:string;
	lev:number;
	checkbox:(id:string)=>React.ReactChild;

	formatter?:(node:any)=>React.ElementType;
}


type Parstates={

		expand:boolean;
		childSeletedNum:number;

};



const ChildCom:React.SFC<Parprops>=({lev,icon,itemObj,textFiled,idField,checkbox})=>{
		return (<li>
								<div  className="m-combo-item" >
									 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
									 			{checkbox(itemObj[idField])}
											 	<i className={icon}>&nbsp;</i>
											 	<span>{itemObj[textFiled]}</span>
									 </span>
						  </div>
					</li>)

}

class ParCom extends React.PureComponent<Parprops,Parstates>{

	
	constructor(props:Parprops){
		super(props);

		this.state= {
			expand:true,
			childSeletedNum: 0,
		}

	}
	toggleChecked=()=>{
	

		this.setState(preState=>{
				let a = preState.childSeletedNum;
			return {
				childSeletedNum: a++
			}
		})
	}
	toggleExpand=()=>{

		this.setState(preState=>{

			return {
				expand:!preState.expand
			}
		})
	}

	render(){

			const {idField,childField,itemObj,textFiled,icon,lev,checkbox,selected} =this.props;
			const {expand} = this.state;
			let _lev = lev;
					_lev++ ;
		return (<li key={itemObj[idField]}>
								  <div  className="m-combo-item" >
										 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
										 			{checkbox(itemObj[idField])}
												 	<span className="fa fa-folder-o">&nbsp;</span>
												 	<span>{itemObj[textFiled]}</span>
										 </span>
										 <span className="j-slide" onClick={this.toggleExpand}>
													<i className={"fa " + (expand ? "fa-chevron-up":"fa-chevron-down")}></i>
										 </span>
								  </div>
								  <VelocityComponent animation={(expand ? "slideDown" :"slideUp")} duration={300}>
									  	 <ul>
											  	{

											  		itemObj[childField].map((val:any)=>{

											  				const sub = val[childField];

											  				if(sub.length){
											  					return <ParCom 			key={val[idField]}
											  															checkbox={checkbox} 
																											itemObj={val} 
																											icon={icon} 
																											textFiled={textFiled} 
																											idField={idField}
																											childField={childField}
																											lev={_lev}
																											selected={selected}
																											 />
											  				}else{

											  					return <ChildCom 		key={val[idField]}
											  															checkbox={checkbox} 
																											itemObj={val} 
																											icon={icon} 
																											textFiled={textFiled} 
																											idField={idField}
																											childField={childField}
																											lev={_lev}
																											selected={selected}
											  										/>
											  				}
											  		})
											  	}
									  	</ul>
								  </VelocityComponent>
								 
						</li>)
	}
}



type props={
	data:any[];
	
	idField?:string;
	childField?:string;
	textFiled?:string;
	isParField?:string;
	icon?:string;
	checkbox:boolean,
	formatter?:(node:any)=>React.ElementType;
	width:number;
	maxHeight:number;
}


type states={
		selected:Immutable.List<string>;
		drop:boolean;

};



export default class ComTreeBox extends React.PureComponent<props,states>{

	static defaultProps={
		idField:"id",
		childField:"children",
		textFiled:"text",
		icon:"fa fa-circle",
		checkbox:true,
		width:300,
		maxHeight:300,
	}

 	state:states = {
 		drop:false,
 		selected:Immutable.List([]),
 	}

 	static CheckBox= (id:string)=><Checkbox.Item value={id} tit={""} nameFiled="org" />;
 	static noCheck= ()=>"";


 	toggleDrop=()=>{

			this.setState(preState=>{

				return {
					drop:!preState.drop
				}
		})

 	}


	render(){

		const {drop,selected} = this.state;
		const {checkbox,data,icon,textFiled,idField,childField,width,maxHeight} = this.props;

		const checkBox =  checkbox ? ComTreeBox.CheckBox :ComTreeBox.noCheck ;

		const value = "";

		return (<div className={"comTreeBox "+(drop ? "active ":"") + (!value?"no-fill":"")} style={{width:width+"px"}}>

							<div className="m-combo-inp" onClick={this.toggleDrop}  >
											<input type="text" className="m-inp" readOnly value={value} placeholder={checkbox?"多选":"单选"}/>
											<span className="j-slide" >
												<i className={"fa " + (drop ? "fa-chevron-up":"fa-chevron-down")}></i>
											</span>
							</div>
							<VelocityComponent animation={drop?"slideDown":"slideUp"}>
									<div className="m-drop" >
											 <Search closeHandle={()=>console.log(3)} searchHandle={()=>console.log(3)}/>
										
												<ul className="m-tree" style={{maxHeight:maxHeight+"px"}}>
													{
														data.map(val=>{

																	if(val[childField!].length){
																			return <ParCom 	key={val[idField!]}
																											checkbox={checkBox} 
																											itemObj={val} 
																											icon={icon!} 
																											textFiled={textFiled!} 
																											idField={idField!}
																											childField={childField!}
																											lev={0}
																											selected={selected}
																											 />
																	}

														})
													}
											</ul>
									</div>
							</VelocityComponent>
						</div>);


	}

}