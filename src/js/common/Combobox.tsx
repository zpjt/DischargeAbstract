
import * as React from "react";
import * as Immutable from "immutable" ;
import "@css/combobox.scss";
import {VelocityComponent} from "velocity-react";

type itemObj = {
	[key:string]:any;
}


type ItemComboProp = {
		id:string;
		text:string;
		icon:string;
		active:boolean;
		clickFn:(id:string)=>void;
}
const ItemCombo:React.SFC<ItemComboProp> = ({id,text,clickFn,active})=>{


	return (<li onClick={()=>clickFn(id)} className={"m-combo-item " + (active ? "active" : "")}>
					 <span ></span>
					 <span></span>
					 <span>{text}</span>
				 </li>)
}

type props = {
		config?:{
			idField:string;
			textField:string;
			icon:string;
			clickCallback:(node:itemObj)=>itemObj;
			multiply:boolean;
			defaultVal:string[];
			width:number;
			maxHeight:number;
		}
		data:itemObj[];
}

type state = {
	drop:boolean;
	slected:Immutable.List<string>;

}

export default class Combobox  extends React.PureComponent<props,state>{

	 static defaultProps = {
	 		config:{
	 				idField:"id",
					textField:"text",
					icon:"fa fa-circle",
					clickCallback:function(node:itemObj){
							return node ;
					},
					multiply:false,
					defaultVal:[],
					width:240,
					maxHeight:300,
	 		}
	 	
	 }

	  state:state = {
	  	drop:false,
	  	slected: Immutable.fromJS([]),
	  }

	  toggleDrop = ()=>{

	  	this.setState(preState=>{

	  		return {
	  			drop:!preState.drop
	  		}
	  	})

	  }

	  getValue(idField:string,textField:string,data:props["data"],slected:state["slected"]){

	  	 const arr = slected.map(id=>{

	  	 			const node = data.find(val=>val[idField]===id)!;

	  	 			return node[textField]

	  	 });


	  	 return arr.join(",");

	  }

	  singleClickItem=(id:string):void=>{

	  	  const {slected} = this.state;

	  	  !slected.includes(id) ? this.setState({
	  			slected:slected.clear().push(id),
	  		}):null;

	  }

	  multiplyClickItem=(id:string):void=>{

	  		const {slected} = this.state;
	  		const index = slected.indexOf(id);

	  		index >-1 ? this.setState({
	  			slected:slected.remove(index),
	  		}) : this.setState({
	  				slected:slected.push(id),
	  		});

	  }

		render(){

				const {drop,slected} = this.state;
				const {data,config} = this.props;



				const {idField,textField,icon,multiply,width,maxHeight} = config! ;

				const clickFn = multiply ? this.multiplyClickItem : this.singleClickItem;

				const value = this.getValue(idField,textField,data,slected);

				return (<div className={"combobox "+(drop ? "active":"") } style={{width}}>
									
									
									<div className="m-combo-inp">
											<input type="text" className="m-inp" readOnly value={value} />
											<span className="j-slide" onClick={this.toggleDrop}>
												<i className={"fa " + (drop ? "fa-chevron-up":"fa-chevron-down")}></i>
											</span>
									</div>
									<VelocityComponent duration={300} animation={drop?"slideDown":"slideUp"}>
											<ul style={{maxHeight}} className="m-drop">
													{
														data.map(val=>{
																	const id = val[idField];
																	const text = val[textField];
																	const active = slected.includes(id);
																	return <ItemCombo active={active} id={id} icon={icon} text={text} clickFn={clickFn} key={id}/>
														})
													}
											</ul>
									</VelocityComponent >
									

								</div>);

		}




}