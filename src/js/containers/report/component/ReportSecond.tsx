import * as React from "react";
import Combobox from "@js/common/combobox/index";
import axios from "@js/common/AxiosInstance";

type ReportSecondProp={
		formType:string;
		getMethods:ReportSpace.ReportAPI["getMethods"];
}

type node ={
		id:string;
		text:string;
}

type ReportSecondState={
	categoryLinkOrg:{
						id:string;
						text:string;
						orgId:string;
						orgName:string;
						children:any[]
				}[];
	categoryLinkOrgLev2:ReportSecondState["categoryLinkOrg"];
	org:string;

}


class ReportSecond extends React.PureComponent<ReportSecondProp,ReportSecondState> {

	state={
		categoryLinkOrg:[],
		categoryLinkOrgLev2:[],
		org:"",
	}


	componentDidMount(){
		//类别联动科室
		const {formType} = this.props;
		 axios({
							url:"/event/categoryLinkOrg",
							params:{formType}
			}).then(res=>{

					this.setState({
						categoryLinkOrg:res.data.data,
					});
			});


	}

	setCategoryLinkOrgLev2=(selectArr:Readonly<node[]> ,field:string ,node:Readonly<any> )=>{

		const {getMethods} = this.props;

		if(field === "categoryId"){
				this.setState({
					categoryLinkOrgLev2:node.children,
				});
		}else{
				this.setState({
					org:node.orgName
				});
		}

		getMethods<"setComboboxObj">("setComboboxObj")(selectArr,field);

	}
	
	render(){

		const {categoryLinkOrg,categoryLinkOrgLev2,org} = this.state;

			return(

					<div className="item">
										
								 <span className="detail">
								 		<span className="require">类别：</span>
								 			<Combobox data={categoryLinkOrg}  width={140} field="categoryId" hasSlideIcon={false} clickCallback={this.setCategoryLinkOrgLev2} />
								 			&nbsp;&nbsp;
								 			<Combobox data={categoryLinkOrgLev2}  width={240} hasSlideIcon={false} field="dadCategoryId" clickCallback={this.setCategoryLinkOrgLev2} />
								 </span>
								 <span className="detail">
								 			<span className="require">分配科室：</span><span className="underline" style={{width:"180px" }} >{org}</span>
								 </span>
							
						</div>


				)
		}

}


export default ReportSecond