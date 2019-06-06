import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

    getAllSummaryCaseByStatus:function(data:any){

        return  axios.post("summary/getAllSummaryCaseByStatus",qs.stringify(data));


    },
    addChSummaryCase:function (obj:any) {

        return  axios.post("summary/addChSummaryCase",obj,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        
    },
    getSummaryCaseByUserid:function(user_id:string) {

        return axios.get("summary/getSummaryCaseByUserid?user_id="+user_id)
        
    },
    saveChSummaryCase:function(data:any) {

        return axios.post("summary/saveChSummaryCase",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
    },
    delSummaryCaseById:function(id:string){
        return  axios.post("summary/delSummaryCaseById",qs.stringify({id}));
    },
    getAllOrg(){
        return axios.get("/summary/getAllOrg")
    }









}