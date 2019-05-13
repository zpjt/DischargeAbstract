import * as React from "react";
import "@css/illSearch.scss";
import {Link} from "react-router-dom";

import {connect,MapStateToProps} from "react-redux";
import {fetchPostOrgIfNeeded} from "@js/actions/index"


type orgItemObj = orgState["data"][0]

type itemProps = {
	 lev:number;
	 node:orgItemObj;
}

const IllType:React.SFC<{data:any[]}> = ({data})=>{
	data
	const  typeIllArr = [{name:"test1",id:"1"},{name:"test2",id:"2"}] ;
	return (<>

			{

				typeIllArr.map(val=>{

				//	 const path = { pathname: '/ill_type' , query:{type: val.id }};

						return <Link to={"/index/ill_type/"+val.id} key={val.id}>{val.name}</Link>

				})
			}


		</>)
}


const ChildItem:React.SFC<itemProps> = ({node,lev})=>{

	const {dim_name} = node ;

	return (
				<li className="m-li-child" >
							<div className="m-item" data-lev={lev}>
									<span className="m-item-title" >{dim_name}</span>
								
							</div>
							<div className="m-ill-type">
								<p>
									<span>{dim_name} 科室病种</span>
								</p>
								<div>
									<IllType data={[]}/>
								</div>
							</div>
					</li>
		);
}

const ParItem:React.SFC<itemProps> = ({node,lev})=>{

		const {dim_name,sub} = node ;
		const _lev = ++lev;

		return (<li className="m-child" >
							<div className="m-item" data-lev={lev}>
									<span className="m-item-title" >{dim_name}</span>
							</div>
							<ul className="m-ul-childs" data-lev={lev}>
								 {

								  sub.map(val=>{

								 				const {sub:_sub,dim_value} = val ;

								 				if(_sub.length){
								 					return <ParItem lev={_lev} node={val} key={dim_value}  />
								 				}else{
								 					return <ChildItem node={val} key={dim_value} lev={_lev+1} />
								 				}
								 	}) 
								 }
							</ul>
			</li>	);
 }

type props =  {
	dispatch:Function;
}

type state = {
	orgs:orgItemObj[];
	isFetch:boolean;
}

class IllSearch extends React.PureComponent<props & reduxProps,state>{
	

	componentDidMount(){

			this.props.dispatch(fetchPostOrgIfNeeded());

	}

	
	render(){

		const {orgs} = this.props;

		return (
					<div className="g-ill">
						
						<ul >
							{
								orgs.map((val:orgItemObj)=>{
						
										const {sub,dim_value} = val ;
						
										if(sub.length){
						
											return <ParItem lev={0} node={val} key={dim_value} />
						
										}else{
						
											return <ChildItem node={val} key={dim_value} lev={0} />
										}
						
						
						
								})
							}
						</ul>
					</div>
			)


	}

}

type reduxProps = {
		orgs:orgState["data"];
		isFetch:boolean;
}

const mapStateToProps:MapStateToProps<reduxProps,props,appStore> = (state)=>{
	
	const {orgs} = state;

	return {
		orgs:orgs.get("data"),
		isFetch:orgs.get("isFetch"),
	}
}



export default connect(mapStateToProps)(IllSearch);

      
