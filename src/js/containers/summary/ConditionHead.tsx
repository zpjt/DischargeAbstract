import * as React from "react";
import Search from "@js/common/SearchCom";
import Calendar from "@js/common/calendar/index";
import Combobox from "@js/common/combobox/index";
import {Link} from "react-router-dom";

type HeadOptProp = {
	delItem():void;
	changeHandle(field:string,value:string):void;
	type:string;
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
		id: "0",
		text: "男、女"
	}
];
const translateArr = [
	{
		id: "1",
		text: "未翻译",
		text2:""
	}
	, {
		id: "2",
		text: "已翻译"
	},
	{
		id: "0",
		text: "所有"
	}
];
const checkArr = [
	{
		id: "3",
		text: "未审核",
		text2:""
	}
	, {
		id: "5",
		text: "已审核"
	},
	{
		id: "0",
		text: "所有"
	}
];

export default class HeadOpt extends React.PureComponent<HeadOptProp, HeadOptState>{

	state = {
	}

	optHandle=(e:React.MouseEvent<HTMLButtonElement>)=>{


		const type = e.currentTarget!.name;

		const {delItem} = this.props;

		switch (type) {
			case "refresh":
				
				break;
			case "del":
				delItem();
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

		const {type} = this.props;
		return (<>
			<div>

				<div style={{ display: "flex", justifyContent: "space-between" }}>

					<div className="m-filter-box">
						<Search width={140} searchHandle={this.inputChange} field="fdept" hasBtn={false} tip="科室搜索..." closeHandle={this.closeInput} />
						<Combobox data={sexArr} field="fsex"  width={100} placeholder="性别..." defaultVal="0" clickCallback={this.comboboxCallback} />
						<Search searchHandle={this.inputChange} field="fage" hasBtn={false} width={80} tip="年龄搜索..." closeHandle={this.closeInput} />
						<Calendar ableClear={true} field="lrdata" width={140} placeholder="录入时间" clickBack={this.changeTime} />
						{ type == "/gdsummary"? <Calendar ableClear={true} field="gddata" width={140} placeholder="归档时间" clickBack={this.changeTime} /> :null }
						<Combobox data={type !== "/gdsummary" ? translateArr : checkArr} field="status" clickCallback={this.comboboxCallback} width={100}  defaultVal="0" />
					</div>


					<div className="m-optBtn">

						{ type ==="/gdsummary" ?( <>
						
						<button className="s-btn normal-btn" name="patchDao" onClick={this.optHandle}><i className="fa fa-refresh">&nbsp;</i>批量导出</button>
						
						</>):<button className="s-btn normal-btn" ><Link to="/addCaseModal"><i className="fa fa-plus">&nbsp;</i>添加病历</Link></button> }

						<button className="s-btn normal-btn" name="refresh"  onClick={this.optHandle}><i className="fa fa-refresh">&nbsp;</i>刷新</button>
					
					
						<button className="s-btn normal-btn" onClick={this.optHandle} name="del"><i className="fa fa-trash">&nbsp;</i>批量删除</button>
					</div>
				</div>
			</div>
			</>
		)
	}

}