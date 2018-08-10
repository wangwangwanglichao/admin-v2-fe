/*Category-Component*/
/*品类管理页面*/

import React from "react";
import {Link} from "react-router-dom";

import MUtil from "util/mm.jsx";
const _mm = new MUtil();
import Product from "service/product-service.jsx";
const _product = new Product();

import PageTitle from "component/page-title/index.jsx";
import TableList from "util/table-list.jsx";

import "./index.scss";


export default class CategoryList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         list: [],
         parentCategoryId: this.props.match.params.categoryId || 0
      };
   }
   // 组件加载之后
   componentDidMount() {
      // 调用加载分类列表方法
      this.loadCategoryList();
   }
   // 组件更新之后
   componentDidUpdate(prevProps, prevState) {
      let oldPath = prevProps.location.pathname,
          newPath = this.props.location.pathname,
          newId = this.props.match.params.categoryId || 0;
      if (oldPath !== newPath) {
         this.setState({
            parentCategoryId: newId
         }, () => {
            this.loadCategoryList();
         })
      }
   }
   // 加载品类列表的方法
   loadCategoryList() {
      _product.getCategoryList(this.state.parentCategoryId).then(res => {
         this.setState({
            list: res
         });
      }, errMsg => {
         this.setState({
            list: []
         });
         _mm.errorTips(errMsg);
      });
   }

   // 更新品类的名字(弹窗)
   onUpdateName(categoryId, categoryName) {
      let newName = window.prompt("请输入新的品类名称", categoryName);
      if (newName) {
         _product.updateCategoryName({
            categoryId,
            categoryName: newName
         }).then(res => {
            _mm.successTips(res);
            // 重新更新品类列表
            this.loadCategoryList();
         }, err => {
            _mm.errorTips(err);
         })
      }
   }

   // 渲染
   render(){
      let listBody = this.state.list.map((item, index) => {
         return (
            <tr key={index}>
               <td>{item.id}</td>
               <td>{item.name}</td>
               <td>
                  <a className="opear pointer"
                     onClick={() => this.onUpdateName(item.id, item.name)}
                  >修改名称</a>&nbsp;&nbsp;&nbsp;
                  {/*根据父品类的id是否为0,判断"查看子品类"是否该显示*/}
                  {
                     item.parentId === 0
                        ? <Link to={`/product-category/index/${item.id}`}>查看子品类</Link>
                        : null
                  }
               </td>
            </tr>
         );
      });
      return (
         <div id="page-wrapper">
            <PageTitle title="品类列表">
               <div className="page-header-right">
                  <Link to="/product-category/add" className="btn btn-primary">
                     <i className="fa fa-plus"></i>
                     <span>添加品类</span>
                  </Link>
               </div>
            </PageTitle>
            <div className="row">
               <div className="col-md-12">
                  <p>父品类ID: {this.state.parentCategoryId}</p>
               </div>
            </div>
            <TableList tableHeads={['品类ID', '品类名称', '品类操作']}>
               {listBody}
            </TableList>
         </div>
      );
   }
}