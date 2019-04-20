import * as React from "react";
import {VelocityComponent} from "velocity-react";


type props={
	searchHandle:(keyword:string)=>void;
	closeHandle:()=>void;
	tip?:string;
}

type state={
	searching:boolean;
}

export default class SearchCom extends React.PureComponent<props,state>{

	static defaultProps={
		tip:"查询搜索结果...",
	}
	state:state={
		searching:false,
	}

	inpDom:React.RefObject<HTMLInputElement>=React.createRef();

	toggleSearch=()=>{


	  const keyWord = this.inpDom.current!.value.trim();
	  if(!keyWord){
	  	return ;
	  }
		this.setState({
				searching:true,
		});

		this.props.searchHandle(keyWord);



	}

	closeSearch=()=>{

		this.setState({
				searching:false,
		});
		this.inpDom.current!.value="";
		this.props.closeHandle();
	}


	render(){

		const {searching} = this.state;
		const {tip} = this.props;

		return (<div className="m-search">
							<span className="m-inp-val">
								<input type="text" ref={this.inpDom} className="s-inp" placeholder={tip} />
								<VelocityComponent animation={searching?"fadeIn":"fadeOut"}>
								<span className="m-search-close" onClick={this.closeSearch}><i className="fa fa-times fa-lg"></i></span>
								</VelocityComponent>
							</span>
							<button className="s-btn normal-btn" onClick={this.toggleSearch}>
								<span className="fa fa-search"></span>
							</button>
					</div>) 
	}


}