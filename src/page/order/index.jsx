/*Order-Component*/
/*订单页面*/
import React from "react";
import {Link} from "react-router-dom";
import Order from "service/order-service.jsx";
const _order = new Order();
import MUtil from "util/mm.jsx";
const _mm = new MUtil();

import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list.jsx";
import SearchComponent from "./search.jsx";
import Pagination from "util/pagination.jsx";


export default class OrderList extends React.Component {
   constructor() {
      super();
      this.state = {
         list: [],
         pageNum: 1,
         listType: "list"
      };
   }
   // 组件加载之后: 加载商品列表数据
   componentDidMount() {
      this.loadOrderList();
   }
   // 加载商品列表的方法
   loadOrderList() {
      let listParam = {};
      listParam.listType = this.state.listType;
      listParam.pageNum = this.state.pageNum;
      // 如果是搜索的话,需要传入搜索类型和搜索关键字
      if (this.state.listType === 'search') {
         listParam.orderNo = this.state.orderNumber;
      }
      // 向接口发出请求的方法
      _order.getOrderList(listParam).then(res => {
         this.setState(res);
      }, errMsg => {
         this.setState({
            list: []
         });
         _mm.errorTips(errMsg);
      });
   }
   // 搜索的方法
   onSearch(orderNumber) {
      let listType = orderNumber === "" ? "list" : "search";
      this.setState({
         listType: listType,
         pageNum: 1,
         orderNumber: orderNumber
      }, () => {
         this.loadOrderList();
      });
   }
   // 页数发生变化时重新加载商品列表的方法
   onPageNumChange(pageNum) {
      this.setState({
         pageNum: pageNum
      }, () => {
         this.loadOrderList();
      });
   }

   render() {
      let tableHeads = ["订单号", "收件人", "订单状态", "订单总价", "创建时间", "订单操作"];

      return (
         <div id="page-wrapper">
            <PageTitle title="订单列表"/>
            <SearchComponent onSearch={(orderNumber)=>this.onSearch(orderNumber)}/>
            <TableList tableHeads={tableHeads}>
               {
                  this.state.list.map((item, index) => {
                     return (
                        <tr key={index}>
                           <td>
                              <Link to={`/order/detail/${item.orderNo}`}>{item.orderNo}</Link>
                           </td>
                           <td>{item.receiverName}</td>
                           <td>{item.statusDesc}</td>
                           <td>¥{item.payment}</td>
                           <td>{item.createTime}</td>
                           <td>
                              <Link to={`/order/detail/${item.orderNo}`}>详情</Link><br/>
                           </td>
                        </tr>
                     )
                  })
               }
            </TableList>
            <Pagination
               current={this.state.pageNum}
               total={this.state.total}
               onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
         </div>
      )
   }
}