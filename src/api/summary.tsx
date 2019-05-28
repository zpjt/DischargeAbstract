import axios from "@js/common/AxiosInstance";
import * as qs from "qs";

export default {

    getAllSummaryCaseByStatus:function(data:any){

        return  axios.post("summary/getAllSummaryCaseByStatus",qs.stringify(data));


    },








}