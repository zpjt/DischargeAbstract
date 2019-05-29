import * as React from "react";
import Api from "@api/summary";
import {Link} from "react-router-dom";



type caseModalProps = {

};


type caseModalState = {
    fname:string;
    fsex: string;
    fage: string;
    fdept: string;
    fdeb: string;
    fprn: string;
    fsurvey:string;
    fryqk:string;
    fryzd:string;
    fzljg:string;
    fcyzd:string;
    fcyqk:string;
    fcyyz:string;
    status:string;
}



class AddCaseModal extends React.PureComponent<caseModalProps, caseModalState>{


    state: caseModalState = {
        fname:"",
        fsex: "",
        fage: "",
        fdept: "",
        fdeb: "",
        fprn: "",
        fsurvey:"",
        fryqk:"",
        fryzd:"",
        fzljg:"",
        fcyzd:"",
        fcyqk:"",
        fcyyz:"",
        status:""
    }
    
    componentDidMount(){

    }

    submit=()=>{


       
        Api.addChSummaryCase(this.state).then(res=>{

            console.log(res)


        })



    }

    changeHandle=(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{

        const tagert = e.currentTarget!;
        const field = tagert.name as "fage";
        const value = tagert.value;
        this.setState({
            [field]:value
        })

    }

    render() {

        const {fname,fage,fsex,fdeb,fdept,fprn,fryqk,fzljg,fcyyz,fcyqk} = this.state;

        return (
            <div className="g-padding g-gdsummary" >
                <div className="g-translate-box" style={{width:"50%",marginLeft:10}} >
                    <div className="g-translate g-add-translate">
                        <div className="m-translate" style={{width:"100%"}}>
                            <p className="m-tit">
                                深圳市萨米医疗中心
								</p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <p >姓名：<br/><input type="text" name="fname" className="s-inp normal" value={fname} onChange={this.changeHandle} /></p>
                                    <p >性别：<br/><input type="text" name="fsex"  className="s-inp normal" value={fsex} onChange={this.changeHandle}/></p>
                                    <p >年龄：<br/><input type="text" name="fage"  className="s-inp normal" value={fage} onChange={this.changeHandle}/></p>
                                </div>
                                <div className="m-add-item">
                                    <p >科室：<br/><input type="text" name="fdept"  className="s-inp normal" value={fdeb} onChange={this.changeHandle}/></p>
                                    <p >床号：<br/><input type="text" name="fdeb" value={fdept}  className="s-inp normal" onChange={this.changeHandle}/></p>
                                    <p >病案号：<br/><input type="text" name="fprn" value={fprn} className="s-inp normal" onChange={this.changeHandle}/></p>
                                </div>
                            </div>
                            <div className=" g-tanslate-content">
                                <p className="translate-item">
                                    <span className="m-right-tit">患者：</span>
                                    <textarea name="fname" rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">入院情况：</span>
                                    <textarea name="fryqk"  rows={3}  value={fryqk} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">诊疗经过：</span>
                                    <textarea name="fzljg" value={fzljg} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院诊断：</span>
                                    <textarea name="fcyzd" value={fcyyz}  rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院情况：</span>
                                    <textarea name="fcyqk"  value={fcyqk} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">出院医嘱：</span>
                                    <textarea name="fcyyz" value={fcyyz}  rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                            </div>
                        </div>
                     
                    </div>
                </div>
                <div className="add-opt-box">
                    <button className="s-btn normal-btn" onClick={this.submit}><i className="fa fa-floppy-o">&nbsp;</i>保存</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="s-btn normal-btn" onClick={this.submit}><i className="fa fa-save">&nbsp;</i>提交</button>
                    &nbsp;&nbsp;&nbsp;
                    <button className="s-btn normal-btn" ><Link to={{pathname:"/summary",state:{text:"病历清单"}}}><i className="fa fa-refresh">&nbsp;</i>取消</Link></button>
                </div>
            </div>

        )

    }
}


export default AddCaseModal;



