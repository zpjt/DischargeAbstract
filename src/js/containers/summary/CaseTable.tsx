import * as React from "react";
import Table from "@js/common/table/index";
import {NavLink} from "react-router-dom";
import {Button} from "@js/common/Button"
//请求参数： pageNum：第几页 pageSize：每页几条 role_id：角色id status:状态默认筛选值0； status是筛选值,status_name是对应中文 主任角色可选筛选值：3：提交（未审核）5：已审核；6：报错 医生角色可选筛选值：1:未翻译，2：已翻译，4：驳回 fdept：科室 默认空字符串 fsex：性别 默认空字符串 fage：年龄 默认空字符串 lrdata：录入日期 默认空字符串 gddata：归档日期 默认空字符串 返回值： code：状态码 200为正常状态 message：状态信息 data： total：总条数 list：需要显示的数据 pageNum：当前第几页 pageSize：每页条数 prePage：上一页页码 nextPage：下一页页码 navigatepageNums：页码数组

type ListItem = {
    id: string;
    fname: string;
    fsex: "男" | "女",
    fage: string;
    fdept: string;
    fdeb: string;
    fprn: string;
    fsurvey: string;
    fryqk: string;
    fryzd: string;
    fzljg: string;
    fcyqk: string;
    fcyyz: string;
    status: string;
    status_name: string;
    lrdata: string;
    disp: string;
}

type caseData = {
    list:ListItem[];
    pageNum: number;
    pageSize: number;
    size: number;
    startRow: number;
    endRow: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatepageNums: number[];
    navigateFirstPage: number;
    navigateLastPage: number;
    lastPage: number;
    firstPage: number;
    total:number;
}



   
type ResultProp = {
    changeHandle(field:any,value:string):void;
    data:caseData;
    type : string; 
    delItem:(ids:string)=>void;
} 
type ResultState={
}

class ResultSearch extends React.PureComponent<ResultProp,ResultState>{

    column =   [
        {
            text: "姓名",
            field: "fname",
        },
        {
            text: "性别",
            field: "fsex",
        },
        {
            text: "年龄",
            field: "fage",
        },
        {
            text: "科室",
            field: "fdept",
        },
        {
            text: "床号",
            field: "fdeb",
        },
        {
            text: "病案号",
            field: "fprn",
        },
        {
            text: "录入时间", 
            field: "lrdata",
        },
         {
            text: "归档时间", 
            field: "gddata",
        },
        {
            text: "状态",
            field: "status",
            formatter:function(node:any){

                // 主任角色可选筛选值 3：5：；6： 医生角色可选筛选值：1:，2：，4：

                return ["","未翻译","已翻译","提交（未审核）","驳回","已审核","报错"][node.status]; 

            }
        },
        {
            text: "操作",
            field: "opt",
            width: 180,
            formatter: (node:any)=>{

                const type = this.props.type;
                const is_gdsummary = type === "/summary";
                const pathObj = {
                    pathname:"/translate",
                    state:{
                        text: ( !is_gdsummary && "病例清单" || "归档文案") + (" / 查看详情"),
                        id:node.id,
                        type:this.props.type,
                        status:node.status
                    }
                }
                return (<>
                        <NavLink to={pathObj} ><button className="s-btn normal-btn primary" >查看</button></NavLink>
                        &nbsp;
                        <Button type="danger" field={node.id}  handle={this.delItemCase}>删去</Button>
                        </>
                        )
            }
        }
    ];

    state={
  
    }

    delItemCase=(e:React.MouseEvent<HTMLButtonElement>)=>{


        const id = e.currentTarget!.name;

        this.props.delItem(id);
    }
    componentDidMount(){

       

        if(this.props.type =="/summary"){

            this.column.splice(7,1)

        }

    }
    render(){
        const {data} = this.props;

        if(!data){
            return "";
        }

        const {list,pageNum,pageSize,total,navigatepageNums} = data;
        const {changeHandle} = this.props;
        
            return <Table 
                        list={list} 
                        column={this.column}
                        pageNum={pageNum}
                        pageSize={pageSize}
                        total={total}
                        navigatepageNums={navigatepageNums}
                        changeHandle={changeHandle}
                    />


    }
   

}

export default ResultSearch;

