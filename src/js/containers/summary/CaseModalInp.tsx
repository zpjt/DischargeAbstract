import * as React from "react";
import Combobox from "@js/common/combobox/index";
import Calendar from "@js/common/calendar/index";
import {languageConfig} from "./language"


type caseModalState = {
};


type caseModalProps = {
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
    frydata: string;
    fcydata: string;
    fsumd: string;
    type:"ch"|"en";

}


const sexArr = [	{
		id: "1",
        textCh: "男",
        textEn:"Man"
	}
	, {
		id: "2",
        textCh: "女",
        textEn:"Woman"
	}];



class CaseModal extends React.PureComponent<caseModalProps , caseModalState>{

    state:caseModalState={

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
        
        const {type, fname, fage, fsex, fdeb, fdept, fprn, fryqk, fzljg, fcyyz, fcyqk, fcyzd, fsurvey, fcydata, frydata, fsumd } = this.props;
        const config = languageConfig[type];
        return (
                    <div className="g-translate g-add-translate">
                        <div className="m-translate" style={{ width: "100%" }}>
                            <p className="m-tit">{config.title}</p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <p >{config.fname}：<br /><input type="text" name="fname" className="s-inp normal" value={fname} onChange={this.changeHandle} /></p>
                                    <div >{config.fsex}：
                                        <Combobox  field="fsex" defaultVal={fsex =="男" &&"1"||"2"} data={sexArr} textField={(type=="ch" && "textCh" || "textEn")} clickCallback={this.setSex} width={180}/>
                                    </div>
                                    <p >{config.fage}：<br /><input type="text" name="fage" className="s-inp normal" value={fage} onChange={this.changeHandle} /></p>
                                </div>
                                <div className="m-add-item">
                                    <p >{config.fdept}：<br /><input type="text" name="fdept" className="s-inp normal" value={fdept} onChange={this.changeHandle} /></p>
                                    <p >{config.fdeb}：<br /><input type="text" style={{width:180}} name="fdeb" value={fdeb} className="s-inp normal" onChange={this.changeHandle} /></p>
                                    <p >{config.fprn}：<br /><input type="text" name="fprn" value={fprn} className="s-inp normal" onChange={this.changeHandle} /></p>
                                </div>
                            </div>
                            <div className=" g-tanslate-content">
                                <p className="paitent-info">
                                    <span >{config.patient}：</span>
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
                                    <span className="m-right-tit">{config.fryqk}：</span>
                                    <textarea name="fryqk" rows={3} value={fryqk} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">{config.fzljg}：</span>
                                    <textarea name="fzljg" value={fzljg} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">{config.fcyzd}：</span>
                                    <textarea name="fcyzd" value={fcyzd} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">{config.fcyqk}：</span>
                                    <textarea name="fcyqk" value={fcyqk} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit">{config.fcyyz}：</span>
                                    <textarea name="fcyyz" value={fcyyz} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                            </div>
                        </div>

                    </div>
        )

    }
}






export default CaseModal;



