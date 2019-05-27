import * as React from "react";
import Combobox from "@js/common/combobox/index";
import axios from "@js/common/AxiosInstance";



type ReportOrgDefineProp = {
	getMethods: ReportSpace.ReportAPI["getMethods"];
}



type ReportOrgDefineState = {
	orgDefineLevel: {
		id: string;
		text: string;
		name: string;
		timeLimit: string;
	}[];
	causeDamageDegree:ReportOrgDefineState["orgDefineLevel"]
}


export default class ReportOrgDefine extends React.PureComponent<ReportOrgDefineProp, ReportOrgDefineState> {

	state = {
		orgDefineLevel: [],
		causeDamageDegree:[]
	}


	componentDidMount() {
		//类别联动科室
		const orgDel = axios({
			url: "/event/orgDefineLevel",
		});

		const damage = axios({
			url:"/event/causeDamageDegree"
		});


		Promise.all([orgDel,damage]).then(arr=>{

			const [org,damage] =arr;

			this.setState({
				causeDamageDegree:damage.data.data,
				orgDefineLevel:org.data.data,
			});

		});


	}



	render() {

		const { orgDefineLevel ,causeDamageDegree} = this.state;
		const { getMethods } = this.props;

		const { orgRank, damageDegree } = getMethods<"getParams">("getParams")()

		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		return (

			<>

				<tr>
					<td>
						<div className="detail">
							<span>造成病人的损害程度：</span>
							<Combobox field="orgRank"  hasSlideIcon={false} data={causeDamageDegree} clickCallback={setComboboxObj} defaultVal={damageDegree} width={600}  />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<div className="detail">
							<span>科室定级：</span>
							<Combobox field="orgRank" inpShowField="name" hasSlideIcon={false} data={orgDefineLevel} clickCallback={setComboboxObj} defaultVal={orgRank} width={80} pannelWidth={380} />
						</div>
					</td>
				</tr>
				<tr>
					<td>
						<span>护理安全管理小组定级：</span>
						<span className="underline" style={{ width: "80px" }}></span>
					</td>
				</tr>


			</>


		)
	}

}


