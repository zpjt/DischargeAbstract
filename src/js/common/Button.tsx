import * as React from "react";


type BtnProps={
    handle?:(e:React.MouseEvent<HTMLButtonElement>)=>void;
    styleType:"normal-btn" | "dashed-btn" | "line-btn";
    type:"danger" | "primary" | "green";
    field?:string;
}

type BtnState={
    timeId:number | undefined;
}




 class Button extends React.PureComponent<BtnProps,BtnState>{

    static defaultProps={
        styleType:"normal-btn",
        type:"primary",
    }
    state={
        timeId:undefined
    }

    keyUp=(e:React.MouseEvent<HTMLButtonElement>)=>{

        const target = e.currentTarget!
        const {timeId} = this.state;

        if(timeId!=undefined){
            window.clearTimeout(timeId);
        }
        target.classList.add("btn-clicked");
        const newTimeid = window.setTimeout(function(){
            target.classList.remove("btn-clicked")
        },400)

       this.setState({
           timeId:newTimeid
       })

    }

    componentWillUnmount(){

        const timeId = this.state.timeId;
        if(timeId){

            clearTimeout(timeId)

        }
    }

    

    render(){

        const {children,handle,styleType,type,field} = this.props;
        return (
            <button onClick={handle} name={field} className={`s-btn ${styleType} ${type}`} onMouseUp={this.keyUp} >
                {children}
            </button>
        )
    }
}


type IconProps={
    styleType:string;
}

type IconState={

}

 class Icon extends React.PureComponent<IconProps,IconState>{



    render(){

        const {children,styleType} = this.props;
        return (
            <i className={`fa ${styleType}`}>
                {children}
                &nbsp;
            </i>
        )
    }
}

type SvgIconProps={
    styleType:string;
    size?:string;
}

type SvgIconState={

}

 class SvgIcon extends React.PureComponent<SvgIconProps,SvgIconState>{



    render(){

        const {styleType,size} = this.props;
        return (
            <svg className={`icon ${size}`} aria-hidden="true">
                <use  xlinkHref={`#icon-${styleType}`}></use> 
            </svg>
        )
    }
}


export {Button,Icon,SvgIcon}