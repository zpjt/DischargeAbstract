import * as React from "react";
import Api from "@api/summary";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalInp from "../summary/CaseModalInp";
import {withRouter} from "react-router-dom";
import {Button,Icon} from "@js/common/Button";
import {Notification} from "@js/common/toast/index";

type caseModalProps = {
    data:SummarySpace.params & {id:string};
    user_id:string,
    pathTo(path:any):void;
    hasSave:boolean;
};


type caseModalState = SummarySpace.params & {id:string};





class AddCaseModal extends React.PureComponent< caseModalProps, caseModalState>{

    
    state = Object.assign({},this.props.data) ;

    notificationRef:React.RefObject<Notification> = React.createRef();
    componentDidMount(){
        if(this.props.hasSave){
            this.notificationRef.current!.addNotice("有上次保存未提交的，请填写完整，然后提交！","warn",0);
        }
    }
    submit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const{ user_id} = this.props;
        const type = e.currentTarget!.name as "save" | "submit";
        const obj = Object.assign({user_id},this.state);

        const notifacation = this.notificationRef.current!;

        if (type == "save") {

            Api.addChSummaryCase(obj).then(()=> {

                notifacation.addNotice("保存成功！","success");

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
        this.setState({
            [field as "fname"]:value,
        })
	}


    render() {

        const { id,...obj} = this.state;

        return (
            <div className="g-padding g-gdsummary" id="g-gdsummary">
                <Notification  ref={this.notificationRef}/>
                <div className="g-translate-box" style={{ width: "50%", marginLeft: 10 }} >
                    <div className="g-translate g-add-modal">
                        <CaseModalInp data={obj} type="ch" changeState={this.changeState} />
                    </div>
                </div>
                <div className="add-opt-box">
                    <Button type="green" handle={this.submit} field="save"><Icon styleType="fa fa-floppy-o"/>保存</Button>
                    <button className="s-btn normal-btn primary" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
                    <Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><button className="s-btn line-btn primary" ><i className="fa fa-undo">&nbsp;</i>取消</button></Link>
                </div>
            </div>

        )

    }
}


type ContainerState={
    data:any;
    hasSave:boolean;
}

class Container extends React.PureComponent<RouteComponentProps<{}> & reduxState,ContainerState> {

	state:ContainerState={
        data:null,
        hasSave:false
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
        Api.getSummaryCaseByUserid(user_id)
            .then((res:any) => {
                const hasSave = res.code == 4000;
                if (hasSave) {
                    for (const iterator in obj) {

                        const key = iterator as "fname";

                        res.data[0][key] && (obj[key] = res.data[0][key]);

                    }
                    
                       
                }

                this.setState({
                    data:obj,
                    hasSave,
                })
            })
    }

	render(){

        const {data,hasSave} = this.state;
        
        const user_id = this.props.user_id;
		

		return data ? <AddCaseModal hasSave={hasSave} data={data}  user_id={user_id}  pathTo={this.pathTo} />:null;
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



