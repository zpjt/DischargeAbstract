import * as React from "react";

type itemObj={
	value:string;
	tit:string;
	changeHandle?:()=>void;
}

type props = {
	changeHandle:(value:string)=>void;
	data:itemObj[];
	nameFiled:string;
}



class  Radio extends React.PureComponent<props>{

		static Item:React.SFC<itemObj & {nameFiled:string}> = ({value,tit,nameFiled})=>{

					return (<label className="m-label m-lab-radio" key={value}>
													 			 <span className="lab-tit">{tit}</span>
													 				<input type="radio"  name={nameFiled}  value={value}  />
												 		  	</label>)
		}

		render(){

			const {data,nameFiled} = this.props;
			
			return	(<span className="m-radio">

									{
											data.map(({value,tit})=>{

												return <Radio.Item  key={value} value={value} tit={tit} nameFiled={nameFiled} />

											})
									}
					 		</span>)
			}

}


type itemCheckObj={
	tit?:string;
	changeHandle:()=>void;
	checked:boolean;
	value?:string;
	hasChecked?:boolean
}


type checkProps = {
	changeHandle:()=>void;
	data:Pick<itemCheckObj,"tit" | "checked" | "value">[];
	nameFiled:string;
}

type checkState = {
	/*checked:boolean;
	hasChecked:boolean;*/
}

class  Checkbox extends React.PureComponent<checkProps,checkState>{

				

				static Item:React.SFC<itemCheckObj & {nameFiled:string}> = ({tit,nameFiled,changeHandle,checked,hasChecked})=>{

					return (<label className="m-label m-lab-checkbox" >
													 				<input type="checkbox" className={hasChecked?"has-check":""} name={nameFiled} checked={checked} onChange={changeHandle!}  />
													 				{	tit ? (<span className="lab-tit">{tit}</span>) : null }
					 		  	</label>)
				}

				render(){
							
						const {data,nameFiled,changeHandle} = this.props;
					
						return	(<span className="m-checkbox">

									{
											data.map(({value,tit,checked})=>{

												return <Checkbox.Item checked={checked} key={value} tit={tit} nameFiled={nameFiled} changeHandle={changeHandle} />

											})
									}
					 		</span>)
			}

}

type CominpProps={
	multiply:boolean;
	toggleDrop:()=>void;
	value:string;
	drop:boolean;
}

type CominpState={
	
}

class ComboInp extends React.PureComponent<CominpProps,CominpState>{


	render(){

		const {multiply,toggleDrop,value,drop} = this.props;

		return (<div className="m-combo-inp" onClick={toggleDrop}>
												{ !multiply ?	<input type="text" className="m-inp" readOnly value={value} placeholder="单选"/>: (<textarea value={value} className="m-inp" readOnly  placeholder="多选"/>)
																				}
											<span className="j-slide" >
												<i className={"fa " + (drop ? "fa-chevron-up":"fa-chevron-down")}></i>
											</span>
						</div>)


	}
}

export {
	Radio,
	Checkbox,
	ComboInp
}