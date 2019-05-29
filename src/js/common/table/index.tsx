import * as React from "react";
import Combobox from "@js/common/combobox/index";

type TableProps = {
    list: any[];
    hasPageNums?: boolean;
    column: columnItem[],
    idField?: string;
    total: number;
    pageNum: number;
    pageSize: number;
    navigatepageNums: number[];
    tableH: string;
    changeHandle(field: any, value: string): void;
}

type columnItem = {
    text: string;
    width?: number;
    field: string;
    formatter?: (node: any) => React.ReactChild;

}

type TableState = {
    tableH: number;
    checkArr: string[];
    pageCheckAll: "checked" | "unchecked" | "haschecked";
}


const pageSizeArr = [
    {
        id: "10",
        text: "10"
    },
    {
        id: "15",
        text: "15"
    }, {
        id: "20",
        text: "20"
    }, {
        id: "30",
        text: "30"
    }, {
        id: "50",
        text: "50"
    },

]



export default class Table extends React.PureComponent<TableProps, TableState>{



    static defaultProps = {
        hasPageNums: true,
        idField: "id",
        hasOrder: true,
        checkbox: false,
        perNums: 15,
        tableH: "auto",
        curPage: 1,
    }

    TableContainer: React.RefObject<HTMLDivElement> = React.createRef();
    TableBody: React.RefObject<HTMLDivElement> = React.createRef();

    state: TableState = {
        tableH: 0,
        checkArr: [],
        pageCheckAll:"unchecked",
    }
    componentDidMount() {

        const tableH = this.TableContainer.current!.clientHeight;
        this.setState({
            tableH,
        });

    }
    jumpPage = (e: React.ChangeEvent<HTMLInputElement>) => {

        let num = +e.currentTarget!.value;
        const { total, pageSize, changeHandle } = this.props;
        const maxPage = Math.ceil(total / pageSize)


        if (num > maxPage) {
            num = maxPage
        } else if (num < 1) {
            num = 1
        }

        e.currentTarget!.value = num + "";

        changeHandle("pageNum", num + "");

    }
    checkAll = (e:React.ChangeEvent<HTMLInputElement>) => {

        const target = e.currentTarget!;
        const status = target.checked;
        const {list,idField} = this.props;
        const total = list.map(val=>val[idField!]+"");

        this.setState(pre=>{

            let checkAll:string[];
            if(status){
               
                const setArr = new Set(pre.checkArr.concat(total));
                checkAll = [...setArr];

            }else{
                checkAll = pre.checkArr.filter(val=>!total.includes(val));

            }
            return {
                checkArr:checkAll,
                pageCheckAll: (status && "checked" || "unchecked")
            }
        })
    }

    countTotalStatus() {



    }
    changePageSize = (seleteArr: Readonly<any[]>, field: string) => {

        this.props.changeHandle(field, seleteArr[0].id);

    }
    checkItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget!;
        const status = target.checked;
        const id = target.name;
        const {list,idField} = this.props;
        const total = list.map(val=>val[idField!]+"");

        this.setState(pre => {


            let checkAll:string[];
            let pageCheckAll:TableState["pageCheckAll"];

            if (status) {
                 checkAll = pre.checkArr.concat(id); 

                const hasAll = total.every(val=>checkAll.includes(val));
                pageCheckAll = hasAll && "checked" || "haschecked";


            } else {
                checkAll = pre.checkArr.filter(val=>val!==id);
                const hasCheck = total.some(val=>checkAll.includes(val));
                pageCheckAll = hasCheck && "haschecked" || "unchecked"
            }

           

            return {
                checkArr:checkAll,
                pageCheckAll:pageCheckAll
            }
        })



    }

    getColgroupCom(column: columnItem[]) {

        return (<colgroup>
            <col style={{ width: "40px" }} />
            {
                column.map(({ width, field }) => {
                    const wObj = width ? { width: width + "px" } : {};
                    return <col key={field} style={wObj} />
                })
            }
        </colgroup>)
    }

    render() {

        const { list, column, idField, pageSize, total, navigatepageNums, pageNum } = this.props;
        const { tableH, checkArr ,pageCheckAll} = this.state;

        let tabOver = "";
        let h: any;



        if (tableH > 0) {

            h = (+tableH - 120);// 表头 高40 ，离底部还要有距离

            tabOver = pageSize * 43 > h ? "tab-over" : "";

            h += "px";
        };

        const colgroupCom = this.getColgroupCom(column);

        return (<div className="g-table" ref={this.TableContainer}>

            <div className={"m-fixTabHead " + tabOver}>
                <table >
                    {colgroupCom}
                    <thead >
                        <tr>
                            <th >
                                <label className="m-label m-lab-checkbox" >
                                    <input type="checkbox" name="all" className={ pageCheckAll=="haschecked" && "has-check" || ""} checked={pageCheckAll == "checked" } onChange={this.checkAll} />

                                </label>
                            </th>
                            {
                                column.map(({ text, field }) => {
                                    return <th key={field}>{text}</th>
                                })
                            }
                        </tr>
                    </thead>
                </table>
            </div>

            <div className="m-fixTabBody" style={{ "height": h }} ref={this.TableBody}>
                <table >
                    {colgroupCom}
                    <tbody>
                        {
                            list.map(dataItem => {

                                const id = dataItem[idField!] + "";

                                const checkStaus = checkArr.includes(id);

                                return (<tr key={id}>
                                    <td style={{ width: "60px" }}>
                                        <label className="m-label m-lab-checkbox" >
                                            <input type="checkbox" name={id} checked={checkStaus} onChange={this.checkItem} />

                                        </label>
                                    </td>
                                    {
                                        column.map((node) => {
                                            const { field, formatter } = node;
                                            const text = formatter ? formatter(dataItem) : dataItem[field];
                                            return <td key={field} >{text}</td>
                                        })
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="g-pageCode">
                <div className="m-page-total">
                    <span>共 {total} 条记录</span>
                    <span>每页显示</span>
                    <Combobox field="pageSize" clickCallback={this.changePageSize} data={pageSizeArr} width={80} defaultVal="10" dirctionUp={true} />
                    <span>条</span>

                </div>
                <div style={{ display: "flex" }}>
                    <div className="m-code-number">
                        <span className="m-page-num"
                            onClick={undefined}
                        ><i className="fa fa-chevron-left "></i></span>
                        <span>
                            {
                                navigatepageNums.map(val => {

                                    return (<span className={"m-page-num " + (val == pageNum ? "active" : "")}
                                        key={val}
                                        onClick={undefined}
                                    >{val}</span>)
                                })

                            }

                        </span>
                        <span className="m-page-num"
                            onClick={undefined}
                        ><i className="fa fa-chevron-right "></i></span>
                    </div>
                    <span style={{ marginLeft: "20px" }}>
                        <span >跳转到</span>
                        <input className="j-jump-page" type="number" min={1} onChange={this.jumpPage} />页
                    </span>
                </div>
            </div>
        </div>)


    }



}