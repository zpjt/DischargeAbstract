import axios from "@js/common/AxiosInstance";


export default {

    getMenu:function(data:any){

        return  axios.get("summary/getMenu",{
                params:data
        });


    },
    







}