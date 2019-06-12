import * as React from "react";

const Url = "ws://"+window.location.host+window.getSession("getPath")+"WebSocket";

type socketProps={
  user_id:string;
  role_id:string;
}
type soketState={
    data:string[];
}

class SoketNews extends React.PureComponent<socketProps,soketState>{

    static tryTime = 0 ;
    static heartflag = false;
    webSocket:null | WebSocket = this.initSocket();
    state:soketState={
        data:[]
    }
    initSocket(){
        
       const {user_id,role_id} = this.props;
       return  new WebSocket(Url+"/"+user_id+"/"+role_id);

    }
    
    componentDidMount(){
      
       
        const _self = this ;
        const webSocket = this.webSocket!;
		// 收到服务端消息
        webSocket.onmessage = function (msg) {

             const result = msg.data;

            if(result == "&"){

             }else if(result){

            	const data = JSON.parse(msg.data);
                const arr = data.data
                _self.setState({
                    data: arr ,
                });
            	
				
            }


        };

        // 异常
        webSocket.onerror = function () {
          
            SoketNews.heartflag=false
         
           console.log(" 异常 ");
        };

        // 建立连接
        webSocket.onopen = function () {
           
            SoketNews.heartflag=true
            _self.heart();
           console.log("建立连接成功");
            SoketNews.tryTime = 0;
        };

        // 断线重连
        webSocket.onclose = function () {
            
            SoketNews.heartflag=false
            // 重试10次，每次之间间隔10秒
            if (SoketNews.tryTime < 10) {
                setTimeout(function () {
                    _self.webSocket = null;
                    SoketNews.tryTime++;
                   _self.webSocket = _self.initSocket();
                    console.log("  第"+SoketNews.tryTime+"次重连");
                }, 3*1000);
            } else {
                //alert("重连失败.");
            }
        };
    }

    componentWillUnmount(){
        if(this.webSocket){
            this.webSocket.close();
        }
    }
	

	heart() {

      

        if (SoketNews.heartflag){
           this.webSocket!.send("&");
           console.log("  心跳 <br/>");
        }

    }

  	send(message:string){

        this.webSocket!.send(message);
    }


	render(){

        const {data} = this.state;

        return (
            <>
                <div style={{ padding: "20px 10px" }}>
                    <i className="fa fa-envelope-o fa-lg"></i>
                   { data.length ? <i className="fa fa-circle"></i> :null}
                </div>
                <ul className="m-soket-drop m-sysOpt">
                    {
                        data.map((val,index)=>{
                            return (
                                <li key={index}>{val}</li>
                            )
                        })
                    }
                </ul>
            </>
        )
    }
}

export default SoketNews;




