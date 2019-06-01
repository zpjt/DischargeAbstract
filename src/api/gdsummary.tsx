import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

   
    getSummaryCaseById:function (id:string) {
        return axios.get("summary/getSummaryCaseById?id="+id)
    },
    updataEnSummaryCase:function(data:any){
        return axios.post("summary/updataEnSummaryCase",data,{

            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    commitEnSummaryCase:function(data:any){
        return axios.post("summary/commitEnSummaryCase",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })

    },
    upSummaryCaseError:function(id:string,errMessages:string){
        return axios.post("/summary/upSummaryCaseError",qs.stringify({id,errMessages}))
    },
    passEnSummaryCase:function(){

        
    }


}