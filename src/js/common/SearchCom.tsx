import * as React from "react";
import { VelocityComponent } from "velocity-react";


type props = {
	searchHandle: (keyword: string) => void;
	closeHandle?: () => void;
	tip?: string;
	width?:number;
	hasBtn:boolean;
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
		this.setState({
			searching: true,
		});

		this.props.searchHandle(keyWord);



	}

	closeSearch = () => {

		this.setState({
			searching: false,
		});
		this.inpDom.current!.value = "";

		const {closeHandle} = this.props;
		
		closeHandle && closeHandle();
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
				/>
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