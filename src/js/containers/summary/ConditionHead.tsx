import * as React from "react";
import Search from "@js/common/SearchCom";
import Calendar from "@js/common/calendar/index";
import Combobox from "@js/common/combobox/index";
import {Link} from "react-router-dom";


type HeadOptProp = {

}

type HeadOptState = {
}



const sexArr = [
	{
		id: "1",
		text: "男"
	}
	, {
		id: "2",
		text: "女"
	},
	{
		id: "3",
		text: "男、女"
	}
];
const translateArr = [
	{
		id: "1",
		text: "未翻译"
	}
	, {
		id: "2",
		text: "已翻译"
	},
	{
		id: "3",
		text: "所有病例"
	}
];

export default class HeadOpt extends React.PureComponent<HeadOptProp, HeadOptState>{

	state = {
	}

	render() {
		return (<>
			<div>

				<div style={{ display: "flex", justifyContent: "space-between" }}>

					<div className="m-filter-box">
						<Search width={160} searchHandle={(key: string) => console.log(key)} hasBtn={false} tip="科室搜索..." closeHandle={() => console.log(2)} />
						<Combobox data={sexArr} field="fsex" width={100} placeholder="性别..." defaultVal="3" />
						<Search searchHandle={(key: string) => console.log(key)} hasBtn={false} width={80} tip="年龄搜索..." closeHandle={() => console.log(2)} />
						<Calendar field="lrdata" width={160} placeholder="录入时间" />
						<Combobox data={translateArr} field="status" width={120} placeholder="翻译类型" defaultVal="3" />
					</div>


					<div className="m-optBtn">

						<button className="s-btn normal-btn" ><i className="fa fa-refresh">&nbsp;</i>刷新</button>
						<button className="s-btn normal-btn" ><i className="fa fa-refresh">&nbsp;</i>待审核</button>
						<button className="s-btn normal-btn" ><i className="fa fa-refresh">&nbsp;</i>批量导出</button>
						<button className="s-btn normal-btn" > <Link to="/addCaseModal"><i className="fa fa-plus">&nbsp;</i>添加病历</Link></button>
						<button className="s-btn normal-btn" ><i className="fa fa-trash">&nbsp;</i>批量删除</button>
					</div>
				</div>
			</div>
			</>
		)
	}

}