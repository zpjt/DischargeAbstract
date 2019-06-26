import * as React from "react";
import Api from "@api/summary";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalInp from "../summary/CaseModalInp";
import {withRouter} from "react-router-dom";
import {Button,Icon, SvgIcon} from "@js/common/Button";
import {Notification} from "@js/common/toast/index";
import {createTypedMap} from "@js/common/ImmutableMap";

type caseModalProps = {
    data:SummarySpace.params ;
    user_id:string;
    pathTo(path:any):void;
    hasSave:boolean;
    orgData:{id:string;name:string}[];
};


type caseModalState = {

    data:TypedMap<SummarySpace.params> ;
    timeId:null | number;
    isChange:boolean;
};





class AddCaseModal extends React.PureComponent< caseModalProps, caseModalState>{

    timeSave=10000;
    id="";
    state:caseModalState ={
        data:createTypedMap(this.props.data),
        timeId:null,
        isChange:false
    };

    notificationRef:React.RefObject<Notification> = React.createRef();
    componentDidMount(){
       // 添加自动保存的定时器
       const _self = this;
       let oldData = this.state.data;
        const timeId = window.setInterval(function(){

            const newData = _self.state.data;

            if(oldData !== newData){

                const obj = Object.assign({ user_id:_self.props.user_id }, newData.toJS());
                Api.addChSummaryCase(obj).then((res:AxiosInterfaceResponse) => {

                        oldData = newData ;

                        _self.setState(pre=>({
                            isChange:false,
                            data:pre.data.set("id",res.data.id),
                        }))
                });
            }

        },this.timeSave);

        this.setState({
            timeId,
        })

        if(this.props.hasSave){
            this.notificationRef.current!.addNotice("有上次保存未提交的，请填写完整，然后提交！","warn",0);
        }
    }
    submit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const{ user_id} = this.props;
        const type = e.currentTarget!.name as "save" | "submit";
        const {data}  = this.state;
        
        const obj = Object.assign({user_id},data.toJS());

        const notifacation = this.notificationRef.current!;

        if (type == "save") {

            Api.addChSummaryCase(obj).then((res:AxiosInterfaceResponse)=> {

                notifacation.addNotice("保存成功！","success");

                this.setState(pre=>({
                    isChange:false,
                    data:pre.data.set("id",res.data.id)
                }))

            });

        } else { //提交

            if(document.querySelectorAll("#g-gdsummary .no-fill").length){
                notifacation.addNotice("请填写完整，然后提交！","warn");
                return 
            }

            Api.saveChSummaryCase(obj).then( ()=> {

                const obj = {
                    pathname: "/summary",
                    state: {
                        text: "病历清单"
                    }
                }
                this.props.pathTo(obj)

            })

        }




    }

    changeState=(field:keyof SummarySpace.params,value:string)=>{
        this.setState(pre=>({
           
             data:pre.data.set(field,value),
             isChange:true,  
        }))
    }
    
   

    orgItemHandle=(e:React.MouseEvent<HTMLLIElement>)=>{

        const text = e.currentTarget!.dataset.name;

        this.setState(pre=>({
          data:pre.data.set("fdept",text!)  ,
          isChange:true 
        }))

    }

    filterOrg(){
        const {orgData} = this.props;
        const fdept = this.state.data.get("fdept")

        return orgData.filter(val=>{
            return val.name.includes(fdept)
        });

    }

    componentWillUnmount(){

        const {timeId} = this.state;

        timeId && window.clearInterval(timeId);
    }


    render() {

        const { data,isChange} = this.state;
        
        const orgData = this.filterOrg();
        const saveAlert:React.CSSProperties | undefined  = isChange ? {color:"black"} : undefined;
        return (
            <div className="g-padding g-gdsummary" id="g-gdsummary">
                <Notification  ref={this.notificationRef}/>
                <div className="g-translate-box" style={{ width: "50%", marginLeft: 10 }} >
                    <div className="g-translate g-add-modal">
                        <CaseModalInp data={data} type="ch" changeState={this.changeState} >
                            <ul className="m-org-drop" >{
                                orgData.map(val=>{
                                    return (
                                        <li onClick={this.orgItemHandle} data-name={val.name} key={val.id}>{val.name}</li>
                                    )
                                })
                            }
                            </ul>  
                        </CaseModalInp>
                    </div>
                </div>
                <div className="add-opt-box">
                    <Button type="green" handle={this.submit} field="save"><Icon styleType="fa fa-floppy-o"/><span style={saveAlert}>保存</span></Button>
                    <button className="s-btn normal-btn primary " name="submit"  onClick={this.submit} ><SvgIcon styleType="submit"/>提交</button>
                    <Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><button className="s-btn line-btn primary" ><i className="fa fa-undo">&nbsp;</i>取消</button></Link>
                </div>
            </div>

        )

    }
}


type ContainerState={
    data:any;
    hasSave:boolean;
    orgData:any ;
}

class Container extends React.PureComponent<RouteComponentProps<{}> & reduxState,ContainerState> {

	state:ContainerState={
        data:null,
        hasSave:false,
        orgData:null
    }
    
    pathTo=(path:any)=>{

        this.props.history.push(path)
    }

    componentDidMount() {
        const {user_id} = this.props;
        const obj = {
			fname: "",
			fsex: "男",
			fage: "",
			fdept: "",
			fdeb: "",
			fprn: "",
			fsurvey: "",
			fryqk: "",
			fryzd: "",
			fzljg: "",
			fcyzd: "",
			fcyqk: "",
			fcyyz: "",
			frydata: "",
			fcydata: "",
            fsumd: "",
            id:"",
		}
        //看看上次有没有写了一部分保存后没有提交的
        const hasData = Api.getSummaryCaseByUserid(user_id);
            
        
        const Org = Api.getAllOrg();

        Promise.all([hasData,Org]).then((res:any[])=>{

            const [caseData,orgData] =res;

            const hasSave = caseData.code == 4000;
                if (hasSave) {
                    for (const iterator in obj) {

                        const key = iterator as "fname";

                        caseData.data[0][key] && (obj[key] = caseData.data[0][key]);

                    }
                    
                       
                }

                this.setState({
                    data:obj,
                    hasSave,
                    orgData:orgData.data
                })

        })

    }

	render(){

        const {data,hasSave,orgData} = this.state;
        
        const user_id = this.props.user_id;
		

		return data ? <AddCaseModal orgData={orgData} hasSave={hasSave} data={data}  user_id={user_id}  pathTo={this.pathTo} />:null;
	}
}



type reduxState = {
    user_id: string;
}


const mapStateToProps: MapStateToProps<reduxState, caseModalProps, appStore> = ({ app }) => {


    const user_id = app.get("user_id");

    return {
        user_id,
    }
}



export default withRouter(connect(mapStateToProps)(Container))  ;



