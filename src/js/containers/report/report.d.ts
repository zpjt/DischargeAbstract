declare namespace ReportSpace {



	export type methodName = "inputChange" | "setCalendarObj" | "setComboboxObj" | "getParams" | "upFileHandle";
	export type hospitalName = "三院" | "中医院";

	export interface ReportAPI {
		getMethods<k extends methodName>(mthodName: methodName): ReportAPI[k];
		params: {
			upOrgId: string; //科室
			patientOrgId: string;//患者所在科室
			bedNumber: string;//床号
			patientName: string;//姓名
			sex: string;
			age: string;
			admissionTime: string; //入院时间
			medicalRecordNumber: string;// 病历号
			primaryDiagnosis: string;//主要诊断
			rsaFall: string;//跌倒(相关风险评估)
			rsaPressureSore: string;//压疮(相关风险评估)
			rsaCareAbility: string;//自理能力(相关风险评估)
			rsaNonPlanned: string;//非计划拔管(相关风险评估)
			rsaOther: string;//其他(相关风险评估)
			currentPeople: string;//当事人
			cpProfession: string;//职称(当事人)
			cpTopClass: string;//层级(当事人)
			happenTime: string;//发生时间(当事人)
			discoverer: string;//发现人
			dProfession: string;//职称(发现人)
			dTopClass: string;//层级(发现人)
			discoveryTime: string;//发现时间(发现人)
			reporter: string;//报告人
			rProfession: string;//报告人(职称)
			rTopClass: string;//层级(报告人)
			reportTime: string;//报告时间
			incidentSceneId: string;//事发场景
			dadIncidentSceneId: string;//事发场景父级id
			dateType: string;//日期类型
			reporterNumber: string;//上报科室人手机号
			medicalType: string;//医疗类型 
			incidentTime: string;//事发时段

			passResult: string;//简要事情的经过及结果
			pass: string;//事件经过
			result: string;//处理结果
			psSignatory: string;//当事人(简要事件的经过及结果)
			psDate: string;//日期(简要事件的经过及结果)
			treatmentMeasures: string;//处理措施
			tmSignatory: string;//签字人(处理措施)
			tmDate: string;//日期(处理措施)
			analysisCauses: string;//原因分析
			acSignatory: string;//签字人(原因分析)
			acDate: string;//日期(原因分析)
			correctiveActions: string;//改进措施
			caSignatory: string;//签字人(改进措施)
			caDate: string;//日期(改进措施)

			orgRank: string;//科室定级

			functionOrgRank: string;//职能科室定级
			property: string;//不良事件性质界定：风险注册、系统错误、个人错误
			propertyContent: string;//界定说明
			frequency: string;//不良事件频率界定
			frequencyContent: string;//界定说明
			allotStatus: string;//分配的状态

			man: string;//人(主要原因分析)
			machine: string;//机(主要原因分析)
			object: string;//物(主要原因分析)
			law: string;//法(主要原因分析)
			ring: string;//环(主要原因分析
			deleteSaveCommit: string;//删除或保存或提交
			formType: string;//表单类型
			damageDegree:string;//造成病人的损害程度
			admissionNumber:string,//住院号
			similarIncidentOne :string;//发生过类似的事件
			similarIncidentTwo:string;//发生过类似的事件2

		

			//	 	 	 modifyStatus :string;//修改状态
			// viewReminder :string;//查看提醒
			// limitTime :string;//时间限制 多少天必须完成

		}

		inputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void;
		setCalendarObj(setTimeArr: Readonly<any[]>, field: string): void;
		setComboboxObj(selArr: Readonly<any[]>, field: string): void;
		getParams(): ReportAPI["params"];
		upFileHandle(file: FileList): void;
	}



}