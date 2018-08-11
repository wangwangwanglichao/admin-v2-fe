/*product component*/
import React from "react";
import {Link} from "react-router-dom";
import Product from "service/product-service.jsx";
const _product = new Product();
import MUtil from "util/mm.jsx";
const _mm = new MUtil();

import "./index.scss";

import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list.jsx";
import SearchComponent from "./search.jsx";
import Pagination from "util/pagination.jsx";


export default class ProductList extends React.Component {
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
      this.loadProductList();
   }
   // 加载商品列表的方法
   loadProductList() {
      let listParam = {};
      listParam.listType = this.state.listType;
      listParam.pageNum = this.state.pageNum;
      // 如果是搜索的话,需要传入搜索类型和搜索关键字
      if (this.state.listType === 'search') {
         listParam.searchType = this.state.searchType;
         listParam.searchKeyword = this.state.searchKeyword;
      }
      // 向接口发出请求的方法
      _product.getProductList(listParam).then(res => {
         this.setState(res);
      }, errMsg => {
         this.setState({
            list: []
         });
         _mm.errorTips(errMsg);
      });
   }
   // 搜索的方法
   onSearch(searchType, searchKeyword) {
      let listType = searchKeyword === "" ? "list" : "search";
      this.setState({
         listType: listType,
         pageNum: 1,
         searchType: searchType,
         searchKeyword: searchKeyword
      }, () => {
         this.loadProductList();
      });
   }
   // 页数发生变化时重新加载商品列表的方法
   onPageNumChange(pageNum) {
      this.setState({
         pageNum: pageNum
      }, () => {
         this.loadProductList();
      });
   }
   // 改变商品状态: 上架 / 下架
   onSetProductStatus(e, productId, currentStatus) {
      let newStatus = currentStatus === 1 ? 2 : 1;
      let confirmTips = currentStatus === 1 ? "确定要下架该商品?" : "确定要上架该商品?";
      if (window.confirm(confirmTips)) {
         _product.setProductStatus({
            productId: productId,
            status: newStatus
         }).then(res => {
            _mm.successTips(res);
            this.loadProductList();
         }, err => {
            _mm.errorTips(err);
         })
      }
   }
   // 渲染
   render() {
      let tableHeads = [
         {name: "商品ID", width: "10%"},
         {name: "商品信息", width: "50%"},
         {name: "价格", width: "10%"},
         {name: "状态", width: "15%"},
         {name: "操作", width: "15%"},
      ];
      return (
         <div id="page-wrapper">
            <PageTitle title="商品列表">
               <div className="page-header-right">
                  <Link className="btn btn-primary" to="/product/save">
                     <i className="fa fa-plus"> </i>
                     <span>添加商品</span>
                  </Link>
               </div>
            </PageTitle>
            <SearchComponent onSearch={(searchType, searchKeyword)=>{this.onSearch(searchType, searchKeyword)}}/>
            <TableList tableHeads={tableHeads}>
               {
                  this.state.list.map((item, index) => {
                     return (
                        <tr key={index}>
                           <td>{item.id}</td>
                           <td>
                              <p>{item.name}</p>
                              <p>{item.subtitle}</p>
                           </td>
                           <td>¥{item.price}</td>
                           <td>
                              <p>{item.status === 1 ? "在售" : "已下架"}</p>
                              <button
                                 className="btn btn-xs btn-primary"
                                 onClick={(e)=>{this.onSetProductStatus(e, item.id, item.status)}}
                              >
                                 {item.status === 1 ? "下架" : "上架"}
                              </button>
                           </td>
                           <td>
                              <Link className="opear" to={`/product/detail/${item.id}`}>详情</Link><br/>
                              <Link className="opear" to={`/product/save/${item.id}`}>编辑</Link>
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