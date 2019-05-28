import axions from "axios";

const instance = axions.create({
		baseURL:window.getSession("getPath"),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest',
			'X-Custom-Header': 'foobar'
		},
		

});

instance.interceptors.response.use(function (response) {

		if(response.data.code == 200){
			return response.data;
		}else{// session过期，重新登录
			console.log(response.data.message)
			 return Promise.reject(response.data);
		}
    
    
  }, function (error) {
   	
    return Promise.reject(error);
	});
	

export default instance ;