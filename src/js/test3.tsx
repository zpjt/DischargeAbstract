import * as React from "react";

import "@css/test.scss";






type Props = {
	foo:string;
	body:React.ReactNode;
}


class  Comment extends React.Component<Props,{}>{

 myRef:React.RefObject<Header>;
 constructor(props:Props){

 	super(props);
 	this.myRef = React.createRef();

 }
 componentDidMount(){

 	 console.log(this.myRef);

 }
 
	render(){


			return (
						<div className="foo"  >
							{this.props.foo}
							{this.props.body}
							
							<Header	 ref={this.myRef} frameWork="react" />

						</div>
				)


	}
}



class Header extends React.Component<{
	compiler?:string;
	frameWork:string;
}>{

	 HeaderRef:HTMLParagraphElement | null = null ;
	 
	 static defaultProps = {
   	 compiler: 'TypeScript'
   };

   state = {value:""} ;
   fileRef:React.RefObject<HTMLInputElement>= React.createRef();
   changeInp = (e:React.ChangeEvent<HTMLInputElement>)=>{
e      
   			this.setState({value:e.target.value.toUpperCase()});
   }

   changeFile = (e:React.ChangeEvent<HTMLInputElement>)=>{

   	console.log(e);
   	console.log(this.fileRef)
   
   }

	 hander(e:React.MouseEvent){

  	console.log(e.pageX);
  	console.log(this.HeaderRef);
  }
	render(){


		return (<div>
			
				<input type="text" onChange={this.changeInp} value={this.state.value}/>
				<input type="file" ref={this.fileRef} onChange={this.changeFile}/>


		</div>)
	}


}

//ReactDom.render(<Comment foo="foo"  body="er" />,document.getElementById("app"));

export default Comment ;