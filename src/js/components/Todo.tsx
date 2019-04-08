
import  * as  React from "react";

type props = {
		text:string;
}

const Todo = ({text}:props)=>(


		<li
		  className="todo"
			style={{color: 'red'}}
		>{text}</li>

	);

export default Todo;
