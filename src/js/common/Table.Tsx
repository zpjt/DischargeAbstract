import * as React from "react" ;
import {Checkbox} from "@js/common/InputBtn";
import * as Immutable from "immutable";


type TableProps ={
		data:any[];
		hasPageNums?:boolean;
		column:columnItem[],
		idField?:string;
		hasOrder?:boolean;
		checkbox?:boolean,
}

type  columnItem= {
		text:string;
		width?:number;
		field:string;
		formatter?:(node:any)=>React.ReactChild;
}

type TableState = {
		perNums:number;
		tableH:string;
		curPage:number;
		tableData:Immutable.List<Immutable.Map<string,any>>;
		pageCheckAll:boolean;
}

type PageProps ={
	total:number;	
	jumpPage:(size:number)=>void;
	curPage:number;
}

type PageState = {
	
}


type TBodyTrProps ={
		CheckBoxFn: ((order:string,checked:boolean,index:number,changeHandle:TBodyTrProps["changeHandle"])=>React.ReactChild);
		column:columnItem[];
		dataItem:Immutable.Map<string,any>;
		idField:string;
		index:number;
		startIndex:number;
		changeHandle:(index:number)=>void;
}

type TBodyTrState = {
	
}

const PageSize:React.SFC<{pageNum:number,jumpPage:PageProps["jumpPage"],curPage:number}> = ({jumpPage,pageNum,curPage})=>{


	return (<>
						{new Array(pageNum).fill("").map((val,index)=>{
							val
								return (<span className={"m-page-num "+ (index+1 == curPage ? "active" :"") }
									key={index}
									onClick={()=>{
										jumpPage(index+1);
									}}
									>{index+1}</span>)
						})}
					</>)
}


class TablePage extends React.PureComponent<PageProps,PageState>{
		state:PageState={

		}

		jumpInp:React.RefObject<HTMLInputElement> = React.createRef();

		pageTo=()=>{

			const {jumpPage,total} = this.props;
			const val = this.jumpInp.current!.value;

			if( +val < 1){

					return ;
			}

			const pageNum = Math.ceil(total / 20 );

			jumpPage(Math.min(pageNum,+val))


		}

		render(){
			const {total,jumpPage,curPage} = this.props;
			const pageNum = Math.ceil(total / 20 );
			return (
					<div className="g-pageCode">
												<div className="m-page-total">
													 <span >共 {pageNum} 页</span>

													 <span>{total}条</span>
													 <span  style={{marginLeft:"40px"}}>
													 		<span >跳转到</span>
													 		<input className="j-jump-page" type="number" min={1} ref={this.jumpInp}  onChange={this.pageTo}/>
													 </span>
												</div>
												<div className="m-code-number">
													<span className="m-page-num" 
															onClick={()=>{

																	jumpPage(Math.max(curPage -1,1));

															}}
													><i className="fa fa-chevron-left "></i></span>
													<span>
															<PageSize pageNum={pageNum} jumpPage={jumpPage} curPage={curPage}/>
													</span>
													<span className="m-page-num" 
																onClick={()=>{

																	jumpPage(Math.min(curPage + 1,pageNum));

															}}
													><i className="fa fa-chevron-right "></i></span>
												</div>

						</div>

				)
		}
}


class TBodyTr  extends React.PureComponent<TBodyTrProps,TBodyTrState>{


	render(){

			const {CheckBoxFn,column,dataItem,idField,index,startIndex,changeHandle} = this.props;
			const order = startIndex+1+index+"" ;
			const checked = dataItem.get("checkStatus");
			return (<>
								<tr  key={dataItem.get(idField)}>
									<td style={{width:"60px"}}>
									{CheckBoxFn(order,checked,index,changeHandle)}
									</td>
									{
										column.map((node)=>{
												const {width,field,formatter} = node ;
												const wObj = width ? {width:width+"px"} : {} ;
												const text = formatter ? formatter(node): dataItem.get(field);
												return <td key={field} style={wObj}>{text}</td>
										})
									}
								</tr>
							</>)
	}
}


export default class Table extends React.PureComponent<TableProps,TableState>{



	static defaultProps = {
			hasPageNums:true,
			idField:"id",
			hasOrder:true,
			checkbox:false,
	}

	static CheckBoxFn = (order:string,checked:boolean,index:number,changeHandle:(index:number)=>void)=>{

			return <Checkbox.Item 
								changeHandle={()=>{changeHandle(index)}}
								checked={checked}
								nameFiled="user"
								tit={order}
								/>
	};

	static NoCheckBoxFn = (...arg:any[])=>{
		const [order] =arg;
		return order;
};

	constructor(props:TableProps){
			super(props);
			this.state={
					perNums:20,
					tableH:"auto",
					curPage:1,
					tableData:this.addStaTusField(props.data),
					pageCheckAll:false,
			}

	}
	addStaTusField(data:TableProps["data"]){
			const dataCopy = JSON.parse(JSON.stringify(data)).map((val:any)=>{
					val.checkStatus = false;
					return val;
			});
			return Immutable.fromJS(dataCopy);
	}
	TableContainer:React.RefObject<HTMLDivElement>=React.createRef();
	componentWillReceiveProps(nextProps:TableProps){

		if(nextProps.data !== this.props.data){
				this.setState({
					tableData:this.addStaTusField(nextProps.data),
				})
		}

	}
	componentDidMount(){

		  const tableH = this.TableContainer.current!.clientHeight+"";
		  this.setState({
		  	tableH,
		  });

	}
	jumpPage=(size:number)=>{

			this.setState({
				curPage:size
			})

	}
	checkAll=(status:boolean)=>{

			const {perNums,tableData,curPage} = this.state;
			const rest = curPage*perNums - tableData.size
			const num =  rest > 0 ? perNums - rest :20 ;
			let newData = tableData;
			Array.from({length:num}).forEach((...args)=>{
						const [,index] = args;
						newData = newData.updateIn([index+(curPage-1)*20],val=>{
							return val.set("checkStatus",!status)
						})

			})

			this.setState({
				tableData:newData
			})
	}

	countTotalStatus(total:number,curData:TableState["tableData"]){

			const checkedNum = curData.count(val=>{
															return val!.get("checkStatus")
													});
			const rest = total - checkedNum;

			const hasChecked = rest > 0 && rest < curData.size;
			
			const isAllChecked = !hasChecked && total!==0 && rest===0 ;

			return {hasChecked,isAllChecked}

	}
	checkItem = (index:number) =>{
			const {curPage} = this.state;
			this.setState(preState=>{


				return {
					tableData:preState.tableData.updateIn([index+(curPage-1)*20],(val:Immutable.Map<string,any>)=>{
							const status = !val.get("checkStatus");
							return  val.set("checkStatus",status);
					})
				}
			})
	}


	render(){

			const {data,hasPageNums,column,idField,checkbox} = this.props;
			const {tableH,perNums,curPage,tableData} = this.state;
			const startIndex = (curPage-1)*20;
			const curData = (hasPageNums ?  tableData.slice(startIndex,startIndex+20) : tableData) as TableState["tableData"];
			const has_pageNum = hasPageNums && tableData.size > perNums ;
			
			let tabOver = "";
			let h:any ;

			const total = curData.size;
			
			if(tableH !="auto"){
				
				const pageh = has_pageNum && 50 || 0 ;
				h = (+tableH - 40  - pageh );// 表头 高40 ，离底部还要有距离

				tabOver =  total* 43 > h ? "tab-over" :"";

				 h +="px";
			};
			
			const CheckBoxFn =  checkbox ? Table.CheckBoxFn : Table.NoCheckBoxFn;
			const checkAllStataus = this.countTotalStatus(total,curData)



			return (	<div className="g-table" ref={this.TableContainer}>

										<div className={"m-fixTabHead "+tabOver}>
											<table >
												<thead >
														<tr>
															<th style={{width:"60px"}}>

																{checkbox ? <Checkbox.Item 
																								changeHandle={()=>this.checkAll(checkAllStataus.isAllChecked)}
																								checked={checkAllStataus.isAllChecked}
																								nameFiled="user"
																								tit="序号"
																								hasChecked={checkAllStataus.hasChecked}

																								/> : "序号"}
															</th>
														{
															column.map(({width,text,field})=>{
																	const wObj = width ? {width:width+"px"} : {} ;
																	return <th key={field} style={wObj}>{text}</th>
															})
														}
														</tr>
												</thead>
											</table>
										</div>

										<div className="m-fixTabBody" style={{"height":h}}>
											<table >
												<tbody>
													{
														curData.map((dataItem,index)=>{
																return <TBodyTr 
																					CheckBoxFn={CheckBoxFn}
																					column={column}
																					idField={idField!}
																					dataItem={dataItem!}
																					index={index!}
																					startIndex={startIndex}	
																					changeHandle={this.checkItem}
																					key={dataItem!.get(idField!)}
																				/>
														})
													}
												</tbody>
											</table>
										</div>
										{has_pageNum ? <TablePage total={ data.length } jumpPage={this.jumpPage} curPage={curPage} /> : null }
								</div>)


	}



}