import * as React from "react";

type itemObj={
	value:string;
	tit?:string;
}

type props = {
	changeHandle:(value:string)=>void;
	data:itemObj[];
	nameFiled:string;
}

class  Radio extends React.PureComponent<props>{

		static Item:React.SFC<itemObj & {nameFiled:string}> = ({value,tit,nameFiled})=>{

					return (<label className="m-label m-lab-radio" key={value}>
													 			{	tit ? (<span className="lab-tit">{tit}</span>) : null }
													 				<input type="radio"  name={nameFiled}  value={value}  />
												 		  	</label>)
		}

		render(){

			const {data,nameFiled} = this.props;
						
			return	(<span className="m-radio">

									{
											data.map(({value,tit})=>{

												return <Radio.Item  value={value} tit={tit} nameFiled={nameFiled} />

											})
									}
					 		</span>)
			}

}



class  Checkbox extends React.PureComponent<props>{

				static Item:React.SFC<itemObj & {nameFiled:string}> = ({value,tit,nameFiled})=>{

					return (<label className="m-label m-lab-checkbox" key={value}>
													 			{	tit ? (<span className="lab-tit">{tit}</span>) : null }
													 				<input type="checkbox"  name={nameFiled}  value={value}  />
												 		  	</label>)
				}

				render(){
							
						const {data,nameFiled} = this.props;
					
						return	(<span className="m-checkbox">

									{
											data.map(({value,tit})=>{

												return <Checkbox.Item value={value} tit={tit} nameFiled={nameFiled}/>

											})
									}
					 		</span>)
			}

}



export {
	Radio,
	Checkbox,
}