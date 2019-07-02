import * as React from "react";

const Url = "ws://"+window.location.host+window.getSession("getPath")+"WebSocket";

type socketProps={
  user_id:string;
  role_id:string;
 filterDispatch:(filter:string)=>void;
}
type soketState={
    data:string[];
}

class SoketNews extends React.PureComponent<socketProps,soketState>{

    static tryTime = 0 ;
    static heartflag = false;
    webSocket:null | WebSocket;
    state:soketState={
        data:[]
    }
    initSocket(props:socketProps){
        
       const {user_id,role_id} = props;

       const webSocket = new WebSocket(Url+"/"+user_id+"/"+role_id);
       const _self = this ;
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
                   _self.webSocket = _self.initSocket(_self.props);
                    console.log("  第"+SoketNews.tryTime+"次重连");
                }, 3*1000);
            } else {
                //alert("重连失败.");
            }
        };

       return  webSocket;

    }

    componentWillReceiveProps(nextProps:socketProps){

        const {role_id,user_id}=this.props;
        if(nextProps.role_id!==role_id || nextProps.user_id!==user_id){

                this.webSocket!.close();

                this.webSocket = this.initSocket(nextProps);



        }

    }
    
    componentDidMount(){
      
      this.webSocket = this.initSocket(this.props);
    
    }

    componentWillUnmount(){
        if(this.webSocket){
            this.webSocket.close();
        }
    }

    viewType=(e:React.MouseEvent<HTMLLIElement>)=>{

        const str = e.currentTarget!.innerHTML;
        const {filterDispatch} = this.props;
        let type ="0";
        if(str.includes("审核")){

            type="3"

        }else if(str.includes("报错")){
            type ="6"

        }else if(str.includes("未提交")){
            type ="2"

        }else if(str.includes("驳回")){
            type="4"
        }else if(str.includes("翻译")){
            type="1"
        }

        filterDispatch(type);


       

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
                <div style={{ padding: "20px 0" }}>
                    <i className="fa fa-envelope-o fa-lg"></i>
                   { data.length ? <i className="fa fa-circle"></i> :null}
                </div>
                <ul className="m-soket-drop m-sysOpt">
                    {
                      data.length ?  data.map((val,index)=>{
                            return (
                                <li key={index} onClick={this.viewType}>{val}</li>
                            )
                        }) :<li>没有消息!</li>
                    }
                </ul>
            </>
        )
    }
}

export default SoketNews;




