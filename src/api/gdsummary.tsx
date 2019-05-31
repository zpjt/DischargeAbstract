import axios from "@js/common/AxiosInstance";

export default {

   
    getSummaryCaseById:function (id:string) {
        return axios.get("summary/getSummaryCaseById?id="+id)
    }








}