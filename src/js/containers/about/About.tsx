import * as React from "react";

import Menu from "../../common/Menu";

import {Route} from "react-router-dom"

import Modal from "@js/common/Modal";

// react组件的全局的context
const ThemeContext = React.createContext("dark");
const Theme = ()=>(
		<ThemeContext.Consumer >
			{(theme:any)=> <button >{theme}</button>}
		</ThemeContext.Consumer>

	);

const data = [
	{
		text:"1",
		id:"1",
			url:"aaa",
		children:[
			{
					text:"1-1",
					id:"1-1",
					children:[],
					url:"/about/other",
			}
		],
	},
	{
		text:"2",
		id:"2",
		url:"aaa",
		children:[
			{
					text:"2-1",
					id:"2-1",
					children:[
						{
							text:"2-2-1",
							id:"2-2",
								url:"/about/theme",
							children:[
								{
										text:"1-1",
										id:"1-1",
										children:[],
										url:"aaa",
								}
							],
						},
					],
					url:"aaa",
			}
		],
	}
];

class ShowModal extends React.Component{



	state = {
		show:false,
	}

	handle=()=>{

		// 不要在 setState 里用 this.state的属性的值 ，setState是异步的
		this.setState((preState:any)=>({show:!preState.show}))
	}
	render(){

		const modal = this.state.show ? (<Modal handle={this.handle} >
			我是模态框
		</Modal>) :null ;

		return (

				<div>
						<p>模态框的测试</p>
					<button
						onClick={this.handle}
					>toggle</button>
					{modal}

				</div>
			)


	}
}

const Abouts = ()=>{

	return (
		
			<div>
					<p>
						我是About
					</p>
					<div>
						<Menu data={data} config={{}} />
					
					</div>
			</div>
			
	)
};

const Other = ()=><p>我是第二个其那套路由</p>;

//点击异步加载

class About extends React.Component{

	state={
		mod:null,
		load:false,
	}
	load = ()=>{
		
			import(/*webpackChunkName:"test3"*/"@js/test3").then(res=>{
				this.setState({
					mod:res
				});

			});
		}
		change=()=>{

			this.setState({
				load:true
			})

		}
	componentWillUpdate(){

	

	}

	shouldComponentUpdate(...arg:any[]){

		const next = arg[1];


		if(this.state.load != next.load){
				this.load();
		}

		return !this.state.mod;

	}

	render(){

			const Child = this.state.mod ?( this.state.mod as any).default : null ;
			return (
					<>
						<p>我要异步加载</p>
						<Abouts />
						<button 
							onClick={this.change}
						>6666</button>
						<div>
						<ShowModal/>
							<p>嵌套路由</p>
								<Route path="/about/theme" component={Theme} />
								<Route path="/about/other" component={Other} />
						</div>
						{Child ? <Child /> : ""}
					</>

				)



	}
}



export default About;