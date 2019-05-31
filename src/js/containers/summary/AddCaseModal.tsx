import * as React from "react";
import Api from "@api/summary";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { connect, MapStateToProps } from "react-redux";
import AlertInfo from "@js/common/AlertInfo";
import {render} from "react-dom";
import Combobox from "@js/common/combobox/index";
import Calendar from "@js/common/calendar/index";

type caseModalProps = {

};


type caseModalState = {
    fname: string;
    fsex: string;
    fage: string;
    fdept: string;
    fdeb: string;
    fprn: string;
    fsurvey: string;
    fryqk: string;
    fryzd: string;
    fzljg: string;
    fcyzd: string;
    fcyqk: string;
    fcyyz: string;
    status: string;
    id: string;
    frydata: string;
    fcydata: string;
    fsumd: string;
    user_id: string;
}


const sexArr = [	{
		id: "1",
		text: "男"
	}
	, {
		id: "2",
		text: "女"
	}];



class AddCaseModal extends React.PureComponent<RouteComponentProps<caseModalProps> & reduxState, caseModalState>{


    state: caseModalState = {
        user_id: this.props.user_id,
        fname: "",
        fsex: "",
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
        status: "",
        id: "",
        frydata: "",
        fcydata: "",
        fsumd: "",
    }

    componentDidMount() {
        const { user_id } = this.props;
        //看看上次有没有写了一部分保存后没有提交的
        Api.getSummaryCaseByUserid(user_id)
            .then((res:any) => {

                if (res.code == 4000) {

                    

                    const { fname, fsex, fage, fdept, fdeb, fprn, fsurvey, fryqk, fryzd, fzljg, fcyzd, fcyqk, fcyyz, status, id, fcydata, frydata, fsumd } = res.data[0];

                    this.setState({
                        fname, fsex, fage, fdept, fdeb, fprn, fsurvey, fryqk, fryzd, fzljg, fcyzd, fcyqk, fcyyz, status, id, fcydata, frydata, fsumd,
                    });
                    render(<AlertInfo type="warn"  tit="有上次未填写完的文档，请填写完整后提交！"/>,document.getElementById("s-modal")!)

                }


            })
    }

    submit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const type = e.currentTarget!.name as "save" | "submit";
        const obj = this.state;
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

                this.props.history.push(obj)


            })

        }




    }

    changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const tagert = e.currentTarget!;
        const field = tagert.name as "fage";
        const value = tagert.value;
        this.setState({
            [field]: value
        })

    }

    setSex=(seletArr:Readonly<any[]>)=>{


        this.setState({

            fsex:seletArr[0].id == "1" ?"男" :"女"

        })




    }

    setCalendar=(timeArr:any[],field:"fcydata")=>{

        this.setState({
            [field]:timeArr[0]
        });
    }

    render() {

        const { fname, fage, fsex, fdeb, fdept, fprn, fryqk, fzljg, fcyyz, fcyqk, fcyzd, fsurvey, fcydata, frydata, fsumd } = this.state;

        return (
            <div className="g-padding g-gdsummary" >
           
                <div className="g-translate-box" style={{ width: "50%", marginLeft: 10 }} >
                    <div className="g-translate g-add-translate">
                        <div className="m-translate" style={{ width: "100%" }}>
                            <p className="m-tit">
                                深圳市萨米医疗中心
                                    </p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <p >姓名：<br /><input type="text" name="fname" className="s-inp normal" value={fname} onChange={this.changeHandle} /></p>
                                    <div >性别：
                                        <Combobox  field="fsex" defaultVal={fsex =="男" &&"1"||"2"} data={sexArr} clickCallback={this.setSex} width={180}/>
                                    </div>
                                    <p >年龄：<br /><input type="text" name="fage" className="s-inp normal" value={fage} onChange={this.changeHandle} /></p>
                                </div>
                                <div className="m-add-item">
                                    <p >科室：<br /><input type="text" name="fdept" className="s-inp normal" value={fdept} onChange={this.changeHandle} /></p>
                                    <p >床号：<br /><input type="text" style={{width:180}} name="fdeb" value={fdeb} className="s-inp normal" onChange={this.changeHandle} /></p>
                                    <p >病案号：<br /><input type="text" name="fprn" value={fprn} className="s-inp normal" onChange={this.changeHandle} /></p>
                                </div>
                            </div>
                            <div className=" g-tanslate-content">
                                <p className="paitent-info">
                                    <span >患者：</span>
                                    <span >
                                        {fname}，{fsex}，{fage}，因
                                        <input className="s-inp normal" value={fsurvey} style={{ width: "calc(100% - 180px)" }} onChange={this.changeHandle} type="text" name="fsurvey" />， 于
                                      
                                        <Calendar width={120} field="frydata" clickBack={this.setCalendar} selTimeValArr={frydata} />
                                        入院，于
                                        <Calendar width={120} field="fcydata" clickBack={this.setCalendar} selTimeValArr={fcydata} />
                                        出院，共住院
                                        <input name="fsumd" style={{ width: 50 }} value={fsumd} width={60} onChange={this.changeHandle} type="text" className="s-inp normal" />
                                        天。</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">入院情况：</span>
                                    <textarea name="fryqk" rows={3} value={fryqk} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">诊疗经过：</span>
                                    <textarea name="fzljg" value={fzljg} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院诊断：</span>
                                    <textarea name="fcyzd" value={fcyzd} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院情况：</span>
                                    <textarea name="fcyqk" value={fcyqk} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院医嘱：</span>
                                    <textarea name="fcyyz" value={fcyyz} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="add-opt-box">
                    <button className="s-btn normal-btn" name="save" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>保存</button>
                    &nbsp;&nbsp;&nbsp;
                        <button className="s-btn normal-btn" name="submit" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
                    &nbsp;&nbsp;&nbsp;
                        <button className="s-btn normal-btn" ><Link to={{ pathname: "/summary", state: { text: "病历清单" } }}><i className="fa fa-refresh">&nbsp;</i>取消</Link></button>
                </div>
            </div>

        )

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



export default withRouter(connect(mapStateToProps)(AddCaseModal));



