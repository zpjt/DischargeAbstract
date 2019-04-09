import * as React from "react";
import Menu from "@js/common/Menu";



const SlideMenu = ({data}:{data:any[]})=>{

	return (<div className="g-slideMenu">
								<Menu  data={data} config={{}}/>
						</div>);
}

export default SlideMenu ;