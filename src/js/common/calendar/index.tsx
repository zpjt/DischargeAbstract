import * as React from "react";
import "@css/Calendar.scss";
import {VelocityComponent} from "velocity-react";
import * as  Immutable from "immutable";
import CalendarView from "./CalendarView";


type commonInterface = CalendarSpace.commonInterface ;
type CalendarApi = CalendarSpace.CalendarApi ;

enum calendarType  {
				year = 1 ,
				searson = 2,
				month = 3 ,
				day = 4 ,
}


type calendarInpProps={
	selTimeVal:string;
	dropHandle():void;
}

type calendarInpState = {


}



class CalendarInp extends React.PureComponent<calendarInpProps,calendarInpState>{

	render(){
			const {selTimeVal,dropHandle} = this.props;

			return (
					<div className="m-clalendar-inpBox" onClick={dropHandle}>
							<span className="calendar-inp-icon"><i className="fa fa-calendar">&nbsp;</i></span>
							<input className="s-inp calendar-inpTxt" value={selTimeVal}  readOnly type="text"/>
					</div>
				)

	}
}




type calendarProps={
		rotate?: commonInterface["rotate"], // 日历类型
		style?:1 | 2,
		time?:boolean, //可选择时间
		hasInp?:boolean,
		selTimeValArr?:string;//最终显示的时间字符串
		width?:number;
		clickBack?:(timeArr:Readonly<any[]>,field:string)=>void;
		field:string;
}

type calendarState = {
		expand:boolean;
		selTimeArr:Immutable.List<TypedMap<CalendarApi["curTime"]>>;
		rotate:commonInterface["rotate"], 
}


class Calendar extends  React.PureComponent<calendarProps,calendarState> implements CalendarApi {

	static defaultProps={
					rotate:calendarType.day,
					style:1,
					time:false,
					hasInp:true,	
					selTimeValArr:"",
					width:240,
	}

  curTime = this.getCurTime();

	state:calendarState={
		expand:false,
		selTimeArr:Immutable.fromJS(this.timeValToTimeObj()),
		rotate:this.props.rotate! ,
	}

	
	changeSelTimeItme=(viewIndex:number,showTimeObj:CalendarApi["curTime"])=>{
				const {year,month,day,searson} = showTimeObj;
				const {rotate} = this.state;
				this.setState(pre=>{

							let selTimeArr = pre.selTimeArr;

							switch (rotate) {
												case calendarType.day:

																
														selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",month).set("day",day).set("searson",Math.ceil(month / 3)))
														});	


													break;
												case calendarType.searson:{

															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",searson * 3 -2).set("day",day).set("searson",searson))
														 });	


													break;
												}
												case calendarType.year:{
															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year))
														});	
													break;
												}
												case calendarType.month:{

															selTimeArr = selTimeArr.update(viewIndex,map=>{
																	return map.withMutations(node=>node.set("year",year).set("month",month).set("searson",Math.ceil(month / 3)))
														 });	
													break;
												}
												default:
														selTimeArr = selTimeArr ;
													break;
											}




					return {
						selTimeArr,
					}
				});

	}	

	getCurTime(){
		const time = new Date();
		const year = time.getFullYear();
		const month = time.getMonth()+1;
		const day = time.getDate();
		const searson = Math.ceil(month / 3);
		const hour=  time.getHours();
		const minute= time.getMinutes();

		return {year,searson,month,day,hour,minute}

	}

	changeTime=(e:React.ChangeEvent<HTMLInputElement>)=>{

		 const value = +e.currentTarget.value,
					 field = e.currentTarget.name,
					 viewIndex = +e.currentTarget.dataset.viewindex!;


			this.setState(pre=>{

			const 	selTimeArr = pre.selTimeArr.setIn([viewIndex,field],value);
				return {
					selTimeArr,
				}
			})

	}

	timeValToTimeObj(){

		const {style,selTimeValArr,rotate,time} = this.props;

		const defaultTimeArr = selTimeValArr!.split(",");

		const curTimeArr = Array.from({length:style!},()=>Object.assign({},this.curTime)) ;
		const has_defaultTime = !!selTimeValArr ;

		const hour = this.curTime.hour;
		const minute = this.curTime.minute;

		const setTime = (item:string)=>{

			
					const arr = !time ? item.split("-") : item.split(" ")[0].split("-");
					const year = ~~arr[0];

					switch (rotate) {
							case calendarType.day:{
									const month = ~~arr[1];
									const timeArr = time ?  item.split(" ")[1].split(":") : null;
									return {
										year,
										month,
										searson:Math.ceil(month / 3),
										day:~~arr[2],
										hour:timeArr ? timeArr[0] : hour,
										minute:timeArr ?  timeArr[1] :minute,
									}
							}
							case calendarType.month:{
									const month = ~~arr[1];
									return {
										year,
										month,
										searson:Math.ceil(month / 3),
										day:1,
										hour,
										minute,
									}
								
							}
							case calendarType.searson:{
								const searson = ~~(arr[1].substr(1));
									return {
										year,
										month:searson*3-2,
										searson,
										day:1,
										hour,
										minute,
									}
								
							}
							case calendarType.year:{
									return {
										year,
										month:1,
										searson:1,
										day:1,
										hour,
										minute,
									}
							}
						}
		}


		const selTimeArr = curTimeArr.map((val,index)=>{
				return !has_defaultTime ? val : setTime(defaultTimeArr[index])!
		});


		return selTimeArr ;

	
	}

	getSelTimeVal(){

		const {selTimeArr,rotate} = this.state;
		const {time,clickBack,field} = this.props;



		const getStr = (val:commonInterface["showTimeObj"],rotate:number)=>{

							const year = val.get("year"),
														month = (val.get("month")+"").padStart(2,"0"),
														day = (val.get("day")+"").padStart(2,"0"),
														searson = val.get("searson");

						

											switch (rotate) {
												case calendarType.day:
													const timeStr = time ? (val.get("hour")+"").padStart(2,"0") + ":"+(val.get("minute")+"").padStart(2,"0") +":00": "";
													return year + "-" + month + "-" + day + " " +timeStr; 
												case calendarType.searson:
													return year + "-S" + searson; 
												case calendarType.year:
													return year+""; 
												case calendarType.month:
													return  year + "-" + month ;
											}
		}

		const strArr = selTimeArr.map(val=>{
			return getStr(val,rotate)!;
		});

		
		clickBack && clickBack(strArr.toJS(),field!);

		return strArr.join(" 至 ");
	}

	dropHandle=()=>{

			this.setState(pre=>({expand:!pre.expand}));

	}
	render(){

			const {hasInp,time,width} = this.props;
			const {expand,selTimeArr,rotate} = this.state;

			return (
					<div className="g-calendar" style={{width}}>
						{hasInp ? <CalendarInp 
													selTimeVal={this.getSelTimeVal()}
													dropHandle={this.dropHandle}
												 /> : null }
						<VelocityComponent
							animation={expand?"slideDown":"slideUp"}
						>
							<div className="g-calendar-box">
									<CalendarView
																		rotate = {rotate}
																		selTimeObj= {selTimeArr.get(0)!}
																		curTime={this.curTime}
																		changeSelTimeItme = {this.changeSelTimeItme}
																		viewIndex={0}
																		time={time!}
																		changeTime={this.changeTime}
																	/>
															{selTimeArr.size == 2 ? <CalendarView 
																								rotate={rotate}
																								selTimeObj= {selTimeArr.get(1)!}
																								curTime={this.curTime}
																								changeSelTimeItme = {this.changeSelTimeItme}	
																								viewIndex={1}
																								time={time!}
																								changeTime={this.changeTime}
																						/> : null }
							</div>
						
						</VelocityComponent>
					</div>

				)

	}

}

export default Calendar;
