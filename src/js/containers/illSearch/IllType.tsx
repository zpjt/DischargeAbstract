import * as React from "react";


type props={
	location:{
		query:{
			type:string;
		}
	}
}

export default class IllType extends React.Component<props>{










	render(){

		const type = this.props.location.query.type;

		return (
				<div>
				illType	
				<div>{type}</div>
				</div>
			
			)

	}
}

