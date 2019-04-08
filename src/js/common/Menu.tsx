import * as React from "react";
import {Link} from "react-router-dom" ;

interface MenuItem extends React.Props<{}> {
	path:string;
	text:string;
	id:string;
	indentNum:number;
	is_par:boolean;
}


type MenuConfig = {
  	 data:any[];
  	 config:{
  	  	childField?:string;
  	    idField?:string;
  	    textField?:string;
  	 };
}
const SlideIcon = ()=>(

		<span>
			<i className="fa fa-arrorw"></i>
		</span>
	);

const MenuItem = (props:MenuItem)=>{

	const {path,text,indentNum,is_par,id} = props;
	return (
		<li>
			<div style={{paddingLeft:indentNum*16+"px"}} className={is_par?"menu-par":"menu-child"} data-id={id}>
					<i className="fa fa-circle"></i>
					<Link to={path}>{text}</Link>
					{is_par ? <SlideIcon/> : ""}
			</div>	
			{props.children}
		</li>
	);
}

const MapMenuItem = ({data,config}:MenuConfig,lev:number):React.ReactNodeArray=>{
						
						let _lev = ++lev;
					
						return (

								
							 data.map(val=>{

							 		const {textField="text",idField="id",childField="children"} = config ;
							 		const text = val[textField] as string;
							 		const id = val[idField] as string;
							 		const child = val[childField] as any[];

							 		const obj:MenuItem = {
							 				path:val.url,
							 				text,
							 				id,
							 				indentNum:_lev,
							 				is_par:!!child.length
							 		};

							 		if(child.length){

							 			 const ChildComponent = MapMenuItem({data:child,config},_lev);
							 			
							 			 return <MenuItem key={id} {...obj}><ul> {ChildComponent} </ul></MenuItem>
							 	
							 		}else{

							 			 return <MenuItem key={id} {...obj}/>
							 		}



							 })

						);
}



const Menu  = (props:MenuConfig)=>{

	const {data,config}= props;

	return (
			<ul>
				{MapMenuItem({data,config},0)}
			</ul>
	);
}


export default Menu ;