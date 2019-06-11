import axions ,{AxiosResponse}from "axios";
const instance = axions.create({
		baseURL:window.getSession("getPath"),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest',
			'X-Custom-Header': 'foobar'
		},
		

});

declare global{


	interface AxiosInterfaceResponse extends AxiosResponse<any>{
		data:any;
		message:string;
		code:number;
	}


}



instance.interceptors.response.use(function (response) {

		if(response.headers["content-type"].includes("text/html")){
			window.location.href=window.getSession("getPath")+"login";
			return Promise.reject();
		}	

		if(response.data.code == 200 || response.data.code==4000){
			return response.data;
		}else{// session过期，重新登录

			
		
			 return Promise.reject(response.data);
		}
    
    
  }, function (error) {
   	
    return Promise.reject(error);
	});
	

export default instance ;