import * as React from "react";
import "@css/translate.scss";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import { Chart, Geom, Axis, Tooltip, Legend} from 'bizcharts';

type TranslateProp ={
		
}
type TranslateState = {

}

class Editor extends React.PureComponent {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }

   

   

    handleEditorChange = (editorState:any) => {
        this.setState({ editorState })
    }

    render () {

        const { editorState } = this.state
        return (
            <div className="my-component" style={{height:"100%"}}>
                <BraftEditor
                    value={editorState}
                    placeholder="输入英文翻译..."
                    style={{display:"flex",flexDirection:"column"}}
                    contentStyle={{flex:"auto"}}
                    controls={[
															    'undo', 'redo', 'separator',
															     'line-height', 'separator','headings',
															    'text-color', 'bold', 'underline', 'separator',
															    'superscript', 'subscript', 'remove-styles',  'separator', 'text-indent', 'text-align', 'separator',
															     'list-ul', 'list-ol', 'separator',
															     'separator', 'hr', 
															     'separator',
															    'clear'
															]}
                />
            </div>
        )

    }

}

class Translate extends React.PureComponent<TranslateProp,TranslateState>{


	render(){

		const data = [
				  { genre: 'Sports', sold: 275, income: 2300 },
				  { genre: 'Strategy', sold: 115, income: 667 },
				  { genre: 'Action', sold: 120, income: 982 },
				  { genre: 'Shooter', sold: 350, income: 5271 },
				  { genre: 'Other', sold: 150, income: 3710 }
				];

				// 定义度量
				const cols = {
				  sold: { alias: '销售量' },
				  genre: { alias: '游戏种类' }
				};

			return (<div className="g-result g-tanslate" style={{padding:0}}>
									<div className="m-opt-tanslate">
										 <div>
										 		<button className="s-btn normal-btn" > <i className="fa fa-refresh">&nbsp;</i>清 空</button>
										 		<button className="s-btn normal-btn" style={{marginLeft:"10px"}}><i className="fa fa-print">&nbsp;</i>打 印</button>
										 </div>
										 <div>
										 		<span>中</span>
										 		<i className="fa fa-long-arrow-right " style={{margin:"0 10px"}}></i>
										 		<span>英</span>
										 </div>
										 <div>
										 		<button className="s-btn normal-btn" > <i className="fa fa-refresh">&nbsp;</i>清 空</button>
										 		<button className="s-btn normal-btn" style={{margin:"0 10px"}}> <i className="fa fa-save">&nbsp;</i>保 存</button>
										 		<button className="s-btn normal-btn"><i className="fa fa-print">&nbsp;</i>打 印</button>
										 </div>

									</div>
									<div className="m-tanslate">
											<div className="m-translate-item">
												
													<Chart width={600} height={400} data={data} scale={cols}>
											      <Axis name="genre" title/>
											      <Axis name="sold" title/>
											    	<Legend />
											      <Tooltip />
											      <Geom type="interval" position="genre*sold" color="genre" />
											    </Chart>

											</div>
											<div className="m-translate-item">
												<Editor />
											</div>

									</div>
							</div>)

	}
}

type props={
	location:{
		query:{
			type:string;
		}
	}
};


type state={

}
export default class IllType extends React.Component<props,state>{
	

	state={
			data:[]
	}
	componentDidMount(){
			fetch("/11/getIllRes").then(res=>res.json()).then(res=>{

					if(res && res.data){
							console.log(res.data)
					}
			})
	}

	render(){

		//const type = this.props.match.query.type;

		//console.log(type)

		return (
				<div className="g-padding g-layout">
						<Translate />
				</div>
			)
	}
}

