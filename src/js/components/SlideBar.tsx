import * as React from "react" ;

type props = {
	expandHandle:()=>void;
}

export default ({expandHandle}:props)=>{


			return (

					<div className="g-logo">
							<span className="m-logo"></span>
							<span className="j-slideBar" onClick={expandHandle}>
								 <i className="fa fa-bars fa-2x"></i>
							</span>	
					</div>

				)


}