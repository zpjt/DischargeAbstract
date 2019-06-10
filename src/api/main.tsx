import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

    getMenu:function(data:any){

        return  axios.get("summary/getMenu",{
                params:data
        });


    },
    checkPwd:function(user_id:string,password:string){

        return axios.post("summary/checkPwd",qs.stringify({user_id,password}))
    },
    updatePwd:function(user_id:string,password:string){

        return axios.post("summary/updatePwd",qs.stringify({user_id,password}))

    },
    logOut:function(){
        return axios.get("login/logOut");
    }
    







}