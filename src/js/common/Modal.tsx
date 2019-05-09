import * as React from "react";
import * as ReactDom from "react-dom";


type ModalProps = {
		ableMove?:boolean;
		shadeTransparent?:boolean; //遮罩层透明
		container:HTMLDivElement;
		tit:string;
		confirmName:string;
		cancelName:string;
		onCancel:()=>void;
		onSure:()=>void;
		show:boolean;
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

	componentDidMount(){

		console.log(this.ModalDom,"dom")
	}

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

	render(){



		const {children,container,tit,confirmName,cancelName,onCancel,onSure,show} = this.props;
		let flag = container;

		const {pointX,pointY} = this.state;
		

		return ReactDom.createPortal((
				<div className="g-modal" 
							ref={this.ModalDom} 
							style={{display:(show ? "flex":"none")}}
							onMouseUp={this.headMouseUp}
				>
					<div className="m-Mask" />

					<div className="m-Modal" style={{transform:`translate(${pointX}px , ${pointY}px)`}}>
						<div className="m-Mtit"
									onMouseDown={this.headMouseDown} 
									
						>
							<span className="tit-name">{tit}</span>
							<span className="m-Mclose" onClick={onCancel}>
									<i className="fa fa-times fa-2x"></i>
							</span>
						</div>
						
						<div className="m-Mbody">
							{children}
						</div>
						<div className="m-Mfooter">
								<button className="s-btn normal-btn" onClick={onSure}>
									{confirmName}
								</button>
								<button className="s-btn normal-btn" onClick={onCancel}>
									{cancelName}
								</button>
						</div>
					</div>
				</div>
			),flag);
	}
}