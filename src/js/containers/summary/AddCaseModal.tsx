import * as React from "react";
import Api from "@api/summary";
import { Link, RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import CaseModalInp from "../summary/CaseModalInp";
import {withRouter} from "react-router-dom"

type caseModalProps = {
    data:SummarySpace.params & {id:string};
   
    pathTo(path:any):void;
};


type caseModalState = {
   
   
}






class AddCaseModal extends React.PureComponent< caseModalProps, caseModalState>{


    params:SummarySpace.params & {id:string} = this.props.data;


    submit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const type = e.currentTarget!.name as "save" | "submit";
        const obj = this.params;

        if (type == "save") {

            Api.addChSummaryCase(obj).then(res => {

                console.log(res)


            });

        } else { //提交

            Api.saveChSummaryCase(obj).then(res => {

                console.log(res);

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
        this.params[field]=value;
        
        console.log(this.params)
	}


    render() {

        const { id,...obj} = this.params;

        return (
            <div className="g-padding g-gdsummary" >
           
                <div className="g-translate-box" style={{ width: "50%", marginLeft: 10 }} >
                    <div className="g-translate g-add-modal">
                        <CaseModalInp data={obj} type="ch" changeState={this.changeState} />
                    </div>
                </div>
                <div className="add-opt-box">
                    <button className="s-btn normal-btn" name="save" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>保存</button>
                    <button className="s-btn normal-btn" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
                    <button className="s-btn normal-btn" ><Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><i className="fa fa-refresh">&nbsp;</i>取消</Link></button>
                </div>
            </div>

        )

    }
}


type ContainerState={
    data:any
}

class Container extends React.PureComponent<RouteComponentProps<{}> & reduxState,ContainerState> {

	state:ContainerState={
		data:null,
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
            user_id:this.props.user_id
		}
        //看看上次有没有写了一部分保存后没有提交的
        Api.getSummaryCaseByUserid(user_id)
            .then((res:any) => {
                if (res.code == 4000) {
                    for (const iterator in obj) {

                        const key = iterator as "fname";

                        res.data[0][key] && (obj[key] = res.data[0][key]);

                    }
                    
                       
                }

                this.setState({
                    data:obj
                })
            })
    }

	render(){

		const {data} = this.state;
		

		return data ? <AddCaseModal data={data}   pathTo={this.pathTo} />:null;
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



