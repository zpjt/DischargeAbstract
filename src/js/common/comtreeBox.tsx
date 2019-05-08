
import * as React from "react";
import * as Immutable from "immutable";
import {VelocityComponent} from "velocity-react";
import Search from "@js/common/SearchCom";
import "@css/combobox.scss";
import {ComboInp} from "@js/common/InputBtn";


type Parprops={
	itemObj:Immutable.Map<string,any>;
	idField:string;
	childField:string;
	textFiled:string;
	icon:string;
	lev:number;
	checkBoxCom:DropProps["checkBoxCom"];
	formatter?:(node:any)=>React.ElementType;
	oIndex:string;
	handleFn:DropProps["handleFn"];
}

enum CheckStatus{
	checked="checked",
	hasCheck="hasCheck",
	uncheck="uncheck",
}


type Parstates={

	
};

type DropProps = {

	data:Immutable.List<Immutable.Map<string,any>>;
	idField:string;
	childField:string;
	textFiled:string;
	isParField?:string;
	icon:string;
	formatter?:(node:any)=>React.ElementType;
	handleFn:(methods:string,path:string)=>void;
	checkBoxCom:(method:"childCheck"|"parCheck",path:string,handler:Function,isChecked:string)=>React.ReactChild;
}

type DropState = {


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
	defaultSelArr?:string[];
	changeParState?:(params:string,idArr:string[])=>void;
	getValStatus?:boolean;
}


type states={
		selected:Immutable.List<{text:string;id:string;}>;
		drop:boolean;
		treeData:Immutable.List<Immutable.Map<string,any>>
};

class ChildCom extends React.PureComponent<Parprops>{

	render(){
			const {lev,icon,itemObj,textFiled,checkBoxCom,handleFn,oIndex} = this.props;
			const text = itemObj.get(textFiled);

			const checkStatus = itemObj.get("checkStatus");

			const checkCom = checkBoxCom("childCheck",oIndex,handleFn,checkStatus);

			const activeName = !checkCom && checkStatus == CheckStatus["checked"]? "active"  : "" ;

			const clickFn = !checkCom ?(()=>{
				handleFn("clickItem",oIndex);
			}) : undefined;

			return (<li>
								<div  className={"m-combo-item " + activeName} onClick={clickFn}>
									 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
									 				{checkCom}
											 	<i className={icon}>&nbsp;</i>
											 	<span>{text}</span>
									 </span>
						  </div>
					</li>) 
	}
}

class ParCom extends React.PureComponent<Parprops,Parstates>{

	render(){

			const {idField,childField,itemObj,textFiled,icon,lev,checkBoxCom,handleFn,oIndex} =this.props;
			
			let _lev = lev;
					_lev++ ;

			const text = itemObj.get(textFiled);
			const  expand  = itemObj.get("state");
			const checkStatus = itemObj.get("checkStatus");

			const checkCom = checkBoxCom("parCheck",oIndex,handleFn,checkStatus);
			const activeName = !checkCom && checkStatus !== CheckStatus["uncheck"]? "activeClick"  : "" ;

		return (<li key={itemObj.get(idField)}>
								  <div  className={"m-combo-item " + activeName} >
										 <span className="g-item-text" style={{paddingLeft:lev+"em"}}>
										 			{checkCom}
												 	<span className={!expand ? "fa fa-folder-o ": "fa fa-folder-open-o"}>&nbsp;</span>
												 	<span>{text}</span>
										 </span>
										 <span className="j-slide" onClick={()=>handleFn("expandToggle",oIndex)}>
													<i className={"fa " + (expand ? "fa-chevron-up":"fa-chevron-down")}></i>
										 </span>
								  </div>
								  <VelocityComponent animation={(expand ? "slideDown" :"slideUp")} duration={300}>
									  	 <ul>
											  	{

											  		itemObj.get(childField).map((val:Immutable.Map<string,any>,index:number)=>{

											  				const sub = val.get(childField) as Immutable.List<Immutable.Map<string,any>>;

											  				if(sub.size){
											  					return <ParCom 			key={val.get(idField)}
											  															checkBoxCom={checkBoxCom} 
																											itemObj={val} 
																											icon={icon} 
																											textFiled={textFiled} 
																											idField={idField}
																											childField={childField}
																											oIndex={oIndex!+"@"+index}
																											lev={_lev}
																											handleFn={handleFn}
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
																											oIndex={oIndex!+"@"+index}
																											handleFn={handleFn}
											  										/>
											  				}
											  		})
											  	}
									  	</ul>
								  </VelocityComponent>
								 
						</li>)
	}
}


class DropCom  extends  React.PureComponent<DropProps,DropState>{

	render(){

		const {data,childField,icon,textFiled,idField,handleFn,checkBoxCom,} = this.props;

		return (<>
									{
										data.map((val,index)=>{

													if(val.get(childField!).size){
															return <ParCom 	key={val.get(idField!)}
																							checkBoxCom={checkBoxCom} 
																							itemObj={val} 
																							icon={icon!} 
																							textFiled={textFiled!} 
																							idField={idField!}
																							childField={childField!}
																							lev={0}
																							oIndex={index+""}
																							handleFn={handleFn}
																							 />
														
													}
										})
									}
						</>)
	}

}

interface ComTree {
	searchHandle:(key:string)=>void;
	getArrId:()=>void;
	clickItem:(path:string)=>void;
	prePath?:(number | string)[];

}
export default class ComTreeBox extends React.PureComponent<props,states> implements ComTree{

	static defaultProps={
		idField:"id",
		childField:"children",
		textFiled:"text",
		icon:"fa fa-circle",
		checkbox:false,
		width:300,
		maxHeight:300,
		defaultSelArr:["206"],
	}

	componentWillReceiveProps(nexProp:props){

			//父组件
			if(nexProp.getValStatus != this.props.getValStatus){
					this.getArrId();
			}

			
	}

	static CheckBox= (method:string,path:string,handler:(method:string,path:string)=>void,checkStatus:string)=>{

				const isChecked = checkStatus === CheckStatus["checked"] ;
				const hasChecked = checkStatus === CheckStatus["hasCheck"] ;

		 		return (<label className="m-label m-lab-checkbox" >
						 				<input type="checkbox"  name="org" className={hasChecked?"has-check":""} checked={isChecked} onChange={()=>{
						 							handler(method,path);
						 				}}  />
				 		  	</label>)
 	};

 	static noCheck= ()=>"";

 	public prePath?:(number | string)[];

 	constructor(props:props){
 		super(props);

		let initSelectArr:any[] = [];
 		const treeData = this.addStaTusField(props.data,props.defaultSelArr,initSelectArr);

		this.state = {
		 		drop:false,
		 		selected:Immutable.List(initSelectArr),
		 		treeData
	 	}
	 	
	 	this.getInitPath(this.props.data,this.props.defaultSelArr![0]);
 	}

 	getInitPath(data:any[],selectedId:string){
 		if(this.props.checkbox){
 			return ;
 		}

 		if(!selectedId){
 			return ;
 		}
 		const {idField,childField} = this.props;

 		const findTreePath = function(data:any[],id:string,pathArr:(number | string)[]):boolean{

 						return data.some((val:any,index:number)=>{
 									const child = val[childField!];
 									if(child.length){
 											const parStatus = findTreePath(child,id,pathArr);
 											parStatus && pathArr.push(index ,childField!);
 											return parStatus ;
 									}else{
 											const status = val[idField!] === id ;
 											if(status){
 												pathArr.push(index ,childField!);
 											}
 											return status
 									}
 						})
 		};

 		let pathArr:(number|string)[] = [];
    findTreePath(data,selectedId,pathArr);
		 pathArr = pathArr.reverse();
 		 pathArr.shift();
 		 this.prePath = pathArr ;
 	}

 	getArrId(){

 		const idArr = this.state.selected.map(val=>val.id).toArray();
 		this.props.changeParState!("orgSel",idArr);

 	}
 	addStaTusField(data:any[],selected:props["defaultSelArr"],initSlectedArr?:any[]){


 		const {idField,childField,textFiled} = this.props ;
 		const copyData = JSON.parse(JSON.stringify(data),function(...ars){
 				const [,val] = ars;
 				if(val && (Object.prototype.toString.call(val) === "[object Object]")){
 				
 					
 					val.state = true;

 					const sub:any[] = val[childField!];
					if(sub.length===0){ //文件
						const hasIndex = selected!.includes(val[idField!]);
 						val.checkStatus = hasIndex? "checked": "uncheck";

 						initSlectedArr && hasIndex && initSlectedArr.push({id:val[idField!],text:val[textFiled!]});

						return val;
					
					}else{ //目录
						
						let hasCheckStatus = sub.some(val=>val.checkStatus===CheckStatus["hasCheck"]);
						const total  = sub.length;

						if(hasCheckStatus){
							val.checkStatus = CheckStatus["hasCheck"];
						}else{
							let hasAllCheckCount = 0;
							sub.forEach(val=> (val.checkStatus ===CheckStatus["checked"] && hasAllCheckCount++) );
							const rest = total - hasAllCheckCount ;
							if(rest == 0){
								val.checkStatus = CheckStatus["checked"];
							}else if(rest == total){
								val.checkStatus = CheckStatus["uncheck"];
							}else{
								val.checkStatus = CheckStatus["hasCheck"];
							}
						}

						return val;
					}

 				}else{
 					return val ;
 				}
 				
 		});
 		return Immutable.fromJS(copyData);
 	}

 	cascade(treeData:states["treeData"],pathArr:any[]){

 			let leg = pathArr.length -2  ;
 			pathArr.length = Math.max(leg,0);
 			const childField = this.props.childField!;
 			while(leg>0){
 				

					const par:Immutable.Map<string,any> = treeData.getIn(pathArr)  ;

					const has_check:boolean = par.get(childField).some(function(val:any){
								return val.get("checkStatus") == CheckStatus["hasCheck"];
					});

					if(has_check){
		 					treeData = treeData.updateIn(pathArr,(val:any)=>{
									return val.set("checkStatus",CheckStatus["hasCheck"])
							});
		 			}else{
		 					const sub = par.get(childField);
		 					const total = sub.size;
							const all_checked:number = sub.count(function(val:any){
			 						return val.get("checkStatus") == CheckStatus["checked"];
			 				});
					 		const rest =  total - all_checked ;

				 			treeData =  treeData.updateIn(pathArr,(val:any)=>{

				 							const status = rest === 0 ? CheckStatus["checked"] : rest === total ? CheckStatus["uncheck"] : CheckStatus["hasCheck"];
											return val.set("checkStatus",status);
							});
				 	}		

				 	 leg = pathArr.length -2  ;
 					 pathArr.length = Math.max(leg,0);

 			}
			return treeData ;

 	}

 	getPath(path:string){
 			let pathArr:any[] = [] ;
			const arr =  path.split("@");
			const leg = arr.length-1;
 			arr.forEach((val,index)=>{
			 		leg > index ? pathArr.push(+val,this.props.childField) :  pathArr.push(+val) ;
			});

			return pathArr;
 	}

 	childCheck(path:string){
		const pathArr = this.getPath(path);
		const {idField,textFiled}= this.props;

 		this.setState(preState=>{

 			
 			  let _node:any;
 				let immuTreeData = preState.treeData.updateIn(pathArr,node=>{

 					let  status = node.get("checkStatus");
						   status = status === CheckStatus["checked"] ?CheckStatus["uncheck"] : CheckStatus["checked"];
 					const newNode = 	 node.set("checkStatus",status);
 						//更新所选的
					
					const id = newNode.get(idField!);
					const text = newNode.get(textFiled!);
					_node = this.updateSelectList(preState.selected,id,text,status === CheckStatus["checked"]);

					return  newNode ;


 				})

 			return{
 					treeData:this.cascade(immuTreeData,pathArr),
 					selected:_node,
 			}

 		})

 				
	} 

	checkAllChild(sub:states["treeData"],childField:string,status:string,selected:any[]):states["treeData"]{

		

		return sub.map(val=>{
			const child = val.get(childField) as states["treeData"];
			
			const node = val.set("checkStatus",status);
			if(child.size){
				 const childArr =  this.checkAllChild(child,childField,status,selected);
				 return node.set(childField,childArr) ;
			} else{
					//更新所选的
					const {idField,textFiled}= this.props;
					const id = node.get(idField!);
					const text = node.get(textFiled!);
					selected.push({id,text});
				return node ;
			}
	
		})

	}

	parCheck(path:string){

				const {childField} = this.props;
				const pathArr = this.getPath(path);
				let is_check = false ;
 				this.setState(preState=>{
					const list:any[] = [];
					let immuTreeData = preState.treeData.updateIn(pathArr,node=>{
				
						let  status = node.get("checkStatus");
								is_check = status === CheckStatus["checked"] ;

							   status = is_check ?CheckStatus["uncheck"] : CheckStatus["checked"] ;

		 				let newNode = node.set("checkStatus",status);



		 				const sub  = this.checkAllChild(newNode.get(childField),childField!,status,list);

					return  newNode.set(childField,sub);

 					});

 					let selectList = preState.selected;

 					list.forEach(val=>{
 						const id = val.id;
 						const text = val.text;
 						selectList = this.updateSelectList(selectList,id,text,!is_check);
 					});

 					return{
 						treeData:this.cascade(immuTreeData,pathArr),
 						selected:selectList,
 					}
 				})
	} 

 	expandToggle(path:string){

 		this.setState(preState=>{
			const pathArr = this.getPath(path);
			let immuTreeData = preState.treeData.updateIn(pathArr,node=>{

							const state = node.get("state");
							return node.set("state",!state);
			});
 			return {
 				treeData:immuTreeData
 			}
 		})
 			
 	}

 	clickItem(path:string){
 			const {idField,textFiled} = this.props;
			const pathArr = this.getPath(path);
			const id = this.state.treeData.getIn(pathArr.concat(idField!));
			const has_id = this.state.selected.some(val=>val.id===id);

			if(has_id){
				return ;
			};

			this.setState(preState=>{
					
				const treeData = preState.treeData;
	 		
	 			let immuTreeData = treeData  ;
	 			let prePath = this.prePath;

				let _node:any ; 

	 			if(prePath && prePath.length){
	 					prePath = prePath.slice();
	 					let _leg = prePath.length;
			 			while(_leg > 0){

								immuTreeData = immuTreeData.updateIn(prePath,node=>{
										   	let newNode = node.set("checkStatus",CheckStatus["uncheck"]);
												return newNode;
								});
									_leg-=2;
								prePath.length = Math.max(_leg,0); 
			 			}	
	 			};

	 			let pathArr_copy = pathArr.slice();
	 			let leg = pathArr_copy.length;
				immuTreeData = immuTreeData.updateIn(pathArr_copy,node=>{
						let  status = node.get("checkStatus");
							   status = status === CheckStatus["checked"] ?CheckStatus["uncheck"] : CheckStatus["checked"] ;
				   	let newNode = node.set("checkStatus",status);
				   	const id = newNode.get(idField!);
						const text = newNode.get(textFiled!);
				 				
		 				_node = {id,text};
						return newNode;
				});
				pathArr_copy.length = leg -2 ; 
				leg-=2;
	 			while(leg > 0){

						immuTreeData = immuTreeData.updateIn(pathArr_copy,node=>{
										   let newNode = node.set("checkStatus",CheckStatus["hasCheck"]);
										return newNode;
						});
							leg-=2;
						pathArr_copy.length = Math.max(leg,0); 
					
	 			}
				
				this.prePath = pathArr ;
				
				return {
					treeData:immuTreeData,
					selected:Immutable.List([_node])
				}
		
			});
	
 	}

 	handleFn = (method:"childCheck"|"parCheck"|"expandToggle"|"clickItem",path:string)=>{

 			 this[method](path);
 	}

 	updateSelectList = (selectList:states["selected"],id:string,text:string,is_sel:boolean)=>{
 					const index = selectList.findIndex(val=>val.id===id);
 					if(is_sel){

 						if(index>-1){
 							return selectList.remove(index).push({id,text})
 						}else{
 							return selectList.push({id,text})
 						}

 					}else{
 							if(index>-1){
	 							return selectList.remove(index)
	 						}else{
	 							return selectList ;
	 						}
 					}
			 		
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
  
	searchHandle=(key:string)=>{

		const {data,textFiled,childField,idField} = this.props;
		const {selected} = this.state;

		const idArr = selected.map(val=>val.id).toArray();

		const dataCopy:any[]  =  JSON.parse(JSON.stringify(data),function(...args){
		const [,val] = args;

				if(val){
					if(Object.prototype.toString.call(val) === "[object Object]" ){
							val.checkStatus = CheckStatus["uncheck"];
 							val.state = true;	
 							const sub = val[childField!];
							if(sub.length===0){//文件
								const hasIndex = idArr.includes(val[idField!]);
		 						val.checkStatus = hasIndex? CheckStatus["checked"]: CheckStatus["uncheck"];
								return val[textFiled!].includes(key) ? val : undefined ;
							
							}else{//目录

							
								let hasCheckCount = 0;
								let hasCheckStatus = false;

								const child = sub.filter((node:any)=>{

									if(node){

										node.checkStatus === CheckStatus["checked"] && hasCheckCount++ ;
										if(!hasCheckStatus){
											hasCheckStatus = node.checkStatus === CheckStatus["hasCheck"];
										}
										return true ;

									}else{

										return false ;
									};
								});

								const total  = child.length;
								if(hasCheckStatus){
									val.checkStatus = CheckStatus["hasCheck"];
								}else{

									const rest = total - hasCheckCount ;
									if(rest == 0){
										val.checkStatus = CheckStatus["checked"];
									}else if(rest == total){
										val.checkStatus = CheckStatus["uncheck"];
									}else{
										val.checkStatus = CheckStatus["hasCheck"];
									}
							
								}
								

							
								
								val[childField!] = child;
								return total ? val : undefined ;
							
							}
					
						}else{
							return val ;
						}
				}else{

					return val ;
				}



		});

		const treeData = dataCopy.filter(node=>node);

		const selectedId  =  this.state.selected.get(0);
		this.setState({
		 		treeData:Immutable.fromJS(treeData),
	 	});
	 	if(selectedId){
	 		this.getInitPath(treeData,selectedId.id);
	 	}
		
		
		
	}

	closeHandle=()=>{
			const idArr = this.state.selected.map(val=>val.id).toArray();
			this.getInitPath(this.props.data,idArr[0]);
			this.setState({
		 			treeData:this.addStaTusField(this.props.data,idArr),
		 	});

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
															handleFn = {this.handleFn}
														 />
									</ul>	
									
								</div>
							
							</VelocityComponent>
						</div>);


	}

}

