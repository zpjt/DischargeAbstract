import * as React from "react";
import * as ReactDom from "react-dom";
import {Icon} from "@js/common/Button";
import {VelocityComponent} from "velocity-react";

type ModalProps = {
		ableMove?:boolean;
		shadeTransparent?:boolean; //遮罩层透明
		container:HTMLElement;
		tit:string;
		className?:string;
		confirmName:string;
		cancelName:string;
		onCancel:()=>void;
		onSure:()=>void;
		show:boolean;
		type?:"tip"|"question";
		width?:number;
}

type ModalState = {
			pointX:number;
			pointY:number;
}


export default class Modal extends React.PureComponent<ModalProps,ModalState>{

	static defaultProps={
		ableMove:true,
		shadeTransparent:false,
		confirmName:"确定",
		cancelName:"关闭",
	}

	state={
			pointX:0,
			pointY:0,
	}

	ModalDom:React.RefObject<HTMLDivElement> = React.createRef();

	
	headMouseDown=(e:React.MouseEvent)=>{
			const modalDom = (this.ModalDom.current)!;
			const {pointY,pointX} = this.state;
			
			//主义要减去上一次移动留下的位置
			const diffPointX = e.clientX - pointX;
			const diffPointY = e.clientY - pointY;

			modalDom.onmousemove = (originE:MouseEvent)=>{
				this.setState({
							pointX: (originE.clientX - diffPointX),
							pointY: (originE.clientY - diffPointY),
				})
			}
	}
	
	headMouseUp=()=>{
			(this.ModalDom.current)!.onmousemove = null ;
	}

	sureHandle=()=>{
		const {onSure} = this.props;
		onSure();
	}

	render(){



		const {children,container,tit,confirmName,cancelName,onCancel,show,className,type,width} = this.props;
		let flag = container;

		const {pointX,pointY} = this.state;
		

		return ReactDom.createPortal((
				<VelocityComponent runOnMount={true} animation = {show?"transition.bounceDownIn":"transition.bounceDownOut"} > 
					<div className={"g-modal " +className }
						ref={this.ModalDom} 
						onMouseUp={this.headMouseUp}
					>
						
						<div className="m-Mwrap" >
							<div className="m-Mask" />
							<div className="m-Modal" style={{transform:`translate(${pointX}px , ${pointY}px)`,width}}>
								<div className="m-Mtit"
											onMouseDown={this.headMouseDown} 
											
								>
									<span className="tit-name">{type?<Icon styleType={type=="tip"?"fa-exclamation-circle fa-lg":"fa-question-circle fa-lg"}/>:null}{tit}</span>
									<span className="m-Mclose" onClick={onCancel}>
											<i className="fa fa-times fa-2x"></i>
									</span>
								</div>
							
								<div className="m-Mbody">
									{children}
								</div>
								<div className="m-Mfooter">
										<button className="s-btn line-btn green" onClick={onCancel}>
											{cancelName}
										</button>
										<button className="s-btn normal-btn primary" onClick={this.sureHandle}>
											{confirmName}
										</button>
										
								</div>
							</div>
						</div>
					
					</div>	
				</VelocityComponent>
			),flag);
	}
}