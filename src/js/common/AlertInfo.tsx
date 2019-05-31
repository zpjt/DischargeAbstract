import * as React from "react";
import {createPortal} from "react-dom";
import "@css/alertInfo.scss";

type alertProp={
    type:"error"|"success"|"warn";
    tit:string;
   

}

type alertState={
    show:boolean;

}





export default class AlertInfo extends React.Component<alertProp,alertState>{



    state={
        show:true,
    }

    closeHandle=()=>{




        this.setState({
            show:false,
        })
    }

    render(){

        const {tit,type} = this.props;
        const {show} = this.state;
        
        return show ? createPortal((



                <div className="g-alertInfo">
                    <span className={type} style={{paddingRight:8,fontSize:24}}>

                        <i className={"fa " + (type=="success"?"fa-check-circle":type=="warn"?"fa-exclamation-triangle":"fa-times-circle-o " )}></i>    
                    </span>
                    <span className="txt">{tit}</span>
                    <span className="m-alert-close" onClick={this.closeHandle}><i className="fa fa-times fa-lg"  /></span>
                </div>



        ),document.getElementById("s-modal")!) : null
    }
}