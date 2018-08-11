/*Order-Detail-Component*/

import React from "react";
import {Link} from "react-router-dom";
import TableList from "util/table-list.jsx";
import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import Order from "service/order-service.jsx";
const _order = new Order();
import PageTitle from "component/page-title/index.jsx";

import "./detail.scss";

export default class OrderDetail extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         orderNumber: this.props.match.params.orderNumber,
         orderInfo: {}
      };
   }

   componentDidMount() {
      this.loadOrderDetail();
   }

   // 加载商品详情信息
   loadOrderDetail() {
      // 有id的时候,表示是编辑功能,需要表单回填
      _order.getOrderDetail(this.state.orderNumber).then(res => {
         this.setState({
            orderInfo: res
         });
      }, err => {
         _mm.errorTips(err);
      })
   }
   // 发货操作
   onSendGoods () {
      if (window.confirm("是否确认该订单发货?")) {
         _order.sendGoods(this.state.orderNumber).then((res) => {
            _mm.successTips("发货成功");
            this.loadOrderDetail();
         }, (err) => {
            _mm.errorTips(err);
         })
      }
   }

   render() {
      let receiverInfo = this.state.orderInfo.shippingVo || {};
      let productList = this.state.orderInfo.orderItemVoList || [];
      let tableHeads = [
         {name: "商品图片", width: "10%"},
         {name: "商品信息", width: "45%"},
         {name: "单价", width: "15%"},
         {name: "数量", width: "15%"},
         {name: "合计", width: "15%"},
      ];
      return (
         <div id="page-wrapper">
            <PageTitle title="订单详情"/>
            <div className="form-horizontal">
               {/*订单号*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">订单号</label>
                  <div className="col-md-5">
                     <p className="form-control-static">{this.state.orderInfo.orderNo}</p>
                  </div>
               </div>
               {/*创建时间*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">创建时间</label>
                  <div className="col-md-5">
                     <p className="form-control-static">{this.state.orderInfo.createTime}</p>
                  </div>
               </div>
               {/*收件人*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">收件人</label>
                  <div className="col-md-5">
                     <p className="form-control-static">
                        {receiverInfo.receiverName},
                        {receiverInfo.receiverProvince}
                        {receiverInfo.receiverCity}
                        {receiverInfo.receiverAddress}
                        {receiverInfo.receiverName}
                        {receiverInfo.receiverMobile || receiverInfo.receiverPhone}
                     </p>
                  </div>
               </div>
               {/*订单状态*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">订单状态</label>
                  <div className="col-md-5">
                     <p className="form-control-static">
                        {this.state.orderInfo.statusDesc}
                        {
                           this.state.orderInfo.status === 20
                           ? <button className="btn btn-default btn-sm btn-send-goods"
                                 onClick={(e) => this.onSendGoods(e)}
                              >立即发货</button>
                           : null
                        }
                     </p>
                  </div>
               </div>
               {/*支付方式*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">支付方式</label>
                  <div className="col-md-5">
                     <p className="form-control-static">
                        {this.state.orderInfo.paymentTypeDesc}
                     </p>
                  </div>
               </div>
               {/*订单金额*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">订单金额</label>
                  <div className="col-md-5">
                     <p className="form-control-static">
                        ¥{this.state.orderInfo.payment}
                     </p>
                  </div>
               </div>
               {/*商品列表*/}
               <div className="form-group">
                  <label className="col-md-2 control-label">商品列表</label>
                  <div className="col-md-10">
                     <TableList tableHeads={tableHeads}>
                        {
                           productList.map((item, index) => {
                              return (
                                 <tr key={index}>
                                    <td>
                                       <img className="p-img"
                                            src={`${this.state.orderInfo.imageHost}${item.productImage}`}
                                            alt={item.name}/>
                                    </td>
                                    <td>{item.productName}</td>
                                    <td>¥{item.currentUnitPrice}</td>
                                    <td>{item.quantity}</td>
                                    <td>¥{item.totalPrice}</td>
                                 </tr>
                              )
                           })
                        }
                     </TableList>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}