import * as React from "react";
import Combobox from "@js/common/combobox/index";
import Calendar from "@js/common/calendar/index";
import {languageConfig} from "./language"


type caseModalProps = {
    data:SummarySpace.params;
    changeState(field:string,value:string):void;
    type:"ch"|"en";
};





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



class CaseModal extends React.PureComponent<caseModalProps>{


   
    changeHandle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const tagert = e.currentTarget!;
        const field = tagert.name as "fage";
        const value = tagert.value;
       
        this.props.changeState(field,value)
    }

    setSex=(seletArr:Readonly<any[]>)=>{
        
        const node = sexArr[seletArr[0].id-1] ;
        const value = this.props.type=="ch" ? node.textCh : node.textEn; 
       
        this.props.changeState("fsex",value)
    }

    setCalendar=(timeArr:any[],field:"fcydata")=>{
        const value =timeArr[0]; 
        this.props.changeState(field,value)
	}
    render() {
        
        const {type,data} = this.props;
        const {fname, fage, fsex, fdeb, fdept, fprn, fryqk, fzljg, fcyyz, fcyqk, fcyzd, fsurvey, fcydata, frydata, fsumd } = data;
        const config = languageConfig[type];


        return (
                        <div className={"m-translate "+(type==="ch"&&"g-translate-ch" || "g-translate-en")} >
                            <p className="m-tit">{config.title}</p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <div >{config.fname}：<br /><input type="text" name="fname" className="s-inp normal" defaultValue={fname} onChange={this.changeHandle} /></div>
                                    <div >{config.fsex}：
                                        <Combobox  field="fsex" defaultVal={ (fsex =="男" || "Man") &&"1"||"2"} data={sexArr} textField={(type=="ch" && "textCh" || "textEn")} clickCallback={this.setSex} width={180}/>
                                    </div>
                                    <div>{config.fage}：<br /><input type="text" name="fage" className="s-inp normal" defaultValue={fage} onChange={this.changeHandle} /></div>
                                </div>
                                <div className="m-add-item">
                                    <div>{config.fdept}：<br /><input type="text" name="fdept" className="s-inp normal" defaultValue={fdept} onChange={this.changeHandle} /></div>
                                    <div>{config.fdeb}：<br /><input type="text" style={{width:180}} name="fdeb" defaultValue={fdeb} className="s-inp normal" onChange={this.changeHandle} /></div>
                                    <div>{config.fprn}：<br /><input type="text" name="fprn" defaultValue={fprn} className="s-inp normal" onChange={this.changeHandle} /></div>
                                </div>
                            </div>
                            <div className=" g-tanslate-content">
                                <div className="paitent-info">
                                    <span >{config.patient}：</span>
                                    <span >
                                        {fname}，{fsex}，{fage}，因
                                        <input className="s-inp normal" defaultValue={fsurvey} style={{ width: "calc(100% - 240px)" }} onChange={this.changeHandle} type="text" name="fsurvey" />， 于
                                      
                                        <Calendar width={120} field="frydata" clickBack={this.setCalendar} selTimeValArr={frydata} />
                                        入院，于
                                        <Calendar width={120} field="fcydata" clickBack={this.setCalendar} selTimeValArr={fcydata} />
                                        出院，共住院
                                        <input name="fsumd" style={{ width: 50 }} defaultValue={fsumd} width={60} onChange={this.changeHandle} type="text" className="s-inp normal" />
                                        天。</span>
                                </div>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fryqk}：</span>
                                    <textarea name="fryqk" className="m-article" rows={3} defaultValue={fryqk} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fzljg}：</span>
                                    <textarea name="fzljg" className="m-article" defaultValue={fzljg} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyzd}：</span>
                                    <textarea name="fcyzd" className="m-article" defaultValue={fcyzd} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyqk}：</span>
                                    <textarea name="fcyqk" className="m-article" defaultValue={fcyqk} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyyz}：</span>
                                    <textarea name="fcyyz" className="m-article" defaultValue={fcyyz} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                            </div>
                        </div>
        )

    }
}






export default CaseModal;



