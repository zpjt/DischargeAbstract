import * as React from "react";

import Combobox from "@js/common/Combobox";



type HeadProp = {

}

type HeadState = {

}


class HeadInp extends React.PureComponent<HeadProp,HeadState>{




	render(){

		const data= [{id:"1",text:"方法1"},{id:"2",text:"方法2"},{id:"3",text:"方法3"}]

		return (<>
							<p>病种查询</p>
							<div>
								 <span className="item-inp">
								 		<span>科室名称</span>
								 		<Combobox data={data}/>
								 </span>

							</div>
						</>)
	}

}

type itemObj = {

}


type ResultProp ={
		data:itemObj[];
}
const ResultSearch:React.SFC<ResultProp>=({data})=>{

data

	return <div>11</div>
}



type props={
	location:{
		query:{
			type:string;
		}
	}
};
type state={

	data:itemObj;

}
export default class IllType extends React.Component<props,state>{
	

	state={
			data:[]
	}
	componentDidMount(){

	}

	render(){

		//const type = this.props.match.query.type;
		const {data} = this.state;

		//console.log(type)

		return (
				<div>
						<HeadInp />
						<ResultSearch data={data} />
				</div>
			
			)

	}
}

