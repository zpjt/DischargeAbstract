import * as React from "react";
import * as ReactDom from "react-dom";






export default (props:React.Props<null> & {handle:Function})=>{
	return (
			<div>
					{ReactDom.createPortal(props.children,document.getElementById("modal")!)}
					<button onClick={()=>{props.handle()}}>hide</button>
			</div>
		)
}