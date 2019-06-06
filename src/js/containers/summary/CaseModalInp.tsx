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

    
    
    static ItemInp:React.SFC<{is_en:boolean,value:string,field?:string,handle:(e:React.ChangeEvent<HTMLInputElement>)=>void}>=({is_en,field,value,handle})=>{


        return !is_en ? <input type="text" name={field} className={"s-inp normal "+ (!value?"no-fill":"")} style={{width:180}} value={value} onChange={handle} /> :
                        <input type="text" readOnly className="s-inp normal" defaultValue={value}  />
    }
    
    render() {
        
        const {type,data,children} = this.props;
        const {fname, fage, fsex, fdeb, fdept, fprn, fryqk, fzljg, fcyyz, fcyqk, fcyzd, fsurvey, fcydata, frydata, fsumd } = data;
        const config = languageConfig[type];

        const is_en = type==="en" ;

        return (
                        <div className={"m-translate "+(!is_en &&"g-translate-ch" || "g-translate-en")} >
                            <p className="m-tit">{config.title}</p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <div >{config.fname}：<br />
                                     <CaseModal.ItemInp is_en={is_en} field="fname" value={fname} handle={this.changeHandle} />
                                    </div> 
                                    <div  className="g-org">{config.fdept}：<br />
                                    <input  type="text" name="fdept" autoComplete="off" className={"s-inp normal "+(!fdept ?"no-fill":"")} value={fdept} onChange={this.changeHandle} />
                                    {children}
                                    
                                    </div>
                                   
                                  
                                </div>
                                <div className="m-add-item">
                                    <div >{config.fsex}：<br/>
                                        { !is_en ? <Combobox  field="fsex" defaultVal={ (fsex =="男") &&"1"||"2"} data={sexArr} textField={(type=="ch" && "textCh" || "textEn")} clickCallback={this.setSex} width={180}/>
                                        :<input type="text" readOnly className="s-inp normal" defaultValue={fsex}  />}
                                    </div>
                                    <div>{config.fdeb}：<br />
                                     <CaseModal.ItemInp is_en={is_en} field="fdeb" value={fdeb} handle={this.changeHandle} />
                                    </div>
                                  
                                </div>
                                 <div className="m-add-item">  
                                    <div>{config.fage}：<br />
                                     <CaseModal.ItemInp is_en={is_en} field="fage" value={fage} handle={this.changeHandle} />
                                     </div>
                                    <div>{config.fprn}：<br />
                                     <CaseModal.ItemInp is_en={is_en} field="fprn" value={fprn} handle={this.changeHandle} />
                                    </div>
                                </div>

                            </div>
                            <div className=" g-tanslate-content">
                                <div className="paitent-info">
                                    <span >{config.patient}：</span>
                                    <span >
                                        {fname}，{fsex}，{fage}，{config.fsurvey}
                                        <input className={"s-inp normal m-survey " + (!fsurvey ? "no-fill":"")} value={fsurvey}  onChange={this.changeHandle} type="text" name="fsurvey" />， 
                                      
                                       {!is_en ?  (<>于<Calendar width={120} field="frydata" clickBack={this.setCalendar} selTimeValArr={frydata} />{config.frydata}</> ):( config.frydata + frydata)}
                                        ，
                                      { !is_en ?<>于<Calendar width={120} field="fcydata" clickBack={this.setCalendar} selTimeValArr={fcydata} />{config.fcydata}</>: config.fcydata+fcydata}
                                        ，<>{config.fsumd}&nbsp;{!is_en ? <input className={"s-inp normal " + (!fsumd && "no-fill" || "")} style={{width:60}} name="fsumd" onChange={this.changeHandle} />: fsumd}&nbsp;{config.fsumd1}</>。</span>
                                </div>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fryqk}：</span>
                                    <textarea name="fryqk" className={"m-article "+(!fryqk?"no-fill":"")} rows={3} value={fryqk} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fzljg}：</span>
                                    <textarea name="fzljg" className={"m-article "+(!fzljg?"no-fill":"")} value={fzljg} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyzd}：</span>
                                    <textarea name="fcyzd" className={"m-article "+(!fcyzd?"no-fill":"")} value={fcyzd} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyqk}：</span>
                                    <textarea name="fcyqk" className={"m-article "+(!fcyqk?"no-fill":"")} value={fcyqk} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyyz}：</span>
                                    <textarea name="fcyyz" className={"m-article "+(!fcyyz?"no-fill":"")} value={fcyyz} rows={3} onChange={this.changeHandle}></textarea>
                                </p>
                            </div>
                        </div>
        )

    }
}






export default CaseModal;



