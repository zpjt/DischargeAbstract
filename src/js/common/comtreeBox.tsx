
import * as React from "react";
import * as Immutable from "immutable";
import {VelocityComponent} from "velocity-react";
import Search from "@js/common/SearchCom";
import "@css/combobox.scss";
import {Checkbox,ComboInp} from "@js/common/InputBtn";




type Parprops={
	itemObj:Immutable.Map<string,any>;
	idField:string;
	childField:string;
	textFiled:string;
	icon:string;
	lev:number;
	checkBoxCom:DropProps["checkBoxCom"];
	updateSelectList:DropProps["updateSelectList"];
	formatter?:(node:any)=>React.ElementType;
	childCheckHandle?:DropProps["updateSelectList"];
	parCheckHandle?:()=>void;
}


type Parstates={

		expand:boolean;
		childSeletedNum:number;

};



const ChildCom:React.SFC<Parprops>=({lev,icon,itemObj,textFiled,idField,checkBoxCom,updateSelectList})=>{
		
		const text = itemObj.get(textFiled);


		return (<li>
								<div  className="m-combo-item" >
									 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
									 			{checkBoxCom(itemObj.get(idField),text,updateSelectList,false)}
											 	<i className={icon}>&nbsp;</i>
											 	<span>{text}</span>
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
	

		console.log("par")


	}

	childToggleCheck=(id:string,text:string)=>{
	
		console.log("child");

		this.setState((preState)=>{
				let num = preState.childSeletedNum;
						num++;
			return {
				childSeletedNum:num
			}
		});

		this.props.updateSelectList(id,text);

	}



	toggleExpand=()=>{

		this.setState(preState=>{

			return {
				expand:!preState.expand
			}
		});

		
	}

	render(){

			const {idField,childField,itemObj,textFiled,icon,lev,checkBoxCom,updateSelectList} =this.props;
			const {expand,childSeletedNum} = this.state;
			let _lev = lev;
					_lev++ ;
			const text = itemObj.get(textFiled);

			const isChecked = childSeletedNum === itemObj.get(childField).size;

		return (<li key={itemObj.get(idField)}>
								  <div  className="m-combo-item" >
										 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
										 			{checkBoxCom(itemObj.get(idField),text,this.toggleChecked,isChecked)}
												 	<span className="fa fa-folder-o">&nbsp;</span>
												 	<span>{text}</span>
										 </span>
										 <span className="j-slide" onClick={this.toggleExpand}>
													<i className={"fa " + (expand ? "fa-chevron-up":"fa-chevron-down")}></i>
										 </span>
								  </div>
								  <VelocityComponent animation={(expand ? "slideDown" :"slideUp")} duration={300}>
									  	 <ul>
											  	{

											  		itemObj.get(childField).map((val:Immutable.Map<string,any>)=>{

											  				const sub = val.get(childField) as Immutable.List<Immutable.Map<string,any>>;

											  				if(sub.size){
											  					return <ParCom 			key={val.get(idField)}
											  															checkBoxCom={checkBoxCom} 
																											itemObj={val} 
																											icon={icon} 
																											textFiled={textFiled} 
																											idField={idField}
																											childField={childField}
																											lev={_lev}
																											childCheckHandle={this.childToggleCheck}
																											parCheckHandle={this.toggleChecked}
																											updateSelectList={updateSelectList}
																											 />
											  				}else{

											  					return <ChildCom 		key={val.get(idField)}
											  															checkBoxCom={checkBoxCom} 
																											itemObj={val} 
																											icon={icon} 
																											textFiled={textFiled} 
																											idField={idField}
																											childField={childField}
																											lev={_lev}
																											updateSelectList={updateSelectList}
																											childCheckHandle={this.childToggleCheck}
											  										/>
											  				}
											  		})
											  	}
									  	</ul>
								  </VelocityComponent>
								 
						</li>)
	}
}


type DropProps = {

	data:Immutable.List<Immutable.Map<string,any>>;
	idField:string;
	childField:string;
	textFiled:string;
	isParField?:string;
	icon:string;
	formatter?:(node:any)=>React.ElementType;
	updateSelectList:(id:string,text:string)=>void;
	checkBoxCom:(id:string,text:string,handler:Function,isChecked:boolean)=>React.ReactChild;
}

type DropState = {


}


class DropCom  extends  React.PureComponent<DropProps,DropState>{


	
 
	render(){

		const {data,childField,icon,textFiled,idField,updateSelectList,checkBoxCom,} = this.props;
	

		return (<>
									{
										data.map(val=>{

													if(val.get(childField!).size){
															return <ParCom 	key={val.get(idField!)}
																							checkBoxCom={checkBoxCom} 
																							itemObj={val} 
																							icon={icon!} 
																							textFiled={textFiled!} 
																							idField={idField!}
																							childField={childField!}
																							lev={0}
																							updateSelectList={updateSelectList}
																							 />
														
													}
										})
									}
						</>)
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
		selected:Immutable.List<{text:string;id:string;}>;
		drop:boolean;
		treeData:Immutable.List<Immutable.Map<string,any>>
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

 	constructor(props:props){
 		super(props);
		this.state = {
		 		drop:false,
		 		selected:Immutable.List([]),
		 		treeData:Immutable.fromJS(props.data),
	 	}

 	}

 	static CheckBox= (id:string,text:string,handler:Function,isChecked:boolean)=>{
 		return <Checkbox.Item  tit={""} nameFiled="org" checked={isChecked} changeHandle={handler.bind(null,id,text)}/>
 	};

 	static noCheck= ()=>"";

 	updateSelectList = (id:string,text:string)=>{


 		console.log(id,text);

 			this.setState(preState=>{
 					const selectList = preState.selected;
					const index = selectList.findIndex(val=>val.id===id);
					console.log(index,text);
			 		if(index > -1){
			 				return {
								selected:selectList.remove(index),
							};
			 		}else{
							return{
								selected:selectList.push({id,text})
							}
			 		}
 			});
 	}

 	toggleDrop=()=>{

			this.setState(preState=>{

				return {
					drop:!preState.drop
				}
		})

 	}

 	
 	  getValue(){

			 const {selected} = this.state;
	  	 const arr = selected.map(val=>{
	  	 			return val.text ;
	  	 });
	  	 return arr.join(",");

	  }
		searchHandle=()=>{

			console.log(3)
		}

		closeHandle=()=>{
			console.log(3)
		}

	render(){

		const {drop,treeData} = this.state;
		const {checkbox,icon,textFiled,idField,childField,width,maxHeight} = this.props;

		
		const checkBoxCom =  checkbox ? ComTreeBox.CheckBox :ComTreeBox.noCheck ;
		const value = this.getValue();

		return (<div className={"comTreeBox "+(drop ? "active ":"") + (!value?"no-fill":"")} style={{width:width+"px"}}>
							<ComboInp multiply={checkbox} value={value} toggleDrop={this.toggleDrop}  drop={drop}/>
							<VelocityComponent animation={drop?"slideDown":"slideUp"}>
								<div className="m-drop" >
									<Search closeHandle={this.closeHandle} searchHandle={this.searchHandle}/>
									<ul className="m-tree" style={{maxHeight:maxHeight+"px"}}>
										
										<DropCom  data={treeData}
															icon={icon!} 
															textFiled={textFiled!} 
															idField={idField!}
															childField={childField!}
															checkBoxCom={checkBoxCom}
															updateSelectList={this.updateSelectList}
														 />
														}
														
									</ul>	
									
								</div>
							
							</VelocityComponent>
						</div>);


	}

}

