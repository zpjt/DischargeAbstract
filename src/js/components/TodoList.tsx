
import  Todo from "./Todo";
import * as React from "react" ;

type props = {
	todos:Todo[];
	isFectching:boolean,
}

const TodoList = (props:props)=>{
	return (
		
		<React.Fragment>
		<p>状态：{props.isFectching ? "loading" : "finished"}</p>
		<ul>
				{
					props.todos.map((todo:any)=>{

							const {title,id} = todo.toObject();

						return (

							<Todo  text={title} key={id} />

						)
					})
				}

		</ul>
		</React.Fragment>
	)};

export default TodoList;