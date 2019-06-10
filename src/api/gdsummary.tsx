import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

   
    getSummaryCaseById:function (id:string) {
        return axios.get("summary/getSummaryCaseById?id="+id)
    },
    updataEnSummaryCase:function(data:any){//修改也是保存
        return axios.post("summary/updataEnSummaryCase",data,{

            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    commitEnSummaryCase:function(data:any){//提交
        return axios.post("summary/commitEnSummaryCase",data,{
            headers:{
                "Content-Type":"application/json"
            }
        })

    },
    upSummaryCaseError:function(id:string,errMessages:string){//报错不翻译
        return axios.post("/summary/upSummaryCaseError",qs.stringify({id,errMessages}))
    },
    passEnSummaryCase:function(id:string){//通过

        return axios.post("summary/passEnSummaryCase",{id},{
            headers:{
                "Content-Type":"application/json"
            }
        })
    },
    returnSummaryCase:function(id:string,descr:string){//驳回

        return axios.post("/summary/returnSummaryCase",qs.stringify({id,descr}))
    },
    getAllOrg(){
        return axios.get("/summary/getAllOrg")
    },
    


}