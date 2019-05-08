import * as React from "react" ;



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

type PageProps ={
	total:number;	
	jumpPage:(size:number)=>void;
	curPage:number;
}

type PageState = {
	
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





type TableProps ={
		data:any[];
		hasPageNums?:boolean;
		column:columnItem[],
		idField?:string;
		hasOrder?:boolean;
		checkbox?:false,
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
}


export default class Table extends React.PureComponent<TableProps,TableState>{

	state:TableState={
			perNums:20,
			tableH:"auto",
			curPage:1
	}

	static defaultProps = {
			hasPageNums:true,
			idField:"id",
			hasOrder:true,
			checkbox:false,
	}

	static CheckCom =()=>(<label className="m-label m-lab-checkbox" >
								 				<input type="checkbox"  name="org" className={hasChecked?"has-check":""} checked={isChecked} onChange={()=>{
								 							handler(method,path);
								 				}}  />
				 		  			</label>)

	TableContainer:React.RefObject<HTMLDivElement>=React.createRef();
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
	render(){

			const {data,hasPageNums,column,idField} = this.props;
			const {tableH,perNums,curPage} = this.state;
			
			const startIndex = (curPage-1)*20;
		
			const curData = hasPageNums ?  data.slice(startIndex,startIndex+20) : data;

			const has_pageNum = hasPageNums && data.length > perNums ;
			
			let tabOver = "";
			let h:any ;
			
			if(tableH !="auto"){
				
				const pageh = has_pageNum && 50 || 0 ;
				h = (+tableH - 40 - pageh );

				tabOver = curData.length * 43 > h ? "tab-over" :"";

				 h +="px";
			};

			

			

			return (	<div className="g-table" ref={this.TableContainer}>

										<div className={"m-fixTabHead "+tabOver}>
											<table >
												<thead >
														<tr>
															<th style={{width:"60px"}}>序号</th>
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

																return (
																		<tr  key={dataItem[idField!]}>
																			<td style={{width:"60px"}}>{startIndex+1+index}</td>
																			{
																				column.map((node)=>{
																						const {width,field,formatter} = node ;
																						const wObj = width ? {width:width+"px"} : {} ;
																						const text = formatter ? formatter(node): dataItem[field];
																						return <td key={field} style={wObj}>{text}</td>
																				})
																			}
																		</tr>
																	)
														})
													}
												</tbody>
											</table>
										</div>
										{has_pageNum ? <TablePage total={ data.length } jumpPage={this.jumpPage} curPage={curPage} /> : null }
								</div>)


	}



}