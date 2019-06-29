import * as React from "react";
import { VelocityComponent } from "velocity-react";


type props = {
	searchHandle: (keyword: string,field?:string) => void;
	closeHandle?: (field?:string) => void;
	tip?: string;
	width?:number;
	hasBtn:boolean;
	field?:string;
}

type state = {
	searching: boolean;
}

export default class SearchCom extends React.PureComponent<props, state>{

	static defaultProps = {
		tip: "查询搜索结果...",
		width:200,
		hasBtn:true,
	}
	state: state = {
		searching: false,
	}

	inpDom: React.RefObject<HTMLInputElement> = React.createRef();

	toggleSearch = () => {


		const keyWord = this.inpDom.current!.value.trim();
		if (!keyWord) {
			return;
		}
		const {field} = this.props;
		this.setState({
			searching: true,
		});

		this.props.searchHandle(keyWord,field);



	}

	closeSearch = () => {

		this.setState({
			searching: false,
		});
		this.inpDom.current!.value = "";

		const {closeHandle,field} = this.props;
		
		closeHandle && closeHandle(field);
	}

	keyPress=(e:React.KeyboardEvent)=>{

		if(e.key==="Enter"){

			this.toggleSearch();

		}
	}


	render() {

		const { searching } = this.state;
		const { tip ,width,hasBtn} = this.props;

		return (<div className="m-search">
			<span className="m-inp-val" style={{width}}>
				<input 
					type="text" 
					ref={this.inpDom} 
					className="s-inp" 
					placeholder={tip}
					onKeyDown={this.keyPress}
					style={!hasBtn?{paddingRight:26}:undefined}
				/>
			{!hasBtn && !searching ?	<span className="search-icon" onClick={this.toggleSearch}><i className="fa fa-search fa-lg"></i></span> :null}
				<VelocityComponent animation={searching ? "fadeIn" : "fadeOut"}>
					<span className="m-search-close" onClick={this.closeSearch}><i className="fa fa-times fa-lg"></i></span>
			</VelocityComponent>
			</span>
			{hasBtn ? (<button className="s-btn normal-btn" onClick={this.toggleSearch}>
				<span className="fa fa-search"></span>
			</button>):null}
		</div>)
	}


}