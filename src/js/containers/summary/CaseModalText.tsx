import * as React from "react";
import {languageConfig} from "./language"





type caseModalProps = {
    params:{
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
    }
  
    type:"ch"|"en";

}


const sexArr = {
    en:{
		"1":"Man",
		"2":"Woman",
	}
	,ch:{
        "1":"男",
        "2":"女",
	}};

sexArr

class CaseModal extends React.PureComponent<caseModalProps>{



    render() {
        
        const {type,params:{ fname, fage, fsex, fdeb, fdept, fprn, fryqk, fzljg, fcyyz, fcyqk, fcyzd, fsurvey, fcydata, frydata, fsumd }} = this.props;
        const config = languageConfig[type];
        return (
                        <div className={"m-translate "+(type === "ch" && "g-translate-ch" || "g-translate-en")}>
                            <p className="m-tit">{config.title}</p>
                            <div className="g-translate-header">
                                <div className="m-add-item">
                                    <p ><span className="m-right-tit m-head-tit">{config.fname}：</span>{fname}</p>
                                    <p ><span className="m-right-tit m-head-tit">{config.fsex}：</span> {fsex} </p>
                                    <p ><span className="m-right-tit m-head-tit">{config.fage}：</span>{fage}</p>
                                </div>
                                <div className="m-add-item">
                                    <p ><span className="m-right-tit m-head-tit">{config.fdept}：</span>{fdept}</p>
                                    <p ><span className="m-right-tit m-head-tit">{config.fdeb}：</span>{fdeb}</p>
                                    <p ><span className="m-right-tit m-head-tit">{config.fprn}：</span>{fprn}</p>
                                </div>
                            </div>
                            <div className=" g-tanslate-content">
                                <p className="paitent-info">
                                    <span >{config.patient}：</span>
                                    <span >
                                        {fname}，{fsex}，{fage}，因“
                                        {fsurvey}”， 于
                                        {frydata}
                                        入院，于
                                        {fcydata}
                                        出院，共住院
                                        {fsumd}
                                        天。</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fryqk}：</span>
                                    <span className="m-article">{fryqk}</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fzljg}：</span>
                                    <span className="m-article">{fzljg}</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyzd}：</span>
                                   <span className="m-article">{fcyzd}</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyqk}：</span>
                                    <span className="m-article">{fcyqk}</span>
                                </p>
                                <p className="translate-item">
                                    <span className="m-right-tit m-article-tit">{config.fcyyz}：</span>
                                   <span className="m-article">{fcyyz}</span>
                                </p>
                            </div>
                        </div>

                   
        )

    }
}






export default CaseModal;



