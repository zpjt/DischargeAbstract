import * as React from "react";
import Search from "@js/common/SearchCom";
import Calendar from "@js/common/calendar/index";
import Combobox from "@js/common/combobox/index";
import {Link} from "react-router-dom";
import Api from "@api/summary"
import {render} from "react-dom";
import AlertInfo from "@js/common/AlertInfo";

type HeadOptProp = {
	checkArr:string;
	refreshHandle():void;
	changeHandle(field:string,value:string):void;
}

type HeadOptState = {
	initPasswordModal: boolean;
	showPasswordModal: boolean;
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
		id: "0",
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
		id: "0",
		text: "所有病例"
	}
];

export default class HeadOpt extends React.PureComponent<HeadOptProp, HeadOptState>{

	state = {
	initPasswordModal: false,
	showPasswordModal: false,
	}

	optHandle=(e:React.MouseEvent<HTMLButtonElement>)=>{


		const type = e.currentTarget!.name;

		const {checkArr} = this.props;

		switch (type) {
			case "refresh":
				
				break;
			case "del":
				 Api.delSummaryCaseById(checkArr).then((res:AxiosInterfaceResponse)=>{

					console.log(res);
					const a = render(<AlertInfo tit={res.message} type="success" />,document.getElementById("s-modal")!)

					console.log(a);

					this.props.refreshHandle();


				 });
				break;
			case "check":
				break;
			case "patchDao":
				
				break;

			default:
				break;
		}
	}

	changeTime=(timeArr:string[],field:string)=>{


		const value = timeArr[0]
		this.props.changeHandle(field,value);

	}

	inputChange=(key:string,field:string)=>{

		this.props.changeHandle(field,key);
	}

	closeInput=(field:string)=>{


		this.props.changeHandle(field,"")

	}

	comboboxCallback=(slectedArr:Readonly<any[]>,field:string)=>{

		this.props.changeHandle(field,slectedArr[0].id)


	}

	

	render() {

		return (<>
			<div>

				<div style={{ display: "flex", justifyContent: "space-between" }}>

					<div className="m-filter-box">
						<Search width={160} searchHandle={this.inputChange} field="fdept" hasBtn={false} tip="科室搜索..." closeHandle={this.closeInput} />
						<Combobox data={sexArr} field="fsex"  width={100} placeholder="性别..." defaultVal="0" clickCallback={this.comboboxCallback} />
						<Search searchHandle={this.inputChange} field="fage" hasBtn={false} width={80} tip="年龄搜索..." closeHandle={this.closeInput} />
						<Calendar ableClear={true} field="lrdata" width={160} placeholder="录入时间" clickBack={this.changeTime} />
						<Combobox data={translateArr} field="status" clickCallback={this.comboboxCallback} width={120} placeholder="翻译类型" defaultVal="0" />
					</div>


					<div className="m-optBtn">

						<button className="s-btn normal-btn" name="refresh"  onClick={this.optHandle}><i className="fa fa-refresh">&nbsp;</i>刷新</button>
						<button className="s-btn normal-btn" name="check" onClick={this.optHandle}><i className="fa fa-refresh">&nbsp;</i>待审核</button>
						<button className="s-btn normal-btn" name="patchDao" onClick={this.optHandle}><i className="fa fa-refresh">&nbsp;</i>批量导出</button>
						<button className="s-btn normal-btn" ><Link to="/addCaseModal"><i className="fa fa-plus">&nbsp;</i>添加病历</Link></button>
						<button className="s-btn normal-btn" onClick={this.optHandle} name="del"><i className="fa fa-trash">&nbsp;</i>批量删除</button>
					</div>
				</div>
			</div>
			</>
		)
	}

}