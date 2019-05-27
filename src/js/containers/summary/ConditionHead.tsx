import * as React from "react";
import Search from "@js/common/SearchCom";
import Modal from  "@js/common/Modal";
import Calendar from "@js/common/calendar/index";
import Combobox from "@js/common/combobox/index";

const ModalDom = document.getElementById("s-modal") as HTMLDivElement;



type HeadOptProp = {

}

type HeadOptState = {
	showUserM:boolean;
	showOptM:boolean;
	initUserM:boolean;
	initOptM:boolean;
}

type UserModalProp = {
	//show:boolean;
}

type UserModalState = {

}

class UserModal extends React.PureComponent<UserModalProp,UserModalState>{

		render(){
		
				return (<span >
									
										<input type="text"/>
								</span>)

		}


}

 const sexArr = [
    {
        id:"1",
        text:"男"
    }
    ,{
        id:"2",
        text:"女"
	},
	{
		id:"3",
		text:"男、女"
	}
 ];
 const translateArr  = [
    {
        id:"1",
        text:"未翻译"
    }
    ,{
        id:"2",
        text:"已翻译"
	},
	{
		id:"3",
		text:"所有病例"
	}
 ];

 export default class HeadOpt extends React.PureComponent<HeadOptProp,HeadOptState>{

		state={
			showUserM:false,
			showOptM:false,
			initUserM:false,
			initOptM:false,
		}
		toggleShow = ()=>{
			this.setState(preState=>({
					showUserM:!preState.showUserM,
					initUserM:true,
			}))
		}
		toggleShow1 = ()=>{
			this.setState(preState=>({
					showOptM:!preState.showOptM,
					initOptM:true,
			}))
		}

	
		render(){
			const {showUserM,showOptM,initOptM,initUserM} = this.state;
			return (<>
								<div>
									
									<div style={{display:"flex",justifyContent:"space-between"}}>

                                        <div  className="m-filter-box">
                                            <Search width={160}  searchHandle={(key:string)=>console.log(key)} hasBtn={false} tip="科室搜索..." closeHandle={()=>console.log(2)}/>
                                            <Combobox data={sexArr} field="fsex" width={100} placeholder="性别..." defaultVal="3"/>
                                            <Search searchHandle={(key:string)=>console.log(key)} hasBtn={false} width={80} tip="年龄搜索..."  closeHandle={()=>console.log(2)}/>
                                            <Calendar field="lrdata" width={160} placeholder="录入时间" />
                                            <Combobox data={translateArr} field="status" width={120} placeholder="翻译类型" defaultVal="3"/>
                                        </div>
										
										
                                        <div className="m-optBtn">
											
											<button className="s-btn normal-btn" onClick={this.toggleShow}> <i className="fa fa-user-plus">&nbsp;</i>添加病历</button>
                                            <button className="s-btn normal-btn" onClick={this.toggleShow1}><i className="fa fa-trash">&nbsp;</i>删除</button>
                                            <button className="s-btn normal-btn" onClick={this.toggleShow1}><i className="fa fa-refresh">&nbsp;</i>刷新</button>
										</div>
									</div>
								</div>
								{initUserM ?(<Modal 
																	container={ModalDom}
																	tit="af"
																	onCancel={this.toggleShow}
																	show={showUserM}
																	onSure={this.toggleShow}
																>
																	<UserModal />
															</Modal>):null}
								{initOptM ?(<Modal 
																	container={ModalDom}
																	tit="af"
																	onCancel={this.toggleShow1}
																	show={showOptM}
																	onSure={this.toggleShow1}
																>
																	<UserModal />
															</Modal>):null}
							</>
				)
		}

}