import * as React from "react";
import Combobox from "@js/common/combobox/index";
import ComTreebox from "@js/common/comtreeBox/index";
import axios from "@js/common/AxiosInstance";
import Calendar from "@js/common/calendar/index";


type ReportHeadProp = {
	formType: string;// 上报事件的id
	getMethods: ReportSpace.ReportAPI["getMethods"];
	upOrgName: string;
	hospitalName: ReportSpace.hospitalName;

}

type ReportHeadState = {
	profession: {//职称
		id: string;
		text: string;
	}[];
	happenScene: {//事发场所
		id: string;
		text: string;
		parId: string;
		children: ReportHeadState["happenScene"];
	}[];
	topClass: { //层级
		id: string;
		text: string;
	}[];
	medicalTypeArr: any[]; //医疗类型
	dataTypeArr: any[];//日期类型
	anonymity: boolean;
	orgArr: {
		id: string;
		name: string;
	}[],
	happenSceneSon: ReportHeadState["happenScene"],
	reportDateType: string;
}


interface ReportImplement {

	getAllFormData: (formType: string) => void; // 获取上报表单的数据;

}



class ReportHead extends React.PureComponent<ReportHeadProp, ReportHeadState> implements ReportImplement {

	state: ReportHeadState = {
		profession: [],
		happenScene: [],
		topClass: [],
		medicalTypeArr: [],
		dataTypeArr: [],
		anonymity: false,
		orgArr: [],
		happenSceneSon: [],
		reportDateType: "",

	}



	getAllFormData(formType: string) {

		//事发场景职称层级
		const getSceneCareerClass = axios({
			url: "/event/sceneCareerClass",
			params: { formType }
		});
		//日期类型事发时段医疗类别
		const getMedicalIncidentDate = axios({
			url: "/event/medicalIncidentDate",
		});

		//科室
		const listOrgTree = axios({
			url: "/event/listOrgTree",
		});

		Promise.all([getSceneCareerClass, getMedicalIncidentDate, listOrgTree]).then(arr => {

			const { profession, happenScene, topClass } = arr[0].data;
			const [medicalTypeArr, , dataType] = arr[1].data.data;
			const orgArr = arr[2].data.data;

			const {getMethods} = this.props;
			const parmas = getMethods<"getParams">("getParams")();
			
			let timeStr = parmas.reportTime.split(" ")[0];
			

	

			const daystring = this.changeDateType(timeStr);

			this.setState({
				profession,
				happenScene,
				topClass,
				medicalTypeArr: medicalTypeArr.children,
				dataTypeArr: dataType.children,
				orgArr,
				reportDateType:daystring
			});

			const node = dataType.children.find((val:any) => val.text == daystring);

			parmas.dateType = node.id;


			




		}).catch(error => {
			console.log(error);
			alert("获取表单数据出错");
		});
	}

	componentDidMount() {

		const { formType } = this.props;
		this.getAllFormData(formType);

	}
	changeAnonymity = () => {


		this.setState(pre => ({
			anonymity: !pre.anonymity
		}))
	}

	changeHappenceSon = (slecteArr: Readonly<any[]>, filed: string, node: any) => {


		this.setState({
			happenSceneSon: node.children,
		})
		this.props.getMethods<"setComboboxObj">("setComboboxObj")(slecteArr, filed);


	}

	changeDateType(timeStr: string) {


		const arr = [{ "51": "五一" }, { "101": "国庆" }, { "11": "元旦" }];
		const data = new Date(timeStr.split(" ")[0]);
		const _data = data.getMonth() + 1 + "" + data.getDate() as "51";
		const node = arr.find(val => Object.keys(val)[0] == _data);


		if (node) {
			return node[_data]!;
		} else {
			const day = data.getDay();
			return day == 0 ? "周日" : day == 6 ? "周六" : "工作日"
		}




	}

	changeReportDayType = (selTimeArr: Readonly<any[]>, field: string) => {



		this.props.getMethods<"setCalendarObj">("setCalendarObj")(selTimeArr, field);

		const { dataTypeArr } = this.state;

		if(!dataTypeArr.length){

			return ;

		}


		const dayString = this.changeDateType(selTimeArr[0].split(" ")[0]);
		this.setState({
			reportDateType: dayString
		});


		const node = dataTypeArr.find(val => val.text == dayString!)
		this.props.getMethods<"getParams">("getParams")().dateType = node.id







	}
	render() {



		const { profession, topClass, happenScene, medicalTypeArr, anonymity, orgArr, happenSceneSon, reportDateType } = this.state;
		const { getMethods, upOrgName, hospitalName } = this.props;

		const inputChange = getMethods<"inputChange">("inputChange");
		const setCalendarObj = getMethods<"setCalendarObj">("setCalendarObj");
		const setComboboxObj = getMethods<"setComboboxObj">("setComboboxObj");

		const parmas = getMethods<"getParams">("getParams")();







		const { bedNumber, patientName, age, admissionTime, medicalRecordNumber,
			primaryDiagnosis, medicalType, rsaFall, rsaPressureSore, rsaCareAbility,
			rsaNonPlanned, rsaOther, currentPeople, cpProfession, cpTopClass, dProfession, discoverer, dTopClass,
			reporter, rProfession, rTopClass, dadIncidentSceneId, reporterNumber, incidentSceneId, happenTime, discoveryTime, reportTime, patientOrgId, admissionNumber, similarIncidentOne, similarIncidentTwo
		} = parmas;






		return (<>
			<div className="item-tr">
				<span className="detail">
					<label className="require">患者姓名：<input type="text" required name="patientName" defaultValue={patientName} className={!!patientName ? "inp" : "inp no-fill"} style={{ width: "80px" }} onChange={inputChange} /></label>
				</span>
				<span className="detail">
					<span>性别：</span>
					<select className="select" defaultValue={"1"} name="sex" onChange={inputChange} >
						<option value="1" >男</option>
						<option value="2">女</option>
					</select>
				</span>
				<span className="detail">
					<label className="require">年龄：<input type="text" name="age" onChange={inputChange} required defaultValue={age} className={!!age ? "inp" : "inp no-fill"} style={{ width: "60px" }} /></label>
				</span>
				<span className="detail">
					<span>入院时间：</span>
					<Calendar width={100} clickBack={setCalendarObj} field="admissionTime" selTimeValArr={admissionTime} />
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >住院号：<input type="text" name="admissionNumber" defaultValue={admissionNumber} onChange={inputChange} className="inp" style={{ width: "120px" }} /></label>
				</span>
				<span className="detail">
					<label >床号：<input type="text" defaultValue={bedNumber} name="bedNumber" className="inp" style={{ width: "80px" }} onChange={inputChange} /> </label>
				</span>
				<span className="detail">
					<span className="require">患者所在科室：</span>
					<ComTreebox data={orgArr} textFiled="name" defaultSel={patientOrgId + ""} filed="patientOrgId" hasSlideIcon={false} width={130} pannelWidth={300} />
				</span>

				<span className="detail">
					<label >病历号：<input type="text" name="medicalRecordNumber" defaultValue={medicalRecordNumber} onChange={inputChange} className="inp" style={{ width: "120px" }} /></label>
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label >主要诊断：<input type="text" name="primaryDiagnosis" defaultValue={primaryDiagnosis} onChange={inputChange} className="inp" style={{ width: "450px" }} /></label>
				</span>
			</div>
			<div className="item-tr">

				<span className="detail">
					<span className="require">医疗类型：</span>
					<Combobox data={medicalTypeArr} defaultVal={medicalType} width={120} hasSlideIcon={false} field="medicalType" clickCallback={setComboboxObj} />
				</span>

				<span className="detail">
					<span className="require">日期类型：</span>
					<span className="underline" style={{ width: "90px" }}>{reportDateType}</span>
				</span>
			</div>

			{hospitalName !== "中医院" ? (<div className="item-tr">

				<span className="detail">
					<span>相关风险评估：</span>
					<label >跌倒：<input type="text" name="rsaFall" defaultValue={rsaFall} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >压疮：<input type="text" name="rsaPressureSore" defaultValue={rsaPressureSore} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >自理能力：<input type="text" name="rsaCareAbility" defaultValue={rsaCareAbility} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>
				</span>
				<span className="detail">
					<label >非计划性拔管：<input type="text" name="rsaNonPlanned" defaultValue={rsaNonPlanned} onChange={inputChange} className="inp" style={{ width: "30px" }} /></label>

				</span>
				<span className="detail">
					<label >其他：<input type="text" name="rsaOther" defaultValue={rsaOther} onChange={inputChange} className="inp" style={{ width: "175px" }} /></label>

				</span>
			</div>) : null}


			<div className="item-tr">
				<span className="detail">
					<label className="require">当事人：<input type="text" required name="currentPeople" defaultValue={currentPeople} onChange={inputChange} className={currentPeople ? "inp" : "inp no-fill"} style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span className="require">职称：</span>

					<Combobox data={profession} width={120} hasSlideIcon={false} defaultVal={cpProfession} clickCallback={setComboboxObj} field="cpProfession" />
				</span>
				<span className="detail">
					<span className="require">层级：</span>
					<Combobox data={topClass} width={80} hasSlideIcon={false} defaultVal={cpTopClass} clickCallback={setComboboxObj} field="cpTopClass" />
				</span>
				<span className="detail">
					<span className="require">发生时间：</span><Calendar time={true} width={200} field="happenTime" selTimeValArr={happenTime} clickBack={setCalendarObj} />
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<label className="require">发现人：<input type="text" required name="discoverer" onChange={inputChange} defaultValue={discoverer} className={discoverer ? "inp" : "inp no-fill"} style={{ width: "80px" }} /></label>
				</span>
				<span className="detail">
					<span className="require">职称：</span>
					<Combobox data={profession} clickCallback={setComboboxObj} defaultVal={dProfession} field="dProfession" width={120} hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span className="require" >层级：</span>
					<Combobox data={topClass} clickCallback={setComboboxObj} defaultVal={dTopClass} field="dTopClass" width={80} hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span className="require">发现时间：</span><Calendar field="discoveryTime" clickBack={setCalendarObj} selTimeValArr={discoveryTime} time={true} width={200} />
				</span>

			</div>


			<div className="item-tr">
				<span className="detail">
					<label className="m-label m-lab-checkbox" style={{ display: "inline" }}><input type="checkbox" checked={anonymity} name="anonymity" style={{ verticalAlign: -2 }} onChange={this.changeAnonymity} /><span >匿名</span></label>

				</span>

				<span className="detail">
					<label className="require">报告人：</label>
					{anonymity ? (<span className="underline" style={{ width: "80px" }}>匿名</span>) : <input type="text" required name="reporter" onChange={inputChange} defaultValue={reporter} className={reporter ? "inp" : "inp no-fill"} style={{ width: "80px" }} />}

				</span>
				<span className="detail">
					<span className="require">职称：</span>
					<Combobox data={profession} width={120} clickCallback={setComboboxObj} defaultVal={rProfession} field="rProfession" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span className="require">层级：</span>
					<Combobox data={topClass} width={80} clickCallback={setComboboxObj} defaultVal={rTopClass} field="rTopClass" hasSlideIcon={false} />
				</span>
				<span className="detail">
					<span className="require">报告时间：</span><Calendar field="reportTime" clickBack={this.changeReportDayType} selTimeValArr={reportTime} time={true} width={150} />
				</span>

			</div>
			<div className="item-tr">
				{!anonymity ? (<span className="detail">
					<label className="require">手机号：</label><input type="text" required name="reporterNumber" defaultValue={reporterNumber} onChange={inputChange} className="inp" style={{ width: "100px" }} />
				</span>) : null}
				<span className="detail">
					<span className="require">事发场所：</span>
					<Combobox data={happenScene} width={140} hasSlideIcon={false} defaultVal={incidentSceneId} clickCallback={this.changeHappenceSon} field="incidentSceneId" />
					&nbsp;&nbsp;
					<Combobox data={happenSceneSon} width={300} hasSlideIcon={false} defaultVal={dadIncidentSceneId} clickCallback={setComboboxObj} field="dadIncidentSceneId" />

				</span>
				<span className="detail">
					<label className="require">上报科室：<span className="underline" style={{ width: "80px" }}>{upOrgName}</span></label>
				</span>
			</div>
			<div className="item-tr">
				<span className="detail">
					<span className="require">科室发生过类似的事件：近2年共计&nbsp;&nbsp;<input type="text" name="dadIncidentSceneId" defaultValue={similarIncidentOne} onChange={inputChange} className={dadIncidentSceneId ? "inp" : "inp no-fill"} style={{ width: 30 }} />次，本年度共计&nbsp;&nbsp;<input type="text" name="dadIncidentSceneId" defaultValue={dadIncidentSceneId} onChange={inputChange} className={similarIncidentTwo ? "inp" : "inp no-fill"} style={{ width: 30 }} />次。</span>
				</span>
			</div>


		</>)

	}
}


export default ReportHead;